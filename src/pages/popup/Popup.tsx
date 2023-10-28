import React from "react";
// @ts-ignore - it exists
import logo from "@assets/img/logo.png"
import DefaultLanding from "@components/DefaultLanding/DefaultLanding";

export default function Popup(): JSX.Element {
  // chrome.storage.local.get(["key"]).then((result) => {
  //   console.log("Value currently is " + result.key);
  // });
  
  return (
    <div style={{width: "300px", height: "200px"}}>
      <DefaultLanding />
      <div className="flex items-center justify-center">
            <img src={logo} alt="PolitiCheck Logo" style={{width: "100px"}} />
            <h1 className="text-white font-semibold text-5xl">PolitiCheck</h1>
            <p className="mt-4 text-lg text-blueGray-200">Please login to get started.</p>
        </div>
    </div>
  );
}
