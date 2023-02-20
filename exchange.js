const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
let currency = "gbp"

const priceTag = document.querySelector("h1")
const spanTag = document.querySelector("span")

// function to grab data from exchange API
const checkPrice = function () {

    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            priceTag.innerHTML = jsonData.eur[currency].toFixed(3)
            // toFixed(3) formats data to 3 decimal place
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