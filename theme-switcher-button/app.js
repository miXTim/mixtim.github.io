document.addEventListener("DOMContentLoaded", () => {
  // Loading icons (SVG symbols)
  const icons = document.querySelector('svg.hide');
  icons.innerHTML = '<symbol id="Light"><path d="m12 8c0 5.3-8 5.3-8 0s8-5.3 8 0z" fill="var(--clr-txt1)"/><path d="m2.8 2.8 1.2 1.2m8 8 1.2 1.2m0-10.5-1.2 1.2m-8 8-1.2 1.2m-2-5.2h1.8m11 0h1.8m-7.3-7.3v1.8m0 11v1.8" stroke-linecap="round" stroke-width="1.5" stroke="var(--clr-txt1)"/></symbol><symbol id="Dark" fill="var(--clr-txt1)"><path d="m4.4 .5c-4 1.9-5.5 6.7-3.6 10.7s6.7 6 10.7 4.1c1.1-.5 2.5-1.3 3-2.1 2.3-2.9-3.8 .8-7.7-4.4-3.9-5.2 2.4-10.5-2.4-8.3z"/></symbol><symbol id="Dim" fill="var(--clr-txt1)"><path d="m0 8c.6 10.7 15.4 10.6 16 0-.6-10.9-15.7-10.4-16 0zm8-6.5c8.7 .3 8.5 12.6 0 13z"/></symbol><symbol id="user" fill="var(--clr-txt1)"><path d="m12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 2.5c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2s-6.2-2.8-6.2-6.2 2.8-6.2 6.2-6.2zm-4.1 8.4c0.8 1.5 2.3 2.5 4.1 2.5s3.3-1 4.1-2.5zm8.2 4.7c1.2 .7 2.9 1.5 3.7 2.7-1.8 2.4-4.9 3.7-7.9 3.7-2.9 0-6.1-1.4-7.9-3.7 .8-1.2 2.5-1.9 3.7-2.6 1.3 .8 2.6 1.2 4.1 1.2 1.6 0 2.9-.4 4.1-1.2z"/></symbol><symbol id="logo"><path d="m1 13.5c0-8.33 5-12.5 15-12.5s15 4.17 15 12.5c0 5-3.125 16.9-15 17.5-11.9-.625-15-12.5-15-17.5z" fill="var(--clr-txt1)"/><path d="m5 7.5v4.2l1.31-.44v-1.25c0-.625 .44-.94 1.25-.94 .813-.06 1.625 .44 2.2 1.44l4.4 6.44-3.625 4.44c-.7 .875-1.7 1.56-2.94 2.06l-.25 1.06h6.375l-.25-1.06c-.44-.125-2.25-.25-1.25-1.7l3.125-3.7 3.06 4.44c2 2.75 5.625 2.875 6.25-.875l-.4-.625c-1.25 2.25-2.5 .56-2.5 .56l-4.125-6.125 4.4-5.25c.83-.83 1.7-1.21 2.5-1.125 .75 0 1.125 .21 1.125 .625v1.44l1.31 .44v-4.06zm9.1 1.56c.06-4.4e-4 .1 3.8e-4 .15 0h4.75c1 0 1.31 .5 .75 1.19l-3.4 3.94-2.75-4.19c-.44-.625-.25-.94 .475-.94z" fill="var(--surface1)"/></symbol>';

	function fillIcons(){
		// Insert USER icon
		const span = document.createElement("span");
		span.innerHTML = '<svg aria-hidden="true" focusable="false">'+'<use href="#user"></use></svg>';
		const spanBoton = document.getElementById("icon-text");
		spanBoton.parentElement.insertBefore(span, spanBoton);
	};

	window.onload = function() {
		pedirRuta("index.html", fillIcons);
	};

	function pedirRuta(ruta, ejecutarOk, ejecutarErr){
		let req =  new XMLHttpRequest();
    req.overrideMimeType("image/svg+xml");
		req.open("GET", ruta, true);
		req.onreadystatechange = function(){
			if (req.readyState == 4) {
				if (req.status == 200){
					let text = req.responseText;
					ejecutarOk(text);
				} else if (ejecutarErr) {
					ejecutarErr(req.status);
				}
			}
		};
		req.send();
	};
  
	const items = ["Light", "Dark", "Dim"];
  const list = document.createElement('ul');
  list.classList.add('subnav');

  for (let i = 0; i < items.length; i++) {
    const item = document.createElement('li');
    var itemlink = makeButton(items[i]);
    item.appendChild(itemlink);
    list.appendChild(item);
  }

	const toggles = document.querySelector('.button.action');
  toggles.addEventListener("click", function(){
    if (this.parentNode.className == "theme") {
      this.parentNode.appendChild(list);
      this.parentNode.className = "theme open";
      this.parentNode.setAttribute('aria-expanded', "true");

      const btns = document.querySelectorAll('ul.subnav li button');
      btns.forEach(btn => {
        btn.addEventListener("click", function(){
          for (let j = 0; j < btns.length; j++) {
            btns[j].parentNode.className ='';
          }
          btn.parentNode.className ='active-menu-item';
          document.documentElement.className = btn.textContent;
	        const wrap = toggles.querySelector('span svg');
          wrap.setHTML('<use href=\"#' + btn.textContent +'\"></use>');
          toggles.setAttribute('title', btn.textContent + " theme");
        });
      });
    } else {
      this.parentNode.className = "theme";
      this.parentNode.setAttribute('aria-expanded', "false");
      this.parentNode.removeChild(list);
    }
    return false;
  });

  function makeButton(text){
    let temp = document.createElement('button');
    temp.setAttribute('type', 'button');
    temp.classList.add('button', 'has-icon');
    const span = document.createElement('span');
    span.classList.add('button-wrap');
    const ico = document.createElement('span');
    ico.innerHTML = '<svg aria-hidden=\"true\" focusable=\"false\">'+'<use href=\"#' + text +'\"></use></svg>';
    span.appendChild(ico);
    span.appendChild(document.createTextNode(text));
    temp.appendChild(span);
    return temp;
  }

  function coloreado() {
    let elementos = document.querySelectorAll(".etiq div");
    for (let i = 0, max = elementos.length; i < max; i++) {
      let clr = colorHSL(i, max, 65, 90, 1, false);
      elementos[i].style.backgroundColor = clr;
    }
  }

  function colorHSL(v, max, sat, lum, a, comp_b) {
    max = max || 360;
    sat = sat || 60;
    lum = lum || 60; 
    a = a || Math.random();  
  
    var c = Math.round((v / max) * 359) % 360;
    var c2 = (c + 180) % 360;
    c = comp_b ? c2 : c;
    return "hsla(" + c + ", " + sat + "%, " + lum + "%, " + a + ")";
  }
  coloreado()

});
