let instanceCount = 0;
AFRAME.registerComponent('billboard_spotlight', {
    schema: {
        position: {type: 'string'}
    },

    init: function () {
        const el = this.el;
        
        el.id = `frog${++instanceCount}`;
        el.setAttribute('position', this.data.position);
        el.setAttribute('light', {
            type: 'spot',
            angle: 90,
            distance: 5.5,
            decay: 2,
            intensity: 1.8
        });
        
    },
});