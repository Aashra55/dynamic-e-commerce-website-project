"use client";
import { useState, useEffect } from "react";
import ProductList from "./(visitors)/products-list/page";
import { ProductItem } from "./api/products-data/data";
import Loader from "./components/loader";
export default function Home() {
  const [data, setData] = useState<ProductItem | null>(null);
  useEffect(() => {
    fetch("/api/products-data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(() => {
        console.log("Failed to load product data. Please try again.");
      });
  });

  if (!data) {
    return <Loader />;
  }
  return (
    <div>
      <ProductList />
    </div>
  );
}
