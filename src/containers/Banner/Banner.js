import "./Banner.css";

const Banner = function({ bannerImg, banner_img_alt, banner_title }) {
  return (
    <div>
      <table className="bannertable">
        <tr className="banner">
          <td className="bannerlogo">
            <img
              src={bannerImg}
              alt={banner_img_alt}
              className="bannerlogoimg"
             />
          </td>
          <td className="bannertitle">
            <h1> {banner_title} </h1>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Banner;
