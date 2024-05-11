import logo_black from "../../assets/sii_white.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="fixed left-0 top-0 z-[1001] w-full bg-navBackground border-b border-border shadow-sm">
      <nav className="flex flex-row items-center justify-around px-32 w-full py-2">
        <div className="flex items-center justify-between w-full lg:w-auto md:w-auto lg:justify-start gap-x-8 md:space-x-0 md:justify-center">
          <div className="text-2xl md:text-4xl font-bold text-primary">
            <Link to="/">
              <img
                src={logo_black}
                alt=""
                className="h-auto w-24 sm:h-auto sm:w-24 md:h-auto md:w-24 lg:h-auto lg:w-32 object-cover"
              />
            </Link>
          </div>
        </div>
        <div className="text-white flex flex-row space-x-10 justify-between items-center  font-header capitalize">
          <p className="text-secondary">Profile</p>
          <p>Web Builder</p>
          <p>Advertising</p>
          <p>Courses</p>
          <p>Services</p>
          <p>employment</p>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
