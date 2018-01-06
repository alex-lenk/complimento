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
    /*


     /!* BEGIN .header-search and .nav-wrap *!/

     var headerSearch = $('.header-search'),
     navWrap = $('.nav-wrap'),
     headerSearchNav = 'header-search-nav',
     headerSearchOpened = 'header-search-opened',
     navWrapOpened = 'nav-wrap-opened',
     domBody = $('body'),
     openWindow = 'open-window';

     $('.header-nav-toggle').click(
     function () {
     navWrap.toggleClass(navWrapOpened);
     domBody.toggleClass(openWindow);
     headerSearch.toggleClass(headerSearchOpened).toggleClass(headerSearchNav);
     }
     );

     $('.icon-search').click(
     function () {
     headerSearch.toggleClass(headerSearchOpened);
     domBody.toggleClass(openWindow);
     }
     );

     $('.header-cancel').click(
     function () {
     headerSearch.removeClass(headerSearchOpened);
     navWrap.removeClass(navWrapOpened);
     headerSearch.removeClass(headerSearchNav);
     domBody.toggleClass(openWindow);
     }
     );

     /!* END .header-search and .nav-wrap *!/


     /!* BEGIN header-modal-bag *!/

     var headerModalBag = $('.header-modal-bag'),
     headerBagOpen = 'modal-bag-open';

     $('.header-modal-bag-close').click(
     function () {
     headerModalBag.removeClass(headerBagOpen);
     domBody.toggleClass(openWindow);
     }
     );

     $('.header-basket').click(
     function () {
     headerModalBag.toggleClass(headerBagOpen);
     domBody.toggleClass(openWindow);
     }
     );

     /!* END header-modal-bag *!/


     /!* BEGIN header-catalog *!/

     var headerCatalog = $('.header-catalog'),
     headerCatalogOpen = 'header-catalog-open';

     $('.header-catalog-close').click(
     function () {
     headerCatalog.removeClass(headerCatalogOpen);
     domBody.toggleClass(openWindow);
     }
     );

     $('.menu-catalog').click(
     function () {
     headerCatalog.toggleClass(headerCatalogOpen);
     domBody.toggleClass(openWindow);
     }
     );

     /!* END header-catalog *!/


     /!* BEGIN home-sales *!/

     var salesControlLeft = $('.sales-control-left'),
     salesLeft = $('.sales-left'),
     salesRight = $('.sales-right'),
     salesControlRight = $('.sales-control-right'),
     salesActive = 'sales-active',
     salesControlCurrent = 'sales-control-current';

     salesControlLeft.click(
     function () {
     $(this).toggleClass(salesControlCurrent);
     salesControlRight.toggleClass(salesControlCurrent);
     salesLeft.addClass(salesActive);
     salesRight.removeClass(salesActive);
     }
     );

     salesControlRight.click(
     function () {
     $(this).toggleClass(salesControlCurrent);
     $(salesControlLeft).toggleClass(salesControlCurrent);
     salesRight.addClass(salesActive);
     salesLeft.removeClass(salesActive);
     }
     );

     /!* END home-sales *!/


     /!* Begin Swiper slider .popular-items-slider *!/

     var popularItems = new Swiper('.popular-items-slider', {
     navigation: {
     nextEl: '.popular-items-next',
     prevEl: '.popular-items-prev'
     },
     effect: 'fade',
     pagination: {
     el: '.swiper-pagination',
     clickable: true,
     }
     });

     /!* END Swiper slider .popular-items-slider *!/


     /!* Begin animate scroll elements *!/

     $(function () {
     $('.header-down').on('click', function (e) {
     $('html,body').stop().animate({scrollTop: $('#home-popular').offset().top}, 1000);
     e.preventDefault();
     });
     });

     /!* END animate scroll elements *!/


     /!* BEGIN находим определенный символ в строке и удаляем в фильтре на странице каталога *!/

     $('.mfilter-price-inputs').html(function (_, oldHtml) {
     return oldHtml.replace(/\$/g, '');
     });

     /!* END в фильтре на странице каталога *!/


     /!* BEGIN: Плавающий блок в сайдбаре *!/

     var $window = $(window), //Основное окно
     $catalogSidebarFixed = $(".catalog-sidebar-fixed"); // Блок, который нужно фиксировать при прокрутке

     if ($catalogSidebarFixed.length) {
     $h = $catalogSidebarFixed.offset().top; // Определяем координаты верха нужного блока (например, с навигацией или виджетом, который надо фиксировать)

     $window.on('scroll', function () {
     // Как далеко вниз прокрутили страницу
     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

     // Если прокрутили скролл ниже макушки нужного блока, включаем ему фиксацию
     if (scrollTop > $h) {

     $catalogSidebarFixed.addClass("fixed");
     // Иначе возвращаем всё назад
     } else {
     $catalogSidebarFixed.removeClass("fixed");
     }
     });
     }

     /!* END catalog-sidebar-fixed *!/


     /!* BEGIN закрывает блок added-bag на странице с каталогом *!/

     $('.added-bag-close').click(
     function () {
     $('.added-bag').fadeOut();
     }
     );

     /!* END added-bag *!/


     /!* BEGIN: открытие и закрытие панели catalog-sidebar *!/

     $('.filter-icon-wrap').click(
     function () {
     $('.catalog').toggleClass('catalog-sidebar-opened');
     }
     );
     $('.catalog-sidebar-close').click(
     function () {
     $('.catalog').toggleClass('catalog-sidebar-opened');
     }
     );

     /!* END catalog-sidebar *!/


     /!* BEGIN: всплывающая форма на странице контактов contacts-form *!/

     var contactsForm = $('.contacts-form'),
     contactsFormOpened = 'contacts-form-opened';

     $('.contacts-block-order').click(
     function () {
     contactsForm.toggleClass(contactsFormOpened);
     }
     );

     $('.contacts-form-close').click(
     function () {
     contactsForm.removeClass(contactsFormOpened);
     }
     );

     /!* END catalog-sidebar *!/


     /!* BEGIN: всплывающая форма на странице продукта *!/

     var tailoredOrder = $('.tailored-order'),
     tailoredOrderOpened = 'tailored-order-opened';

     $('.tailored-btn').click(
     function () {
     tailoredOrder.toggleClass(tailoredOrderOpened);
     $(this).toggleClass('btn-gray-full');
     }
     );

     $('.tailored-order-close').click(
     function () {
     tailoredOrder.removeClass(tailoredOrderOpened);
     }
     );

     /!* END catalog-sidebar *!/


     /!* BEGIN: всплывающий блок для вскрытия выбора размера *!/

     var catalogItemOption = $('.catalog-item-option'),
     catalogItemOptionOpened = 'catalog-item-option-opened';

     $('.catalog-item-order-basket').click(
     function () {
     catalogItemOption.toggleClass(catalogItemOptionOpened);
     }
     );

     $('.popular-items-basket').click(
     function () {
     $(this).parent().next().toggleClass(catalogItemOptionOpened);
     $(this).toggleClass('btn-black-full');
     }
     );

     /!* END catalog-item-order-basket *!/


     /!* BEGIN: всплывающий блок для вскрытия выбора размера *!/

     $('.wishlist-active').click(
     function () {
     $(this).toggleClass('wishlist-active-added');
     }
     );

     /!* END wishlist-active *!/



     (function($) {
     $(function() {

     $('select').styler();

     });
     })(jQuery);

     */

    $(".form-control, .ui-field").change(function () {
        if ($(this).val().trim().length) {
            $(this).parent().addClass("field-filled");
        } else {
            $(this).parent().removeClass("field-filled");
        }
    });

    $('#fullpage').fullpage();


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

    /* END panel-basket и panel-wishlist */
});
