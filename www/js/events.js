var text = '{"data":[' +
'{"date":"7/4/2017","event":"ארועי החופש הגדול" },' +
'{"date":"7/4/2017","event":"רישום לקיטנות" },' +
'{"date":"7/4/2017","event":"גדולים מהחיים"}]}';

    obj = JSON.parse(text);
    drawTable(obj.data);



function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<tr />")
    $("#personDataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.date + "</td>"));
    row.append($("<td>" + rowData.event + "</td>"));
}