import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Mon Site
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/courses">
              courses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/courses/:id">
              {" "}
              Course Details{" "}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
