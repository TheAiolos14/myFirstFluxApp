import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class AudienceActions {

	addNewAudience(audience) {
		// Note: This is usually a good place to do API calls.
		Dispatcher.dispatch({
			actionType: ActionTypes.ADD_NEW_AUDIENCE,
			payload: audience
		});
	}

}

export default new AudienceActions();