import React from 'react';
import AddNewAudience from './AddNewAudience';
import AudienceList from './AudienceList';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<h1 className="app-title">The Fantastic Event in Jakarta</h1>
				<AddNewAudience />
				<AudienceList />
			</div>
		);
	}
}

export default App;