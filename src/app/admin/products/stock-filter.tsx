"use client";

import { useEffect, useState } from "react";

export default function StockFilter() {
  const [stockStatus, setStockStatus] = useState("");

  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    setStockStatus(selectedStatus);

    const productRows = document.querySelectorAll("tbody tr");

    productRows.forEach((row) => {
      if (selectedStatus === "") {
        row.style.display = "";
        return;
      }

      const status =
        row.querySelector("td:nth-child(6) span")?.textContent?.trim() || "";
      const statusLower = status.toLowerCase();

      if (
        (selectedStatus === "in-stock" && statusLower === "in stock") ||
        (selectedStatus === "low-stock" && statusLower === "low stock") ||
        (selectedStatus === "out-of-stock" && statusLower === "out of stock")
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  return (
    <select
      className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
      value={stockStatus}
      onChange={handleStockChange}
    >
      <option value="">All Stock Status</option>
      <option value="in-stock">In Stock</option>
      <option value="low-stock">Low Stock</option>
      <option value="out-of-stock">Out of Stock</option>
    </select>
  );
}
