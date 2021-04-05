import React from 'react';
import "../App.css";
import {SidebarData} from "./SidebarData"

function sidebar() {

    const screen = localStorage.getItem("screen");
    return (
        <div className="SideBar">
            <ul className="sidebarList">
            {SidebarData.map((val, key) => {
                if (
                  (screen === val.accessiblity ||
                    val.accessiblity === "auth") &&
                  val.accessiblity !== "logout"
                ) {
                  return (
                    <li
                      key={key}
                      onClick={() => {
                        window.location.pathname = val.link;
                      }}
                      className="row"
                      id={
                        window.location.pathname === val.link
                          ? "active"
                          : "passive"
                      }
                    >
                      <div id="icon">{val.icon}</div>{" "}
                      <div id="title">{val.title}</div>
                    </li>
                  );
                } else if((
                    val.accessiblity === "logout" && (screen === "nurse" || screen === "patient")) ) {
                     return (
                       <li
                         key={key}
                         onClick={() => {
                           window.location.pathname = val.link;
                         }}
                         className="row"
                         id={
                           window.location.pathname === val.link
                             ? "active"
                             : "passive"
                         }
                       >
                         <div id="icon">{val.icon}</div>{" "}
                         <div id="title">{val.title}</div>
                       </li>
                     );
                }
            })}
            </ul>
        </div>
    )
}

export default sidebar
