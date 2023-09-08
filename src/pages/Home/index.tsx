import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import * as S from './styles'

import { CycleForm } from '../../components/CycleForm'
import { Countdown } from '../../components/Countdown'

type CycleProps = {
  id: number
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type CycleContextType = {
  activeCycle: CycleProps | undefined
  activeCycleId: string | null
  markCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CycleContextType)

const cycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle have to be minimum 60 minutes')
    .max(60, 'The cycle have to be maximum 60 minutes'),
})

type CycleForm = zod.infer<typeof cycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<CycleForm>({
    resolver: zodResolver(cycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find(
    (cycle) => cycle.id.toString() === activeCycleId,
  )

  const markCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id.toString() === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const onCreateCycle = (data: CycleForm) => {
    const newCycle: CycleProps = {
      id: new Date().getTime(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id.toString())
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id.toString() === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const isSubmitDisabled = watch('task')

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      <S.HomeContainer>
        <form onSubmit={handleSubmit(onCreateCycle)}>
          <FormProvider {...newCycleForm}>
            <CycleForm />
          </FormProvider>
          <Countdown />

          {activeCycle ? (
            <S.StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} />
              Stop
            </S.StopCountdownButton>
          ) : (
            <S.StartCountdownButton type="submit" disabled={!isSubmitDisabled}>
              <Play size={24} />
              Start
            </S.StartCountdownButton>
          )}
        </form>
      </S.HomeContainer>
    </CycleContext.Provider>
  )
}
