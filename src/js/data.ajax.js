function filter_product(url, keyword, page) {
    $('.loading').show();

    //form
    var cbForm = $('.filter-box-form input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    var form = cbForm.join(',');

    //size
    var cbSize = $('.filter-box-size input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    var size = cbSize.join(',');

    //color
    var cbColor = $('.filter-box-color input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    var color = cbColor.join(',');

    var sort = $('.sort-box li a.active').data('value');
    var min = $('#min').val();
    var max = $('#max').val();

    if (page < 1)
        page = 1;

    //url = url + '?keyword=' + keyword + '&page=' + page + '&sort=' + sort + '&form=' + form + '&size=' + size + '&color=' + color + '&min=' + min + '&max=' + max;
    url = url + '?';

    if (keyword != '')
        url = url + '&keyword=' + keyword;

    if (page != '')
        url = url + '&page=' + page;

    if (sort != '')
        url = url + '&sort=' + sort;

    if (form != '')
        url = url + '&form=' + form;

    if (size != '')
        url = url + '&size=' + size;

    if (color != '')
        url = url + '&color=' + color;

    if (min != '')
        url = url + '&min=' + min;

    if (max != '')
        url = url + '&max=' + max;
	
	url = url.replace('?&', '?');

    console.log('filter:' + url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('.loading').hide();

            var content = $(data).find('.productMain_list').html();
            var footer = $(data).find('nav.navigation').html();

            //header = $.trim(header);
            content = $.trim(content);
            footer = $.trim(footer);

            $('.productMain_list').html(content);
            $('nav.navigation').html(footer);

            //change url
            add_state(url, $(document).attr('title'), url);

            $('html, body').animate({
                scrollTop: $('.productMain_list').offset().top
            }, 500);

            if ($('.SibarNavBar .btn-close').length) {
                $('.SibarNavBar .btn-close').trigger('click');
            }

            //paging
            $('.pagination li a').click(function () {
                $('.pagination li a').removeClass('active');
                $(this).addClass('active');

                filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'));
            })
        },
        error: function () { }
    });

    //tracking
    var type = 'Khoảng giá';
    product_list_filtered('MenuID=' + $('#MenuID').val() + '&keyword=' + keyword + '&page=' + page + '&sort=' + sort + '&form=' + form + '&size=' + size + '&color=' + color + '&min=' + min + '&max=' + max + '&filterType=' + type);
}

function getChild(e, ParentID, SelectedID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetChild.html',
        data: 'ParentID=' + ParentID + '&SelectedID=' + SelectedID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();
            var node1 = data.Node1;
            $(e).html(node1);
        }
    });
}

function getSearch(keyword) {
    $.ajax({
        url: '/ajax/GetSearch.html',
        data: 'Keyword=' + keyword,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            var node2 = data.Node2;

            $('.suggestion_start').hide();
            $('.resuilt_production').show();

            $('.product_result').html(node1);
            $('.news_result').html(node2);
        }
    });
}

function checkout(SiteCode) {
    $('.loading').show();

    $.ajax({
        url: '/' + SiteCode + '/ajax/CheckOut.html',
        data: $('#cart_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var params = data.Node2;

            if (params != '') {
                $('.cart-submit').val('Lỗi. F5 thử lại');
                zebra_alert('Thông báo !', params);
                return;
            }

            if (html != '') {
                $('.cart-submit').val('Hoàn thành');
                zebra_infor('Thông báo !', html, '/');
                return;
            }
        }
    });
}

function trade(SiteCode) {
    $('.loading').show();

    $.ajax({
        url: '/' + SiteCode + '/ajax/Trade.html',
        data: new FormData($('#trade_form')[0]),
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var params = data.Node2;

            if (params != '') {
                $('#trade_id').html(params);
                return;
            }

            if (html != '') {
                $('#trade_id').html(html);
                return;
            }
        }
    });
}

