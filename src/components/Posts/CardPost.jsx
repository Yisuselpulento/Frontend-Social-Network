import LikeButtonPost from "./LikeButtonPost"

const CardPost = ({post}) => {

    const { text, likes, user } = post
  return (
    <div>
        <div className="flex flex-row gap-2">
            <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
                <div>
                    <p>{user.username}</p>
                    <p>{text}</p>
                </div>
                <div>
                <LikeButtonPost/>
                <p>{likes.length} Like</p>
            </div>
            </div>
      </div> 
    </div>
  )
}

export default CardPost