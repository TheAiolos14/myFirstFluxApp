import React from 'react';
import AudienceAction from '../actions/audienceActions';
import AudienceStore from '../stores/audienceStore';

class AddNewAudience extends React.Component {

	constructor(props) {
		super(props);

		this._getFreshAudience = this._getFreshAudience.bind(this);
		
		this.state = {
			audience: this._getFreshAudience()
		};
	}

	_getFreshAudience() {
		return {
			name: '' ,
			total: ''
		};
	}

	_updateState(event) {
		let field = event.target.name;
		let value = event.target.value;

		// If the amount is changed and it's not a float, return.
		if (value && field === 'total' && !value.match(/^[a-z0-9.\+\-]+$/g)) {
			return;
		}

		this.state.audience[field] = value;
		this.setState({ audience : this.state.audience});
	}

	_addNewAudience(event) {
		event.preventDefault();
		this.state.audience.name = this.state.audience.name|| 'Unknown';
		this.state.audience.total= this.state.audience.total || '0';
		AudienceAction.addNewAudience(this.state.audience);
		this.setState({ audience : this._getFreshAudience() });
	}

	render() {
		return (
			<div>
				<h3 className="total-budget">{AudienceStore.getTotalAudience()} People(s)</h3>
				<form className="form-inline add-item" onSubmit={this._addNewAudience.bind(this)}>
					<input type="text" className="form-control description" name="name" value={this.state.audience.name} placeholder="Asal kedatangan"
						   onChange={this._updateState.bind(this)} />
					<div className="input-group amount">
						<div className="input-group-addon">People</div>
						<input type="text" className="form-control" name="total" value={this.state.audience.total}
							   placeholder="Total" onChange={this._updateState.bind(this)} />
					</div>
				    <button type="submit" className="btn btn-primary add">Add</button>
				</form>
			</div>
		)
	}
}

export default AddNewAudience;