const Todo = (props) => {
    const {todos, handleDeleteTodo} = props
    const handleDelete = (id) => {
        handleDeleteTodo(id)
    }
    return(
        <div className='todos-container'>
          {todos.map(todo => {
            return(
              <li key = {todo.id}>{todo.title}
                &nbsp;<span onClick={() => handleDelete(todo.id)}>x</span>
              </li>
            )
          })}
        </div>
    )
}
export default Todo;