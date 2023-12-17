import "./footer.css";
import {FaGoogle, FaVideo, FaAddressBook} from 'react-icons/fa';


const Footer = () => {
  return (
    <div className="footer1">
      <div className="footericons">
        <a href="https://photos.google.com/share/AF1QipP4lHlmNVa1wrKnWYMWNz9PzM9mCWD1llg9H5CJcUDJ-3O97ab9TVOTe0r4VZjnQA?key=blNqYTFjajlDRTlORV93QlNFazRaTjQ3NElyWER3">
          <FaGoogle className="footerIcon" />
        </a>
        <a href="https://photos.google.com/share/AF1QipP4lHlmNVa1wrKnWYMWNz9PzM9mCWD1llg9H5CJcUDJ-3O97ab9TVOTe0r4VZjnQA/photo/AF1QipPo42VAyEO8ISAh0Yq3dWloPwFHI6gCOk5dPuIR?key=blNqYTFjajlDRTlORV93QlNFazRaTjQ3NElyWER3">
          <FaVideo className="footerIcon" />
        </a>
        <a href="/">
          <FaAddressBook className="footerIcon" />
        </a>
      </div>
      <div className="fText">JOHNE Project@2023</div>
    </div>
  );
};

export default Footer;