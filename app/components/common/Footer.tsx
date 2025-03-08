import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Bottom Footer */}
        {/* <div className="footer-bottom">
        </div> */}
        <div className="footer-links">
          <Link href="/about" className="social-link">
            About
          </Link>
          {/* <a href="https://instagram.com" className="social-link">
            Instagram
          </a> */}
        </div>

        <div className="footer-credits">
          <p>© E-K Corporation</p>
          <p className="credits">Developed by Eastroad • E-K Corporation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
