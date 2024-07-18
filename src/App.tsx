import axios from "axios";
import { useEffect, useState } from "react";
import Joke from "./components/Joke";
import "./App.css";

interface JokeType {
  setup: string;
  punchline: string;
}

const baseURL = "https://jokes-app-db-connection.onrender.com";

const App = () => {
  const [jokeData, setJokeData] = useState<any[]>([]);
  const [newJoke, setNewJoke] = useState<JokeType>({
    setup: "",
    punchline: "",
  });

  const fetchAndStoreJokes = async (): Promise<void> => {
    const httpResponse = await axios.get(`${baseURL}/jokes`);
    setJokeData(httpResponse.data);
  };

  const saveNewJoke = async (jokeData: JokeType): Promise<void> => {
    const httpResponse = await axios.post(`${baseURL}/jokes`, jokeData);
    if (httpResponse.data.outcome === "success") {
      alert("Success: please refresh to see your new joke");
      setNewJoke({
        setup: "",
        punchline: "",
      });
    } else {
      alert("Something went wrong");
    }
  };

  const handleSubmitJoke = () => {
    saveNewJoke(newJoke);
  };

  const handleJokeInput = (e: { target: { value: string; name: string } }) => {
    setNewJoke((prevJoke) => {
      return {
        ...prevJoke,
        [e.target.name]: e.target.value,
      };
    });
  };

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
        <textarea
          placeholder="Setup (optional)"
          name="setup"
          onChange={handleJokeInput}
          value={newJoke.setup}
        />
        <textarea
          placeholder="Punchline"
          name="punchline"
          onChange={handleJokeInput}
          value={newJoke.punchline}
        />
        <button onClick={handleSubmitJoke}>Submit</button>
      </section>
      <div className="jokes">{jokeElements}</div>
    </main>
  );
};

export default App;
