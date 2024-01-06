"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io as ClientIO } from "socket.io-client";

import { useAppDispatch } from "@/redux/hook";
import { AddDirectMessage } from "@/redux/slices/conversationSlice";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();

  console.log(isConnected);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    const socketInstance = ClientIO(`${process.env.NEXT_PUBLIC_APP_URL}`, {
      path: "/api/socket/io",
      query: {
        user_id: user_id,
      },
      // addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("error", (error: any) => {
      console.log(error.message);
      toast.error(error.message);
      console.error("WebSocket error:", error);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error: any) => {
      console.log(error.message);
      toast.error(error.message);
      console.error("WebSocket error:", error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // socket.on("audio_call_notification", (data) => {
    //   // TODO => dispatch an action to add this in call_queue
    //   dispatch(PushToAudioCallQueue(data));
    // });

    // socket.on("video_call_notification", (data) => {
    //   // TODO => dispatch an action to add this in call_queue
    //   dispatch(PushToVideoCallQueue(data));
    // });

    socketInstance.on("new_message", (data: any) => {
      const { message, conversation_id } = data;

      dispatch(
        AddDirectMessage({
          conversation_id: conversation_id,
          message: {
            id: message._id,
            type: "msg",
            subtype: message.type,
            message: message.text,
            incoming: message.to === user_id,
            outgoing: message.from === user_id,
          },
        })
      );
    });

    // socketInstance.on("start_chat", (data: any) => {
    //   console.log(data);
    //   // add / update to conversation list
    //   const existing_conversation = conversations.find(
    //     (el) => el?.id === data._id
    //   );
    //   if (existing_conversation) {
    //     // update direct conversation
    //     dispatch(UpdateDirectConversation({ conversation: data }));
    //   } else {
    //     // add direct conversation
    //     dispatch(AddDirectConversation({ conversation: data }));
    //   }
    // });

    return () => {
      console.log("going out to user layout")
      socketInstance?.off("new_message");
      socketInstance.on("end", (e) => {
        console.log(e)
      });
      socketInstance.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// import { io } from "socket.io-client";

// let socket: any;

// const connectSocket = async ({ user_id }: { user_id: string }) => {
//   socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/socket/io`, {
//     path: "/api/socket/io",
//     query: {
//       user_id: user_id,
//     },
//   });

//   console.log(socket);

//   socket.on("connect", () => {
//     console.log("connected");
//   });
// };

// export { socket, connectSocket };
