import "./App.css";
import Products from "./features/Products";
import Cart from "./features/Cart";
import { useState } from "react";
import { CartContext } from "./CartContext";
import type { ICart } from "./types";

function App() {
  const [cartData, setCartData] = useState<ICart | null>(null);

  return (
    <CartContext value={[cartData, setCartData]}>
      <main className="home">
        <div className="product-feed">
          <h1>Desserts</h1>
          <Products />
        </div>
        <Cart />
      </main>
    </CartContext>
  );
}

export default App;
