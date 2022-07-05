import React from "react";
import "./ProductGrid.css";
function ProductGrid(props) {
  let {
    gridTitle,
    itemTitle1,
    itemImg1,
    itemTitle2,
    itemImg2,
    itemTitle3,
    itemImg3,
    itemTitle4,
    itemImg4,
    gridLink,
    gridUlr,
  } = props;
  return (
    <div className="productGrid">
      <div className="productGrid__title">
        <h2>{gridTitle}</h2>
      </div>
      <div className="productGrid__top">
        <Item title={itemTitle1} img={itemImg1} />
        <Item title={itemTitle2} img={itemImg2} />
      </div>
      <div className="productGrid__bottom">
        <Item title={itemTitle3} img={itemImg3} />
        <Item title={itemTitle4} img={itemImg4} />
      </div>
      <div className="productGrid__link">
        <a href={gridUlr}>{gridLink}</a>
      </div>
    </div>
  );
}

export default ProductGrid;

function Item({ title, img }) {
  return (
    <>
      <div className="item">
        <img className="item__img" src={img} alt="" />
        <p className="item__title">{title}</p>
      </div>
    </>
  );
}
