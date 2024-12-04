import React from "react";
import Button from "../components/Button";
import Welcome from "../components/Welcome";
import Banner from "../components/Banner";
import SearchBox from "../components/SearchBox";
const HomePage = () => {
  return (
    <div>
      <Banner />
      <SearchBox />
      <Welcome />
      <Button />
    </div>
  );
};

export default HomePage;
