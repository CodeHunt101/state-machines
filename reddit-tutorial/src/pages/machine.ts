import { createMachine, assign } from 'xstate'

type SelectEvent = {
    type: string;
    name: string;
  }

type RedditMachineContext = {
    subreddit?: string | null;
    posts?: {title: string, id: string}[] | null;
    lastUpdated?: number | null;
}

const invokeFetchSubreddit = async ({subreddit}: any) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((child: { data: string; }) => child.data);
}

export const redditMachine = createMachine<RedditMachineContext, SelectEvent>({
    /** @xstate-layout N4IgpgJg5mDOIC5QCdIQJYBcDEBlAogDL4DCAKgNoAMAuoqAA4D2sW6TAdvSAB6IAsAJgA0IAJ6IAjAFZ+AXzmjUEDJgB0sMABswAY0yQ1WpgEMMHKNgicwa9BwBuTANa2AZmEy6AFgFpYAK4ARsqq1HRIIMysmOxckXwIAMzSAGxq0gDsVEmSgtKiEggykgpKaFga2noGEEam5pZgyMhMyGoMWiaYbm0AtmoeXn6BIRWY4dzRbJzciSnpWTl5BeKIgvz8avzSufkKiiAcTBBw3KFYUywz8aCJvqmFiL4bZSAX6ugQOlcxcXMCERrBAATmkGTeHyqOn0kF+NwBxU2GSomQAHCsnghUkkIYcoZoYbV6mZ7FB4bFZgkpCDBCj0ZjgZIcWpMoJUml9vjxtCaoZjGY4ZFppTbrxEJy1II0SCqKl8ljJGy1CDMhz5dJITzCXy6m4TOgdBAKf9qQhJdLZRqsRtcTs9pqDkA */
    predictableActionArguments: true,
    id: 'reddit',
    initial: 'idle', // 1. no subreddit selected yet (the initial state)
    
    // 2. context represents portentially infinite states
    context: {
        subreddit: null, // 3. none selected
    },
    states: {
        idle: {},
        selected: {},
    },
    // 4. Transitions define how the machine reacts to events.
    on: {
        SELECT: {
            target: '.selected', // 5. transition to its child '.selected' state 
            // 6. The assign() action is used to update the machine's context.
            actions: assign({
                subreddit: (_context, event: SelectEvent) => {
                  console.log({event})
                  return event.name}
            }) // 7. assign event.name to the context.subreddit
        }
    }
})

export const createSubredditMachine = (subreddit: any) => {
  return createMachine<RedditMachineContext, SelectEvent>({
    /** @xstate-layout N4IgpgJg5mDOIC5SwK4CMBOkIEsAuAdADYD2AhrgHZQDEEJlYBOlAbiQNZMBmYeAxgAsAtKkzZ8AbQAMAXUSgADiVj4cDBSAAeiAEwBmAIwFpANl0BWADQgAnnv3SAvk5tisEXIVIUWtMBgYJBgEikRkeNzBALYEvAIi7hJ4MvJIIMqqeOqUmjoIBsZmljb2CIb6ui5u6B5exOQQkDQASgCiAGLtAMoAEqmamWoa6fmOpgT6FoYW5tZ2iIYA7ACcBBbVIEme+HFkOEQoWK1tACotAJoD6UPZI6BjlgSG0jNzpYgAHMYbm5QkTXg6W2XkGKmGuVGiGEpg+CBhmxBux8VCgYKyOTyiAALLo4Z99ARTL8auIdt5GpB0RCsQhsfoJktviUFuVPp8TAT9NyebzDIjask9gcjmBqXdIQ8cQyCEzDCyyitpJzeaqeS4XEA */
    id: 'subreddit',
    initial: 'loading',
    context: {
      subreddit, // subreddit name passed in
      posts: null,
      lastUpdated: null
    },
    states: {
      loading: {
        invoke: {
          id: 'fetch-subreddit',
          src: invokeFetchSubreddit,
          onDone: {
            target: 'loaded',
            actions: assign({
              posts: (_, event) => event.data,
              lastUpdated: () => Date.now()
            })
          },
          onError: 'failure'
        }
      },
      loaded: {
        on: {
          REFRESH: 'loading'
        }
      },
      failure: {
        on: {
          RETRY: 'loading'
        }
      }
    }
  });
};