import React from "react";
import "./Home.css";
import carousel1 from "./carousel/carousel1.jpg";
import carousel2 from "./carousel/carousel2.jpg";
import carousel3 from "./carousel/carousel3.jpg";
import carousel4 from "./carousel/carousel4.jpg";

function Home() {
  return (
    <div className="App">
      <div className="flex flex-row">
        <div className="card w-full h-screen shadow-xl">
          <div className="card-body w-screen overflow-hidden">
            <div className="flex items-center justify-center mb-10">
              <h2 className="text-[36px] text-black  text-center">
                Welcome To Foster Hydrodipping
              </h2>
            </div>
            <div className="flex flex-row w-screen space-x-24">
              <div className="w-2/3">
                <p className="text-black text-left text-lg ">
                  Transforming your gear from mundane to magnificent has never
                  been easier with Foster Hydro Dipping! Dive into a world of
                  endless possibilities as we specialize in hydrographic
                  printing, giving your items a custom, vibrant makeover.
                  Whether it's your gaming console, motorcycle helmet, or even
                  your favorite guitar, our precise and durable hydro dipping
                  process ensures a flawless finish every time. Stand out from
                  the crowd and express your unique style with our wide range of
                  patterns and designs. With Foster Hydro Dipping, unleash your
                  creativity and let us turn your ordinary possessions into
                  extraordinary works of art. Experience the magic of hydro
                  dipping today and elevate your belongings to new levels of
                  visual appeal!
                </p>
              </div>
              <div className="carousel border-l-4 bg-white w-1/3 pr-96">
                <div className="carousel-item w-[48rem] h-96">
                  <img src={carousel1} className="w-full" alt="Slide 1" />
                </div>
                <div className="carousel-item bg-white w-[48rem] h-96">
                  <img src={carousel2} className="w-full" alt="Slide 2" />
                </div>
                <div className="carousel-item bg-white w-[48rem] h-96">
                  <img src={carousel3} className="w-full" alt="Slide 3" />
                </div>
                <div className="carousel-item bg-white w-[48rem] h-96">
                  <img src={carousel4} className="w-full" alt="Slide 4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
