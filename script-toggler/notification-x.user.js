// ==UserScript==
// @name Ylilauta.fi: Lisää ilmoituksiin luettu-ruksi
// @namespace Violentmonkey Scripts
// @match *://ylilauta.org/*
// @grant none
// @version 0.1
// @locale en
// @description Lisää ilmoituksiin ruksin, josta voi klikata ilmoituksen luetuksi avaamatta sitä
// ==/UserScript==

(function() {
	if (localStorage.getItem('notificationXStorage')) {
		$('#left a[href="javascript:get_notifications()"]').click(() => {
			let t = setInterval(() => {
				if ($('#notifications .unread').length > 0) {
					clearTimeout(t);

					$('#notifications .unread').each((i, e) => {
						let el = $(e);

						let a = document.createElement('a');
						a.classList.add('linkbutton');
						a.innerHTML = '&times;';
						a.style.float = 'right';
						a.style.marginTop = '-2em';
						a.style.opacity = '0.99';
						a.onclick = (e) => {
							let el = $(e.target).closest('div.notification');
							$.get(el.find('a.reflink')[0].href, (r) => {
								el.removeClass('unread');
								$(e.target).remove();
							});
						};

						el.append(a);
					});
				}
			}, 200);
		});
	}
})();