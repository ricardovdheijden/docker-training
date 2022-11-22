import React, {FormEvent, useEffect, useState} from 'react';
import './App.css';

const App = () => {
    type Todo = {
        id: number,
        name: string
    }

    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}` || 'http://localhost:3001/api'
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${backendUrl}/todos`);
            const responseJson: Todo[] = await response.json();
            setTodos(responseJson);
        }
        fetchData();
    }, [backendUrl]);

    async function fetchTodos() {
        const response = await fetch(`${backendUrl}/todos`);
        const responseJson: Todo[] = await response.json();
        setTodos(responseJson);
    }

    async function addTodo(name: string) {
        const todo: Partial<Todo> = {
            name
        };
        const response = await fetch(`${backendUrl}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        await response.json();
        fetchTodos();
    }

    async function removeTodo(id: number) {
        const response = await fetch(`${backendUrl}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });
        await response.json();
        fetchTodos();
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addTodo(input);
        setInput('');
    }

    return (
        <>
            <h1>Things to do</h1>
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={changeEvent => setInput(changeEvent.target.value)}/>
                <button type="submit">ADD</button>
            </form>
            <table>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>
                                <button onClick={() => removeTodo(todo.id)}>X</button>
                            </td>
                            <td>{todo.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default App;
