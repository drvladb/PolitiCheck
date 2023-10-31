import { firestore, getAuth } from "@src/pages/helpers/firebase";
import { getArticles } from "@src/pages/helpers/firestore";
import React, { useEffect, useState } from "react";

type Article = {
  id: string;
  name: string;
  url: string;
  bias: string;
};

// make dash predictions nice
const mapToReadable = (
  predicition: "neutral" | "conservative" | "liberal" | string,
): string => {
  switch (predicition) {
    case "conservative":
      return "Conservative";
    case "liberal":
      return "Liberal";
    default:
      return "Neutral";
  }
};

export default function CardPageVisits() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    getAuth().then((s) => {
      // must be logged in
      if (!s.user) return;
      getArticles(s.user, firestore).then((qs) => {
        let iArticles: Article[] = [];
        qs.forEach((i) => {
          const d = i.data();
          iArticles.push({
            id: i.id,
            name: d.name,
            url: d.url,
            bias: d.bias,
          });
        });
        setArticles(iArticles.reverse()); // reverse to get chronological order
      });
    });
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-slate-700">
                Recent News Articles
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              {/* <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button> */}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>
                {/* <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Visitors
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Unique users
                </th> */}
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Bias
                </th>
              </tr>
            </thead>
            <tbody>
              {articles ? (
                articles.map((article) => {
                  return (
                    <tr key={article.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {article.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {mapToReadable(article.bias)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
