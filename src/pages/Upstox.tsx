import { useEffect, useState } from "react";
import UpstoxProps from "../models/upstox-model";

const Upstox = () => {
  const [responseData, setResponseData] = useState<UpstoxProps>({
    access_token: "",
    user_id: "",
    user_name: "",
    email: "",
  });

  useEffect(() => {
    accessToken();
  }, []);

  useEffect(() => {
    // Directly save responseData to sessionStorage whenever it changes
    saveSessionStorage(responseData);
  }, [responseData]);

  const saveSessionStorage = (data: UpstoxProps) => {
    sessionStorage.setItem("access_token", data.access_token);
    sessionStorage.setItem("user_id", data.user_id);
    sessionStorage.setItem("user_name", data.user_name);
    sessionStorage.setItem("user_email", data.email);
  };

  const accessToken = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/upstox/getAccessToken",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setResponseData(data); // Update state with the fetched data
      console.log(data); // Debugging the data from the server
    } catch (error) {
      console.error(error); // Handle any errors that occur during fetch
    }
  };

  return (
    <div>
      <h1>Upstox Login Successful</h1>
      {responseData ? (
        <>
          <p>{`${responseData.access_token} Access Token Received`}</p>
          <p>{`${responseData.user_id} User ID Received`}</p>
          <p>{`${responseData.user_name} User Name Received`}</p>
          <p>{`${responseData.email} User Email Received`}</p>
        </>
      ) : (
        <p>No Token Received</p>
      )}
    </div>
  );
};

export default Upstox;
