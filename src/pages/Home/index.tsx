import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import * as S from './styles'

const cycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle have to be minimum 60 minutes')
    .max(60, 'The cycle have to be maximum 60 minutes'),
})

type CycleForm = zod.infer<typeof cycleFormValidationSchema>

export function Home() {
  const { handleSubmit, register, watch, reset } = useForm<CycleForm>({
    resolver: zodResolver(cycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const onCreateTask = (data: CycleForm) => {
    console.log(data)

    reset()
  }

  const isSubmitDisabled = watch('task')

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(onCreateTask)}>
        <S.FormContainer>
          <label htmlFor="task">I will work on</label>
          <S.TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give a name to your project"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="project 1" />
          </datalist>

          <label htmlFor="minutesAmount">during</label>
          <S.MinutesAmount
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />

          <span>minutes.</span>
        </S.FormContainer>

        <S.CountDownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountDownContainer>

        <S.StartCountdown type="submit" disabled={!isSubmitDisabled}>
          <Play size={24} />
          Start
        </S.StartCountdown>
      </form>
    </S.HomeContainer>
  )
}
