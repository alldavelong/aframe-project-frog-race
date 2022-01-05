let frogCount = 0;
AFRAME.registerComponent('frog', {
    schema: {
        scale: {type: 'string', default: '.6 .6 .6'},
        position: {type: 'string'}
    },

    init: function () {
        const el = this.el;
        const finish = 40;
        const preFinish = 30;
        
        el.id = `frog${++frogCount}`;
        el.setAttribute('gltf-model', 'assets/frog.gltf');
        el.setAttribute('scale', this.data.scale);
        el.setAttribute('position', this.data.position);
        el.setAttribute('sound', {
            src: 'assets/frogsound_rep.mp3',
            loop: true,
            // autoplay: true,
            rolloffFactor: 1.9,
            volume: 8,
            distanceModel: 'exponential'
        });
        
        let pos = el.getAttribute('position');
        el.setAttribute('animation', {
            property: 'position',
            to: `${pos.x} ${pos.y} ${pos.z + 10}`,
            autoplay: false
        });
        
        //TODO: jump in curve instead of linear movement
        let isAtTheEnd = false
        function jump() {
            if (isAtTheEnd) {
                return
            }
            pos = el.getAttribute('position');
            let yoffset = 0
            let zoffset = 10
            if (pos.z >= preFinish) {
                yoffset = .5
            } 
            el.setAttribute('animation', 'to', `${pos.x} ${pos.y + yoffset} ${pos.z + zoffset}`);
            // el.components.animation.nextData.to = `${pos.x} ${pos.y + yoffset} ${pos.z + zoffset}`; // starts at the same origin again!
            el.components.animation.beginAnimation();
        }
        
        el.addEventListener('mouseenter', () => {
            jump();
        });

        el.addEventListener('animationcomplete', () => {
            if (pos.z >= finish) {
                isAtTheEnd = true;
            }
        });
    }
});