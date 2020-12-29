
   //Objeto Carrito --> MODELO
let carrito = {};
let articulosAcumulados = 0;

    //identificando botones de AGREGAR de cada producto
const pescarBtnAgregar = (data,steps) => {
    let botones = document.querySelectorAll('button#agregarACarrito');
    console.log(botones)
        //recorro los botones esperando el evento
    botones.forEach(btn =>{
        btn.addEventListener('click', ()=>{
                //busco dentro de data el producto, comparando el id de btn con item.id dentro del "data"
            let producto = data.find(item => item.id === btn.dataset.id);
            
            if(carrito.hasOwnProperty(producto.id)){        //si el objeto tiene el mismo ID
                console.log(producto.id)
                producto.cantidad++;                    //incremento cantidad de producto
            }
            else{
                producto.cantidad = Number(1);
                
            }
            carrito[producto.id] = {...producto}         //Operador de propagación - copio el producto identificado con anterioridad    
            cargarBodyCarrito();
            stepper2.next();
            pescarSteps(steps);
            
        })
    })
}

let items = document.querySelector('#items') //Capturamos donde vamos a pintar el carrito.

const cargarBodyCarrito = () =>{
    const template = document.querySelector('#templateBodyCarrito').content; //accedemos al contenido del "paso 1: crear template"
    const fragment = document.createDocumentFragment(); //"paso 2: Crear fragment"
    
        items.innerHTML = ""; //---> limpio para luego reescribir
        articulosAcumulados=0;
    
     for (const key in carrito) {
        if (carrito.hasOwnProperty(key)){       //paso 3: pregunta si el objeto tiene el mismo ID
            const element = carrito[key]   
           //console.log(carrito) 
                    //paso 4: Aca voy escribiendo las partes de la tabla
            template.querySelector('th').textContent = element.id;
            template.querySelectorAll('td')[0].textContent = `${element.marca}-${element.linea}-${element.modelo}`;
            template.querySelectorAll('td')[1].textContent = element.cantidad;
            template.querySelector('td span').textContent = format(format(element.precio)*element.cantidad,1);    //ya voy multiplicando el precio por cantidad, pero no guarde el dato
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
       // return
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
        const preciosTotales = Object.values(carrito).reduce((acc,{cantidad,precio}) => acc+=cantidad*format(precio),0)
     
        //aca armamos lo que vamos a mostrar, con los template
        template.querySelectorAll("td")[0].textContent = productosTotales;
        template.querySelector("td span").textContent = format(preciosTotales,1);
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);

        footerCarrito.appendChild(fragment);
}

        /* FORMATEAR NUMEROS */
        function format(input,a=0){
            let num = Number(input);
            if(a==0){
                num = num.toFixed(2);
                return num;
            }
            else{
            input= new Intl.NumberFormat("es-AR", //BCP 47
             {style: "currency",
              currency: "ARS",  //
              currencyDisplay: "symbol" //code
                }
            ).format(input)
            return input
            }
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

       //coordenadas del Carrito
       coordCarrito();

        if(articulosAcumulados!=0 || articulosAcumulados>0){
            let x = document.getElementsByClassName("previoCarrito")[0];
                x.setAttribute("id","carrito") 
            //console.log("abri carrito")
                notificacion.setAttribute("data-target","#carrito")
                
                     
        }
} )
   
        /* Conocer coordenadas de carrito */
    function coordCarrito(){
        let coords = $("button#iconCarrito").position();     //otro metodo similar es offset();
              //Le asigno las coordenadas
        $(".previoCarrito").css("left",`${coords.left}px`) 
        }

///--FIN--FIN--FIN--FIN------CARRITO------FIN--FIN--FIN--FIN--///
  

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

///-----PESCAR CLICK -----$(window).on('click', (e)=>{}///


///---------------------------CONFIGURAR COLLAPSE CARRITO----------------------------------///

$(document).on("click",(e)=> {               
   
     let var1 = $('.previoCarrito#carrito');
    
    //console.log(e.target)
    //console.log(var1)
     if((!(var1.is(e.target)) && var1.has(e.target).length === 0)) { 
        //alert("¡Pulsaste fuera!");     
        console.log("entro a colapse 1")  
        //$('.collapse').collapse('hide')
     } 
});