function contact(SiteCode) {
    $('.loading').show();

    $.ajax({
        url: '/' + SiteCode + '/ajax/Contact.html',
        data: $('#contact_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var params = data.Node2;

            if (params != '') {
                $('#contact_id').html(params);
                return;
            }

            if (html != '') {
                $('#contact_id').html(html);
                return;
            }
        }
    });
}

function subscribe() {
    $('.loading').show();
    $.ajax({
        url: '/ajax/Subscribe.html',
        data: $('#subscribe_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node3 != '') {
                try {
                    var obj = JSON.parse(node3);
                    email_subscribed(obj.email);
                } catch (e) {
                    console.log(e);
                }
            }

            if (identify != '') {
                tracking_identify(identify);
            }

            sw_alert('Thông báo !', 'Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gọi lại cho bạn sớm nhất.');
        }
    });
}

function getsizechart() {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetSizeChart.html',
        data: $('#sizechart_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var tracking = data.Tracking;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            $('.size-result').html('Size phù hợp: <span>' + node1 + '</span>');

            if (tracking != '') {
                var obj = JSON.parse(tracking);
                size_picked(obj.fit, obj.height, obj.weight);
            }
        }
    });
}

function popup() {
    $('.loading').show();
    $.ajax({
        url: '/ajax/Popup.html',
        data: $('#popup_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;
            if (node2 != '') {
                $('.popup-error').html(node2);
                popup_failed(node2);
                return;
            }
            $("#popup-modal").modal('hide');
            sw_alert('Thông báo !', 'Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gọi lại cho bạn sớm nhất.');
            if (node3 != '') {
                var obj = JSON.parse(node3);
                popup_registered(obj.email, obj.phone_number);
            }

            if (identify != '') {
                tracking_identify(identify);
            }
        }
    });
}

function feedback() {
    $('.loading').show();

    $.ajax({
        url: '/ajax/Feedback.html',
        data: $('#feedback_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }
            $("#feeback-modal").modal('hide');
            sw_alert('Thông báo !', 'Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gọi lại cho bạn sớm nhất.');
            if (identify != '') {
                tracking_identify(identify);
            }
        }
    });
}

function register() {
    $('.loading').show();

    $.ajax({
        url: '/dang-nhap/RegisterPOST.html',
        data: $('#register_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var node4 = data.Node4;
            var tracking = data.Tracking;

            $('#register_form .validate-error-name').html(node1);
            $('#register_form .validate-error-phone').html(node2);
            $('#register_form .validate-error-email').html(node3);
            $('#register_form .validate-error-code').html(node4);

            if (node1 != '') {
                login_failed(node1);
                return;
            }

            if (node2 != '') {
                login_failed(node2);
                return;
            }

            if (node3 != '') {
                login_failed(node3);
                return;
            }

            // if (node4 != '') {
                // login_failed(node4);
                // return;
            // }

            $('.SibarNavBar').removeClass('open');
            $('#SibarOTP').toggleClass('open');

            if (!mobile_mode())
                $('body').append('<div class="modal-backdrop fade show"></div>');

            //$('#otp_form strong').html(tracking + ' - Mã OTP: ' + node4);
            $('#otp_form strong').html(tracking );
            $('.SibarNavBar .i-otp:first').focus();
        }
    });
}

function login() {
    $('.loading').show();

    $.ajax({
        url: '/dang-nhap/LoginPOST.html',
        data: $('#login_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;

            if (node1 != '') {
                login_failed(node1);
                $('#login_form .validate-error').html(node1);
                return;
            }

            $('.SibarNavBar').removeClass('open');
            $('#SibarOTP').toggleClass('open');

            if (!mobile_mode())
                $('body').append('<div class="modal-backdrop fade show"></div>');

            //$('#otp_form strong').html(node3 + ' - Mã OTP: ' + node2);
            $('#otp_form strong').html(node3);
            $('.SibarNavBar .i-otp:first').focus();
        }
    });
}

