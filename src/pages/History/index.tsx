import * as S from './styles'

export function History() {
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
            <tr>
              <td>Task 1</td>
              <td>20 minutes</td>
              <td>Há 2 meses</td>
              <td>
                <S.Status status="started">Started</S.Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <S.Status status="done">Done</S.Status>
              </td>
            </tr>
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
