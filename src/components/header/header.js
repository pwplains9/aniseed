import helpers from '@scripts/utils/helpers';
import scroller from '@components/scroller/scroller';
const $link = document.querySelectorAll('.header-nav a');

const goToPage = (e) => {
    const page = e.currentTarget.dataset.page;

    // if (!page || !isActive()) {
    //     return;
    // }

    const $page = document.querySelector(`[data-router-page="${page}"]`);

    if ($page) {
        // scroller.scrollToEl($page)
        scroller.setPosition($page, {
            offset: e.currentTarget.dataset.page === 'home'? 100 : 1,
            // callback: close,
        });
    }
};

const setActiveLink = (page) => {
    $link.forEach(($linkCurrent) => {
        $linkCurrent.classList.toggle('is-active', page === $linkCurrent.dataset.page);
    });
};

const linkClick = (e) => {
    const isDevices = helpers.isDevices();

    if (isDevices && e.currentTarget.classList.contains('is-active') || !isDevices) {
        goToPage(e);
    } else if (isDevices) {
        setActiveLink(e.currentTarget.dataset.page);
        goToPage(e);
        closeMenu();
    }
};



function openMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(true, helpers.$header.find('.header-nav'), 'header');

		helpers.$header.addClass('is-menu-opened');
		$('.header__menu').removeClass('is-hidden');

		setImmediate(() => {
			$('body').css('padding-right', `${helpers.getScrollbarWidth()}px`);
			helpers.$header.css('right', `${helpers.getScrollbarWidth()}px`);
		});

		setTimeout(() => {
			$('.header__menu').addClass('is-active');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 100);
	});
}

function closeMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(false, helpers.$header.find('.header-nav'), 'header');
		$('body').css('padding-right', '');
		helpers.$header.css('right', '');

		helpers.$header.removeClass('is-menu-opened');

		$('.header__menu').removeClass('is-active');

		setTimeout(() => {
			$('.header__menu').addClass('is-hidden');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 500);
	});
}

function toggleMenu(event) {
	event.preventDefault();
	event.stopPropagation();

	if ($(event.currentTarget).hasClass('is-active')) {
		$(event.currentTarget).removeClass('is-active');
		closeMenu();
	} else {
		$(event.currentTarget).addClass('is-active');
		openMenu();
	}
}

function init() {
	helpers.$header = $('.header');

	$('.js-burger').on('click.header', toggleMenu);

	helpers.$document
		.on('click.header', (e) => {
			let $container = $('.header-nav');

			if ($container.is(e.target) && $container.has(e.target).length === 0 && $container.hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		})
		.on('keyup.header', (e) => {
			if ((e.key === 'Escape' || e.key === 'Esc') && $('.header-nav').hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		});

    $link.forEach(($linkCurrent) => {
        $linkCurrent.classList.remove('is-active');

        // $linkCurrent.removeEventListener('mouseenter', linkHover);
        // $linkCurrent.removeEventListener('mouseleave', linkHover);
        $linkCurrent.removeEventListener('click', linkClick);

        $linkCurrent.addEventListener('click', linkClick);

        // if (!helpers.isDevices()) {
        //     $linkCurrent.addEventListener('mouseenter', linkHover);
        //     $linkCurrent.addEventListener('mouseleave', linkHover);
        // }
    });
}

function destroy() {
	$('.js-burger').off('.header');
	helpers.$document.off('.header');
}

export default {
	init,
	destroy,
	openMenu,
	closeMenu,
};
