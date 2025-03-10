import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from './context/AuthProvider';
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from './pages/AuthPages/Login';
import SignUp from './pages/AuthPages/SignUp';
import GuestRoute from './components/GuestRoute';
import EmailVerification from './pages/AuthPages/EmailVerification';
import ForgotPassword from './pages/AuthPages/ForgotPassword';
import UptadePassword from './pages/AuthPages/UptadePassword';
import EditUser from './pages/EditUser';
import UserProfile from './pages/UsersProfile';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (

   <BrowserRouter>
   <ScrollToTop/>
   <ThemeProvider>
      <AuthProvider>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="/update-password/:token" element={<UptadePassword />} />
            <Route path="/verification-email" element={<EmailVerification />} />

            <Route element={<ProtectedRoute />}>
              <Route index element={<Home />} />
              <Route path='/profile' element={<Profile/>} />   
              <Route path='/profile/edit-user' element={<EditUser/>} />   
              <Route path='/user/:username' element={<UserProfile />} /> 
              <Route path='/search' element={<SearchPage />} /> 
              <Route path='/inbox' element={<ChatPage />} /> 
              <Route path='/notifications' element={<NotificationsPage />} /> 
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
   </ThemeProvider>
   </BrowserRouter>
  )
}

export default App
