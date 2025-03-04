import { Link } from "react-router-dom";
import LikeButtonPost from "./LikeButtonPost";

const CardPost = ({ post }) => {
  const { text, likes, user, image } = post;

  return (
    <div className="rounded-lg shadow-sm ">
      <div className="flex items-center gap-2 mb-2">
        <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
        <Link to={`/user/${user.username}`}>{user.username}</Link>
      </div>

      <div className="mb-2">
        {text && <p>{text}</p>}
        {image && (
          <img
            src={image}
            alt="Post"
            className="w-full rounded-lg mt-2 md:w-96"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <LikeButtonPost />
        <p >{likes.length} Like{likes.length !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
};

export default CardPost;