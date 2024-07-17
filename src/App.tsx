import axios from "axios";
import { useEffect, useState } from "react";
import Joke from "./components/Joke";
import "./App.css";

const App = () => {
  const [jokeData, setJokeData] = useState<any[]>([]);

  const fetchAndStoreJokes = async () => {
    const httpResponse = await axios.get(
      "https://jokes-app-db-connection.onrender.com/jokes"
    );
    setJokeData(httpResponse.data);
  };

  const handleSubmitJoke = () => {}

  const handleJokeInput = () => {}

  useEffect(() => {
    fetchAndStoreJokes();
    console.log("effect ran");
  }, []);

  const jokeElements = jokeData.map((joke) => {
    return <Joke key={joke.id} setup={joke.setup} punchline={joke.punchline} />;
  });
  return (
    <main>
        <section className="add-joke">
        <textarea placeholder="Setup (optional)" name="setup" onChange={handleJokeInput}/>
        <textarea placeholder="Punchline" name="punchline" onChange={handleJokeInput}/>
        <button onClick={handleSubmitJoke}>Submit</button>
        </section>
      <div className="jokes">{jokeElements}</div>
    </main>
  );
};

export default App;
