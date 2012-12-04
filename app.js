var jqt = new $.jQTouch();

$(function() {
    /* Gallery */
    $('#fotos').on('pageAnimationEnd', function() {
        var swipe = new Swipe(document.getElementById('gallery'));
    });


    /* Concerts */
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist=The+Rolling+Stones&api_key=b8505779457e587972157f50108505dd&format=json', function(data) {
        $.each(data.events.event, function(i, event) {
            var date = new Date(event.startDate);
            $('#konzerte ul').append('<li><div class="date">' + date.getDate() + '.' + date.getMonth() + '.</div><div class="venue">' + event.venue.name + '</div><div class="location">' + event.venue.location.city + ', ' + event.venue.location.country + '</div></li>');
        });
    });


    /* Snapshot */
    function captureSuccess(files) {
        var ft = new FileTransfer();
        ft.upload(files[0].fullPath, 'http://pb.local:5000/upload/', uploadSuccess, uploadError);
    }

    function captureError(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }

    function uploadSuccess(result) {
        navigator.notification.vibrate();
    }

    function uploadError(error) {
        navigator.notification.alert('Error uploading file: ' + error.code);
    }

    $('.button.snap').on('tap', function() {
        navigator.device.capture.captureImage(captureSuccess, captureError);
    });


    /* Compass */
    function compassSuccess(heading) {
        $('#heading').text(heading.magneticHeading + '°');
    }

    function compassError(error) {
        navigator.notification.alert('Compass error: ' + error.code);
    }

    function startCompass() {
        navigator.compass.watchHeading(compassSuccess, compassError);
    }

    document.addEventListener('deviceready', startCompass, false);
});
