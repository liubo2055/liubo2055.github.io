// JavaScript Document

// Following Mortgage Calculator function modified from:
// http://www.mcfedries.com/creatingawebpage/mortgage.htm
//
// Notes:
// amount = mortgage amount
// ir = monthly interest rate --> take an annual rate / 100 and multiply by 12 --> ((3%/100)*12)
// months = total amount of monthly payments --> term * 12 --> (25 * 12)
//
function calculatePayment(amount, ir, months) {
    var payment = Math.floor((amount * ir) / (1 - Math.pow(1 + ir, (-1 * months))) * 100) / 100;
    return payment;
}

// Text Fields
var $amount = $('#amount');
var $term = $('#term');
var $ir = $('#ir');
var $income = $('#income');
// Button
var $btnSubmit = $('#btn_submit');

// Button Event
$btnSubmit.click(function (e) {

    e.preventDefault();

    $('#tuition_chart').css("display", "block");

    var monthlyIncome = $income.val() / 12;
    var monthlyInterest = ($ir.val() / 100) / 12;

    var termInMonths = $term.val() * 12;

    var monthlyPayments = calculatePayment($amount.val()
        , monthlyInterest
        , termInMonths);


    if (monthlyPayments > monthlyIncome) {
        alert('Monthly mortgage payment exceeds monthly income.');
    }
    else {
        var monthlyPaymentPct = ( monthlyPayments / monthlyIncome) * 100;
        var monthlyIncomePct = 100 - monthlyPaymentPct;


        var data = [
            {
                value: monthlyPaymentPct,
                color: "#FB2F42",
                label: "Payment"
            },
            {
                value: monthlyIncomePct,
                color: "#D5D2D3",
                label: "Remaining"
            }
        ]

        var ctx = $('#canvas_01')[0].getContext('2d');
        var myNewChart = new Chart(ctx).Pie(data);

        $("#monthPay").text("Monthly payment: " + "%" + monthlyPaymentPct.toFixed(2));
        $("#monthRemain").text("Monthly income remaining: " + "%" + monthlyIncomePct.toFixed(2));

    }


});