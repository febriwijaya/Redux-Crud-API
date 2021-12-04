import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPeople } from "../actions/DebugActions";
import Header from "./Navbar"
import icon from "../images/stick-man.png";
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

function PersonDetails({ personData, fetchPeople }: any) {
  const key = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPeople()
  }, [])

  return personData.loading ? (
    <>
      <Loading></Loading>
    </>
  ) : personData.error ? (
    <h2>{personData.error}</h2>
  ) : (
        <>
          <Header title="Information Details"></Header>
          <div className="container">
            <button className="btn btn-dark my-2" onClick={() => navigate('/')}>&#8656; Go Back</button>
            <div className="card">
              <div className="card-body">
                <h1 className="text-center font-weight-bold">Detail Person</h1>
                <div className="row justify-content-center">
                  <div className="col-md-12 text-center">
                    <img src={icon} />
                    <table className="mt-5">
                      <tr>
                        <td className="p-3 font-weight-bold">Key</td>
                        <td className="p-3 font-weight-bold">:</td>
                        <td className="p-3">{key.key}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-weight-bold">First Name</td>
                        <td className="p-3 font-weight-bold">:</td>
                        <td className="p-3 font-weight-bold">{key.firstName}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-weight-bold">Last Name</td>
                        <td className="p-3 font-weight-bold">:</td>
                        <td className="p-3 font-weight-bold">{key.lastName}</td>
                      </tr>
                    </table>
                  </div>
                </div>
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
)(PersonDetails)