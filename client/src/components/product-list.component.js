import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
    <tr>
        <td>{props.product._id}</td>
        <td>{props.product.product_name}</td>
        <td>{props.product.product_price}</td>
        <td>
            <Link to={"/products/"+props.product._id}>
                <span className="badge badge-dark">More Details</span>
            </Link>
        </td>
    </tr>
)

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
        axios.get('/products/')
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    productList() {
        return this.state.products.map(function(currentProduct, i) {
            return <Product product={currentProduct} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Product List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList() }
                    </tbody>
                </table>
            </div>
        )
    }
}