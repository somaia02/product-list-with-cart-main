import "./EmptyCart.css";
import emptyIcon from "../assets/illustration-empty-cart.svg";

export default function EmptyCart() {
  return (
    <div className="empty-cart">
      <img src={emptyIcon} alt="" />
      <p className="empty-cart__txt">Your added items will appear here</p>
    </div>
  );
}
