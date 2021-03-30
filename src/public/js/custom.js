(function($) {
    $(document).ready(function () {

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
        }

        // call main method
        initMethod();
    });
}(jQuery)); // jQuery IIFE