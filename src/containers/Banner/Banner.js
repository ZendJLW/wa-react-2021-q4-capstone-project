import "./Banner.css";
import React from "react";

const Banner = function ({bannerImg, bannerImgAlt, bannerTitle}) {
  return (
    <div>
      <table className="bannertable">
        <tr className="banner">
          <td className="bannerlogo">
            <img src={bannerImg} alt={bannerImgAlt} className="bannerlogoimg" />
          </td>
          <td className="bannertitle">
            <h1> {bannerTitle} </h1>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Banner;
