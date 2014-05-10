module.exports = function attachHandlers (router) {

    // get all the event
	router.get('/api/user_events', require('./browse'));

    // get one event by id
	router.get('/api/user_events/:id', require('./read'));

    // update event detail
	router.put('/api/user_events/:id', require('./edit'));

    // create event
    router.post('/api/user_events', require('./add'));

    // remove event by id
	router.delete('/api/user_events/:id', require('./delete'));

};