function validOTP() {
    $('.loading').show();

    $.ajax({
        url: '/dang-nhap/OtpPOST.html',
        data: $('#otp_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (node1 != '') {
                login_failed(node1);
                $('#otp_form .validate-error').html(node1);
                return;
            }

            if (node2 != '') {
                try {
                    var obj = JSON.parse(node2);
                    login_successful(obj.loginDate);
                }
                catch (ex) {
                    console.log(ex);
                }
            }

            if (identify != '') {
                tracking_identify(identify);
                console.log('tracking_identify:' + identify);
            }

            if (node3 != '') {
                $('.SibarNavBar').removeClass('open');
                $('#SibarSupplement').toggleClass('open');

                if (!mobile_mode())
                    $('body').append('<div class="modal-backdrop fade show"></div>');
            }
            else
                location.reload();
        }
    });
}

function social_login() {
    $('.loading').show();

    $.ajax({
        url: '/cap-nhat-tai-khoan/InfoPOST.html',
        data: $('#social_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (node2 != '') {
                login_failed(node2);
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node3 != '') {
                try {
                    var obj = JSON.parse(node3);
                    login_successful(obj.loginDate);
                } catch (e) {
                    console.log(e);
                }
            }

            if (identify != '') {
                tracking_identify(identify);
            }

            if (node1 != '') {
                location.href = node1;
            }
        }
    });
}

function supplement() {
    $('.loading').show();

    $.ajax({
        url: '/dang-nhap/SupplementPOST.html',
        data: $('#supplement_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node3 = data.Node3;

            $('#supplement_form .validate-error-name').html(node1);
            $('#supplement_form .validate-error-email').html(node3);

            if (node1 != '') {
                login_failed(node1);
                return;
            }

            if (node3 != '') {
                login_failed(node3);
                return;
            }

            location.reload();
        }
    });
}

function addShipping(url) {
    $('.loading').show();
    var checkoutID = $("#CheckoutID").val();
    $.ajax({
        url: '/' + url + '/AddShipping.html',
        data: $('#shipping_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var node4 = data.Node4;
            var tracking = data.Tracking;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                try {
                    if (node4 != '') sw_redirect('Thông báo !', node1, node4);
                    else
                        sw_redirect('Thông báo !', node1, '/' + url + '.html');
                }
                catch (ex) {
                    console.log(ex);
                }
                if (tracking !== "") {
                    new_address_added(tracking);
                }
                if (identify != '') {
                    tracking_identify(identify);
                }
                return;
            }
        }
    });
}

function delShipping(url, id) {
    $.ajax({
        url: '/' + url + '/DelShipping.html',
        data: 'id=' + id,
        type: 'GET',
        success: function (data) {
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            location.href = '/' + url + '.html';
        }
    });
}

function defaultShipping(url, id) {
    $.ajax({
        url: '/' + url + '/DefaultShipping.html',
        data: 'id=' + id,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_redirect('Thông báo !', node1, '/' + url + '.html');
                return;
            }
        }
    });
}

function changeInfo(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/InfoPOST.html',
        data: $('#info_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var tracking = data.Tracking;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (identify != '') {
                tracking_identify(identify);
            }

            if (tracking != '') {
                try {
                    var obj = JSON.parse(tracking);
                    profile_updated(obj.dateOfBirth, obj.email, obj.fullName, obj.gender, obj.phoneNumber)
                } catch (e) {
                    console.log(e);
                }
            }

            if (node1 != '') {
                sw_redirect('Thông báo !', node1, '/' + url + '.html');
            }
        }
    });
}

function changePassword(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/PasswordPOST.html',
        data: $('#password_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_redirect('Thông báo !', node1, '/' + url + '.html');
                return;
            }
        }
    });
}

//function validateOtp(url) {
//    $('.loading').show();

//    $.ajax({
//        url: '/' + url + '/ValidatePOST.html',
//        data: $('#otp_form').serialize(),
//        type: 'POST',
//        success: function (data) {
//            $('.loading').hide();

