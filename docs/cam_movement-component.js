AFRAME.registerComponent('cam_movement', {
    schema: {
        boundsOf: { type: 'selector' }
    },

    init: function () {
        this.hasBounds = true;
        const boundsData = this.data.boundsOf;
        window.addEventListener('load', () => {
            if (boundsData == null) {
                this.hasBounds = false;
                console.error("No 'boundsOf' argument was passed "
                + "to the component, camera movement will not be limited.")
                return;
            }
            this.movement_limits = this.getMovementLimits(
                boundsData.getAttribute('position'),
                boundsData.getAttribute('geometry'));
            console.debug('movement_limits: loaded, camera movement now limited');
        });
    },

    tick: function () {
        if (!this.hasBounds) {
            return;
        } else if (typeof this.movement_limits !== 'undefined') {
            this.updateCamPositionWithinBounds();
        } else if (typeof this.wasDOMNotLoadedWarningPrinted === 'undefined') {
            console.debug('movement_limits: DOM tree not loaded yet');
            this.wasDOMNotLoadedWarningPrinted = true;
        }
    },

    getMovementLimits: function (area_pos, area_geo) {
        return {
            min: {
                x: area_pos.x - (area_geo.width / 2),
                z: area_pos.z - (area_geo.height / 2)
            }, max: {
                x: area_pos.x + (area_geo.width / 2),
                z: area_pos.z + (area_geo.height / 2)
            }
        };
    },

    updateCamPositionWithinBounds: function () {
        const pos = this.el.object3D.position;
        const area = this.movement_limits;
        if (pos.x <= area.min.x) {
            pos.x = area.min.x;
        } else if (pos.x >= area.max.x) {
            pos.x = area.max.x;
        }
        if (pos.z <= area.min.z) {
            pos.z = area.min.z;
        } else if (pos.z >= area.max.z) {
            pos.z = area.max.z;
        }
    }
});
