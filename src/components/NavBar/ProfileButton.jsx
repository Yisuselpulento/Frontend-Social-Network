import { Link } from "react-router-dom";

const ProfileButton = () => {
    
  return (
    <Link
      to="/profile"
      className="hover:text-primary cursor-pointer"
    >
      Profile
    </Link>
  );
};

export default ProfileButton;