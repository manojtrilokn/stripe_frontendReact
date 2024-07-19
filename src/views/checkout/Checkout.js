import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import stylesheet from './checkout.module.css';
import { useStripe } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '../../services/user_services';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";


const Checkout = () => {
    const stripe = useStripe();
    const [products, setProducts] = useState([
        {
            id: 1,
            price: 50,
            name: 'Product1',
            quantity: 3,
            image: "https://api.slingacademy.com/public/sample-photos/21.jpeg"
        },
        {
            id: 2,
            price: 70,
            quantity: 2,
            name: 'Product2',
            image: "https://api.slingacademy.com/public/sample-photos/20.jpeg"
        },
        {
            id: 3,
            price: 220,
            quantity: 2,
            name: 'Product3',
            image: "https://api.slingacademy.com/public/sample-photos/23.jpeg"
        }
    ]);

    const incrFun = (id) => {
        const updatedProducts = products.map(product => {
            if (product.id === id) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                };
            }
            return product;
        });
        setProducts(updatedProducts);
    };
    const decrFun = (id) => {
        const updatedProducts = products.map(product => {
            if (product.id === id) {
                return {
                    ...product,
                    quantity: product.quantity !== 1 ? product.quantity - 1 : 1
                };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const removeFun = (id) => {
        const updatedProducts = products.filter(product => {
            if (product.id !== id) {
                return product;
            }
        });
        setProducts(updatedProducts);
    };

    const getPrice = () => {
        let price = 0;
        for (let i = 0; i < products.length; i++) {
            price = price + products[i].price * products[i].quantity;
        }
        return price
    };

    const checkoutFun = () => {
        createCheckoutSession({ products: products }).then(async (res) => {
            if (res.status === 1) {
                await stripe.redirectToCheckout({
                    sessionId: res.id
                })
            }
        })
    };

    return (
        <div className={stylesheet.container}>
            <div className={stylesheet.header}>
                <h2> Checkout Form</h2>
            </div>
            <div className='row'>
                <div className='col-md-9'>
                    <div >
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, i) => (
                                    <tr key={product.id}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <img src={product.image} width='60px' />
                                            {product.name}
                                        </td>
                                        <td>{product.price}</td>
                                        <td><FaPlus style={{ fontSize: '15px', cursor: 'pointer', color: 'blue', fontWeight: 'bolder', marginRight: '10px' }} onClick={() => incrFun(product.id)} /> {product.quantity} <FaMinus onClick={() => decrFun(product.id)} style={{ fontSize: '15px', cursor: 'pointer', color: 'blue', fontWeight: 'bolder', marginLeft: '10px' }} /></td>
                                        <td>{product.quantity * product.price}</td>
                                        <td><FaTrashAlt onClick={() => removeFun(product.id)} style={{ fontSize: '15px', cursor: 'pointer', color: 'red' }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className={stylesheet.order}>
                        <div className='d-flex justify-content-center'>
                            <h6>Order Details</h6>
                        </div>
                        <div>
                            <h5>Total: {getPrice()}</h5>
                        </div>
                        <div className={stylesheet.btn}>
                            <button onClick={checkoutFun}> Pay {getPrice()} </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
