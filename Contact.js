import React, { useEffect, useState } from 'react'
import './contact.css'
import axios from 'axios';



const Contact = () => {
  const [state, setState] = useState({
    f_name: '',
    l_name: '',
    age:'',
    qli:'',
    gender:'',
    email_id: '',
    mob_num: '',
    state:'',
    city:'',
    pass:''
  });

  const [message,setMessage]=useState("")

  const handler=(event)=>{
    //console.log(event.target.value);
    const{name,value}=event.target; //destuctring
    //console.log(name+" "+value);
    setState({...state,[name]:value})

  }
  const saveData=(event)=>{
    event.preventDefault();
    //console.log(state);
    axios.post("http://localhost:4004/user-details",state)
    .then((res)=>{
      //console.log(res);
      setMessage(res.data.message)
    })
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7210710366962!2d77.13726017613891!3d28.697989281104075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03ee181a8db3%3A0xe265de5ad208f500!2sDUCAT%20-%20Pitampura!5e0!3m2!1sen!2sin!4v1717317120489!5m2!1sen!2sin" style={{ width: "100%", height: "300px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="head">
              get in touch
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-4">
            <img src="gallery/download.jpeg" alt="" style={{ width: "100%", height: "350px" }} />
          </div> */}
          {message}
          <form action="" method='post' onSubmit={saveData}>
          <div className="col-md-8">
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" onChange={handler} name='f_name' placeholder="First name" />
              </div>
              <div className="col">
                <input type="text" className="form-control"  onChange={handler} name='l_name' placeholder="Last name" />
              </div>
            </div>
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
                <input type="text" className="form-control"  onChange={handler} name='age' placeholder="Age" />
              </div>
              <div className="col">
                <input type="text" className="form-control"  onChange={handler} name='qli' placeholder="Qualification" />
              </div>
            </div>
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
              <input type="text" className="form-control"  onChange={handler} name='gender' placeholder="Gender" />
              </div>

            </div>
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
              <input type="text" className="form-control"  onChange={handler} name='email_id' placeholder="Email Id" />
              </div>

            </div>
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
              <input type="text" className="form-control"  onChange={handler} name='mob_num' placeholder="Mobile No" />
              </div>

            </div>
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
              <input type="text" className="form-control"  onChange={handler} name='state' placeholder="State" />
              </div>

            </div>
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
              <input type="text" className="form-control"  onChange={handler} name='city' placeholder="City" />
              </div>

            </div>
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
              <input type="text" className="form-control"  onChange={handler} name='pass' placeholder="Password" />
              </div>

            </div>
            
            <div className="row" style={{ marginTop: "3%" }}>
              <div className="col">
                <input type="submit" value="Send Data" className='btn btn-success' />
              </div>

            </div>
          </div>
          </form>
        </div>

        
      </div>
    </>
  )
}

export default Contact