import { useState, useEffect } from 'react';
import type { Guitar, CartItem } from '../types';

export const useCart = () => {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const MAX_ITEMS = 5;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);





    function increaseQuantity(item: Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExists >= 0 && cart[itemExists].quantity < MAX_ITEMS) {
            setCart(prevCart => prevCart.map(guitar =>
                guitar.id === item.id
                    ? { ...guitar, quantity: guitar.quantity + 1 }
                    : guitar
            ));
        }
    }

    function decreaseQuantity(item: Guitar) {
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
        cart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
    }
}