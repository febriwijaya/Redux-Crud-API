import axios from 'axios'
import Swal from 'sweetalert2'

import {
  UPDATE_PEOPLE_REQUEST,
  UPDATE_PEOPLE_SUCCESS,
  UPDATE_PEOPLE_FAILURE
} from '../types/UpdateTypes'
import { fetchPeople } from './DebugActions'

export const updatePeople = (newInput: any, key: any) => {
  return (dispatch: any) => {
    dispatch(updatePeopleRequest())
    axios.put(
      `http://localhost:5000/keys/${key}`, {
      firstName: newInput.firstName,
      lastName: newInput.lastName,
      key: newInput.key
    }
    )
      .then((response: any) => {
        const people = response.data
        dispatch(updatePeopleSuccess(people))
        dispatch(fetchPeople)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data Berhasil di Update!',
        })
      })
      .catch((error: any) => {
        dispatch(updatePeopleFailure(error.message))
      })
  }
}

export const updatePeopleRequest = () => {
  return {
    type: UPDATE_PEOPLE_REQUEST
  }
}

export const updatePeopleSuccess = (people: any) => {
  return {
    type: UPDATE_PEOPLE_SUCCESS,
    payload: people
  }
}

export const updatePeopleFailure = (error: any) => {
  return {
    type: UPDATE_PEOPLE_FAILURE,
    payload: error
  }
}