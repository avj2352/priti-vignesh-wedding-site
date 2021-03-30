
(function($) {
    $(document).ready(function () {

        const EVENT_NAME = 'Event'; // change for every page

        // API Calls ===================================================
        
        /**
         * API call to fetch data from Firebase
         * @returns Promise<any>
         */
        async function fetchAPIData (path) {
            const request = await fetch(path);
            const data = await request.json();
            return data;
        }
        
        /**
         * API call to submit Chat message to Firebase
         * @param {name, message, event, isAttending} content          
         * @returns Promise<any>
         */
        async function postChatMessage (data) {
            const promise = new Promise((resolve, reject)=> {
                fetch('/messages', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch((error) => {
                    reject('Error:', error);
                });
            });
            return promise;
        }

        // HELPER FUNCTIONS ============================================
        
        /**
         * function to replace # with dom type
         * @param {*} content 
         * @param {*} domType (optional - default <br/>)
         * @returns string<HTMLElement>
         */
        function replaceHash (content, domType) {
            if (!domType) domType = '<br/>';
            return content.replaceAll('#', domType);
        }

        /**
         * Get Firebase Details from API
         * @returns Promise<any>
         */
         async function getFirebaseContent () {
            try {
                const events = await fetchAPIData('/events');
                const content = await fetchAPIData('/content');
                const messages = await fetchAPIData('/messages');
                const gallery = await fetchAPIData('/gallery');
                return { events, content, messages, gallery };
            } catch (err) {
                throw new Error('Error retrieving from firebase');
            }
        }

        // POPULATE THE DOM CONTENT ======================================
        
        /**
         * reset message thank you div
         */
        function resetMessageDom () {
            $("#successMsg").hide();
            // $("#newWish").hide();
        }
        
        /**
         * Populate all date fields from Firebase
         */
        async function populateDateFields (fb) {            
            const query = document.querySelectorAll('.date_field');
            eventFieldsDomList = Array.from(query);
            eventFieldsDomList.map(e => e.innerHTML = fb.events.date);
        }
 
        /**
         * Populate scripture content
         */
        async function populateScriptureContent (fb) {
            const scriptureDom = document.getElementById('scriptureContent');
            const verseDom = document.getElementById('scriptureVerse');
            scriptureDom.innerHTML = `&quot;${replaceHash(fb.content.scripture, '<br/>')}&quot;`;
            verseDom.innerHTML = fb.content.verse;
        }

        /**
         * Populate venue header
         */
        async function populateVenueHeader (fb) {
            const venueHeaderDom = document.getElementById('venueHeader');
            venueHeaderDom.innerHTML = `${replaceHash(fb.content.both.location)}`;
        }

        /**
         * Populate invitation Content
         */
        async function populateInvitationContent (fb) {
            const inviteHeaderDom = document.getElementById('invitationContent');
            inviteHeaderDom.innerHTML = `${replaceHash(fb.content.both.invite)}`;
        }

        /**
         * Populate address content
         */
        async function populateEventAddressContent (fb, query) {
            const queryLocation = `${query}Location`;
            const queryAddress = `${query}Address`;
            const queryTimings = `${query}Timings`;
            const queryMap = `${query}Map`;
            const eventLocationDom = document.getElementById(queryLocation);
            const eventAddressDom = document.getElementById(queryAddress);
            const eventTimingsDom = document.getElementById(queryTimings);
            const eventMapDom = document.getElementById(queryMap);
            // populate contents
            if (eventLocationDom) eventLocationDom.innerHTML = fb.events[query]['location'];
            if (eventAddressDom) eventAddressDom.innerHTML = fb.events[query]['address'];
            if (eventTimingsDom) eventTimingsDom.innerHTML = fb.events[query]['timings'];
            if (eventMapDom) eventMapDom.setAttribute('href', fb.events[query]['map']);
            // link map
        }

        // CHAT RELATED scripts ============================================

        /**
         * Function to validate the input fields
         * @returns boolean
         */
        function validateForm () {
            const nameFieldDom = document.getElementById('name');
            const textFieldDom = document.getElementById('message');
            const checkboxDom = document.getElementById('isAttending');
            // console.log('Data within these fields is: ', nameFieldDom.value, textFieldDom.value);
            if (
                nameFieldDom.value.trim() == '' || 
                textFieldDom.value.trim() == '' || 
                textFieldDom.value.length <= 3 || 
                nameFieldDom.value.length < 3
                ) return true;
            else return false;
        }


        /**
         * Function to display success result
         * @returns 
         */
        function displaySuccess () {
            $('.validationText').hide();
            $('#wishForm').hide();
            return $("#successMsg").show();
        }

        /**
         * Submit Chat - Post Message to Firebase
         */
        async function onChatFormSubmission() {
            console.log('jQuery submit form!');
            if (validateForm()) return $('.validationText').show();
            else {
                const nameFieldDom = document.getElementById('name');
                const textFieldDom = document.getElementById('message');
                const checkboxDom = document.getElementById('isAttending');
                // console.log('Wish panel data present, submitting: ', nameFieldDom.value, textFieldDom.value, checkboxDom.checked);
                // Posting XHR request
                const payload = {
                    name: nameFieldDom.value,
                    message: textFieldDom.value,
                    event: EVENT_NAME,
                    isAttending: checkboxDom.checked
                };
                try {
                    const result = await postChatMessage(payload);
                    if (result) return displaySuccess();
                } catch (err) {
                    throw new Error ('Error submitting the form: ', err);
                }                
            }
        }

        // INIT scripts ====================================================
        
        /**
         * Async Main Method
         */
        async function initMethod () {
            const fb = await getFirebaseContent();
            resetMessageDom();
            populateDateFields(fb);
            populateScriptureContent(fb);
            populateVenueHeader(fb);
            populateInvitationContent(fb);
            populateEventAddressContent(fb, 'wedding');
            populateEventAddressContent(fb, 'lunch');
            populateEventAddressContent(fb, 'reception');

            // Call chat submission
            $('#wishForm').submit(onChatFormSubmission);
        }

        // call main method
        initMethod();
    });
}(jQuery)); // jQuery IIFE