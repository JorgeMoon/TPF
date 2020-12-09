/* CONECTAR CON API JSON*/

    /* Verificar si ya se cargo HTML */
    //DOMContentLoaded se dispara cuando el HTML esta completamente cargado
   // document.addEventListener('DOMContentLoaded', e => { fetchData() });

let articulosAcumulados = 0;
/* 
   document.addEventListener("DOMContentLoaded", function(e) {
    fetchData();
    console.log("DOM cargado");
  });

const fetchData = async() => {     //consumir json
    try{
        const res = await fetch('assets/api/apiMicros.json');
        const data = await res.json();
        console.log(res);
        writeCardHtml(data);
        pescarBtnAgregar(data);
        initToolTip();

        //pescarBtnDetalle(data); 

    }
    catch (error){
        console.log(error);
    }
} */

/* 
let cardProducto = document.querySelector('#productosMothers') //capturo el lugar donde voy a escribir
let template = document.querySelector('#templateProductosMothers').content; // tomo el html para escribir
let fragment = document.createDocumentFragment(); // otra opcion new DocumentFragment();

const writeCardHtml = data => {
    
    data.forEach(producto => {

       //console.log(producto)
            //capturo
            template.querySelector('img').setAttribute('src', producto.imagen);  //busco la etiqueta img dentro de la card, selecciono el atributo src y le asigno el atributo el objeto creado con el json
            template.querySelector('h5').textContent = producto.title;
            template.querySelector('p span').textContent = producto.precio;
            //construyo dataset para id, de cada elemento BOTON AGREGAR
            template.querySelector('button').dataset.id = producto.id;
            //construyo dataset para id, de cada elemento BOTON AGREGAR
            //template.querySelector('a').dataset.id = producto.id;
            //a lo ultimo clonar template
           let clone = template.cloneNode(true);
          // console.log("este es un clon --> "+clone)
            fragment.appendChild(clone);        //almaceno todo el contenido antes de escribirlo en el HTML
           // console.log(fragment +"<-- framento")
    });
    cardProducto.appendChild(fragment);
}; */

    //identificando botones de AGREGAR para identificar producto
const pescarBtnAgregar = data => {

    let botones = document.querySelectorAll('.card button');
     
        //recorro los botones esperando el evento
    botones.forEach(btn =>{
        btn.addEventListener('click', ()=>{
                //busco dentro de data el producto, comparando el id de btn con item.id dentro del "data"

            let producto = data.find(item => item.id === btn.dataset.id);

            if(carrito.hasOwnProperty(producto.id)){        //si el objeto tiene el mismo ID
                //console.log("entro al if")
                producto.cantidad++;                    //incremento cantidad de producto
                
                   // console.log(producto.cantidad)
                    //console.log(carrito)    
            }
            else{
               //console.log("entro al else")
                producto.cantidad = Number(1);
                
            }
            carrito[producto.id] = {...producto}         //Operador de propagación - copio el producto identificado con anterioridad
                //console.log(producto.cantidad)      
           // console.log(carrito)     
            cargarBodyCarrito();
            
        })
    })
}
    //Identificamos botones de DETALLE
const pescarBtnDetalle = data => {
    let botones = document.querySelectorAll('.card a');
    //console.log(botones)
    botones.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            console.log("cliqueaste boton DETALLE");
        })
    })
}

//Objeto Carrito --> MODELO
let carrito = {};

let items = document.querySelector('#items') //Capturamos donde vamos a pintar el carrito.

