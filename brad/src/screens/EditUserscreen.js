import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getUserDetailsAction,
  updateUserAction,
} from "../Redux/actions/userAction";
import { userTypes } from "../Redux/ActionTypes";

const EditUserscreen = ({ match, history }) => {
  const userId = match.params.id;

  // gets the user id from the param
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: userTypes.USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        // in case
        dispatch(getUserDetailsAction(userId));
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitFunction = (e) => {
    e.preventDefault();
    dispatch(updateUserAction({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitFunction}>
            <Form.Group controlId="name">
              <Form.Label>edit name</Form.Label>
              <Form.Control
                type="name"
                placeholder={user.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>edit Email </Form.Label>
              <Form.Control
                type="email"
                placeholder={user.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUserscreen;
