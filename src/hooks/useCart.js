import { useState, useEffect } from 'react';
import { db } from '../data/db';

export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const MAX_ITEMS = 5;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExists >= 0) {
            if (cart[itemExists].quantity < MAX_ITEMS) {
                const updatedCart = [...cart];
                updatedCart[itemExists].quantity += 1;
                setCart(updatedCart);
            }
        } else {
            const newItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        }

        saveLocalStorage()
    }

    function removeFromCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExists >= 0) {
            setCart(prevCart => prevCart.filter(guitar => guitar.id !== item.id));
        }
    }

    function increaseQuantity(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExists >= 0 && cart[itemExists].quantity < MAX_ITEMS) {
            setCart(prevCart => prevCart.map(guitar =>
                guitar.id === item.id
                    ? { ...guitar, quantity: guitar.quantity + 1 }
                    : guitar
            ));
        }
    }

    function decreaseQuantity(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExists >= 0) {
            if (cart[itemExists].quantity > 1) {
                setCart(prevCart => prevCart.map(guitar =>
                    guitar.id === item.id
                        ? { ...guitar, quantity: guitar.quantity - 1 }
                        : guitar
                ));
            } else {
                setCart(prevCart => prevCart.filter(guitar => guitar.id !== item.id));
            }
        }
    }

    function clearCart() {
        setCart([]);
    }

    function saveLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart
    }
}