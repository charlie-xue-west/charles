"use client";

import { CreateAccountButton } from "@components";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Fetch data from your backend server
  //   fetch("http://localhost:5000/") // Your backend API URL
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <>
      <div className="">Welcome to Charles</div>
      <CreateAccountButton />
      {data ? <p>{}</p> : <p>Loading...</p>}
    </>
  );
}
