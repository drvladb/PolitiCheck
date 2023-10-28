import React from "react";
// @ts-ignore - it exists
import logo from "@assets/img/logo.png";
import DefaultLanding from "@components/DefaultLanding/DefaultLanding";

export default function Popup(): JSX.Element {
  // chrome.storage.local.get(["key"]).then((result) => {
  //   console.log("Value currently is " + result.key);
  // });

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-max">
        <img src={logo} alt="PolitiCheck Logo" style={{ width: "100px" }} />
        <h1 className="font-semibold text-5xl mt-1">PolitiCheck</h1>
        <p className="text-lg text-blueGray-800">
          Please login to get started.
        </p>
        <button
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mt-2 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => chrome.tabs.create({ url: "/login/index.html" })}
        >
          Login
        </button>
      </div>
    </div>
  );
}
