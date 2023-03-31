import { createMachine, interpret } from 'xstate';

// createMachine, which is a function that creates a state machine
// interpret, to interpret the machine and make it run, we need to add an interpreter. This creates a service

const promiseMachine = createMachine({
    id: 'promise', //to identify the machine
    initial: 'pending', //to specify the initial state node this machine should be in
    states: { //to define each of the child states
        pending: {
            //Transitions: how the machine reacts to 'events'
            on: {
                RESOLVE: { target: 'resolved' },
                REJECT: { target: 'rejected' }
            }
        },
        resolved: {
            type: 'final'
        },
        rejected: {
            type: 'final'
        }
    }
});

const promiseService = interpret(promiseMachine).onTransition((state) =>
    console.log(state.value)
);

// Start the service
promiseService.start();
// => 'pending'

promiseService.send({ type: 'RESOLVE' });
// => 'resolved'