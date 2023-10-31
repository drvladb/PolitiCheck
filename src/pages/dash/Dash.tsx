import React, { useEffect, useState } from "react";
import { getAuth } from "@pages/helpers/firebase";
import { HeaderStats, Navbar } from "./elements";
import {
  CardBarChart,
  CardLineChart,
  CardRecentArticles,
  CardSocialTraffic,
} from "./cards";

export default function Dash(): JSX.Element {
  return (
    <>
      <div className="relative bg-slate-100 h-full">
        {/* navbar */}
        <Navbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {/* <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardLineChart />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <CardBarChart />
            </div>
          </div> */}
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardRecentArticles />
            </div>
            {/* <div className="w-full xl:w-4/12 px-4">
              <CardSocialTraffic />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
