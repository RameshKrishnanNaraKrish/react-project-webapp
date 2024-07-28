import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import ProductList from './components/ProductList';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));

    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserList users={users} />
      <h1>Product Management</h1>
      <ProductList products={products} />
    </div>
  );
}

export default App;