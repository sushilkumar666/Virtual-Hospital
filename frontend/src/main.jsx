import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import PatientSignUp from "./components/PatientSignUp.jsx";
import DoctorSignUp from "./components/DoctorSignUp.jsx";
import PatientSignIn from "./components/PatientSignIn.jsx";
import DoctorSignIn from "./components/DoctorSignIn.jsx";
import PatientList from "./components/PatientList.jsx";
import PrescriptionPage from "./components/PrescriptionPage.jsx";
import ConsultationForm from "./components/ConsultationForm.jsx";
import Profile from "./components/Profile.jsx";
import DoctorList from "./components/DoctorList.jsx";
import UserProfile from "./components/UserProfile.jsx";
import PatientHistory from "./components/PatientHistory.jsx";
import PresciptionPdf from "./components/PresciptionPdf.jsx";
import UserPrescription from "./components/UserPrescription.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout>
            <Home />
          </AuthLayout>
        ),
      },

      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/patient/signup",
        element: <PatientSignUp />,
      },
      {
        path: "/doctor/signup",
        element: <DoctorSignUp />,
      },
      {
        path: "/patient/login",
        element: <PatientSignIn />,
      },
      {
        path: "/doctor/login",
        element: <DoctorSignIn />,
      },
      {
        path: "/patient/doctorlist/:page",

        element: (
          <AuthLayout>
            {" "}
            <DoctorList />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/prescription/:patientId",
        element: (
          <AuthLayout>
            <PrescriptionPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/patient/consultationform/:doctorId",
        element: (
          <AuthLayout>
            <ConsultationForm />,
          </AuthLayout>
        ),
      },
      {
        path: "/patient/doctordetails/:doctorId",
        element: (
          <AuthLayout>
            <Profile />,
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/doctorprofile",
        element: (
          <AuthLayout>
            <PatientList />,
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/patienthistory",
        element: <PatientHistory />,
      },
      {
        path: "/doctor/patientlist/:patientId",
        element: <PresciptionPdf />,
      },
      {
        path: "/patient/prescription",
        element: <UserPrescription />,
      },

      // {
      //   path: "/post/:slug",
      //   element: <Post />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