const cargarBodyCarrito = () =>{
    const template = document.querySelector('#templateBodyCarrito').content; //accedemos al contenido del "paso 1: crear template"
    const fragment = document.createDocumentFragment(); //"paso 2: Crear fragment"
    
        items.innerHTML = ""; //---> limpio para luego reescribir
        articulosAcumulados=0;
    //posibilidad 1 -> trabajo sobre el objeto
     for (const key in carrito) {
        if (carrito.hasOwnProperty(key)){       //paso 3: pregunta si el objeto tiene el mismo ID
            const element = carrito[key]   
           //console.log(carrito) 
                    //paso 4: Aca voy escribiendo las partes de la tabla
            template.querySelector('th').textContent = element.id;
            template.querySelectorAll('td')[0].textContent = element.title;
            template.querySelectorAll('td')[1].textContent = element.cantidad;
            template.querySelector('td span').textContent = element.price*element.cantidad;    //ya voy multiplicando el precio por cantidad, pero no guarde el dato
               //console.log(element.price)
            //botones + y - <-- se le asigna el ID a cada boton en relacion al producto creado
            template.querySelector('td button.btn-info').dataset.id = element.id;
            template.querySelector('td button.btn-danger').dataset.id = element.id;
 
            
            const clone = template.cloneNode(true);     //paso 5: clonamos el template
            fragment.appendChild(clone);                //paso 6: pasamos al fragment el clon
            //console.log(element.cantidad)
            articulosAcumulados+=element.cantidad; //voy acumular los articulos
        }
        items.appendChild(fragment);        //paso 7: hacemos el hijo del fragmen para pegar en el DOM.
    }
    notificar(articulosAcumulados);  //Notificar
    cargarFooterCarrito() ;  ////Aca vamos a poner el total $ y total de Productos
    btnAccionesCarrito();       //Botones del Carrito
    btnVaciarCarrito();         //Botonera del footer del carrito
}

