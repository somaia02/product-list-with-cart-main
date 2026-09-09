import "./ProductCard.css";
import type { Product } from "../lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <picture>
        <source
          srcSet={import.meta.env.BASE_URL + product.image.desktop}
          media="(width >= 1000px)"
        />
        <source
          srcSet={import.meta.env.BASE_URL + product.image.tablet}
          media="(width >= 600px)"
        />
        <img src={import.meta.env.BASE_URL + product.image.mobile} alt="" />
      </picture>
      <button className="product-card__btn">
        <img src="/assets/images/icon-add-to-cart.svg" alt="" />
        Add to Cart
      </button>
      <p className="product-card__category">{product.category}</p>
      <p className="product-card__name">{product.name}</p>
      <p className="product-card__price">{product.price}</p>
    </div>
  );
}
