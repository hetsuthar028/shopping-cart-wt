import React from "react";
import Card from "../shared/Card";
import dummyImage from "../../static/backiee-181542.jpg";
import Button from "../shared/Button";

const Productcard = () => {
    return (
        <div style={{display: 'inline-flex'}}>
            <Card style={{ minWidth: "300px", maxWidth: "300px", margin: "10px" }}>
                <img
                    // src='https://source.unsplash.com/random'
                    src={dummyImage}
                    style={{ maxHeight: "150px" }}
                />
                <h3 className="my-2">Amazon Alexa</h3>
                <h5 className="text-success">Price: ₹5,999</h5>
                <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt...
                </p>
                <Button color="warning">
                    <strong>Add to Cart</strong>
                </Button>
            </Card>
        </div>
    );
};

export default Productcard;
