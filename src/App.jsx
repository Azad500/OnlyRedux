import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCounter } from "./counter/counterSlice";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  const contents = useSelector((state) => state.counter.contents);
  const isLoading = useSelector((state) => state.counter.isLoading);
  const error = useSelector((state) => state.counter.error);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://terlan125-001-site1.ftempurl.com/api/information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: inputValue }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Failed to send POST request:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Redux Complete Tutorial</h2>
      <p>{contents.mail1}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
