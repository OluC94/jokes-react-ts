import axios from "axios";
import { useEffect, useState } from "react";
import Joke from "./components/Joke";


const App = () => {
    const [jokeData, setJokeData] = useState<any[]>([]);

    const fetchAndStoreJokes = async () => {
        const httpResponse = await axios.get("https://jokes-api-v1.onrender.com/jokes")
        setJokeData(httpResponse.data)
    }

    useEffect(() => {
        fetchAndStoreJokes()
        console.log("effect ran")
        
    }, [])

    const jokeElements = jokeData.map(joke => {
        return (<Joke key={joke.id} setup={joke.setup} punchline={joke.punchline} />)
    })
    return (<main>
        {jokeElements}
    </main>)
}

export default App