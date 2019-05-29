import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateProduct from "./components/create-product.component";
import ProductList from "./components/product-list.component";
import Product from "./components/product-detail.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://github.com/incredul0us" target="blank">
              <img src={logo} width="30" height="30" alt="https://github.com/incredul0us" />
            </a>
            <Link to="/" className="navbar-brand">Incredulous Products</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Products</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add" className="nav-link">Add Product</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={ProductList} />
          <Route path="/add" component={CreateProduct} />
          <Route path="/products/:id" component={Product} />
        </div>
      </Router>
    );
  }
}

export default App;
