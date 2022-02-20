import React from "react";
import Card from "../shared/Card";
import dummyImage from "../../static/backiee-181542.jpg";
import Button from "../shared/Button";

const Productcard = (props) => {
    const {_id, name, price, quantity,description, status} = props.product;

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
                <Button color="warning">
                    <strong>Add to Cart</strong>
                </Button>
            </Card>
        </div>
    );
};

export default Productcard;
