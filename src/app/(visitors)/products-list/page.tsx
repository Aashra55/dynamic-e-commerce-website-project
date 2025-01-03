"use client";
import React from "react";
import { useEffect, useState } from "react";
import Loader from "@/app/components/loader";
import Fruits from "../components/fruits/page";
import Vegetables from "../components/vegetables/page";
import Dairy from "../components/dairy/page";
import Snacks from "../components/snacks/page";
import { ProductItem } from "@/app/api/products-data/data";

export default function ProductList() {
  const [data, setData] = useState<ProductItem[] | null>(null);

  useEffect(() => {
    fetch("/api/products-data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  if (!data) {
    return <Loader />;
  }
  return (
    <div className="h-auto">
      <Fruits/>
      <Vegetables/>
      <Dairy/>
      <Snacks/>
    </div>
  );
}

