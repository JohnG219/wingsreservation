import { Link } from "react-router-dom";
import "./searchItem.css"
import {faStar} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchItem = ({item}) => {
    
    return (
      <div className="searchItem">
        <img src={item.photos[0]} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>
          <span className="siSubtitle">JOHNRESERVATION</span>
          <span className="siTaxiOp">Provide safe airport taxi service</span>
          <span>add ${item.cheapestPrice} for taxi airport</span>
          {/* <span>{item.rating}</span>  */}
          <span className="siFeatures">{item.description}</span>
          <span className="siCancelOp">
            {" "}
            Top location: Highly rated by recent guests{" "}
            <FontAwesomeIcon id="starla" icon={faStar} />{" "}
          </span>
          <span className="siCancelOpSubtitle">
            Take your longest vacation yet Browse properties offering long-term
            stays, many at reduced monthly rates.
          </span>
        </div>
        <div className="siDetails">
          {item.rating && (
            <div className="siRating">
              <span>Excellent</span>
              <button>{item.rating}</button>
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice"></span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className="siCheckButton">See availability</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default SearchItem;