import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetchPeople } from '../actions/DebugActions'
import { deletePeople } from '../actions/DeleteActions';
import styled from 'styled-components'
import Header from './Navbar'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import people from '../images/profile.png'
import { Fade } from "react-awesome-reveal";
import Footer from './Footer';


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

function PeopleList({ personData, fetchPeople }: any) {
  const [key, setKey] = useState('')
  const [firstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    fetchPeople()
  }, [])

  const handleEdit = (key: any, firstName: any, lastName: any) => {
    setKey(key)
    setFirstName(firstName)
    setLastName(lastName)
    navigate(`/PersonEdit/${firstName}/${lastName}/${key}`)
  }

  const handleDelete = (key: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePeople(key))
        dispatch(fetchPeople)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const handleOne = (key: any, firstName: any, lastName: any) => {
    setKey(key)
    setFirstName(firstName)
    setLastName(lastName)
    navigate(`/PersonDetails/${firstName}/${lastName}/${key}`)
  }

  return personData.loading ? (
    <>
      <Loading></Loading>
    </>
  ) : personData.error ? (
    <h2>{personData.error}</h2>
  ) : (
        <>
          <div>
            <Header title="Final Project Febri Wijaya"></Header>
            <div className="container text-center mt-5">
              <div className="row">
                {Object.values(personData.people)
                  .map((person: any, index: any) => {
                    return <div className="col-md-4 my-2" key={index}>
                      <Fade direction={'down'} delay={index * 300}>
                        <div className="card">
                          <div className="card-body">
                            <img src={people} alt="" />
                            <h1 className="text-center">{person.firstName}</h1>
                            <h5 className="text-center">key : {person.key}</h5>
                            <div className="row justify-content-center">
                              <button className="btn btn-warning mb-2 w-100" onClick={() => handleEdit(person.key, person.firstName, person.lastName)}>Edit</button>
                              <button className="btn btn-info mb-2 w-100" onClick={() => handleOne(person.key, person.firstName, person.lastName)}>Read Details</button>
                              <button className="btn btn-danger w-100" onClick={() => handleDelete(person.key)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    </div>
                  })
                }
              </div>
            </div>
            <Footer />
          </div>
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
)(PeopleList)