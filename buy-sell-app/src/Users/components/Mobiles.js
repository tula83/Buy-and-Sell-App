import React from "react";
import { useState, useEffect } from "react";
import SingleItem from "./SingleItem";

export default function Mobiles(props) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState(data);
  const [filteredData, setFilteredData] = useState(filtered);
  console.log(data);
  console.log(filtered);
  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/product";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // Filter the data here, inside the fetch callback
        const filteredData = data.filter((item) => item.category === "mobile");
        setFiltered(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [data]);
  useEffect(() => {
    

    const filtere = filtered.filter((book) =>book.name.toLowerCase().includes(props.search.toLowerCase()));
    setFilteredData(filtere);
}, [props.search,data]);

  return (
    <>
      <div className="container">
        <p
          className="text-center"
          style={{ display: data.length === 0 ? "block" : "none" }}
        >
          Loading....
        </p>
        <div className="row">
          {filteredData.map((item) => (
              <SingleItem item={item}/>
          ))}
        </div>
      </div>
    </>
  );
}
