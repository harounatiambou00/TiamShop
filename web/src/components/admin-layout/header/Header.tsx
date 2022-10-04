import { Avatar, Badge } from "@mui/material";
const Header = () => {
  return (
    <div className="w-full h-ten-percent bg-white flex items-center justify-between px-10">
      <img
        src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
        alt="logo"
        className="h-16"
      />
      <div className="w-48 h-10 bg-gray-100 rounded-full px-2 py-1 flex items-center cursor-pointer">
        <Badge variant="dot" overlap="circular" color="success">
          <Avatar className="w-8 h-8 bg-secondary" />
        </Badge>
      </div>
    </div>
  );
};

export default Header;
