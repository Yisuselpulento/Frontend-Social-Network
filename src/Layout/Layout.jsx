import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Toaster } from 'sonner'
import NavBar from '../components/NavBar/NavBar'
import { useState } from 'react'
/* import ButtonAdmin from '../components/Admin/ButtonAdmin';
import useAuth from '../hooks/useAuth'; */

const Layout = () => {
  /*  const {auth } = useAuth() */
  const [isCardVisible, setIsCardVisible] = useState(false);

  return (
    <div>
          <Toaster />
        <header>
           <NavBar setIsCardVisible={setIsCardVisible}/>
        </header>
        <main   className={`min-h-screen md:px-10 px-1 ${
          isCardVisible ? "md:mt-30 mt-2" : "md:mt-24 mt-2"
            }`}
          >
            <Outlet />
        </main>
        <footer className='mt-20'>
            <Footer />
        </footer>
      {/*   {auth?.user?.isAdmin && <ButtonAdmin/> } */}
      
    </div>
  )
}

export default Layout