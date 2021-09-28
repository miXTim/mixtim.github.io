<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KeepList [by miXTim]</title>
  <link rel="stylesheet" href="./style.css">
  <link rel="author" content="miXTim-juande megias roca" />
  <meta name="theme-color" media="(prefers-color-scheme: light)" content="hsl(200,100%,50%)">
</head>
<body>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css?family=Exo+2:400&display=swap" rel="stylesheet">

  <div class="app anim-opacity">
    <button class="mode-switch" title="Cambiar tema" tabindex="0">
      <svg class="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
    </button>
  
    <div class="title">KeepList &#x2705;</div>
    
    <div class="nuevaTarea">
      <label class="uc-heavy-plus" for="inputNuevaTarea" title="Escribe a continuación para agregar nueva tarea"></label>
      <input type="text" id="inputNuevaTarea" placeholder=" ..." spellcheck="false" autofocus>
      <button id="btnAgregarTarea" title="Guardar nueva tarea">&#x2714;</button>
    </div>
    
    <p class="time" title="Fecha y hora de entrada"><script type="text/javascript">
	const fechaDelDia = new Date();
	const dateLocale = fechaDelDia.toLocaleDateString();
	const horaLocale = fechaDelDia.toLocaleTimeString();
	document.write("•" + dateLocale + "-" + horaLocale + "•");
	</script></p>
    
    <ul id="contenedorTareas"></ul>
		
    <footer>
      <p>(cc)2021 <a href="https://comocrearimagen.es">miXTim</a></p>
    </footer>
  </div>

  <script src="./app.js"></script>
	
</body>
</html>
