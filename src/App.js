import React from "react";
import Colors from "./components/Colors";
import Header from "./components/Header";

export default function App() {
  return(
    <>
    <div className="main-temp">
      <Header />
      <Colors />
    </div>
    <h1 className="warning">
      Only works for mobile for now! Lower the screen size
    </h1>
    </>
  )
}
