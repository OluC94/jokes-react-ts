import { JokeViewWithId } from "../types";

const Joke = (props: { jokeData: JokeViewWithId }) => {
  const { jokeData } = props;
  return (
    <section className="joke">
      {jokeData.setup && <h3>Setup: {jokeData.setup}</h3>}
      <p>{jokeData.punchline}</p>
      <hr />
    </section>
  );
};

export default Joke;
