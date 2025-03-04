import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
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
import UserProfile from "./components/DoctorProfile.jsx";
import PatientHistory from "./components/PatientHistory.jsx";
import PresciptionPdf from "./components/PresciptionPdf.jsx";
import UserPrescription from "./components/UserPrescription.jsx";
import DummyPage from "./components/DummyPage.jsx";
import DoctorProfile from "./components/DoctorProfile.jsx";
import PatientProfile from "./components/PatientProfile.jsx";
import { PersistGate } from "redux-persist/integration/react";
import PatientPdf from "./components/PatientPdf.jsx";
import PresciptionPdf2 from "./components/prescriptionPdf2.jsx";
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

        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/dummy",
        element: <DummyPage />,
      },
      {
        path: "/login",

        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/patient/signup",
        element: (
          <AuthLayout authentication={false}>
            <PatientSignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/signup",
        element: (
          <AuthLayout>
            <DoctorSignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/patient/login",
        element: (
          <AuthLayout authentication={false}>
            <PatientSignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/login",
        element: (
          <AuthLayout authentication={false}>
            <DoctorSignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/patient/doctorlist/:page",

        element: (
          <AuthLayout authentication={true}>
            <DoctorList />
          </AuthLayout>
        ),
      },
      {
        path: "patient/patientprofile",
        element: (
          <AuthLayout authentication={true}>
            <PatientProfile />
          </AuthLayout>
        ),
      },
      {
        path: "doctor/doctorprofile",
        element: (
          <AuthLayout authentication={true}>
            <DoctorProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/prescription/:patientId/:recordId",
        element: (
          <AuthLayout authentication={true}>
            <PrescriptionPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/patient/consultationform/:doctorId",
        element: (
          <AuthLayout authentication={true}>
            <ConsultationForm />,
          </AuthLayout>
        ),
      },
      {
        path: "/patient/doctordetails/:doctorId",
        element: (
          <AuthLayout authentication={true}>
            <Profile />,
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/doctorprofile",
        element: (
          <AuthLayout authentication={true}>
            <PatientList />,
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/patienthistory",
        element: (
          <AuthLayout authentication={true}>
            <PatientHistory />,
          </AuthLayout>
        ),
      },
      {
        path: "/doctor/patientlist/:recordId",
        element: (
          <AuthLayout authentication={true}>
            <PresciptionPdf />,
          </AuthLayout>
        ),
      },
      {
        path: "/patient/prescription",
        element: (
          <AuthLayout authentication={true}>
            < PatientPdf />,
          </AuthLayout>
        ),
      },
      {
        path: "/patient/prescription/:pdfId",
        element: (
          <AuthLayout authentication={true}>
            < PresciptionPdf2 />,
          </AuthLayout>
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
  <Provider store={store}>
    <RouterProvider router={router}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </RouterProvider>
  </Provider>
);
