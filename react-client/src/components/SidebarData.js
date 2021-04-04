import React from 'react'
import HomeIcon from "@material-ui/icons/Home";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Sign up",
    icon: <PersonAddIcon />,
    link: "/signup",
  },
  {
    title: "Vitals",
    icon: <AssessmentIcon />,
    link: "/vitals",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Friends",
    icon: <GroupIcon />,
    link: "/friends",
  },
  {
    title: "Images",
    icon: <PermMediaIcon />,
    link: "/images",
  },
];

