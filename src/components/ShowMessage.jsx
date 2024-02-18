import React, { useRef, useEffect, useState } from "react";

const ShowMessage = ({ allMessage, isTyping }) => {
  const chatContainerRef = useRef(null);
  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNetworkError(true);
    }, 20000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [allMessage]);

  useEffect(() => {
    if (isTyping) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isTyping]);

  useEffect(() => {
    if (showNetworkError) {
      console.log("Network error occurred!");
    }
  }, [showNetworkError]);

  return (
    <div>
      {showNetworkError ? (
        <div>
          <p>
            Error while generating message! Check for API key connection or
            check internet!
          </p>
        </div>
      ) : (
        <div
          ref={chatContainerRef}
          style={{ overflowY: "auto", height: "400px" }}
        >
          {allMessage.map((msg, index) => (
            <div key={index}>
              <h5>{msg.role === "user" ? "you" : "ChatGPT"}</h5>
              <p>{msg.content}</p>
            </div>
          ))}
          {isTyping && <p>ChatGPT is typing...</p>}
        </div>
      )}
    </div>
  );
};

export default ShowMessage;
