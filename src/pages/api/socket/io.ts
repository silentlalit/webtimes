import { Server as NetServer } from "http";
import { Socket as NetSocket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketIoServer, Socket } from "socket.io";
import path from "path";

// models
import User from "@/app/api/models/user";
import OneToOneMessage from "@/app/api/models/oneToOneMessage";
// import FriendRequest from "@/app/api/models/friendRequest";
import AudioCall from "@/app/api/models/audioCall";
import VideoCall from "@/app/api/models/videoCall";
import { connectDb } from "@/app/api/middleware/mongoose";

type CustomNextResponse = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = async (req: NextApiRequest, res: CustomNextResponse) => {
  console.log("io start");
  await connectDb();

  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;

    const io = new SocketIoServer(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on("connection", async (socket: Socket) => {
      const user_id = socket.handshake.query["user_id"];
      console.log(`User connected ${socket.id}`);

      if (user_id != null && Boolean(user_id)) {
        try {
          await User.findByIdAndUpdate(user_id, {
            socket_id: socket.id,
            status: "Online",
          });
        } catch (e) {
          console.log(e);
        }
      }

      // We can write our socket event listeners in here...
      // socket.on("friend_request", async (data: any) => {
      //   const to = await User.findById(data.to).select("socket_id");
      //   const from = await User.findById(data.from).select("socket_id");

      //   // create a friend request
      //   await FriendRequest.create({
      //     sender: data.from,
      //     recipient: data.to,
      //   });
      //   // emit event request received to recipient
      //   io.to(to?.socket_id).emit("new_friend_request", {
      //     message: "New friend request received",
      //   });
      //   io.to(from?.socket_id).emit("request_sent", {
      //     message: "Request Sent successfully!",
      //   });
      // });

      // socket.on("accept_request", async (data: any) => {
      //   // accept friend request => add ref of each other in friends array
      //   console.log(data);
      //   const request_doc = await FriendRequest.findById(data.request_id);

      //   console.log(request_doc);

      //   const sender = await User.findById(request_doc.sender);
      //   const receiver = await User.findById(request_doc.recipient);

      //   sender.friends.push(request_doc.recipient);
      //   receiver.friends.push(request_doc.sender);

      //   await receiver.save({ new: true, validateModifiedOnly: true });
      //   await sender.save({ new: true, validateModifiedOnly: true });

      //   await FriendRequest.findByIdAndDelete(data.request_id);

      //   // emit event request accepted to both
      //   io.to(sender?.socket_id).emit("request_accepted", {
      //     message: "Friend Request Accepted",
      //   });
      //   io.to(receiver?.socket_id).emit("request_accepted", {
      //     message: "Friend Request Accepted",
      //   });
      // });

      socket.on("get_conversations_list", async (data: any, callback: any) => {
        console.log("get_conversations_list called", user_id);
        const existing_conversations = await OneToOneMessage.find({
          participants: { $all: [user_id] },
        }).populate("participants", "name username avatar _id email status");

        callback(existing_conversations);
      });

      socket.on("add_conversation", async (data: any, callback: any) => {
        const { name, to, from, orderId } = data;

        const existing_conversations = await OneToOneMessage.find({
          participants: { $size: 2, $all: [to, from] },
          order: orderId,
        }).populate("participants", "name username _id email status avatar");

        // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
        if (existing_conversations.length === 0) {
          let new_chat = await OneToOneMessage.create({
            name: name,
            participants: [to, from],
            order: orderId,
          });

          new_chat = await OneToOneMessage.findById(new_chat).populate(
            "participants",
            "name username _id email status avatar"
          );

          socket.emit("start_chat", new_chat);
          callback({ exist: false, chat: new_chat });
        }
        // if yes => just emit event "start_chat" & send conversation details as payload
        else {
          socket.emit("start_chat", existing_conversations[0]);
          callback({ exist: true, chat: existing_conversations[0] });
        }
      });

      socket.on("set_conversation_id", async (data: any) => {
        await User.findByIdAndUpdate(user_id, {
          conversation_id: data.conversation_id,
        });
      });

      socket.on("get_messages", async (data: any, callback: any) => {
        try {
          const chat = await OneToOneMessage.findById(data.conversation_id);
          const { unreadMsg, messages } = chat;

          if (user_id == unreadMsg.user) {
            // read all unread msg
            unreadMsg.unread = 0;
            unreadMsg.user = null;
            await chat.save({ new: true, validateModifiedOnly: true });
          }

          callback(messages);
        } catch (error) {
          console.log(error);
        }
      });

      // Handle incoming text/link messages
      socket.on("text_message", async (data: any) => {
        // data: {to, from, text}
        const { message, conversation_id, from, to, type } = data;

        const to_user = await User.findById(to);
        const from_user = await User.findById(from);

        // message => {to, from, type, created_at, text, file}
        const new_message = {
          to: to,
          from: from,
          type: type,
          created_at: Date.now(),
          text: message,
        };

        // fetch OneToOneMessage Doc & push a new message to existing conversation
        const chat = await OneToOneMessage.findById(conversation_id);
        chat.messages.push(new_message);

        if (to_user.conversation_id !== conversation_id)
          chat.unreadMsg = {
            unread: (chat.unreadMsg.unread += 1),
            user: to_user,
          };

        // save to db`
        await chat.save({ new: true, validateModifiedOnly: true });

        // emit incoming_message -> to user
        io.to(to_user?.socket_id).emit("new_message", {
          conversation_id,
          message: new_message,
        });

        // emit outgoing_message -> from user
        io.to(from_user?.socket_id).emit("new_message", {
          conversation_id,
          message: new_message,
        });
      });

      // handle Media/Document Message
      socket.on("file_message", (data: any) => {
        console.log("Received message:", data);

        // data: {to, from, text, file}

        // Get the file extension
        // const fileExtension = path.extname(data.file.name);

        // // Generate a unique filename
        // const filename = `${Date.now()}_${Math.floor(
        //   Math.random() * 10000
        // )}${fileExtension}`;

        // upload file to AWS s3

        // create a new conversation if its dosent exists yet or add a new message to existing conversation

        // save to db

        // emit incoming_message -> to user

        // emit outgoing_message -> from user
      });

      /**
       *
       *
       *
       * -------------- HANDLE AUDIO CALL SOCKET EVENTS -----------------
       *
       *
       *
       *
       */

      // handle start_audio_call event
      socket.on("start_audio_call", async (data: any) => {
        const { from, to, roomID } = data;

        const to_user = await User.findById(to);
        const from_user = await User.findById(from);

        console.log("to_user", to_user);

        // send notification to receiver of call
        io.to(to_user?.socket_id).emit("audio_call_notification", {
          from: from_user,
          roomID,
          streamID: from,
          userID: to,
          userName: to,
        });
      });

      // handle audio_call_not_picked
      socket.on("audio_call_not_picked", async (data: any) => {
        console.log(data);
        // find and update call record
        const { to, from } = data;

        const to_user = await User.findById(to);

        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Missed", status: "Ended", endedAt: Date.now() }
        );

        // TODO => emit call_missed to receiver of call
        io.to(to_user?.socket_id).emit("audio_call_missed", {
          from,
          to,
        });
      });

      // handle audio_call_accepted
      socket.on("audio_call_accepted", async (data: any) => {
        const { to, from } = data;

        const from_user = await User.findById(from);

        // find and update call record
        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Accepted" }
        );

        // TODO => emit call_accepted to sender of call
        io.to(from_user?.socket_id).emit("audio_call_accepted", {
          from,
          to,
        });
      });

      // handle audio_call_denied
      socket.on("audio_call_denied", async (data: any) => {
        // find and update call record
        const { to, from } = data;

        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Denied", status: "Ended", endedAt: Date.now() }
        );

        const from_user = await User.findById(from);
        // TODO => emit call_denied to sender of call

        io.to(from_user?.socket_id).emit("audio_call_denied", {
          from,
          to,
        });
      });

      // handle user_is_busy_audio_call
      socket.on("user_is_busy_audio_call", async (data: any) => {
        const { to, from } = data;
        // find and update call record
        await AudioCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Busy", status: "Ended", endedAt: Date.now() }
        );

        const from_user = await User.findById(from);
        // TODO => emit on_another_audio_call to sender of call
        io.to(from_user?.socket_id).emit("on_another_audio_call", {
          from,
          to,
        });
      });

      /**
       *
       *
       *
       * --------------------- HANDLE VIDEO CALL SOCKET EVENTS ----------------------
       *
       *
       *
       *
       */

      // handle start_video_call event
      socket.on("start_video_call", async (data: any) => {
        const { from, to, roomID } = data;

        console.log(data);

        const to_user = await User.findById(to);
        const from_user = await User.findById(from);

        console.log("to_user", to_user);

        // send notification to receiver of call
        io.to(to_user?.socket_id).emit("video_call_notification", {
          from: from_user,
          roomID,
          streamID: from,
          userID: to,
          userName: to,
        });
      });

      // handle video_call_not_picked
      socket.on("video_call_not_picked", async (data: any) => {
        console.log(data);
        // find and update call record
        const { to, from } = data;

        const to_user = await User.findById(to);

        await VideoCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Missed", status: "Ended", endedAt: Date.now() }
        );

        // TODO => emit call_missed to receiver of call
        io.to(to_user?.socket_id).emit("video_call_missed", {
          from,
          to,
        });
      });

      // handle video_call_accepted
      socket.on("video_call_accepted", async (data: any) => {
        const { to, from } = data;

        const from_user = await User.findById(from);

        // find and update call record
        await VideoCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Accepted" }
        );

        // TODO => emit call_accepted to sender of call
        io.to(from_user?.socket_id).emit("video_call_accepted", {
          from,
          to,
        });
      });

      // handle video_call_denied
      socket.on("video_call_denied", async (data: any) => {
        // find and update call record
        const { to, from } = data;

        await VideoCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Denied", status: "Ended", endedAt: Date.now() }
        );

        const from_user = await User.findById(from);
        // TODO => emit call_denied to sender of call

        io.to(from_user?.socket_id).emit("video_call_denied", {
          from,
          to,
        });
      });

      // handle user_is_busy_video_call
      socket.on("user_is_busy_video_call", async (data: any) => {
        const { to, from } = data;
        // find and update call record
        await VideoCall.findOneAndUpdate(
          {
            participants: { $size: 2, $all: [to, from] },
          },
          { verdict: "Busy", status: "Ended", endedAt: Date.now() }
        );

        const from_user = await User.findById(from);
        // TODO => emit on_another_video_call to sender of call
        io.to(from_user?.socket_id).emit("on_another_video_call", {
          from,
          to,
        });
      });

      // -------------- HANDLE SOCKET DISCONNECTION ----------------- //

      socket.on("end", async () => {
        // Find user by ID and set status as offline
        await User.findByIdAndUpdate(user_id, {
          status: "Offline",
          conversation_id: null,
          socket_id: null,
        });

        // broadcast to all conversation rooms of this user that this user is offline (disconnected)
        console.log("closing connection");
        socket.disconnect();
      });
    });
  }

  res.end();
};

export default ioHandler;

/**
 *
 *
 */
