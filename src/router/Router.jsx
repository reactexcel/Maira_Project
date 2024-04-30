import { createBrowserRouter } from "react-router-dom";
import ReportTable from "../pages/dashboard/reporttable";
import Register from "../pages/register";
import ResetPassword from "../pages/resetpassword";
import CreatePassword from "../pages/resetpassword/NewPassword";
import LayoutCompnent from "./layout";
import DataQualityTable from "../pages/dashboard/dataqualitytable";
import DataMatrixSummaryTable from "../pages/dashboard/datamatrixsummarytable";
import OrgLevelRatingTable from "../pages/dashboard/orglevelratingstable";
import { Typography } from "@mui/material";
import Profile from "../pages/dashboard/profile";
import CredientialLayout from "./layout/CredientialLayout";
import Login from "../pages/login";
import DatamatrixsummarytableBack from "../pages/dashboard/datamatrixsummarytable(Back)";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <CredientialLayout />,
    children: [
      { path: "", element: <Login /> },
      {
        path: "register",
        element: <Register />,
      },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "create-password", element: <CreatePassword /> },
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutCompnent />,
    children: [
      {path:'datamatrixsummarytable-back',element:<DatamatrixsummarytableBack/>},
      { path: "org-level-ratings", element: <OrgLevelRatingTable /> },
      { path: "data-quality", element: <DataQualityTable /> },
      { path: "data-matrix-summary", element: <DataMatrixSummaryTable /> },
      { path: "report", element: <ReportTable /> },
      { path: "profile", element: <Profile /> },
      { path: "", element: <Typography>Hi Maira</Typography> },
    ],
  },
]);
