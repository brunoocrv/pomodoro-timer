import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import * as S from './styles'

import { CycleContext } from '../../pages/Home'

export function CycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <S.FormContainer>
      <label htmlFor="task">I will work on</label>
      <S.TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Give a name to your project"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>minutes.</span>
    </S.FormContainer>
  )
}
