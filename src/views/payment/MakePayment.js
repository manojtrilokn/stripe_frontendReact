import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import stylesheet from './payment.module.css';
import { CardElement } from '@stripe/react-stripe-js';

const MakePayment = (props) => {
    const { show, handleClose, data, handleChange, submitFun,error } = props;
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitFun}>
                        <div >
                            <label>Cardholder Name:</label>
                            <input
                                name='cardHolder'
                                className='form-control'
                                type="text"
                                value={data.cardHolder}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div >
                            <label>Email:</label>
                            <input
                                name='email'
                                className='form-control'
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <CardElement className={stylesheet.card_element}
                                options={{
                                    style: { base: { fontSize: '18px' } },
                                    hidePostalCode: true
                                }}
                            />
                        </div>
                        <div >
                            <label>Address:</label>
                            <input
                                name='address'
                                className='form-control'
                                type="text"
                                value={data.address}
                                onChange={handleChange}

                            />
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Country:</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='country'
                                    value={data.country}
                                    onChange={handleChange}
                                >
                                    <option>Select</option>
                                    <option value="AU">AU</option>
                                </Form.Select>
                            </div>
                            <div className='col-md-6'>
                                <label>State:</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='state'
                                    value={data.state}
                                    onChange={handleChange}
                                >
                                    <option>Select</option>
                                    <option value="NSW">NSW</option>
                                </Form.Select>
                            </div>
                            <div className='col-md-6'>
                                <label>City:</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='city'
                                    value={data.city}
                                    onChange={handleChange}
                                >
                                    <option>Select</option>
                                    <option value="city">City</option>
                                </Form.Select>
                            </div>
                            <div className='col-md-6'>
                                <label>Postal code:</label>
                                <input
                                    name='postalCode'
                                    className='form-control'
                                    type="text"
                                    value={data.postalCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {error &&
                        <div>
                            <span className='text-danger'>{error.message}</span>
                        </div>
                        }
                        <div className={stylesheet.btn}>
                            <button type="submit">Pay</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MakePayment
