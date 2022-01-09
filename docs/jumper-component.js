AFRAME.registerComponent('jumper', {
    schema: {
        stopAfter: {type: 'number'},
        jumpDistance: {type: 'number', default: 10},
        jumpHeight: {type: 'number', default: .7}
    },

    init: function () {
        const el = this.el;
        this.finish = this.data.stopAfter + el.getAttribute('position').z;
        this.yOffset = 0
        this.zOffset = this.data.jumpDistance;
        this.isAnimationRunning = false;

        el.setAttribute('animation__jump', {
            property: 'position',
            autoplay: false,
            dur: '1000'
        });
        el.setAttribute('animation__land', {
            property: 'position',
            autoplay: false,
            startEvents: 'animationcomplete__jump',
            dur: '300'
        });

        if (this.data.stopAfter > 0) {
            el.addEventListener('mouseenter', () => {
                if (!this.isJumpProhibited()) {
                    this.isAnimationRunning = true;
                    this.jump();
                }
            });
        } else {
            console.debug(el.id + " not jumping due to missing 'stopAfter' parameter.")
        }

        el.addEventListener('animationcomplete__land', () => {
            this.isAnimationRunning = false;
        });
    },

    isJumpProhibited: function () {
        return this.isAtTheEnd() || this.isAnimationRunning;
    },

    isAtTheEnd: function () {
        return this.el.getAttribute('position').z > this.finish;
    },

    changeYOffsetInFinishArea: function (posZ) {
        if (posZ  + this.zOffset > this.finish) {
            this.yOffset = .5;
        }
    },

    jump: function () {
        let el = this.el;
        let pos = el.getAttribute('position');

        this.changeYOffsetInFinishArea(pos.z);

        el.setAttribute('animation__jump', {
            to: `${pos.x} ${pos.y + this.yOffset + this.data.jumpHeight} ${pos.z + this.zOffset * .8}`
        });
        el.setAttribute('animation__land', {
            to: `${pos.x} ${pos.y + this.yOffset} ${pos.z + this.zOffset}`
        });

        el.components.animation__jump.beginAnimation();
    }
});