import React, { useState, useEffect, Fragment } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { cartEmpty, loadCart } from "./cartHelper";
import StripeCheckout from "./StripeCheckout";


//import PuffLoader from "react-spinners/PuffLoader";

const Cart = ()  => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);      
  
         useEffect(() => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }, [])

        useEffect(() => {
           setProducts(loadCart())
        }, [reload])
  
        const loadAllProducts = () => {
      return (
             <div className="ex1">
                <h2>This section is load to products</h2>
                   {products.map((product, index) => (
                      <Card 
                      key={index}
                      product={product}
                      removeFromCart={true}
                      addtoCart={false}
                      setReload={setReload}
                      reload={reload}
                      />
                 ))}
              </div>        
      )
  }
  
  const loadChekout= () => {
    return (
        <div>
            <h2>This section is for checkout</h2>
        </div>
    )
} 

  return (
    <Fragment>
       <div className="ex1">
           {
              loading ?  
                    <div id="loading"></div>
               : (      
                      <Base title="Cart Page" description="Ready to checkout" >                    
                        <div className="row text-center">
                            <div className="col-6">{loadAllProducts()}</div>
                            <div className="col-6">
                                <StripeCheckout 
                                products={products}
                                setReload={setReload}
                                />
                            </div>
                        </div>
                      </Base>   
                  )
                }
                 
        </div>
    </Fragment>         
  );
  
}


export default Cart;

