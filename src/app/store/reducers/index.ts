import { ActionReducerMap } from '@ngrx/store';
import { IHomeState, HomeReducer } from 'src/app/components/home/store/home.reducer';

export interface AppState { home: IHomeState;};

export const rootReducer = {};

export const reducers: ActionReducerMap<AppState, any> = {
    home: HomeReducer
};