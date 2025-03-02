import { useState } from "react";
import { toast } from "sonner";
import { AddFriendsFetching } from "../services/UserFetching";
import Spinner from "./Spinner/Spinner";

const ButtonFollower = ({isFollowing, user}) => {
    const [loading, setLoading] = useState(false);

    const handleFollow  = async () => {
        setLoading(true);
        try {
          const response = await AddFriendsFetching(user._id);
          if (response.success) {
            toast.success(<div className="text-green-600">{response.message}</div>);
          /*   setAuth({}); */
          } else {
            toast.error(<div className="text-red-800">{response.message}</div>);
          }
        } catch (error) {
          toast.error("Hubo un error. Por favor, intenta de nuevo.");
          console.error("Error:", error);
        } finally {
          setLoading(false); 
        }
      };

  return (
    <button 
    onClick={handleFollow}
    disabled={loading}
    className={`flex items-center gap-2  rounded-md md:w-[100px] justify-center px-2 py-1
      ${loading ? "bg-primary opacity-80" : " hover:bg-indigo-700 cursor-pointer bg-primary hover:text-white"}`}
  >
         {loading ? 
      <Spinner size="1.2em" />
    : (
    <>
      {isFollowing ? "Dejar de seguir" : "Seguir"}
    </>
  )}
    </button>
  )
}

export default ButtonFollower