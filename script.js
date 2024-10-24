// Crear las constantes
const apiURL = 'https://fakestoreapi.com/products';
const listaProductos = document.getElementById('listaProductos');
const filtroProducto = document.getElementById('filtro');

// Función para renderizar las tarjetas
function cargarProductos(productos) {
    listaProductos.innerHTML = '';
    productos.forEach(productos => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img src="${productos.image}" alt="${productos.title}">
            <h3>${productos.title}</h3>
            <p>$${productos.price}</p>`;
        listaProductos.appendChild(card);
    });
}

// API
async function fetchProducts() {
        const response = await fetch(apiURL);
        const productos = await response.json();

        // Renderizamos todos los productos
        cargarProductos(productos);

        // Cargar opciones en el filtro
        productos.forEach(productos => {
            const opciones = document.createElement('option');
            opciones.value = productos.id;
            opciones.textContent = productos.title;
            filtroProducto.appendChild(opciones);
        });

        // Filtrar productos por selección del usuario
        filtroProducto.addEventListener('change', (event) => {
            const idSeleccionado = event.target.value;
            if (idSeleccionado === 'todo') {
                cargarProductos(productos);  // Mostrar todos
            } else {
                const productoFiltrado = productos.filter(productos => productos.id == idSeleccionado);
                cargarProductos(productoFiltrado);  // Mostrar producto seleccionado
            }
        });
}

// Inicializar
fetchProducts();
