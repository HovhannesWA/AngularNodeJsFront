import * as HomeActions from './home.actions';

export interface IHomeState {
  items: number[];
}

const initialState: IHomeState = {
  items: [1, 2, 3],
};

export function HomeReducer(
  state: IHomeState = initialState,
  action: HomeActions.THomeActions
): IHomeState {
  switch (action.type) {
    case HomeActions.ADD_NEW_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case HomeActions.REMOVE_ITEM:
      let new_items = state.items.filter((_,index) => {
        return index !== action.payload
      })
      return {
        ...state,
        items: new_items
      }  
    default:
      return state;
  }
}