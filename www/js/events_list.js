//=============================================================================
// create Event Html
//=============================================================================
function createEventHtml(event){
    if(event.month.length > 3)
        event.month = event.month.substr(0,3);


     var eventHtml = '' +
     '<div class="event">'+
     '<div class="swm_event_box">' +
     '<div class="swm_evt_date"><span class="swm_evt_date_day">'+ event.day+'</span> <span class="swm_evt_date_month">'+event.month+'</span><span class="swm_evt_date_year">'+2017+'</span></div>' +
//     '<div class="swm_evt_title">'+
//                 '<img class="event-img"'+
//                     'src="'+ event.img_url +'" '+
//                     'class="attachment-tribe_events size-tribe_events wp-post-image" '+
//                     'alt="" >'+
//             '</div>'+
     '<div class="swm_evt_title"><a href='+event.subject_url+' title="" role="link">'+ event.subject +'</a></div><div class="swm_evt_desc"><p>'+event.description+'</p>'+
     '<div class="event-location"><span>'+event.location+'</span>'+
                 '<span class="event-location-icon fa fa-map-marker"></span>'+
             '</div>';+
      '<div>';

    return eventHtml;
}

//=============================================================================
// create Dom Events
//=============================================================================
function createDomEvents(events){
    for(var i=0; i < events.length; i++){
        var ele = document.createElement("div");
//        ele.setAttribute("class","event flex-rows");
        ele.innerHTML=createEventHtml(events[i]);
        eventsList.appendChild(ele);
    }
	
	document.getElementById("to-all-events").style.display = "block";
	document.getElementById("please-wait").style.visibility = "hidden";

	/*
    eventsList.onscroll = function() {
        if (eventsList.scrollTop > 500) {
            document.getElementById("go-top").style.display = "block";
        } else {
            document.getElementById("go-top").style.display = "none";
        }
    };
	*/
};

//=============================================================================
// get events information
//=============================================================================
function getEvents(){
	document.getElementById("to-all-events").style.display = "none";
	document.getElementById("please-wait").style.visibility = "visible";

    getFile('events', 'events-list.txt', function onOk(fileContent) {
        events = parseEventsFile(fileContent);
        createDomEvents(events);
        console.log('Events: ',events);
    }, function onError(error) {
        console.error(error);
    })	;
}

// read file from firebase storage
//=============================================================================
// https://firebase.google.com/docs/storage/web/download-files
function getFile (folder, filename, onOk, onError) {
    // Create a reference with an initial file path and name
    var storage = firebase.storage();

    var pathReference = storage.ref(folder); // example: 'images/stars.jpg'

    pathReference.child(filename).getDownloadURL().then(function(url) { // example filename: 'images/stars.jpg'
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text'
        xhr.onload = function(event) {
            var clob = xhr.response;
            onOk(clob);
        };
        xhr.open('GET', url);
        xhr.send();
    }).catch(function(error) {
        onError(error);
    });
}

//=============================================================================
// parse content of events text file and return array of events.
// example of file content:
/*
 [
 {
 "day": "15",
 "description": "נופש המאפשר הפוגה משגרת החיים",
 "img_url": "https://www.gdolim.org.il/wp-content/uploads/2017/01/nofesh_mishpachot_2017a-166x80.jpg",
 "location": "אילת",
 "month": "יול",
 "more_details_url": "https://www.gdolim.org.il/event/%d7%a0%d7%95%d7%a4%d7%a9-%d7%94%d7%97%d7%9c%d7%9e%d7%94-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa-%d7%91%d7%90%d7%99%d7%9c%d7%aa-4/",
 "subject": "נופש החלמה למשפחות באילת",
 "subject_url": "https://www.gdolim.org.il/event/%d7%a0%d7%95%d7%a4%d7%a9-%d7%94%d7%97%d7%9c%d7%9e%d7%94-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa-%d7%91%d7%90%d7%99%d7%9c%d7%aa-4/"
 },
 {
 "day": "09",
 "description": "נופש המאפשר הפוגה משגרת החיים",
 "img_url": "https://www.gdolim.org.il/wp-content/uploads/2017/09/gdolim_dor_20161018_5_small-1-166x80.jpg",
 "location": "אילת",
 "month": "אוק",
 "more_details_url": "https://www.gdolim.org.il/event/%d7%94%d7%a4%d7%a0%d7%99%d7%a0%d7%92-%d7%a1%d7%95%d7%9b%d7%95%d7%aa-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa/",
 "subject": "הפנינג סוכות למשפחות",
 "subject_url": "https://www.gdolim.org.il/event/%d7%94%d7%a4%d7%a0%d7%99%d7%a0%d7%92-%d7%a1%d7%95%d7%9b%d7%95%d7%aa-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa/"
 },
 {
 "day": "15",
 "description": "נופש המאפשר הפוגה משגרת החיים",
 "img_url": "https://www.gdolim.org.il/wp-content/uploads/2017/01/nofesh_mishpachot_2017a-166x80.jpg",
 "location": "אילת",
 "month": "יול",
 "more_details_url": "https://www.gdolim.org.il/event/%d7%a0%d7%95%d7%a4%d7%a9-%d7%94%d7%97%d7%9c%d7%9e%d7%94-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa-%d7%91%d7%90%d7%99%d7%9c%d7%aa-4/",
 "subject": "נופש החלמה למשפחות באילת",
 "subject_url": "https://www.gdolim.org.il/event/%d7%a0%d7%95%d7%a4%d7%a9-%d7%94%d7%97%d7%9c%d7%9e%d7%94-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa-%d7%91%d7%90%d7%99%d7%9c%d7%aa-4/"
 }
 ]
 */
//=============================================================================
function parseEventsFile(fileContent) {
    var events = JSON.parse(fileContent);
    return events;
}

// init Firebase.
//=============================================================================
function initFirebase () {
    var config = {
        apiKey: "AIzaSyAQldsliQRjJgFdWnMto6GywMNJDw7PcXA",
        authDomain: "gdolim-eafe9.firebaseapp.com",
        databaseURL: "https://gdolim-eafe9.firebaseio.com/",
        storageBucket: "gdolim-eafe9.appspot.com"//,
        //messagingSenderId: "<SENDER_ID>",
    };
    firebase.initializeApp(config);
}

// When the user clicks on the button, scroll to the top of the events content
function goTop() {
    eventsList.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//=============================================================================

var firebase;
var events;
var eventsList = document.getElementById('events_content');

initFirebase ();

getEvents();