//            var node1 = data.Node1;
//            var node2 = data.Node2;

//            if (node2 != '') {
//                sw_alert('Thông báo !', node2);
//                return;
//            }

//            $('#reset_form').find('#Phone2').val($('#otp_form').find('#Phone').val());

//            if (node1 != '') {
//                sw_alert('Thông báo !', node1);
//                return;
//            }
//        }
//    });
//}

function resetPassword(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/ResetPOST.html',
        data: $('#reset_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_alert('Thông báo !', node1);
                return;
            }
        }
    });
}

function setShop(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/ShopPOST.html',
        data: $('#shop_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }
            if (node1 != '') {
                sw_alert('Thông báo !', node1);
                if (node3 != '') {
                    var obj = JSON.parse(node3);
                    store_favored(obj.store);
                }
                if (identify != '') {
                    tracking_identify(identify);
                }
                return;
            }
        }
    });
}

function checkVoucher(url) {
    $('.loading').show();
    var voucherID = $("#Voucher").val();
    var checkoutID = $("#CheckoutID").val();
    voucher_entered(voucherID, checkoutID);

    $.ajax({
        url: '/' + url + '/CheckVoucher.html',
        data: 'Voucher=' + voucherID + '&Promotion=' + $('#Promotion').val(),
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var tracking = data.Tracking;
            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                voucher_denied(checkoutID, checkoutID, node2, voucherID);
                return;
            }
            //voucher_applied(voucherID, checkoutID, node3);
            //identify_user_voucher_applied(voucherID);
            location.href = location.href;
            if (tracking !== "") {
                voucher_applied(tracking);
            }

        }
    });
}

function removeVoucher(url, SoVC) {
    $('.loading').show();
    var checkoutID = $("#CheckoutID").val();
    $.ajax({
        url: '/' + url + '/RemoveVoucher.html',
        data: 'SoVC=' + SoVC,
        type: 'GET',
        success: function (data) {
            var node2 = data.Node1;
            var node3 = data.Node3;
            var node4 = data.Node4;
            var tracking = data.Tracking;
            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }
            location.href = location.href;
            if (tracking !== "") {
                voucher_removed(tracking);
            }

        }
    });
}

function checkFreeCode(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/CheckFreeCode.html',
        data: $('#freecode_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            $('#Fee').val(0);

            location.href = location.href;
        }
    });
}

function getSize(color) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetSize.html',
        data: 'ColorID=' + color,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            if (node1 == '')
                node1 = 'Hết hàng';

            $('.option-size ul').html(node1);

            $('.option-size li:not(.soldout)').click(function () {
                if ($('#ColorID').val() < 1) {
                    sw_alert('Thông báo !', 'Bạn chưa chọn màu sắc.');
                    return;
                }

                $('.option-size li').removeClass('active');
                $(this).addClass('active');

                $('#SizeID').val($(this).data('value'));
                $('#Inventory').val($(this).data('inventory'));//tồn kho
                $('.quantity').css('max', $(this).data('inventory'));
            });
        }
    });
}

function getImages(color) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetImages.html',
        data: 'ColorID=' + color,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            $('.SwiperImgProduct_detail').html(node1);
            $('.SwiperImgProduct2_detail').html(node2);

            var thumb = new Swiper('.SwiperImgProduct_detail', {
                slidesPerView: 6,
                freeMode: true,
                watchSlidesProgress: true,
                direction: 'vertical',
                mousewheel: true,
            });

            var detail = new Swiper('.SwiperImgProduct2_detail', {
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: thumb,
                },
            });

            Fancybox.bind('[data-fancybox="gallery"]', {
                infinite: false
            });
        }
    });
}

