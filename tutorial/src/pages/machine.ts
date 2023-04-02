import { createMachine } from "xstate";

export const promiseMachine = createMachine({
  predictableActionArguments: true,
  /** @xstate-layout N4IgpgJg5mDOIC5QBED2UB0BBWAbMYADgMQAyqArhAAQByqAlrGANoAMAuoqIarAwBcGqAHbcQAD0QBWACwYAnNIDsbAMwBGAEzSANCACeiDW2UZlytbLXLpAXzv60mHPiLEAygFswuXLGoAM1RUCHYuJBBefiFRcSkEaTUMNgAOBVTrW30jBABaVOTpADZi2TZinQcndGwAdwBDAGswYgAxBr8AhrwCQnDxaMFhMUiEpJS1aQ0SnRzEPK0FM1llLWLZ+0cQZ3rmsAwPN0IDMkoaEUZmAcih2NHQBPKzUrYZyr1DBcKU0vKP6o7WpYRotDAAITAUCgDBEUGIAHEGAA3MDUAAqACcwA0BDceHxhnExoglgoMGopgobJ9cspUhhKiZqbYHNtLhA4OJnINCfd4gsNBpktSqTT5vk1JlFGsNgDtrtXH1eTERgL8htFJTpCzaQstGx5MUFBp-lUFcDQWAVUSHpJjKkGWx1AoKnMvvkNKoMCUym6tjUXFbDsdcgTVcTHqS1MUUi7-RKCskKn75YG9mCPABjBrYiA2-kkxKpMxS4rKDQlvX5H4ps0BoFB-YQqEwuEFtVF9ZmNhyYpVxOx5307RbBxAA */
  id: "Dog", //to identify the machine
  initial: "Awake", //to specify the initial state node this machine should be in
  states: {
    Asleep: {
      on: {
        "Loud Noise": "Awake.Scared",
        "Smells food": "Awake.Sleepy",
      },
    },

    Awake: {
      on: {
        "Falls asleep": "Asleep",
      },

      states: {
        Sleepy: {
          on: {
            "Loud noise": "Scared",
          },
        },

        Scared: {},
        Begging: {
          on: {
            "Give Treat": {
              target: "Begging",
              internal: true,
            },
          },
        },
      },

      initial: "Begging",
    },
  },
});

export const machine = createMachine({
  predictableActionArguments: true,
  /** @xstate-layout N4IgpgJg5mDOIC5QHUCGAbA1gOjQSwBc8A7KAYgBkxUA3MAAgAsB7AWzAG0AGAXUVAAOzWITzNi-EAA9EARgCsXbAE4ATLIAcAdnkAaEAE9EG1dlXyAvhf1os2APLF6qegHcMmMgHEwBegCNUAGNMJjZOXkkhESJxSRkEABZzbC1kzR19IwQTM0srfWJmCDhJW0wo4VE4pGlEAFoANiyGxoKQctxUUVJKmLEJWoTklpzTHXbOx2c3Dz7qwdAEgGYuWTMtZcTlzMNjcfybDy6sejBiEoh52MW6hHllDWwueUTG7T09nPX8qyA */
  id: "Walk", //to identify the machine
  initial: "Waiting", //to specify the initial state node this machine should be in
  states: {
    Waiting: {
      on: {
        "Leave home": {
          target: "On a walk",
        },
      },
    },
    "On a walk": {
      on: {
        "Get back home": {
          target: "Walk ended",
        },
      },
    },
    "Walk ended": {
      type: "final",
    },
  },
});

export const machine2 = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAUAWB7AdmABAYQEMAbInAWwIGNUBLbAOgFkbKAndABwwcYFcAXSAGIAqpjICwAbQAMAXUSgO6WDX40sikAA9EAZgCMAFnoAOAKwHzANgBM5gDQgAnoltGA7PSPnD9gL7+TmhYuIQk5FS0PCzsXKH0YhKCEEJ8grIKSCDKquqa2boIenoy9B4yfo4uiFYGgcHcYcSkFNR0YPQAajQQYOj0AMoYAO50UDgAbr39QgASM1Mz6JlauWoamFpFtnpeNvZOrgjmlfQAnDJ25g0gIdj4LZHtDD19AwsQ40vvQsPoIx+-VW2XW+S2hTce3oB2qxx8em8VwCt0w6D68Gy92aETa0TAaxUGwKoCKAFp3EdEBSjLdsY9cVEOkxYpwmoS8pttm4jFSENZETcgncmgzWkyYmw2Ql0pAOcSIaTEB5bHyrOZyrZrLC6aLwuKXp1mFL4gwkpIIPLwdyTgZbPQqmrTPbzOZzqZzuZTCUfXpacL6frnvjussrVzIQhKTVitqLsihY1QmLg8y3v0hqNvtN3uGSTplaqYz5zt4PV7fb7dcmg3i08t6J9s2HQUTrZG9KYTNZPY7i9YDBdy97KyVAoEgA */
  predictableActionArguments: true,
  id: "Phone Call machine",
  type: "parallel",
  states: {
    Microphone: {
      states: {
        Muted: {
          entry: "Mute microphone",
          exit: "Unmute microphone",
          on: {
            Unmute: {
              actions: "Unmute microphone",
              target: "Unmuted",
            },
          },
        },
        Unmuted: {
          on: {
            Mute: {
              actions: "Mute microphone",
              target: "Muted",
            },
          },
        },
      },

      initial: "Muted",
    },
    Video: {
      states: {
        "Showing video": {
          on: {
            "Hide video": "Hiding video",
          },
        },
        "Hiding video": {
          on: {
            "Show video": "Showing video",
          },
        },
      },

      initial: "Showing video",
    },
  },
}).withConfig({
  actions: {
    "Mute microphone": () => {
      console.log("action: ", "Microphone is muted");
    },
    "Unmute microphone": () => {
      console.log("action: ", "Microphone is unmuted");
    },
  },
});
