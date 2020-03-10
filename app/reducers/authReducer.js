import { LOGIN } from '../actions/type';

const initialState = {
  token: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
      };
  }
  return state;
}
