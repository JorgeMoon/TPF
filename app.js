/* CONECTAR CON API JSON*/

    /* Verificar si ya se cargo HTML */
    //DOMContentLoaded se dispara cuando el HTML esta completamente cargado
   // document.addEventListener('DOMContentLoaded', e => { fetchData() });
   document.addEventListener("DOMContentLoaded", function(e) {
    fetchData();
    console.log("DOM cargado");
  });

 //let data = [];

const fetchData = async() => {     //consumir json
    try{
        const res = await fetch('assets/api/apiMothers.json');
        const data = await res.json();
        //console.log(data);
        writeCardHtml(data);
        pescarBtnAgregar(data);
        //pescarBtnDetalle(data);         
    }
    catch (error){
        console.log(error);
    }
}


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
           console.log("este es un clon --> "+clone)
            fragment.appendChild(clone);        //almaceno todo el contenido antes de escribirlo en el HTML
            console.log(fragment +"<-- framento")
    });
    cardProducto.appendChild(fragment);
};

    //identificando botones de AGREGAR para identificar producto
const pescarBtnAgregar = data => {

    let botones = document.querySelectorAll('.card button');
     
        //recorro los botones esperando el evento
    botones.forEach(btn =>{
        btn.addEventListener('click', ()=>{
                //busco dentro de data el producto, comparando el id de btn con item.id dentro del "data"

            let producto = data.find(item => item.id === parseInt(btn.dataset.id));

           // producto.cantidad=1;
            if(carrito.hasOwnProperty(producto.id)){        //si el objeto tiene el mismo ID
                console.log("entro al if")
                producto.cantidad++;                    //incremento cantidad de producto
                   // console.log(producto.cantidad)
                    //console.log(carrito)    
            }
            else{
               // console.log("entro al else")
                producto.cantidad = Number(1);      
            }
            carrito[producto.id] = {...producto}         //Operador de propagación - copio el producto identificado con anterioridad
                //console.log(producto.cantidad)      
           // console.log(carrito)     
            cargarCarrito();
        })
    })
}
    //Identificamos botones de DETALLE
const pescarBtnDetalle = data => {
    let botones = document.querySelectorAll('.card a');
    console.log(botones)
    botones.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            console.log("cliqueaste boton DETALLE");
        })
    })
}

//Objeto Carrito --> MODELO
let carrito = {};

/* carrito = {
    1: {id:1, titulo: 'AMD', precio: 999, cantidad: 1},
    2: {id:1, titulo: 'AMD', precio: 999, cantidad: 1},
}  */

let items = document.querySelector('#items')


const cargarCarrito = () =>{
    const template = document.querySelector('#templateCarrito').content; //accedemos al contenido del 
    const fragment = document.createDocumentFragment();

        items.innerHTML = ""; //---> limpio para luego reescribir
    //posibilidad 1 -> trabajo sobre el objeto
     for (const key in carrito) {
        if (carrito.hasOwnProperty(key)){

            const element = carrito[key]   
            console.log(`elemento en el carrito--> ${element}`) 

            template.querySelector('th').textContent = element.id;
            template.querySelectorAll('td')[0].textContent = element.title;
            template.querySelectorAll('td')[1].textContent = element.cantidad;
            template.querySelector('span').textContent = element.precio;

            const clone = template.cloneNode(true);
            fragment.appendChild(clone);
        }
        items.appendChild(fragment);

           //Posibilidad 2 -> tranasformo en array
 /*    Object.values(carrito).forEach(producto => {
        console.log(producto);
        template.querySelector('th').textContent = producto.id;
        template.querySelectorAll('td')[0].textContent = producto.title;
        template.querySelectorAll('td')[1].textContent = producto.cantidad;
        template.querySelector('span').textContent = producto.precio;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    })
 */
  //  items.appendChild(fragment);
}
    }


/* BOTON SWITCH */
const btnSwitch =  document.querySelector('#switch');
btnSwitch.addEventListener('click',() =>{
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');  
} )

/* NOTIFICACION SOBRE CARRITO */
/* const notificacion =  document.getElementById('iconCarrito');
notificacion.addEventListener('click',() =>{
    


} ) */
 
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
 