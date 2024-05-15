import img1 from "../../../assets/img1.jpg";

const MainHeader = () => {
  return (
    <div className="w-full h-96 md:h-[400px] relative border-gray-100">
      <img
        src={img1}
        alt=""
        className="h-full w-full object-cover bg-no-repeat bg-bottom"
      />
      <div className="absolute top-8 left-4 sm:top-12 sm:left-8 bg-navBackground text-secondary p-4 sm:p-6 md:p-8 flex flex-col items-start justify-center shadow-lg h-auto w-11/12 sm:w-[440px] max-w-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Hello And, Welcome
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl">
          Discover a lot of knowledge
        </h3>
        <p className="text-sm sm:text-base md:text-lg">
          The goal is to learn without stress
        </p>
      </div>
    </div>
  );
};

export default MainHeader;
