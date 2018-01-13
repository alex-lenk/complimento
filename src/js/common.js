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



    /* BEGIN инициализация плагина для главной страницы */

    $('#fullpage').fullpage();

    /* END */



    /* BEGIN инициализация карусели товаров в боковых панелях my-wishlist и my-bag */

    var swiper = new Swiper('.wishlist-carousel', {
        slidesPerView: 1,
        slidesPerColumn: 2,
        spaceBetween: 0,
        navigation: {
            nextEl: '.nav-products-next',
            prevEl: '.nav-products-prev',
        }
    });

    /* END wishlist-carousel */



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
            $('.flying-message').fadeOut();
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



    (function($) {
        $(function() {
            $('select').styler();
        });
    })(jQuery);

});
