import Selector from './selector';
import Main from './main';

class Events {

	constructor (isArray) {
		this._selector = new Selector();
		this._isArray = isArray;
	}

	add (elem, type, eventHandle) {
		if (elem === null || (typeof elem === 'undefined')) {
			return;
		}

		if (elem.addEventListener) {
			elem.addEventListener(type, eventHandle, false);
		} else if (elem.attachEvent) {
			elem.attachEvent('on' + type, eventHandle);
		} else {
			elem['on' + type] = eventHandle;
		}
	}

	addToWindow (type, callback) {
		var win = this._selector.getWindow();

		this.add(win, type, callback);
	}

	addToDocument (type, callback) {
		this.add(this.selector.d, type, callback);
	}

	addToElement (element, type, callback) {
		this.add(element, type, callback);
	}

	addToElements (elements, type, callback) {
		if (this._isArray(elements)) {
			for (var i = 0; i < elements.length; i++) {
				this.add(elements[i], type, callback);
			}
		}
	}

}

export default Events;
