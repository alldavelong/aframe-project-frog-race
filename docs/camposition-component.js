// const floor_limits = getFloorLimits();
const floor_limits = {
    min: {x: 0, z: -49},
    max: {x: 10, z: 50}
};


AFRAME.registerComponent('camposition', {
    tick: function () {
        updateCamPositionWithinBounds(floor_limits, this.el.object3D)
    }
});

function updateCamPositionWithinBounds(floor_limits, camera) {
    let pos = camera.position;
    if (pos.x <= floor_limits.min.x) {
        pos.x = floor_limits.min.x;
    } else if (pos.x >= floor_limits.max.x) {
        pos.x = floor_limits.max.x;
    }
    if (pos.z <= floor_limits.min.z) {
        pos.z = floor_limits.min.z;
    } else if (pos.z >= floor_limits.max.z) {
        pos.z = floor_limits.max.z;
    }
        
    return pos;
}


// TODO: not working yet, because loaded before DOM
function getFloorLimits() {
    const floor = document.getElementById('floor');
    const floor_pos = floor.getAttribute('position');
    const floor_geo = floor.getAttribute('geometry');
    return {
        min: {
            x: floor_pos.x - (floor_geo.width / 2),
            z: floor_pos.z - (floor_geo.height / 2)
        }, max: {
            x: floor_pos.x + (floor_geo.width / 2),
            z: floor_pos.z + (floor_geo.height / 2)
        }
    };
}