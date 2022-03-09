import React, { useEffect } from "react";
const ComingSoon = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
    document.title = "ECMPS Coming Soon";
  }, []);
  return (
    <div className="minh-tablet-lg react-transition fade-in">
      <div className="text-center">
        <h1>Coming Soon</h1>
      </div>
    </div>
  );
};

export default ComingSoon;
