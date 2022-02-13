import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import { ProjectList, ProjectDetail } from './components/Project.js'
import ToDoList from './components/ToDo.js'
import LoginForm from './components/Auth.js'
import axios from 'axios'
import Cookies from 'universal-cookie'

const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}



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
      todos: [],
      'token': ''
    }
  }
  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', { username: username, password: password })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }
  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
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
              <li>
                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}

              </li>
              <Switch>
                <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />


                <Route exact path='/'>
                  <UserList users={this.state.users} />
                </Route>
                <Route exact path='/projects'>
                  <ProjectList items={this.state.projects} />
                </Route>
                <Route exact path='/todos'>
                  <ToDoList items={this.state.todos} />
                </Route>
                <Route component={NotFound404} />
              </Switch>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>


    )
  }

  load_data() {
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

  componentDidMount() {
    this.get_token_from_storage()
  }
}
export default App;
