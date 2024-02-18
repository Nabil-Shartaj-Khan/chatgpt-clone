import { useState } from "react";
import "./App.css";
import ChatForm from "./components/ChatForm";
import Header from "./components/Header";
import ShowMessage from "./components/ShowMessage";
import ShowHistory from "./components/ShowHistory";
function App() {
  const [input, setInput] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const openAiApi = process.env.REACT_APP_OPENAI_API_KEY;

  const responseGenerate = async (input) => {
    let sendMessage = [...allMessage, { role: "user", content: input }];
    setAllMessage(sendMessage);
    setIsTyping(true);

    let url = "https://api.openai.com/v1/chat/completions";
    let token = `Bearer ${openAiApi}`;
    let model = "gpt-3.5-turbo";

    let res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: sendMessage,
      }),
    });
    let responseGpt = await res.json();
    let allNewMessages;
    if (responseGpt) {
      allNewMessages = [...sendMessage, responseGpt.choices[0].message];
    }
    setAllMessage(allNewMessages);
    setInput("");
    setIsTyping(false);
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="left-panel">
          <ShowHistory />
        </div>
        <div className="right-panel">
          <Header />
          <div className="show-message-container">
            <ShowMessage
              allMessage={allMessage}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
            />
          </div>
          <div className="chat-form-container">
            <ChatForm
              responseGenerate={responseGenerate}
              input={input}
              setInput={setInput}
            />
            <div className="footer">
              ChatGPT can make mistakes, so can I. &copy;
              <b>Nabil Shartaj Khan</b>, 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
