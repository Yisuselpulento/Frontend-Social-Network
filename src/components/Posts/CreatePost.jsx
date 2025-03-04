import { useState } from "react";
import { createPostFetching } from "../../services/PostsFetching";

const CreatePost = ({ setIsPostModalOpen }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!text.trim() && !image) return; 
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }

    const response = await createPostFetching(formData);

    if (response.success) {
      setText("");
      setImage(null);
      setPreview(null);
      setIsPostModalOpen(false); 
    } else {
      setErrorMessage(response.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-md flex flex-col gap-2 w-full">
      <textarea
        placeholder="¿Qué estás pensando?"
        className="w-full p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {preview && (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full rounded-lg" />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <label className="bg-gray-200 dark:bg-gray-800 p-2 rounded cursor-pointer text-center">
        📷 Subir imagen
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <button
        className={`p-2 rounded text-white flex justify-center ${
          text.trim() || image ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!text.trim() && !image || loading}
      >
        {loading ? "Publicando..." : "Publicar"}
      </button>

      <button onClick={() => setIsPostModalOpen(false)} className="text-red-500 text-xs">
        Cancelar
      </button>
    </div>
  );
};

export default CreatePost;