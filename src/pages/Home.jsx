import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  const { products, fetchError } = useContext(ProductContext);
  const filteredProducts = products.filter((item) => {
    return (
      item.category === "men's clothing" || item.category === "women's clothing"
    );
  });

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
          {/* handling Error and Loading  */}
          {fetchError && (
            <p className="text-center text-2xl text-red-700">{`Error: ${fetchError}`}</p>
          )}
          {!products.length && !fetchError ? (
            <div className="text-center text-2xl">
              {!products.length ? "loading data" : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Home;
