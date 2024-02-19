//Inicio
$(document).ready(function () {
 
    //1ER PASO: valida que entre un número en formato numérico
    function validar(num) {
       let expresion = /^[0-9]+$/;
       if(expresion.test(num)){
           if(num > 732){
               alert('Solo hay 732 superhéroes disponibles.');
               return false;
           }
           console.log(num);
           return true;
       }else{
           alert('Ingrese un número válido');
           return false;
       }
   }
   
   
   //2DO PASO: llamado a la API
   function llamarAPI(num) {
       $.getJSON(`https://superheroapi.com/api.php/2619421814940190/${num}`, generarCard);
   }
   
   
   
   //3ER PASO: Generar la card con los datos de la API
   function generarCard(respuesta) {
       //Imprime la respuesta en la consola
       console.log(respuesta)
   
       // limpia la card antes de agregar nueva información
       $('#cardHeroe').empty();
   
       //crea el html de la card
       let cardHTML = `
           <h3>Super Héroe Encontrado</h3>
           <div class="card">
           <div class="row">
           <div class="col-md-4">
               <img src="${respuesta.image.url}" class="card-img" alt="" />
           </div>
           <div class="col-md-8">
           <div class="card-body">
               <h5 class="card-title">Nombre: ${respuesta.name}</h5>
                   <p class="card-text">Conexiones: ${respuesta.connections["group-affiliation"]}</p>
                   <ul class="list-group">
                       <li class="list-group-item"><em>Publicado por</em>: ${respuesta.biography.publisher}</li>
                       <li class="list-group-item"><em>Ocupación</em>: ${respuesta.work.occupation}</li>
                       <li class="list-group-item"><em>Primera Aparición</em>: ${respuesta.biography["first-appearance"]}</li>
                       <li class="list-group-item"><em>Altura</em>: ${respuesta.appearance.height.join("-")}</li>
                       <li class="list-group-item"><em>Peso</em>: ${respuesta.appearance.weight.join("-")}</li>
                       <li class="list-group-item"><em>Alianzas</em>: ${respuesta.biography.aliases.join(", ")}</li>
                   </ul>
           </div>
           </div>
           </div>
           </div>
       `;
   
       // Agregar la card al DOM
       $('#cardHeroe').append(cardHTML);
   
       // Muestra la card en el index
       $('#cardHeroe').show();
   
       // Crea los datos para el gráfico
       let dataPoints = [
           { label: "Inteligencia", y: parseInt(respuesta.powerstats.intelligence) },
           { label: "Fuerza", y: parseInt(respuesta.powerstats.strength) },
           { label: "Rapidez", y: parseInt(respuesta.powerstats.speed) },
           { label: "Durabilidad", y: parseInt(respuesta.powerstats.durability) },
           { label: "Poder", y: parseInt(respuesta.powerstats.power) },
           { label: "Combate", y: parseInt(respuesta.powerstats.combat) }
       ];
   
   
       //configura opciones del grafico: titulo, estilo de grafico
       let options = {
           title: {
               text: `Estadísticas de Poder ${respuesta.name} `,
           },
           data: [{
               type: "pie",
               dataPoints: dataPoints
           }]
       };
   
       //crea el grafico
       $("#chartContainer").CanvasJSChart(options);
   }
   
       //Maneja el 'evento' de envío de formulario-evita que recargue, valide que entre un numero y llame a la API
       $('#formHeroe').on('submit', function(e){
           e.preventDefault();
       let num = $('#numeroHeroe').val();
       if(validar(num)){
           // Si validar(num) devuelve true, realiza la llamada AJAX
           llamarAPI(num);
       }
   })
   
   })