import React, {useState} from "react";
import Banner from "./Banner";

const BannerSlider = function ({banners}) {
  const [current, setCurrent] = useState(0);
  // const {isLoading} = banners;

  // if (isLoading) {
  //  return <h1>Loading...</h1>;
  // }
  // eslint-disable-next-line no-param-reassign
  banners = banners.results;

  // eslint-disable-next-line prefer-destructuring
  const {length} = banners;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(banners) || length <= 0) {
    return null;
  }
  setTimeout(() => {
    nextSlide();
  }, 5000);
  const banner = banners[current];
  return (
    <section className="slider">
      <table width="100%">
        <tbody>
          <tr width="100%">
            <td width="80%">
              <Banner
                bannerTitle={banner.data.title}
                bannerImg={banner.data.main_image.url}
                bannerImgAlt={banner.data.main_image.alt}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default BannerSlider;
