import React from "react";
import { Parallax } from "react-parallax";
const insideStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};
const parallaxHeader = {
  textAlign: "center",
  color: " black",
  textDecoration: "3px 3px 3px black",
  textShadow: "1px 1px 1px gray",
};
// eslint-disable-next-line react/prop-types
const ImgBanner = ({ img, pageTitle, pageDetails }) => {
  return (
    <header>
      <Parallax bgImage={img} strength={500} style={parallaxHeader}>
        <div style={{ height: 300 }}>
          <div style={insideStyles}>
            <h1>{pageTitle}</h1>
            <p>{pageDetails}</p>
          </div>
        </div>
      </Parallax>
    </header>
  );
};

export default ImgBanner;
