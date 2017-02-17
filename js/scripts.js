
var timer = null;
var pulseWidth = 5;
var pulseUp = true;

var cells = Array(30);
for (var i  = 0; i < cells.length; i++) {
    cells[i] = Array(30);
    for (var j = 0; j < cells[i].length; j++) cells[i][j] = 0;
}


drawBoard = function () {
    var elem = document.getElementById('brd');
    var cv = elem.getContext('2d');
    cv.clearRect(0, 0, elem.width, elem.height);


    var i, j;

    cv.strokeStyle = "#E88310";
    cv.lineWidth = 1.0;
    cv.beginPath();
    for (i = 0; i < 2400; i+=80) {
        cv.moveTo((i-0.5), 0);
        cv.lineTo((i-0.5), 2400);
        cv.closePath();
        //cv.stroke();
    }
    for (i = 0; i < 2400; i+=80) {
        cv.moveTo(0, (i-0.5));
        cv.lineTo(2400, (i-0.5));
        cv.closePath();
        //cv.stroke();
    }
    cv.stroke();
    cv.lineWidth = 1.0;
    cv.strokeStyle = "#000000";
    //alert("grid generated");
};


drawRoom = function(theRoom, strokeWidth) {
    var elem = document.getElementById('brd');
    var cv = elem.getContext('2d');
    cv.strokeStyle = theRoom[0];
    cv.lineWidth = strokeWidth;
    cv.beginPath();

    for(i = 0; i < theRoom[1].length; i++) {
        if (theRoom[1][i+1] != null) {
            cv.moveTo(theRoom[1][i].x*80, theRoom[1][i].y*80);
            //cv.lineTo( (theRoom[1][i+1].x*80), (theRoom[1][i+1].y*80) );

            if (theRoom[1][i].x == theRoom[1][i+1].x && theRoom[1][i].y > theRoom[1][i+1].y &&
                theRoom[1][i+1].y != 0) {
                cv.lineTo(theRoom[1][i+1].x*80, (theRoom[1][i+1].y*80-cv.lineWidth/2) );
            } else if (theRoom[1][i].x == theRoom[1][i+1].x && theRoom[1][i].y < theRoom[1][i+1].y &&
                theRoom[1][i+1].y != 30) {
                cv.lineTo(theRoom[1][i+1].x*80, (theRoom[1][i+1].y*80+cv.lineWidth/2) );
            } else if (theRoom[1][i].y == theRoom[1][i+1].y && theRoom[1][i].x < theRoom[1][i+1].x &&
                theRoom[1][i+1].x != 30) {
                cv.lineTo( (theRoom[1][i+1].x*80+cv.lineWidth/2), (theRoom[1][i+1].y*80) );
            } else if (theRoom[1][i].y == theRoom[1][i+1].y && theRoom[1][i].x > theRoom[1][i+1].x &&
                theRoom[1][i+1].x != 0) {
                cv.lineTo( (theRoom[1][i+1].x*80-cv.lineWidth/2), (theRoom[1][i+1].y*80) );
            } else {
                cv.lineTo( (theRoom[1][i+1].x*80), (theRoom[1][i+1].y*80) );
            }

            cv.closePath();
            cv.stroke();
        }
    }
}

defineInteriorSpaces = function(theRoom) {
    // order coordinates by y-value
    for (var i = 1; i < theRoom[1].length; i++)
        if (theRoom[1][i-1].y > theRoom[1][i].y) {
            var temp = theRoom[1][i];
            theRoom[1][i] = theRoom[1][i-1];
            theRoom[1][i-1] = temp;
        }




}


pulse = function(tR) {
    if (pulseWidth == 21) pulseUp = false;
    else if (pulseWidth == 5) pulseUp = true;
    if (pulseUp) pulseWidth++;
    else pulseWidth--;
    drawAll();
    drawRoom(tR, pulseWidth);
}


highlightRoom = function(theRoom) {
    timer = setInterval( function(){pulse(theRoom)}, 30);
}


stopHighlight = function(theRoom) {
    clearInterval(timer);
    drawAll();
    drawRoom(theRoom, 10);
}


drawAll = function() {
    drawBoard();
    for (r in theRooms) drawRoom(theRooms[r], 10);
}



//-------------------------------------------------------------------------------

renderDice = function() {

    var result = 0;

    var num1 = Math.floor((Math.random() * 6)+1);
    var row = (num1 > 3) ? 1 : 0;
    var col = (num1%3 == 0) ? 2 : ((num1 == 2) || (num1 == 5)) ? 1 : 0;
    var die = document.getElementById("d1");
    die.style.backgroundImage = "url('img/dice.png')";
    die.style.backgroundPosition = (120-(col*40)) + "px " + (row*40) + "px";
    result += num1;

    var num2 = Math.floor((Math.random() * 6)+1);
    var rw = (num2 > 3) ? 1 : 0;
    var cl = (num2%3 == 0) ? 2 : ((num2 == 2) || (num2 == 5)) ? 1 : 0;
    var die2 = document.getElementById("d2");
    die2.style.backgroundImage = "url('img/dice.png')";
    die2.style.backgroundPosition = (120-(cl*40)) + "px " + (rw*40) + "px";
    result += num2;

    return result;
}

rollDice = function() {
    var result;
    var reps = 10 + Math.floor((Math.random() * 8)+1);
    for (var i = 0; i <= reps; i++) setTimeout(function(){result = renderDice();}, (i*150));
}


//-----------------------------------------------------------------------------

theRooms = Array();
theRooms.push(["#FF0000", [ {x: 0, y: 5}, {x: 6, y: 5}, {x: 6, y: 0} ]]);
theRooms.push(["#00FF00", [ {x: 26, y: 0}, {x: 26, y: 5}, {x: 28, y: 5}, {x: 28, y: 7}, {x: 30, y: 7} ]]);
theRooms.push(["#0000FF", [ {x: 0, y: 26}, {x: 5, y: 26}, {x: 5, y: 28}, {x: 7, y: 28}, {x: 7, y: 30} ]]);
theRooms.push(["#FF00FF", [ {x: 30, y: 25}, {x: 24, y: 25}, {x: 24, y: 30} ]]);
theRooms.push(["#000000", [ {x: 12, y: 12}, {x: 18, y: 12}, {x: 18, y: 18}, {x: 12, y: 18}, {x: 12, y: 12} ]]);
//theRooms.push(["#0F0F0F", [{x: 3, y: 0}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 9, y: 6}, {x: 11, y: 6}, {x: 11, y:0}]]);
//theRooms.push(["#FF0000", [{x: 3, y: 0}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 9, y: 6}, {x: 11, y: 6}, {x: 11, y:0}]]);
//theRooms.push(["#FF0000", [{x: 3, y: 0}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 9, y: 6}, {x: 11, y: 6}, {x: 11, y:0}]]);

drawAll();
highlightRoom(theRooms[1]);
//setTimeout(stopHighlight(theRooms[1]), 5000);

rollDice();




