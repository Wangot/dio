function ApiReturn(success, data, message, params) {
	return {
		status: success ? "success" : "fail",
		code: success ? 1 : 0,
		data: data,
		message: message,
		params: params
	}
}

module.exports = ApiReturn;