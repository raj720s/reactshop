import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import axios from "axios";
import { listProductsAction } from "../Redux/actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Pageinate from "../components/Pageinate";
import ProductCarousel from "../components/ProductCarousel";
import Helmet from "react-helmet";
import Meta from "../components/Meta";
// import products from "../products";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productslists = useSelector((state) => state.productLists);
  const { loading, error, products, page, pages } = productslists;

  useEffect(() => {
    dispatch(listProductsAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta></Meta>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          go back
        </Link>
      )}
      <h2>latest items</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
                <div>{product.name}</div>
              </Col>
            ))}
          </Row>
          <Pageinate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
