"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

const initialTodos = [
  { id: 1, text: "Hoàn thành thiết kế giao diện", completed: true },
  { id: 2, text: "Thêm chức năng dark/light mode", completed: true },
  { id: 3, text: "Tối ưu hóa cho mobile", completed: false },
  { id: 4, text: "Viết nội dung blog đầu tiên", completed: false },
  { id: 5, text: "Tích hợp Google Analytics", completed: false },
]

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos)

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-foreground mb-3">Danh sách công việc:</h4>
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center space-x-3">
          <Checkbox id={`todo-${todo.id}`} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
          <label
            htmlFor={`todo-${todo.id}`}
            className={`text-sm cursor-pointer ${
              todo.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {todo.text}
          </label>
        </div>
      ))}
    </div>
  )
}
