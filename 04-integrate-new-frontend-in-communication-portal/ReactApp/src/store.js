import { createStore } from 'redux';

const initialState = {
    elementList: []
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_ITEM':
            return {
                elementList: [...state.elementList, {value: action.payload, completed: false}]
            };
        case 'FINISH_ITEM':
            state.elementList[action.payload] = {...state.elementList[action.payload], completed: true};
            return {elementList: state.elementList};
        case 'FINISH_ALL':
            return {
                elementList: state.elementList.map(item => {
                    item.completed = true;
                    return item;
                })
            };
        case 'REMOVE_ALL':
            return {
                elementList: []
            };
        default:
            return state;
    }
}

export const storeInstance = createStore(reducer);