$(document).ready(function () {

// Исправление бага в IE на телефонах - copyright 2014-2017 The Bootstrap Authors

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
            )
        );
        document.head.appendChild(msViewportStyle)
    }

    /* END */


    /* BEGIN инициализация плагина для главной страницы */

    $('#fullpage').fullpage();

    /* END */



    /* BEGIN инициализация карусели товаров в боковых панелях my-wishlist и my-bag */

    var swiper = new Swiper('.wishlist-carousel', {
        spaceBetween: 0,
        navigation: {
            nextEl: '.nav-products-next',
            prevEl: '.nav-products-prev'
        },
        breakpoints: {
            2560: {
                slidesPerColumn: 2,
                slidesPerView: 1
            },
            1099: {
                slidesPerColumn: 1,
                slidesPerView: 2
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            567: {
                slidesPerColumn: 1,
                slidesPerView: 1
            }
        }
    });

    /* END wishlist-carousel */



    /* BEGIN инициализация плагина для кастомизации select тегов */

    (function ($) {
        $(function () {
            $('select').styler();
        });
    })(jQuery);

    /* END */



    /* BEGIN добавление класса input полям, если они были заполнены пользователем */

    var uiField = $(".form-control, .ui-field"),
        fieldFilled = "field-filled";

    uiField.change(function () {
        if ($(this).val().trim().length) {
            $(this).parent().addClass(fieldFilled);
        } else {
            $(this).parent().removeClass(fieldFilled);
        }
    });

    uiField.each(function () {
        if (this.value !== "") {
            $(this).parent().addClass(fieldFilled);
        }
    });

    /* END */



    /* BEGIN Для открытия и закрытия боковых панеле panel-basket и panel-wishlist */

    var myWishlistOpened = 'my-wishlist__opened',
        myBagOpened = 'my-bag__opened',
        pageMenuOpened = 'page-menu__opened',
        elementBody = $('body');

    $('.panel-wishlist').click(
        function () {
            elementBody.toggleClass(myWishlistOpened);
        }
    );


    $('.panel-basket').click(
        function () {
            elementBody.toggleClass(myBagOpened);
        }
    );


    $('.open-menu').click(
        function () {
            elementBody.toggleClass(pageMenuOpened);
        }
    );

    /* END panel-basket и panel-wishlist */



    /* Для закрытия панелей состояния отправки сообщений message-successfully и message-wrong */

    $('.flying-message-close').click(
        function () {
            $(this).parent().parent().fadeOut();
        }
    );

    /* END message-successfully и message-wrong */



    /* BEGIN действия для формы заказа товара на странице продукта */

    var makeOrder = '.make-an-order',
        orderFormOpened = 'order-form__opened';

    $(makeOrder).click(
        function () {
            $(this).parent().next().addClass(orderFormOpened);
            $(this).prop("disabled", true);
        }
    );

    $('.order-form__close').click(
        function () {
            $(this).parent().removeClass(orderFormOpened);
            $(this).parent().parent().find(makeOrder).prop("disabled", false);
        }
    );

    /* END */



    /* BEGIN Для страницы gallery. Открытие панели с фильтрами. Инициализация и перестройка блоков с изображениями */

    var grid = $('.grid'),
        filterGalleryPoint = $('.filter-gallery__point'),
        filterGalleryCurrent = 'filter-gallery__current';


    $('.filter-gallery__label').click(
        function () {
            $(this).parent().toggleClass('filter-gallery__opened');
            $('.filter-gallery__list').toggle('medium');
        }
    );

    grid.isotope({
        itemSelector: '.grid-item'
    });

    filterGalleryPoint.click(function () {

        filterGalleryPoint.removeClass(filterGalleryCurrent);
        $(this).addClass(filterGalleryCurrent);

        var selector = $(this).attr('data-filter');

        grid.isotope({
            filter: selector,
            animationOptions: {
                duration: 1000,
                easing: 'easeOutQuart',
                queue: false
            }
        });
        return false;

    });

    /* END */


    /* BEGIN инициализация слайдеров на странице товаров */

    var galleryMain = new Swiper('.gallery-product__main', {
        spaceBetween: 10,
        simulateTouch: false,
        lazy: true,
        effect: 'fade'
    });
    var galleryThumbs = new Swiper('.gallery-product__thumbs', {
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        lazy: true,
        direction: 'vertical'
    });
    galleryMain.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryMain;

    /* END */

    /* BEGIN: wishlist-active */

    $('.wishlist-active').click(
        function () {
            $(this).toggleClass('wishlist-active-added');
        }
    );

    /* END wishlist-active */


});