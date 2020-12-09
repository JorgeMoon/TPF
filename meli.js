const appID= 72205757860432;
const secretKey = "nqgq7qHHqkN4uGLfOcKrPQG4FOLAJjaI";


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
let urlSearchAmdProcesador= "https://api.mercadolibre.com/sites/MLA/search?q=AMD%20Procesador"

var the_url = "https://api.mercadolibre.com/categories/MLA1648"; //<--- link categoria COmputacion
let urlProductoProcesador = "https://api.mercadolibre.com/categories/MLA447778"
//let data;
let i =0;

$.ajax({
        url:urlSearchAmdProcesador, //urlProductoProcesador,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer nqgq7qHHqkN4uGLfOcKrPQG4FOLAJjaI")
        }, success: function(data){
            //alert(data);
            console.log(data.results)
            writeCardHtml(data.results);
            //process the JSON data etc
        }
})

let cardProducto = document.querySelector('#productosMothers') //capturo el lugar donde voy a escribir
let template = document.querySelector('#templateProductosMothers').content // tomo el html para escribir
let fragment = document.createDocumentFragment(); // otra opcion new DocumentFragment();

const writeCardHtml = data => {
    
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



