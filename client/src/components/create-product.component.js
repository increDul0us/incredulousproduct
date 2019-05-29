import React, {Component} from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductCategory= this.onChangeProductCategory.bind(this);
        this.onChangeProductColor= this.onChangeProductColor.bind(this);
        this.onChangeProductImage= this.onChangeProductImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            alert: false,
            display: false,
            product_description: '',
            product_name: '',
            product_category: '',
            product_color: '',
            product_image:  '', imagePreviewUrl: '',
            product_price: +''
        }
    }

    onChangeProductDescription(e) {
        this.setState({
            product_description: e.target.value,
            alert: false,
            display: false
        });
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value,
            alert: false,
            display: false
        });
    }

    onChangeProductCategory(e) {
        this.setState({
            product_category: e.target.value,
            alert: false,
            display: false
        });
    }

    onChangeProductColor(e) {
        this.setState({
            product_color: e.target.value,
            alert: false,
            display: false
        });
    }

    onChangeProductImage(e) {
        this.setState({
            product_image: e.target.files[0],
            alert: false,
            display: false
        });

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
    }

    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value,
            alert: false,
            display: false
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.product_name || !this.state.product_description || !this.state.product_category || !this.state.product_color || !this.state.product_price || !this.state.product_image) {
            console.log(`Enter all fields`);
            this.setState ({alert:true});
        }
        else {
        console.log(`Form submitted:`);
        console.log(`Product Description: ${this.state.product_description}`);
        console.log(`Product Name: ${this.state.product_name}`);
        console.log(`Product Price: ${this.state.product_price}`);
        console.log(`Product Category: ${this.state.product_category}`);
        console.log(`Product Image: ${this.state.product_image}`);
        console.log(`Product Color: ${this.state.product_color}`);    

        this.setState ({display:true});
        const data = new FormData();
        data.append('product_name', this.state.product_name);
        data.append('product_description', this.state.product_description);
        data.append('product_price', this.state.product_price);
        data.append('product_category', this.state.product_category);
        data.append('product_color', this.state.product_color);
        data.append('product_image', this.state.product_image);


        axios.post('/products/add', data)
            .then(res => console.log(res.data));
        }
    }

    render() {
        return (
            <React.Fragment>
            {this.state.display && (
            <div className= "row d-flex justify-content-center" style={{marginTop: 20}}>
                <div className="card mb-3 d-inline-flex p-2">
                    <h3 className="card-header">{this.state.product_name}</h3>
                    <div className="row">
                        <div className="col-sm-4">
                            <img className="img-fluid" src={this.state.imagePreviewUrl} alt="" />
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
                <div className="container alert alert-dismissible alert-success">
                    You have successfully added< strong> {this.state.product_name} </strong> to the product list. Thanks!
                </div>
            </div>
            )}
            <div style={{marginTop: 20}}>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_name}
                                onChange={this.onChangeProductName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_description}
                                onChange={this.onChangeProductDescription}
                                />
                    </div>              
                    <div className="form-group">
                        <label>Price: </label>
                        <input  type="number"
                                className="form-control"
                                value={this.state.product_price}
                                onChange={this.onChangeProductPrice}
                                />
                    </div>          
                    <div className="form-group">
                        <label>Category: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_category}
                                onChange={this.onChangeProductCategory}
                                />
                    </div>                  
                    <div className="form-group">
                        <label>Color: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_color}
                                onChange={this.onChangeProductColor}
                                />
                    </div>            
                    <div className="form-group">
                        <label>Image: </label>
                        <input type="file" 
                                accept="image/*"
                                className="form-control-file"
                                onChange={this.onChangeProductImage}
                                />
                    </div>               
                    <div className="form-group">
                        <input type="submit" value="Add new Product" className="btn btn-outline-success" />
                    </div>
                    {this.state.alert && (
                        <div className="alert alert-dismissible alert-warning">
                            <p className="mb-0">Enter all fields</p>
                        </div>
                    )}     
                </form>
            </div>
            </React.Fragment>
        )
    }
}