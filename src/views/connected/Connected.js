import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import styleSheet from './connected.module.css';
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { addExternalAccount, createConnectAccount, deleteExternalAccount, getConnectAccount, setDefaultExternalAccount } from '../../services/user_services';
import CreateAccount from './CreateAccount';
import Addbank from './Addbank';
import BankDetails from './BankDetails';
import {useDispatch} from 'react-redux';
import { token_expire } from '../../redux/actions/authAction';
import Loader from '../../loder/Loader';

const Connected = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoding] = useState(true);
    const [con_account, setCon_account] = useState(null);
    const [bank_data, setBank_data] = useState({
        account_holder_name: "",
        account_holder_type: "individual",
        routing_number: "",
        account_number: ""
    });
    const [bank_list, setBank_list] = useState([]);
    const [bank_details, setBank_details] = useState({});

    const [formData, setFormData] = useState({
        type: '',
        business_type: '',
        email: '',
        mobile: '',
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        front_document: null,
        back_document: null
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => {
        setShow2(false);
        setError(null);
        setBank_data({
            account_holder_name: "",
            account_holder_type: "individual",
            routing_number: "",
            account_number: ""
        });
    }
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        if(error){
            setError(null);
        }
        setBank_data({
            ...bank_data,
            [name]: value
        });
    };
    const submitFun = (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
        createConnectAccount(form).then((res) => {
            if (res.status === 1) {
                handleClose();
                getAcountData();
            }
        })
    };
    const getAcountData = () => {
        getConnectAccount().then((res) => {
            if (res.status === 1) {
                setCon_account(res.data);
                setTimeout(()=>{
                    setLoding(false);
                },300);
                if (res.bankAccounts === null || res.bankAccounts === undefined) {
                    setBank_list(null);
                } else {
                    setBank_list(res.bankAccounts.data);
                }
                
            }else if(res.status === 4){
                dispatch(token_expire());
            }
        })
    };
    const submitFun2 = (e) => {
        e.preventDefault();
        addExternalAccount(bank_data).then((res) => {
            if (res.status === 1) {
                handleClose2();
                setLoding(true);
                getAcountData();
            }else if(res.status===0){
                setError(res.message);
            }
        })
    };

    const viewFun = (bank_detail) => {
        setBank_details(bank_detail);
        setShow3(true);
    };

    const makeDefaultFun = (bankId)=>{
        setDefaultExternalAccount({ bankId: bankId }).then((res)=>{
            if(res.status===1){
                setShow3(false);
                setLoding(true);
                getAcountData();
            }
        })
    };

    const deleteFun = (bankId) => {
        Swal.fire({
            title: process.env.REACT_APP_APP_NAME,
            text: "Are you sure you want to remove",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CE3609",
            customClass: {
                confirmButton: 'custom-swal-button',
                cancelButton: 'custom-swal-button'
            },
            cancelButtonColor: "#757575",
            confirmButtonText: "Remove"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteExternalAccount({ bankId: bankId }).then((res) => {
                    if (res.status === 1) {
                        setLoding(true);
                        getAcountData();
                    }
                })
            }
        });
    };

    useEffect(() => {
        getAcountData();
    }, []);

    return (
        <div className={styleSheet.container}>
            {loading &&
                <Loader />
            }
            {!loading &&
            <Card>
                <Card.Header>
                    <div className={styleSheet.header}>
                        <h3>Connected Account </h3>
                        {!con_account &&
                            <Button variant="primary" onClick={handleShow}>Create Account</Button>
                        }
                    </div>
                </Card.Header>
                {con_account &&
                    <>
                        <Card.Body>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Email:</label>
                                    <input
                                        name='email'
                                        className='form-control'
                                        type="text"
                                        value={con_account.email}
                                        disabled
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label>Business Type:</label>
                                    <input
                                        name='business_type'
                                        className='form-control'
                                        type="text"
                                        value={con_account.business_type}
                                        disabled
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label>Country:</label>
                                    <input
                                        name='country'
                                        className='form-control'
                                        type="text"
                                        value={con_account.country}
                                        disabled
                                    />
                                </div>
                            </div>

                        </Card.Body>
                        <Card.Footer>
                            <div style={{ display: 'flex', justifyContent: "space-between", paddingBottom: "7px" }}>
                                <h3>External Banks</h3>
                                <Button onClick={handleShow2}>Add new bank</Button>
                            </div>
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Account Holder Name</th>
                                            <th>Bank Name</th>
                                            <th>Account Number</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bank_list.map((bank, i) => (
                                            <tr key={bank.id}>
                                                <td>{i + 1}</td>
                                                <td>{bank.account_holder_name}</td>
                                                <td>{bank.bank_name}</td>
                                                <td>*******{bank.last4} {bank.default_for_currency && <span className='text-success'>Default</span>}</td>
                                                <td>
                                                    <FaEye style={{ color: 'blue', fontSize: '20px', marginRight: "8px", cursor: 'pointer' }} onClick={() => viewFun(bank)} />
                                                    {!bank.default_for_currency &&
                                                        <FaRegTrashAlt style={{ color: 'red', fontSize: '16px', cursor: 'pointer' }} onClick={() => deleteFun(bank.id)} />
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Footer>
                    </>
                }
                {!con_account && 
                <div style={{display:'flex',justifyContent:'center', padding:'70px'}}>
                    <span> There is not found any account</span>
                </div>
                }
            </Card>
}
            <CreateAccount
                show={show}
                handleClose={handleClose}
                submitFun={submitFun}
                handleChange={handleChange}
                formData={formData}
            />
            <Addbank
                show={show2}
                handleClose={handleClose2}
                bank_data={bank_data}
                handleChange={handleChange2}
                submitFun={submitFun2}
                error={error}
            />
            <BankDetails
                show={show3}
                handleClose={handleClose3}
                bank_details={bank_details}
                makeDefaultFun={makeDefaultFun}
            />
        </div>
    )
}

export default Connected
