import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw Error("Did not recieve expexted data");
        }
        const data = await response.json();
        setProducts(data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchError }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
