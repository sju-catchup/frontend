// Loading.js
import React from "react";
import loading from "assets/loading.gif";
export const Spinner = () => {
  return (
    <div>
      <img src={loading} alt="로딩중" width="30%" />
    </div>
  );
};

export default Spinner;
