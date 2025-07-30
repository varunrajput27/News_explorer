import React from "react";
import CirclePreLoader from "../../images/preloader.png";

const Preloader = () => {
  return (
    <section className="bg-[#f5f6f7] flex justify-center">
      <div className="w-[19.44%] max-w-[280px] flex flex-col items-center my-20 sm:w-1/2 sm:max-w-[384px] max-sm:w-[90%] max-sm:max-w-[405px]">
        <img
          className="animate-spin-slow"
          src={CirclePreLoader}
          alt="Circle Preloader"
        />
        <p className="text-[#b6bcbf] font-roboto text-[18px] leading-6 text-center mt-6">
          Searching for news...
        </p>
      </div>
    </section>
  );
};

export default Preloader;
