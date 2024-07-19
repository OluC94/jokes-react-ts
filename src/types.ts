export interface JokeView {
  setup: string;
  punchline: string;
}

export interface JokeViewWithId extends JokeView {
  id: number;
}
