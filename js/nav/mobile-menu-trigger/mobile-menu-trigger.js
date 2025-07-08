(function (Drupal) {
	Drupal.behaviors.mobileMenuTrigger = {
		attach(context) {
			const mainMenuTrigger = context.querySelector('.mobile-menu-trigger');
			const mainMenu = context.querySelector('#main-menu');
			const navMain = context.querySelector('.nav--main');

			if (!mainMenuTrigger || !mainMenu || !navMain) return;

			function openActiveTrail() {
				navMain.querySelectorAll('.menu__item--active-trail').forEach(item => {
					item.classList.add('is-open');
					const trigger = item.querySelector('.menu__item-link-wrapper .submenu-trigger');
					if (trigger) {
						trigger.setAttribute('aria-expanded', 'true');
						trigger.setAttribute('aria-label', trigger.getAttribute('aria-label').replace('Open the', 'Close the'));
					}
				});
			}

			function closeActiveTrail() {
				navMain.querySelectorAll('.is-open').forEach(item => {
					item.classList.remove('is-open');
					const trigger = item.querySelector('.menu__item-link-wrapper .submenu-trigger');
					if (trigger) {
						trigger.setAttribute('aria-expanded', 'false');
						trigger.setAttribute('aria-label', trigger.getAttribute('aria-label').replace('Close the', 'Open the'));
					}
				});
			}

			function toggleMenu() {
				const isExpanded = mainMenuTrigger.getAttribute('aria-expanded') === 'true';
				mainMenuTrigger.setAttribute('aria-expanded', String(!isExpanded));
				mainMenuTrigger.setAttribute('aria-label', isExpanded ? 'Show navigation menu' : 'Hide navigation menu');
				mainMenuTrigger.textContent = isExpanded ? 'Menu' : 'Close';
				mainMenu.setAttribute('aria-hidden', String(isExpanded));
				isExpanded ? closeActiveTrail() : openActiveTrail();
			}

			function resizeFunction() {
				const isExpanded = mainMenuTrigger.getAttribute('aria-expanded') === 'true';
				if (window.innerWidth > 1024) {
					mainMenuTrigger.textContent = 'Menu';
					mainMenuTrigger.setAttribute('aria-expanded', 'false');
					mainMenuTrigger.setAttribute('aria-label', 'Show navigation menu');
					mainMenu.setAttribute('aria-hidden', 'false');
				} else {
					mainMenu.setAttribute('aria-hidden', String(!isExpanded));
				}
			}

			// Initial state
			if (window.innerWidth <= 1024) {
				openActiveTrail();
			} else {
				closeActiveTrail();
			}

			// Event listeners
			if (!mainMenuTrigger.classList.contains('menu-trigger-initialized')) {
				mainMenuTrigger.addEventListener('click', toggleMenu);
				mainMenuTrigger.classList.add('menu-trigger-initialized');
			}

			let resizeTimer;
			if (!window.mobileMenuResizeInitialized) {
				window.addEventListener('resize', () => {
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(resizeFunction, 250);
				});
				window.addEventListener('load', resizeFunction);
				window.mobileMenuResizeInitialized = true;
			}

			// Run once on attach
			resizeFunction();
		}
	};
})(Drupal);