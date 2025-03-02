import axiosInstance from "../helpers/axiosConfig.js";

export const createPostFetching = async (post) => { 
  try {
  const { data } = await axiosInstance.patch("/api/posts/create", post);
   return data
} catch (error) {
  console.error('Error during edit:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error al editar usuario";
  return { success: false, message: errorMessage };
} 
};
 

export const deletePostFetching = async (id) => { 
  try {
  const { data } = await axiosInstance.post(`/api/posts/delete/${id}`);
   return data
} catch (error) {
  console.error('Error during upload image:', error?.response.data.message);
  const errorMessage = error?.response?.data?.message || "Error al subir avatar";
  return { success: false, message: errorMessage };
} 
};

export const getAllPostFetching = async () => { 
  try {
  const { data } = await axiosInstance(`/api/posts/getall`);
   return data
} catch (error) {
  console.error('Error during search:', error?.response.data.message);
  const errorMessage = error?.response?.data?.message || "Error al buscar user";
  return { success: false, message: errorMessage };
} 
};

export const likePostFetching = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/api/posts/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener usuario:", error.response?.data?.message);
    return { success: false, message: "No se pudo obtener el usuario" };
  }
};

export const getUserPostFetching = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/api/posts/user/${id}`);
      return data;
    } catch (error) {
      console.error("Error al obtener usuario:", error.response?.data?.message);
      return { success: false, message: "No se pudo obtener el usuario" };
    }
  };