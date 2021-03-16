const color_child = Array.from(document.querySelectorAll('.color_child')),
        color_value = document.querySelectorAll('.background_color');

color_child.forEach(item => {
    item.addEventListener("click",(e)=>{
        Copycolor();
    })
});

function Copycolor(){
    var clipboard = new ClipboardJS('.color_child');
    clipboard.on('success',(e)=>{
        
    })
    clipboard.on('error',(e)=>{
    })
}

setTimeout(() => {
    document.body.classList.add("reveal")
}, 0),
window.onload.document.addEventListener("click", () => {
    document.body.classList.toggle("reveal")
});