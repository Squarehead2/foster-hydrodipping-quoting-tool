import * as React from "react";
import "./Home.css";
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../_utils/firebase';
function Home() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  return (
    <div className="App">
      <header className="App-header">
        <p className="default">
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
        </p>
      </header>
      <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    {/* Replace the image with your desired image */}
    <img src="YOUR_IMAGE_URL_1" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    {/* Replace the image with your desired image */}
    <img src="YOUR_IMAGE_URL_2" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    {/* Replace the image with your desired image */}
    <img src="YOUR_IMAGE_URL_3" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    {/* Replace the image with your desired image */}
    <img src="YOUR_IMAGE_URL_4" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
    </div>
  );
}

export default Home;
