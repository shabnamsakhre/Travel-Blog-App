import { useNavigate } from "react-router-dom";
import { VscCallOutgoing, VscHome, VscInfo } from "react-icons/vsc";
import Dock from "./react-bits/Dock";

const Navbar = () => {
  const navigate = useNavigate();

  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: <VscInfo size={18} />,
      label: "About",
      onClick: () => navigate("/about"),
    },
    {
      icon: <VscCallOutgoing size={18} />,
      label: "Contact",
      onClick: () => navigate("/contact"),
    },
  ];

  return (
    <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
  );
};

export default Navbar;
