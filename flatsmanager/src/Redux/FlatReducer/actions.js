import { ADD_FLATE_FAILURE, ADD_FLATE_REQUEST, ADD_FLATE_SUCCESS, EDIT_FLATE_FAILURE, EDIT_FLATE_REQUEST, EDIT_FLATE_SUCCESS, DELETE_FLATE_FAILURE, DELETE_FLATE_REQUEST, DELETE_FLATE_SUCCESS, HANDLE_STATE } from "./actionType"
import axios from "axios"

// TO ADD FLATES

export const addFlateRequest = () => ({
    type: ADD_FLATE_REQUEST
})

export const addFlateSuccess = (payload) => ({
    type: ADD_FLATE_SUCCESS,
    payload
})

export const addFlateFailure = (payload) => ({
    type: ADD_FLATE_FAILURE,
    payload
})

export const addFlat = (payload) => (dispatch) => {
    dispatch(addFlateRequest())
    axios
        .post("http://localhost:5000/flat", payload)
        .then(() => dispatch(addFlateSuccess()))
        .catch(err => dispatch(addFlateFailure(err)))
}

// TO EDIT FLATE

export const editFlateRequest = () => ({
    type: EDIT_FLATE_REQUEST
})

export const editFlateSuccess = () => ({
    type: EDIT_FLATE_SUCCESS
})

export const editFlateFailure = (payload) => ({
    type: EDIT_FLATE_FAILURE,
    payload
})

export const editFlate = ({ payload }) => (dispatch) => {
    dispatch(editFlateRequest())
    axios
        .post(`http://localhost:5000/flate/edit/${payload._id}`, payload)
        .then(() => dispatch(editFlateSuccess()))
        .catch(err => dispatch(editFlateFailure(err)))
}

//TO DELETE FLATE

export const deleteFlateRequest = () => ({
    type: DELETE_FLATE_REQUEST
})

export const deleteFlateSuccess = () => ({
    type: DELETE_FLATE_SUCCESS
})

export const deleteFlateFailure = (payload) => ({
    type: DELETE_FLATE_FAILURE,
    payload
})

export const deleteflate = ({ id }) => (dispatch) => {
    dispatch(deleteFlateRequest())
    axios
        .delete(`http://localhost:5000/flate/delete/${id}`)
        .then(() => dispatch(deleteFlateSuccess()))
        .catch(err => dispatch(deleteFlateFailure(err)))
}

//to handle State

export const handleState = () => ({
    type: HANDLE_STATE
})