import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  // just a container for forms
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
