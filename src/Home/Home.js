import React from "react";
import "./Home.css";
import carousel1 from "./carousel/carousel1.jpg";
import carousel2 from "./carousel/carousel2.jpg";
import carousel3 from "./carousel/carousel3.jpg";
import carousel4 from "./carousel/carousel4.jpg";


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="rounded-box">
          <h6>Welcome to Foster Hydrodipping</h6>
          Transforming your gear from mundane to magnificent has never been
          easier with Foster Hydro Dipping! Dive into a world of endless
          possibilities as we specialize in hydrographic printing, giving your
          items a custom, vibrant makeover. Whether it's your gaming console,
          motorcycle helmet, or even your favorite guitar, our precise and
          durable hydro dipping process ensures a flawless finish every time.
          Stand out from the crowd and express your unique style with our wide
          range of patterns and designs. With Foster Hydro Dipping, unleash your
          creativity and let us turn your ordinary possessions into
          extraordinary works of art. Experience the magic of hydro dipping
          today and elevate your belongings to new levels of visual appeal!
        </div>
      </header>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src={carousel1} className="w-full" alt="Slide 1" />
        </div> 
        <div id="item2" className="carousel-item w-full">
          <img src={carousel2} className="w-full" alt="Slide 2" />
        </div> 
        <div id="item3" className="carousel-item w-full">
          <img src={carousel3} className="w-full" alt="Slide 3" />
        </div> 
        <div id="item4" className="carousel-item w-full">
          <img src={carousel4} className="w-full" alt="Slide 4" />
        </div>
      </div> 
    </div>
  );
}

export default Home;
