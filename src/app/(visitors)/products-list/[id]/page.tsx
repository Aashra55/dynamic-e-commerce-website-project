"use client";
import { useState, useEffect } from "react";
import { ProductCategory } from "@/app/api/products-data/data";
import { ProductItem } from "@/app/api/products-data/data";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Comments from "@/app/components/comments";
import Loader from "@/app/components/loader";

export default function ProductDetails(
  { params }: { params: { id: string } },
  { product }: { product: ProductItem }
) {
  const { addToCart } = useCart();
    addToCart(product);
  const [data, setData] = useState<ProductCategory[] | null>(null);

  useEffect(() => {
    fetch("/api/products-data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const details = data
    ?.flatMap((category) => [
      ...(category.fruitItems ?? []),
      ...(category.dairyItems ?? []),
      ...(category.vegItems ?? []),
      ...(category.snackItems ?? []),
    ])
    .find((e) => e.id === parseInt(params.id, 10));

  if (!data) {
    return <Loader/>;
  }
  if (!details) {
    return <div className="text-center w-[100%] p-[15px]">Product Not Found</div>;
  }
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "text-yellow-500" : "text-gray-300"}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-4xl m-[15px] mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src={details.image}
          alt={details.title}
          layout="fill"
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <div className="md:w-1/2 md:pl-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {details.title}
        </h1>
        <p className="text-gray-600 mb-4">{details.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="font-semibold text-gray-800">Price: </span>
            {details.dPrice}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Category: </span>
            {details.category}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Rating: </span>
            {renderStars(details.rating)}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Reviews: </span>
            {details.reviews}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Nutritional Information
          </h2>
          <ul className="text-gray-600">
            <li>Calories: {details.nutritionalInfo.calories}</li>
            <li>Carbs: {details.nutritionalInfo.carbs}</li>
            <li>Fat: {details.nutritionalInfo.fat}</li>
            <li>Protein: {details.nutritionalInfo.protein}</li>
          </ul>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Origin: </span>
          {details.origin}
        </div>
        <button
          onClick={() => addToCart(details)}
          type="button"
          className="focus:outline-none w-full flex items-center justify-center gap-2 mt-6 px-2 py-2.5 sm:px-4 bg-yellow-400 hover:bg-red-600 hover:text-black text-sm text-gray-800 font-semibold rounded-md transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 512 512"
          >
            <path
              d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
              data-original="#000000"
            ></path>
          </svg>
          Add to cart
        </button>
      </div>
      <Comments/>
    </div>
  );
};

