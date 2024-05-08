const datos = [
    {id:"1", nombre:"Bad", autor: "Michael Jackson", precio:"17.95", imagen:"/images/Jackson.png"},
    {id:"2", nombre:"25", autor: "Adele", precio:"18.00", imagen:"/images/Adele.png"},
    {id:"3", nombre:"Whitney", autor: "Whitney Houston", precio:"19.00", imagen:"/images/Whitney.png"},
    {id:"4", nombre:"Spice Girls", autor: "Spice Girls", precio:"18.00", imagen:"/images/SpiceGirls.png"},
    {id:"5", nombre:"Prince and the revolution", autor: "Prince", precio:"19.00", imagen:"/images/Prince.png"},
    {id:"6", nombre:"Boston", autor: "Boston", precio:"21.75", imagen:"/images/Boston.png"},
];

// Define una clase para representar cada elemento
class Disco {
    constructor(id, nombre, autor, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.precio = precio;
        this.imagen = imagen;
    }

    render() {
        const list = document.getElementById("list");
        const item = document.createElement("li");
        item.setAttribute("id", this.id);
        item.setAttribute("class", "imagen");
        item.setAttribute("class", "disco");
        const image = document.createElement("img");
        image.src = this.imagen;
        image.width = 250;
        image.height = 350;
        const botonCompra = document.createElement("button");
        
        botonCompra.textContent = "Comprar";
        botonCompra.addEventListener("click", () => {
            //Actualizamos el icono del carrito con el numero de elementos y añadimos al array de discos.
            carrito.agregarDisco(this);
            carrito.actualizarCarritoIcono(this); 
        });
        const name_cd = this.nombre.toUpperCase();
        item.innerHTML = `<p>${image.outerHTML}</p><strong>${name_cd}</strong><p>${this.autor}</p><p>${this.precio}&nbsp;€</p>`;
        item.appendChild(botonCompra);
        list.appendChild(item);
    }
}

function addList() {
    datos.forEach(element=>{
        const newD = new Disco(element.id, element.nombre, element.autor, element.precio, element.imagen);
        newD.render();
    })
}
// clase que hace referencia a los elementos del carrito y sus metodos
class Carrito {
    //El constructor crea un array de discos vacio
    constructor() {
        this.discos = []; // Array para almacenar los discos en el carrito
    }

    agregarDisco(disco) {
        let new_disco = disco;
        //Some, me indica si existe un elementyo cuyo id ya está en el array de discos
        const existe = carrito.discos.some(item => item.id === new_disco.id);
        //Si existe aumento su cantidad, sino añado el elemento al array de discos con un nuevo atributo cantidad
        if (existe) {
            new_disco.cantidad ++;
        }
        else {
            new_disco.cantidad = 1;
            this.discos.push(new_disco);
        }
    }

    eliminarDisco(id) {
        console.log(id);
        // Eliminar un disco del carrito por su ID
        console.log(this.discos);
        this.discos = this.discos.filter(disco => disco.id !== id); 
        console.log(this.discos);
        this.renderCarrito();
    }

    calcularTotal() {
        // Hay que tner en cuenta la cantidad de cada uno
        return this.discos.reduce((total, disco) => total + parseFloat(disco.precio * disco.cantidad), 0); // Calcular el total del carrito
    }
    actualizarCarritoIcono() {
        const cartItemCount = document.getElementById('cartItemCount');
        let length = 0;
        if (this.discos.length > 0) {
            length = this.discos.reduce((total, item) => total + item.cantidad, 0); 
        }
        cartItemCount.textContent = length; 
    }
    mostrarCarrito() {
        // Mostrar el div que esta oculto
        const cart = document.getElementById('cart');
        cart.classList.toggle('hidden');
        
        if (!cart.classList.contains('hidden')) {
            this.renderCarrito();
            
        }
    }
    renderCarrito() {
        const items = document.getElementById("cartItems");
        let tablaHTML = `<table>`;

        carrito.discos.forEach(item => {
            console.log(item);
            tablaHTML  += `<tr>
                                <td><img src="${item.imagen}" width="100" height="100"></td>
                                <td width="100">${item.nombre}</td>
                                <td width="100">${item.precio}€ X ${item.cantidad}</td>
                                <td width="100"> = ${parseFloat(item.precio * item.cantidad)}€</td>
                            </tr>`;
        });
        
        tablaHTML += `</table>`;
        items.innerHTML = tablaHTML;
        document.getElementById("cartTotal").textContent = this.calcularTotal();

    }
    vaciarCarrito() {
        this.discos = [];
    }
}
const carrito = new Carrito();


function show_cart() {
   // Tiene que visualizar el carrito
    carrito.mostrarCarrito();
}