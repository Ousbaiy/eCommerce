import { useRouteError, Link } from "react-router-dom";

const ProductError = () => {
  const error = useRouteError()
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <Link to="/">back to the HomePage</Link>
    </div>
  );
};

export default ProductError;
