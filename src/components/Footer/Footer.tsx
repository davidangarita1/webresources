import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerPage">
      &copy; {new Date().getFullYear()} Copyright:{" "}
      <a href="https://www.dangwebs.com" target="_blank">
        DangWebs.com
      </a>
    </div>
  );
};

export default Footer;
