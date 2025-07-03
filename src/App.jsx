import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Toodolist from "./Components/Toodolist";
const InfitToodo = [
  {
    id: uuidv4(),
    title: "قرائة اربع كتب",
    des: "انجاز خلال شهر",
    isCompeleted: true,
  },
  {
    id: uuidv4(),
    title: "قرائة اربع كتب",
    des: "انجاز خلال شهرين",
    isCompeleted: true,
  },
  {
    id: uuidv4(),
    title: "قرائة اربع كتب",
    des: "انجاز خلال شهر",
    isCompeleted: true,
  },
  {
    id: uuidv4(),
    title: "قرائة اربع كتب",
    des: "انجاز خلال شهر",
    isCompeleted: true,
  },
];
import { v4 as uuidv4 } from "uuid";
import { ToodoContext } from "./contexts/ToodoContext";
function App() {
  const [Toodo1, setToodo] = useState(() => {
    const saved = localStorage.getItem("toodos");
    return saved ? JSON.parse(saved) : InfitToodo;
  });

  useEffect(() => {
    localStorage.setItem("toodos", JSON.stringify(Toodo1));
  }, [Toodo1]);

  const [count, setCount] = useState(0);

  return (
    <ToodoContext.Provider value={{ Toodo1, setToodo }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <Toodolist />
      </div>
    </ToodoContext.Provider>
  );
}

export default App;
