(function($) {
    $(document).ready(function () {

        // reset message thank you div
        function resetMessageDom () {
            $("#successMsg").hide();
        }

        // API Calls ====================
        async function fetchEventDate () {
            const request = await fetch('/events');
            const eventDetails = await request.json();
            return eventDetails;
        }
        
        // Populate all date fields from Firebase
        async function populateDateFields () {
            const eventDetails = await fetchEventDate();
            // console.log('Event details is: ', eventDetails);
            const query = document.querySelectorAll('.date_field');
            eventFieldsDomList = Array.from(query);
            // console.log('Dom list is: ', eventFieldsDom);
            eventFieldsDomList.map(e => e.innerHTML = eventDetails.date);
        }

        // init scripts
        console.log('Custom script loaded!');
        resetMessageDom();
        populateDateFields();
    });
}(jQuery)); // jQuery IIFE