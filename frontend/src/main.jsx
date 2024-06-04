import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/login",
      //   element: (
      //     <AuthLayout >
      //       <Login />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/signup",
      //   element: (
      //     <AuthLayout >
      //       <Signup />
      //     </AuthLayout>
      //   ),
      // },

      // {
      //   path: "/post/:slug",
      //   element: <Post />,
      // },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
