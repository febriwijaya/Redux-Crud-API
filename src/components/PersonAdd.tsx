import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createPeople } from "../actions/CreateActions";
import { fetchPeople } from "../actions/DebugActions";
import Footer from "./Footer";
import Header from "./Navbar"

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

const PersonForm = ({ personData, fetchPeople }: any) => {
  const [newKey, setNewKey] = useState('')
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ValidKey, setValidKey] = useState(false)
  const [validFirstName, setValidFirstName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const [keyError, setKeyError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const state = { button: 1 }
  const [onValidKey, setOnValidKey] = useState(false)
  const [onValidFirstName, setOnValidFirstName] = useState(false)
  const [onValidLastName, setOnValidLastName] = useState(false)

  useEffect(() => {
    fetchPeople()
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (state.button === 1) {
      dispatch(createPeople({
        firstName: newFirstName,
        lastName: newLastName,
        key: newKey
      }))
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

  const onChangeKey = (e: any) => {
    const reg = /^[0-9\b]+$/
    setNewKey(e.target.value)
    if (e.target.value === '') {
      setKeyError('Key Harus Diisi.')
      setValidKey(false)
      setOnValidKey(false)
    } else if (!reg.test(e.target.value)) {
      setKeyError(`Key Harus Berupa Angka.`)
      setValidKey(false)
      setOnValidKey(false)
    }
    else if (e.target.value !== '' && reg.test(e.target.value)) {
      setKeyError('')
      setValidKey(true)
      setOnValidKey(true)
    }
  }

  const onChangeFirstName = (e: any) => {
    const reg = /^[a-zA-Z\b]+$/
    setNewFirstName(e.target.value)
    if (e.target.value === '') {
      setFirstNameError('First Name Tidak Boleh Kosong.')
      setValidFirstName(false)
      setOnValidFirstName(false)
    } else if (!reg.test(e.target.value)) {
      setFirstNameError(`First name Harus Alphabet.`)
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
      setLastNameError('Last name Tidak Boleh Kosong.')
      setValidLastName(false)
      setOnValidLastName(false)
    } else if (!reg.test(e.target.value)) {
      setLastNameError(`Last name Harus Alphabet.`)
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
        <>
          <Header title="Create Person Information"></Header>
          <div className="container">
            <button className="btn btn-dark my-2" onClick={() => navigate('/')}>&#8656; Go Back</button>
            <div className="card">
              <div className="card-body">
                <h1 className="text-center font-weight-bold">Tambah Data</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="key">Key : </label>
                    <input className='form-control' type="text" placeholder="Masukkan key" name="key" onChange={onChangeKey} />
                    {ValidKey === false ? <p className="text-danger">{keyError}</p> : <p className="text-success">Key yang anda masukkan benar.</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="firstName">First Name : </label>
                    <input className='form-control' type="text" placeholder="Masukkan Nama Depan" name="firstName" onChange={onChangeFirstName} />
                    {validFirstName === false ? <p className="text-danger">{firstNameError}</p> : <p className="text-success">First name yang anda masukkan benar.</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name : </label>
                    <input className='form-control' type="text" placeholder="Masukkan Nama Belakang" name="lastName" onChange={onChangeLastName} />
                    {validLastName === false ? <p className="text-danger">{lastNameError}</p> : <p className="text-success">Last name yang anda masukkan benar.</p>}
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary" onClick={() => (state.button = 1)} disabled={keyError !== "" || firstNameError !== "" || lastNameError !== "" || ValidKey === false || validFirstName === false || validLastName === false}>Submit</button>
                    <button className="btn btn-danger mx-2" onClick={() => (state.button = 2)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
          <div style={{ marginTop: '250px' }}></div>
        </>
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
)(PersonForm)