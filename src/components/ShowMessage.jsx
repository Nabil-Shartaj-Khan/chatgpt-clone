import React, { useRef, useEffect } from "react";

const ShowMessage = ({ allMessage, isTyping }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [allMessage]);

  useEffect(() => {
    if (isTyping) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isTyping]);

  return (
    <div ref={chatContainerRef} style={{ overflowY: "auto", height: "400px" }}>
      {allMessage.map((msg, index) => (
        <div key={index}>
          <h5>{msg.role === "user" ? "you" : "ChatGPT"}</h5>
          <p>{msg.content}</p>
        </div>
      ))}
      {isTyping && <p>ChatGPT is typing...</p>}
    </div>
  );
};

export default ShowMessage;
