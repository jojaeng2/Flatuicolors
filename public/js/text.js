const color_child = document.querySelectorAll('.color_child');

function init(item){
    console.log(color_child.item.value);
}



color_child.forEach(item => {
    item.addEventListener("click",(e)=>{
        alert("GOT IT!!");
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