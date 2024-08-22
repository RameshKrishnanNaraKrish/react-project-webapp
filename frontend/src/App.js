import React, { useState, useEffect } from 'react';
import './App.css';
import config from './config';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/users`)  // Corrected template literal
      .then(response => response.json())
      .then(data => setUsers(data));

    fetch(`${config.API_BASE_URL}/products`)  // Corrected template literal
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddUser = () => {
    fetch(`${config.API_BASE_URL}/users`, {  // Corrected template literal
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newUserName, email: newUserEmail }),
    })
      .then(response => response.json())
      .then(user => {
        setUsers([...users, user]);
        setNewUserName('');
        setNewUserEmail('');
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const handleAddProduct = () => {
    fetch(`${config.API_BASE_URL}/products`, {  // Corrected template literal
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProductName, price: parseFloat(newProductPrice) }),
    })
      .then(response => response.json())
      .then(product => {
        setProducts([...products, product]);
        setNewProductName('');
        setNewProductPrice('');
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={e => setNewUserEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <h1>Product Management</h1>
      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={e => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProductPrice}
          onChange={e => setNewProductPrice(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
