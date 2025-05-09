import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Brand.css'

const brands = [
  { name: "Apple", image: "https://assets.sangeethamobiles.com/brands/6/1665494539.png" },
  { name: "Samsung", image: "https://assets.sangeethamobiles.com/brands/1/1665495463.png" },
  { name: "Tecno", image: "https://assets.sangeethamobiles.com/brands/10/1665495572.png" },
  { name: "Realme", image: "https://assets.sangeethamobiles.com/brands/5/1665495408.png" },
  { name: "Xiaomi", image: "https://assets.sangeethamobiles.com/brands/7/1665485917.png" },
  { name: "Nothing", image: "https://assets.sangeethamobiles.com/brands/5254/1732527877.png" },
  { name: "Google", image: "https://assets.sangeethamobiles.com/brands/741/1739788117.png" },
  { name: "OnePlus", image: "https://assets.sangeethamobiles.com/brands/9/1665495315.png" },
  { name: "Vivo", image: "https://assets.sangeethamobiles.com/brands/11/1665495586.png" },
  { name: "Oppo", image: "https://assets.sangeethamobiles.com/brands/2/1665495332.png" },
  { name: "Itel", image: "https://assets.sangeethamobiles.com/brands/3/1665494960.png" },
  { name: "Motorola", image: "https://motorolain.vtexassets.com/arquivos/motorola-logo.png" },
  { name: "Poco", image: "https://www.poco.in/images/poco-logo-new.png" },
  { name: "Nokia", image: "https://www.nokia.com/themes/custom/onenokia_reskin/logo.svg" },
  { name: "Iqoo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi6Pt8IKUIj1lnjOVMegYpWg4q65e-oRXKl03DgptOWNf1Q1nn4IDyI7xDFvELUZeo2hs&usqp=CAU" }
];

const Brand = () => {
  const navigate = useNavigate();

  const handleOnClick = (brand) =>{
    navigate(`/products/${brand}`);
  };

  return (
    <div className="container">
    <div className="brands">
      {brands.map((brand, index) => (
        <div key={index} className="brand" onClick={() => handleOnClick(brand.name)}>
          <img src={brand.image} alt="brand.name" />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Brand;
