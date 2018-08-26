import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import Popular from './popular';
import Home from './home';
import Battle from './battle';
import Results from './results';
import Nav from './nav';
 
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

export default App;