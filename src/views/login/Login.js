import { NavLink } from 'react-router-dom';
import stylesheet from './login.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../redux/actions/authAction';

const Login = () => {
    const { invalidCred } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "alex@yopmail.com",
        password: "123456"
    });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(user));
    };

    return (
        <div className={stylesheet.login_container}>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Login</h3>
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        name='email'
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        name='password'
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                {invalidCred && (
                            <div>
                              <p style={{ display: 'flex', justifyContent: 'flex-start', color:'red' }}>Invalid login credentials.</p>
                            </div>
                          )}
                <div className={stylesheet.btn}>
                    <button type="submit">Login</button>
                </div>
            </form>
            <div>
                Don't have an account? <NavLink to='/signup'>Signup</NavLink>
            </div>
        </div>
    );
}

export default Login;
