import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [User, setUser] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ email: User.email, password: User.password }))
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: User.email, password: User.password, })
        });
        const json = await response.json()
        console.log(json)

        if (!json.success) {
            alert("Enter Valid Credentials")
        }
        if (json.success) {
            localStorage.setItem("userEmail",User.email);
            localStorage.setItem("authToken", json.authToken)
            navigate("/")
        }
    }
    const onChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            <hr />
            <div className='container'>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={User.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={User.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/signup" className='m-3 btn btn-danger'>New User</Link>
                </form>
            </div>
        </>
    )
}
