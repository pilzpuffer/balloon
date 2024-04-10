    const balloon = document.querySelector("p");
    const box = document.querySelector(".box");

    //audio tracks
    let inflate = document.querySelector("#inflate");
    let deflate = document.querySelector("#deflate");
    let pop = document.querySelector("#pop");

    //can be adjusted if we need our balloon to grow/shrink faster or slower
    const increaseFactor = 10;
    const decreaseFactor = 10;

    const currentSize = parseFloat(window.getComputedStyle(balloon).getPropertyValue('font-size'));

    function blowIt(increaseFactor) {
            const currentSize = parseFloat(window.getComputedStyle(balloon).getPropertyValue('font-size'));
            balloon.style.fontSize = (currentSize + increaseFactor) + 'px';
        }
    
    function shrinkIt(decreaseFactor) {
            const currentSize = parseFloat(window.getComputedStyle(balloon).getPropertyValue('font-size'));
            balloon.style.fontSize = (currentSize - decreaseFactor) + 'px';
        }

    function popIt() {
        const currentSize = parseFloat(window.getComputedStyle(balloon).getPropertyValue('font-size'));
        box.textContent = "💥";
        box.classList.add("boom");
        inflate.pause();
        deflate.pause();
        pop.pause();
        removeEventListener("keydown", balloonChanges);
        setTimeout(() => {
            alert("Your balloon blew up! Get a new one by restarting");
        }, 180)
        
    }

    function checkBalloonSize() {
        const currentSize = parseFloat(window.getComputedStyle(balloon).getPropertyValue('font-size'));
        if (currentSize > 100) {
        pop.play();
        setTimeout(() => {
        popIt();
        }, 150);
        }
    }
    
    function balloonChanges(event) {
        if (event.key == "ArrowUp") {
            if (box.textContent === "💥") {
                inflate.pause()
            } else {
        inflate.play();
        setTimeout(() => {
        blowIt(increaseFactor)
        }, 350);
        checkBalloonSize();
        }

        } else if (event.key == "ArrowDown") {
            if (box.textContent === "💥" || currentSize === 0) {
                deflate.pause()
            } else {
            deflate.play();
            setTimeout(() => {
            shrinkIt(increaseFactor)
            }, 150);
            checkBalloonSize();
        }
            } else {
                if (box.textContent === "💥") {
                    alert("Your ballon has already blown up! Get a new balloon by restarting")
                } else {
                alert("Use the arrow keys to change your balloon!");
                }
            } 
    }

  document.addEventListener("keydown", balloonChanges);