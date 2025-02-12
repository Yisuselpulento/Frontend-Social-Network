import { useState } from "react";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { uploadAvatarFetching } from "../../services/UserFetching";
import Spinner from "../Spinner/Spinner";


const EditAvatar = () => {
  const { auth, updateAuth } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(auth?.user?.avatar || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecciona una imagen válida.");
      return;
    }

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!avatar) {
      toast.error("Selecciona una imagen antes de subir.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", avatar);

    try {
      const response = await uploadAvatarFetching(formData);
      console.log(response);
      if (response.success) {
        updateAuth(response.user);
        setPreview(response.user.avatar); 
        toast.success("Avatar actualizado correctamente.");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
     toast.error("Hubo un error. Por favor, intenta de nuevo.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-4">
       <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
        {preview ? (
          <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
        ) : (
          <img
            src={auth?.user?.avatar || "/default-avatar.png"} 
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="avatarInput" />
      <label htmlFor="avatarInput" className="cursor-pointer px-4 hover:opacity-90 py-2 bg-gray-200 dark:bg-stone-700 rounded-md">
        Seleccionar imagen
      </label>

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white  ${
          loading ? "bg-gray-400" : "bg-primary hover:bg-indigo-700 cursor-pointer"
        }`}
      >
        {loading ? <Spinner size="1.2em" /> : "Actualizar avatar"}
      </button>
    </div>
  );
};

export default EditAvatar;