import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ListActions } from 'app/actions/list';
import { ListModel } from 'app/models';
import { ListData } from 'app/constants/list';
const initialState: RootState.StreamState = ListData;

export const listReducer = handleActions<RootState.StreamState, ListModel>(
  {
    [ListActions.Type.GET_LIST]: (state, action) => {
      if (action.payload) {
        
        return [...state];
      }
      return state;
    },
    [ListActions.Type.GET_RANDOM_MAP]: (state, action) => {
      localStorage.setItem('Old',JSON.stringify(state))
      console.log('oldsa',state)
      const min = 0;
      const max = state.length - 1;
      const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      let row = state[randomIndex];
      const minScore = 20;
      const maxScore = 30;
      const randomScoreAdd = (Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore) * 1000;
      row.score = row.score + randomScoreAdd;
      state[randomIndex] = row;
      return [...state.sort((a: any, b: any) => b.score - a.score)];
    }
  },
  initialState
);
