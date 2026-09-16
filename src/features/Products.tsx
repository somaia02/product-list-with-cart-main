import "./Products.css";
import { useData } from "../useData";
import type { Product } from "../types";
import cartIcon from "../assets/icon-add-to-cart.svg";
import incrementIcon from "../assets/icon-increment-quantity.svg";
import decrementtIcon from "../assets/icon-decrement-quantity.svg";
import { useCart } from "../CartContext";

export default function Products() {
  const data = useData<Product>(import.meta.env.BASE_URL + "data.json");
  if (data.error !== null) {
    return <p>{data.error}</p>;
  } else if (data.loading) {
    return <p>Loading ...</p>;
  }

  const products = data.data!.map((product) => (
    <ProductCard product={product} key={product.name} />
  ));

  return <div className="products">{products}</div>;
}

export function ProductCard({ product }: { product: Product }) {
  const [cartData, setCartData] = useCart();
  const added =
    !cartData || !Object.hasOwn(cartData, product.name) ? false : true;
  const cartBtn = added ? (
    <div className="product-cart__btn" data-added="true">
      <button
        className="product-cart__quantity-btn"
        onClick={handleCartremove}
        aria-label="Decrement quantity"
      >
        <img src={decrementtIcon} alt="" />
      </button>
      <span>{cartData![product.name].count}</span>
      <button
        className="product-cart__quantity-btn"
        onClick={handleCartAdd}
        aria-label="Increment quantity"
      >
        <img src={incrementIcon} alt="" />
      </button>
    </div>
  ) : (
    <button className="product-cart__btn" onClick={handleCartAdd}>
      <img src={cartIcon} alt="" />
      Add to Cart
    </button>
  );
  function handleCartAdd() {
    if (!added) {
      setCartData({
        ...cartData,
        [product.name]: {
          product: product,
          count: 1,
        },
      });
    } else {
      setCartData({
        ...cartData,
        [product.name]: {
          product: product,
          count: cartData![product.name].count + 1,
        },
      });
    }
  }
  function handleCartremove() {
    const newData = { ...cartData };
    newData[product.name].count -= 1;
    if (newData[product.name].count == 0) {
      delete newData[product.name];
    }
    setCartData(newData);
  }
  return (
    <div className="product-card">
      <picture>
        <source
          srcSet={import.meta.env.BASE_URL + product.image.desktop}
          media="(width >= 1000px)"
        />
        <source
          srcSet={import.meta.env.BASE_URL + product.image.tablet}
          media="(width >= 700px)"
        />
        <img
          src={import.meta.env.BASE_URL + product.image.mobile}
          alt=""
          className="product-cart__img"
          data-added={added}
        />
      </picture>
      {cartBtn}
      <div className="product-card__info">
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
