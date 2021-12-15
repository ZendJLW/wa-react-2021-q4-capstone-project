import "./Banner.css";
import React from "react";

const Footer = function ({text}) {
  return (
    <div>
      <table className="bannertable">
        <tr className="banner">
          <td className="bannertitle">
            <h1> {text} </h1>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Footer;
