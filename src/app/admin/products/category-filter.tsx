"use client";

import { useEffect, useState } from "react";

export default function CategoryFilter() {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const productRows = document.querySelectorAll("tbody tr");

    productRows.forEach((row) => {
      if (selectedCategory === "") {
        row.style.display = "";
        return;
      }

      const productCategory =
        row
          .querySelector("td:nth-child(3)")
          ?.textContent?.toLowerCase()
          .trim() || "";
      if (productCategory === selectedCategory) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  return (
    <select
      className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
      value={category}
      onChange={handleCategoryChange}
    >
      <option value="">All Categories</option>
      <option value="games">Games</option>
      <option value="collectibles">Collectibles</option>
      <option value="apparel">Apparel</option>
    </select>
  );
}
