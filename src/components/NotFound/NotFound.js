import React,{useEffect} from "react";
import { Link } from "react-router-dom";
const NotFound = () => {

  useEffect(() => {
    document.title = "ECMPS Not Found";
    }, [])
  return (
    <div className="minh-tablet-lg react-transition fade-in">
      <div className="text-center">
        <h1>Sorry, but this web page does not exist.</h1>
        <h3>We want to help you find what you are looking for.</h3>
        <h3>
          Try locating this information from the
          <Link to="/"> EPA home page.</Link>
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
