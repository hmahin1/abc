import React from 'react';
import MainContainer from '../src/components/MainContainer';
import './App.css';
import Home from '../src/pages/Home';
import Drafting from '../src/pages/Drafting';
import PlayerSelection from '../src/pages/Drafting.jsx';

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

const Routing = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route path='/drafting'>
				<Drafting />
			</Route>
      <Route path='/player-selections'>
				<PlayerSelection />
			</Route>
		</Switch>
	);
};

function App() {
	return (
		<Provider store={store}>
			<MainContainer>
				<BrowserRouter>
					<Routing />
				</BrowserRouter>
			</MainContainer>
		</Provider>
	);
}

export default App;
