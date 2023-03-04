//afm
const afm = { setCookie: (e, t, a) => { let o = new Date; o.setTime(o.getTime() + 864e5 * a); let r = "expires=" + o.toUTCString(); return document.cookie = e + "=" + t + "; " + r + "; path=/", !0 }, deleteCookie(e, t = "") { t && (t = " Domain=" + t + ";"), document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;" + t }, getURLParameters: e => { let t = window.document.URL.toString(); if (t.indexOf("?") > 0) { let a = t.split("?")[1].split("&"), o = new Array(a.length), r = new Array(a.length), m = 0; for (m = 0; m < a.length; m++) { let e = a[m].split("="); o[m] = e[0], "" != e[1] ? r[m] = unescape(e[1]) : r[m] = "" } for (m = 0; m < a.length; m++)if (o[m] == e) return r[m]; return "" } }, getCookie: e => { let t = e + "=", a = document.cookie.split(";"); for (let e = 0; e < a.length; e++) { let o = a[e]; for (; " " == o.charAt(0);)o = o.substring(1); if (0 == o.indexOf(t)) return o.substring(t.length, o.length) } return "" } }; let source = afm.getURLParameters("utm_source"), param = afm.getURLParameters("utm_param"), rd = afm.getURLParameters("rd"), afmCookie = ""; if (afm.getURLParameters("utm_medium") && !param && (param = afm.getURLParameters("utm_medium")), void 0 !== typeof source && source) { let e = source.toLowerCase(), t = window.location.hostname; "affmates" == e && (afm.deleteCookie("_aff_sid"), afm.deleteCookie("_aff_sid", t), afm.deleteCookie("_aff_network"), afm.deleteCookie("_aff_network", t), afm.deleteCookie("APINFO"), afm.deleteCookie("APINFO", t), afm.deleteCookie("apinfo"), afm.deleteCookie("apinfo", t)), "affmates" == e && void 0 !== typeof param && param && (rd = rd ? parseInt(rd) : 30, afmCookie = param, afm.setCookie("afm_net", param, rd)) }

$(function () {
    //$('.lazy').lazy();

    $('.header_main__logo img').attr('width', $('.header_main__logo').width()).attr('height', $('.header_main__logo').height());
    $('.carousel-item img').attr('width', $('.carousel-item').width()).attr('height', $('.carousel-item').height());
    $('.bannerWeb img').attr('width', $('.bannerWeb').width()).attr('height', $('.bannerWeb').height());
    $('.list_product_search img').attr('width', $('.list_product_search .item').width()).attr('height', $('.list_product_search .item').height());
    //thumb_product
    //$('.productMain_list__item___thumbnail img').attr('width', $('.productMain_list__item___thumbnail').width()).attr('height', $('.productMain_list__item___thumbnail').height());

    $('.footer img').attr('width', $('.footer img').width()).attr('height', $('.footer img').height());
    $('.footer a img').attr('width', 123).attr('height', 47);

    //scroll top
    $('.scroll').click(function () {
        $('html, body').animate({
            scrollTop: $(body).offset().top
        }, 500);
    })
    $(window).scroll(function () {
        $(document).scrollTop() > 1e3 ? $('.scroll').show() : $('.scroll').hide()
    });

    var header = document.getElementById('headerMain');
    var sticky = header.offsetTop;
    window.onscroll = function () {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };

    $('.nav_menu li .submenu').each(function () {
        if ($(this).height() > 450) {
            $(this).css({ 'max-height': '450px', 'overflow-y': 'scroll' });
        }
    })

    $('.toggle-search').click(function () {
        $('.header_main__search').toggleClass('open');
        $('.input-width-button input[type="text"]').focus();
    })

	// $('.bannerWeb img').css({ 'width': $(window).width(), 'height': 'auto' });
	// $(window).on('resize', function(){
		// $('.bannerWeb img').css({ 'width': $(window).width(), 'height': 'auto' });
	// });
    
    //$('.productMain_list__item___thumbnail').css({ 'height': $('.productMain_list__item___thumbnail').width() });

    if ($('#news-stick').length) {
        var slide = new Swiper('#news-stick', {
            direction: 'vertical',
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
        });
    }

    if ($('#swiper-slide').length) {
        var slide = new Swiper('#swiper-slide', {
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination'
            }
        });
    }

    if ($('.productHotSwiper').length) {
        var sw_hot = new Swiper('.productHotSwiper', {
            slidesPerView: 4.2,
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerGroupSkip: 1,
            grabCursor: true,
            loop: true,
            keyboard: {
                enabled: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    if ($('.productNewSwiper').length) {
        var sw_new = new Swiper('.productNewSwiper', {
            slidesPerView: 4,
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerGroupSkip: 1,
            grabCursor: true,
            loop: true,
            keyboard: {
                enabled: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    if ($('.collectonHomeSwiper').length) {
        var collecton = new Swiper('.collectonHomeSwiper', {
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerGroupSkip: 1,
            grabCursor: true,
            loop: true,
            keyboard: {
                enabled: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    if ($('.SwiperImgProduct').length) {
        var sw2 = new Swiper('.SwiperImgProduct', {
            spaceBetween: 5,
            slidesPerView: 6,
            freeMode: true,
            loop: true,
            watchSlidesProgress: true,
        });
    }

    if ($('.SwiperImgProduct_detail').length) {
        var thumb = new Swiper('.SwiperImgProduct_detail', {
            slidesPerView: 6,
			freeMode: true,
			watchSlidesProgress: true,
			direction: 'vertical',
			mousewheel: true,
        });

        var detail = new Swiper('.SwiperImgProduct2_detail', {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: thumb,
            },
        });
    }

    if ($('.productMain_list').length) {
        var sw2 = new Swiper('.productMain_list', {
            spaceBetween: 20,
            slidesPerView: 4,
            freeMode: true,
            loop: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    if ($('.collectonHomeSwiper').length) {
        var collection = new Swiper('.collectonHomeSwiper', {
            slidesPerView: 3.2,
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerGroupSkip: 1,
            grabCursor: true,
            loop: true,
            keyboard: {
                enabled: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    if ($('.productCollection').length) {
        var p_collection = new Swiper('.productCollection', {
            slidesPerView: 3.2,
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerGroupSkip: 1,
            grabCursor: true,
            loop: true,
            keyboard: {
                enabled: true,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    $('#show-sibarLeft').click(function () {
        $('#SibarFilter').toggleClass('open');
        $('body').append('<div class="modal-backdrop fade show"></div>')
    });
    $('.btn-login').click(function () {
        $('#SibarLogin').toggleClass('open');
        $('#SibarRegister').removeClass('open');
        $('body').append('<div class="modal-backdrop fade show"></div>')
    });
    $('.btn-register').click(function () {
        $('#SibarRegister').toggleClass('open');
        $('#SibarLogin').removeClass('open');
        $('body').append('<div class="modal-backdrop fade show"></div>')
    });
    $('.btn-viewsize').click(function () {
        $('#SibarViewSize').addClass('open');
        $('body').append('<div class="modal-backdrop fade show"></div>')
    });

    $('.SibarNavBar .btn-close').click(function () {
        $('.SibarNavBar').removeClass('open');
        $('.modal-backdrop').remove();
    });

    $(document).on('click', function (e) {
        if (
            $(e.target).closest('.SibarNavBar').length === 0 &&
            $(e.target).closest('#show-sibarLeft').length === 0 &&
            $(e.target).closest('.btn-login').length === 0 &&
            $(e.target).closest('.btn-register').length === 0 &&
            $(e.target).closest('.btn-viewsize').length === 0
        ) {
            $('.SibarNavBar').removeClass('open');
            $('.modal-backdrop').remove();
        }
    });

    $('#login_form').on('submit', function (e) {
        e.preventDefault();
        $('.sb-login').trigger('click');
    })
    $('.sb-login').click(function () {
        login();
    });

    $('#register_form').on('submit', function (e) {
        e.preventDefault();
        $('.sb-register').trigger('click');
    })
    $('.sb-register').click(function () {
        register();
    });

    $('#otp_form').on('submit', function (e) {
        e.preventDefault();
        $('.sb-otp').trigger('click');
    })
    $('.sb-otp').click(function () {
        validOTP();
    });    
    $('.i-otp').keyup(function (e) {
        if ((e.which == 8 || e.which == 46)) {
            $(this).prev().focus().val('');
        } else {
            $(this).next().focus();
        }

        var otp = '';
        $('.i-otp').each(function () {
            otp += $(this).val();
        })
        $('#OTP').val(otp);
    });

    $('#social_form').on('submit', function (e) {
        e.preventDefault();
        $('.sb-social').trigger('click');
    })
    $('.sb-social').click(function () {
        social_login();
    });

    $('#supplement_form').on('submit', function (e) {
        e.preventDefault();
        $('.sb-supplement').trigger('click');
    })
    $('.sb-supplement').click(function () {
        supplement();
    });

    //filter price
    let min = 100000;
    let max = 10000000;
    const calcLeftPosition = value => 100 / (10000000 - 100) * (value - 100);

    $('#rangeMin').on('input', function (e) {
        const newValue = parseInt(e.target.value);
        if (newValue > max) return;
        min = newValue;
        $('#min').val(min);
        $('#min').html(min);

        var fomartPrice = newValue;
        fomartPrice = fomartPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

        $('#thumbMin').css('left', calcLeftPosition(newValue) + '%');
        $('#minValue').html(fomartPrice);
        $('#line').css({
            'left': calcLeftPosition(newValue) + '%',
            'right': (100 - calcLeftPosition(max)) + '%'
        });
    });

    $('#rangeMax').on('input', function (e) {
        const newValue = parseInt(e.target.value);
        if (newValue < min) return;
        max = newValue;
        $('#max').val(max);
        $('#max').html(max);

        var fomartPrice = newValue;
        fomartPrice = fomartPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

        $('#thumbMax').css('left', calcLeftPosition(newValue) + '%');
        $('#maxValue').html(fomartPrice);
        $('#line').css({
            'left': calcLeftPosition(min) + '%',
            'right': (100 - calcLeftPosition(newValue)) + '%'
        });
    });

    //sort
    $('.sort-box li a').click(function () {
        $('.sort-box li a').removeClass('active');
        $(this).addClass('active');
        $('.sort-box button span').text($(this).data('name'));

        filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'));
    })

    //paging
    $('.pagination li a').click(function () {
        $('.pagination li a').removeClass('active');
        $(this).addClass('active');

        filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'));
    })

    //timer
    $('.timer').each(function () {
        var dt = $(this).data('date');
        $(this).countdown(dt, function (e) {
            $(this).html(
                e.strftime('<span>%H</span>:<span>%M</span>:<span>%S</span>')
            );
        });
    })

    //filter
    $('.filter-box-form li').click(function () {
        var $this = $(this);
        var chk = $this.find('input');
        if ($this.hasClass('active')) {
            $this.removeClass('active');
            chk.prop('checked', false);
        }
        else {
            $this.addClass('active');
            chk.prop('checked', true);
        }
    })

    $('.filter-box-size li').click(function () {
        var $this = $(this);
        var chk = $this.find('input');
        if ($this.hasClass('active')) {
            $this.removeClass('active');
            chk.prop('checked', false);
        }
        else {
            $this.addClass('active');
            chk.prop('checked', true);
        }
    })

    $('.filter-box-color li').click(function () {
        var $this = $(this);
        var chk = $this.find('input');
        if ($this.hasClass('active')) {
            $this.removeClass('active');
            $this.css({ 'background': '' });
            chk.prop('checked', false);

            var color = $this.data('color');
            $this.css({ 'background-color': color });
        }
        else {
            $this.addClass('active');
            var color = $this.data('color');
            var icon = color == 'white' || color == 'không phân biệt màu' ? 'black' : 'white';
            $this.css({ 'background': 'url(/Content/pc/images/icon/tick-' + icon + '.png) no-repeat center center / 15px 15px', 'background-color': color });
            chk.prop('checked', true);
        }
    })

    //color
    $('.option-color li').click(function () {
        if(!$(this).hasClass('soldout')){
            $('.option-color li').removeClass('active');
            $(this).addClass('active');

            $('.selected-color').text($(this).data('name'));

            $('#ColorID').val($(this).data('value'));
            $('#SizeID').val(0);
            $('#Inventory').val(0);

            getSize($('#ColorID').val());
            getImages($('#ColorID').val());

            //jump to slide
            thumb.slideTo($(this).data('index'));
            detail.slideTo($(this).data('index'));
        }
    })

    if ($('.option-color').length) {
        //var firstEl = $('.option-color').find('.stock:first-child');
        //if (firstEl) {
        //    $(firstEl).trigger('click');
        //    $(firstEl).addClass('active');
        //}

        $('.option-color li:first-child').trigger('click');
        $('.option-color li:first-child').addClass('active');
    }

    //size
    $('.option-size li:not(.soldout)').click(function () {
        if ($('#ColorID').val() < 1) {
            $('.color-message').text('Vui lòng chọn màu của bạn').fadeIn().delay(2000).fadeOut();;
            return;
        }

        $('.option-size li').removeClass('active');
        $(this).addClass('active');

        $('#SizeID').val($(this).data('value'));
        $('#Inventory').val($(this).data('inventory'));//tồn kho
        $('.quantity').css('max', $(this).data('inventory'));
    })

    //filter
    $('.filter_box li').click(function () {
        var count = 0;
        $('.filter_box li').each(function () {
            if ($(this).hasClass('active')) {
                count++;
            }
        })
        $('.filter-remove').text('Xóa lọc (' + count + ')');
    })

    //số lượng mua hàng
    $('.qty-down').click(function () {
        if ($('.option-size').length && $('#SizeID').val() < 1) {
            $('.size-message').text('Vui lòng chọn size của bạn').fadeIn().delay(2000).fadeOut();;
            return;
        }

        var value = parseInt($('.quantity').val());
        if (value > 1)
            $('.quantity').val(parseInt(value) - 1);
        else
            $('.quantity').val(1);

        $('#Quantity').val($('.quantity').val());
    })

    $('.qty-up').click(function () {
        if ($('.option-size').length && $('#SizeID').val() < 1) {
            $('.size-message').text('Vui lòng chọn size của bạn').fadeIn().delay(2000).fadeOut();;
            return;
        }

        var max = $('#Inventory').val();
        var value = parseInt($('.quantity').val());
        if (value < max)
            $('.quantity').val(parseInt(value) + 1);
        else {
            $('.size-message').text('Chỉ còn ' + max + ' trong kho.').fadeIn().delay(2000).fadeOut();
            $('.quantity').val(max);
        }

        $('#Quantity').val($('.quantity').val());
    })

    $('.quantity').on('keyup', function () {
        if ($('.option-size').length && $('#SizeID').val() < 1) {
            $('.size-message').text('Vui lòng chọn size của bạn').fadeIn().delay(2000).fadeOut();;
            return;
        }

        var max = $('#Inventory').val();
        var value = parseInt($('.quantity').val());
        if (value > max) {
            $('.size-message').text('Chỉ còn ' + max + ' trong kho.').fadeIn().delay(2000).fadeOut();
            $('.quantity').val(max);
        }
        else if (value < 1) {
            $('.quantity').val(1);
        }

        $('#Quantity').val($('.quantity').val());
    })

    //tìm size
    $('#sizechart_form').on('submit', function (e) {
        e.preventDefault();
        $('.btn-sizechart').trigger('click');
    })

    $('.btn-sizechart').click(function () {
        getsizechart();
    })

    $('.btn-cart').click(function () {
        add_cart($(this).data('id'), '');
    })

    $('.btn-favorite').click(function () {
        add_favorite($(this).data('id'));

        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');
    })

    //thanh toán
    $('#checkout_form input[name="PaymentID"]').click(function () {
        $('.list_bank').hide();
        $('.list_bank-' + $(this).val()).show();
    });

    $('.list-vnpay li input').click(function () {
        $('#BankCode').val($(this).val());

        $('.list-vnpay li label').removeClass('active');
        $(this).parent().addClass('active');
    })

    $('#checkout_form .list-payment input').click(function () {
        getDelivery(13419, $('#Total').val(), $('#CityID').val(), $('#DistrictID').val());
    })

    //check voucher
    $('#voucher_form').on('submit', function (e) {
        e.preventDefault();
        $('.btn-voucher').trigger('click');
    })

    $('.btn-voucher').click(function () {
        checkVoucher($(this).data('url'));
    })

    //check mã free ship
    $('#freecode_form').on('submit', function (e) {
        e.preventDefault();
        $('.btn-freecode').trigger('click');
    })

    $('.btn-freecode').click(function () {
        checkFreeCode($(this).data('url'));
    })

    ////delivery
    //$('.payment-box input[type="radio"]').click(function () {
    //    //$('.delivery-name').html($(this).data('text'));
    //    $('.delivery-value').html(addCommas($(this).data('value')) + 'đ');
    //    $('.total-order').html(addCommas($(this).data('total') + $(this).data('value')) + 'đ');
    //});

    $('.select2').select2({
        theme: 'bootstrap'
    }).on('select2:opening', function () {
        $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', 'Tìm kiếm')
    })

    $('.select_cusom_country').click(function () {
        $('.select_cusom_country_group').find('.select_cusom_country_subOption').toggleClass('show');
        $('body').append('<div class="modal-backdrop fade"></div>')
        $('.modal-backdrop').toggleClass('show');
        $('.inputSearch').focus();
    })
    $(document).on('click', function (event) {
        var $trigger = $('.select_cusom_country_group');
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $('.select_cusom_country_subOption').removeClass('show');
            $('body').find('.modal-backdrop').remove();
        }
    });

    //change info
    $('#info_form').on('submit', function (e) {
        e.preventDefault();
        $('.btn-info').trigger('click');
    })
    $('.btn-info').click(function () {
        changeInfo($(this).data('url'));
    })

    //change password
    $('#password_form').on('submit', function (e) {
        e.preventDefault();
        $('.btn-password').trigger('click');
    })
    $('.btn-password').click(function () {
        changePassword($(this).data('url'));
    })

    //change password
    $('#shop_form').on('submit', function (e) {
        e.preventDefault();
        $('.btn-shop').trigger('click');
    })

    //subscribe
    $('#subscribe_form').on('submit', function (e) {
        e.preventDefault();
        $('.btn-subscribe').trigger('click');
    })
    $('.btn-subscribe').click(function () {
        subscribe();
    })
});

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(input).parent().find('img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function get_code(str) {
    return remove_unicode(str).replace(/[^A-Z0-9]/gi, '');
}

function remove_unicode(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|"| |"|\&|\#|\[|\]|~|$|_/g, '-');

    str = str.replace(/-+-/g, '-');
    str = str.replace(/^\-+|\-+$/g, '');

    return str;
}

function formatDollar(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
}

function createCookie(name, value, minutes) {
    var expires = '';

    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, '', -1);
}

function add_cart(productID, returnpath) {
    if (productID < 1) {
        $('.color-message').text('Sản phẩm không tồn tại. Refresh lại trình duyệt.').fadeIn().delay(2000).fadeOut();
        $('.option-color').shake();
        return;
    }

    var color = $('#ColorID').val();
    var size = $('#SizeID').val();

    if (color < 1) {
        $('.color-message').text('Vui lòng chọn màu của bạn.').fadeIn().delay(2000).fadeOut();
        $('.option-color').shake();
        return;
    }

    if (size < 1) {
        $('.size-message').text('Vui lòng chọn size của bạn.').fadeIn().delay(2000).fadeOut();
        $('.option-size').shake();
        return;
    }

    if ($('#Quantity').val() < 1) {
        $('.size-message').text('Sản phẩm đã hết hàng.').fadeIn().delay(2000).fadeOut();
        $('.option-size').shake();
        return;
    }
    location.href = '/gio-hang/Add.html?ProductID=' + productID + '&Quantity=1&ColorID=' + color + '&SizeID=' + size + '&returnpath=' + returnpath;
    item_added(color, size);
}

function update_cart(index, productID, quantity, color, size, returnpath) {
    location.href = '/gio-hang/Update.html?Index=' + index + '&ProductID=' + productID + '&Quantity=' + quantity + '&ColorID=' + color + '&SizeID=' + size + '&returnpath=' + returnpath;
}

function delete_cart(productID, color, size, returnpath) {
    sw_confirm('Thông báo !', 'Bạn chắc chắn muốn xóa ?', '/gio-hang/Delete.html?ProductID=' + productID + '&ColorID=' + color + '&SizeID=' + size + '&returnpath=' + returnpath);
    item_removed(productID, color, size);
}

function playVideo(pos, file, image, width, height, auto) {
    jwplayer(pos).setup({
        file: file,
        image: image,
        abouttext: 'ONENET.,JS PLAYER',
        width: width,
        height: height,
        stretching: 'exactfit',
        autostart: auto,
        logo: {
            file: '',
            link: '',
        }
    });
}

function change_captcha() {
    var e = Math.floor(Math.random() * 999999);
    $('#ValidCode').attr('src', '/ajax/Security.html?Code=' + e);
    //document.getElementById('imgValidCode').src = '/ajax/Security.html?Code=' + e
}

function formatDollar(value) {
    return value.split("").reverse().reduce(function (acc, value, i, orig) {
        return value + (i && !(i % 3) ? "." : "") + acc;
    }, "");
}

function copyToClipboard(value) {
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val(value).select();
    document.execCommand('copy');
    $temp.remove();
}

function add_state(id, title, url) {
    let state = { id: '' + id + '' };
    window.history.pushState(state, title, url);
}