'use client'

import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';

export default function AblyProviderContainer({ children }: { children: React.ReactNode }) {

  const client = new Ably.Realtime.Promise({ authUrl: '/api/chats' });


  // const { channel, ably } = useChannel("chat-demo", (message) => {
  //   const history = receivedMessages.slice(-199);
  //   setMessages([...history, message]);
  // });

  // const sendChatMessage = (messageText) => {
  //   channel.publish({ name: "chat-message", data: messageText });
  //   setMessageText("");
  //   inputBox.focus();
  // }

  // const handleFormSubmission = (event) => {
  //   event.preventDefault();
  //   sendChatMessage(messageText);
  // }

  // const handleKeyPress = (event) => {
  //   if (event.charCode !== 13 || messageTextIsEmpty) {
  //     return;
  //   }
  //   sendChatMessage(messageText);
  //   event.preventDefault();
  // }

  // const messages = receivedMessages.map((message, index) => {
  //   const author = message.connectionId === ably.connection.id ? "me" : "other";
  //   return <span key={index} className={styles.message} data-author={author}>{message.data}</span>;
  // });

  return (
    <AblyProvider client={ client }>
      {children}
    </AblyProvider>
  )
} 