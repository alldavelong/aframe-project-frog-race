let instanceCount = 0;
AFRAME.registerComponent('billboard_spotlight', {
    schema: {
        position: {type: 'string'}
    },

    init: function () {
        const radius = .1;
        const height = .3;
        const el = this.el;

        el.id = `spotlight${++instanceCount}`;
        el.setAttribute('geometry', {
            primitive: 'cylinder',
            radius: radius,
            height: height
        });
        el.setAttribute('material', 'color', '#444');

        el.setAttribute('position', this.data.position);
        let pos = el.getAttribute('position');
        el.setAttribute('position', `${pos.x} ${pos.y} ${pos.z + radius}`);
        
        this.placeLight();
    },

    placeLight: function () {
        const light = document.createElement('a-entity');
        light.setAttribute('light', {
            type: 'spot',
            angle: 55,
            distance: 5.5,
            decay: 2,
            intensity: 1.8
        });
        light.setAttribute('rotation', '-50 0 0');
        this.el.appendChild(light);
    }
});