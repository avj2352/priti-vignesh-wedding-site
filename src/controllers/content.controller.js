import { ContentService } from './../services/content.service';

export class ContentController {

    constructor() {
        this.logger = `ContentController`;
        this.contentService = new ContentService();
        // binding
        this.getContent = this.getContent.bind(this);
    }
    
    async getContent (req, res) {
        // console.log(`${this.logger} - retrieving events from Firebase`.info);
        const result = await this.contentService.getContent();
        return res.json(result);
    }
}