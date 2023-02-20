const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
let currency = "GBP"

const priceTag = document.querySelector("h1")
const spanTag = document.querySelector("span")

// function to grab data from coindesk
const checkPrice = function () {

    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            priceTag.innerHTML = jsonData.bpi[currency].rate_float.toFixed(1)
            // toFixed(1) formats data to one decimal place
        })
}

// run function on load
checkPrice()

// loop over every nav link and add a click event
const navLinks = document.querySelectorAll("nav a")

navLinks.forEach(link => {

    link.addEventListener("click", function() {

        currency = this.getAttribute("data-currency")
        checkPrice()

        // remove all previous selected states
        navLinks.forEach(link => link.classList.remove("selected"))

        // and THEN only do it for the clicked link
        this.classList.add("selected")

        // update span tag
        spanTag.innerHTML = currency

    })

})

// check the price every 60 seconds
setInterval(function() {
    checkPrice()
}, 60000)