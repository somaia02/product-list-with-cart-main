import "./Cart.css";
import EmptyCart from "./EmptyCart";
import FilledCart from "./FilledCart";
import { useCart } from "../CartContext";

export default function Cart() {
  const [cartData, _] = useCart();
  const count = cartData == null ? 0 : Object.keys(cartData).length;
  return (
    <div className="cart">
      <p className="cart__title">Your Cart ({count})</p>
      {count === 0 ? <EmptyCart /> : <FilledCart />}
    </div>
  );
}
