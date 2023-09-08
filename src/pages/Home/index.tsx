import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import * as S from './styles'

import { CycleForm } from '../../components/CycleForm'
import { Countdown } from '../../components/Countdown'

import { CycleContext } from '../../contexts/CyclesContext'

const cycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle have to be minimum 60 minutes')
    .max(60, 'The cycle have to be maximum 60 minutes'),
})

type CycleForm = zod.infer<typeof cycleFormValidationSchema>

export function Home() {
  const { onCreateCycle, activeCycle, handleInterruptCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<CycleForm>({
    resolver: zodResolver(cycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const handleCreateNewCycle = (data: CycleForm) => {
    onCreateCycle(data)

    reset()
  }
  const isSubmitDisabled = watch('task')

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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
  )
}
