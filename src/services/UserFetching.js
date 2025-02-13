import axiosInstance from "../helpers/axiosConfig.js";

export const editUserFetching = async (userData) => { 
  try {
  const { data } = await axiosInstance.patch("/api/user/update-user", userData);
   return data
} catch (error) {
  console.error('Error during edit:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error al editar usuario";
  return { success: false, message: errorMessage };
} 
};
 

export const uploadAvatarFetching = async (userData) => { 
  try {
  const { data } = await axiosInstance.post("/api/user/upload", userData);
   return data
} catch (error) {
  console.error('Error during upload image:', error?.response.data.message);
  const errorMessage = error?.response?.data?.message || "Error al subir avatar";
  return { success: false, message: errorMessage };
} 
};

export const searchUserFetching = async (query) => { 
  try {
  const { data } = await axiosInstance(`/api/user/search-users?username=${query}`);
   return data
} catch (error) {
  console.error('Error during search:', error?.response.data.message);
  const errorMessage = error?.response?.data?.message || "Error al buscar user";
  return { success: false, message: errorMessage };
} 
};

export const getUserByUsernameFetching = async (username) => {
  try {
    const { data } = await axiosInstance.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    console.error("Error al obtener usuario:", error.response?.data?.message);
    return { success: false, message: "No se pudo obtener el usuario" };
  }
};