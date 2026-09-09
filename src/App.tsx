import "./App.css";
import { useData } from "./lib/useData";
import type { Product } from "./lib/types";
import ProductCard from "./features/ProductCard";

function App() {
  const data = useData<Product>(import.meta.env.BASE_URL + "data.json");
  if (data.error !== null) {
    return <p>{data.error}</p>;
  } else if (data.loading) {
    return <p>Loading ...</p>;
  }

  const products = data.data!.map((product) => (
    <ProductCard product={product} />
  ));

  return (
    <div className="product-feed">
      <h1>Desserts</h1>
      <div className="products">{products}</div>
    </div>
  );
}

export default App;
