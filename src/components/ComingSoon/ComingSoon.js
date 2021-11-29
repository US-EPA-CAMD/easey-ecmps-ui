import React, { useEffect } from "react";
const ComingSoon = () => {
  useEffect(() => {
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
