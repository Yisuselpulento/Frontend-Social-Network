import { useState } from "react";
import CloseIcon from "../icons/template/CloseIcon";

function Lightbox({ photo, alt, style }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleLightbox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <img
          src={photo}
          alt={alt}
          onClick={toggleLightbox}
          onLoad={() => setImageLoaded(true)} 
          className={`${style} ${!imageLoaded ? "opacity-0" : "opacity-100 cursor-pointer"}`} 
        />
      </div>

      {isOpen && (
        <div
          onClick={toggleLightbox}
          className="fixed inset-0 z-90 flex justify-center items-center dark:bg-black/75 bg-gray-200/75"
        >
          <button
            onClick={toggleLightbox}
            className="hover:bg-neutral-900 absolute top-0 right-0 m-1 md:m-5 p-1 text-white bg-neutral-800/20 rounded-full cursor-pointer"
          >
            <CloseIcon className="md:w-7 md:h-7 w-5 h-5" />
          </button>
          <img src={photo} alt={alt} className="object-contain w-full h-full" />
        </div>
      )}
    </>
  );
}

export default Lightbox;
