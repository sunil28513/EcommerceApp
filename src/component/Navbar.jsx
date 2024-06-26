import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoBagHandleSharp } from "react-icons/io5";


const Navbar = () => {
    const items = useSelector((state) =>state.cart)

  return (
    <>
      <header className='header fixed-top'>
        <div className="container">
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <Link className='logo m-0' to={"/"}>E-Commerce</Link>
              <Link className='me-2 position-relative' to={"cart"}> 
                  <IoBagHandleSharp style={{fontSize:'1.5rem'}}/> 
                  <div className='position-absolute top-0 badge bg-danger'>{items.length}</div> 
              </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
