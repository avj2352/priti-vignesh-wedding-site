import { EventController } from '../controllers/event.controller.js';

const event = new EventController();

const routes = (app) => {
    // EVENTS ============================
    app.route('/events')
        .get(event.getEvents);
};

export default routes;