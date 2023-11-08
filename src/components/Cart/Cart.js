import Card from "../UI/Card";
import { cartActions } from "../redux-store/cart-slice";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

const totalValue = (items) => {
  let initialValue = 0;
  items.forEach((element) => {
    initialValue = initialValue + element.price * element.amount;
  });
  return initialValue;
};

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const addItemHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              quantity: item.amount,
              total: item.amount * item.price,
              price: item.price,
            }}
            onAddItem={() => addItemHandler({ ...item, amount: 1 })}
            onRemoveItem={() => removeItemHandler(item.id)}
          />
        ))}
      </ul>
      <div className="total">
        <span>Total Amount: {totalValue(cartItems)}</span>
      </div>
    </Card>
  );
};

export default Cart;
