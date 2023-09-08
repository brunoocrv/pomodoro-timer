import { CycleProps } from './reducer'

export enum ACTION_TYPES {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CYCLE_AS_FINISHED = 'MARK_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: CycleProps) {
  return {
    type: ACTION_TYPES.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ACTION_TYPES.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCycleAsFinishedAction() {
  return {
    type: ACTION_TYPES.MARK_CYCLE_AS_FINISHED,
  }
}
