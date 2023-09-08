import {
  createContext,
  useState,
  useReducer,
  ReactNode,
  useEffect,
} from 'react'
import { differenceInSeconds } from 'date-fns'

import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCycleAsFinishedAction,
} from '../reducers/cycles/actions'

export type CycleData = {
  task: string
  minutesAmount: number
}

export type CycleProps = {
  id: number
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type CycleContextType = {
  cycles: CycleProps[]
  activeCycle: CycleProps | undefined
  activeCycleId: number | null
  markCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  onCreateCycle: (data: CycleData) => void
  handleInterruptCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storage = localStorage.getItem('@pomodoro-timer:cycles-1.0.0')

      if (storage) {
        return JSON.parse(storage)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@pomodoro-timer:cycles-1.0.0', stateJSON)
  }, [cyclesState])

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const onCreateCycle = (data: CycleData) => {
    const newCycle: CycleProps = {
      id: new Date().getTime(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const handleInterruptCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  const markCycleAsFinished = () => {
    dispatch(markCycleAsFinishedAction())
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        onCreateCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
