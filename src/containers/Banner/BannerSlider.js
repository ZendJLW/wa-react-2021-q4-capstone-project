import React, {useState} from "react";
import Banner from "./Banner";

const BannerSlider = function ({banners}) {
  const [current, setCurrent] = useState(0);
  const {isLoading} = banners;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  // eslint-disable-next-line no-param-reassign
  banners = banners.data;

  const {length} = banners.results;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(banners.results) || banners.results.length <= 0) {
    return null;
  }
  setTimeout(() => {
    nextSlide();
  }, 5000);
  const banner = banners.results[current];
  return (
    <section className="slider">
      <table width="100%">
        <tr width="100%">
          <td width="80%">
            <Banner
              bannerTitle={banner.data.title}
              bannerImg={banner.data.main_image.url}
              imgAlt={banner.data.main_image.alt}
            />
          </td>
        </tr>
      </table>
    </section>
  );
};

export default BannerSlider;
