"use client";
import { useState } from "react";
import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const { cart, removeFromCart } = useCart();
  const subTotal = cart.reduce(
    (total, item) => total + item.dPrice * (qty[item.id] || 1),
    0
  );

  // Handle increase product quantity
  const increaseProduct = (id: number) => {
    setQty((prevQty) => ({
      ...prevQty,
      [id]: (prevQty[id] || 0) + 1,
    }));
  };

  // Handle decrease product quantity
  const decreaseProduct = (id: number) => {
    setQty((prevQty) => ({
      ...prevQty,
      [id]: prevQty[id] > 0 ? prevQty[id] - 1 : 0,
    }));
  };

  // Calculate total based on quantity
  let total = 0;
  if (cart.length !== 0) {
    total =
      cart.reduce((sum, item) => sum + item.dPrice * (qty[item.id] || 1), 0) +
      8; // Add shipping fee
  }

  return (
    <div className="font-sans">
      <div className="grid lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 bg-white overflow-x-auto">
          <div className="flex gap-2 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex-1">
              Shopping Cart
            </h2>
            <h3 className="text-base text-gray-800">{cart.length} Items</h3>
          </div>

          <table className="mt-6 w-full border-collapse divide-y">
            <thead className="whitespace-nowrap text-left">
              <tr>
                <th className="text-base text-gray-800 p-4">Description</th>
                <th className="text-base text-gray-800 p-4">Quantity</th>
                <th className="text-base text-gray-800 p-4">Price</th>
              </tr>
            </thead>

            {cart.length === 0 ? (
              <p className="w-[100%] p-[15px] text-center">
                No items in the Cart
              </p>
            ) : (
              cart.map((e, index) => (
                <tbody key={index} className="whitespace-nowrap divide-y">
                  <tr>
                    <td className="md:p-4 p-1">
                      <div className="flex items-center md:gap-4 gap-1 md:w-max">
                        <div className="h-32 shrink-0 md:w-full w-[40%]">
                          <Image
                            src={e.image}
                            alt={e.title}
                            className="md:w-full w-[100%] h-full object-contain rounded-lg"
                          />
                        </div>
                        <div>
                          <p className="text-base font-bold text-gray-800">
                            {e.title}
                          </p>
                          <button
                            onClick={() => removeFromCart(e.id)}
                            type="button"
                            className="mt-2 font-semibold text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="md:p-4 p-1">
                      <div className="flex divide-x border md:w-max w-[80px] md:h-auto h-[30px] rounded-lg overflow-hidden">
                        <button
                          onClick={() => decreaseProduct(e.id)}
                          type="button"
                          className="flex items-center justify-center bg-gray-100 w-10 md:h-10 h-7 font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current"
                            viewBox="0 0 124 124"
                          >
                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="bg-transparent w-10 md:h-10 h-7 font-semibold text-gray-800 text-base"
                        >
                          {qty[e.id] || 1}
                        </button>
                        <button
                          onClick={() => increaseProduct(e.id)}
                          type="button"
                          className="flex justify-center items-center bg-gray-800 text-white w-10 md:h-10 h-7 font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <h4 className="text-base font-bold text-gray-800">
                        ${e.dPrice * (qty[e.id] || 1)}
                      </h4>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
        </div>

        <div className="bg-gray-50 p-6 lg:sticky lg:top-0 lg:h-screen">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
            Order Summary
          </h2>

          <ul className="text-gray-800 divide-y mt-6">
            <li className="flex flex-wrap gap-4 text-base py-3">
              Subtotal <span className="ml-auto font-bold">${subTotal}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base py-3">
              Shipping <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base py-3">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base py-3 font-bold">
              Total <span className="ml-auto">${total}</span>
            </li>
          </ul>

          <Link href={"/shipping-form"}>
            <button
              type="button"
              className="mt-6 text-base px-5 py-2.5 w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-lg shadow-lg hover:shadow-xl active:shadow-none transition-transform transform"
            >
              Make Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
