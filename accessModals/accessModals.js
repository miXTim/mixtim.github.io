/***
	accessModals.js
	Accessible Modals v1.0
	EcmaScript version: 6
	Apache 2.0 License (http://www.apache.org/licenses/LICENSE-2.0)
***/

// all focusable elements
const interactiveSelectors = 'a, button, iframe, input, select, textarea, [tabindex], [contenteditable]';
const docTitle = document.title;
let trigger, i = 0;

/*** create a class constructor with its properties and methods ***/
class ModalWindow {
  constructor(modal) {
    this.modal = modal;
    this.interactiveElements = modal.querySelectorAll(interactiveSelectors);
  }

  toggle() {
    this.interactiveElements.forEach(element => {
      const tabindex = this.modal.contains(element) ? '0' : '-1';
      element.setAttribute('tabindex', tabindex);
    });
    wrapper.setAttribute('aria-hidden', 'true');
    // toggle the 'js-active' class on the modal itself,
	// used to show/hide the modal
    this.modal.classList.toggle('js-active');
    wrapper.setAttribute('aria-hidden', this.modal.classList.contains('js-active'));
    wrapper.setAttribute('tabindex', '-1');
	// we go through the array to make controls not focusable in #main
    wrapper.interactiveElements = wrapper.querySelectorAll(interactiveSelectors);
    wrapper.interactiveElements.forEach(element => {
      element.setAttribute('tabindex', '-1');
    });
	// make all controls in the modal accessible to keyboard navigation
    this.modal.setAttribute('aria-modal', this.modal.classList.contains('js-active'));
    this.modal.setAttribute('aria-hidden', !this.modal.classList.contains('js-active'));
	// fading out animation
    this.modal.setAttribute('closing', !this.modal.classList.contains('js-active'));
	// add the modal identifier to window title
    document.title = this.modal.classList.contains('js-active') ? `${docTitle} | ${this.modal.id}` : docTitle;
  }
}

const wrapper = document.querySelector('#wrapper');
const modals = Array.from(document.querySelectorAll('.modal')).map(modal => new ModalWindow(modal));
const openButtons = Array.from(document.querySelectorAll('[data-open-btn]'));
const closeButtons = Array.from(document.querySelectorAll('.btn-close'));
// return focus helper
function btnGet(el) {
	trigger = el;
	return trigger;
}

/*** Open the modal ***/
// loop through modal triggers
openButtons.forEach((button, i) => {
  const modal = modals[i];
  button.addEventListener('click', () => modal.toggle());
  modal.interactiveElements.forEach(element => element.setAttribute('tabindex', '0'));
});

// method used to remove the modal
function close(modal) {
  modal.toggle();
  modal.interactiveElements.forEach(element => element.setAttribute('tabindex', '-1'));
  wrapper.setAttribute('tabindex', '0');
  wrapper.interactiveElements.forEach(element => element.setAttribute('tabindex', '0'));
  document.title = docTitle;
  trigger.focus();	// Return the focus to the source element
}

/***  Close your modal window */
// clicking close button
closeButtons.forEach((button, i) => {
  const modal = modals[i];
  button.addEventListener('click', () => close(modal));
});
// on click outside the modal
const overlays = Array.from(document.querySelectorAll('.overlay'));
overlays.forEach((overlay, i) => {
  const modal = modals[i];
  overlay.addEventListener('click', () => close(modal));
});
// pressing ESC key
window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.modal.classList.contains('js-active')) {
        close(modal);
      }
    });
  }
});
