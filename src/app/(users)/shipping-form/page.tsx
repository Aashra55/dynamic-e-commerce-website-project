"use client";
import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Shipping Details:", formData);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000); // Show thank you message for 3 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {showThankYou ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <CheckCircleIcon className="w-16 h-16 mx-auto text-red-600" />
            <h1 className="mt-4 text-4xl font-bold text-red-600">
              Thank You for Shipping!
            </h1>
            <p className="mt-4 text-gray-700">
              We appreciate your trust in us. Your order is on its way!
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl p-6 bg-white rounded shadow-md">
          <h1 className="mb-6 text-2xl md:text-3xl font-bold text-center text-red-600">
            Shipping Form
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-center items-center">
              <button
                type="submit"
                className="w-full md:w-1/2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 active:scale-90 focus:outline-none transition-transform transform shadow-lg hover:shadow-xl active:shadow-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
