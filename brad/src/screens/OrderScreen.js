import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Col, Image, ListGroup, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deliverOrderAction,
  getOrderDetailsAction,
  paybyAdminOrderAction,
  payOrderAction,
} from "../Redux/actions/orderAction";
import { orderTypes } from "../Redux/ActionTypes";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdk, setsdk] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [cliId, serClid] = useState(null);

  if (!loading) {
    // calc prices
    const addDecimals = (num) => {
      return Math.round(num * 100) / (100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.getElementsByTagName("script");
      // script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
      // script.async = true;
      // script.onload = () => {
      //   setsdk(true);
      // };
      if (script) {
        setsdk(true);
      }
      serClid(clientId);
      // document.head.appendChild(script);
    };
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: orderTypes.ORDER_PAY_RESET });
      dispatch({ type: orderTypes.ORDER_DELIVER_RESET });
      dispatch(getOrderDetailsAction(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setsdk(true);
      }
    }

    addPaypalScript();
  }, [dispatch, orderId, successDeliver, successPay, order]);

  const paymentFunction = (details) => {
    console.log(details);

    dispatch(payOrderAction(orderId, details));
  };
  const deliverFunction = () => {
    dispatch(deliverOrderAction(order));
  };
  const markpaidfunction = () => {
    dispatch(paybyAdminOrderAction(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error} </Message>
  ) : (
    <>
      <h1>Order id: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdk ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={paymentFunction}
                      shippingPreference={JSON.stringify(order.shippingAddress)}
                      onButtonReady={() => setsdk(true)}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={markpaidfunction}
                    options={{
                      clientId: cliId,
                    }}
                  >
                    Mark As paid
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverFunction}
                    options={{
                      clientId: cliId,
                    }}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
