import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firestore, getAuth } from "@pages/helpers/firebase";

// @ts-ignore - image exists
import github from "@assets/img/github.svg";

// @ts-ignore - image exists
import google from "@assets/img/google.svg";
import { checkUserData } from "../helpers/firestore";

export default function Options(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    getAuth().then((s) => {
      if (s.isLoggedIn) {
        window.location.href = window.location.origin + "/dash/index.html";
        return;
      }
    });
  }, []);

  const submitForm = () => {
    getAuth().then((s) => {
      if (s.isLoggedIn) {
        window.location.href = window.location.origin + "/dash/index.html";
        return;
      }
      signInWithEmailAndPassword(s.auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          checkUserData(user, firestore).then(() => {
            chrome.storage.local.set({ user: s.auth.currentUser }, function () {
              console.log("User data has been stored in storage");
              window.location.href =
                window.location.origin + "/dash/index.html";
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    });
  };

  return (
    <>
      <main>
        <section className="relative w-full h-full py-4 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    {errorMsg !== "" ? (
                      <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                        <span className="inline-block align-middle mr-8">
                          {errorMsg}
                          {/* <b className="capitalize">Error!</b> */}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="text-center mb-3">
                      <h6 className="text-slate-500 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-slate-50 text-slate-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img alt="..." className="w-5 mr-1" src={github} />
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-slate-50 text-slate-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img alt="..." className="w-5 mr-1" src={google} />
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-slate-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-slate-400 text-center mb-3 font-bold">
                      Or sign in with credentials
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-slate-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          onChange={(v) => setEmail(v.target.value)}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-slate-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          onChange={(v) => setPassword(v.target.value)}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-slate-600">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={submitForm}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-slate-200"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a href="/register/index.html" className="text-slate-200">
                      Create new account
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
