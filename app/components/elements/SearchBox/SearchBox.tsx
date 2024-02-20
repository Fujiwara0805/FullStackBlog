"use client";
import React, { useState } from "react";

function SearchBox() {
  /* field */
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");

  /* Blog検索処理 */
  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blog/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }), //queryをサーバーへ送信
      });
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button
        className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-blue-500 font-semibold"
        onClick={handleSearch}
      >
        検索
      </button>
    </div>
  );
}

export default SearchBox;
