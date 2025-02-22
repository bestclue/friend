/* 
  할 일 목록을 관리하고 렌더링하는 주요 컴포넌트입니다.
  상태 관리를 위해 `useState` 훅을 사용하여 할 일 목록과 입력값을 관리합니다.
  할 일 목록의 추가, 삭제, 완료 상태 변경 등의 기능을 구현하였습니다.
*/
"use client";

import React, { useState } from "react";
import TodoItem from "@/components/TodoItem";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const categoryList = ["Study", "Exercise", "Work", "Other"];

// TodoList 컴포넌트를 정의합니다.
const TodoList = () => {
  // 상태를 관리하는 useState 훅을 사용하여 할 일 목록과 입력값을 초기화합니다.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [sorted, setSorted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filterTodos = () => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "uncompleted":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos();

  const toggleFilter = (value) => {
    setFilter(value);
  };

  const toggleSort = () => {
    setSorted(!sorted);
  };

  const sortedAndFilteredTodos = sorted
  ? filteredTodos.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
  : filteredTodos;

  const handleCategoryFilter = (value) => {
    setCategoryFilter(value);
  };

  const filteredByCategoryTodos = categoryFilter === "all"
  ? sortedAndFilteredTodos
  : sortedAndFilteredTodos.filter((todo) => todo.category === categoryFilter);

  // addTodo 함수는 입력값을 이용하여 새로운 할 일을 목록에 추가하는 함수입니다.
  const addTodo = () => {
    // 입력값이 비어있는 경우 함수를 종료합니다.
    if (input.trim() === "" || date === "" || category === "") return;
    // 기존 할 일 목록에 새로운 할 일을 추가하고, 입력값을 초기화합니다.
    // {
    //   id: 할일의 고유 id,
    //   text: 할일의 내용,
    //   completed: 완료 여부,
    // }
    // ...todos => {id: 1, text: "할일1", completed: false}, {id: 2, text: "할일2", completed: false}}, ..
    setTodos([...todos, { id: Date.now(), text: input, date: date, category: category, completed: false }]);
    setInput("");
    setDate("");
    setCategory("");
  };



  // toggleTodo 함수는 체크박스를 눌러 할 일의 완료 상태를 변경하는 함수입니다.
  const toggleTodo = (id) => {
    // 할 일 목록에서 해당 id를 가진 할 일의 완료 상태를 반전시킵니다.
    setTodos(
      // todos.map((todo) =>
      //   todo.id === id ? { ...todo, completed: !todo.completed } : todo
      // )
      // ...todo => id: 1, text: "할일1", completed: false
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  const editTodo = (id, newText, newDate, newCategory) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, text: newText, date: newDate, category: newCategory} : todo;
      })
    );
  };

  // deleteTodo 함수는 할 일을 목록에서 삭제하는 함수입니다.
  const deleteTodo = (id) => {
    // 해당 id를 가진 할 일을 제외한 나머지 목록을 새로운 상태로 저장합니다.
    // setTodos(todos.filter((todo) => todo.id !== id));
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const deleteAll = () => {
    console.log("Before deleteAll:", todos); // 삭제 전 상태 출력
    setTodos([]); // 모든 할 일 목록을 빈 배열로 설정하여 삭제
    console.log("After deleteAll:", todos); // 삭제 후 상태 출력 (업데이트 후 상태 확인)
  };
  // 컴포넌트를 렌더링합니다.

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-[700px] mx-auto my-5 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-right text-gray-800">TODAY : {today}</h1>
      <h1 className="text-5xl font-medium text-black shadow-x1 mt-1 mb-8">Todo List</h1>
      {/* 할 일을 입력받는 텍스트 필드입니다. */}
      <div className="flex w-full items-center space-x-4 mt-4 mb-8">
      <Input
        type="text"
        className="w-1/2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Select  value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-1/3">
          <SelectValue placeholder="Category"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categoryList.map((cate) => (
                <SelectItem value={cate}>
                  {cate}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
    </Select>
      <Input
        type="date"
        className="w-[40%]"
        value={date}
        onChange={(d) => setDate(d.target.value)}
        min={today}
      />


      {/* 할 일을 추가하는 버튼입니다. */}
      <Button className="btn" onClick={addTodo}>
        Add Todo
      </Button>
      
      </div>
      <div className="flex justify-between w-full items-center space-x-4 mb-4">
      <Button className="w-28 mr-2" onClick={toggleSort}>
        {sorted ? "Unsort" : "Sort by Date"}
      </Button>
      
      <Select value={filter} onValueChange={toggleFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="uncompleted">Uncompleted</SelectItem>
       </SelectContent>
      </Select>

      <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categoryList.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="btn" onClick={deleteAll}>
        Delete all
      </Button> 
      </div>

      {/* 할 일 목록을 렌더링합니다. */}
      <ul>
        {filteredByCategoryTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={(newText, newDate, newCategory) => editTodo(todo.id, newText, newDate, newCategory)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
