const container = document.querySelector("#dynamic");
const operar = document.querySelector("#btnSum");
const B9 = document.querySelector("#B9");  /* P(Ingr.2)=n1 */
const C9 = document.querySelector("#C9");
const D9 = document.querySelector("#D9");
const B10 = document.querySelector("#B10");
const B13 = document.querySelector("#B13");
const D13 = document.querySelector("#D13");
const B14 = document.querySelector("#B14");  /* C(Ingr.2)=n2 */
const C14 = document.querySelector("#C14");	 /* P(Ingr.3)=n3 */
const B15 = document.querySelector("#B15");
const E13 = document.querySelector("#E13");

function sum() {
  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);
  let n3 = Number(document.getElementById("n3").value);
  let sum = Math.round((n2 * (100 - n1)) / n1);
  B13.textContent = sum; // C(Ingr.1 + 3)
  container.textContent = sum + " gr";
  B9.textContent = n1; // P(Ingr.2)
  B10.textContent = 100 - n1; // 100% - P(Ingr.2)
  C9.textContent = n2; // C(Ingr.2)
  B14.textContent = n2; // C(Ingr.2)
  C14.textContent = n3; // P(Ingr.3)
  B15.textContent = D13.textContent = n2 + sum; // C(total)
  E13.textContent = ((n2 + sum) * 4) / 100 + " gr"; // C(Ingr.3)
  E13.style.boxShadow = "0 0 2px 2px red inset";
};
