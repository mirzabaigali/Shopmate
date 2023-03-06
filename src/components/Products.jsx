import { useEffect, useState } from "react";
import "../App.css";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState("http://localhost:8000/products");
  //   let url = "http://localhost:8000/products/?_sort=price&_order=asc";
  const getData = async () => {
    const response = await fetch(url);
    try {
      if (response.status === 200) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);

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
      {products.map((item) => {
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
      })}
    </section>
  );
};
