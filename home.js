$(document).ready(function () {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)') === true || window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;

    if (!!isReduced) {
        let iframe = $('#hero_video iframe');
        let player = new Vimeo.Player(iframe);
        let play = $('#hero_video_play');
        play.show().addEventListener('click', function() {
            player.play();
            play.hide();
        });
    }
});