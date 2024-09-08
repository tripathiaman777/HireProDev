import React, { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import ShowProducts from "../components/ShowProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import Checkout from "../components/Checkout";
function Products() {
  const { products, getAllProducts, productsLoading } = useProductStore();
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  if (productsLoading || !products) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <ShowProducts products={products} />
      <div className="absolute bottom-4 right-4">
        <Checkout />
      </div>
    </div>
  );
}

export default Products;
