import axios from 'axios'
import {
  FETCH_PERSON_REQUEST,
  FETCH_PERSON_SUCCESS,
  FETCH_PERSON_FAILURE
} from '../types/getOneTypes'

export const fetchPerson = (key: any) => {
  return (dispatch: any) => {
    dispatch(fetchPersonRequest())
    axios
      .get(`http://localhost:5000/keys/${key}`)
      .then((response: any) => {
        const person = response.data
        dispatch(fetchPersonSuccess(person))
      })
      .catch((error: any) => {
        dispatch(fetchPersonFailure(error.message))
      })
  }
}

export const fetchPersonRequest = () => {
  return {
    type: FETCH_PERSON_REQUEST
  }
}

export const fetchPersonSuccess = (person: any) => {
  return {
    type: FETCH_PERSON_SUCCESS,
    payload: person
  }
}

export const fetchPersonFailure = (error: any) => {
  return {
    type: FETCH_PERSON_FAILURE,
    payload: error
  }
}