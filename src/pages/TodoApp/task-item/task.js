import { useState, useContext, useRef } from "react";
import { dispatchTasksContext } from "../tasksContext";

export default function Task({ task, source, onSelectTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const dispatch = useContext(dispatchTasksContext);
  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleUpdateDate(e) {
    const input = e.target;
    const newDate = new Date(e.target.value);

    function autoCloseDatePicker(e) {
      console.log("Outside click:", e.target);
      console.log("Input:", input);
      if (e.target !== input) {
        setIsEditingDate(!isEditingDate);
      }
    }

    dispatch({
      type: "changed",
      task: { ...task, dueDate: newDate },
    });
    document.addEventListener("click", autoCloseDatePicker, { once: "true" });
  }

  return (
    <div className="list-item">
      <TaskCheckboxField task={task} />
      <div className="title-and-date flex">
        <TaskTitleField
          task={task}
          isEditing={isEditing}
          onSelectTask={onSelectTask}
        />
        <TaskDueDate
          dueDate={task.dueDate}
          isEditingDate={isEditingDate}
          setIsEditingDate={setIsEditingDate}
          onInput={handleUpdateDate}
          source={source}
        />
      </div>
      <StatusField task={task} />
      <DateCreatedField date={task.dateCreated} />
      <EditSaveBtn isEditing={isEditing} onIsEditing={toggleEditing} />
      <DeleteTaskBtn task={task} />
    </div>
  );
}

function TaskCheckboxField({ task }) {
  const dispatch = useContext(dispatchTasksContext);
  const status = task.status === "Done" ? true : false;

  function handleCheckedTask(e) {
    const state = e.target.checked ? "Done" : "Not started";
    dispatch({
      type: "changed",
      task: { ...task, status: state },
    });
  }

  return (
    <input
      type="checkbox"
      checked={status}
      onChange={handleCheckedTask}
    ></input>
  );
}

function TaskDueDate({
  dueDate,
  isEditingDate,
  setIsEditingDate,
  onInput,
  source,
}) {
  const dateInputRef = useRef(null);
  let dateContent;

  if (isEditingDate) {
    const adjustedUTC = new Date(dueDate - dueDate.getTimezoneOffset() * 60000);
    const utcString = adjustedUTC.toISOString().slice(0, 16);

    dateContent = (
      <input
        ref={dateInputRef}
        type="datetime-local"
        name="due-date"
        value={utcString}
        onInput={onInput}
      />
    );
  } else {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options = {
      timeZone: userTimeZone,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const fullDate = dueDate
      .toLocaleString(undefined, options)
      .split(",")
      .join("");
    console.log({ fullDate });
    const allMinutes = dueDate.getMinutes();
    const minutes = allMinutes.length < 2 ? `0${allMinutes}` : allMinutes;
    const time = `${dueDate.getHours()}:${minutes}`;
    console.log(time);
    dateContent = (
      <button
        className="secondary"
        onClick={() => setIsEditingDate(!isEditingDate)}
      >
        {source === "original" ? fullDate : `Today ${time}`}
      </button>
    );
  }
  return <div className="due-date">{dateContent}</div>;
}

function TaskTitleField({ task, isEditing, onSelectTask }) {
  const dispatch = useContext(dispatchTasksContext);

  let toDoContent;
  if (isEditing) {
    toDoContent = (
      <>
        <input
          type="text"
          value={task.title}
          style={{ flexGrow: 3, height: "100%" }}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: { ...task, title: e.target.value },
            });
          }}
          autoFocus
        ></input>
      </>
    );
  } else {
    toDoContent = (
      <>
        <div className="task-title" onClick={onSelectTask}>
          {task.done ? <s>{task.title}</s> : task.title}
        </div>
        {/* <button className="expand-task">
            <span class="material-symbols-outlined">open_in_full</span>
          </button> */}
      </>
    );
  }
  return <div className="list-item-title">{toDoContent}</div>;
}

function StatusField({ task }) {
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const dispatch = useContext(dispatchTasksContext);
  const options = ["Not started", "In progress", "Done"];

  function formatStatus(string) {
    return string.toLowerCase().split(" ").join("-");
  }

  function handleChangeStatus(task, otherStatus) {
    dispatch({
      type: "changed",
      task: { ...task, status: otherStatus },
    });
    setShowStatusOptions(false);
  }

  // if (showStatusOptions) {
  //   statusVariant = (
  //     <div className="options flex-col">
  //       {options.map((item) => (
  //         <button key={item} onClick={(e) => handleChangeStatus(task, item)}>
  //           {item}
  //         </button>
  //       ))}
  //     </div>
  //   );
  // } else {
  //   statusVariant = (
  //     <button
  //       className={`current ${formatStatus(task.status)}`}
  //       onClick={() => setShowStatusOptions(true)}
  //     >
  //       {task.status}
  //     </button>
  //   );
  // }

  return (
    <>
      <div className="status flex-col">
        <button
          className={`current ${formatStatus(task.status)}`}
          onClick={() => setShowStatusOptions(true)}
        >
          {task.status}
        </button>
        {showStatusOptions && (
          <div
            className="options flex-col"
            onClick={() => setShowStatusOptions(false)}
          >
            {options.map((item) => (
              <button
                key={item}
                onClick={(e) => handleChangeStatus(task, item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        {/* {statusVariant} */}
        {/* <div className="current flex-col">
          <span
            className={formatStatus(task.status)}
            onClick={() => setShowStatusOptions(true)}
          >
            {task.status}
          </span>
        </div>
        {showStatusOptions && (
          <div
            className="options flex-col"
            onClick={() => setShowStatusOptions(false)}
          >
            {options.map((item) => (
              <button
                key={item}
                onClick={(e) => handleChangeStatus(task, item)}
              >
                {item}
              </button>
            ))}
          </div>
        )} */}
      </div>
    </>
  );
}

function DateCreatedField({ date }) {
  return <div className="date-created">{date}</div>;
}

function EditSaveBtn({ isEditing, onIsEditing }) {
  return (
    <button className="secondary" onClick={onIsEditing}>
      <span className="material-symbols-outlined">
        {isEditing ? "save" : "edit"}
      </span>
    </button>
  );
}

function DeleteTaskBtn({ task }) {
  const dispatch = useContext(dispatchTasksContext);
  return (
    <button
      className="secondary"
      onClick={() =>
        dispatch({
          type: "deleted",
          id: task.id,
        })
      }
    >
      <span className="material-symbols-outlined">delete</span>
    </button>
  );
}
