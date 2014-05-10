module.exports = function attachHandlers (router) {

    // get all the event
	router.get('/api/events', require('./browse')());

    // get one event by id
	router.get('/api/events/:id', require('./read')());

    // update event detail
	router.put('/api/events/:id', require('./edit')());

    // create event
    router.post('/api/events', require('./add')());

    // remove event by id
	router.delete('/api/events/:id', require('./delete')());

};