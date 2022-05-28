import { Action } from "@ngrx/store";

export const ADD_NEW_ITEM: string = 'ADD_NEW_ITEM';
export const REMOVE_ITEM: string = 'REMOVE_ITEM';

export class AddItem implements Action {
    readonly type = ADD_NEW_ITEM;
    constructor(public payload: number){}
}

export class RemoveItem implements Action {
    readonly type: string = REMOVE_ITEM;
    constructor(public payload: number){}
}

export type  THomeActions = AddItem | RemoveItem;