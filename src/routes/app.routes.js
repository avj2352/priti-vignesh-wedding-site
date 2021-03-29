import { EventController } from '../controllers/event.controller';
import { MessageController } from '../controllers/message.controller';
import { GalleryController } from '../controllers/gallery.controller'
import { ContentController } from '../controllers/content.controller';

const event = new EventController();
const msg = new MessageController();
const gallery = new GalleryController();
const content = new ContentController();

const routes = (app) => {
    // EVENTS ============================
    app.route('/events')
        .get(event.getEvents);
    
    // CONTENT ===========================
    app.route('/content')
        .get(content.getContent);

    // MESSAGES ==========================
    app.route('/messages')
        .get(msg.getMessages)
        .post(msg.postMessage);
    
    app.route('/messages/updatelike/:dateId')
        .put(msg.updateLike);

    // GALLERY ===========================
    app.route('/gallery')
        .get(gallery.getImages);
};

export default routes;