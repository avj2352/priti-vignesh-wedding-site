import { MessageService } from '../services/message.service';

export class MessageController {
    constructor () {
        this.logger = 'MessageController';
        this.messageService = new MessageService();
        // binding
        this.getMessages = this.getMessages.bind(this);
    }

    async getMessages (req, res) {
        const result = await this.messageService.getAllMessages();
        return res.json(result);
    }
}