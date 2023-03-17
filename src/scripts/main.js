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
import {Draggable} from 'gsap/Draggable';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import scroller from "../components/scroller/scroller";
import helpers from "./utils/helpers";
import router from "../components/router/router";
import header from "../components/header/header";
import './vendor/jquery.validate.min'

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

    header.init();

    $('.header-lang').on('click', (event) => {
        if (!$(event.currentTarget).hasClass('is-active')) {
            $(event.currentTarget).addClass('is-active');
        } else {
            $(event.currentTarget).removeClass('is-active');
        }
    })

    let index = $('.section--1')
    let label = index.find('.label');
    let title = index.find('.title');
    let button = index.find('.inner');
    let sphere = index.find('.sphere');
    let time = 0.3;

    gsap.timeline().from(label, time, {
        autoAlpha: 0,

        onStart: () => {
            label.removeClass('is-hide')
        }
    }).from(title, time, {
        autoAlpha: 0,

        onStart: () => {
            title.removeClass('is-hide')
        }

    }).from(button, time, {
        autoAlpha: 0,

        onStart: () => {
            button.removeClass('is-hide')
        }
    }).from(sphere, time, {
        autoAlpha: 0,

        onStart: () => {
            sphere.removeClass('is-hidden')
        }
    })

    $("#form-contacts").validate({
        errorElement: "span",
        rules: {name: {required: !0}, email: {required: !0, email: !0}, message: {required: !0}},
        messages: {
            name: "Please provide a valid name.",
            email: {required: "Please enter your email", minlength: "Please enter a valid email address"},
            phone: {
                required: "Please provide a phone number",
                minlength: "Phone number must be min 10 characters long",
                maxlength: "Phone number must not be more than 10 characters long"
            },
            subject: "Please enter subject",
            message: "Please enter your message"
        },
        highlight: function (e, t) {
            $(e).closest(".contacts-input, .contacts-textarea").addClass("is-error")
        },
        unhighlight: function (e, t, n) {
            $(e).closest(".contacts-input, .contacts-textarea").removeClass("is-error")
        },
        submitHandler: function (e) {
            var t = $("#form-contacts").serializeArray();

            $.ajax({
                type: "POST",
                url: "/main.php",
                data: t,
                dataType: "json",
                success: function (response) {
                    if (response.success) { // response.message for mailer
                        $(".contacts-send").addClass('is-active');

                        setTimeout(() => {
                            $(".contacts-send").removeClass('is-active');
                        }, 3000);
                        $("#form-contacts").get(0).reset();
                    } else {
                        alert(response.error);
                    }
                },
            })
        }
    })

    if(!helpers.isDevices()) {
        var line1= $('.line-1');
        var line2= $('.line-2');
        var line3= $('.line-3');
        var line4= $('.line-4');
        var line5= $('.line-5');
        var line6= $('.line-6');
        var line7= $('.line-7');
        var line8= $('.line-8');
        var line9= $('.line-9');
        var line10 = $('.line-10');
        var line11= $('.line-11');
        var line12= $('.line-12');
        var line13= $('.line-13');


        var layer= $('.section--1');


        function position(e, x, y) {
            if(x) {
                return e.pageX * -1 / x;
            }

            if(y) {
                return e.pageY * -1 / y;
            }
        }


        layer.mousemove(function(e){
            line1.css('transform', 'translate3d('+position(e, line1.data('x'))+'px,'+position(e, false, line1.data('y'))+'px, 0)');
            line2.css('transform', 'translate3d('+position(e, line2.data('x'))+'px,'+position(e, false, line2.data('y'))+'px, 0)');
            line3.css('transform', 'translate3d('+position(e, line3.data('x'))+'px,'+position(e, false, line3.data('y'))+'px, 0)');
            line4.css('transform', 'translate3d('+position(e, line4.data('x'))+'px,'+position(e, false, line4.data('y'))+'px, 0)');
            line5.css('transform', 'translate3d('+position(e, line5.data('x'))+'px,'+position(e, false, line5.data('y'))+'px, 0)');
            line6.css('transform', 'translate3d('+position(e, line6.data('x'))+'px,'+position(e, false, line6.data('y'))+'px, 0)');
            line7.css('transform', 'translate3d('+position(e, line7.data('x'))+'px,'+position(e, false, line7.data('y'))+'px, 0)');
            line8.css('transform', 'translate3d('+position(e, line8.data('x'))+'px,'+position(e, false, line8.data('y'))+'px, 0)');
            line9.css('transform', 'translate3d('+position(e, line9.data('x'))+'px,'+position(e, false, line9.data('y'))+'px, 0)');
            line10.css('transform', 'translate3d('+position(e, line10.data('x'))+'px,'+position(e, false, line10.data('y'))+'px, 0)');
            line11.css('transform', 'translate3d('+position(e, line11.data('x'))+'px,'+position(e, false, line11.data('y'))+'px, 0)');
            line12.css('transform', 'translate3d('+position(e, line12.data('x'))+'px,'+position(e, false, line12.data('y'))+'px, 0)');
            line13.css('transform', 'translate3d('+position(e, line13.data('x'))+'px,'+position(e, false, line13.data('y'))+'px, 0)');

        });
    }

    setTimeout(() => {
        scroller.init()
    }, 500)

    resizeWidth = innerWidth;

    window.addEventListener('resize', _debounce(resize, 500));
};

init();


