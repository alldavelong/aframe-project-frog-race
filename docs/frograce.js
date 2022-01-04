let firstKeyDownDone = false;
window.addEventListener('keyup', () => {
    if (!firstKeyDownDone) {
        startFrogSound();
        firstKeyDownDone = true;
    }
    let camera = document.querySelector('a-camera');
    let floor = document.querySelector('a-plane#floor');
    camera.setAttribute('position', newCamPositionWithinBounds(floor, camera));
});

function startFrogSound() {
    console.log("keyup");
    const frogs = document.querySelectorAll('a-entity[frog]');
    frogs.forEach(frog => {
        frog.components.sound.playSound();
    });
}


function newCamPositionWithinBounds(floor, camera) {
    const floor_pos = floor.getAttribute('position');
    const floor_geo = floor.getAttribute('geometry');
    let floor_limits = {
        min: {
            x: floor_pos.x - (floor_geo.width / 2),
            z: floor_pos.z - (floor_geo.height / 2)
        }, max: {
            x: floor_pos.x + (floor_geo.width / 2),
            z: floor_pos.z + (floor_geo.height / 2)
        }
    };

    let pos = camera.getAttribute('position');
    console.log(pos);
    let posnew = Object.assign({}, pos);
    if (pos.x <= floor_limits.min.x) {
        posnew.x = floor_limits.min.x;
    } else if (pos.x >= floor_limits.max.x) {
        posnew.x = floor_limits.max.x;
    }
    if (pos.z <= floor_limits.min.z) {
        posnew.z = floor_limits.min.z;
    } else if (pos.z >= floor_limits.max.z) {
        posnew.z = floor_limits.max.z;
    }
        
    return posnew;
}