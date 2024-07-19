import axios from "axios";
import { useEffect, useState } from "react";
import Joke from "./components/Joke";
import "./App.css";

interface JokeType {
  setup: string;
  punchline: string;
}

interface JokeTypeWithId extends JokeType {
  id: number;
}

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [jokeData, setJokeData] = useState<JokeTypeWithId[]>([]);
  const [newJoke, setNewJoke] = useState<JokeType>({
    setup: "",
    punchline: "",
  });

  const fetchAndStoreJokes = async (): Promise<void> => {
    const httpResponse = await axios.get(`${apiBaseURL}/jokes`);
    setJokeData(httpResponse.data);
    console.log(jokeData);
  };

  const saveNewJoke = async (jokeData: JokeType): Promise<void> => {
    const httpResponse = await axios.post(`${apiBaseURL}/jokes`, jokeData);
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
  }, []);

  const jokeElements = jokeData.map((joke) => {
    return <Joke key={joke.id} setup={joke.setup} punchline={joke.punchline} />;
  });

  return jokeData.length === 0 ? (
    <h1>Getting jokes...</h1>
  ) : (
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
