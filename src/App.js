import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_Open_AI_API_Key,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });
    setResponse(res.data.data[0].url);
  };

  return (
    <div className="App">
      <div className="app-body">
        <h1 className="app-heading">Text-to-Image Generator using Open AI</h1>
        <div className="app-sub-body">
          <textarea
            className="app-input"
            placeholder="Search Bears with Paint Brushes the Starry Night by Van Gogh..."
            onChange={(e) => setPrompt(e.target.value)}
            rows="3"
            cols="50"
          />
          <button className="app-button" onClick={generateImage}>
            Generate Your Image
          </button>
          {response.length > 0 ? (
          <img className="response-image" src={response} alt="result" />
        ) : (
          <></>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
