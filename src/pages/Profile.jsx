import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Lightbox from "../components/Lightbox";

const Profile = () => {
  const { auth } = useAuth();

  return (
    <div>
      <p>Profile</p>
      <div className="flex flex-col gap-2">
        <Link className="hover:text-primary" to="/">Ir a Inicio</Link>
        <Link className="hover:text-primary" to="edit-user">Editar Usuario</Link>
      </div>

      <div className="w-[200px] h-[300px] overflow-hidden rounded border-[1px] dark:border-stone-700 border-gray-800">
        <Lightbox
          photo={auth?.user.avatar}
          alt="Avatar"
          style="w-[200px] h-[300px] object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <p>{auth?.user.username}</p>
      <p>Sexo: {auth?.user.sexo}</p>
      <p>País: {auth?.user.nationality}</p>
    </div>
  );
};

export default Profile;