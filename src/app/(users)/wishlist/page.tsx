"use client";
import { useWishList } from "@/context/WishListContext";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
export default function WishList() {
  const { addToCart } = useCart();
  const { wishList, removeFromWishList } = useWishList();
  return (
    <div>
      <div>
        <h1 className="md:px-[50px] md:text-3xl md:py-[25px] font-bold border-b text-gray-800 px-[20px] py-[15px] text-xl">
          Your WishList
        </h1>
        <div className="w-[100vw] md:pr-[300px] flex md:justify-evenly justify-around h-auto border-b md:p-[15px] p-[5px] mb-[10px]">
          <p className="font-bold md:text-lg">Description</p>
          <p className="font-bold md:text-lg ">Category</p>
          <p className="font-bold md:text-lg ">Price</p>
        </div>
      </div>
      {wishList.length === 0 ? (
        <p className="w-[100%] text-center h-[50px]">No item in wish list</p>
      ) : (
        wishList.map((e, index) => (
          <div
            key={index}
            className="flex w-[100%] h-auto items-center md:flex-row flex-col md:gap-[0px] gap-[15px] md:py-[0px] py-[5px] justify-center md:px-[10px] px-[20px] border-b mb-[5px]"
          >
            <div className="flex w-[100%] md:w-[70%] h-auto items-center justify-evenly md:gap-[15%] gap-[10%]">
              <div className="md:ml-[0px] ml-[20px] w-[25%] flex md:flex-row items-center md:gap-[35px] gap-[2px] justify-center">
                <Image src={e.image} alt={e.title} className="w-[140px]" />
                <div className="flex flex-col items-center">
                  <p className="text-gray-800 font-bold md:text-[16px] text-[14px]">
                    {e.title}
                  </p>
                  <p className="md:text-[14px] text-[12px] text-gray-400">
                    {e.origin}
                  </p>
                </div>
              </div>
              <p className="text-center md:text-lg ml-[8%] md:ml-[4%] md:text-[16px] text-[14px]">
                {e.category}
              </p>
              <div className="flex md:flex-row flex-col items-center md:gap-[10px] md:gap-[20px] md:text-lg">
                <p className="line-through font-bold text-gray-400 md:text-[16px] text-[14px]">
                  ${e.oPrice}
                </p>
                <p className="font-bold md:text-[16px] text-[14px]">
                  ${e.dPrice}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[40px] justify-center md:w-[30%] w-[100%]">
              <button
                onClick={() => addToCart(e)}
                type="button"
                className="w-1/2 flex items-center justify-center gap-2 px-2 py-2.5 sm:px-4 bg-yellow-400 hover:bg-red-600 hover:text-black text-sm text-gray-800 font-semibold rounded-md transition-transform transform hover:scale-105 active:scale-90 shadow-lg hover:shadow-xl active:shadow-none"
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
              <button
                onClick={() => removeFromWishList(e.id)}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 px-2 py-2.5 sm:px-4 rounded-lg transition-transform transform hover:scale-105 active:scale-90 shadow-md hover:shadow-lg active:shadow-none"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
