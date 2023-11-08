import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
import { getCartData, sendCartData } from "./components/redux-store/cart-slice";

//let firstRun = true;

function App() {
  const products = [
    {
      id: "0",
      title: "Test",
      price: 6,
      description: "This is a first product - amazing!",
    },
    {
      id: "1",
      title: "Test 2",
      price: 4,
      description: "This is a second product - amazing!",
    },
    {
      id: "2",
      title: "Test 3",
      price: 5,
      description: "This is a third product - amazing!",
    },
  ];
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  //Load data
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  //Send Data
  useEffect(() => {
    //Block the useeffect of send http request after reload
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch, cart.changed]);

  const showCart = useSelector((state) => state.ui.showCart);
  return (
    <Layout>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {showCart && <Cart />}
      <Products products={products} />
    </Layout>
  );
}

export default App;
