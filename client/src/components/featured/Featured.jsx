import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "hotels/countByCity?cities=singapore,australia,philippines,norway,switzerland"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/85960609.jpg?k=12f4e89050495cb84f81e37ac261d77e9db6e6f8499ce955a6048cb9a35c9bf1&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1 id="fea">Singapore</h1>
              <h2 id="fea">{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/451957770.jpg?k=eb09294395c185cfac661bfcdc332f3f5b78b8cddce09670a0300c7908c70e5d&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1 id="fea">Australia</h1>
              <h2 id="fea">{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/338184179.jpg?k=3e562a0907dde1d84440ca39458cb7382e7e4f72b63a72b124e25b319188d90a&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1 id="fea">Philippines</h1>
              <h2 id="fea">{data[2]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/232813111.jpg?k=a467b2bea82963764139c221c06bc94b0a1a6780474fb65942f6c900d494ce05&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1 id="fea">Norway</h1>
              <h2 id="fea">{data[3]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/283432145.jpg?k=65759002a0e05519aca38c48ebdbeccbc983429f2e58b08c5a899f7333afe278&o=&hp=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1 id="fea">Switzerland</h1>
              <h2 id="fea">{data[4]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
