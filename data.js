
        ///---------------------------STEPPER----------------------------///
    /* defino los pasos */
    let stepper2 = new Stepper(document.querySelector('#stepper2'), 
                {
                    linear: false,
                    animation: true,
                    selectors: {
                                steps: '.step',
                                trigger: '.step-trigger',
                                stepper: '.bs-stepper'
                                }
                }
        )

        ///---------------------------CONECTAR A JSON LOCAL----------------------------///
let url = "assets/data/cpu.json";
   document.addEventListener("DOMContentLoaded", function(e) {
    fetchData(url);
    console.log("DOM cargado");
  });

const fetchData = async(url) => {     //consumir json
    try{
        const resData = await fetch(url);
        const data = await resData.json();
        let selector = "#s1e"
        

        const resStep =await fetch('assets/data/steps.json');
        const steps = await resStep.json();
        
        writeCardHtml(data,selector);
        pescarBtnAgregar(data,steps);
        pescarSteps(steps);

    }
    catch (error){
        console.log(error);
        //document.querySelector('body')innerHTML = ``
    }
} 

      /* ESCRIBIR */
function pescarSteps(steps){

let btnPasos = document.querySelectorAll('#stepper2 .step') 
    btnPasos.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            let paso = steps.find(item => item.step === btn.dataset.target); //controlo que exista
            
            let selector = paso.step+"e" ///para armar selector para escribir  
            
            document.querySelector(selector).innerHTML = ""; //---> limpio para luego reescribir
            llamoJson(paso.url,selector,steps); //llamo Json  
        })
    })
} 
function nextCarrito(p){

            //usar el p.next para cargar los siguietnes.

    let x = document.querySelector('#stepper2 .step.active');
    let target = x.dataset.target;
     console.log(target)
   
         for (const k in p) {
                let element = p[k];
               if(target===element.step){
                    let selector = element.next+"e" ///para armar selector para escribir
                    llamoJson(element.nurl,selector,p)
                    stepper2.next();
                    break;  
                }    
        } 
}


function llamoJson(Url,s,p){ //url json, selector donde escribir 
    console.log("entre el llamoJson")
    $.ajax({
        url: Url,
        success: function(r) {
            //console.log(respuesta);
            writeCardHtml(r,s);
            pescarBtnAgregar(r,p);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
            document.querySelector(s).innerHTML = "Lo siento!, no se han encontrado Datos"; 
        }
    });
}

function writeCardHtml(data,selector){
    let cardProducto = document.querySelector(selector) //capturo donde voy a escribir creando un children
    let template = document.querySelector('#templateProductos').content; // tomo template (Html que voy a usar para escribir)
    let fragment = document.createDocumentFragment(); // otra opcion new DocumentFragment();

        data.forEach(producto => {
        //console.log(producto)
                //capturo
                template.querySelector('img').setAttribute('src', producto.imagen);  //busco la etiqueta img dentro de la card, selecciono el atributo src y le asigno el atributo el objeto creado con el json
                template.querySelector('h5').textContent = `${producto.marca}-${producto.linea}-${producto.modelo}`;
                template.querySelector('p.card-text span').textContent = format(producto.precio,1);
                template.querySelector('#stock span').textContent = producto.cantidad;
                //construyo dataset para id, de cada elemento BOTON AGREGAR, BOTON INFO
                template.querySelector('button#agregarACarrito').dataset.id = producto.id;
                template.querySelector('#infoProducto').dataset.target = `#${producto.id}i`;
                        //console.log(producto.id)
                //a lo ultimo clonar template
                        /* MODAL DETALLE */
                template.querySelector('div.modal').setAttribute("id",`${producto.id}i`) 
                template.querySelector('p#detalleProducto').textContent = `${producto.descripcion}`; /* Detalle */
                template.querySelector('#modalTitulo').textContent = `${producto.marca}-${producto.linea}-${producto.modelo}`;
                template.querySelector('.modal-footer button#agregarACarrito').dataset.id = producto.id; /* Boton Carrito */
                
                        //Armo detalle
                template.querySelector("div.row.d-flex.justify-content-between").setAttribute("id",`${producto.id}d`)
                //console.log(template)  
                template.querySelector(`#${producto.id}d`).innerHTML = ""; //limpio              
                for (const key in producto.detalle) {
                    if (Object.hasOwnProperty.call (producto.detalle, key)) {
                        const element = producto.detalle[key];    
                        template.querySelector(`#${producto.id}d`).innerHTML += `<p class="col-6">${key}: <span class="font-weight-bold">${element}</span></p>`;
                    }
                } 

                let clone = template.cloneNode(true);
            
                fragment.appendChild(clone);        //almaceno todo el contenido antes de escribirlo en el HTML
                 
        });
        cardProducto.appendChild(fragment); //escribo el html
        //console.log(cardProducto)
    };


  