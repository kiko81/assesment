import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ControllerScreen from './components/ControllerScreen';
import ControllersPage from './components/ControllersPage';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

function App() {  
  return (
    <Router>
      <NavBar />
      <Container fluid>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route path="/controllers" render={() => <ControllersPage />} />
            <Route path="/controller/:id" render={(props) => <ControllerScreen {...props} />} />
          </Switch>
        </div>
      </Container>
    </Router>
  );
}

export default App;
