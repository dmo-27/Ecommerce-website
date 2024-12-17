const Razorpay = require("razorpay");

RAZORPAT_KEY="rzp_test_ij30wQBN9tXSBh"
RAZORPAY_SECRET="gCMDe7h7QLHpfTRoAd596ygK"

const razorpay = new Razorpay({
    key_id:RAZORPAT_KEY,
    key_secret:RAZORPAY_SECRET,
})

module.exports=razorpay;