import React from 'react';
import "../App.css";
import {SidebarData} from "./SidebarData"

function sidebar() {
    return (
        <div className="SideBar">
            <ul className="sidebarList">
            {SidebarData.map((val, key) => {
                return (
                    <li key={key} 
                        onClick={()=> {window.location.pathname = val.link}} 
                        className="row"
                        id={window.location.pathname === val.link ? "active" : "passive"}>
                        <div id="icon">{val.icon}</div>{" "}
                        <div id="title">{val.title}</div>
                        </li>
                )
            })}
            </ul>
        </div>
    )
}

export default sidebar
