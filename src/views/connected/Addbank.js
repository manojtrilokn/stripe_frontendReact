import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

const Addbank = (props) => {
    const { show, handleClose, bank_data, handleChange, submitFun, error } = props;
    return (
        <div>
             <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton style={{backgroundColor:'skyblue'}}>
                    <Offcanvas.Title>Add External Bank</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={submitFun}>
                    <div >
                        <label>Account Holder Name:</label>
                        <input
                            name='account_holder_name'
                            className='form-control'
                            type="text"
                            value={bank_data.account_holder_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div >
                        <label>Account Holder Type:</label>
                        <input
                            name='account_holder_type'
                            className='form-control'
                            type="text"
                            value={bank_data.account_holder_type}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div >
                        <label>Routing Number:</label>
                        <input
                            name='routing_number'
                            className='form-control'
                            type="number"
                            value={bank_data.routing_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div >
                        <label>Account Number:</label>
                        <input
                            name='account_number'
                            className='form-control'
                            type="number"
                            value={bank_data.account_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error &&
                        <span className='text-danger'>{error}</span>
                    }
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button type='submit'>Submit</Button>
                    </div>
                    </form>                    
              </Offcanvas.Body>
              </Offcanvas>
        </div>
    )
}

export default Addbank
