import React from "react";
import { useState, useEffect } from "react";
import "../CSS/styles.css";
import CardSlide from "./CardSlide";
import LogosHome from "./LogosHome";
import SingleItem from "./SingleItem";
import { email_id } from "../../LoginAndRegistration/Login";
export default function AllProducts(props) {


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const galleryImages = [
    {
      img: "https://thumbs.dreamstime.com/b/suzuki-logo-editorial-illustrative-white-background-eps-download-vector-jpeg-suzuki-logo-editorial-illustrative-white-208332947.jpg"
    },

    {
      img: "https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg"
    },

    {
      img: "https://www.carlogos.org/car-logos/toyota-logo-2005-download.png"
    },

    {
      img: "https://logohistory.net/wp-content/uploads/2023/01/MG-Logo.jpg"
    },

    {
      img: "https://logos-world.net/wp-content/uploads/2021/09/Jeep-Logo.png"
    },

    {
      img: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c487.png"
    },

    {
      img: "https://pngimg.com/d/citroen_PNG29.png"
    },

    {
      img: "https://1000logos.net/wp-content/uploads/2020/03/Volvo-Logo-1999.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Land_Rover_logo_black.svg/2560px-Land_Rover_logo_black.svg.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2560px-Honda.svg.png"
    },

    {
      img: "https://listcarbrands.com/wp-content/uploads/2022/12/KTM-Logo.png"
    },

    {
      img: "https://1000logos.net/wp-content/uploads/2020/06/Hero-Logo1.jpg"
    },

    {
      img: "https://listcarbrands.com/wp-content/uploads/2017/11/Bajaj-Logo.png"
    },

    {
      img: "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/news/th_black_river_mark.jpg"
    },

    {
      img: "https://thumbs.dreamstime.com/b/harley-davidson-logo-vector-design-eps-file-available-if-you-want-to-print-190093876.jpg"
    },

    {
      img: "https://mayastickers.com/image/cache/catalog/mainimage/bbb/bmw_logo_decal_stickers-550x550.jpg"
    },

    {
      img: "https://logowik.com/content/uploads/images/jawa.jpg"
    },

    {
      img: "https://c.ndtvimg.com/2022-01/65c8jqng_bike_625x300_14_January_22.jpg"
    },

    {
      img: "https://ih1.redbubble.net/image.4768528822.6719/st,small,507x507-pad,600x600,f8f8f8.jpg"
    },

    {
      img: "https://logos-world.net/wp-content/uploads/2022/01/iPhone-Symbol.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Lenovo_Global_Corporate_Logo.png/2560px-Lenovo_Global_Corporate_Logo.png"
    },

    {
      img: "https://i.gadgets360cdn.com/large/Oneplus_newlogo_main_1584369675960.jpg"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/OPPO_Logo_wiki.png/640px-OPPO_Logo_wiki.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Vivo_logo_2019.svg/1200px-Vivo_logo_2019.svg.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Poco_Smartphone_Company_logo.svg/2560px-Poco_Smartphone_Company_logo.svg.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Realme-realme-_logo_box-RGB-01.svg/2560px-Realme-realme-_logo_box-RGB-01.svg.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Motorola_M_symbol_blue.svg/2048px-Motorola_M_symbol_blue.svg.png"
    },

    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/768px-Xiaomi_logo.svg.png"
    },

    {
      img: "https://www.gizchina.com/wp-content/uploads/images/2023/02/Nokia-logo.webp"
    }
  ]

// const getEmail=JSON.parse(localStorage.getItem("current"));

const [email,setEmail]=useState(email_id)


  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/product";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    

    const filtered = data.filter((book) =>book.name.toLowerCase().includes(props.search.toLowerCase()));
    setFilteredData(filtered);
}, [props.search,data]);



// const addTocart=(item)=>{
//    axios.post(`http://127.0.0.1:5000/add-to-cart`,{
     
//      'name':item.name,
//      'email':email,
//      'image':item.image,
//      'price':item.price
//    })
//    .then((resp)=>{
//      message.success("item is added to cart")
//     console.log('after sending in cart ',resp.data)
//    })
//    .catch((error)=>console.log('error in sending in cart ',error))
 

     
// }

  return (
    <>
    <CardSlide/>
    
    <LogosHome galleryImages = {galleryImages}/>

      <div className="container" >
        <h2 style={{marginBottom:"50px"}}>All Products</h2>
        <div className="row">
          {filteredData.map((item) => (
             <SingleItem item={item}/>
            
          ))}
        </div>
      </div>
    </>
  );
}
