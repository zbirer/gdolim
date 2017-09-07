
    obj = {"data": [
            {"date":"7/4/2017",
             "event":"ארועי החופש הגדול",
             "details":"https://www.gdolim.org.il/event/%D7%A9%D7%99%D7%98-%D7%91%D7%A1%D7%A4%D7%99%D7%A0%D7%AA-%D7%9E%D7%A4%D7%A8%D7%A9%D7%99%D7%9D-%D7%91%D7%99%D7%9D-%D7%94%D7%A6%D7%A4%D7%95%D7%A0%D7%99-%D7%A9%D7%9C-%D7%94%D7%95%D7%9C%D7%A0%D7%93-%D7%9C/" },
            {"date":"7/4/2017",
             "event":"גדולים מהחיים",
             "details":"https://www.gdolim.org.il"}
             ]
           };
    drawTable(obj.data);



function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function parseDate(input) {
var objDate = new Date(input),
    locale = "he",
    month = objDate.toLocaleString(locale, { month: "long" });
    day = objDate.getDate();
    year = objDate.getFullYear();
    date = {"day": day ,
    "month" : month,
    "year" : year};


  return date;
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
//  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

function drawRow(rowData) {
    var date = parseDate(rowData.date);
    var row = $('<div class="swm_event_box">')
    $("#eventsContainer").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($('<div class="swm_evt_date"><span class="swm_evt_date_day">'+ date.day+'</span> <span class="swm_evt_date_month">'+date.month+'</span><span class="swm_evt_date_year">'+date.year+'</span></div>'));
    row.append($('<div class="swm_evt_title"><a href='+rowData.details+' title="" role="link">'+ rowData.event +'</a></div><div class="swm_evt_desc"><p>נופש המאפשר הפוגה משגרת החיים, ממנוחה בין הטיפולים ומזמן איכות לחיזוק המשפחה.</p><p class="recent_events_read_more_link"><a href="https://www.gdolim.org.il/event/%d7%a0%d7%95%d7%a4%d7%a9-%d7%94%d7%97%d7%9c%d7%9e%d7%94-%d7%9c%d7%9e%d7%a9%d7%a4%d7%97%d7%95%d7%aa-%d7%91%d7%90%d7%99%d7%9c%d7%aa-4/" target="_self" role="link">עוד פרטים <i class="fa fa-angle-right"></i></a></p></div><div class="swm_evt_meta_venue"> <i class="fa fa-map-marker"></i><span class="adr"><span class="locality">אילת</span><span class="delimiter">,</span><span class="country-name">Israel<span class="seperator">.</span></span></span></div>'))
//    row.append($("<div>" + rowData.event + "</div>"));
//    row.append($('<div>' + '<a href='+rowData.details+' target="_self" role="link">.. פרטים</div>'));
}
