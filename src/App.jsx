import { useState, useEffect } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { db } from './data/db';

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
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

  function removeFromCart(item){
    const itemExists = cart.findIndex(guitar => guitar.id === item.id);
    if(itemExists >= 0) {
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

  function saveLocalStorage () {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
