document.addEventListener("DOMContentLoaded", function() {
    const victoriasLista = document.getElementById("victorias-lista");
    const configForm = document.getElementById("config-form");
    const cartonesContainer = document.getElementById("cartones");
    const sacarNumeroBtn = document.getElementById("sacar-numero");

  
    let jugadores = [];
    let cartones = [];
    let puntajes = [];
  
    // Cargar victorias acumuladas desde localStorage
    function cargarVictorias() {
      const victoriasGuardadas = JSON.parse(localStorage.getItem("victorias")) || {};
      for (const jugador in victoriasGuardadas) {
        const listItem = document.createElement("li");
        listItem.textContent = `${jugador}: ${victoriasGuardadas[jugador]}`;
        victoriasLista.appendChild(listItem);
      }
    }
  
    cargarVictorias();
  
    // Generar cartón de tamaño N x N
    function generarCarton(tamaño) {
      const numerosDisponibles = Array.from({ length: 50 }, (_, i) => i + 1);
      const carton = [];
      for (let i = 0; i < tamaño; i++) {
        const fila = [];
        for (let j = 0; j < tamaño; j++) {
          const randomIndex = Math.floor(Math.random() * numerosDisponibles.length);
          fila.push(numerosDisponibles.splice(randomIndex, 1)[0]);
        }
        carton.push(fila);
      }
      return carton;
    }
  
    // Iniciar juego de Bingo
    function iniciarJuego(event) {
      event.preventDefault();
      const jugador1 = document.getElementById("player1").value;
      const jugador2 = document.getElementById("player2").value;
      const jugador3 = document.getElementById("player3").value;
      const jugador4 = document.getElementById("player4").value;
      // Obtener nombres de los jugadores
      // Aquí deberías obtener el nombre de los otros jugadores de manera similar
      jugadores = [jugador1,jugador2,jugador3,jugador4];
      // Generar cartones para todos los jugadores
      const tamañoCarton = parseInt(document.getElementById("carton-size").value);
      cartones = jugadores.map(() => generarCarton(tamañoCarton));
      // Mostrar cartones en la interfaz
      mostrarCartones();
      // Mostrar sección de juego y ocultar menú principal
      document.getElementById("menu").style.display = "none";
      document.getElementById("juego").style.display = "block";
    }
  
    // Mostrar cartones en la interfaz
    function mostrarCartones() {
      cartonesContainer.innerHTML = "";
      cartones.forEach((carton, index) => {
        const cartonDiv = document.createElement("div");
        cartonDiv.classList.add("carton");
        cartonDiv.innerHTML = `<h3>${jugadores[index]}</h3>`;
        const table = document.createElement("table");
        carton.forEach(fila => {
          const tr = document.createElement("tr");
          fila.forEach(numero => {
            const td = document.createElement("td");
            td.textContent = numero;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        });
        cartonDiv.appendChild(table);
        cartonesContainer.appendChild(cartonDiv);
      });
    }
  
  
    // Generar número aleatorio entre 1 y 50
    function generarNumeroAleatorio() {
      return Math.floor(Math.random() * 50) + 1;
    }

  
    // Finalizar juego y mostrar resultados
    function finalizarJuego(jugadorIndex) {
      const victoriasGuardadas = JSON.parse(localStorage.getItem("victorias")) || {};
      const jugador = jugadores[jugadorIndex];
      const victorias = (victoriasGuardadas[jugador] || 0) + 1;
      victoriasGuardadas[jugador] = victorias;
      localStorage.setItem("victorias", JSON.stringify(victoriasGuardadas));
      alert(`¡Felicidades ${jugador}! Has ganado el juego.`);
      location.reload();
    }
  
    // Manejar evento de inicio de juego
    configForm.addEventListener("submit", iniciarJuego);
    // Manejar evento de sacar número de Bingo
    sacarNumeroBtn.addEventListener("click", sacarNumero);
  });
  