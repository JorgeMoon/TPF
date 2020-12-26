

    ///---------------------------INICIO CONECTAR MERCADOLIBRE------------------------------///

    /* Para conectar con API */
    /* const appID= 72205757860432;
    const secretKey = "nqgq7qHHqkN4uGLfOcKrPQG4FOLAJjaI"; */
    
    //Categorias encontradas con el metodo "https://api.mercadolibre.com/sites/MLA/search?q=AMD%20Procesador"
            //PRocesadores              -->             MLA1693
            //Motherboard               -->             MLA1692
            //Coolers y Ventiladores    -->             MLA430788
            // Gabinetes y Soporte      -->             MLA1696
            //Memo Ram                  -->             MLA1694
            //Placa de Video            -->             MLA1658
    
    //busqeuda por categoria
    "https://api.mercadolibre.com/sites/MLA/search?category=MLA3794"
    
    //busqueda con search
    /*     let urlSearchAmdProcesador= "https://api.mercadolibre.com/sites/MLA/search?q=AMD%20Procesador"
    
        var the_url = "https://api.mercadolibre.com/categories/MLA1648"; //<--- link categoria Computacion
        let urlProductoProcesador = "https://api.mercadolibre.com/categories/MLA447778"
    let i =0; */
    /* 
    $.ajax({
        url:urlSearchAmdProcesador, //urlProductoProcesador,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer nqgq7qHHqkN4uGLfOcKrPQG4FOLAJjaI")
        }, success: function(data){
            //alert(data);
            console.log(data.results)  //<-- para ver lo que trae desde mercadolibre
            //process the JSON data etc
            writeCardHtml(data.results);
            pescarBtnAgregar(data.results);
            initToolTip();
            //pescarBtnDetalle(data); 
        }
    })
    
    let cardProducto = document.querySelector('#productosMothers') //capturo el lugar donde voy a escribir
    let template = document.querySelector('#templateProductosMothers').content // tomo el html para escribir
    let fragment = document.createDocumentFragment(); // otra opcion new DocumentFragment();
    

    
    function writeCardHtml (data){
        
        data.forEach(producto => {
    
           console.log(producto.thumbnail)
           console.log(producto.title)
           console.log(producto.price)
           console.log(producto.id)
                //capturo
                template.querySelector('img').setAttribute('src', producto.thumbnail);  //busco la etiqueta img dentro de la card, selecciono el atributo src y le asigno el atributo el objeto creado con el json
                template.querySelector('h5').textContent = producto.title;
                template.querySelector('p span').textContent = producto.price;
                //construyo dataset para id, de cada elemento BOTON AGREGAR
                template.querySelector('button').dataset.id = producto.id;
                //construyo dataset para id, de cada elemento BOTON AGREGAR
                //template.querySelector('a').dataset.id = producto.id;
                //a lo ultimo clonar template
               let clone = template.cloneNode(true);
               //console.log("este es un clon --> "+clone)
                fragment.appendChild(clone);        //almaceno todo el contenido antes de escribirlo en el HTML
                //console.log(fragment +"<-- framento")
        });
        cardProducto.appendChild(fragment);
    };
     */
    
    
        ///---------------------------FIN CONECTAR CON MERCADOLIBRE----------------------------///


        ///---------------------------CONECTAR A JSON LOCAL----------------------------///
     let url = 'assets/data/cpu.json';
   document.addEventListener("DOMContentLoaded", function(e) {
    //fetchPasos();
    fetchData();
    console.log("DOM cargado");
  });

  const fetchPasos = async() =>{
      try{
          const res = await fetch('assets/data/steps.json')
          const step = await res.json();
         // console.log(step)
         writePasos(step);
      }
      catch (error){
          console.log(error)
      }
  }

const fetchData = async() => {     //consumir json
    try{
        const res = await fetch(url);
        const data = await res.json();
        //console.log(res);
        writeCardHtml(data);
        pescarBtnAgregar(data);
       
        initToolTip();

        //pescarBtnDetalle(data); 

    }
    catch (error){
        console.log(error);
        //document.querySelector('body')innerHTML = ``
    }
} 
      /* ESCRIBIR */
  
    //dibujo pasos
    let steps = document.querySelector("#stepper2 .bs-stepper-header") //capturo donde voy a escribir creando un children
    console.log(steps)
    let templateSteps = document.querySelector('#templateSteps').content; // tomo template (Html que voy a usar para escribir)
    let fragmentSteps = document.createDocumentFragment(); // otra opcion new DocumentFragment();
    
function writePasos(step){
    step.forEach(paso =>{
        templateSteps.querySelector('div.step').setAttribute("data-target",`#test-nl-${paso.step}`);
        
        templateSteps.querySelector('img').setAttribute('src', paso.img);
            

        let clone = templateSteps.cloneNode(true);
        // console.log("este es un clon --> "+clone)
        fragmentSteps.appendChild(clone);
    })
    steps.appendChild(fragmentSteps);
    }

let ID = '#productosCPU';

let cardProducto = document.querySelector(ID) //capturo donde voy a escribir creando un children
let template = document.querySelector('#templateProductos').content; // tomo template (Html que voy a usar para escribir)
let fragment = document.createDocumentFragment(); // otra opcion new DocumentFragment();

function writeCardHtml(data){
    data.forEach(producto => {
       //console.log(producto)
            //capturo
            template.querySelector('img').setAttribute('src', producto.imagen);  //busco la etiqueta img dentro de la card, selecciono el atributo src y le asigno el atributo el objeto creado con el json
            template.querySelector('h5').textContent = `${producto.marca}-${producto.linea}-${producto.modelo}`;
            template.querySelector('p.card-text span').textContent = producto.precio;
            template.querySelector('#stock span').textContent = producto.cantidad;
            //construyo dataset para id, de cada elemento BOTON AGREGAR
            template.querySelector('button#agregarACarrito').dataset.id = producto.id;
           
            //a lo ultimo clonar template
                    /* MODAL DETALLE */
            template.querySelector('p#detalleProducto').textContent = `${producto.descripcion}`; /* Detalle */
            template.querySelector('#modalTitulo').textContent = `${producto.marca}-${producto.linea}-${producto.modelo}`;
            template.querySelector('button#agregarACarritoModal').dataset.id = producto.id; /* Boton Carrito */
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
};
