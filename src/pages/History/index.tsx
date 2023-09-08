import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'

import * as S from './styles'

import { CycleContext } from '../../contexts/CyclesContext'

export function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <S.HistoryContainer>
      <h1>My history</h1>
      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <S.Status status="done">Done</S.Status>
                  )}
                  {cycle.interruptedDate && (
                    <S.Status status="dropped">Dropped</S.Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <S.Status status="started">In Progress</S.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
