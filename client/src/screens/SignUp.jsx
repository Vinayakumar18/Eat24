import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate = useNavigate();
    const onClick=()=>{
        navigate('/login')
    }
    const [User, setUser] = useState({name:"", email:"", password:"",location:""})
    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:User.name,email:User.email,password:User.password,location:User.location}))
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:User.name,email:User.email,password:User.password,location:User.location})
        });
        const json = await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter Valid Credentials")
        }
    }
    const onChange=(e)=>{
        setUser({...User,[e.target.name]:e.target.value})
    }

    return (
        <>
        <Navbar/>
        <hr />
            <div className='container'>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" name="name" value={User.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={User.email} onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={User.password} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name="location" value={User.location} onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={onClick} >Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already User</Link>
                </form>
            </div>
        </>
    )
}
