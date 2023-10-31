import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
// @ts-ignore Img declare ok
import defaultPFP from "@assets/img/defaultpfp.png";
import { getAuth } from "@src/pages/helpers/firebase";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [userDispName, setUserDispName] = React.useState("");
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    // @ts-ignore
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useEffect(() => {
    getAuth().then((s) => {
      // user must be loged in (in this state)
      if (!s.user) return;
      setUserDispName(s.user.displayName ?? "Unknown");
    });
  }, []);

  return (
    <>
      <a
        className="text-slate-500 block"
        href="#user"
        // @ts-ignore
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={defaultPFP}
            />
          </span>
        </div>
      </a>
      <div
        // @ts-ignore
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#name"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-600"
          }
          onClick={(e) => e.preventDefault()}
        >
          {userDispName}
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Settings
        </a>
        <div className="h-0 my-2 border border-solid border-slate-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-700"
          }
          onClick={(e) => {
            e.preventDefault();
            chrome.storage.local.clear();
            window.location.href = window.location.origin + "/login/index.html";
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
