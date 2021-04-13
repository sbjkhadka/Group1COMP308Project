import React from 'react'
import HomeIcon from "@material-ui/icons/Home";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ViewListIcon from "@material-ui/icons/ViewList";
import DialerSipIcon from "@material-ui/icons/DialerSip";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
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
    title: "My Vitals",
    icon: <ViewListIcon />,
    link: "/myVitals",
    accessiblity: "patient",
  },
  {
    title: "View Vitals",
    icon: <ViewListIcon />,
    link: "/viewVitals",
    accessiblity: "nurse",
  },
  {
    title: "Record New Vitals",
    icon: <AssessmentIcon />,
    link: "/createVitals",
    accessiblity: "nurse",
  },
  {
    title: "Record My Vital",
    icon: <AssessmentIcon />,
    link: "/recordMyVitals",
    accessiblity: "patient",
  },
  {
    title: "Send Emergency Alert",
    icon: <DialerSipIcon />,
    link: "/emergency",
    accessiblity: "patient",
  },
  {
    title: "Emergency Alert History",
    icon: <DialerSipIcon />,
    link: "/emergency",
    accessiblity: "nurse",
  },
  {
    title: "Self Assessment",
    icon: <WbIncandescentIcon />,
    link: "/assessment",
    accessiblity: "patient",
  },
  {
    title: "Send Health Tips",
    icon: <GroupIcon />,
    link: "/sendHealthTips",
    accessiblity: "nurse",
  },
  {
    title: "Logout",
    icon: <PowerSettingsNewIcon />,
    link: "/logout",
    accessiblity: "logout",
  },
];

