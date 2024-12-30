let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = carrito.reduce((acc, item) => acc + item.precio, 0);

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function finalizarCompra() {
    carrito = [];
    total = 0;
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarritoDropdown = document.getElementById('lista-carrito-dropdown');
    const totalCarritoDropdown = document.getElementById('total-carrito-dropdown');
    
    listaCarritoDropdown.innerHTML = '';
    carrito.forEach((item, index) => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.nombre} - $${item.precio.toFixed(2)} `;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => eliminarDelCarrito(index));
        
        itemElement.appendChild(deleteButton);
        listaCarritoDropdown.appendChild(itemElement);
    });

    const finalizarButton = document.createElement('button');
    finalizarButton.textContent = 'Finalizar Compra';
    finalizarButton.addEventListener('click', finalizarCompra);
    listaCarritoDropdown.appendChild(finalizarButton);

    totalCarritoDropdown.textContent = total.toFixed(2);
}

document.getElementById('carrito-btn').addEventListener('click', () => {
    const dropdown = document.getElementById('carrito-dropdown');
    dropdown.classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', actualizarCarrito);
