import { useCallback, useEffect, useState } from "react";
import "../App.css";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState("http://localhost:8000/products");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //   let url = "http://localhost:8000/products/?_sort=price&_order=asc";
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setLoading(false);
      setProducts(data);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error?.message);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <section>
      <div className="filter">
        <button onClick={() => setUrl("http://localhost:8000/products")}>
          All
        </button>
        <button
          onClick={() => setUrl("http://localhost:8000/products?in_stock=true")}
        >
          InStock only{" "}
        </button>
      </div>
      {error && <h1 style={{ textAlign: "center" }}>{error}</h1>}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        products &&
        products.map((item) => {
          const { id, name, price, in_stock } = item;
          return (
            <div className="card" key={id}>
              <p className="id">{id}</p>
              <p className="name">{name}</p>
              <p className="info">
                <span>${price}</span>{" "}
                <span className={in_stock ? "instock" : "unavailable"}>
                  {in_stock ? "In Stock" : "Unavailable"}
                </span>
              </p>
            </div>
          );
        })
      )}
    </section>
  );
};
