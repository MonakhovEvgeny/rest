import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import { ProjectList, ProjectDetail } from './components/Project.js'
import ToDoList from './components/ToDo.js'
import axios from 'axios'


const DOMAIN = 'http://127.0.0.1:8000'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navbarItems: [
        { name: 'Users', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'TODOs', href: '/todos' },
      ],
      users: [],
      projects: [],
      todos: []
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <Navbar navbarItems={this.state.navbarItems} />
          </header>
          <main role="main" class="flex-shrink-0">
            <div className="container">
              <Switch>
                <Route exact path='/'>
                  <UserList users={this.state.users} />
                </Route>
                <Route exact path='/projects'>
                  <ProjectList items={this.state.projects} />
                </Route>
                <Route exact path='/todos'>
                  <ToDoList items={this.state.todos} />
                </Route>
              </Switch>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>


    )
  }

  componentDidMount() {
    axios.get(get_url('/api/user/'))
      .then(response => {
        //console.log(response.data)
        this.setState({ users: response.data.results })
      }).catch(error => console.log(error))

    axios.get(get_url('/api/projects/'))
      .then(response => {
        //console.log(response.data)
        this.setState({ projects: response.data.results })
      }).catch(error => console.log(error))

    axios.get(get_url('/api/todos/'))
      .then(response => {
        //console.log(response.data)
        this.setState({ todos: response.data.results })
      }).catch(error => console.log(error))
  }
}
export default App;