function getImagesV2(color) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetImagesV2.html',
        data: 'ColorID=' + color,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            $('.SwiperImgProduct_detail').html(node1);
            $('.SwiperImgProduct2_detail').html(node2);

            var thumb = new Swiper('.SwiperImgProduct_detail', {
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
                // direction: 'vertical',
                mousewheel: true,
                loop: true
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

            Fancybox.bind('[data-fancybox="gallery"]', {
                infinite: false
            });
        }
    });
}

function choosePromotion(color) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetSize.html',
        data: 'ColorID=' + color,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            $('.get-size').html(node1);

            $('.product-sizes input[type="radio"]').click(function () {
                $('#SizeID').val($(this).val());

                storageCheck($('#ColorID').val(), $('#SizeID').val());
            });
        }
    });
}

function getShipping(shippingID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetShipping.html',
        data: 'ShippingID=' + shippingID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var city = data.Node2;
            var district = data.Node3;

            $('.shipping-info').html(node1);
            $('#SCityID').val(city);
            $('#SDistrictID').val(district);
        }
    });
}

function getDelivery(PaymentID, Total, CityID, DistrictID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetDelivery.html',
        data: 'PaymentID=' + PaymentID + '&Total=' + Total + '&CityID=' + CityID + '&DistrictID=' + DistrictID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();
            var node1 = data.Node1;
            var node3 = data.Node3;
            var identify = data.Identify;

            $('.list-delivery').html(node1);

            $('.list-delivery input:first').trigger('click');
            $('.list-delivery input').click(function () {
                var fee = $(this).data('fee');
                setDelivery(fee);
            });

            //var total = parseInt($('#Total').data('totalwithoutfee')) + parseInt(fee);
            //$('.total-order').html(addCommas(total));

            var fee = $("#DeliveryID13415").data('fee');
            setDelivery(fee);
            if (identify != '') {
                tracking_identify(identify);
            }

            if ($('#DeliveryID13418').length) {
                $('#DeliveryID13418').trigger('click');
            }
        }
    });
}

function setDelivery(fee) {
    $('#Fee').val(fee);
    $('.delivery-value').html(addCommas(fee) + 'đ');
    var total = parseInt($('#Total').data('totalwithoutfee')) + parseInt(fee) - parseInt($('#ArisMoney').val());
    $('.total-order').html(addCommas(total) + 'đ');
    //$('.total__price').html(addCommas(total) + 'đ');
}

function GetPhone(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/SubsribePOST.html',
        data: $('#phone_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_alert('Thông báo !', node1);
                return;
            }
        }
    });
}

function getShowroom(cityID, districtID) {
    $('.loading').show();

    if (cityID < 1) {
        sw_alert('Thông báo !', 'Chọn: Tỉnh / thành phố');
        $('.loading').hide();
        return;
    }

    $.ajax({
        url: '/ajax/GetShowroom.html',
        data: 'CityID=' + cityID + '&DistrictID=' + districtID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            $('.list-showroom').html(node1);
            $('.count-showroom').html('Tìm thấy ' + node2 + ' cửa hàng');
        }
    });
}

function get_cityv2(Keyword) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetCityV2.html',
        data: 'Keyword=' + Keyword,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            if (node1 != '') {
                $('.list_city').html(node1);
            }

            $('.list_city li').click(function () {
                $('.list_city li').removeClass('active');
                $(this).addClass('active');
                $('#CityID').val($(this).data('id'));
                $('#CityName').val($(this).data('name'));

                get_districtv2($(this).data('id'), '');

                $('.tab_city').removeClass('active');
                $('.tab_district').addClass('active');
                //$('.tab_ward').removeClass('active');

                $('.list_city').hide();
                $('.list_district').show();
                //$('.list_ward').hide();
            })
        }
    });
}

