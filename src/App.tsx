import axios from "axios";
import { useEffect, useState } from "react";
import Joke from "./components/Joke";
import "./App.css";
import { JokeView, JokeViewWithId } from "./types";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [jokeData, setJokeData] = useState<JokeViewWithId[]>([]);
  const [newJoke, setNewJoke] = useState<JokeView>({
    setup: "",
    punchline: "",
  });

  const fetchAndStoreJokes = async (): Promise<void> => {
    const httpResponse = await axios.get(`${apiBaseURL}/jokes`);
    setJokeData(httpResponse.data);
  };

  const saveNewJoke = async (jokeData: JokeView): Promise<void> => {
    const httpResponse = await axios.post(`${apiBaseURL}/jokes`, jokeData);
    if (httpResponse.data.outcome === "success") {
      setNewJoke({
        setup: "",
        punchline: "",
      });
      fetchAndStoreJokes();
    } else {
      alert("Something went wrong");
    }
  };

  const handleSubmitJoke = () => {
    const emptyInput =
      newJoke.setup.length === 0 && newJoke.punchline.length === 0;
    if (emptyInput) {
      alert("Please at least enter a punchline");
    } else {
      saveNewJoke(newJoke);
    }
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
    return <Joke key={joke.id} jokeData={joke} />;
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
