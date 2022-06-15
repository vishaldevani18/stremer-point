import { ListModel } from 'app/models';

export interface RootState {
  streams: RootState.StreamState;
  router?: any;
}

export namespace RootState {
  export type StreamState = ListModel[];
}
