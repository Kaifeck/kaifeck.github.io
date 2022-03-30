window.onload = function() {

    var pageTitle = document.title;
    var attentionMessage = 'Don\'t you hate when sites do this!';
    var isntThisAnnoying = 'Isn\'t this annoying?'
    var blinkEvent = null;

    document.addEventListener('visibilitychange', function(e) {
        var isPageActive = !document.hidden;

        if(!isPageActive){
            blink();
        }else {
            document.title = pageTitle;
            clearInterval(blinkEvent);
        }
    });

    function blink(){
        blinkEvent = setInterval(function() {
            if(document.title === attentionMessage){
                document.title = isntThisAnnoying;
            }else {
                document.title = attentionMessage;
            }
        }, 100);
    }
};