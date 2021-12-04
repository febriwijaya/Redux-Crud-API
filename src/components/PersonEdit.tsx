import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { updatePeople } from "../actions/UpdateActions";
import { fetchPeople } from "../actions/DebugActions";
import Header from "./Navbar"
import Footer from "./Footer";

let Loading = styled.div`
    text-align: center;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    margin: 200px 0px 0px 600px
`

function PersonEdit({ personData, fetchPeople }: any) {
  const key = useParams()
  const [newKey, setNewKey] = useState(key.key)
  const [newFirstName, setNewFirstName] = useState(key.firstName)
  const [newLastName, setNewLastName] = useState(key.lastName)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validKey, setValidKey] = useState(true)
  const [validFirstName, setValidFirstName] = useState(true)
  const [validLastName, setValidLastName] = useState(true)
  const [keyError, setKeyError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const state = { button: 1 }
  const [onValidKey, setOnValidKey] = useState(true)
  const [onValidFirstName, setOnValidFirstName] = useState(true)
  const [onValidLastName, setOnValidLastName] = useState(true)


  useEffect(() => {
    fetchPeople()
  }, [])

  const handleSubmit = (e: any) => {
    if (state.button === 1) {
      dispatch(updatePeople({
        firstName: newFirstName,
        lastName: newLastName,
        key: newKey
      }, newKey))
      dispatch(fetchPeople)
      e.target.reset()
      setNewKey('')
      setNewFirstName('')
      setNewLastName('')
      navigate('/');
    }
    if (state.button === 2) {
      navigate('/');
    }
  }

  const onChangeFirstName = (e: any) => {
    const reg = /^[a-zA-Z\b]+$/
    setNewFirstName(e.target.value)
    if (e.target.value === '') {
      setFirstNameError('First name tidak boleh kosong.')
      setValidFirstName(false)
      setOnValidFirstName(false)
    } else if (!reg.test(e.target.value)) {
      setFirstNameError(`First name harus alphabet.`)
      setValidFirstName(false)
      setOnValidFirstName(false)
    } else if (e.target.value !== '' && reg.test(e.target.value)) {
      setFirstNameError('')
      setValidFirstName(true)
      setOnValidFirstName(true)
    }
  }

  const onChangeLastName = (e: any) => {
    const reg = /^[a-zA-Z\b]+$/
    setNewLastName(e.target.value)
    if (e.target.value === '') {
      setLastNameError('Last name tidak boleh kosong.')
      setValidLastName(false)
      setOnValidLastName(false)
    } else if (!reg.test(e.target.value)) {
      setLastNameError(`Last name harus alphabet.`)
      setValidLastName(false)
      setOnValidLastName(false)
    } else if (e.target.value !== '' && reg.test(e.target.value)) {
      setLastNameError('')
      setValidLastName(true)
      setOnValidLastName(true)
    }
  }

  return personData.loading ? (
    <>
      <Loading></Loading>
    </>
  ) : personData.error ? (
    <h2>{personData.error}</h2>
  ) : (
        <div>
          <Header title="Edit Person Information"></Header>
          <div className="container">
            <button className="btn btn-dark my-2" onClick={() => navigate('/')}>&#8656; Go Back</button>
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <h1 className="text-center font-weight-bold">Edit Users</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="key">Key : </label>
                        <input disabled className='form-control' type="text" placeholder={key.key} defaultValue={key.key} name="key" />
                        <p className="text-danger">Key tidak bisa diedit.</p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="firstName">FirstName : </label>
                        <input className='form-control' type="text" placeholder={key.firstName} defaultValue={key.firstName} name="firstName" onChange={onChangeFirstName} />
                        {validFirstName === false ? <p className="text-danger">{firstNameError}</p> : <p className="text-success">First name yang anda masukkan benar.</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">LastName : </label>
                        <input className='form-control' type="text" placeholder={key.lastName} defaultValue={key.lastName} name="lastName" onChange={onChangeLastName} />
                        {validLastName === false ? <p className="text-danger">{lastNameError}</p> : <p className="text-success">Last name yang anda masukkan benar.</p>}
                      </div>

                      <div className="form-group">
                        <button className="btn btn-primary" onClick={() => (state.button = 1)} disabled={keyError !== '' || firstNameError !== '' || lastNameError !== '' || validKey === false || validFirstName === false || validLastName === false}>
                          Submit
                    </button>
                        <button className="btn btn-danger mx-2" onClick={() => (state.button = 2)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <div style={{ marginTop: "220px" }}></div>
        </div>
      )
}

const mapStateToProps = (state: any) => {
  return {
    personData: state.personDebug
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPeople: () => dispatch(fetchPeople())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonEdit)