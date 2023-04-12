import Home from "./Pages/Home";
import Root from "./Routes/Root";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Account from "./Pages/Account";
import Checkout from "./Pages/Checkout";
import CheckoutOauth from "./Pages/CheckoutOauth";
import ErrorPage from "./Pages/ErrorPage";
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import { useFetch } from "./Context/FetchContext";


function App() {
  const { loggedIn } = useFetch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: "login",
              element: (!loggedIn ? <Login /> : <Navigate to="/dashboard" />)
            },
            {
              path: "register",
              element: (!loggedIn ? <Register /> : <Navigate to="/dashboard" />)
            },
            {
              path: "checkout",
              element: (loggedIn ? <Checkout /> : <Navigate to="/login" />)
            },

            {
              path: "oauth/wallet",
              element:  (loggedIn ? <CheckoutOauth /> : <Navigate to="/login" />)
            },

            {
              path: "dashboard",
              element: (loggedIn ? <Dashboard /> : <Navigate to="/login" />)
            },
            {
              path: "account",
              element: (loggedIn ? <Account /> : <Navigate to="/login" />)
            },
          ]
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
