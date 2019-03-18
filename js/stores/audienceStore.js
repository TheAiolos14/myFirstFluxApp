import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';
let _audienceState = [];

class AudienceStore extends EventEmitter {

	constructor() {
		super();

		// Registers action handler with the Dispatcher.
		Dispatcher.register(this._registerToActions.bind(this));
	}

	// Switches over the action's type when an action is dispatched.
	_registerToActions(action) {
		switch(action.actionType) {
			case ActionTypes.ADD_NEW_AUDIENCE:
				this._addNewAudience(action.payload);
			break;
		}
	}

	// Adds a new item to the list and emits a CHANGED event. 
	_addNewAudience(audience) {
		audience.id = _audienceState.length;
		_audienceState.push(audience);
		this.emit(CHANGE);
	}

	// Returns the current store's state.
	getAllAudience() {
		return _audienceState;
	}

	// Calculate the total budget.
	getTotalAudience() {
		let totalAudience = 0;

		_audienceState.forEach((audience) => {
			totalAudience += parseFloat(audience.total);
		});

		return totalAudience;
	}

	// Hooks a React component's callback to the CHANGE event.
	addChangeListener(callback) {
		this.on(CHANGE, callback);
	}

	// Removes the listener from the CHANGED event.
	removeChangeListener(callback) {
		this.removeListener(CHANGE, callback);
	}
}

export default new AudienceStore();