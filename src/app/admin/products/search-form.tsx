"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    filterProducts();
  };

  const filterProducts = () => {
    const productRows = document.querySelectorAll("tbody tr");
    const term = searchTerm.toLowerCase();

    productRows.forEach((row) => {
      const productName =
        row.querySelector("td:nth-child(2)")?.textContent?.toLowerCase() || "";
      if (productName.includes(term)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        id="product-search"
        name="search"
        placeholder="Search products..."
        className="bg-gray-700 border-gray-600 text-white flex-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
