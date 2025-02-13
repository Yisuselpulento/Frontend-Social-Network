import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsernameFetching } from "../services/UserFetching";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await getUserByUsernameFetching(username);
      if (response.success) {
        setUser(response.user);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, [username]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative min-h-screen flex items-center justify-center -m-3">
      <div className="relative w-full h-screen md:w-[300px] md:h-[400px] ">
        <img
          src={user.avatar}
          alt={user.username}
            className="object-cover h-full w-full md:w-[300px] md:h-[400px] md:rounded"
        />
        
        <div className="absolute top-0 left-0 p-4 bg-opacity-50 rounded-t-md">
          <h1 className="text-white text-lg font-bold">{user.username}</h1>
          <p className="text-gray-300 text-xs">{user.nationality}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;