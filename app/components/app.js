const React = require('react');
const ReactRouter = require('react-router-dom')

const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

const Popular = require('./popular');
const Home = require('./home');
const Battle = require('./battle');
const Results = require('./results');

const Nav = require('./nav');
 
class App extends React.Component {
	 
	render(){
		return (
			<Router>			
				<div className="container">
					<Nav />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/battle' component={Battle} />
							<Route path='/battle/results' component={Results} />
							<Route path='/popular' component={Popular} />
							<Route render={ ()=> <p>Not Found</p>}
							/>
						</Switch>
				</div>
			</Router>
			
		)
	}
}

module.exports = App;