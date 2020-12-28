
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
        writeCardHtml(data,selector);
        pescarBtnAgregar(data);

        const resStep =await fetch('assets/data/steps.json');
        const steps = await resStep.json();
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
        
            //console.log(paso.step)
            let selector = paso.step.slice(0,3)+ "e"
            //console.log(selector) ///para armar selector para escribir
            //let selector = paso.step
            document.querySelector(selector).innerHTML = ""; //---> limpio para luego reescribir
            
           //llamo Json 
           $.ajax({
            url: paso.url,
            success: function(respuesta) {
                //console.log(respuesta);
                writeCardHtml(respuesta,selector);
                pescarBtnAgregar(respuesta);
            },
            error: function() {
                console.log("No se ha podido obtener la información");
            }
        });
            
        })


    })
} 

    
function writeCardHtml(data,selector){
    // limpio el child si existe --> Control
    let a = `${selector} .grid-fluid.p-1`
    //console.log(a) 
    if($(a).length) { 
        let padre = document.querySelector(selector)
        let hijo = document.querySelectorAll(".grid-fluid.p-1")
        padre.removeChild(hijo); 
    } 

    let cardProducto = document.querySelector(selector) //capturo donde voy a escribir creando un children
    let template = document.querySelector('#templateProductos').content; // tomo template (Html que voy a usar para escribir)
    let fragment = document.createDocumentFragment(); // otra opcion new DocumentFragment();

        data.forEach(producto => {
        //console.log(producto)
                //capturo
                template.querySelector('img').setAttribute('src', producto.imagen);  //busco la etiqueta img dentro de la card, selecciono el atributo src y le asigno el atributo el objeto creado con el json
                template.querySelector('h5').textContent = `${producto.marca}-${producto.linea}-${producto.modelo}`;
                template.querySelector('p.card-text span').textContent = producto.precio;
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
                for (const key in producto.detalle) {
                    if (producto.detalle.hasOwnProperty(key)) {
                        const element = producto.detalle[key];
                        template.querySelector('div.row#infoProductoModal').innerHTML += `<p class="col-6">${key}: <span class="font-weight-bold">${element}</span></p>`;
                    }
                }
            let clone = template.cloneNode(true);
            
            // console.log("este es un clon --> "+clone)
                fragment.appendChild(clone);        //almaceno todo el contenido antes de escribirlo en el HTML
            // console.log(fragment +"<-- framento")
           
            
        });
        cardProducto.appendChild(fragment); //escribo el html
        //console.log(cardProducto)
    };
