import { LOGIN, START_WORKING, STOP_WORKING } from './type';

export const login = token => ({ type: LOGIN, token });

export const startWorking = time => ({ type: START_WORKING, time });
export const stopWorking = time => ({ type: STOP_WORKING, time });
