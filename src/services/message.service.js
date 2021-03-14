require('../util/colors');
import { firebaseApp } from '../util/firebase.config';
import firebase from 'firebase';

export class MessageService {
    
    constructor() {
        this.logger = 'MessageService';
        console.log(`${this.logger} - initializing`.help);
        this.messageRef = firebaseApp.database().ref("messages");
        // binding
        this.getAllMessages = this.getAllMessages.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.updateLike = this.updateLike.bind(this);
    }

    /**
     * API call to get all chat messages
     * @returns Promise <any>
     */
    getAllMessages () {
        const promise = new Promise((resolve, reject) => {
            try {
                let query = this.messageRef.orderByChild('date');   
                query.once('value', (snapshot)=>{
                    resolve(snapshot.val());
                }, (err)=> {
                    reject(`Error retrieving data - ${JSON.stringify(err)}`);
                });
            } catch (err) {
                reject(`Error retrieving data - ${JSON.stringify(err)}`);
            }
        });
        return promise;
    }

    /**
     * API call to store a new chat message
     * @parms { name, comment }
     * @returns Promise <any>
     */
    saveMessage (input) {
        console.log(`${this.logger} - storing message - ${JSON.stringify(input)}`.help);
        const data = { 
            comment:input.comment, 
            date: firebase.database.ServerValue.TIMESTAMP,
            like:0, 
            name:input.name 
        };   
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                this.messageRef.push(data)
                    .then(resolve, reject);
            }, 1);
        });
    }

    /**
     * API call to update like count on chat message
     * @param {*} dateInput 
     * @returns Promise <any>
     */
    updateLike (dateInput) {
        console.log('selected date is:', dateInput);
        let promise = new Promise(function(resolve,reject){
            this.messageRef.orderByChild('date').equalTo(dateInput).once("value", function(snapshot) {
                console.log('Result is: ',snapshot.val());
                // console.log('List: ',Object.values(array));     
                let objectValue = Object.values(snapshot.val());
                let temp = objectValue[0].like;
                console.log('Number of likes for that result is: ', temp);
                temp++;                
                snapshot.forEach(function(data) {
                    var onComplete = function(error) {
                        if (error) {
                          console.log('Error rendering!');
                          reject(error);
                        } else {
                          console.log('completed rendering!');
                          resolve();
                        }
                      };
        
                    console.log('Result key is:',data.key);
                    let key = data.key;
                    data.ref.update({like: temp},onComplete);
                });
        
            });//end:equalTo
        });    
        return promise;
    }//end:updateLike
}