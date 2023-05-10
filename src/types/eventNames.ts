export enum EventNames {
  CLIENT_CONNECTED = 'client-connected',
  SET_PROGRAM = 'set-program',
  START_PROGRAM = 'start-program',
  PAUSE_PROGRAM = 'pause-program',
  STOP_PROGRAM = 'stop-program',
  RESET_PROGRAM = 'reset-program',
  END_STANDBY = 'end-standby',
  TOGGLE_SHOW_CONTROLS = 'toggle-show-controls',
  SHOW_CONTROLS = 'show-controls',
  HIDE_CONTROLS = 'hide-controls',
  REQUEST_FULLSCREEN = 'request-fullscreen',
  USER_SELECTED_SEGMENT = 'user-selected-segment',
  SCREEN_IS_READY = 'screen-is-ready',
  IDENTIFY_SCREENS = 'identify-screens',
}

export type EventLog = {
  event: string
  timestamp: number
}
