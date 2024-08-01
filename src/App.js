import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const pageConfig = {
    limit: 12,
  };

  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);

  //Page click handler
  const pageHandler = (pageClicked) => {
    setPage(pageClicked);
  };

  //fetch products from backend
  const fetchProducts = async () => {
    const skip = page * pageConfig.limit - pageConfig.limit;
    const res = await fetch(
      `https://dummyjson.com/products?limit=${pageConfig.limit}&skip=${skip}`
    );
    const data = await res.json();

    if (data && data.products) {
      console.log(data);
      setTotalItems(data.total);
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="body">
      {/* Show products */}
      {products.length > 0 && (
        <div className="products">
          {products.map((item) => {
            return (
              <span className="products__item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {/* Create pagination bar */}
      {totalItems > 0 && (
        <div className="pagination">
          <span
            onClick={() => pageHandler(page - 1)}
            className={page === 1 && "pagination__disabled"}
          >
            ◀️
          </span>
          {[...Array(Math.ceil(totalItems / pageConfig.limit))].map((_, i) => {
            return (
              <span
                key={i}
                className={`pagination__nums ${
                  page === i + 1 && "pagination__selected"
                }`}
                onClick={() => pageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => pageHandler(page + 1)}
            className={
              page === Math.ceil(totalItems / pageConfig.limit) &&
              "pagination__disabled"
            }
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
