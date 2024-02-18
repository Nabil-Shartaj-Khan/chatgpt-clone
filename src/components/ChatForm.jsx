import React, { useRef, useState } from "react";

const ChatForm = ({ input, setInput, responseGenerate }) => {
  const generateButtonRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      responseGenerate(input);
      setInput("");
    }
  };

  const handleButtonClick = () => {
    if (input.trim() !== "") {
      responseGenerate(input);
      setInput("");
    } else {
      alert("Come on! Atleast write something 🤨😕");
    }
  };
  return (
    <div className="text-center">
      <div className="text-area">
        <textarea
          className="formControl border border-dark"
          id="chat"
          rows="2"
          cols="130"
          onKeyPress={handleKeyPress}
          placeholder="ask me anything"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <button
          ref={generateButtonRef}
          className="btn btn-primary mt-3"
          onClick={handleButtonClick}
        >
          Generate response
        </button>
      </div>
    </div>
  );
};

export default ChatForm;
