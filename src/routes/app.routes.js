import { EventController } from '../controllers/event.controller.js';
import { MessageController } from '../controllers/message.controller.js';

const event = new EventController();
const msg = new MessageController();

const routes = (app) => {
    // EVENTS ============================
    app.route('/events')
        .get(event.getEvents);

    // MESSAGES ==========================
    app.route('/messages')
        .get(msg.getMessages);
};

export default routes;