//import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

import { Avatar } from "@mui/material";

const LoggedInUser = () => {
  //const navigate = useNavigate();
  const userData = useSelector((state: AppState) => state.userReducer.user);
  return (
    <Avatar
      alt={userData ? userData.name : "user-name"}
      src={userData ? userData.avatar : ""}
      sx={{ width: 56, height: 56 }}
    />
  );
};

export default LoggedInUser;