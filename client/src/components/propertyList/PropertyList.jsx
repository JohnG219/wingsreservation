import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const {data,loading,error} = useFetch("/hotels/countByType");
  
  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/360159357.jpg?k=51639f3bf8e34b5bd61112b5383bf0a1972584c786727881d260c887c56fcef1&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/318237744.jpg?k=628061e0173ff36e0c9f5594716904263d400ad27746b5a6f2ff2d3417e220ef&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/465977242.jpg?k=56d04e33665738d3565de1a4a20b1f5c7ea92063e186718bbfa3ba712cd79010&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/228555060.jpg?k=40b05a70abf322fb32db86e6a003235b309b79364f952cb127a5d1b78587c9ff&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/178776445.jpg?k=cd95498b730b8cd273c09a4acfe8b8c877b2e418a2c5f6145cf4ea096fffa568&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/247249489.jpg?k=186c9f485f5395dbc50e1846024988163f67c7420834d5ac9ef3a78cc65676fb&o=&hp=1",
    "https://warnercnr.colostate.edu/wp-content/uploads/sites/2/2017/04/shutterstock_428626417-1024x683.jpg",
  ];

  return (
    <div className="pList">
      {loading ? (
        "Loading..."
        ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2> 
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;