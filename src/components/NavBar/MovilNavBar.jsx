import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ButtonTheme from "./ButtonTheme";
import LogoutButton from "./LogoutButton";
import SearchIcon from "../../icons/SearchIcon";
import HomeIcon from "../../icons/HomeIcon";
import UserIcon from "../../icons/UserIcon";
import AddIcon from "../../icons/AddIcon";
import SearchBar from "../SearchBar";
import ChatIcon from "../../icons/ChatIcon";
import CreatePost from "../Posts/CreatePost";

const MovilNavBar = () => {
    const { auth } = useAuth();
    const isLoggedIn = auth?.success;

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const styleButton = "dark:hover:bg-stone-800 hover:bg-white p-1 rounded-full cursor-pointer";

    return (
        <nav className="md:hidden p-2 h-full dark:bg-neutral-950 bg-gray-200 w-full rounded-t-md relative">
            <div className="flex justify-center items-center">
                {!isLoggedIn ? (
                    <div className='flex gap-5 items-center flex-row'>
                        <Link className="hover:text-primary" to="/login">Login</Link>
                        <Link className="hover:text-primary" to="/signup">Sign Up</Link>
                    </div>
                ) : (
                    <div className='flex justify-between h-full w-full items-center flex-row px-5 relative'>
                        <Link 
                        className={styleButton}
                        to="/">
                            <HomeIcon />
                        </Link>
                        
                        <Link 
                        to="/search"
                        className={styleButton}
                        >
                            
                            <SearchIcon />
                        </Link>
                        
                        <button 
                        className={styleButton}
                        onClick={() => setIsPostModalOpen(true)}>
                            <AddIcon />
                        </button>

                        <Link
                        to="/inbox"
                        className={styleButton}
                        >
                            <ChatIcon />
                        </Link>
                        
                        <div className="relative">
                            <button 
                            className={styleButton}
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                <UserIcon />
                            </button>
                            {isUserMenuOpen && (
                                <div className=" bg-white dark:bg-neutral-800 p-3 shadow-lg rounded-md flex flex-col gap-2 z-50 w-40 items-start">
                                    <Link to="/profile" className="flex items-center gap-2">
                                        <img 
                                        className="w-8 h-8 rounded-full"
                                        src={auth?.user.avatar} />
                                        Perfil
                                    </Link>
                                    <LogoutButton  />
                                    <ButtonTheme />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {isSearchOpen && (
                  <div className="flex items-center justify-center h-screen" >
                    <div className="bg-white dark:bg-neutral-900 items-center p-4 rounded-md flex flex-col gap-2 w-full">
                        <SearchBar />
                        <button onClick={() => setIsSearchOpen(false)} className="mt-2 text-red-500">Cerrar</button>
                    </div>
                </div>
            )}

            {isPostModalOpen && (
                <div className="flex items-center justify-center h-screen" >
                   <CreatePost setIsPostModalOpen={setIsPostModalOpen} />
                </div>
            )}
        </nav>
    );
};

export default MovilNavBar;
