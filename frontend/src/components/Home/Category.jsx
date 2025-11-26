/* eslint-disable react/prop-types */
import { categoryApi } from "./categoryApi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Category = ({ styleGrid }) => {
  const category = localStorage.getItem("category");
  const navigate = useNavigate();

  const handleSelectedCat = (cat) => {
    localStorage.setItem("category", cat?.name);
    navigate(`/?category=${cat.name}`);
  };

  // Custom arrows for react-multi-carousel
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="p-1 rounded-full border-neutral-400 border bg-white flex items-center max-h-[32px] hover:shadow-lg mb-6"
    >
      <MdKeyboardArrowLeft size={18} />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="p-1 rounded-full border-neutral-400 border bg-white flex items-center max-h-[32px] hover:shadow-lg mb-6"
    >
      <MdKeyboardArrowRight size={18} />
    </button>
  );

  // Responsive settings
  const responsive = {
    mobile: { breakpoint: { max: 500, min: 0 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 500 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 768 }, items: 8 },
  };

  return (
    <div className={`flex flex-row gap-2 ${styleGrid}`}>
      <Carousel
        responsive={responsive}
        arrows
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        draggable
        swipeable
        infinite={false}
        keyBoardControl
      >
        {categoryApi.map((cat, i) => (
          <div key={i} className="relative">
            <div
              onClick={() => handleSelectedCat(cat)}
              className={`flex flex-col-reverse items-center gap-1 cursor-pointer pb-4 transition duration-200 ease-in ${
                category === cat.name
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <p className="text-xs font-medium">{cat?.name}</p>
              <cat.svg size={28} />
            </div>
            <div
              className={`w-9 absolute bg-[#222222] h-[2px] bottom-0 ${
                category === cat.name ? "block" : "hidden"
              }`}
            ></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Category;
