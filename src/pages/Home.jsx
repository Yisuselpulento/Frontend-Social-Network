import { useEffect, useState } from "react"
import HeartUnlike from "../icons/HeartUnlike"
import { Link } from "react-router-dom"
import { getAllPostFetching } from "../services/PostsFetching"
import Spinner from "../components/Spinner/Spinner"
import CardPost from "../components/Posts/CardPost"

const Home = () => {
  const [globalPosts, setGlobalPosts] = useState([])
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      const getAllPosts = async () => {
        try {
          setLoading(true);
          const response = await getAllPostFetching();
          setGlobalPosts(response.posts);
     
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };

      getAllPosts()
    }, [])
    

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-200 dark:bg-stone-950 p-2">
        <h2 className="font-sans text-xl">MonssterNetwork</h2>
        <Link 
        to="/notifications"
        className="cursor-pointer hover:bg-stone-800 rounded-full p-1"> <HeartUnlike /></Link>

      </div>
     <div className="pt-5 px-2" >
        {loading ? (
          <div className="flex items-center justify-center h-screen">
          <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {globalPosts?.map((post) => (
              <CardPost key={post._id} post={post} />
            ))}
          </div>
        )}
      </div> 
    </div>
  )
}

export default Home