import EmptyCart from "./EmptyCart";
import FilledCart from "./FilledCart";
import CartConfirmation from "./CartConfirmation";
import { useCart } from "../CartContext";
import "./Cart.css";

export default function Cart() {
  const [cartData, _] = useCart();
  const count = Object.values(cartData ?? {}).reduce(
    (total, item) => total + item.count,
    0,
  );

  const cartConfirmationId = "cart-confirmation";

  return (
    <div className="cart">
      <p className="cart__title">Your Cart ({count})</p>
      {count === 0 ? (
        <EmptyCart />
      ) : (
        <FilledCart dialogId={cartConfirmationId} />
      )}
      <CartConfirmation dialogId={cartConfirmationId} />
    </div>
  );
}
