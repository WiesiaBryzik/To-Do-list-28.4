import React from 'react';
import io from 'socket.io-client';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    }
  }

  componentDidMount() { }

  removeTask() {
    for (let remTask of this.state.tasks) {

      if (remTask.id == this.state.tasks.id)
        this.setState(this.state.tasks.splice(this.state.tasks.indexOf(remTask), 1));
      this.socket.emit('removeTask', this.state.tasks);
    }
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
                <button onClick={() => this.removeTask(task.id)} class="btn btn--red"> Remove</button>
              </li>
            ))}

          </ul>

          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

export default App;