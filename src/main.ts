import './style.css'
import './scss/keyframes.scss';
import './scss/cube.scss';
import './scss/animationClasses.scss';

const controlstick = document.querySelector('.controlStick') as HTMLElement;
const container2 = document.querySelector('.container2') as HTMLElement;
const reflectionFace = document.querySelector('.reflectionFace') as HTMLElement;
//const audio = new Audio('IPL_11.wav');
let count = 0;

setInterval(() => {

    if(controlstick.dataset.stickval != '-1' && false) {
        controlstick.dataset.stickval = '-1';
    } else {
        switch (countToFour()) {
            case 0:
                controlstick.dataset.stickval = '0';
                controlstick.style.transform = 'rotate(90deg)';
                break;
            case 1:
                controlstick.dataset.stickval = '1';
                controlstick.style.transform = 'rotate(180deg)';
                break;
            case 2:
                controlstick.dataset.stickval = '2';
                controlstick.style.transform = 'rotate(270deg)';
                break;
            case 3:
                controlstick.dataset.stickval = '3';
                controlstick.style.transform = 'rotate(0deg)';
                break;
        }
    }
}, 1000);

//get the keypress of any arrow key
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    //audio.play();
    if (keyName === 'ArrowUp') {
        handleControl('up');
    } else if (keyName === 'ArrowDown') {
        handleControl('down');
    } else if (keyName === 'ArrowLeft') {
        handleControl('left');
    } else if (keyName === 'ArrowRight') {
        handleControl('right');
    }
});

//function that counts to 4 and then resets to 0
function countToFour() {
    count++;
    if(count > 3) {
        count = 0;
    }
    return count;
}

function handleControl(controlDirection: string){
    switch (controlDirection) {
        case 'up':
            switch (container2.dataset.turnState) {
                case 'bottom':
                    updateFace('bottom', 'front');
                    break;
                case 'front':
                    updateFace('front', 'top');
                    break;
            }
            break;
        case 'down':
            switch (container2.dataset.turnState) {
                case 'top':
                    updateFace('top', 'front');
                    break;
                case 'front':
                    updateFace('front', 'bottom');
                    break;
            }
            break;
        case 'left': {
            switch (container2.dataset.turnState) {
                 case 'right':
                    updateFace('right', 'front');
                    break;
                case 'front':
                    updateFace('front', 'left');
                    break;
            }
            break;
        }
        case 'right': {
            switch (container2.dataset.turnState) {
                case 'left':
                    updateFace('left', 'front');
                    break;
                case 'front':
                    updateFace('front', 'right');
                    break;
            }
            break;
        }
    }
}

function updateFace(origin: string, target: string) {
    container2.classList.add(`${origin}-to-${target}`);
    reflectionFace.classList.add(target);
    reflectionFace.classList.remove(origin);
    container2.dataset.turnState = target;

    const activeFace = document.querySelector(`.${origin}:not(.reflectionFace)`) as HTMLElement;
    const targetFace = document.querySelector(`.${target}:not(.reflectionFace)`) as HTMLElement;
    activeFace.classList.add('hide');
    targetFace.classList.add('show');
    setTimeout(() => {
        targetFace.classList.remove('inactive');
        targetFace.classList.remove('show');
        activeFace.classList.add('inactive');
        activeFace.classList.remove('hide');
    }, 500);

    if (origin !== "front") {
        setTimeout(() => {
            container2.classList.remove(`${target}-to-${origin}`, `${origin}-to-${target}`);
        }, 600);
    }
}