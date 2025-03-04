import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsernameFetching } from "../services/UserFetching";
import ButtonFollower from "../components/ButtonFollower";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { auth} = useAuth();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log(auth.user)
    const fetchUser = async () => {
      setLoading(true);
      const response = await getUserByUsernameFetching(username);
      if (response.success) {
        setUser(response.user);
        setIsFollowing(response.user.followers.includes(auth.user._id));
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, [username, auth?.user._id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative min-h-screen flex items-center justify-center -mx-1">
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
        <div className="absolute top-0 right-0 p-4 bg-opacity-50 rounded-t-md">
        <div className="absolute top-0 right-0 p-4 bg-opacity-50 rounded-t-md">
          {!isFollowing && <ButtonFollower isFollowing={isFollowing} user={user} />}
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;