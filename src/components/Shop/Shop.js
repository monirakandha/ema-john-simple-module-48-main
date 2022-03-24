import React, { useEffect, useState } from 'react';
import { addToDb, getStoreCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () =>{
        fetch('products.json')
        .then(res=> res.json())
        .then(data => {setProducts(data)
            console.log('Product loaded')
        })
    }, []);

    useEffect( () => {
        console.log('loacl storage first line' , products)
        const storeCart = getStoreCart();
        const saveCart = [];
        console.log(storeCart);
        for(const id in storeCart){
            console.log(id);
            const addedProducrt = products.find(product => product.id === id);
            if (addedProducrt){
                const quantity = storeCart[id];
                addedProducrt.quantity = quantity;
                saveCart.push(addedProducrt);
                
            }
            
        }
        setCart(saveCart);
    }, [products])

    const handleAddToCart = (product) =>{
        console.log(product);
        // do not do this: cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;