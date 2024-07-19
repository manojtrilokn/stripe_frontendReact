
import { NavLink } from 'react-router-dom';
import stylesheet from './signup.module.css';
import React, { useState } from 'react';
import { requestOTP, signUp } from '../../services/user_services';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const [requested, setRequested] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        mobile: "",
        otp: "",
        firstName:"",
        middleName:"",
        lastName:"",
        password: ""
    });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const verifyFun = (e) => {
        requestOTP({ mobile: user.mobile }).then((res) => {
           if(res.status===1){
            setRequested(true);
           }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(user).then((res) =>{
            if(res.status === 1){
                navigate('/');
            }
        })
    };

    return (
        <div className={stylesheet.login_container}>
            <div>
                <h3>Create Account</h3>
            </div>
            <form onSubmit={handleSubmit} className='row'>
                <div >
                    <label>Mobile:</label>
                    <input
                        name='mobile'
                        type="number"
                        value={user.mobile}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span onClick={verifyFun} style={{ display: 'flex', cursor: 'pointer', justifyContent: 'flex-end' }}>Verify</span>
                </div>
                {requested && 
                <>
                <div className='col-md-6'>
                    <label>OTP:</label>
                    <input
                        name='otp'
                        type="number"
                        value={user.otp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div  className='col-md-6'>
                    <label>First Name:</label>
                    <input
                        name='firstName'
                        type="text"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div  className='col-md-6'>
                    <label>Middle Name:</label>
                    <input
                        name='middleName'
                        type="text"
                        value={user.middleName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div  className='col-md-6'>
                    <label>Last Name:</label>
                    <input
                        name='lastName'
                        type="text"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='col-md-6'>
                    <label>Email:</label>
                    <input
                        name='email'
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='col-md-6'>
                    <label>Password:</label>
                    <input
                        name='password'
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={stylesheet.btn}>
                    <button type="submit">Signup</button>
                </div>
                </>
                }
                <div style={{display:'flex', justifyContent:'center'}}>
                    Already have Account? <NavLink to='/'>Login</NavLink>
                </div>
            </form>
        </div>
    )
}

export default Signup
