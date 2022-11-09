import React from "react";
import { useParams } from "react-router-dom";

const Detection = () => {
  const idParams = useParams();
  console.log({ idParams });
  return <div>객체추적 페이지입니다.</div>;
};

export default Detection;
