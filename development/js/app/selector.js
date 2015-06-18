class Selector {

	constructor () {
		this._document = document;
		this._window = window;
	}

	getWindow () {
		return this._window;
	}

	getDocument () {
		return this._document;
	}

	getByQuerySelector (object) {
		var objects = this._document.querySelectorAll(object);

		if (objects.length === 1) {
			return this._document.querySelector(object);
		}

		return objects;
	}

	_getByTag (tagName) {
		return this._document.getElementsByTagName(tagName);
	}

	_getById (id) {
		return this._document.getElementById(id);
	}

	_getByClass (className) {
		var objects = this._document.getElementsByClassName(className);

		if (objects.length === 0) {
			return null;
		}

		return objects;
	}

	find (object, querySelector) {
		var objectSubstr;

		querySelector = querySelector || false;

		if (querySelector) {
			return this.getByQuerySelector(object);
		}

		objectSubstr = object.substr(1, object.length);

		if (object.indexOf('.') === 0) {
			return this._getByClass(objectSubstr);
		} else if (object.indexOf('#') === 0) {
			return this._getById(objectSubstr);
		}

		return this._getByTag(object);
	}
}

export default Selector
