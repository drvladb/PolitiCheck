import React, { useEffect, useState } from "react";

import CardStats from "../cards/CardStats";
import { firestore, getAuth } from "@src/pages/helpers/firebase";
import { testConnectivity } from "@src/pages/helpers/api";

// @ts-ignore Img declare ok
import neutralGray from "@assets/img/neutral_grayt.png";
import { getUserData } from "@src/pages/helpers/firestore";
import { UserData, nanify } from "./helpers";

export default function HeaderStats() {
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

  console.log(userData);

  return (
    <>
      {/* Header */}
      <div className="relative bg-slate-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Conservative (Lifetime)"
                  statTitle={userData?.conservative.toString() ?? "Loading"}
                  statArrow="up"
                  statPercent={userData?.conservativePct ?? "Loading"}
                  statPercentColor="text-emerald-500"
                  statDescripiron="of Total"
                  icon={neutralGray}
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Neutral (Lifetime)"
                  statTitle={userData?.neutral.toString() ?? "Loading"}
                  statArrow="down"
                  statPercent={userData?.neutralPct ?? "Loading"}
                  statPercentColor="text-green-500"
                  statDescripiron="of Total"
                  icon={neutralGray}
                  statIconColor="bg-gray-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Liberal (Lifetime)"
                  statTitle={userData?.liberal.toString() ?? "Loading"}
                  statArrow="down"
                  statPercent={userData?.liberalPct ?? "Loading"}
                  statPercentColor="text-green-500"
                  statDescripiron="of Total"
                  icon={neutralGray}
                  statIconColor="bg-blue-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Predictor"
                  statTitle={
                    predictorOnline === null
                      ? "Checking"
                      : predictorOnline
                      ? "Online"
                      : "Offline"
                  }
                  statArrow=""
                  statPercent=""
                  statPercentColor=""
                  statDescripiron=""
                  icon={null}
                  statIconColor={
                    predictorOnline === null
                      ? "bg-gray-500"
                      : predictorOnline
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                  showPct={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
