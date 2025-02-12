import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

const Profile = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div>
      <p>Profile</p>
      <div className="flex flex-col gap-2">
        <Link className="hover:text-primary" to="/">
          Ir a Inicio
        </Link>
        <Link className="hover:text-primary" to="edit-user">
          Editar Usuario
        </Link>
      </div>
      
      <div className="relative w-[200px] h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="2em" />
          </div>
        )}

        <img
          src={imageError ? "/default-avatar.png" : auth?.user?.avatar}
          className={`w-[200px] h-[300px] object-cover rounded ${
            isLoading ? "hidden" : "block"
          }`}
          alt="Avatar"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setImageError(true);
          }}
        />
      </div>

      <p>{auth?.user?.username}</p>
      <p>Sexo: {auth?.user?.sexo}</p>
      <p>Pais: {auth?.user?.nationality}</p>
    </div>
  );
};

export default Profile;