import React from "react";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckOutsteps from "../components/CheckOutsteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethodAction } from "../Redux/actions/cartAction";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitFunction = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethodAction(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutsteps step1 step2 step3 />
      <h1>payment</h1>
      <Form onSubmit={submitFunction}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="cash on delivery"
              id="cod"
              name="paymentMethod"
              value="cod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
