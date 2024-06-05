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
import Doctors from "./components/Doctors.jsx";
import PatientSignUp from "./components/PatientSignUp.jsx";
import DoctorSignUp from "./components/DoctorSignUp.jsx";
import PatientSignIn from "./components/PatientSignIn.jsx";
import DoctorSignIn from "./components/DoctorSignIn.jsx";
import DoctorProfile from "./components/DoctorProfile.jsx";
import PrescriptionPage from "./components/PrescriptionPage.jsx";
import ConsulationForm from "./components/ConsultationForm.jsx";
import ConsultationForm from "./components/ConsultationForm.jsx";
import Profile from "./components/Profile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {

        path: "/",

        element: (<AuthLayout> <Home /></AuthLayout>),

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
        path: "/patient/doctors",
        element: (<AuthLayout><Doctors /></AuthLayout>),
      },
      {
        path: "/doctor/doctorprofile/:doctorId",
        element: (

          <DoctorProfile />

        ),
      },
      {
        path: "/doctor/prescription/:patientId",
        element: (

          <PrescriptionPage />

        ),
      },
      {
        path: "/patient/consultationform/:doctorId",
        element: (

          <ConsultationForm />

        ),
      },
      {
        path: "/patient/doctordetails/:doctorId",
        element: (

          <Profile />

        ),
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
