import "./Products.css";
import { useData } from "../lib/useData";
import type { Product } from "../lib/types";

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
          className="product-card__img"
        />
      </picture>
      <button className="product-card__btn">
        <img
          src={`${import.meta.env.BASE_URL}assets/images/icon-add-to-cart.svg`}
          alt=""
        />
        Add to Cart
      </button>
      <div className="product-card__info">
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
