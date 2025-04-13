import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'






const Apitest = () => {
  const [state, setState] = useState([])
  const _useNavigate=useNavigate()

  const getAlldata=()=>{
    axios.get("http://localhost:4004/user-details/")
      .then((res) => {
        setState(res.data.data)
        console.log(res);
      })
  }
  useEffect(() => {
    getAlldata()
  }, [])

  useEffect(()=>{
    if(localStorage.getItem("_token"))
    {
        
    }
    else{
      _useNavigate("/log-in")
    }
  })
  
  const addUser=()=>{
    _useNavigate("add-user")
  }

  const deleteUser=(id)=>{
    axios.delete("http://localhost:4004/user-details/"+id)
    .then((res) => {
      //setState(res.data.data)
      //console.log(res);
      getAlldata()
    })
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
        <br/>
        <div style={{float:"right"}}>
          <Link to={"/contact-us"} className='btn btn-success'>Add User</Link>
        </div>
        <br/>
        <br/>
          <table class="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th>Qli</th>
                  <th>Gender</th>
                  <th>Email Id</th>
                  <th>Mobile Number</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.map((item,index)=>
                  <tr>
                  <td>{item.f_name+" "+item.l_name}</td>
                  <td>{item.age}</td>
                  <td>{item.qli}</td>
                  <td>{item.gender}</td>
                  <td>{item.email_id}</td>
                  <td>{item.mob_num}</td>
                  <td>{item.state}</td>
                  <td>{item.city}</td>
                  <td>
                    <Link to={"/edit-user"} className='btn btn-success'>Edit</Link>&nbsp;
                    <a href='javascript:void(0)' onClick={()=>{deleteUser(item._id)}} className='btn btn-danger'>Delete</a>
                  </td>
                </tr>
                )}
              </tbody>
          </table>
        </div>
      </div>
    </div>
    
  )
}

export default Apitest