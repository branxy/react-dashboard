import { useContext } from "react";
import { dispatchTasksContext } from "./tasksContext";

export default function SortFilterPanel() {
  const dispatch = useContext(dispatchTasksContext);

  return (
    <>
      <div className="sort-btns">
        <button onClick={() => dispatch({ type: "sorted-reverse" })}>
          Sort reverse
        </button>
        {/* <button onClick={() => dispatch({ type: "sort-by-date-ascending" })}>
          Sort by date ascending
        </button> */}
        <button onClick={() => dispatch({ type: "sort-by-status" })}>
          Sort by status
        </button>
      </div>
    </>
  );
}
