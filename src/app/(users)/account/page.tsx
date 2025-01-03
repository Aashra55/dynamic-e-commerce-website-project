"use client";

import React, { useState } from "react";

const MyAccount: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<keyof typeof sections>("Profile");

  const sections: Record<string, React.JSX.Element> = {
    Profile: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <p className="text-gray-600 mb-6">Update your personal details here.</p>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Edit Profile
        </button>
      </div>
    ),
    Orders: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        <p className="text-gray-600 mb-6">
          View your past orders and track current ones.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Order #12345 - Delivered</li>
          <li>Order #67890 - In Progress</li>
          <li>Order #12345 - Delivered</li>
          <li>Order #67890 - In Progress</li>
          <li>Order #12345 - Delivered</li>
          <li>Order #67890 - In Progress</li>
        </ul>
      </div>
    ),
    Addresses: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Saved Addresses</h2>
        <p className="text-gray-600 mb-6">Manage your delivery addresses.</p>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Add New Address
        </button>
      </div>
    ),
    Settings: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        <p className="text-gray-600 mb-6">
          Change your password or manage security settings.
        </p>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Update Password
        </button>
      </div>
    ),
  };

  return (
    <div className="flex min-h-screen bg-gray-100 md:flex-row flex-col">
      <aside className="md:w-64 bg-white border-r border-gray-200 p-5">
        <ul className="space-y-4">
          {Object.keys(sections).map((section) => (
            <li
              key={section}
              className={`cursor-pointer px-4 py-2 rounded ${
                activeSection === section
                  ? "bg-red-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveSection(section as keyof typeof sections)}
            >
              {section}
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 p-10 bg-white rounded shadow-lg m-5">
        {sections[activeSection]}
      </section>
    </div>
  );
};

export default MyAccount;
