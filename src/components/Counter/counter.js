import { useState } from "react";

export default function Counter() {
  const loadedData = JSON.parse(localStorage.getItem("count")) ?? 0;
  const [count, setCount] = useState(loadedData);

  return (
    <>
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
          localStorage.setItem("count", JSON.stringify(count + 1));
        }}
      >
        Increase by 1
      </button>
    </>
  );
}
