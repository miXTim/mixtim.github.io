const container = document.querySelector("#dynamic");
const operar = document.querySelector("#btnSum");
const A3 = document.querySelector("#A3");  /* P(Ingr.1) */
const A4 = document.querySelector("#A4");  /* C(Ingr.1) */
const A6 = document.querySelector("#A6");  /* P(Ingr.2)=n1 */
const B6 = document.querySelector("#B6");
const A7 = document.querySelector("#A7");
const A9 = document.querySelector("#A9");
const C9 = document.querySelector("#C9");
const A10 = document.querySelector("#A10");  /* C(Ingr.2)=n2 */
const B10 = document.querySelector("#B10");	 /* P(Ingr.3)=n3 */
const A11 = document.querySelector("#A11");
const C11 = document.querySelector("#C11");

operar.addEventListener("click", function() {
  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);
  let n3 = Number(document.getElementById("n3").value);
  
  if(n1 && n2 > 0) {
	let sum = Math.round((n2 * (100 - n1)) / n1);
	container.textContent = sum + " gr";
	A3.textContent = 100 - (n1 + n3);  // P(Ingr.1)
	A6.textContent = n1;  // P(Ingr.2)
	A7.textContent = 100 - n1; // 100% - P(Ingr.2)
	A9.textContent = sum;  // C(Ingr.1 + 3)
	B6.textContent = A10.textContent = n2; // C(Ingr.2)
	B10.textContent = n3; // P(Ingr.3)
	A11.textContent = C9.textContent = n2 + sum; // C(total)
	C11.textContent = ((n2 + sum) * n3) / 100 + " gr"; // C(Ingr.3)
	C11.style.boxShadow = "0 0 2px 2px var(--DR01-4) inset";
	A4.textContent = (n2 + sum) - Math.round((n2 + ((n2 + sum) * n3) / 100)); // C(Ingr.1)
  }
});

/* Calculadora */
const result = document.getElementById("result");
const buttonsContainer = document.getElementById("buttons");
const buttons = [
	"7", "8", "9", "C", 
	"4", "5", "6", "+", 
	"1", "2", "3", "-",
	".", "0", "/", "*",
	"="
];
buttons.forEach(button => {
	const btn = document.createElement("button");
	btn.textContent = button;
	btn.onclick = () => handleButtonClick(button);
	buttonsContainer.appendChild(btn);
});
function handleButtonClick(value) {
	if (value === "C") {
		result.value = "";
	} else if (value === "=") {
		try {
			result.value = eval(result.value);
		} catch {
			result.value = "Error";
		}
	} else {
		if (result.value === "0" || result.value === "") {
			result.value = value;
		} else {
			result.value += value;
		}
	}
}