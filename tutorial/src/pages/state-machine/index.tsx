import { useEffect, useState } from "react"
import {useMachine} from '@xstate/react'
import {machine2} from '../machine'

const consoleLogTransition = () => {
    const newState = machine2.transition(machine2.initialState, {
        type: "Mute"
    })
    console.log(newState.value, newState.context)
}

const StateMachine = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, send] = useMachine(machine2)
    console.log(state.value)

    useEffect(() => {
        consoleLogTransition()
    }, [])

    return (
        <div>
            <pre style={{marginBottom: "2rem"}}>
                {JSON.stringify({
                    value: state.value,
                    context: state.context
                },
                null,
                2)}
            </pre>
            {state.nextEvents.map((event, idx)=>{
                return(
                    <div key={idx} style={{marginBottom: "1rem"}}>
                        <button onClick={()=> send(event)}>
                            {event}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default StateMachine