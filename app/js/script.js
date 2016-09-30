(function () {
    'use strict';

    window.onload = windowLoad;

    var chanceId = 1;
    var i = 0;
    var interval;

    var lockDisplay;
    var selfUser;
    var currentUser;

     function showUser(currentUser){
         lockDisplay.innerHTML = '<span class="opacity-6">Lock Acquied - </span> <span class="strong">' + currentUser.name + '</span>';
     }
    
    function windowLoad() {

        //  var socket = io('/my-namespace');
        //  socket.on('shubh', function(msg){
        //     console.log(msg);
        // });
        var socket = io();
         socket.on('lightboard', function(msg){
            console.log('hit by client',msg);
            currentUser = msg.currentUser;
            showUser(currentUser);
            msg.cellObj ? setColor(msg.cellObj) : null;
        });

        getSelfUserDetail("/currentUser");

        var table = document.getElementById("lightbox");
        lockDisplay = document.getElementById('lock-display');
        var title = document.getElementById('title');

        for (var i = 0; i < 10; i++) {
            var row = table.insertRow(0);
            for (var j = 0; j < 10; j++) {
                var cell1 = row.insertCell(0);
                cell1.onclick = callFunction;
            }
        }

        function callFunction(p) {
            if(selfUser.id != currentUser.id)
                return false;
            var cellObj = {row : p.path[1].rowIndex, column : p.srcElement.cellIndex};
            // setColor(cellObj);

            socket.emit('lightboard', cellObj);
        }

        function setColor(cellObj){
            table.rows[cellObj.row].cells[cellObj.column].style.background = currentUser.color;
        }

        function getSelfUserDetail(url){
            var xhr = new XMLHttpRequest(), method = "GET", url = url;

            xhr.open(method, url, true);
            // xhr.setRequestHeader("Authorization", "AuthSub token=" + AccessToken);
            xhr.onreadystatechange = function () {
                    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        selfUser = JSON.parse(xhr.responseText);
                        
                        title.innerHTML ='Current user is '+ selfUser.name + ' and color is '+ selfUser.colorAlias;
                    }
                };
            xhr.send();
        }


    };

})();
