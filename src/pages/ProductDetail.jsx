import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoStar, IoStarHalf } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../Redux/Cartslice';
import { APIURL } from '../env';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        try{
            const fetchProduct = async () => {
                const res = await fetch(`${APIURL}/products/${id}`);
                const data = await res.json();
                setProduct(data);
            };
            fetchProduct();
        }catch(error){
            console.log(error)
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;

    const renderStars = (rate) => {
        const fullStars = Math.floor(rate);
        const halfStar = rate - fullStars >= 0.01;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoStar key={i} />);
        }

        if (halfStar) {
            stars.push(<IoStarHalf key="half" />);
        }

        return stars;
    };

    const handleAdd = () => {
        dispatch(add(product));
    };

    const isInCart = cart.some(item => item.id === product.id);

    return (
        <section className='productdetail'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className='p-3'>
                            <img src={product.image} alt={product.title} className="img-fluid pthumb" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className='text-capitalize'>{product.category}</h6>
                        <h1>{product.title}</h1>
                        <div className='d-flex py-3'>
                            <span className='pe-4 text-primary'><strong>In Stock</strong> </span>
                            <p className='d-flex align-items-center m-0'>
                                <span className="stars" title={`Average: ${product.rating.rate} Stars `}>
                                    {renderStars(product.rating.rate)}
                                </span>
                                <span>({product.rating.count} reviews)</span>
                            </p>
                        </div>
                        <p>{product.description}</p>
                        <h2>${product.price}</h2>
                        <div className='mt-4'>
                            {isInCart ? (
                                <Link to="/cart" className='btn btn-danger py-2 px-5'>Buy Now</Link>
                            ) : (
                                <button onClick={handleAdd} className='btn btn-danger py-2 px-5'>
                                    Add to cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
