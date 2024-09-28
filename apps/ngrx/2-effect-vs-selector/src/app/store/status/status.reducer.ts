import { createReducer, on } from '@ngrx/store';
import * as StatusActions from './status.actions';
import { Status } from './status.model';

export const statusFeatureKey = 'status';

export interface StatusState {
  statuses: Status[];
}

export const initialState: StatusState = {
  statuses: [],
};

export const statusReducer = createReducer(
  initialState,
  on(StatusActions.loadStatusesSuccess, (state, { statuses }): StatusState => {
    return {
      ...state,
      statuses,
    };
  }),
);
