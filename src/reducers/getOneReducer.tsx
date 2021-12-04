import {
  FETCH_PERSON_REQUEST,
  FETCH_PERSON_SUCCESS,
  FETCH_PERSON_FAILURE
} from '../types/getOneTypes'

const initialState = {
  loading: false,
  people: [],
  error: ''
}

const personOneReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PERSON_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PERSON_SUCCESS:
      return {
        loading: false,
        people: action.payload,
        error: ''
      }
    case FETCH_PERSON_FAILURE:
      return {
        loading: false,
        people: [],
        error: action.payload
      }
    default: return state
  }
}

export default personOneReducer