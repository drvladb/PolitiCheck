import React, { useEffect, useState } from "react";

import LoginCTA from "./LoginCTA";
import { AuthState, getAuth } from "../helpers/firebase";
import PopupDash from "./PopupDash";

export default function Popup(): JSX.Element {
  const [authStatus, setAuthStatus] = useState<AuthState | null>();
  useEffect(() => {
    getAuth().then((s) => {
      setAuthStatus(s);
    });
  }, []);

  if (authStatus == null) return <p>Loading</p>;
  if (!authStatus?.isLoggedIn || !authStatus.user) {
    return <LoginCTA />;
  }
  return <PopupDash />;
}
