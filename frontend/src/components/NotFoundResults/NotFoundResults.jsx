import React from "react";
import NotFoundImage from "/icons/not-found_icon.svg";

const NotFoundResults = ({ hasError }) => {
  return (
    <section className="bg-[#f5f6f7] flex justify-center">
      <div className="w-[24.72%] max-w-[356px] mx-auto my-20 text-center sm:w-1/2 xs:w-[90%]">
        <img
          className="mx-auto"
          src={NotFoundImage}
          alt="A sad face"
        />
        <h3 className="font-['Roboto_Slab'] font-normal text-[26px] leading-[30px] mt-7 mb-4">
          Nothing found
        </h3>
        <p className="text-[#b6bcbf] font-roboto font-normal text-[18px] leading-[24px] m-0">
          {hasError
            ? "Sorry, but nothing matched your search terms."
            : "Sorry, something went wrong during the request, the server might be down or there is an issue with connection. Please, try again later."}
        </p>
      </div>
    </section>
  );
};

export default NotFoundResults;
