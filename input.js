/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/



let timeoutID;
let targets = document.getElementsByClassName("target");

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

        document.addEventListener("touchmove", onMouseMove);
        target.addEventListener("click", (event) => {
            document.removeEventListener("touchmove", onMouseMove);
            document.removeEventListener("keydown", onKeydown);
            target.removeEventListener("click", this);
            event.target.style.zIndex = 10;
            event.stopPropagation();
        })
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


document.addEventListener("click", () => {
    if (!timeoutID) {
        [...targets].forEach(target => {
            target.style.backgroundColor = "red";
        })
    }
})
