import "./App.css";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import "animate.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/auth/Auth";
//import AuthReq from "./pages/auth/AuthReq";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Notifications from "./pages/notifications/Notifications";
import SingleTweet from "./pages/singletweet/SingleTweet";
import Conversations from "./pages/conversations/Conversations";

const queryClient = new QueryClient();

function App() {
  const [authState] = useContext<any>(AuthContext);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="/auth/req?" element={<AuthReq />} /> */}
            <Route path="/" element={authState.user ? <Home /> : <Auth />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/singletweet/:tweetId" element={<SingleTweet />} />
            <Route path="/conversations" element={<Conversations />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
