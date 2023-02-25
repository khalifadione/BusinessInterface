import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    console.log(data);
    setProducts(data);
    
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Switch>
          <Route exact path="/">
            <Products products={products}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
