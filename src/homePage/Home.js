import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Product from "./Product";
import ProductGrid from "./ProductGrid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Home() {
  const homeBGref = useRef(null);
  const [index, setIndex] = useState(0);
  let length;
  useEffect(() => {
    length = homeBGref.current.children.length;
  }, [index]);
  const next = () => {
    if (index == length - 1) return setIndex(0);
    setIndex(index + 1);
  };
  const prev = () => {
    if (index == 0) return setIndex(4);
    setIndex(index - 1);
  };

  return (
    <div>
      <div className="home__container">
        <div ref={homeBGref} className="home__BGimages">
          <img
            className={`home__image ${index && "hide"}`}
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt=""
          />
          <img
            className={`home__image ${index == 1 || "hide"}`}
            src="https://m.media-amazon.com/images/I/61LTGYLc20L._SX3000_.jpg"
            alt=""
          />
          <img
            className={`home__image ${index == 2 || "hide"}`}
            src="https://m.media-amazon.com/images/I/71cvXoaMZPL._SX3000_.jpg"
            alt=""
          />
          <img
            className={`home__image ${index == 3 || "hide"}`}
            src="https://m.media-amazon.com/images/I/61zMuPjqQBL._SX3000_.jpg"
            alt=""
          />
          <img
            className={`home__image ${index == 4 || "hide"}`}
            src="https://m.media-amazon.com/images/I/61-5K0tIvKL._SX3000_.jpg"
            alt=""
          />
        </div>
        <button onClick={prev} className="home__buttonLeft">
          <ArrowBackIosIcon className="ArrowBackIosIcon" />
        </button>
        <button onClick={next} className="home__buttonRight">
          <ArrowBackIosIcon className="ArrowBackIosIcon" />
        </button>
        <div className="home__row">
          <ProductGrid
            gridTitle="Pick up where you left off"
            itemTitle1="The office"
            itemImg1="https://m.media-amazon.com/images/I/51Bz4epFqyL._SY500__AC_SY200_.jpg"
            itemTitle2="meditations"
            itemImg2="https://m.media-amazon.com/images/I/81T-PQ9HFTL._AC_SY400_.jpg"
            itemTitle3="MG03MW"
            itemImg3="https://m.media-amazon.com/images/I/41myDLWs+jL._SY500__AC_SY400_.jpg"
            itemTitle4="SOUND SPEAKER"
            itemImg4="https://m.media-amazon.com/images/I/51+jCykWznL._SY500__AC_SY400_.jpg"
            gridLink="View your browsing history"
            gridUlr="#"
          />
          <ProductGrid
            gridTitle="Keep shopping for"
            itemTitle1="Silent"
            itemImg1="https://m.media-amazon.com/images/I/61Bdp7XZhDL._AC_SY200_.jpg"
            itemTitle2="Ear bud"
            itemImg2="https://m.media-amazon.com/images/I/41Odw3dmbnL._SY500__AC_SY200_.jpg"
            itemTitle3="Chill"
            itemImg3="https://images-na.ssl-images-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/Outlet/Merchandising/Outlet_GW_OD_379x304_Jun_2022._SY304_CB634753083_.jpg"
            itemTitle4="Grab and go"
            itemImg4="https://images-na.ssl-images-amazon.com/images/G/01/launchpad/gateway/2021/June/gw_mid_july_evergreen_06.25.21_186x116_camp1_deals._SY116_CB665116243_.jpg"
          />
          <ProductGrid
            gridTitle="Top Deal"
            itemTitle1="Prime delivery"
            itemImg1="https://images-na.ssl-images-amazon.com/images/G/01/em/pd22/xcm_em_prime_day_2022_243_usen_6299_8jow8nkkl6_us_en_desktop_single_card_379x304._SY304_CB635890936_.jpg"
            itemTitle2="To your door step"
            itemImg2="https://images-na.ssl-images-amazon.com/images/G/01/em/pd22/xcm_em_prime_day_2022_72_usen_1661_8a8ph0udus_us_en_quad_gw_card_186x116._SY116_CB635894052_.jpg"
            itemTitle3="anything"
            itemImg3="https://m.media-amazon.com/images/I/41Zlr6UeERL._SY500__AC_SY200_.jpg"
            itemTitle4="Fresh"
            itemImg4="https://m.media-amazon.com/images/I/419h3J-YHRL._SY500__AC_SY400_.jpg"
            gridLink="Shop early deals"
            gridUlr="#"
          />
        </div>
        <div className="home__row">
          <Product
            id="12321341"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={11.96}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
          />
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="4903850"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
