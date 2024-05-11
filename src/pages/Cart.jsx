import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Button } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'cart'));
      const items = [];
      let total = 0;
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        items.push(item);
        total += item.totalAmount;
      });
      setCartItems(items);
      setTotalAmount(total);
    };
    fetchCartItems();
  }, []);

  const handleCheckout = () => {
    // Implement checkout logic here
    // For example, redirect to a checkout page or process payment
    alert('Checkout button clicked!');
  };

  return (
    <div className="container mt-4">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index}>
              <h3>{item.productName}</h3>
              <p>Price: ${item.productPrice}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.totalAmount}</p>
              <hr />
            </div>
          ))}
          <h3>Total Amount: ${totalAmount}</h3>
          <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
