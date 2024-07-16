import axios from "axios";
import { useEffect, useState } from "react";
import Joke from "./components/Joke";


const App = () => {
    const [jokeData, setJokeData] = useState<any[]>([]);

    useEffect(() => {
        console.log("effect ran")
        axios.get("https://jokes-api-v1.onrender.com/jokes").then(data => console.log(data))
    }, [])

    const jokeElements = jokeData.map(joke => {
        return (<Joke setup={joke.setup} punchline={joke.punchline} />)
    })
    return (<main>
        {jokeElements}
    </main>)
}

export default App