const footerCarrito = document.getElementById("footer") //ID donde voy a cargar
const cargarFooterCarrito = () =>{              //Aca vamos a poner el total $ y total de Productos
    const template = document.getElementById("templateFooterCarrito").content;
    const fragment = document.createDocumentFragment();

    footerCarrito.innerHTML ="";    //limpio para reescribir
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5"></th>
        `
        return
    }
    //sumar cantidad y sumar totales
        //primero tranformo en un array para poder usar el metodo reduce();
        //reduce tiene dos parametros "acc"= acumulador y "cantidad"= items del array que se iterar
        // (acc,{cantidad}) son los parametros de mi funcion flecha, al ser un array de objetos debo indicarle asi el items {cantidad}
        // acc + cantidad <- aca le estoy diciendo a la funcion (en este caso es una suma, pero aca es donde indicamos que es lo que le vamos a pedir) 
        //que vaya acumulando en acc lo que en cada iteracion hay en cantidad 
        // es posible usar recude para ir acumulando, restando, sumando y el proceso de iteracion
        // y con 0 <- le pido que me devuelva en un numero, si le indico {} <- le pido que me devuelva un objeto
        const productosTotales = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad, 0)
        const preciosTotales = Object.values(carrito).reduce((acc,{cantidad,price}) => acc+=cantidad*price,0)
        //console.log("productosTOtales"+productosTotales)
        //console.log("productosTOtales"+preciosTotales)
       // console.log(productosTotales)
        //console.log(preciosTotales)
    
        //aca armamos lo que vamos a mostrar, con los template
        template.querySelectorAll("td")[0].textContent = productosTotales;
        template.querySelector("td span").textContent = preciosTotales;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);

        footerCarrito.appendChild(fragment);
}
        /* VACIAR CARRITO */
const btnVaciarCarrito = () =>{
    let btnVaciarCarrito = document.getElementById("vaciarCarrito");
        btnVaciarCarrito.addEventListener("click",() =>{
            carrito = {};
            //console.log(carrito)
          
            notificar("")
            items.innerHTML = "";
            footerCarrito.innerHTML =""; 
        
        })
}
const btnAccionesCarrito = () =>{

    const btnAgregar = document.querySelectorAll('#items td .btn-info')
    const btnEliminar = document.querySelectorAll('#items td .btn-danger')

        btnAgregar.forEach(btn =>{
            btn.addEventListener("click", () =>{
               // console.log("Agregar")
                const producto = carrito[btn.dataset.id]        //btn.dataset.id -> es el ID que me trae el evento
                producto.cantidad++;    //incremento
                carrito[btn.dataset.id] = {...producto}         //Propago las propiedates
                 //Actualizamos carrito
                    cargarBodyCarrito();        
            })
        })
        btnEliminar.forEach(btn =>{
            btn.addEventListener("click", () =>{
                //console.log("Eliminar")
                const producto = carrito[btn.dataset.id];      //btn.dataset.id -> es el ID que me trae el evento
                producto.cantidad--;    //decremento
                if(producto.cantidad === 0){
                    //elimino el objeto creado con el ID
                    delete carrito[btn.dataset.id];   
                    console.log(carrito);
                }
                else{
                    carrito[btn.dataset.id] = {...producto}         //Propago las propiedates
                }
                 //Actualizamos carrito
                    cargarBodyCarrito();
            })
        })      
}

        /* BOTON SWITCH */
const btnSwitch =  document.querySelector('#switch');
btnSwitch.addEventListener('click',() =>{
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');  
} )

    ///--IN--IN--IN--IN------CARRITO------IN--IN--IN--IN--///
        /* Notificacion sobre carrito */
    function notificar(acumulado){
        document.querySelector("span.notificacion").textContent = acumulado;
    }
        /* Click sobre carrito vacio */

const notificacion =  document.getElementById('iconCarrito');
    notificacion.addEventListener('click',(e) =>{

        unSetToolTipCarrito()
       //coordenadas del Carrito
       coordCarrito();

        if(articulosAcumulados!=0 || articulosAcumulados>0){
            let x = document.getElementsByClassName("previoCarrito")[0];
                x.setAttribute("id","carrito") 
            //console.log("abri carrito")
                notificacion.setAttribute("data-target","#carrito")
                
                     
        }
} )
    function unSetToolTipCarrito() {//cuando el carrito esta lleno deje de salir el aviso de "Carrito Vacio".
         /* Falta analizar mejor */
         let x = document.getElementById("iconCarrito");
         x.setAttribute("data-toggle","collapse")
         x.setAttribute("data-placement","")
         x.setAttribute("title","")
         x.setAttribute("aria-expanded","false")
         x.setAttribute("aria-controls","collapseExample")
         x.setAttribute("aria-describedby","")
    }

        /* Conocer coordenadas de carrito */
    function coordCarrito(){
        let coords = $("button#iconCarrito").position();     //otro metodo similar es offset();
        //Le asigno las coordenadas
        $(".previoCarrito").css("left",`${coords.left}px`) 
        }

///--FIN--FIN--FIN--FIN------CARRITO------FIN--FIN--FIN--FIN--///
        /* TOOLTIP */
        function initToolTip() {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
              })
        }
 
        /* STEPPER */
    /* defino los pasos */
    let stepper2 = new Stepper(document.querySelector('#stepper2'), {
        linear: false,
        animation: true,
        selectors: {
        steps: '.step',
        trigger: '.step-trigger',
        stepper: '.bs-stepper'
      }
  })

  ///---------------------------CONOCER CAMBIO DE ANCHO DE VIEWPORT----------------------------------///

let width = $(window).width();
    $(window).on('resize', function(){
        if($(this).width() != width){
            width = $(this).width();
            //console.log(width);
            coordCarrito();//muevo carrito
        }
    }); 
///--FIN--FIN--FIN--FIN----------CONOCER CAMBIO DE ANCHO DE VIEWPORT----------FIN--FIN--FIN--FIN--///

///-----PESCAR CLICK -----///

/* let clickWindow = */ $(window).on('click', ()=>{
    console.log("Hice click") 
/*     if(flagBtnCarrito>0){
     let x = document.getElementsByClassName("previoCarrito")[0];
        x.setAttribute("class","collapse")
    } */
}) 

/* 
//obtener ID unico
var id = 100;
 function getId(){
    id+=1;
    return id;
}; 
 //CLASES
 
 class producto{
     //caracteristico
     constructor(precio,stock,marca){
         this.id = getId();
         this.precio = precio;
         this.stock = stock;
         this.marca = marca;
     };
    //Metodos obtener
    obtId(){
        return id = id;
    }
    obtPrecio() {
        return this.precio;
      }
    obtStock(){
        return this.stock;
    }
    //Metodos actualizar
    actPrecio(x){
        this.precio = x;
    }
    actStock(x){
        this.stock = x;
    }
 };
 
  
class microprocesador extends producto{
     //Caracteristicas
    constructor(precio,stock,marca,modelo,familia,nucleos,hilos,frecuencia,turbo,litografia,socket,TDP){
        super(precio,stock,marca,modelo);
        this.modelo=modelo;
        this.familia=familia;
        this.nucleos=nucleos;
        this.hilos=hilos;
        this.frecuenciaBase=frecuencia;
        this.frecuenciaTurbo=turbo;
        this.litografia=litografia;
        this.socket=socket;
        this.consumoTDP=TDP;

    };
    //Metodos
  


};

class placaMadre extends producto{
    constructor(id,precio,stock,marca,modelo,chipset,socket,slotMemorias,dimension){
        super(id,precio,stock,marca,modelo);
        this.chipset=chipset;
        this.socket=socket;
        this.slotMemorias=slotMemorias;
        this.dimension=dimension;
    };
    //metodos
};

class memoriaRam extends producto{
    constructor(id,precio,stock,marca,modelo,capacidad,frecuencia,slot,latencia,voltaje){
        super(id,precio,stock,marca,modelo);
        this.capacidad = capacidad;
        this.frecuencia = frecuencia;
        this.slot = slot;
        this.latencia = latencia;
        this.voltaje = voltaje;
    };
    //metodos
};

class almacenamiento extends producto{
    constructor(id,precio,stock,marca,modelo,conexion,consumo,tipo){
        super(id,precio,stock,marca,modelo);
        this.conexion = conexion;
        this.consumo = consumo;
        this.tipo = tipo;
    };
    //metodo

}; 


//declarando objetos / Productos
let Productos = [""];
let i=0;
var acumMicro=[];
function makeProducto(n){
    switch(n){
        case 1:
            const micro1 = new microprocesador(6548,78,"AMD","RYZEN 5","ZEN 2",6,12,3200,3600,7,"AM4",95);
            Productos[i++]= micro1;
            acumMicro[0]=+1;

        break;
        case 2:
            const micro2 = new microprocesador(6548,78,"AMD","RYZEN 7","ZEN 2",8,16,3600,4000,7,"AM4",120);
            Productos[i++]= micro2;
            acumMicro[1]=+1;
        break;
        default:
            console.error("no se creo producto,funcion makeProducto");
    }
};

function addProducto(n){
    switch(n){
        case 1:
            acumMicro[0]=+1;
        break;
        case 2:
            acumMicro[1]=+1;
        break;
        default:
            console.error("no se pudo agregar producto");
    }
};

function downProducto(n){
    switch(n){
        case 1:
            acumMicro[0]=-1;
        break;
        case 2:
            acumMicro[0]=-1;
        break;
        default:
            console.error("no se pudo quitar el producto");
    }
};

function mostrarProducto(n){

    document.getElementById("cantidad").innerHTML =  acumMicro[n];

    for(let i=0;i<Productos.length;i++){
   document.getElementById("id").innerHTML = Productos[i].id;
   document.getElementById("producto").innerHTML = Productos[i].marca +"-"+ Productos[i].modelo;
   document.getElementById("precio").innerHTML = Productos[i].precio;
   document.getElementById("total").innerHTML = (Productos[i].precio*acumMicro[n]); 

    };
    
} ;

/* ARMAR HTML DE CADA MENU */
    /* Procesadores */
/* 
const contenido ="";
let ID="";
let menuSider = ["micro", "mother","memoram","grafica","refrig","fuente","gabo","perif"];

const pickMenu = document.querySelectorAll
(".sideMenu");

//identifico menu
for(let i=0;i<pickMenu.length;i++){
    pickMenu[i].addEventListener("click", function(){
        ID = pickMenu[i].getAttribute("aria-controls")+"Contenido";        
        //contenidoHtml();
        })
}

/* Contenido */
/* function contenidoHtml(){
contenido = document.getElementById(ID).innerHTML = `
    <div class="container-fluid d-flex m-5">
    <div class="card m-3" style="width: 18rem;">
    <img class="card-img-top" src="assets/image/micro-amd-athlon-3000g-vega-3-0.jpg" alt="Card image cap">
    <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
     <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    <div class="card m-3" style="width: 18rem;">
    <img class="card-img-top" src="assets/image/micro-amd-athlon-3000g-vega-3-0.jpg" alt="Card image cap">
    <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
     <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    <div class="card m-3" style="width: 18rem;">
    <img class="card-img-top" src="assets/image/micro-amd-athlon-3000g-vega-3-0.jpg" alt="Card image cap">
    <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
     <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
    </div>
    `

} */
 