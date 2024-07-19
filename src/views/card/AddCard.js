import React from 'react';
import { CardElement} from '@stripe/react-stripe-js';
import { Offcanvas } from 'react-bootstrap';
import stylesheet from './card.module.css'

const AddCard = (props) => {
    const { show, handleClose,handleSubmit, error} = props;

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton style={{ backgroundColor: 'skyblue' }}>
                    <Offcanvas.Title>Add Card</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={stylesheet.container}>
                        <form onSubmit={handleSubmit} className={stylesheet.my_form}>
                            <div>
                                <CardElement className={stylesheet.card_element}
                                    options={{
                                        style: { base: { fontSize: '18px' } },
                                        hidePostalCode: true
                                    }}
                                />
                            </div>
                            <div>
                                <button type="submit" >
                                    Add Card
                                </button>
                            </div>
                            {error && <div className='text-danger'>{error}</div>}
                        </form>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

export default AddCard
