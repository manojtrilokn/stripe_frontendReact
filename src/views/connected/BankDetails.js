import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const BankDetails = (props) => {
    const { show, handleClose, bank_details,makeDefaultFun } = props;
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton style={{ backgroundColor: 'skyblue' }}>
                    <Offcanvas.Title>Bank details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div >
                        <h5>Account Name: {bank_details.account_holder_name}</h5>
                        <h5>Account Type: {bank_details.account_holder_type}</h5>
                        <h5>Bank Name: {bank_details.bank_name}</h5>
                        <h5>Account Number: *****{bank_details.last4}</h5>
                    </div>
                    {!bank_details.default_for_currency &&
                        <div >
                            <button onClick={()=>makeDefaultFun(bank_details.id)}>Make Default</button>
                        </div>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
};

export default BankDetails;
