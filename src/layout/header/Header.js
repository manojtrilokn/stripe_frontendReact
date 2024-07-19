import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styleSheet from './header.module.css';
import { userLogout } from '../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import logo from '../../assetss/profile.png'

const Header = () => {
    const dispatch = useDispatch();
    const logoutFun = () => {
        Swal.fire({
            title: process.env.REACT_APP_APP_NAME,
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1994EF",
            customClass: {
                confirmButton: 'custom-swal-button',
                cancelButton: 'custom-swal-button'
            },
            cancelButtonColor: "#757575",
            confirmButtonText: "Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(userLogout())
            }
        });
    };
    return (
        <div className={styleSheet.container}>
            <div>
                <ul className={styleSheet.nav_list}>
                    {/* <li><NavLink to='/'>Profile</NavLink> </li> */}
                </ul>
            </div>
            <div>
                <Dropdown>
                    <Dropdown.Toggle >
                        <img src={logo} width='35px' alt='img'/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item >
                            < NavLink to='/'>Profile</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <NavLink to='/cards'>Cards</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <NavLink to='/connect'>Connected Account</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <NavLink to='/payment'>Intent Payment</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <NavLink to='/payment2'>Connected Account Payment</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <NavLink to='/checkout'>Checkout</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logoutFun} >Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
};

export default Header;
