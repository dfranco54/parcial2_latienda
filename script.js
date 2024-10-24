// Crear las variables asignadas
const apiURL = 'https://fakestoreapi.com/products';
const listaProductos = document.getElementById('listaProductos');
const filtroProducto = document.getElementById('filtro');

// Funcion que asigna los elementos al html
function cargarProductos(productos) {
    listaProductos.innerHTML = '';
    productos.forEach(productos => {
        const tarjetas = document.createElement('div');
        tarjetas.classList.add('tarjeta');
        tarjetas.innerHTML = `<img src="${productos.image}" alt="${productos.title}">
            <h3>${productos.title}</h3>
            <p>${productos.description}</p>
            <p>${productos.price}</p>
            <p>${productos.category}</p>
            <p id='votos'>${"rating: "}</p>
            <p>${productos.rating.rate}</p>
            <p id='votos'>${"votos: "}</p>
            <p>${productos.rating.count}</p>`;
        listaProductos.appendChild(tarjetas);
    });
}



// API uso
async function agarrarProductos() {
        const respuesta = await fetch(apiURL);
        const productos = await respuesta.json();
        cargarProductos(productos);

        productos.forEach(productos => {
            const opciones = document.createElement('option');
            opciones.value = productos.id;
            opciones.textContent = productos.title;
            filtroProducto.appendChild(opciones);
        });

        filtroProducto.addEventListener('change', (event) => {
            const idSeleccionado = event.target.value;
            if (idSeleccionado === 'todo') {
                cargarProductos(productos);
            } else {
                const productoFiltrado = productos.filter(productos => productos.id == idSeleccionado);
                cargarProductos(productoFiltrado);
            }
        });
}

// Inicializar
agarrarProductos();
