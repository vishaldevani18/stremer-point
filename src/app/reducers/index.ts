import { combineReducers } from 'redux';
import { RootState } from './state';
import { listReducer } from './list';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  streams: listReducer
});
