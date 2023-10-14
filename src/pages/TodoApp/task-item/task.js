import { useState, useContext } from "react";
import { dispatchTasksContext } from "../tasksContext";

export default function Task({ task, source, onSelectTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const dispatch = useContext(dispatchTasksContext);
  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function updateDate(e) {
    const newDate = new Date(e.target.value);
    dispatch({
      type: "changed",
      task: { ...task, dueDate: newDate },
    });
    setIsEditingDate(!isEditingDate);
  }

  return (
    <div className="list-item">
      <TaskCheckboxField task={task} />
      <TaskDueDate
        dueDate={task.dueDate}
        isEditingDate={isEditingDate}
        setIsEditingDate={setIsEditingDate}
        onInput={updateDate}
        source={source}
      />
      <TaskTitleField
        task={task}
        isEditing={isEditing}
        onSelectTask={onSelectTask}
      />
      <StatusField status={task.done} />
      <DateCreatedField date={task.dateCreated} />
      <EditSaveBtn isEditing={isEditing} onIsEditing={toggleEditing} />
      <DeleteTaskBtn task={task} />
    </div>
  );
}

function TaskDueDate({
  dueDate,
  isEditingDate,
  setIsEditingDate,
  onInput,
  source,
}) {
  let dateContent;

  if (isEditingDate) {
    const adjustedUTC = new Date(dueDate - dueDate.getTimezoneOffset() * 60000);
    const utcString = adjustedUTC.toISOString().slice(0, 16);

    dateContent = (
      <input
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
    const time = `${dueDate.getHours()}:${dueDate.getMinutes()}`;
    dateContent = (
      <button onClick={() => setIsEditingDate(!isEditingDate)}>
        {source === "original" ? fullDate : `Today ${time}`}
      </button>
    );
  }
  return <div className="due-date">{dateContent}</div>;
}

function TaskCheckboxField({ task }) {
  const dispatch = useContext(dispatchTasksContext);

  return (
    <input
      type="checkbox"
      checked={task.done}
      onChange={(e) =>
        dispatch({
          type: "done-task",
          task: { ...task, done: e.target.checked },
        })
      }
    ></input>
  );
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
        <div className="list-item-title" onClick={onSelectTask}>
          <div className="task-title">
            {task.done ? <s>{task.title}</s> : task.title}
          </div>
          {/* <button className="expand-task">
            <span class="material-symbols-outlined">open_in_full</span>
          </button> */}
        </div>
      </>
    );
  }
  return <div className="list-item-title">{toDoContent}</div>;
}

function StatusField({ status }) {
  return (
    <div className="status flex-col">
      {status ? (
        <span className="done">Done</span>
      ) : (
        <span className="not-started">Not started</span>
      )}
    </div>
  );
}

function DateCreatedField({ date }) {
  return <div className="date-created">{date}</div>;
}

function EditSaveBtn({ isEditing, onIsEditing }) {
  return (
    <button onClick={onIsEditing}>
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
