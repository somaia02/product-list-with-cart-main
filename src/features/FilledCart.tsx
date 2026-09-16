import type { Product } from "../types";
import "./FilledCart.css";
import treeIcon from "../assets/icon-carbon-neutral.svg";
import removeIcon from "../assets/icon-remove-item.svg";
import { useCart } from "../CartContext";

export default function FilledCart() {
  const [cartData, _] = useCart();
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
  return (
    <>
      <ul className="cart__products">{products}</ul>
      <div className="cart__total-bill">
        <span className="cart__total-bill__txt">Order Total</span>
        <span className="cart__total-bill__val">${bill}</span>
      </div>
      <div className="cart__carbon-neutral-note">
        <img src={treeIcon} alt="" />
        <p>
          This is a <strong>carbon-neutral</strong> delivery
        </p>
      </div>
      <button className="cart__confirm-btn">Confirm Order</button>
    </>
  );
}

function CartProduct({ product, count }: { product: Product; count: number }) {
  const [cartData, setCartData] = useCart();
  function handleCartremove() {
    const newData = { ...cartData };
    delete newData[product.name];
    setCartData(newData);
  }
  return (
    <li className="cart__product">
      <div className="cart__product__info">
        <p className="cart__product__name">{product.name}</p>
        <div className="cart__product__bill-info">
          <span className="cart__product__count">{count}x</span>
          <span className="cart__product__item-price">@${product.price}</span>
          <span className="cart__product__total-price">
            ${product.price * count}
          </span>
        </div>
      </div>
      <button
        className="cart__product__clear-btn"
        aria-label="Remove product"
        onClick={handleCartremove}
      >
        <img src={removeIcon} alt="" />
      </button>
    </li>
  );
}
