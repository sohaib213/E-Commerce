
const scriptURL = "https://script.google.com/macros/s/AKfycbw91QQONCMPaP7EkJezWqarllwS7CpfILETUymHxyibNtJvxf2_J7VYVhol9em3760/exec";

let form = document.getElementById("form_contact");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
    })
    .then(response => {
        setTimeout(() => {
            localStorage.removeItem("cart");
            window.location.reload();
        }, 0)
    })
    .catch((error) =>{ console.error("eroor!", error.message());})
})