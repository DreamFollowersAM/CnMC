const collection = document.getElementsByClassName("load");

window.addEventListener('scroll', () => {
    for (var ld of collection) {
        if (ld.offsetTop > 0) {
            ld.style.opacity = "1"
        } else {
            ld.style.opacity = "0"
        }
    }

    console.log("works");
});