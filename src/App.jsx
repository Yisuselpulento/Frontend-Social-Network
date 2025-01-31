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

function App() {
  return (

   <BrowserRouter>
   <ScrollToTop/>
   <ThemeProvider>
      <AuthProvider>
          <Routes>
              <Route  path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                  </Route>
                    <Route path="/update-password" element={<UptadePassword />} />
                    <Route path="/verification-email" element={<EmailVerification />} />

                  <Route element={<ProtectedRoute />}>
                          <Route path='/profile' element={<Profile/>} />
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
