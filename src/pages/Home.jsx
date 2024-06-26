import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import { APIURL } from '../env';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try{
            const fetchProduct = async () => {
                const res = await fetch(`${APIURL}/products/1`);
                const data = await res.json();
                setProducts([data]); 
            };
            fetchProduct();
        }catch (error) {
            console.log(error.message);
        }
        }, []);

        const handleViewDetails = () => {
            if (products.length > 0) {
                navigate(`/product-detail/${products[0].id}`);
            }
        };

    return (
        <>
            <section className="banner">
                <div className="container py-4">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-md-7">
                            <p>Latest collection</p>
                            <h1 className='display-5'><strong>{products.length > 0 && products[0].title}</strong> </h1> 
                            <button onClick={handleViewDetails} className='btn btn-danger mt-3'>View Details</button>
                        </div>
                        <div className="col-md-4">
                            <img src={products.length > 0 && products[0].image} alt='Latest' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>
            <section className='productlist mt-4'>
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-md-6">
                            <p className='m-0'>All Product Shop </p>
                            <h2>Customer Favorite Style</h2>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                placeholder='Search Products...'
                                className='form-control'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <ProductList searchQuery={searchQuery} />
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;
