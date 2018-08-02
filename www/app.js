let user = 0;

function view(status) {
    if (status == 'show') {
        document.querySelector('.view').classList.remove('hide');
        document.querySelector('.view').classList.add(status);
    } else {
        document.querySelector('.view').classList.remove('show');
        document.querySelector('.view').classList.add(status);
    }
}

document.querySelector('.close-view').addEventListener('click', () => {
    view('hide');
});

function add_to_cart() {
    user++;
    document.querySelector('#cart_number').innerText = user;
}

const API_publicKey = "FLWPUBK-40917bf3fe95e999bd8e1e906c7cea25-X";

function payWithRave() {
    if (user == 0) {
        alert('please add atleast one item to cart');
    } else {
        let cost = 5000 * user;
        let email = prompt('email');
        let mobile = prompt('mobile number');
        console.log(email);
        var x = getpaidSetup({
            PBFPubKey: 'FLWPUBK-40917bf3fe95e999bd8e1e906c7cea25-X',
            customer_email: email,
            amount: cost,
            customer_phone: mobile,
            currency: "NGN",
            payment_method: "both",
            txref: "rave-123456",
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function () { },
            callback: function (response) {
                var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if (
                    response.tx.chargeResponseCode == "00" ||
                    response.tx.chargeResponseCode == "0"
                ) {
                    // redirect to a success page
                } else {
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }
}