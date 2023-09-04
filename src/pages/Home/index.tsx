import { Play } from 'phosphor-react'

import * as S from './styles'

export function Home() {
  return (
    <S.HomeContainer>
      <form>
        <S.FormContainer>
          <label htmlFor="task">I will work on</label>
          <S.TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give a name to your project"
          />

          <datalist id="task-suggestions">
            <option value="project 1" />
          </datalist>

          <label htmlFor="minutes-amount">during</label>
          <S.MinutesAmount
            type="number"
            id="minutes-amount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
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

        <S.StartCountdown type="submit">
          <Play size={24} />
          Start
        </S.StartCountdown>
      </form>
    </S.HomeContainer>
  )
}
