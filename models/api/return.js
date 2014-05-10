function ApiReturn(success, data, message, params) {
	return {
		success: success,
		data: data,
		message: message,
		params: params
	}
}

module.exports = ApiReturn;