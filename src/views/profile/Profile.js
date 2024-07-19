import React, { useEffect, useState } from 'react'
import { completeProfile, getProfile } from '../../services/user_services';
import { Card } from 'react-bootstrap';
import styleSheet from './profile.module.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { token_expire } from '../../redux/actions/authAction';
import Loader from '../../loder/Loader';

const Profile = () => {
    const [loading, setLoding] = useState(true);
    const dispatch = useDispatch();
    const [user_detail, setUser_details] = useState({});

    const handleChange = (e) => {
        setUser_details({ ...user_detail, [e.target.name]: e.target.value });
    };
    const getProfileData = () => {
        getProfile().then((res) => {
            if (res.status === 1) {
                setUser_details(res.data);
                setTimeout(()=>{
                    setLoding(false);
                },300);
            } else if (res.status === 4) {
                dispatch(token_expire());
            }
        });
    };

    const updateProfileFun = (e) => {
        e.preventDefault();
        completeProfile(user_detail).then((res) => {
            if (res.status === 1) {
                getProfileData();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Profile updated.",
                    showConfirmButton: false,
                    timer: 1200
                });
            }
        });
    };

    useEffect(() => {
        getProfileData();
    }, []);

    return (

        <div className={styleSheet.container}>
            {loading &&
                <Loader />
            }
            {!loading &&
                <Card>
                    <Card.Header>
                        <h3>Profile Details</h3>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={updateProfileFun}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>First Name:</label>
                                    <input
                                        name='firstName'
                                        type="text"
                                        value={user_detail.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label>Middle Name:</label>
                                    <input
                                        name='middleName'
                                        type="text"
                                        value={user_detail.middleName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label>Last Name:</label>
                                    <input
                                        name='lastName'
                                        type="text"
                                        value={user_detail.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label>Email:</label>
                                    <input
                                        name='email'
                                        type="email"
                                        value={user_detail.email}
                                        disabled
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label>Mobile No:</label>
                                    <input
                                        name='mobile'
                                        type="mobile"
                                        value={user_detail.mobile}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className={styleSheet.btn}>
                                <button type='submit' >Update</button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            }
        </div>
    )
};

export default Profile;
