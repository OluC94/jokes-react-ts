export interface JokeView {
  setup: string;
  punchline: string;
  creation_time?: string;
}

export interface JokeViewWithId extends JokeView {
  id: number;
}
