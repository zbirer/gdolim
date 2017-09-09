//=============================================================================
// create Event Html
//=============================================================================
function createEventHtml(event){
    if(event.month.length > 3)
        event.month = event.month.substr(0,3);
    var eventHtml = '' +
    '<div class="flex-cols event-img-date">'+
        '<div class="flex-3">'+
            '<img class="event-img"'+
                'src="https://www.gdolim.org.il/wp-content/uploads/2017/01/nofesh_mishpachot_2017a-166x80.jpg" '+
                'class="attachment-tribe_events size-tribe_events wp-post-image" '+
                'alt="" >'+
        '</div>'+
        '<div class="flex-rows event-date">'+
            '<div class="event-date-day">'+event.day+'</div>'+
            '<div class="event-date-month">'+event.month+'</div>'+
        '</div>'+
    '</div>'+
    '<div class="flex-rows event-details-container border-right border-left border-bottom">'+
        '<div class="flex-rows event-img-details border-top">'+
            '<div class="event-link1">'+
                '<a href="https://www.gdolim.org.il/event/%d7%a0%d7%95%d7%a4%d7%a9-%d7%94%d7%97%d7%9c%d7%9e%d7%94-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa-%d7%91%d7%90%d7%99%d7%9c%d7%aa-4/" '+
                    'title="" '+
                    'role="link">'+
                    event.subject+
                '</a>'+
            '</div>'+
            '<div class="flex-rows event-details border-top border-bottom flex-3">'+
                '<div class="event-details">'+
                    event.description +
                '</div>'+
                '<div class="event-link2">'+
                    '<a href="https://www.gdolim.org.il/event/%d7%a0%d7%95%d7%a4%d7%a9-%d7%94%d7%97%d7%9c%d7%9e%d7%94-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa-%d7%91%d7%90%d7%99%d7%9c%d7%aa-4/"'+
                        'title=""'+
                        'role="link">'+
                        ' עוד פרטים> '+
                    '</a>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="flex-cols event-location">'+
            '<div>אילת</div>'+
            '<div class="event-location-icon fa fa-map-marker"></div>'+
        '</div>'+
    '</div>';
    return eventHtml;
}

//=============================================================================
// create Dom Events
//=============================================================================
function createDomEvents(events){
    for(var i=0; i < events.length; i++){
        var ele = document.createElement("div");
        ele.setAttribute("class","event flex-rows");
        ele.innerHTML=createEventHtml(events[i]);
        eventsList.appendChild(ele);
    }
    eventsList.onscroll = function() {
        if (eventsList.scrollTop > 500) {
            document.getElementById("go-top").style.display = "block";
        } else {
            document.getElementById("go-top").style.display = "none";
        }

    };
};

//=============================================================================
// get events information
//=============================================================================
function getEvents(){
    getFile('events', 'events-list.txt', function onOk(fileContent) {
        events = parseEventsFile(fileContent);
        createDomEvents(events);
        console.log(events);
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
//=============================================================================
function parseEventsFile(fileContent) {
    events = [];
    var lines = fileContent.split('\n');
    for (lineIndex in lines) {
        var curLine = lines[lineIndex];
        if (!curLine || curLine.length == 0) {
            continue;
        }

        var splittedLineParts = curLine.split(',');
        var event = {
            day:         splittedLineParts[0].trim(),
            month:       splittedLineParts[1].trim(),
            subject:     splittedLineParts[2].trim(),
            description: splittedLineParts[3].trim()
        };

        events.push(event);
    };
    // for debug
    events.push({day: 12,month:'ינואר',subject: 'xhdkdkasd',description: 'cc jcja cjac cnjnd jdkdjd cjjc kjc cjkjskdj'});
    events.push({day: 12,month:'ינואר',subject: 'xhdkdkasd',description: 'cc jcja cjac cnjnd jdkdjd cjjc kjc cjkjskdj'});
    events.push({day: 12,month:'ינואר',subject: 'xhdkdkasd',description: 'cc jcja cjac cnjnd jdkdjd cjjc kjc cjkjskdj'});
    events.push({day: 12,month:'ינואר',subject: 'xhdkdkasd',description: 'cc jcja cjac cnjnd jdkdjd cjjc kjc cjkjskdj'});
    events.push({day: 12,month:'ינואר',subject: 'xhdkdkasd',description: 'cc jcja cjac cnjnd jdkdjd cjjc kjc cjkjskdj'});
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

// back Button Clicked.
//=============================================================================
function backButtonClicked() {
    window.location="index.html";
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