function get_district(cityID, districtID, wardID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetChild.html',
        data: 'ParentID=' + cityID + '&SelectedID=' + districtID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            if (cityID > 0) {
                node1 = '   <select class="form-select form-control" id="DistrictID" name="DistrictID" onchange="get_ward(this.value, ' + wardID + ')">\
                                <option value="0">Quận / Huyện *</option>\
                                '+ node1 + '\
                            </select>';

                $('.list-district').html(node1);
            }

            $('.select2').select2({
                theme: 'bootstrap'
            }).on('select2:opening', function () {
                $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', 'Nhập từ khóa để tìm kiếm')
            })
        }
    });
}

function get_districtv2(ParentID, SelectedID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetChildV2.html',
        data: 'ParentID=' + ParentID + '&SelectedID=' + SelectedID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            if (ParentID > 0) {
                $('.list_district').html(node1);
            }

            $('.select2').select2({
                theme: 'bootstrap'
            }).on('select2:opening', function () {
                $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', 'Tìm kiếm')
            })

            $('.list_district li').click(function () {
                $('.list_district li').removeClass('active');
                $(this).addClass('active');
                $('#DistrictID').val($(this).data('id'));
                $('#DistrictName').val($(this).data('name'));

                $('.select_cusom_country').text($('#DistrictName').val() + ', ' + $('#CityName').val());
                $('.select_cusom_country_subOption').removeClass('show');
            })
        }
    });
}

//function get_ward(districtID, wardID) {
//    $('.loading').show();

//    $.ajax({
//        url: '/ajax/GetChild.html',
//        data: 'ParentID=' + districtID + '&SelectedID=' + wardID,
//        type: 'GET',
//        success: function (data) {
//            $('.loading').hide();

//            var node1 = data.Node1;

//            if (districtID > 0) {
//                node1 = '   <select class="form-select form-control" id="WardID" name="WardID">\
//                                <option value="0">Phường / xã *</option>\
//                                '+ node1 + '\
//                            </select>';

//                $('.list-ward').html(node1);
//            }

//            $('.select2').select2({
//                theme: 'bootstrap'
//            }).on('select2:opening', function () {
//                $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', 'Nhập từ khóa để tìm kiếm')
//            })
//        }
//    });
//}

//function get_wardv2(ParentID, SelectedID) {
//    $('.loading').show();

//    $.ajax({
//        url: '/ajax/GetChildV2.html',
//        data: 'ParentID=' + ParentID + '&SelectedID=' + SelectedID,
//        type: 'GET',
//        success: function (data) {
//            $('.loading').hide();

//            var node1 = data.Node1;
//            if (ParentID > 0) {
//                $('.list_ward').html(node1);
//            }

//            $('.select2').select2({
//                theme: 'bootstrap'
//            }).on('select2:opening', function () {
//                $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', 'Tìm kiếm')
//            })

//            $('.list_ward li').click(function () {
//                $('.list_ward li').removeClass('active');
//                $(this).addClass('active');
//                $('#WardID').val($(this).data('id'));
//                $('#WardName').val($(this).data('name'));
//                $('.select_cusom_country').text($('#WardName').val() + ', ' + $('#DistrictName').val() + ', ' + $('#CityName').val());

//                $('.select_cusom_country_subOption').removeClass('show');
//            })
//        }
//    });
//}

function add_favorite(ProductID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/AddFavorite.html',
        data: 'ProductID=' + ProductID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            $.ajax({
                url: location.href,
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    $('.loading').hide();

                    var content = $(data).find('.numberFavorite').html();
                    $('.numberFavorite').html(content);
                },
                error: function () { }
            });
        }
    });
}

function mobile_mode() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        return true;
    }
}

function get_address(keyword) {
    $.ajax({
        url: '/ajax/GetAddress.html',
        data: 'Keyword=' + keyword,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            $('.list-address').html(node1);
            $('.list-address').show();
        }
    });
}

function get_detail_address(keyword) {
    $.ajax({
        url: '/ajax/GetDetailAddress.html',
        data: 'Keyword=' + keyword,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            var node2 = data.Node2;

            $('#CityID').val(node1);
            $('#DistrictID').val(node2);
        }
    });
}