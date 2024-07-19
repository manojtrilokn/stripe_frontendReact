import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stylesheet from './payment.module.css';
import { createPayment } from '../../services/user_services';
import MakePayment from './MakePayment';

const Payment1 = () => {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
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
    amount: 10
  });
 

  const handleChange2 = (e) => {
    setPay_data({ ...pay_data, [e.target.name]: e.target.value })
  };

  const createPaymentFun = (e) => {
    e.preventDefault();
    createPayment({ currency: pay_data.currency, amount: pay_data.amount * 100 }).then((res) => {
      if (res.status === 1) {
        setClientSecret(res.clientSecret);
        handleShow();
      } else {
        setClientSecret(null);
      }
    })
  };


  const handleChange = (e) => {
    if(error){
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

  return (
    <div className={stylesheet.container}>
      <div className={stylesheet.main}>
      <div className={stylesheet.header}>
        <h2>Create Payment</h2>
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

export default Payment1;
