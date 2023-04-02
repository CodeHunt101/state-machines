// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "Mute microphone" | "Unmute microphone" | "Unmute microphone";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "Mute microphone": "Mute" | "xstate.init";
    "Unmute microphone": "Mute" | "xstate.stop";
    "Unmute microphone": "Mute";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "Microfone"
    | "Microfone.Muted"
    | "Microfone.Unmuted"
    | "Video"
    | "Video.Hiding video"
    | "Video.Showing video"
    | {
        Microfone?: "Muted" | "Unmuted";
        Video?: "Hiding video" | "Showing video";
      };
  tags: never;
}
