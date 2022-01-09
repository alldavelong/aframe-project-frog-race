AFRAME.registerComponent('jumper', {
    schema: {

    },

    init: function () {
        const el = this.el;
        this.finish = 40;
        this.preFinish = 30;
        this.yoffset = 0
        this.zoffset = 10
        this.isAnimationRunning = false;

        el.setAttribute('animation__jump', {
            property: 'position',
            autoplay: false,
            easing: 'easeOutExpo', // TODO: remove pause after this animation
            dur: '1000'
        });
        el.setAttribute('animation__land', {
            property: 'position',
            autoplay: false,
            startEvents: 'animationcomplete__jump',
            // delay: '600', // not working !?
            dur: '500'
        });

        //TODO: jump in curve instead of linear movement        

        el.addEventListener('mouseenter', () => {
            if (!this.isJumpProhibited()) {
                this.isAnimationRunning = true;
                this.jump();
            }
        });

        el.addEventListener('animationcomplete__land', () => {
            this.isAnimationRunning = false;
        });
    },

    isJumpProhibited: function () {
        return this.isAtTheEnd() || this.isAnimationRunning;
    },

    isAtTheEnd: function () {
        return this.el.getAttribute('position').z >= this.finish;
    },

    changeYOffsetInFinishArea: function (posZ) {
        if (posZ >= this.preFinish) {
            this.yoffset = .5;
        }
    },

    jump: function () {
        let el = this.el;
        let pos = el.getAttribute('position');

        this.changeYOffsetInFinishArea(pos.z);

        el.setAttribute('animation__jump', {
            to: `${pos.x} ${pos.y + this.yoffset + 1} ${pos.z + this.zoffset * .9}`
        });
        el.setAttribute('animation__land', {
            to: `${pos.x} ${pos.y + this.yoffset} ${pos.z + this.zoffset}`
        });
        // el.components.animation.nextData.to = `${pos.x} ${pos.y + this.yoffset} ${pos.z + this.zoffset}`; // starts at the same origin again!

        el.components.animation__jump.beginAnimation();
        // el.components.animation__land.beginAnimation();
    }

});