// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Book tickets
// @author       Nishanth
// @match        https://in.bookmyshow.com/buytickets/agnyaathavaasi-hyderabad/*
// @grant        none
// ==/UserScript==

var date = 10, interval = 30;
var theatres = {};
theatres['Sree Ramana 70MM 4K & Dolby 7.1: Amberpet'] = 1;
theatres['Prasads: Hyderabad'] = 2;
theatres['Sandhya 70mm: RTC X Roads'] = 3;
theatres['Sandhya 35mm: RTC X Roads'] = 4;
theatres['INOX: Maheshwari Parmeshwari Mall, Kachiguda'] = 5;
theatres['Devi 70mm 4K & Dolby Atmos: RTC X Roads'] = 6;
theatres['Tarakarama Cineplex: Kachiguda'] = 7;
var audioLink = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

(function() {
    'use strict';
    // Your code here...
})();
function readDocument() {
    var x = document.getElementsByClassName("date-container");
    var today = new Date();
    console.log("checked on:" +
                today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    var curDate = today.getDate();
    if (curDate > date) {
        window.alert("Sorry to break this to you but we cant go back in time\n. Your ship has already sailed");
        return;
    }
    var dateSearchString = "<div>"+date+"<br>";
    if (x[0].innerHTML.search(dateSearchString)!=-1) {
        console.log("found date " + date);
        aVN_details.forEach(searchForTheatre);
    } else {
        var pos = -1;
        if (curDate == date)
            pos = x[0].innerHTML.search("TODAY");
        else if (curDate == date-1)
            pos = x[0].innerHTML.search("TOM");
        if (pos != -1) {
            console.log("we found either today or tomorrow, checking for theatre");
            aVN_details.forEach(searchForTheatre);
        } else {
            console.log("Either bookings for your movie is't open yet or this movie is not gonna be there till then.");
            stateChange(-1);
        }
    }
}
function playSound() {
    var audio = new Audio(audioLink);
    audio.play();
}
function searchForTheatre(item) {
    console.log("is this what we want? " + item.VenueName);
    if (theatres.hasOwnProperty(item.VenueName) || Object.keys(theatres).length === 0) {
        console.log("we found it! " + item.VenueName);
        playSound();
    } else {
        stateChange(-1);
    }
}

function stateChange(newState) {
    setTimeout(function () {
        if (newState == -1) {
            location.reload(true);
        }
    }, 1000 * interval);
}
