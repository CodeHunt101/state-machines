import { createMachine, assign } from 'xstate'

type SelectEvent = {
    type: string;
    name: string;
  }

type MachineContext = {
    subreddit?: string | null;
    posts?: {title: string}[] | null
}

const invokeFetchSubreddit = async ({subreddit}: any) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((child: { data: string; }) => child.data);
}

export const redditMachine = createMachine<MachineContext, SelectEvent>({
    /** @xstate-layout N4IgpgJg5mDOIC5QCdIQJYBcDEBlAogDL4DCAKgNoAMAuoqAA4D2sW6TAdvSAB6IAsAJgA0IAJ6IAjAFZ+AXzmjUEDJgB0sMABswAY0yQ1WpgEMMHKNgicwa9BwBuTANa2AZmEy6AFgFpYAK4ARsqq1HRIIMysmOxckXwIAMzSAGxq0gDsVEmSgtKiEggykgpKaFga2noGEEam5pZgyMhMyGoMWiaYbm0AtmoeXn6BIRWY4dzRbJzciSnpWTl5BeKIgvz8avzSufkKiiAcTBBw3KFYUywz8aCJvqmFiL4bZSAX6ugQOlcxcXMCERrBAATmkGTeHyqOn0kF+NwBxU2GSomQAHCsnghUkkIYcoZoYbV6mZ7FB4bFZgkpCDBCj0ZjgZIcWpMoJUml9vjxtCaoZjGY4ZFppTbrxEJy1II0SCqKl8ljJGy1CDMhz5dJITzCXy6m4TOgdBAKf9qQhJdLZRqsRtcTs9pqDkA */
    predictableActionArguments: true,
    /** @xstate-layout N4IgpgJg5mDOIC5QCdIQJYBcDEBlAogDL4DCAKgNoAMAuoqAA4D2sW6TAdvSAB6IAsAJgA0IAJ6IAjPyoBfeaI5MIcbqggZM3Zq0zsuSXogC0ANlESEZhSHWaAdOggAbMNpZtO3PggCsADnsqKgBmAE4qU0FfC0R-SXtfGzsse1gwVwBjTEh3XX1vKSjEqgB2eOjYhElTEPt+UtNfKKT5WSA */
    id: 'reddit',
    initial: 'idle', // 1. no subreddit selected yet (the initial state)
    
    // 2. context represents portentially infinite states
    context: {
        subreddit: null, // 3. none selected
        posts: null
    },
    states: {
        idle: {},
        selected: {
            /* 9. In statecharts, states can be nested within other states. These nested states are called compound states.
                  We can make 3 child states that represent when the subreddit is 'loading', 'loaded' or 'failed' */
            initial: 'loading',
            states: {
                loading: {
                    /* 8. Since every promise can be modeled as a state machine, XState can invoke promises as-is.
                  When a subreddit is selected (that is, when the machine is in the 'selected' state due to a 'SELECT' event), 
                  the machine should start loading the subreddit data. */
                    invoke: {
                        id: 'fetch-subreddit',
                        src: invokeFetchSubreddit,
                        onDone: {
                            target: 'loaded',
                            actions: assign({
                                posts: (_context, event) => event.data
                            })
                        },
                        onError: 'failed'
                    }
                },
                loaded: {},
                failed: {}
            }

        },
        
    },
    // 4. Transitions define how the machine reacts to events.
    on: {
        SELECT: {
            target: '.selected', // 5. transition to its child '.selected' state 
            // 6. The assign() action is used to update the machine's context.
            actions: assign({
                subreddit: (_context, event: SelectEvent) => event.name
            }) // 7. assign event.name to the context.subreddit
        }
    }
})
