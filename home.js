$(document).ready(function () {

    let iframe = $('#hero_video iframe');
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)') === true || window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;

    if (!!isReduced && iframe.length > 0) {
        
        let player = new Vimeo.Player(iframe);
        let play = $('#hero_video_play');
        play.show().on('click', function() {
            player.play();
            play.hide();
        });
    }
});