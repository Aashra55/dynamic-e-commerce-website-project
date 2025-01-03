"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishList } from "@/context/WishListContext";
import { ProductItem, ProductCategory } from "@/app/api/products-data/data";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import Link from "next/link";
import Loader from "@/app/components/loader";
export default function Snacks() {
  const [WishList, setWishList] = useState<Record<string, boolean>>({}); //to toggle wish heart
  const { addToCart } = useCart();
  const { addToWishList } = useWishList(); //to handle items in wish list

  //function to handle toggle heart and to add items into wish list
  const handleWishList = (item: ProductItem) => {
    setWishList((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
    addToWishList(item);
  };

  const myType: ProductCategory[] = [];
  console.log(myType);

  const [data, setData] = useState<typeof myType | null>(null);

  useEffect(() => {
    fetch("/api/products-data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(() => console.log("error found"));
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <div>
      <h1
        id="fruits"
        className="p-[15px] lg:p-[25px] lg:pl-[25px] md:ml-[25px] lg:pt-[30px] text-2xl font-bold lg:text-[50px] h-auto text-gray-700"
      >
        Snacks
      </h1>
      {data.map((items, index: number) => (
        <div
          key={index}
          className="font-[sans-serif] py-4 mx-auto lg:max-w-4xl max-w-lg md:max-w-full"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {items.snackItems?.map((e: ProductItem, index: number) => (
              <div
                key={index}
                className="border-gray-200 border-[2px] bg-white flex flex-col rounded-md cursor-pointer transition-all relative overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="absolute z-[2] bg-pink-100 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full cursor-pointer absolute top-2 right-2 sm:top-4 sm:right-4">
                    {WishList[e.id] ? (
                      <GoHeartFill
                        onClick={() => handleWishList(e)}
                        className="text-pink-600 fillHeart"
                      />
                    ) : (
                      <GoHeart
                        onClick={() => handleWishList(e)}
                        className="text-pink-600 emptyHeart"
                      />
                    )}
                  </div>

                  <div className="w-full">
                    <Link href={`/components/fruits/${e.id}`}>
                      <Image
                        src={e.image}
                        alt={e.title}
                        className="hover:scale-110 duration-300 transition-transform w-full aspect-[230/220] object-contain"
                      />
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col h-full text-center bg-gray-100 p-4">
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800">
                      {e.title}
                    </h3>
                    <h4 className="text-sm sm:text-base text-gray-800 font-bold mt-4">
                      ${e.dPrice}
                      <p className="text-gray-400 ml-2 font-medium line-through inline">
                        ${e.oPrice}
                      </p>
                    </h4>
                  </div>

                  <button
                    onClick={() => addToCart(e)}
                    type="button"
                    className="focus:outline-none w-full flex items-center justify-center gap-2 mt-6 px-2 py-2.5 sm:px-4 bg-yellow-400 hover:bg-red-600 hover:text-black text-sm text-gray-800 font-semibold rounded-md transition-all transform hover:scale-105 active:scale-95"
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
