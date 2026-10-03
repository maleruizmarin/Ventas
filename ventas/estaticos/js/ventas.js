// VARIABLES DE LOS INPUTS Y EL FORMULARIO
const formulario = document.querySelector('#formularioVentas');
const inputCodigo = document.getElementById('codigo');
const inputNombre = document.getElementById('nombre');
const inputPrecio = document.getElementById('precio');
const inputCantidad = document.getElementById('cantidad');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const contenedorResultado = document.getElementById('resultado');
const botonCalcular = document.getElementById('calcular');
const totalVenta = document.getElementById('totalVenta');

const botonAgregar = document.getElementById('botonAgregar');
const botonCancelar = document.getElementById('botonCancelar');

const listaProductos = [];
let indiceEditar = -1;


// AGREGAR PRODUCTOS A LA LISTA Y MOSTRAR EN LA TABLA
formulario.addEventListener('submit', function(evento) {

    evento.preventDefault();

    const precionum = Number(inputPrecio.value);
    const cantidadnum = Number(inputCantidad.value);

    if (precionum <= 0 || cantidadnum <= 0) {
        alert('El precio y la cantidad deben ser mayores a cero.');
        return;
    }

        const codigo = inputCodigo.value;
        const nombre = inputNombre.value;
        const precio = precionum;
        const cantidad = cantidadnum;

//Agregar un producto
    if (indiceEditar === -1) {
        const nuevoProducto = {
            codigo: codigo,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            total: precio * cantidad
        };
        listaProductos.push(nuevoProducto);
    }
//Actualizar un producto existente

    else {
       listaProductos[indiceEditar].codigo = codigo;
       listaProductos[indiceEditar].nombre = nombre;
       listaProductos[indiceEditar].precio = precio;
       listaProductos[indiceEditar].cantidad = cantidad;
       listaProductos[indiceEditar].total = precio * cantidad;
    }

//Mostrar el contenedor de resultados y actualizar la tabla
    contenedorResultado.style.display = 'block';
    actualizarTabla();

//Reiniciar el formulario y restablecer el índice de edición
    formulario.reset();
 //Restablecer el índice de edición
    indiceEditar = -1;
    botonAgregar.textContent = 'Agregar';
    botonCancelar.style.display = 'none';
});



// MOSTRAR PRODUCTOS EN LA TABLA
function actualizarTabla() {

    cuerpoTabla.innerHTML = ''; //borra todo el contenido de la tabla antes de actualizarla
    listaProductos.forEach(function(producto, indice) { //El método forEach recorre cada producto en la lista de productos y ejecuta la función proporcionada para cada uno de ellos.
        const fila = document.createElement('tr'); //Por cada producto, se crea una nueva fila de tabla (<tr>) utilizando document.createElement('tr').
        fila.innerHTML = `
            <td>
                <span class="codigo">
                    ${producto.codigo}
                </span>
            </td>

            <td>
                <strong>
                    ${producto.nombre}
                </strong>
            </td>

            <td>
                $${producto.precio.toLocaleString('es-CO')}
            </td>

            <td>
                <span class="cantidad">
                    ${producto.cantidad}
                </span>
            </td>

            <td>
                <strong class="precio-total">
                    $${producto.total.toLocaleString('es-CO')}
                </strong>
            </td>
            <td>
                <button type="button" class="botonEditar" onclick="editarProducto(${indice})">Editar</button>
                <button type="button" class="botonEliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}

function eliminarProducto(indice) {
    listaProductos.splice(indice, 1);
    actualizarTabla();

    const total = listaProductos.reduce(function(acumulado, producto) {
        return acumulado + producto.total;
    }, 0);

    totalVenta.textContent = `Total de la venta: $${total.toLocaleString('es-CO')}`;

    if (listaProductos.length === 0) {
        contenedorResultado.style.display = 'none';
    }
}

// CALCULAR EL TOTAL DE LA VENTA
botonCalcular.addEventListener('click', function calcularTotal() {

    if (listaProductos.length === 0) {
        alert('Agrega al menos un producto para calcular el total.');
        return;
    }

    const total = listaProductos.reduce(function(acumulado, producto) {
        return acumulado + producto.total;
    }, 0);

    actualizarTabla();
    totalVenta.textContent = `Total de la venta: $${total.toLocaleString('es-CO')}`;
});

function editarProducto(indice) {
    const producto = listaProductos[indice];
    inputCodigo.value = producto.codigo;
    inputNombre.value = producto.nombre;
    inputPrecio.value = producto.precio;
    inputCantidad.value = producto.cantidad;

    botonAgregar.textContent = 'Actualizar';
    botonCancelar.style.display = 'onclick';
    inputCodigo.focus();
}

if (botonCancelar) {
    botonCancelar.addEventListener('click', function() {
        formulario.reset(); 
        indiceEditar = -1;
        botonAgregar.textContent = 'Agregar';
        botonCancelar.style.display = 'none';
    });
}


