import { ADD_FLATE_FAILURE, ADD_FLATE_REQUEST, ADD_FLATE_SUCCESS, EDIT_FLATE_FAILURE, EDIT_FLATE_REQUEST, EDIT_FLATE_SUCCESS, DELETE_FLATE_FAILURE, DELETE_FLATE_REQUEST, DELETE_FLATE_SUCCESS, HANDLE_STATE } from "./actionType"

export const initialState = {
    err: "",
    data: [],
    isEdit: false,
    isDelete: false,
    isAdd: false,
    count: 0,
    totalPages: 0,
    page: 1,
    limit: 5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FLATE_REQUEST:
            return {
                ...state
            };

        case ADD_FLATE_SUCCESS:
            return {
                ...state,
                isAdd: true
            };

        case ADD_FLATE_FAILURE:
            return {
                ...state,
                err: ""
            };

        case EDIT_FLATE_REQUEST:
            return {
                ...state
            }
        case EDIT_FLATE_SUCCESS:
            return {
                ...state,
                isEdit: true
            }
        case EDIT_FLATE_FAILURE:
            return {
                ...state,
                err: action.payload
            }
        case DELETE_FLATE_REQUEST:
            return {
                ...state
            }
        case DELETE_FLATE_SUCCESS:
            return {
                ...state,
                isDelete: true
            }
        case DELETE_FLATE_FAILURE:
            return {
                ...state,
                err: action.payload
            }
        case HANDLE_STATE:
            return {
                ...state,
                isAdd: false,
                isDelete: false,
                isEdit: false
            }
        default:
            return state;
    }
};

export default reducer