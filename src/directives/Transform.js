import Vue from 'vue';
Vue.directive('my-transform', {

    bind(el, binding, vnode) {
        
        let current = 0;

        el.addEventListener('dblclick', function() {

            let i = binding.value || 90;
            let efeito;

            if(!binding.arg || binding.arg == 'rotate') {

                if(binding.modifiers.reverse) {
                    current -= i;
                } else {
                    current += i;
                }

                efeito = `rotate(${current}deg)`;

            } else if(binding.arg == 'scale') {
                efeito = `scale(${i})`;
            }
            
            el.style.transform = efeito;

            if(binding.modifiers.animate) el.style.transition = 'transform 0.5s';
        })

    }

});