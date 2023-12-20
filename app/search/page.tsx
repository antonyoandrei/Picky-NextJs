"use client";

import HeaderComponent from "@/components/Header/Header";
import SearchbarComponent from "@/components/Searchbar/Searchbar";
import { ChangeEvent, useState } from "react";

const SeeAll = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  return (
    <>
      <HeaderComponent query={query} onInputChange={handleInputChange} />
      <SearchbarComponent query={query} />
    </>
  );
};

export default SeeAll;
