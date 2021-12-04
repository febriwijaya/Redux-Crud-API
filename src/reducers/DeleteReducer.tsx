import {
  DELETE_PEOPLE_REQUEST,
  DELETE_PEOPLE_SUCCESS,
  DELETE_PEOPLE_FAILURE
} from '../types/DeleteTypes'

const initialState = {
  loading: false,
  people: [],
  error: ''
}

const personDeleteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_PEOPLE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PEOPLE_SUCCESS:
      return {
        loading: false,
        people: action.payload,
        error: ''
      }
    case DELETE_PEOPLE_FAILURE:
      return {
        loading: false,
        people: [],
        error: action.payload
      }
    default: return state
  }
}

export default personDeleteReducer