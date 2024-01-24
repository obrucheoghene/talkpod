import { ReactElement } from "react";

// import ProtectedRoute from "../middlewares/ProtectedRoute";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Landing from "../pages/Landing";
import Conference from "../pages/Conference";
import Room from "../pages/Room";
import NewRoom from "../pages/NewRoom";

interface RouteType {
    path: string;
    element: ReactElement;
}


const routes = ():RouteType[] => [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/new',
      element: <NewRoom/>
    },
    {
      path: '/:roomId',
      element: <Room/>
    },
    {
      path: '/:roomId/join',
      element: <Conference/>
    },
  ];
  
  export default routes;
