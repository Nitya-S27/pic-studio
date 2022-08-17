import { Icon } from "@iconify/react";
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="footerIcons">
        <a
          href="https://www.instagram.com/nitya_.ns/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="uil:instagram-alt"
            color="#bc2a8d"
            width="30"
            height="30"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/-nitya-singh-/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="akar-icons:linkedin-box-fill"
            color="#0072b1"
            width="30"
            height="30"
          />
        </a>
        <a
          href="https://github.com/Nitya-S27/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="akar-icons:github-fill"
            color="#171515"
            width="30"
            height="30"
          />
        </a>
      </div>
      <div className="footerText">Made with ❤️ by Nitya Singh</div>
    </div>
  );
};

export default Footer;
