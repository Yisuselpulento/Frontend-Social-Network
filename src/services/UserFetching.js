import axiosInstance from "../helpers/axiosConfig.js";

export const editUserFetching = async (userData) => { 
  try {
  const { data } = await axiosInstance.patch("/api/user/update-user", userData);
   return data
} catch (error) {
  console.error('Error during signUp:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error al editar usuario";
  return { success: false, message: errorMessage };
} 
};
 

export const uploadAvatarFetching = async (userData) => { 
  try {
  const { data } = await axiosInstance.post("/api/user/upload", userData);
   return data
} catch (error) {
  console.error('Error during login:', error?.response.data.message);
  const errorMessage = error?.response?.data?.message || "Error al subir avatar";
  return { success: false, message: errorMessage };
} 
};