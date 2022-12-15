import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import ToDo from "./component/ToDo";
import AddTodo from "./component/AddTodo";

function App() {
    const [todo, setTodo] = useState([]);
    useEffect(()=>{
        getToDo();
    }, [])
    //to fetch the data from the api
    const getToDo = async()=>{
        await axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res)=> {
                setTodo(res.data)
                console.log(res)
            })
            .catch((err)=>console.log(err));
    }
    console.log(todo);
    //to delete the data from the api
    const deleteToDo = async(id)=>{
        await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then((res)=>{
                if(res.status !== 200)
                    return;
                else{
                    setTodo(todo.filter((tod)=>{
                        return tod.id !== id;
                    }))
                }
            })
            .catch((err)=>{
                return new Error(err);
            })
    }
    //to add data to the api
    const addToDo = async(userId, id, title, completed)=>{
        await axios.post('https://jsonplaceholder.typicode.com/todos', {
            userId: Number(userId),
            id: id,
            title: title,
            completed: Boolean(completed),
        })
            .then((res)=>{
                if(res.status !== 201){
                    return;
                }
                else{
                    return res.data;
                }
            })
            .then((data)=>{
                setTodo((todo)=>[...todo, data])
            })
            .catch((err)=>{
                return new Error(err);
            })
    }

    //to update the todolist
    const updateTodo = async({userId, id, title, completed})=>{
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            userId: Number(userId),
            id: id,
            title: title,
            completed: Boolean(completed),
        })
            .then((data)=>{
                console.log(data)
            })
            .catch((err)=>{
                return new Error(err);
            })
    }
    const todoUpdate = async(id)=>{
        const data = {
            'userId': 1,
            'id': 1,
            'title': 'hye',
            'completed': true
        }
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, data)
            .then((data)=>{
                console.log(data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }
  return (
    <div className="App" style={{padding: 50}}>
      <h3>Perform crud operation using the axios api</h3>
        {
            todo.map((tod)=>(
                <ToDo
                    userId={tod.userId}
                    id={tod.id}
                    title={tod.title}
                    completed={tod.completed}
                    deleting={deleteToDo}
                    updating={todoUpdate}
                />
            ))
        }
        <AddTodo adding={addToDo}/>
    </div>
  );
}

export default App;

