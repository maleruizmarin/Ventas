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

const listaProductos = [];


// AGREGAR PRODUCTOS A LA LISTA Y MOSTRAR EN LA TABLA
formulario.addEventListener('submit', function(evento) {

    evento.preventDefault();

    const precionum = Number(inputPrecio.value);
    const cantidadnum = Number(inputCantidad.value);

    if (precionum <= 0 || cantidadnum <= 0) {
        alert('El precio y la cantidad deben ser mayores a cero.');
        return;
    }

    const nuevoProducto = {
        codigo: inputCodigo.value,
        nombre: inputNombre.value,
        precio: precionum,
        cantidad: cantidadnum,
        total: precionum * cantidadnum
    };

    listaProductos.push(nuevoProducto);

    contenedorResultado.style.display = 'block';

    actualizarTabla();

    formulario.reset();
});



// MOSTRAR PRODUCTOS EN LA TABLA
function actualizarTabla() {

    cuerpoTabla.innerHTML = '';

    listaProductos.forEach(function(producto) {

        const fila = document.createElement('tr');

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
        `;

        cuerpoTabla.appendChild(fila);
    });
}

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

// CALCULAR EL TOTAL DE LA VENTA
