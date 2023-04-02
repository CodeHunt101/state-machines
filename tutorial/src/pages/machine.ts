import { createMachine } from "xstate";

export const promiseMachine = createMachine({
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

export const machine2 = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAUAWB7AdmABAYQEMAbInAWwIGNUBLbAOgFkbKAndAMyzCYFcAXSAGIAqpjICwAbQAMAXUSgADulg1+NLIpAAPRAGYAjPvoAWAGwAOAOwBWADQgAnogBMp62dtHXtgL5+jmjc+MSkFNR0PMxsnNz0YhKCEEKMkrIKSCAqahpaWXoI+q6exTI+Ds6IhraGAUEY2KEk5FS0DABqNBBg6PQAyhgA7nRQOABu3b1CABJTE1PoGdo56pqY2oWuNvRW+rYAnPp2ji4Ittbm9Ef7R3b1IMFNhC0R7TxdPX1zEKMLX0JBughv9esssqs8hsCm4dntDsdKmdbK4rqZ9LdEQFAiBMOgevAsk9cC9wm0oitVGt8qBCgBadynRAM0wPYnNMmRBgxdhcbCU3LrTZuUxMhDmEz+HHs0mtLnRFi8+JpZIC6nQ2mIayuMU1Wz0bXmWzmXxsxoksJy95MRVxBiJSQQNVQ4XnGSWa6uA5WE5VBCGSyuei2Q6WA62SwYqP6VnS80cq1ReifXrOoUwhDWUz0QyuQwyO5IxDoj03BH3OMhWVvJMpvpAkaYMaTL5pmm6aquIO5-OFsXeIO1cwHEru6P6M1Vy01zqLeg-P4t1MQqkujPo7OWQzmUwyE1F877egybcj6xj6PYvxAA */
    id: "Phone Call machine",
    type: "parallel",
    states: {
      Microfone: {
        states: {
          Muted: {
            entry: "Mute microphone",
            exit: "Unimite microphone",
            on: {
              Unmute: {
                actions: "Unmute microphone",
                target: "Unmuted",
              }
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
  },
).withConfig({
  actions: {
    "Mute microphone": () => {
      alert("Microphone is muted");
    },
    "Unmute microphone": () => {
      alert("Microphone is unmuted");
    },
  },
});
