

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
	cv.strokeStyle = "#000000";
	cv.lineWidth = 4.0;

	for (var i in theRoom) {
		if (theRoom[i]) {
			alert(theRoom[i].x + "     " + theRoom[i].y);
			cv.moveTo(theRoom[i].x*80, theRoom[i].y*80);
			cv.lineTo(theRoom[i+1].x*80, theRoom[i+1].y*80);
			cv.closePath();	
		}
	}
}

drawBoard();

theRooms = Array();
theRooms[0] = [{x: 3, y: 0}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 9, y: 6}, {x: 11, y: 6}, {x: 11, y:0}];
drawRoom(theRooms[0]);


