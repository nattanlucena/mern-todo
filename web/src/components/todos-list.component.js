import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const TodoRow = props => (
    <tr className={props.todo.todo_completed ? 'completed':''}>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td>
          <a href="#" onClick={(e) => props.handleClick(e,props.todo)}>Remove</a>
        </td>
    </tr>
);

export default class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {todos:[]};

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    axios.get('http://localhost:4000/todos/')
      .then(response => {
        this.setState({todos:response.data});
      })
      .catch(function(error){
        console.log(error);
      })
  }

  todoList() {
    let handleClick = this.handleClick;
        return this.state.todos.map(function(currentTodo, i){
            return <TodoRow handleClick={handleClick} todo={currentTodo} key={i} />;
        });
    }

  handleClick(e,todo) {
    e.preventDefault();

    axios.post('http://localhost:4000/todos/remove', {"id":todo._id})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:4000/todos/')
      .then(response => {
        this.setState({todos:response.data});
      })
      .catch(function(error){
        console.log(error);
      })
    console.log('handleClick', e);
  }

  render() {
    return (
      <div>
          <h3>Todos List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }} >
              <thead>
                  <tr>
                      <th>Description</th>
                      <th>Responsible</th>
                      <th>Priority</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  { this.todoList() }
              </tbody>
          </table>
      </div>
    )
  }
}
