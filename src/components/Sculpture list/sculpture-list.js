import { useState } from "react";
import { sculptureList } from "./data";

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick(btn) {
    btn === "prev" ? setIndex(index - 1) : setIndex(index + 1);
  }

  const lastIndex = sculptureList.length - 1;
  const newIndex = Math.min(Math.max(index, 0), lastIndex);

  let sculpture = sculptureList[newIndex];

  return (
    <>
      <button onClick={() => handleClick("prev")}>Previous</button>
      <button onClick={() => handleClick("next")}>Next</button>
      <h2>
        <i>{sculpture.name}</i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({newIndex + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
