
import {USER_STATE_CHANGE, CLEAR_DATA } from '../constants'

const initialState = {
    currentUser: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        
        default:
            return state;
    }
}