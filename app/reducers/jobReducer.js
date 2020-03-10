import { START_WORKING, STOP_WORKING } from '../actions/type';
import JobState from '../global/JobState';

const initialState = {
  jobId: '26074',
  jobState: JobState.NEW,
  clockIn: null,
  clockOut: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_WORKING:
      return {
        ...state,
        jobState: JobState.STARTED,
        clockIn: action.time,
      };
    case STOP_WORKING:
      return {
        ...state,
        jobState: JobState.FINISHED,
        clockOut: action.time,
      };
  }
  return state;
}
