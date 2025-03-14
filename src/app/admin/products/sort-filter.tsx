"use client";

import { useEffect, useState } from "react";

export default function SortFilter() {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);

    const productRows = Array.from(document.querySelectorAll("tbody tr"));
    const tbody = document.querySelector("tbody");

    if (!tbody) return;

    // Sort the rows based on the selected option
    productRows.sort((a, b) => {
      if (selectedSort === "") return 0;

      if (selectedSort.startsWith("name")) {
        const nameA =
          a.querySelector("td:nth-child(2)")?.textContent?.trim() || "";
        const nameB =
          b.querySelector("td:nth-child(2)")?.textContent?.trim() || "";

        return selectedSort === "name-asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      if (selectedSort.startsWith("price")) {
        const priceTextA =
          a.querySelector("td:nth-child(4)")?.textContent?.trim() || "$0";
        const priceTextB =
          b.querySelector("td:nth-child(4)")?.textContent?.trim() || "$0";

        const priceA = parseFloat(priceTextA.replace("$", ""));
        const priceB = parseFloat(priceTextB.replace("$", ""));

        return selectedSort === "price-asc" ? priceA - priceB : priceB - priceA;
      }

      return 0;
    });

    // Remove all rows
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    // Add sorted rows back
    productRows.forEach((row) => {
      tbody.appendChild(row);
    });
  };

  return (
    <select
      className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
      value={sortOption}
      onChange={handleSortChange}
    >
      <option value="">Sort By</option>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
    </select>
  );
}
