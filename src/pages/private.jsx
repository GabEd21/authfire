import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth } from "../firebase";
import Card from 'react-bootstrap/Card';
import { Alert, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Private = () => {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const fetchData = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'product'));
    const dataArray = [];
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    setData(dataArray);
    querySnapshot.forEach((doc) => {
      console.log(doc.data()); // Log the data to inspect its structure
      dataArray.push(doc.data());
    });
    
  };

  useEffect(() => {
    fetchData();
  }, []); // This empty dependency array means the effect runs only once, after the component mounts
  const handleAddToCart = async (image, product, price) => {
    // Calculate total amount
    const totalAmount = price * quantity;
  
    // Add item to cart collection in Firestore
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, 'cart'), {
        image: image, // Use the productId passed to the function
        productName: product,
        productPrice: price,
        quantity: quantity,
        totalAmount: totalAmount,
      });
      alert("Item added to cart!");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="navbar navbar-dark bg-primary">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="#">Sports Wear</a>
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cart">Cart</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      <div className="container mt-4">
        <div className="row">
          {data.map((item, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <Card>
              <Card.Title style={{ fontSize: '1.2rem' }}>{item.product}</Card.Title>
                <Card.Img variant="top" src={item.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                <Card.Text style={{ fontSize: '1rem' }}>
                    Price: {item.price}
                  </Card.Text>
                  <Form>
                    <Form.Group controlId="quantity">
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control type="number" defaultValue="1" min="1" className="form-control-sm" style={{ width: '80px' }} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                    </Form.Group>
                  </Form>
                  <Button variant="primary" className="mr-2" onClick={() => handleAddToCart(item.image, item.product, item.price)}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Private;
