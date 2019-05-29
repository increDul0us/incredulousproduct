import React, {Component} from 'react';
import axios from 'axios';

export default class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product_description: '',
            product_name: '',
            product_price: +'',
            product_category: '',
            product_color: ''
        }
    }

    componentDidMount() {
        axios.get('/products/'+this.props.match.params.id)
            .then(response => {
                let data = Buffer.from(response.data.product_image.data).toString('base64')
                this.setState({
                    id: response.data._id,
                    product_description: response.data.product_description,
                    product_name: response.data.product_name,
                    product_price: response.data.product_price,
                    product_category: response.data.product_category,
                    product_color: response.data.product_color,
                    product_image: `data:image/jpeg;base64,${data}`
                })
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div className= "row d-flex justify-content-center">
                <div className="card mb-3 d-inline-flex p-2">
                    <h3 className="card-header">{this.state.product_name}</h3>
                    <div className="row">
                        <div className="col-sm-4">
                            <img className="img-fluid" src={this.state.product_image} alt="" />
                        </div>
                        <div className="col-sm-8">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.product_category}</h5>
                                <h6 className="card-subtitle text-muted">{this.state.product_color}</h6>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{this.state.product_description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        ${this.state.product_price}
                    </div>
                </div>
            </div>
        )
    }
}
