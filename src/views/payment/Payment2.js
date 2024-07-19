import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stylesheet from './payment.module.css';
import { createPayment2, getConnectAccountList } from '../../services/user_services';
import MakePayment from './MakePayment';

const Payment2 = () => {
    const elements = useElements();
    const stripe = useStripe();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [account, setAccount] = useState([]);
    const [data, setData] = useState({
        cardHolder: '',
        email: '',
        address: '',
        country: '',
        state: '',
        city: '',
        postalCode: ''
    });
    const handleClose = () => {
        setShow(false);
        setData({
            cardHolder: '',
            address: '',
            country: '',
            state: '',
            city: '',
            postalCode: ''
        });
    }
    const handleShow = () => setShow(true);

    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [pay_data, setPay_data] = useState({
        currency: 'AUD',
        connect_account_id: '',
        amount: 10
    });


    const handleChange2 = (e) => {
        setPay_data({ ...pay_data, [e.target.name]: e.target.value })
    };

    const createPaymentFun = (e) => {
        e.preventDefault();
        createPayment2({ currency: pay_data.currency, amount: pay_data.amount * 100, connect_account_id: pay_data.connect_account_id }).then((res) => {
            if (res.status === 1) {
                setClientSecret(res.clientSecret);
                handleShow();
            } else {
                setClientSecret(null);
            }
        })
    };


    const handleChange = (e) => {
        if (error) {
            setError(null);
        }
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const submitFun = async (e) => {
        e.preventDefault();
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: data.cardHolder,
                    email: data.email,
                    address: {
                        line1: data.address,
                        city: data.city,
                        state: data.state,
                        postal_code: data.postalCode,
                        country: data.country,
                    }
                }
            }
        });
        if (error) {
            setError(error);
        } else {
            if (paymentIntent.status === "succeeded") {
                handleClose();
                navigate('/success');
            }
        }
    };
    useEffect(() => {
        getConnectAccountList().then((res) => {
            if (res.status === 1) {
                setAccount(res.data);
            }
        })
    }, []);

    return (
        <div className={stylesheet.container}>
            <div className={stylesheet.main}>
                <div className={stylesheet.header}>
                    <h4>Create Connected A/C Payment </h4>
                </div>
                <div>
                    <form onSubmit={createPaymentFun}>
                        <div >
                            <label>Currency:</label>
                            <input
                                name='currency'
                                className='form-control'
                                type="text"
                                value={pay_data.currency}
                                disabled
                            />
                        </div>
                        <div >
                            <label>Connect Account:</label>
                            <Form.Select
                                aria-label="Default select example"
                                name='connect_account_id'
                                value={pay_data.connect_account_id}
                                onChange={handleChange2}
                                required
                            >
                                <option value=''>Select</option>
                                {account &&
                                    account.map((account_detail) => (
                                        <option value={account_detail.connect_account_id} key={account_detail.connect_account_id}>{account_detail.firstName} {account_detail.lastName}</option>
                                    ))
                                }
                            </Form.Select>
                        </div>
                        <div >
                            <label>Amount:</label>
                            <input
                                name='amount'
                                className='form-control'
                                type="number"
                                value={pay_data.amount}
                                onChange={handleChange2}
                            />
                        </div>
                        <div className={stylesheet.btn}>
                            <button type="submit">Create Payment</button>
                        </div>
                    </form>
                </div>
                <MakePayment
                    show={show}
                    handleClose={handleClose}
                    data={data}
                    handleChange={handleChange}
                    submitFun={submitFun}
                    error={error}
                />
            </div>
        </div>
    )
}

export default Payment2
