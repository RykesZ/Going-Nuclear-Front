import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Article from './pages/Article';
import About from './pages/About';
import Search from './pages/Search';
import Contact from './pages/Contact';
import Support from './pages/Support';
import reportWebVitals from './reportWebVitals';
import Unsubscribe from './pages/Unsubscribe';
import './App.scss';
import { BurgerProvider } from './utils/context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BurgerProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Article />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/support">
            <Support />
          </Route>
          <Route path="/unsubscribe/:email">
            <Unsubscribe />
          </Route>
        </Switch>
        <Footer />
      </BurgerProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
