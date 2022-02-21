import React from "react";
import Card from "../shared/Card";
import dummyImage from "../../static/backiee-181542.jpg";
import Button from "../shared/Button";
import axios from "axios";

const Productcard = (props) => {
    const {_id, name, price, quantity,description, status} = props.product;

    const handleAddToCart = () => {
        axios.get('http://localhost:8080/user/get/currentuser', {
            headers: {
                authorization: window.localStorage.getItem('bearer'),
            }
        })
        .then((currentUserResp) => {
            let userId = currentUserResp.data.user._id;
            axios.post('http://localhost:8080/cart/add/item', {
                "productId": _id,
                "userId": userId
            }, { headers: { authorization: window.localStorage.getItem('bearer') }})
            .then((addToCartResp) => {
                console.log(addToCartResp.data);
                
                // Dispplay a popup message here
            })
            .catch((addToCartErr) => {
                console.log(addToCartErr.response.data);
            })
        })
        .catch((err) => {
            console.log(err.response.data);
        })
    }

    return props && (
        <div style={{display: 'inline-flex'}}>
            <Card style={{ minWidth: "300px", maxWidth: "300px", margin: "10px" }}>
                <img
                    // src='https://source.unsplash.com/random'
                    src={dummyImage}
                    style={{ maxHeight: "150px" }}
                />
                <h3 className="my-2">{name}</h3>
                <h5 className="text-success">Price: ₹{price}</h5>
                <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                    {description}
                </p>
                <Button color="warning" handleClick={handleAddToCart}>
                    <strong>Add to Cart</strong>
                </Button>
            </Card>
        </div>
    );
};

export default Productcard;
