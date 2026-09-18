import { useRef } from "react";
import { useCart } from "../CartContext";
import confirmIcon from "../assets/icon-order-confirmed.svg";
import "./CartConfirmation.css";
import type { Product } from "../types";

export default function CartConfirmation({ dialogId }: { dialogId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [cartData, setCartData] = useCart();
  if (!cartData) return <></>;
  let bill = 0;
  const products = [];
  for (const cartItem of Object.values(cartData!)) {
    const product = cartItem.product;
    const count = cartItem.count;
    bill += count * product.price;
    products.push(
      <CartProduct product={product} count={count} key={product.name} />,
    );
  }
  function handleClick() {
    setCartData(null);
    dialogRef.current?.close();
  }
  return (
    <dialog
      className="cart__confirmation"
      id={dialogId}
      closedby="any"
      ref={dialogRef}
    >
      <img src={confirmIcon} alt="" />
      <h1 className="cart__confirmation__title">Oreder Confirmed</h1>
      <p className="cart__confirmation__txt">We hope you enjoy your food!</p>
      <div className="cart__confirmation__order">
        <ul className="cart__confirmation__products">{products}</ul>
        <div className="cart__total-bill">
          <span className="cart__total-bill__txt">Order Total</span>
          <span className="cart__total-bill__val">${bill}</span>
        </div>
      </div>
      <button
        className="cart__confirmation__new-order-btn"
        onClick={handleClick}
      >
        Start New Order
      </button>
    </dialog>
  );
}

function CartProduct({ product, count }: { product: Product; count: number }) {
  return (
    <li className="cart__confirmation__product">
      <img src={import.meta.env.BASE_URL + product.image.thumbnail} alt="" />
      <div className="cart__confirmation__product__info">
        <p className="cart__product__name">{product.name}</p>
        <span className="cart__product__count">{count}x</span>
        <span className="cart__product__item-price">@${product.price}</span>
      </div>
      <p className="cart__confirmation__product__total-price">
        ${product.price * count}
      </p>
    </li>
  );
}
