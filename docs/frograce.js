let firstKeyDownDone = false;
window.addEventListener('keyup', () => {
    if (!firstKeyDownDone) {
        startFrogSound();
        firstKeyDownDone = true;
    }
});

function startFrogSound() {
    const frogs = document.querySelectorAll('a-entity[frog]');
    frogs.forEach(frog => {
        frog.components.sound.playSound();
    });
}
