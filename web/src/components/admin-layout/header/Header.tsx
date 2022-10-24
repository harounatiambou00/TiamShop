import { Avatar, Badge } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  let authenticatedAdmin = useAppSelector(
    (state: RootState) => state.authenticatedAdmin.admin
  );
  return (
    <div className="w-full h-ten-percent bg-white flex items-center justify-between px-10">
      <img
        src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
        alt="logo"
        className="h-16"
      />
      <div className="w-96 rounded-3xl h-10 bg-gray-100 hover:bg-gray-200 flex items-center px-5">
        <BsSearch />
        <input
          type="search"
          placeholder="Recherche ..."
          className="w-full h-full bg-inherit pl-5 outline-none"
        />
      </div>
      <div className="flex items-center">
        <div className="w-56 h-10 bg-gray-100 rounded-full px-2 py-1 flex items-center cursor-pointer">
          <Badge variant="dot" overlap="circular" color="success">
            <Avatar className="w-8 h-8 bg-secondary" />
          </Badge>
          <div className="ml-2 font-light">
            {authenticatedAdmin ? authenticatedAdmin.FirstName : ""}
          </div>
        </div>
        <Badge></Badge>
      </div>
    </div>
  );
};

export default Header;
