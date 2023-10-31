import React, { useEffect, useState } from "react";
import { firestore, getAuth } from "../helpers/firebase";
import { getUserData } from "../helpers/firestore";
import { UserData, nanify } from "../dash/elements/helpers";
import { testConnectivity } from "../helpers/api";

export default function PopupDash(): JSX.Element {
  // only rendered if the user is logged in, firebase calls ok
  const [predictorOnline, setPredictorOnline] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    getAuth().then((s) => {
      // must be logged in
      if (!s.user) return;
      getUserData(s.user, firestore).then((qs) => {
        const data = qs.data();
        if (!data) return; // should never happen
        const stats = data.stats.lifetime;
        const sum = stats.conservative + stats.neutral + stats.liberal;
        setUserData({
          conservative: stats.conservative,
          conservativePct: nanify(
            ((stats.conservative / sum) * 100).toFixed(1),
          ),
          neutral: stats.neutral,
          neutralPct: nanify(((stats.neutral / sum) * 100).toFixed(1)),
          liberal: stats.liberal,
          liberalPct: nanify(((stats.liberal / sum) * 100).toFixed(1)),
        });
      });
    });
    testConnectivity()
      .then((d) => {
        console.log(d);
        setPredictorOnline(true);
      })
      .catch((e) => {
        console.error(e);
        setPredictorOnline(false);
      });
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-800">
      <div className="flex flex-col items-center justify-center h-max w-max">
        <p className="text-2xl text-slate-100">Stats (Lifetime)</p>
        <div className="flex items-stretch justify-between w-max m-10 mb-0 mt-0">
          <div className="flex flex-col items-center justify-center bg-red-500 w-20 h-20 m-5 rounded-lg border-2 border-black">
            <p className="text-xl m-0 p-0 text-slate-100 font-bold">
              {userData?.conservative ?? ""}
            </p>
            <p className="text-xs m-0 p-0 text-slate-200 font-semibold">
              Conservative
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-500 w-20 h-20 m-5 rounded-lg border-2 border-black">
            <p className="text-xl m-0 p-0 text-slate-100 font-bold">
              {userData?.neutral ?? ""}
            </p>
            <p className="text-xs m-0 p-0 text-slate-200 font-semibold">
              Neutral
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-blue-500 w-20 h-20 m-5 rounded-lg border-2 border-black">
            <p className="text-xl m-0 p-0 text-slate-100 font-bold">
              {userData?.liberal ?? ""}
            </p>
            <p className="text-xs m-0 p-0 text-slate-200 font-semibold">
              Liberal
            </p>
          </div>
        </div>
        <button
          className="bg-sky-500 text-slate-100 active:bg-sky-600  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mt-2 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => chrome.tabs.create({ url: "/dash/index.html" })}
        >
          Open Dashboard
        </button>
      </div>
    </div>
  );
}
