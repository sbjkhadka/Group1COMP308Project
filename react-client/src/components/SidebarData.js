import React from 'react'
import HomeIcon from "@material-ui/icons/Home";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
    accessiblity: "auth",
  },
  {
    title: "Sign up",
    icon: <PersonAddIcon />,
    link: "/signup",
    accessiblity: "auth",
  },
  {
    title: "Vitals",
    icon: <AssessmentIcon />,
    link: "/vitals",
    accessiblity: "nurse",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
    accessiblity: "student",
  },
  {
    title: "Friends",
    icon: <GroupIcon />,
    link: "/friends",
    accessiblity: "nurse",
  },
  {
    title: "Logout",
    icon: <PowerSettingsNewIcon />,
    link: "/logout",
    accessiblity: "auth",
  },
];

