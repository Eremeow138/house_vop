window.onload = function () {
    hideLoader($('body'), false, 1);
};

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
// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
$('a[href^="#"]').click( function(e){
    e.preventDefault();
    var scroll_el = $(this).attr('href');
    if (scroll_el == "#") {
        return false;
    }

	if ($(scroll_el).length != 0) {


        $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);

	}
    $(this).blur();
	return false;
});

function hideMenu() {

    $('.navbar__link').on('click', function() {

            $('#hamburger').prop('checked', false);
    });


}
hideMenu();

$('input').on('keyup', function() {
    checkFiels($(this));
});

//здесь мы прверяем форму и если какое то поле не заполенно - отменяем submit
$('[type=submit]').on('click', function(e) {
    // Отменяем стандартное действие.
    // В данном случае отправку формы после нажатия унопки с type=submit
    // e.preventDefault();
    // let fields = $('#form').find('[required]'),
    let form = $(this).closest('form');
    let fields = form.find('[required]'),
    // // Создаем переменную для счетчика пустых полей
    empty = 0;

    fields.each(function(index, el) {
        // Проверяем пустое ли поле
        if ($(this).val() === '') {
            // Увеличиваем счетчик полей на 1
            empty++;
            // console.log(this);
        }
        checkFiels($(this));
    });
    if (empty>0) {
        e.preventDefault();
    }



});
function send(event, php){
    //тут мы получаем id элемента по вызванному событию, а потом кормим Jquery, чтобы получить нужный элемент
let idForm = '#'+event.target.id;
console.log(idForm);

// console.log($(cName));
showLoader($(idForm), true);

        // подготавливаем модальное окно с сообщением
        let modal = $('#info'),
            message = modal.find('.info__message');

        modal.on('hidden.bs.modal', function (e) {
            message.html('');
        });
        console.log(modal);
        // event.preventDefault ? event.preventDefault() : event.returnValue = false;
        if (event.preventDefault) {
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
        var req = new XMLHttpRequest();
        req.open('POST', php, true);
        req.onload = function() {
        	if (req.status >= 200 && req.status < 400) {
        	json = JSON.parse(this.response); // Ебанный internet explorer 11
            	console.log(json);

            	// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            	if (json.result == "success") {
            		// Если сообщение отправлено
            		// alert("Сообщение отправлено");
                    // Пример с открытием окна
                    hideLoader($(idForm),true);
                    modal.modal('show');
                    message.html('Ваша форма успешно отправлена. <br> Мы свяжемся с вами в ближайшее время.');
            	} else {
            		// Если произошла ошибка
            		// alert("Ошибка. Сообщение не отправлено");
                    // Пример с открытием окна
                    hideLoader($(idForm),true);
                    modal.modal('show');
                    message.html('Ошибка. Сообщение не отправлено '+req.status);
            	}
            // Если не удалось связаться с php файлом
            // } else {alert("Ошибка сервера. Номер: "+req.status);}};
            } else {
                hideLoader($(idForm),true);

                 modal.modal('show'); message.html('Ошибка сервера. Номер: '+req.status);}};

        // Если не удалось отправить запрос. Стоит блок на хостинге
        // req.onerror = function() {alert("Ошибка отправки запроса");};
        req.onerror = function() {
            hideLoader($(idForm),true);

             modal.modal('show'); message.html('Ошибка отправки запроса');};
        // console.log(event.target);
        // console.log($('#form').submit());
        req.send(new FormData(event.target));
        // req.send(new FormData($('#form')));
    // }

}

function modalClose(){
    $('.modal-close').on('click', function() {
        $(this).closest('.modal').modal('hide');
        if ($('.modal.in').length > 0) {

            $('body').addClass('modal-open');
        }
        // console.log($('.modal.in'));
    } );
}
modalClose();
// функция смены внешнего вида полей
function checkFiels(el) {
    // При разных условиях меняем классы и внешний вид полей
    if (el.val() === '') {
        el.addClass('invalid');
        el.removeClass('valid');
    } else {
        el.removeClass('invalid');
        el.addClass('valid');
    }
}

function showLoader(el, target, background) {
    let targ ='';
    let backg = '';
    if (background) {
        backg='loader_bgTransparent';
    }
    if (target) {
        targ='loader_targeting';
    }
    el.append(`<div class="loader `+targ+` `+backg+`">
    <div class="loader__wrapper">
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__ball"></div>
    </div>
</div>`);
}



// Скрыть лоадер при загрузке товаров
function hideLoader(el, del = false, time = 10 ) {
    if (del) {
        el.children('.loader').remove();
    }

    el.children('.loader').addClass('loaded');
    setTimeout(function () {
        el.children('.loader').addClass('loaded_hide');
    }, time);
}
