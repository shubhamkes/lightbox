(function () {

    window.onload = windowLoad;

    var chanceId = 1;
    var i = 0;
    var interval;

    var lockDisplay;

    var user = 
    [{
        id : 1,
        name : 'Masterdo',
        color : 'linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)'
    },
    {
        id : 2,
        name : 'Hudda',
        color : 'linear-gradient(135deg, rgba(255,174,39,1) 0%,rgba(222,73,109,1) 100%)'
    }]; 

    var currentUser = user[0];

    startPoll();

    function startPoll(){
        interval = setInterval(poll, 3000);
    }

     function poll(){
        i++;
        if(i==2){
            i = 0;
        }
        currentUser = user[i];
        showUser(currentUser)
     }

     function showUser(currentUser){
         lockDisplay.innerHTML = '<span class="opacity-6">Lock Acquied - </span> <span class="strong">' + currentUser.name + '</span>';
     }
    
    // user having 1 would have green color,  user having 2 would have red color

    function windowLoad() {
        var table = document.getElementById("lightbox");
        lockDisplay = document.getElementById('lock-display');

        for (var i = 0; i < 10; i++) {
            var row = table.insertRow(0);
            for (var j = 0; j < 10; j++) {
                var cell1 = row.insertCell(0);
                cell1.onclick = callFunction;
                // cell1.setAttribute('onclick', 'callFunction()');

            }
        }

        showUser(currentUser);

        function callFunction(p) {
            var row = p.path[1].rowIndex;
            var column = p.srcElement.cellIndex;
            if(table.rows[row].cells[column].style.background == 'red'){
                table.rows[row].cells[column].style.background = currentUser.color;
            }else{
                table.rows[row].cells[column].style.background = currentUser.color;
            }

            poll();
            clearInterval(interval);
            startPoll();
        }

        

    };

})();

