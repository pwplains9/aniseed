// не трогать этот импорт, он нужен для работы css
// можно добавить несколько файлов, они будут работать независимо друг от друга
import '@styles/vendor.scss';
import '@styles/main.scss';

import '@scripts/utils/helpers';
import '@scripts/modules/social';
import actualYear from '@scripts/modules/actualYear';
import vhFix from '@scripts/vendor/vh-fix';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import scroller from "../components/scroller/scroller";
import helpers from "./utils/helpers";
import router from "../components/router/router";
import header from "../components/header/header";

gsap.registerPlugin(Draggable, ScrollTrigger);

window.LocomotiveScroll = LocomotiveScroll;
window._debounce = debounce;
window._throttle = throttle;
window.gsap = gsap;
window.Draggable = Draggable;
window.ScrollTrigger = ScrollTrigger;
let resizeWidth = null;
let isLoaded = false;

const resize = () => {
    if (helpers.isDevices() && resizeWidth && resizeWidth === innerWidth) {
        return;
    }

    vhFix.resize();

    if (isLoaded) {
        const lastPosition = scroller.getPosition();

        document.body.classList.add('is-resizing');

        scroller.setPosition(0, {
            callback() {
                setTimeout(() => {
                    scroller.setPosition(lastPosition, {
                        callback() {
                            document.body.classList.remove('is-resizing');
                        },
                    });
                }, 100);
            },
        });
    }

    resizeWidth = innerWidth;
};

const init = () => {
    actualYear.init();
    vhFix.init();
    scroller.init()
    header.init();

    $('.faq-content').on('click', (event) => {
        console.log(event)
        const el = $(event.currentTarget).closest('.faq');
        if(!el.hasClass('is-active')) {
            el.addClass('is-active');
            el.find('.faq-description').slideDown();
            el.siblings('.faq').removeClass('is-active');
            el.siblings('.faq').find('.faq-description').slideUp();
        } else {
            el.removeClass('is-active');
            el.find('.faq-description').slideUp();
        }
    })

    resizeWidth = innerWidth;

    window.addEventListener('resize', _debounce(resize, 500));
};

init();


