/* jslint esversion:11, asi:true, browser:true */
"use strict"
const form = document.querySelector(".form")

function refreshForm() {
    const category = form.querySelector("select").value
    const discount = form.querySelector("input#discount").checked
    const parentRun = form.querySelector("input#parentrun").checked
    const listings = [...document.querySelectorAll(".biz-listing")]
    console.log(discount, parentRun, category)
    listings.forEach(listing => {
        let visible = true
        if (category && !listing.classList.contains("category-" + category)) {
            visible = false
        }
        if (discount && !listing.querySelector(".tag-discount")) {
            visible = false
        }
        if (parentRun && !listing.querySelector(".tag-parent-run")) {
            visible = false
        }
        listing.style.display = visible ? "flex" : "none"
    })
}
form.querySelector("select").addEventListener("change", e => {
    refreshForm()
})
form.querySelector("input#parentrun").addEventListener("click", e => {
    refreshForm()
})
form.querySelector("input#discount").addEventListener("click", e => {
    refreshForm()
})
refreshForm()