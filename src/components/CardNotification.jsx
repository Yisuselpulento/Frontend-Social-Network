
const CardNotification = ({notification}) => {

    const { isRead, message, sender, type  } = notification
  return (
    <div className="flex items-center gap-2 ">
        <img className="rounded-full w-8 h-8" src={sender?.avatar}/>
        <div>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default CardNotification