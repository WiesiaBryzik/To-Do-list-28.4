import React from 'react';
import io from 'socket.io-client';
import styles from './App.css';
import uuidv4 from 'uuid';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      taskName: ''
    };

    this.submitForm = this.submitForm.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000');
    this.socket.on('addTask', task => {
      this.addTask(task)
    });
    this.socket.on('removeTask', index => {
      this.removeTask(index)
    });
    this.socket.on('updateData', tasks => {
      this.updateTasks(tasks)
    });
    
  }

  updateTasks(tasks) {
    this.setState({tasks: tasks})
  }


  removeTask(id) {
    for (let remTask of this.state.tasks) {

      const index = this.state.tasks.indexOf(remTask);

      if (remTask.id === id)
        this.setState(this.state.tasks.splice(index, 1));
      this.socket.emit('removeTask', (index, id));
    }
  }

  changeValue = (event) => {
    this.setState({ taskName: event.target.value });
    console.log(this.state.taskName);
  }

  addTask(x) {
    this.state.tasks.push(x);
    console.log(x);
    console.log(this.state.tasks);
    window.location.reload(true);
  }

  submitForm(event) {
    event.preventDefault();

    const task = { id: uuidv4(), name: this.state.taskName };

    this.addTask(task);
    this.socket.emit('addTask', task);
  }

  render() {
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks.map(task => (
              <li key={task.id} className='task'>
                {task.name}
                <button onClick={() => this.removeTask(task.id)} class="btn btn--red"> Remove</button>
              </li>
            ))}

          </ul>

          <form id="add-task-form" onSubmit={this.submitForm}>
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={this.state.taskName} onChange={this.changeValue} />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

export default App;