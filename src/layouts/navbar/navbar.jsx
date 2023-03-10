import { Link, useLocation } from "react-router-dom";
import auth from "../../services/authService";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ user }) => {
  let [open, setOpen] = useState(false);

  const location = useLocation();
  const nav = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!nav.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const checkLocation = (path) => {
    return location.pathname === path ? "md:text-blue-600" : "md:text-black";
  };

  const handleLogout = () => {
    auth.logout();
    window.location = "/";
  };
  let Links = user
    ? [
        { name: "Home", link: "/movies" },
        { name: "Customers", link: "/customers" },
        { name: "Rentals", link: "/rentals" },
        {
          name: "Sign out",
          link: "/movies",
          onClick: () => handleLogout(),
          styles: {
            backgroundColor: "black",
            opacity: 0.7,
            color: "white",
            padding: "8px 15px",
            borderRadius: "5px",
          },
        },
        {
          name: user.username.charAt(0).toUpperCase() + user.username.slice(1),
          link: "/movies",
          onClick: () => console.log(user, "SETTINGS PROFILE"),
          classes: "bg-black py-2 px-4  rounded-md",
          styles: { color: "white", opacity: 0.8 },
        },
      ]
    : [
        { name: "Home", link: "/movies" },
        { name: "Customers", link: "/customers" },
        { name: "Rentals", link: "/rentals" },
        { name: "Sign in", link: "/login" },
        { name: "Sign up", link: "/register" },
      ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          <Link to="/movies">Movie Rental</Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          ref={nav}
          className={` md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map(({ link, name, classes, styles, onClick }) => (
            <li
              onClick={() => setOpen(false)}
              key={name}
              className="md:ml-8 text-xl md:my-0 my-7"
            >
              <Link
                to={link}
                onClick={onClick}
                style={styles}
                className={` cursor-pointer text-gray-800 hover:text-gray-400 duration-500 ${checkLocation(
                  link
                )} ${classes}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
