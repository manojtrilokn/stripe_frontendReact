import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import styleSheet from './card.module.css';
import AddCard from './AddCard';
import { FaRegTrashAlt } from "react-icons/fa";
import { addCardToCustomer, getAddedCards, removeCard } from '../../services/user_services';
import { useDispatch } from 'react-redux';
import { token_expire } from '../../redux/actions/authAction';
import Swal from 'sweetalert2';
import Loader from '../../loder/Loader';


const Cards = () => {
    const dispatch = useDispatch();
    const [loading, setLoding] = useState(true);
    const [show, setShow] = useState(false);
    const [card_list, setCard_list] = useState(null);
    const handleClose = () => {
        setShow(false);
        setError(null);
    }
    const handleShow = () => setShow(true);

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, token } = await stripe.createToken(cardElement);

        if (error) {
            setError(error.message);
        } else {
            addCardToCustomer({ token: token.id }).then((res) => {
                if (res.status === 1) {
                    setLoding(true);
                    handleClose();
                    getCardsList();
                } else if (res.status === 4) {
                    dispatch(token_expire());
                }
            })
        }
    };

    const getCardsList = () => {
        getAddedCards().then((res) => {
            if (res.status === 1) {
                if (res.data.data.length > 0) {
                    setCard_list(res.data.data);
                } else{
                    setCard_list(null);
                }
                setTimeout(() => {
                    setLoding(false);
                }, 300);
            } else if (res.status === 4) {
                dispatch(token_expire());
            }
        })
    };

    const removeCardFun = (cardId) =>{
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
        removeCard({cardId:cardId}).then((res) =>{
            if(res.status === 1){
                // Swal.fire({
                //     position: "center",
                //     icon: "success",
                //     text: "Removed Successfully.",
                //     showConfirmButton: false,
                //     timer: 1200
                // });
                setLoding(true);
                getCardsList();
            }
        })
    }
    })
    }
    useEffect(() => {
        getCardsList();
    }, [])
    return (
        <div>
            {loading &&
                <Loader />
            }
            {!loading &&
                <Card>
                    <Card.Header>
                        <div className={styleSheet.header}>
                            <h3>Added cards </h3>
                            <Button variant="primary" onClick={handleShow}>Add Card</Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {card_list &&
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Card Number</th>
                                        <th>Card Brand</th>
                                        {/* <th>Expiry On</th> */}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {card_list.map((card, i) => (
                                        <tr key={card.id}>
                                            <td>{i + 1}</td>
                                            <td>*******{card.last4} </td>
                                            <td>{card.brand}</td>
                                            {/* <td>{card.exp_month}/{card.exp_year}</td> */}
                                            <td>
                                                <FaRegTrashAlt style={{ color: 'red', fontSize: '16px', cursor: 'pointer' }} onClick={() =>removeCardFun(card.id)}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                        {!card_list &&
                            <div>
                                <span>No cards are added</span>
                            </div>
                        }
                    </Card.Body>
                </Card>
            }
            <AddCard
                show={show}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                error={error}
            />
        </div>

    );
}

export default Cards;