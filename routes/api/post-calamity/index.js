module.exports = function attachHandlers (router) {

    // get all the event_history
	//router.get('/api/event_histories', require('./browse'));

    // get one event_history by id
//	router.get('/api/event_histories/:id', require('./read'));

    // update event_history detail
//	router.put('/api/event_histories/:id', require('./edit'));

    // create event_history
    router.post('/api/article', require('./add'));

    // remove event_history by id
//	router.delete('/api/event_histories/:id', require('./delete'));

};