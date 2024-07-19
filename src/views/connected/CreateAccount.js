import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const CreateAccount = (props) => {
    const { show, handleClose, submitFun, handleChange, formData } = props;
    return (
        <div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Create Connected Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitFun}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Account Type:</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='type'
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option>Select</option>
                                    <option value="custom">custom</option>
                                </Form.Select>
                            </div>

                            <div className='col-md-6'>
                                <label>Business Type:</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='business_type'
                                    value={formData.business_type}
                                    onChange={handleChange}
                                >
                                    <option>Select</option>
                                    <option value="individual">Individual</option>
                                </Form.Select>
                            </div>
                            <div className='col-md-6'>
                                <label>Email:</label>
                                <input
                                    name='email'
                                    className='form-control'
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Mobile No:</label>
                                <input
                                    name='mobile'
                                    className='form-control'
                                    type="text"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>First Name:</label>
                                <input
                                    name='firstName'
                                    className='form-control'
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Last Name:</label>
                                <input
                                    name='lastName'
                                    className='form-control'
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Date of Birth:</label>
                                <input
                                    name='dob'
                                    className='form-control'
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Address:</label>
                                <input
                                    name='address'
                                    className='form-control'
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>City:</label>
                                <input
                                    name='city'
                                    className='form-control'
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>State:</label>
                                <input
                                    name='state'
                                    className='form-control'
                                    type="text"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Postal code:</label>
                                <input
                                    name='postal_code'
                                    className='form-control'
                                    type="text"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Country:</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='country'
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option>Select</option>
                                    <option value="AU">AU</option>
                                </Form.Select>
                            </div>
                            <div className='col-md-6'>
                                <label>Front:</label>
                                <input
                                    name='front_document'
                                    type="file"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Back:</label>
                                <input
                                    name='back_document'
                                    type="file"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='btn'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CreateAccount
