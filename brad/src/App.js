import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./bootstrap.min.css";
import HomeScreen from "./screens/HomeScreens";
import { Container } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import EditUserscreen from "./screens/EditUserscreen";
import ProductListscreen from "./screens/ProductListscreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderlistScreen from "./screens/OrderListScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id" component={EditUserscreen} />
          <Route
            path="/admin/productlist"
            component={ProductListscreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListscreen}
            exact
          />
          <Route path="/admin/orderlist" component={OrderlistScreen} />

          <Route path="/admin/product/:id" component={ProductEditScreen} />

          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          {/* :/d? is an optional id .. ie id can be present or not maybe */}
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/page/:pageNumber" component={HomeScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
