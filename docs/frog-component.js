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
        el.setAttribute('animation__jump', {
            property: 'position',
            autoplay: false
        });
        el.setAttribute('animation__fall', {
            property: 'position',
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
            el.setAttribute('animation__jump', {
                to: `${pos.x} ${pos.y + yoffset + 1} ${pos.z + zoffset * .9}`,
                easing: 'easeOutExpo', // TODO: remove pause after this animation
                dur: '1000'
            });
            el.setAttribute('animation__fall', {
                to: `${pos.x} ${pos.y + yoffset} ${pos.z + zoffset}`,
                startEvents: 'animationcomplete__jump',
                // delay: '600', // not working !?
                dur: '500'
            });
            // TODO: move constant animation details up to init:
            // el.components.animation.nextData.to = `${pos.x} ${pos.y + yoffset} ${pos.z + zoffset}`; // starts at the same origin again!
            
            el.components.animation__jump.beginAnimation();
            // el.components.animation__fall.beginAnimation();
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
    // function animateBox(x, y, z) {
    //     let box = document.getElementById('box');
    //     box.setAttribute('animation', 'property', 'position');
    //     box.setAttribute('animation', 'to', `${x} ${y+2} ${z}`);
    //     box.setAttribute('animation', 'easing', 'easeOutExpo');
    //     box.components.animation.beginAnimation();
    //     box.setAttribute('animation__2', 'property', 'position');
    //     box.setAttribute('animation__2', 'to', `${x} ${y} ${z}`);
    //     box.setAttribute('animation__2', 'startEvents', 'animationcomplete');
    //     box.setAttribute('animation__2', 'dur', '200');
    // }
    
});