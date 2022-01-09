let frogCount = 0;
AFRAME.registerComponent('frog', {
    schema: {
        scale: {type: 'string', default: '.6 .6 .6'},
        position: {type: 'string'}
    },

    init: function () {
        const el = this.el;
        
        el.id = `frog${++frogCount}`;
        el.setAttribute('gltf-model', 'assets/frog.gltf');
        el.setAttribute('scale', this.data.scale);
        el.setAttribute('position', this.data.position);
        el.setAttribute('sound', {
            src: 'assets/frogsound_rep.mp3',
            loop: true,
            rolloffFactor: 1.9,
            volume: 8,
            distanceModel: 'exponential'
        });
        
        this.startFrogSoundOnFirstKeyDown();
    },
    
    startFrogSoundOnFirstKeyDown: function () {
        window.addEventListener('keydown', () => {
            if (typeof this.firstKeyDown === 'undefined') {
                this.el.components.sound.playSound();
                this.firstKeyDown = true;
            }
        });
    }
});