

drawBoard = function () {

	var elem = document.getElementById('brd');
	var cv = elem.getContext('2d');
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

drawRoom = function(theRoom) {

	var elem = document.getElementById('brd');
	var cv = elem.getContext('2d');
	cv.strokeStyle = theRoom[0];
	cv.lineWidth = 6.0;
	cv.beginPath();

	for(i = 0; i < theRoom[1].length; i++) {
		if (theRoom[1][i+1] != null) {
			cv.moveTo(theRoom[1][i].x*80, theRoom[1][i].y*80);
			cv.lineTo(theRoom[1][i+1].x*80, theRoom[1][i+1].y*80);
			cv.closePath();	
			cv.stroke();
		}
	}
}

drawBoard();

theRooms = Array();
theRooms.push(["#FF0000", [ {x: 0, y: 5}, {x: 6, y: 5}, {x: 6, y: 0} ]]);
theRooms.push(["#00FF00", [ {x: 26, y: 0}, {x: 26, y: 5}, {x: 28, y: 5}, {x: 28, y: 7}, {x: 30, y: 7} ]]);
theRooms.push(["#0000FF", [ {x: 0, y: 26}, {x: 5, y: 26}, {x: 5, y: 28}, {x: 7, y: 28}, {x: 7, y: 30} ]]);
theRooms.push(["#FF00FF", [ {x: 30, y: 25}, {x: 24, y: 25}, {x: 24, y: 30} ]]);
theRooms.push(["#000000", [ {x: 12, y: 12}, {x: 18, y: 12}, {x: 18, y: 18}, {x: 12, y: 18}, {x: 12, y: 12} ]]);
//theRooms.push(["#0F0F0F", [{x: 3, y: 0}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 9, y: 6}, {x: 11, y: 6}, {x: 11, y:0}]]);
//theRooms.push(["#FF0000", [{x: 3, y: 0}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 9, y: 6}, {x: 11, y: 6}, {x: 11, y:0}]]);
//theRooms.push(["#FF0000", [{x: 3, y: 0}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 9, y: 6}, {x: 11, y: 6}, {x: 11, y:0}]]);

for (r in theRooms) drawRoom(theRooms[r]);



