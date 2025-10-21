document.addEventListener('DOMContentLoaded', () => {
  function formatTime(timestamp) {
    if (!timestamp) return 'N/A';
    // Multiplicar por 1000 porque JavaScript espera milisegundos
    const date = new Date(timestamp * 1000); 
    // Usar toLocaleTimeString para un formato amigable al usuario
    return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // O true, dependiendo de la preferencia
    });
}
  const form = document.querySelector('form');
  const container = document.querySelector('.container');
  const loader = document.getElementById('loader');
  const plane = document.querySelector('.plane');

  // Cargar Lottie Web Component UNA VEZ
  const animationScript = document.createElement('script');
  animationScript.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js";
  animationScript.type = "module";
  document.head.appendChild(animationScript);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formDat = new FormData(e.target);
    container.remove();
    // Mostrar loader con animación Lottie
    loader.style.display = 'flex';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';

    // Insertar la animación correctamente como HTML
    plane.innerHTML = `
      <dotlottie-wc
        src="https://lottie.host/c1884d53-1ef5-4663-b820-17264c29dae3/ytqdt2SBBy.json"
        style="width: 300px; height: 300px"
        autoplay
        loop>
      </dotlottie-wc>
    `;

    loader.appendChild(plane);

    try {
      const response = await fetch("handle/", {
        method: 'POST',
        headers: { "X-CSRFToken": formDat.get('csrfmiddlewaretoken') },
        body: formDat
      });

      const data = await response.json();

      const query = data.data.data.request?.query || 'desconocido';
      const result = data.data.data.response?.data || 'none';
      // Esperar un poco para simular carga
      if (data.data.data.response.data) {
        setTimeout(() => {
          // Asumo que 'query', 'loader', y 'plane' están definidos

          // 1. Limpieza inicial
          loader.style.display = 'none';
          plane.innerHTML = '';

          // 2. Definición de constantes para IDs y clases
          const COLLAPSE_ID = 'flightCollapseContainer'; // ID más descriptivo
          const FLIGHT_QUERY = query || 'desconocido'; // Asegurar que 'query' sea seguro
          const flightDetails = data.data.data.response.data[0];
          // 3. Crear un Fragmento de Documento para optimizar la inserción
          const collapseButton = document.createElement('button');
          collapseButton.type = 'button';
          collapseButton.classList.add('btn','btn-primary');
          collapseButton.setAttribute('data-bs-toggle','collapse');
          collapseButton.setAttribute('data-bs-target','#collapseWidthExample');
          collapseButton.setAttribute('aria-expanded','false');
          collapseButton.setAttribute('aria-controls','collapseWidthExample');
          collapseButton.textContent = `Vuelo ${FLIGHT_QUERY}`;

          const divContainer = document.createElement('div');
          divContainer.style.minWidth = '50vw';
          const divCollapse = document.createElement('div');
          const divContent = document.createElement('div');
          divContent.classList.add('card','card-body');
          divContent.style.width = '60vw';
          divCollapse.classList.add('collapse','show','collapse-horizontal');
          divCollapse.id = 'collapseWidthExample';

          
          // CORRECCIÓN DE SINTAXIS: Usar notación de objeto para estilos
         
          const callsign = flightDetails.identification.callsign;
          const airlineName = flightDetails.airline.name;
          const aircraftModel = flightDetails.aircraft.model.code;
          const originCode = flightDetails.airport.origin.name;
          const destinationCode = flightDetails.airport.destination.name;
          const statusText = flightDetails.status.text;
          const scheduledDeparture = formatTime(flightDetails.time.scheduled.departure);
          const estimatedArrival = formatTime(flightDetails.time.scheduled.arrival);
          // Añadir contenido (puedes personalizar esto con más datos de la API)
          const flightContent = `
    <div class="flight-details p-3">
        <h5 class="mb-3 text-primary">${airlineName} - ${callsign}</h5>
        
        <p class="mb-2">
            <strong>Ruta:</strong> ${originCode} &rarr; ${destinationCode}
        </p>
        
        <p class="mb-2">
            <strong>Aeronave:</strong> ${aircraftModel}
        </p>

        <p class="mb-2">
            <strong>Salida Est.:</strong> ${scheduledDeparture}
        </p>

        <p class="mb-2">
            <strong>Llegada Est.:</strong> ${estimatedArrival}
        </p>

        <p class="mt-3 p-2 bg-info text-white rounded">
            <strong>Estado:</strong> ${statusText}
        </p>
    </div>
`;


          // 4. Montar la estructura final
          divContent.innerHTML = flightContent;
          divCollapse.appendChild(divContent);
          divContainer.appendChild(divCollapse);
          document.body.appendChild(collapseButton);
          document.body.appendChild(divContainer);
          console.log(data)

        }, 5000);

      } else {
        loader.style.display = 'none';
        plane.innerHTML = '';
        // Asegurando que la query sea segura


        const noResult = document.createElement('div');
        // Clases de Bootstrap y el CSS: rounded-pill es clave
        noResult.classList.add('noResult', 'position-absolute', 'top-50', 'start-50', 'translate-middle', 'rounded-pill');

        // Usamos innerHTML para incluir un icono
        noResult.innerHTML = `
    <span class="me-2">🚫</span> 
    No hemos encontrado el vuelo <strong>${query}</strong>
`;
        const returnButton = document.createElement('a');
        returnButton.classList.add('btn', 'btn-danger');
        document.body.append(noResult);
        document.body.append(returnButton);

      }



    } catch (error) {
      loader.style.display = 'none';
      plane.innerHTML = '';
      console.error(error);
    }
  });
});
