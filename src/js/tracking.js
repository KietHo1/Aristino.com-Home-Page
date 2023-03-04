$('.btn-baogia a').click(function () {
    popup_viewed();
});
//popup

//function 1. Đã test ok
function popup_viewed() {
    try {
    }
    catch (ex) {
        console.log(ex);
    }

}
//function 2. Đã test ok
function popup_registered(email, phoneNumber) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }

}
//function 3. Đã test ok
function popup_failed(message) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 4. Đã test ok
//sign_up
function sign_up_selected() {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 5. Đã test ok
function sign_up_successful(email, fullName, phoneNumber, signupDate, signupSource) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 6. Đã test ok
function signup_failed(message) {
    try {
        follower.track('signup_failed', {
            'properties': {
                'signupError': '' + message + '',
                'signupMethod': 'Đăng ký trực tiếp qua Website'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}

//function 7. Đã test ok
function login_selected() {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 8. Đã test ok
function login_successful(date) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 9. Đã test ok
function login_failed(message) {

    try {
    }
    catch (ex) {
        console.log(ex);
    }

}

//function 10. Đã test ok
function product_searched(query, total) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}

//function 12. Đã test lỗi

//function 13. promotion_Viewed Chuyển vào View Đã test OK

//function 14. Đã test OK
function promotion_clicked(name, promotionID) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 15. product_clicked trong View Đã test OK
function product_clicked(productID) {
}
//function 16. product_viewed trong View Đã test OK
//function 17. item_viewed trong View Đã test OK
//function 18. item_added trong View Đã test OK
//function 19
function item_removed(productID, color, size) {
}

//function 20 cart_viewed trong View Đã test OK

//function 21  Click nút thanh toán Không còn trên hệ thống

//function 22 - item_checkout_started - trong view  -    ok

//function 23 - checkout_step_1_viewed  - trong view - ok

//function 24,25,26,27, 28 trong View
function voucher_entered(voucherText, checkoutID) {
    try {
    } catch (e) {
        console.log(e);
    }
}
function voucher_denied(checkoutID, orderID, reason, voucherText) {
    try {
    } catch (e) {
        console.log(e);
    }
}

function voucher_applied(voucherjson) {
    try {
    } catch (e) {
        console.log(e);
    }
}

function voucher_removed(voucherjson) {
    try {
    } catch (e) {
        console.log(e);
    }
}

function new_address_added(voucherjson) {
    try {
    }
    catch (e) {
        console.log(e);
    }
}
function support_requested(email, message, name, service, supportType) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }

}
$(".icon-hotline a").click(function () {
    support_requested("", "", "", "Tư Vấn Bán Hàng", "Call");
});
$(".icon-email a").click(function () {
    support_requested("", "", "", "Tư Vấn Bán Hàng", "Email");
});
function profile_updated(dateOfBirth, email, fullName, gender, phoneNumber) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}

function store_favored(preferredStore) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
function email_subscribed(email) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
function size_picked(fit, height, weight) {
    try {
    }
    catch (ex) {
        console.log(ex);
    }
}
//lading tracking
function outlet_product_clicked(productID) {
}
$(".outlet_click_a").click(function () {
    var productID = $(this).data("id");
    outlet_product_clicked(productID);
});
function product_list_filtered(datastring) {
    try {
    } catch (e) {
        console.log(e.message);
    }
}

function item_viewed(productID, color, size) {
}


function tracking_identify(identifyJSON) {
    try {
    } catch (e) {
        console.log(e.message);
    }
}