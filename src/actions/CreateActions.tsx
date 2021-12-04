import axios from 'axios'
import Swal from 'sweetalert2'

import {
  CREATE_PEOPLE_REQUEST,
  CREATE_PEOPLE_SUCCESS,
  CREATE_PEOPLE_FAILURE
} from '../types/CreateTypes'
import { fetchPeople } from './DebugActions'

export const createPeople = (newInput: any) => {
  return (dispatch: any) => {
    dispatch(createPeopleRequest())
    axios.post(
      "http://localhost:5000/keys", {
      firstName: newInput.firstName,
      lastName: newInput.lastName,
      key: newInput.key
    }
    )
      .then((response: any) => {
        const people = response.data
        dispatch(createPeopleSuccess(people))
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data Berhasil Ditambahkan!',
        })
        dispatch(fetchPeople())
      })

      .catch((error: any) => {
        dispatch(createPeopleFailure(error.message))
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      })
  }
}

export const createPeopleRequest = () => {
  return {
    type: CREATE_PEOPLE_REQUEST
  }
}

export const createPeopleSuccess = (people: any) => {
  return {
    type: CREATE_PEOPLE_SUCCESS,
    payload: people
  }
}

export const createPeopleFailure = (error: any) => {
  return {
    type: CREATE_PEOPLE_FAILURE,
    payload: error
  }
}