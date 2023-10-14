import { useState } from "react";
import { basicGalleryData } from "../data";

export default function BasicGallery() {
  const [index, setIndex] = useState(0);
  const img = basicGalleryData[index];

  let hasPrev = index > 0,
    hasNext = index < basicGalleryData.length - 1;

  function handleClick(btn) {
    btn === "prev" ? setIndex(index - 1) : setIndex(index + 1);
  }

  return (
    <>
      <button
        className="my-btn"
        onClick={() => handleClick("prev")}
        disabled = {!hasPrev}
      >
        ←
      </button>
      <button
        className="my-btn"
        onClick={() => handleClick("next")}
        disabled = {!hasNext}
      >
        →
      </button>
      <h3>{img.name}</h3>
      <img src={img.url} />
    </>
  );
}
