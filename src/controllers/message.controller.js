import { MessageService } from '../services/message.service';

export class MessageController {
    constructor () {
        this.logger = 'MessageController';
        this.messageService = new MessageService();
        // binding
        this.validatePayload = this.validatePayload.bind(this);
        this.validateDateTimeStamp = this.validateDateTimeStamp.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    /**
     * Validate Payload - Messages
     * @param {*} req
     * @returns boolean 
     */
    validatePayload (req) {
        console.log(`${this.logger} - Validating Payload`.info);
        return !req.body.name || req.body.name === '' ||
            !req.body.message || req.body.message === '';
    }

    /**
     * Validate Payload - Messages
     * @param {*} req
     * @returns boolean 
     */
     validateDateTimeStamp (dateId) {
        console.log(`${this.logger} - Validating Date Time Stamp`.info);
        return !dateId || dateId === '';
    }

    /**
     * API call to get all messages
     * @returns JSON
     */
    async getMessages (req, res) {
        const result = await this.messageService.getAllMessages();
        return res.json(result);
    }

    /**
     * API call to post new message
     * @returns JSON
     */
    async postMessage (req, res) {
        if (this.validatePayload(req)) return res.status(400).send('Invalid payload');
        try {
            const result = await this.messageService.saveMessage ({
                name: req.body.name,
                message: req.body.message
            });
            console.log(`${this.logger} - New Record added`, result);
            return res.status(201).send('New Record Added');
        } catch (err) {            
            console.log(`${this.logger} Internal Server error: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }

    /**
     * API call to update like count
     * @returns JSON
     */
    async updateLike (req, res) {
        if (!this.validateDateTimeStamp(req.params.dateId)) return res.status(400).send('Invalid payload');
        try {
            const result = await this.messageService.updateLike(req.params.dateId);
            console.log(`${this.logger} - Updated like count`, result);
            return res.status(200).send('Updated');
        } catch (err) {            
            console.log(`${this.logger} Internal Server error: ${JSON.stringify(err)}`.error);
            return res.sendStatus(500);
        }
    }
}