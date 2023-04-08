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
let workspace = document.getElementById("workspace");

[...targets].forEach(target => {

    // mouse down event
    // target.addEventListener("mousedown mousemove")
    target.addEventListener("mousedown", (event) => {

        let shiftX = event.clientX - target.getBoundingClientRect().left;
        let shiftY = event.clientY - target.getBoundingClientRect().top;
        let originTop = event.target.offsetTop + 'px';
        let originLeft = event.target.offsetLeft + 'px';
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
                document.removeEventListener("keydown", onKeydown);
                target.style.left = originLeft;
                target.style.top = originTop;
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
        event.stopPropagation();
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

        event.stopPropagation();
    })
    var mylatesttap = new Date().getTime();
    function doubletap() {
        var now = new Date().getTime();
        var timesince = now - mylatesttap;
        mylatesttap = new Date().getTime();
        return (timesince < 600) && (timesince > 0);

    }
    target.addEventListener("touchstart", (event) => {
        if (event.touches.length == 1) {
            if (doubletap()) {
                console.log("trigger!!");
                let shiftX = event.targetTouches[0].clientX - target.getBoundingClientRect().left;
                let shiftY = event.targetTouches[0].clientY - target.getBoundingClientRect().top;

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

                document.addEventListener("touchmove", onMouseMove);
                document.addEventListener("click", function onClick(event) {
                    document.removeEventListener("touchmove", onMouseMove);
                    document.removeEventListener("click", onClick);
                    event.target.style.zIndex = 10;
                    event.stopPropagation();
                })
            } else {
                let shiftX = event.targetTouches[0].clientX - target.getBoundingClientRect().left;
                let shiftY = event.targetTouches[0].clientY - target.getBoundingClientRect().top;

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
                    moveAt(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
                }

                document.addEventListener("touchmove", onMouseMove);
                target.addEventListener("touchend", function onTouchEnd(event) {
                    document.removeEventListener("touchmove", onMouseMove);
                    target.removeEventListener("touchend", onTouchEnd);
                    event.target.style.zIndex = 10;
                    event.stopPropagation();

                })
            }

        }
        event.stopPropagation();
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
        let originHieght = target.offsetHeight;


        let originDist = Math.hypot(
            event.touches[0].pageX - event.touches[1].pageX,
            event.touches[0].pageY - event.touches[1].pageY);


        //check is vertical(0) or horizontal(1)
        let direction = (Math.abs(event.touches[0].pageX - event.touches[1].pageX) > Math.abs(event.touches[0].pageY - event.touches[1].pageY)) ? 1 : 0;


        function dist(e) {
            return Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY);
        }
        i = 0;
        function resize(e) {
            let ratio = dist(e) / originDist;
            let target;
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].style.backgroundColor === "blue") {
                    target = targets[i];
                    break;
                }
            }
            if (direction === 0) {
                if (originHieght * ratio >= 30)
                    target.style.height = originHieght * ratio + "px";

            } else {
                if (originWidth * ratio >= 30)
                    target.style.width = originWidth * ratio + "px";
            }
        }

        document.addEventListener("touchmove", resize);

        document.addEventListener("touchend", (event) => {
            if (event.touches.length == 1) {
                document.removeEventListener("touchmove", resize);
            } else if (event.touches.length == 0) {
                document.removeEventListener("touchmove", resize);
                document.removeEventListener("touchend", this);
            }
            event.stopPropagation();
        })
    }
});


document.addEventListener("mousedown", (event) => {
    timeoutID = false;
    setTimeout(() => {
        timeoutID = true;
    }, 100);

    let originX = event.clientX;
    let originY = event.clientY;


    async function boxSelection() {
        // document.style.cursor = "pointer";

        // create div
        let longPress = false;
        setTimeout(() => {
            longPress = true;
        }, 500);


        let selectDiv = document.createElement("selectDiv");
        selectDiv.id = "selectDiv";
        workspace.appendChild(selectDiv);

        selectDiv.style.left = originX + 'px';
        selectDiv.style.top = originY + 'px';


        function onMouseMove(event) {
            if (longPress) {
                var _x = event.clientX;
                var _y = event.clientY;
                var selDiv = document.getElementById('selectDiv');
                selDiv.style.display = 'block';
                selDiv.style.left = Math.min(_x, originX) + 'px';
                selDiv.style.top = Math.min(_y, originY) + 'px';
                selDiv.style.width = Math.abs(_x - originX) + 'px';
                selDiv.style.height = Math.abs(_y - originY) + 'px';
            }
        }

        function onMouseUp() {
            if (longPress) {
                var selDiv = document.getElementById('selectDiv');
                var targets = document.getElementsByClassName('target');
                var selectedEls = [];

                var l = selDiv.offsetLeft;
                var t = selDiv.offsetTop;
                var w = selDiv.offsetWidth;
                var h = selDiv.offsetHeight;
                console.log(l, t, w, h)
                for (var i = 0; i < targets.length; i++) {
                    var sw = targets[i].offsetWidth;
                    var sh = targets[i].offsetHeight;
                    var sl = targets[i].offsetLeft;
                    var st = targets[i].offsetTop
                    console.log(l, t, w, h, sl, st);

                    if ((sl + sw) <= (l + w) && (st + sh) <= (t + h) && sl >= l && st >= t) {
                        selectedEls.push(targets[i]);
                    }
                }
                if (selectedEls.length > 0) {
                    selectedEls[0].style.backgroundColor = "blue";
                    [...targets].filter(t => t != selectedEls[0]).forEach(t => t.style.backgroundColor = "red");
                } else {
                    [...targets].forEach(target => {
                        target.style.backgroundColor = "red";
                    })
                }
                selDiv.style.display = 'none';
            }
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    boxSelection();

})

document.addEventListener("click", () => {
    if (!timeoutID) {
        [...targets].forEach(target => {
            target.style.backgroundColor = "red";
        })
    }
})

let lastMax = 0;
let rotate = 0;
document.addEventListener("wheel", function onWheel(event) {
    let targets = document.getElementsByClassName("target");
    let target;
    for (let i = 0; i < targets.length; i++) {
        if (targets[i].style.backgroundColor === "blue") {
            target = targets[i];
            break;
        }
    }
    if (target === undefined) return;

    rotate += event.deltaY > 0 ? 10 : -10;
    target.style.transform = 'rotate(' + rotate + 'deg)';
});

