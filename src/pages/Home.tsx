import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDCardDemo } from "../common/body/card";
// import Charts from "../components/charts";

const Home = () => {
  const [message, setMessage] = useState("Hello!");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/upstox/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to Mr_Stocks App</h1>
      <p>{message}</p>
      <div className="card w-150 h-100">{/* <Charts /> */}</div>
      <ThreeDCardDemo />
      <a href="/ticker" className="btn bg-secondary hover:border-color">
        Ticket
      </a>
    </div>
  );
};

export default Home;
