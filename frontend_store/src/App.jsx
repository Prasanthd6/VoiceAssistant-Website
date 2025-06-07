import "./app.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import SellerProfile from "./pages/seller/SellerProfile";
import MyGig from "./components/myGig/MyGig";
import UpdateGig from "./components/myGig/UpdateGig";
import MyChats from "./pages/mychats/MyChats";
import VoiceControl from "./components/voicecontrol/VoiceControl";
import ChatPopup from "./components/chatpopup/ChatPopup";


function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
          <VoiceControl />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        // {
        //   path: "/messages",
        //   element: <Messages />,
        // },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/seller",
          element: <SellerProfile/>
        },
        {
          path: "/mygig",
          element:<MyGig />
        },
        {
          path: "/update-gig/:id",
          element:<UpdateGig/>
        },
        {
            path: "/messages",
            element: <MyChats/>
        },
        {
          path: "/chatpopup",
          element: <ChatPopup/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} /> ;
}

export default App;







/////////////////////////////////////////////////////

// import './App.css';
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Homepage from "./pages/Homepage";
// import Creatework from './components/Creatework';
// import Showwork from './components/Showwork';
// import Deletework from './components/Deletework';
// import Editwork from './components/Editwork';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import BecomeMate from './pages/BecomeMate';
// import ClientDashboard from './pages/ClientDashboard';
// import WorkerDashboard from './pages/WorkerDashboard';

// const App = () => {
//   return (
//       <Routes>
//         <Route path="/" element={<Homepage/>}/>
//         <Route path="/works/create" element={<Creatework/>}/>
//         <Route path="/works/details/:id" element={<Showwork/>}/>
//         <Route path="/works/edit/:id" element={<Editwork/>}/>
//         <Route path="/works/delete/:id" element={<Deletework/>}/>
//         <Route path="/signup" element={<Signup/>} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/becomemate" element={<BecomeMate/>} />
//         <Route path="/clientdashboard" element={<ClientDashboard/>} />
//         <Route path="/workerdashboard" element={<WorkerDashboard/>} />


//       </Routes>
   
//   );
// }

// export default App;

