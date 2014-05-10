var success = false
	, data = null
	, message = null
	, params = null

function ApiReturn(success, data, message, params) {
	this.success = success;
	this.data = data;
	this.message = message;
	this.params = params;

	return {
		success: this.success,
		data: this.data,
		message: this.message,
		params: this.params
	}
}

module.exports = ApiReturn;