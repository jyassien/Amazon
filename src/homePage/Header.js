import React, { useEffect, useState } from "react";
import "./Header.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import flagUS from "../images/usflag.png";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  const [page, refreshPage] = useState();

  let user = auth.currentUser;
  const handleAuthentication = () => {
    auth.signOut();
    // console.log("sign out clicked, ", auth);
    // refreshPage({});
    // navigate("/");
    window.location.reload(false);
  };

  return (
    <>
      <div className="header">
        <div className="header__nav-left">
          <Link to="/">
            <img
              className="header__logo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </Link>
          <div className="header__selectLocation">
            <span className="header__locationIcon ">
              <LocationOnOutlinedIcon className=" LocationOnOutlinedIcon" />
            </span>
            <div className="header__option">
              <span className="header__optionLineOne">
                {user ? `Deliver to ${user?.email}` : "Hello"}
              </span>
              <span className="header__optionLineTwo">
                {user ? `Deliver to Denver 80004` : "Select your address"}
              </span>
            </div>
          </div>
        </div>
        <div className="header__search">
          <div className="header__searchOption">
            <select id="department">
              <option value="All">All </option>
              <option value="All Department">All Department</option>
              <option value="Alexa Skills">Alexa Skills</option>
              <option value="Amazon Devices">Amazon Devices</option>
              <option value="...">...</option>
            </select>
          </div>
          <div className=" ArrowDropDownIcon-wrapper">
            <ArrowDropDownIcon className="search_ArrowDropDownIcon" />
          </div>
          <input className="header__searchInput" />
          <SearchIcon className="header__searchIcon" />
        </div>
        <div className="header__nav-right">
          <div className="header__flag">
            <img src={flagUS} alt="" />

            <ArrowDropDownIcon className="ArrowDropDownIcon" />
            <ul className="header__language hide"></ul>
          </div>
          <div className="header__option  header__option_popup">
            <span className="header__optionLineOne ">
              Hello, {!user ? "Sign in" : user.email}{" "}
            </span>

            <span
              style={{
                marginTop: "-8px",
              }}
              className="header__optionLineTwo"
            >
              Account & Lists
              <ArrowDropDownIcon className="ArrowDropDownIcon" />
            </span>
            <div className="header__userAccount ">
              <div className="header__userSignedOut">
                {!user && (
                  <>
                    <Link to="/login">
                      <button>Sign in</button>
                    </Link>
                    <p>
                      New customer? &nbsp;
                      <span>
                        <Link className="link" to="/login">
                          Start here.
                        </Link>
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div className="header__accountList ">
                <div>
                  <ul className="header__accountList1">
                    <h3>Your Lists</h3>
                    <li>Create a List</li>
                    <li>Find a List or Resgister</li>
                    <li>AmazonSmile Charity Lists</li>
                  </ul>
                </div>
                <div>
                  <ul className="header__accountList2">
                    <h3> Your Account</h3>
                    <li>Account</li>
                    <li>Orders</li>
                    <li>Recommendations</li>
                    <li>Browsing history</li>
                    <li>Wachlist</li>
                    <li>Custommer Service</li>
                    <li>Switch Account</li>
                    <li
                      onClick={handleAuthentication}
                      className="header__accountList2_signout"
                    >
                      Sign out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>

          <div
            onClick={() => {
              navigate("/checkout");
            }}
            className="header__option"
          >
            <span className="header__itemsNumber">{basket.length}</span>
            <AddShoppingCartTwoToneIcon className="AddShoppingCartTwoToneIcon" />
          </div>

          {/* <span>Cart</span> */}
          {/* <span className="header__optionLineTwo">Prime</span> */}
        </div>
      </div>
      <div className="headerBottom">
        <ul className="headerBottom__nav">
          <li>All</li>
          <li>Buy Again</li>
          <li>Computers</li>
          <li>Computer Service</li>
          <li>Coupons</li>
          <li>Health & Household</li>
          <li>Pharmacy</li>
          <li>Shopper Toolkit</li>
          <li>Pet Supplies</li>
          <li>Find a Gift</li>
          <li>Home improvement</li>

          <li>&emsp;&emsp;&emsp;&emsp;&emsp;</li>
        </ul>
      </div>
    </>
  );
}

export default Header;
