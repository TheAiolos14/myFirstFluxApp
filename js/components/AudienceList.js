import React from 'react';
import AudienceStore from '../stores/audienceStore';

class AudienceList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			audiences: AudienceStore.getAllAudience()
		};

		this._onChange = this._onChange.bind(this);
	}

	_onChange() {
		this.setState({ audiences: AudienceStore.getAllAudience() });
	}

	componentWillMount() {
		AudienceStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		AudienceStore.removeChangeListener(this._onChange);
	}

	render() {

		let noItemsMessage;

		// Show a friendly message instead if there are no items.
		if (!this.state.audiences.length) {
			noItemsMessage = (<li className="no-items">Hello, You are the first group !</li>);
		}

		return (
			<ul className="items-list">
				{noItemsMessage}
				{this.state.audiences.map((audienceDetails) => {
					let totalType = parseFloat(audienceDetails.total) > 0 ? 'positive' : 'negative';
					return (<li key={audienceDetails.id}>{audienceDetails.name} <span className={totalType}>{audienceDetails.total}</span></li>);
				})}
			</ul>
		);
	}
}

export default AudienceList;
