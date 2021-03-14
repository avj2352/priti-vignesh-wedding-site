import { EventService } from './../services/event.service';

export class EventController {

    constructor() {
        this.logger = `EventController`;
        this.eventService = new EventService();
        // binding
        this.displayHello = this.displayHello.bind(this);
        this.getEvents = this.getEvents.bind(this);
    }
    
    displayHello (req, res) {
        res.send('Hello World - Events');
    }

    async getEvents (req, res) {
        // console.log(`${this.logger} - retrieving events from Firebase`.info);
        const result = await this.eventService.getEvents();
        return res.json(result);
    }
}