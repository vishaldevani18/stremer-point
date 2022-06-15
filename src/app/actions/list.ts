import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';

export namespace ListActions {
  export enum Type {
    GET_LIST = 'GET_LIST',
    GET_RANDOM_MAP = 'GET_RANDOM_MAP'
  }

  export const getList = createAction(Type.GET_LIST);
  export const getRandomMap = createAction(Type.GET_RANDOM_MAP);
}

export const getRandomMap = (dispatch: Dispatch) => {
  const { Type, ...actions } = ListActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as ListActions;
};
export type ListActions = Omit<typeof ListActions, 'Type'>;
export const useListActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = ListActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as ListActions;
};
