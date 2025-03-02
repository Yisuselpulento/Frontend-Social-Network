import { useEffect, useState } from "react";
import { getNotificationsFetching } from "../services/UserFetching";
import Spinner from "../components/Spinner/Spinner";
import CardNotification from "../components/CardNotification";

const NotificationsPage = () => {
  const [globalNotifications, setGlobalNotifications] = useState([])
    const [loading, setLoading] = useState(false);
  
      useEffect(() => {
        const getAllPosts = async () => {
          try {
            setLoading(true);
            const response = await getNotificationsFetching();
            console.log(response.notifications);
            setGlobalNotifications(response.notifications);
       
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setLoading(false);
          }
        };
  
        getAllPosts()
      }, [])
      
  return (
    <div  >
      <div className="flex justify-center items-center bg-gray-200 dark:bg-stone-950 -m-3 p-3">
        <h2 className="font-sans text-xl">Notificaciones</h2>

      </div>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
          <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-5">
            {globalNotifications?.map((notification) => (
              <CardNotification key={notification._id} notification={notification} />
            ))}
          </div>
        )}
      </div> 
  )
}

export default NotificationsPage