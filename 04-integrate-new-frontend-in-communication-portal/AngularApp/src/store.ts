import {Action, createStore, Store} from 'redux';

export interface IAppState {
    elementList: any[]
}


export const INITIAL_STATE: IAppState = {
    elementList: [],
};

export class ListActions {
    static FINISH_ITEM = 'FINISH_ITEM';
    static ADD_ITEM = 'ADD_ITEM';

    finishItem(payload: number): any {
        return {type: ListActions.FINISH_ITEM, payload: payload};
    }

}

export function rootReducer(lastState: IAppState, action: any): IAppState {
    switch (action.type) {
        case ListActions.ADD_ITEM:
            return {
                elementList: [...lastState.elementList, {value: action.payload, completed: false}]
            };
        case ListActions.FINISH_ITEM:
            lastState.elementList[action.payload] = {...lastState.elementList[action.payload], completed: true};
            return {elementList: lastState.elementList};
 

    }

    return lastState;
}

export const storeInstance: Store<IAppState> = createStore(rootReducer, INITIAL_STATE);
