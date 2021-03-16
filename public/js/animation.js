setTimeout(() => {
    document.body.classList.add("reveal")
}, 0),
window.onload.document.addEventListener("click", () => {
    document.body.classList.toggle("reveal")
});
