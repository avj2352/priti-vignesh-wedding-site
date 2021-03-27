import { GalleryService } from './../services/gallery.service';

export class GalleryController {

    constructor() {
        this.logger = `GalleryController`;
        this.galleryService = new GalleryService();
        // binding
        this.getImages = this.getImages.bind(this);
    }
    
    async getImages (req, res) {
        // console.log(`${this.logger} - retrieving images from Firebase`.info);
        const result = await this.galleryService.getImages();
        return res.json(result);
    }
}