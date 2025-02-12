import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import { editUserFetching } from "../services/UserFetching";
import Spinner from "../components/Spinner/Spinner";
import { Alert } from "../components/Alert";
import { countries } from "../helpers/countries";
import EditAvatar from "../components/Profile/EditAvatar";

const EditUser = () => {
  const { auth, updateAuth } = useAuth();
  const navigate = useNavigate();
  
  const user = auth?.user || {}; 

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    nationality: user.nationality || "",
  });

  const [alert, setAlert] = useState({ msg: "", error: false });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setFormData({
      username: user.username || "",
      email: user.email || "",
      nationality: user.nationality || "",
    });
  }, [auth]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const hasChanges = Object.keys(formData).some(key => formData[key] !== user[key]);
    
    if (!hasChanges) {
      setAlert({ msg: "No hay cambios para actualizar.", error: true });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setAlert({ msg: "Por favor, ingresa un correo electrónico válido.", error: true });
      return;
    }

    if (formData.username && (formData.username.length < 3 || formData.username.length > 10)) {
      setAlert({ msg: "El nombre de usuario debe tener entre 3 y 10 caracteres.", error: true });
      return;
    }

    setLoading(true);

    try {
      const response = await editUserFetching(formData);
      if (response.success) {
        updateAuth(response.user); 
        toast.success("Perfil actualizado exitosamente.");
        navigate("/profile");
      } else {
        setAlert({ error: true, msg: response.message });
      }
    } catch (error) {
      toast.error("Hubo un error. Intenta de nuevo.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const styleInput = "bg-white dark:bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  return (
    <div className="md:w-[500px] mx-auto">
      <p className="text-xl font-bold mb-4">Editar Usuario</p>

      <button onClick={() => navigate(-1)} className="hover:text-primary cursor-pointer">
        Atras
      </button>
      <div>
        <EditAvatar />
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-stone-800 p-5 rounded-lg flex flex-col gap-4">
        
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={user.username || "Nuevo nombre de usuario"}
            className={styleInput}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={user.email || "Nuevo correo electrónico"}
            className={styleInput}
          />
        </div>

        <div>
            <label htmlFor="nationality">Nationality</label>
            <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={styleInput}
            >
                <option value="" disabled>Selecciona un país</option>
                {countries.map((country) => (
                <option key={country} value={country}>
                    {country}
                </option>
                ))}
            </select>
            </div>

        <div>
          <button
            aria-label="editar perfil"
            type="submit"
            disabled={loading}
            className={`w-full mt-3 rounded-lg py-2 h-[40px] flex items-center justify-center text-white transition-colors 
              ${loading ? "bg-primary opacity-90" : "bg-primary hover:bg-indigo-700 cursor-pointer"}`}
          >
            {loading ? <Spinner size="1.2em" /> : "Save Changes"}
          </button>
          {alert.msg && <Alert alert={alert} />}
        </div>
      </form>
    </div>
  );
};

export default EditUser;
