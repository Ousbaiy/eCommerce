import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("https://fakestoreapi.com/product");
      if (!response.ok) {
        throw Error("Could not fetch data")
      }
      const data = await response.json();
      setProducts(data);
    };
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
