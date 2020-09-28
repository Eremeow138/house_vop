$(function () {
    console.log('check');
    // Проверяем наличие элемента с классом js_youtube
    if ($(".js_youtube")) {
    	// Перебираем все элементы js_youtube
        $(".js_youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру и вывести фоном
            // $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
            // $(this).css('background-image', 'img/prev_video.jpg');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

        });

        // При клике на картинку-превьюшку или кнопку play
        $('.video__play, .video__prev').on('click', function () {
        	// Получаем ID youtube видео
            var videoId = $(this).closest('.js_youtube').attr('id');
            // создаем iframe со включенной опцией autoplay
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            // Можно завести data-атрибуты для доп параметров. не обязательно.
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
                'allow': 'autoplay',
            });

            // Выводим HTML5 плеер с YouTube поверх превьюшек
            $(this).closest('.video__wrapper').append(iframe);
            
        });
    }

});
// ytp-large-play-button ytp-button
