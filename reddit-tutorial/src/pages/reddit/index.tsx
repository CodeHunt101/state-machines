import { useMachine } from "@xstate/react";
import { redditMachine } from "../machine";
import { Subreddit } from "@/modules/subreddit";

const subreddits = ['frontend', 'reactjs', 'vuejs'];

const Reddit = () => {
  const [current, send] = useMachine(redditMachine);
  const { subreddit, posts } = current.context;

  console.log({current})

  return (
    <main>
      <header>
        <select
          onChange={(e) => {
            send({ type: 'SELECT', name: e.target.value });
          }}
        >
          {subreddits.map((subreddit) => {
            return <option key={subreddit}>{subreddit}</option>;
          })}
        </select>
      </header>
      {current.matches('idle') && <div>Please select</div>}
      {subreddit && <Subreddit name={subreddit} key={subreddit} />}
    </main>
  );
};

export default Reddit;