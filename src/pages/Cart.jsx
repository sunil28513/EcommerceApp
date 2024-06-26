import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove, incrementQuantity, decrementQuantity } from '../Redux/Cartslice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const handleRemove = (id) => {
        dispatch(remove(id));
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    }

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
         <section className='shoppingcart'>
            <div className="container">
                <h1>Shopping Cart </h1>
                <p>Home / Shopping Cart</p>
                <div className="row mt-4">
                    <div className="col-md-9">
                        <div class="table-responsive">
                            <table className='table'>
                                <thead className='table-secondary'>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { cartItems.length > 0  ?   cartItems.map((item, i) => (
                                            <tr key={item.id}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <div className='d-flex gap-2'>
                                                        <img src={item.image} alt={item.title} style={{ height: '40px' }} className='img-fluid' />
                                                        <p>{item.title}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>${item.price.toFixed(2)}</p>
                                                </td>
                                                <td>
                                                    <div className='incdec'>
                                                        <button onClick={() => handleDecrement(item.id)}>-</button>
                                                        <input style={{ width: '30px', textAlign: 'center' }} type="text" value={item.quantity} readOnly />
                                                        <button onClick={() => handleIncrement(item.id)}>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleRemove(item.id)} className='btn btn-sm btn-secondary'>Remove</button>
                                                </td>
                                            </tr>
                                        ))
                                        : 
                                        <tr>
                                            <td colSpan={5}>
                                            <div className='text-center py-5'>
                                            <h2>No cart added</h2>
                                            <Link className="btn btn-danger" to={"/"}>Go to home</Link>
                                        </div>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h3>Total: ${total.toFixed(2)}</h3>
                                <button className='btn btn-danger mt-3'>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>
        </>
    )
}

export default Cart;
