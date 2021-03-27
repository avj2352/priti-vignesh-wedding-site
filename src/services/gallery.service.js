require('../util/colors');
import { firebaseApp } from '../util/firebase.config';

export class GalleryService {

    constructor() {
        this.logger = `GalleryService`;
        console.log(`${this.logger} - initialized`.help);
        this.galleryRef = firebaseApp.database().ref("/gallery");
        // binding
        this.getImages = this.getImages.bind(this);
    }

    /**
     * API to retrieve gallery image links
     * @returns Promise
     */
    getImages() {
        const promise = new Promise((resolve, reject) => {
            try {
                this.galleryRef
                .on('value', (snapshot)=>{
                    resolve(snapshot.val());
                });
            } catch(err) {
                reject(`Error retrieving data - ${JSON.stringify(err)}`);
            }
        });
        return promise;
    }
    
}