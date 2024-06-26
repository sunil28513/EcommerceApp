import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { add } from '../Redux/Cartslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../env';

const ProductList = ({ searchQuery }) => {
    const [disabledButtons, setDisabledButtons] = useState({});
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); //react-paginate uses zero-indexed page numbers
    const [productsPerPage] = useState(8); // Number of products per page

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        try{
            const fetchProduct = async () => {
                const res = await fetch(`${APIURL}/products`);
                const data = await res.json();
                setProducts(data);
            };
            fetchProduct();
        }catch(error){
            console.log(error.message);
        }
     }, []);

    const handleAdd = (product) => {
        dispatch(add(product));

        // disable button after add to cart
        setDisabledButtons((prevState) => ({
            ...prevState,
            [product.id]: true
        }));
    };
    
    const handleImageClick = (id) => {
        navigate(`/product-detail/${id}`);
    };


    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

        // Calculate the products to display on the current page
        const offset = currentPage * productsPerPage;
        const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);
        // Calculate the total number of pages
        const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
        {/* {filteredProducts.map((product) => ( */}
        {currentProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                <div className='card productlistcard h-100'>
                    <div className='p-3' onClick={() => handleImageClick(product.id)}
                          style={{ cursor: 'pointer' }}>
                        <img src={product.image} alt={product.title} />
                        <h5 className='title pt-3'>{product.title}</h5>
                        <p className='description'>{product.description}</p>
                        <h4 className='pt-2 mb-0'>${product.price}</h4>
                    </div>
                    <div className='px-3 pb-3'>
                        <button
                            onClick={() => handleAdd(product)}
                            className='btn btn-sm btn-danger w-100'
                            disabled={disabledButtons[product.id]}
                        >
                            {disabledButtons[product.id] ? 'Added' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
        ))}

<div className="pagination mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>


    </>
  )
}

export default ProductList
