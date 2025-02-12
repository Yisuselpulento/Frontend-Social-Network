import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Profile = () => {
  const { auth } = useAuth()

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
      <div>
        <img src={auth?.user.avatar} className="w-[200px] h-[300px] object-cover rounded" />
        <p>{auth?.user.username}</p>
        <p>Sexo: {auth?.user.sexo}</p>
        <p>Pais: {auth?.user.nationality}</p>
      </div>
    </div>
  )
}

export default Profile