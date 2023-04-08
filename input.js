/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/



let timeoutID;
let targets = document.getElementsByClassName("target");
let test = document.getElementsByClassName("show");

[...targets].forEach(target => {

    // mouse down event
    // target.addEventListener("mousedown mousemove")
    target.addEventListener("mousedown", (event) => {

        let shiftX = event.clientX - target.getBoundingClientRect().left;
        let shiftY = event.clientY - target.getBoundingClientRect().top;
        let originX = event.pageX - shiftX + 'px';
        let originY = event.pageY - shiftY + 'px';
        event.target.style.position = 'absolute';
        event.target.style.zIndex = 1000;
        timeoutID = false;
        setTimeout(() => {
            timeoutID = true;
        }, 100);


        function moveAt(pageX, pageY) {
            target.style.left = pageX - shiftX + 'px';
            target.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }


        function onKeydown(e) {
            if (e.key === "Escape") {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("keydown", this);
                target.style.left = originX;
                target.style.top = originY;
            }
        }

        document.addEventListener("keydown", onKeydown)

        document.addEventListener("mousemove", onMouseMove);
        target.addEventListener("mouseup", (event) => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("keydown", onKeydown);
            target.removeEventListener("mouseup", this);
            event.target.style.zIndex = 10;
            event.stopPropagation();
        })
    })

    target.addEventListener("dblclick", (event) => {
        let shiftX = event.clientX - target.getBoundingClientRect().left;
        let shiftY = event.clientY - target.getBoundingClientRect().top;
        let originX = event.pageX - shiftX + 'px';
        let originY = event.pageY - shiftY + 'px';
        event.target.style.position = 'absolute';
        event.target.style.zIndex = 1000;


        function moveAt(pageX, pageY) {
            target.style.left = pageX - shiftX + 'px';
            target.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        function onKeydown(e) {
            if (e.key === "Escape") {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("keydown", this);
                target.style.left = originX;
                target.style.top = originY;
            }
        }

        document.addEventListener("keydown", onKeydown)

        document.addEventListener("mousemove", onMouseMove);
        target.addEventListener("mouseup", (event) => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("keydown", onKeydown);
            target.removeEventListener("mouseup", this);
            event.target.style.zIndex = 10;
            event.stopPropagation();
        })
    })

    target.addEventListener("touchstart", (event) => {
        if (event.touches.length == 1) {

            let shiftX = event.targetTouches[0].clientX - target.getBoundingClientRect().left;
            let shiftY = event.targetTouches[0].clientY - target.getBoundingClientRect().top;

            let originX = event.pageX - shiftX + 'px';
            let originY = event.pageY - shiftY + 'px';
            event.target.style.position = 'absolute';
            event.target.style.zIndex = 1000;
            timeoutID = false;
            setTimeout(() => {
                timeoutID = true;
            }, 100);

            function moveAt(pageX, pageY) {
                target.style.left = pageX - shiftX + 'px';
                target.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                console.log("touch move", event.targetTouches[0].pageX, event.targetTouches[0].pageY);
                moveAt(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
            }


            // function onKeydown(e) {
            //     if (e.key === "Escape") {
            //         document.removeEventListener("mousemove", onMouseMove);
            //         document.removeEventListener("keydown", this);
            //         target.style.left = originX;
            //         target.style.top = originY;
            //     }
            // }

            // document.addEventListener("keydown", onKeydown)

            document.addEventListener("touchmove", onMouseMove);
            target.addEventListener("click", (event) => {
                document.removeEventListener("touchmove", onMouseMove);
                // document.removeEventListener("keydown", onKeydown);
                target.removeEventListener("click", this);
                event.target.style.zIndex = 10;
                event.stopPropagation();

            })
        } else if (event.touches.length == 2) {

        }

    })

    // less than 300ms
    target.addEventListener("click", (e) => {
        if (!timeoutID) {
            target.style.backgroundColor = "blue";
            [...targets].filter(t => t != target).forEach(t => t.style.backgroundColor = "red");
        }
        e.stopPropagation();
    })
})

document.addEventListener("touchstart", (event) => {
    if (event.touches.length == 2) {
        // test[0].textContent = event.touches.length;
        let targets = document.getElementsByClassName("target");
        let target;
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].style.backgroundColor === "blue") {
                target = targets[i];
                break;
            }
        }
        if (target === undefined) return;
        let originWidth = target.offsetWidth;
        test[2].textContent = originWidth !== undefined ? `${originWidth}` : "undefined";
        let originHieght = target.offsetHeight;
        test[3].textContent = originHieght !== undefined ? `${originHieght}` : "undefined";
        let width = target.style.width;
        test[4].textContent = width !== undefined ? `${width}` : "undefined";
        let height = target.style.height;
        test[5].textContent = height !== undefined ? `${height}` : "undefined";


        let originDist = Math.hypot(
            event.touches[0].pageX - event.touches[1].pageX,
            event.touches[0].pageY - event.touches[1].pageY);
        // test[4].textContent = originDist !== undefined ? `${originDist}` : "undefined";


        //check is vertical(0) or horizontal(1)
        let direction = (Math.abs(event.touches[0].pageX - event.touches[1].pageX) > Math.abs(event.touches[0].pageY - event.touches[1].pageY)) ? 1 : 0;


        function dist(e) {
            return Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY);
        }
        i = 0;
        function resize(e) {
            let ratio = dist(e)/originDist;
            let target;
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].style.backgroundColor === "blue") {
                    target = targets[i];
                    break;
                }
            }
            if (direction === 0) {
                target.style.height = originHieght * ratio + "px";
            } else {
                i++;
                if(i==1){
                    let width = target.style.width;
                    test[4].textContent = width !== undefined ? `${width}` : "undefined";
                    let OW = originWidth;
                    test[2].textContent = OW !== undefined ? `${OW}` : "undefined";
                    test[7].textContent = ratio;
                    test[1].textContent = originDist;

                }
                

                target.style.width = originWidth * ratio + "px";
            }
        }

        document.addEventListener("touchmove", resize);

        document.addEventListener("touchend", () => {
            if (event.touches.length == 1) {
                test[0].textContent = "fuck";
                test[1].textContent = "direction";
                test[2].textContent = "OW";
                test[3].textContent = "OH";
                test[4].textContent = "W";
                test[5].textContent = "H";
                test[7].textContent = "--";

                document.removeEventListener("touchmove", resize);
            } else if (event.touches.length == 0) {
                document.removeEventListener("touchmove", resize);
                document.removeEventListener("touchend", this);
            }
        })
    } else {
        test[0].textContent = event.touches.length;
        document.addEventListener("touchend", () => {
            test[0].textContent = "fuck";
            document.removeEventListener("touchend", this);
        })
    }
});


document.addEventListener("mousedown", () => {
    timeoutID = false;
    setTimeout(() => {
        timeoutID = true;
    }, 100);
})

document.addEventListener("click", () => {
    if (!timeoutID) {
        [...targets].forEach(target => {
            target.style.backgroundColor = "red";
        })
    }
})
