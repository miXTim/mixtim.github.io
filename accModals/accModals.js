/*
	Accessible Modals Widget
	EcmaScript version: 6
*/
const wrapper = document.getElementById('container');
let lightbox = document.querySelectorAll('.lightbox');
let btnOpen = document.querySelectorAll('[data-open-btn]');
let btnClose = document.querySelectorAll('.btn-close');
let docTitle = document.title;
let self, trigger, e, i = 0;
const activeClass = 'modal-open';
const body = document.body;
// todos los elementos que pueden tener foco
const INTERACTIVE_SELECTORS = ['a','button','iframe','input','select','textarea','[tabindex]','[contenteditable]'];
// return focus helper
function btnGet(e) {
	trigger = e;
	return trigger;
}
/*** creamos un constructor de clase con sus propiedades y métodos ***/
class modalWindow{
  constructor(doc, modal) {
    this.doc = doc;
    this.modal = modal;
    this.interactiveElementsList = [];
    this.blockElementsList = [];
  }
	// el método utilizado para crear la ventana modal
  create() {
		// wrapper o tambien this.doc
    let elements = wrapper.querySelectorAll(INTERACTIVE_SELECTORS.toString());
    let element;
		// recorremos el Array to make controls not focusable in #container
    for (let i = 0; i < elements.length; i++) {
      element = elements[i];
      if (!this.modal.contains(element)) {
        if (element.getAttribute('tabindex') !== '-1') {
          element.setAttribute('tabindex', '-1');
          this.interactiveElementsList.push(element);
        }
      }
    }
		// Tomamos todos los hijos del body Node
    let children = this.doc.body.children;
		if (!body.classList.contains(activeClass)) {
			body.classList.add(activeClass);
			for (let i = 0; i < children.length; i++) {
				element = children[i];
				if (!this.modal.contains(element)) {
					if (element.getAttribute('aria-hidden') !== 'true') {
						element.setAttribute('aria-hidden', 'true');
						this.blockElementsList.push(element);
					}
				}
			}
    }
  }
	// El método utilizado para eliminar el modal
  remove() {
    let element;
    while(this.interactiveElementsList.length !== 0) {
      element = this.interactiveElementsList.pop();
      element.setAttribute('tabindex', '0');
    }

    while(this.interactiveElementsList.length !== 0) {
      element = this.interactiveElementsList.pop();
      element.setAttribute('aria-hidden', 'false');
    }
    body.classList.remove(activeClass);
    wrapper.setAttribute('aria-hidden', 'false');
  }
}
// Creamos una instancia de la clase "modalWindow"
let modaWindow = document.querySelectorAll('.modal');
const modal = new modalWindow(document, modaWindow[i]);

/*** Open the modal ***/
// loop through modal triggers
for (let i = 0; i < btnOpen.length; i++) {
	self = btnOpen[i];
	self.addEventListener('click', () => {
		modal.create();  // llamada al método
		modaWindow[i].removeAttribute('closing');
		modaWindow[i].setAttribute('aria-modal', true);
    // toggle the 'active' class on the modal itself, used to show/hide the modal
		modaWindow[i].classList.add('active');
		modaWindow[i].setAttribute('aria-hidden', false);
		// make all controls in the modal accessible to keyboard navigation
    let elements = lightbox[i].querySelectorAll(INTERACTIVE_SELECTORS.toString());
    let element;
    for (let i = 0; i < elements.length; i++) {
      element = elements[i];
			if (element.getAttribute('tabindex') !== '0') {
				element.setAttribute('tabindex', '0');
			}
    }
		// Close your modal window pressing ESC key
		window.addEventListener("keyup", function(ev){
			if (ev.key == 'Escape'){
				close(modaWindow[i]);
			}
		}, false);
		// change window title
		console.log(docTitle);
		document.title = document.title + " | " + modaWindow[i].id;
	});
}

/*** Close the modal ***/
function close(Modal){
  Modal.classList.remove('active');
  Modal.setAttribute('aria-hidden', true);
  Modal.setAttribute('aria-modal', false);
  Modal.setAttribute('closing',"");  // used in CSS fade-out animation
  modal.remove();  // llamada al método
    let controls = lightbox[i].querySelectorAll(INTERACTIVE_SELECTORS.toString());
    let element;
		// make all controls not focusable in closed modals
    for (let i = 0; i < controls.length; i++) {
      element = controls[i];
			if (element.getAttribute('tabindex') !== '-1') {
				element.setAttribute('tabindex', '-1');
			}
    }
	// change window title
	document.title = docTitle;
	trigger.focus();	// Returns the focus to the source element
}

// close the modal clicking on the '.btn-close' button
for (let i = 0; i < btnClose.length; i++) {
	let btnC;
	btnC = btnClose[i];
	btnC.addEventListener('click', () => {
		close(modaWindow[i]);
	})
};

// when the user clicks on the background, closes the modal
let modalOverlay = document.getElementsByClassName('overlay');
let overlay;
for (let i = 0; i < modalOverlay.length; i++) {
	overlay = modalOverlay[i];
	overlay.onclick = function() {
		close(modaWindow[i]);
	};
}
/*
Si hay problemas con la navegación en elementos de texto
en dispositivos móviles, probar la seguiente selección
*/
//ln.39	const BLOCKS_SELECTORS = ['div','header','main','section','footer'];
//		|	let children = this.doc.querySelectorAll(BLOCKS_SELECTORS .toString());
