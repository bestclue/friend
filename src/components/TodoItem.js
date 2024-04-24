/*
  각각의 할 일 항목을 렌더링하는 컴포넌트입니다.
  각 할 일의 완료 상태에 따라 체크박스와 텍스트 스타일을 동기화하며,
  삭제 버튼을 통해 해당 할 일을 삭제할 수 있습니다.
  이 컴포넌트는 `TodoList.js`에서 사용되어 할 일 목록을 구성합니다.
*/
import React, {useState} from "react";

import { Button } from "@/components/ui/button"

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  // 수정 모드인지 여부를 관리하는 상태를 정의합니다.
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  // 랜덤한 배경색을 반환하는 함수
  function getRandomColor() {
    const colors = ["#d4f3e7", "#f7d794", "#f3a683", "#fad390", "#dff9fb"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  // Todo 아이템의 배경색을 변경하는 함수
  const changeBackgroundColor = () => {
    setBackgroundColor(getRandomColor());
  };

  const [isEditing, setIsEditing] = useState(false);
  // 수정할 내용을 저장하는 상태를 정의합니다.
  const [editText, setEditText] = useState(todo.text);
  const [editDate, setEditDate] = useState(todo.date);
  const [editCategory, setEditCategory] = useState(todo.category);
  // 수정 모드를 활성화하는 함수를 정의합니다.
  const activateEditMode = () => {
    setIsEditing(true);
  };

  // 수정 모드를 비활성화하고 변경된 내용을 저장하는 함수를 정의합니다.
  const handleSave = () => {
    onEdit(editText, editDate, editCategory);
    setIsEditing(false);
  };

  const today = new Date().toISOString().slice(0, 10);

  // 할 일 항목을 렌더링합니다.
  return (
    <li className="justify-center items-center flex my-2 p-3 rounded" style={{ backgroundColor }}>
      {/* 체크박스를 렌더링하고, 체크박스의 상태를 할 일의 완료 상태와 동기화합니다. */}
      <input
        className="h-5 w-5 border-gray-300 rounded focus:ring-0 mr-4"
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      
      {/* 할 일의 텍스트를 렌더링합니다. */}
      {isEditing ? (
        <>
        <input
          className="w-1/3 p-1 mr-3 flex-grow border-2 border-gray-300 rounded-md"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <input
          className="w-1/4 p-1 mr-3 flex-grow border-2 border-gray-300 rounded-md"
          type="text"
          value={editCategory}
          onChange={(t) => setEditCategory(t.target.value)}
        />
        <input
          className="w-1/3 p-1 mr-3 flex-grow border-2 border-gray-300 rounded-md"
          type="date"
          value={editDate}
          onChange={(d) => setEditDate(d.target.value)}
          min={today}
        />
        <Button className="btn mr-2" onClick={handleSave}>Edit</Button>
        </>
      ) : (
        <>
          <span
            className="w-[40%] ml-1 text-lg flex-grow"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={activateEditMode}
          >
            {todo.text}
          </span>
          <span
            className="w-1/5 text-center ml-1 text-lg flex-grow"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={activateEditMode}
          >
            {todo.category}
          </span>
          <span
            className="w-1/5 ml-5 text-lg flex-grow text-center"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={activateEditMode}
          >
            {todo.date}
          </span>
          <span
          className="w-1/6 mx-4 text-lg flex-grow text-center"
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          onClick={activateEditMode}
          >
            D{Math.sign(Math.floor((new Date(today)-new Date(todo.date))/(1000 * 60 * 60 * 24))) === 1 ? "+" : "-"}
              {Math.abs(Math.floor((new Date(today)-new Date(todo.date))/(1000 * 60 * 60 * 24)))}
          </span>
          <Button variant="outline" onClick={onDelete}>Delete</Button>
        </>

      )}

      {/* 삭제 버튼을 렌더링합니다. */}

    </li>
  );
};



// TodoItem 컴포넌트를 내보냅니다.
export default TodoItem;
