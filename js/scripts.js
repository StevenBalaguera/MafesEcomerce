const productoDOM = document.querySelector(".productos__center")
const carritoDOM = document.querySelector(".carrito")
const carritoCenter = document.querySelector(".carrito__center")
const openCarrito = document.querySelector(".carrito__icon")
const closeCarrito = document.querySelector(".close__carrito")
const overlay = document.querySelector(".carrito__overlay")
const carritoTotal = document.querySelector(".carrito__total")
const clearCarritoBtn = document.querySelector(".clear__carrito")
const itemTotales =document.querySelector(".item__total")
const detalles = document.getElementById('detalles')

let carrito = [];
let buttonDOM = [];

class UI {

	detalleProducto(id){
		const filtroDato = productos.filter(item => item.id == id)
		let result = ""
		filtroDato.forEach(producto => {
			result += `
			<article class="detalle-grid">
				<img src=${producto.image} alt="${producto.title}" class="img-fluid">
				<div class="detalles-content">
					<h3>${producto.title}</h3>
					<div class="rating">
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bx-star"></i>
						</span>
					</div>
						<p class="price"><b>Precio: </b> $${producto.price}</p>
						<p class="description">
							<b>Descripcion: </b> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quae ad ex sint expedita perspiciatis odit eligendi! Et quia ex aperiam dolorum sunt omnis maiores. Repudiandae delectus iste exercitationem vel?</span>
						</p>
						<p class="description">
							<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates consequuntur in assumenda odit hic, aut cupiditate dolorem aspernatur! Quibusdam iusto magnam vero maxime quisquam voluptatibus minima aliquam molestias, iure ratione commodi, reiciendis quasi.</span>
						</p>

						<div class="bottom">
							<div class="btn__group">
								<button class="btn addToCart" data-id=${producto.id}>Añadir carrito</button>
							</div>
						</div>
				</div>
			</article>
			`
		});
		detalles.innerHTML = result;
	}

	renderProductos(productos){
		let result = ""
		productos.forEach((producto) =>{
			result += `
			<div class="producto">
			<div class="image__container">
			<img src=${producto.image} alt="">
		</div>
          <div class="producto__footer">
            <h1>${producto.title}</h1>
            <div class="rating">
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bx-star"></i>
              </span>
            </div>
            <div class="price">$${producto.price}</div>
          </div>
          <div class="bottom">
            <div class="btn__group">
              <button class="btn addToCart" data-id=${producto.id}>Añadir carrito</button>
              <a href="producto-detalles.html?id=${producto.id}" class="btn view">Vista</a>
            </div>
          </div>
        </div>
				`
		});
		productoDOM.innerHTML = result
	}
	
	singleButton(id){
		return buttonDOM.find(button => parseInt(button.dataset.id) === id)
	}
}



class Storage {
	static saveProduct(obj){
		localStorage.setItem("productos", JSON.stringify(obj))
	}
	static getProductos(id){
		const producto = JSON.parse(localStorage.getItem("productos"))
		return producto.find(product =>product.id === parseFloat(id, 10))
	}
}

class Productos {
  async getProductos() {
    try {
			const result = await fetch("productos.json")
			const data = await result.json()
			const productos = data.items
			return productos
		}catch(err){
			console.log(err)
		}
  }
}

let category = "";
let productos  = [];

function categoryValue(){
	const ui = new UI();

	category = document.getElementById("category").value
	if(category.length > 0){
		const producto = productos.filter(regx => regx.category === category)
		ui.renderProductos(producto)
	}else{
		ui.renderProductos(productos)
	
	}
}

const query = new URLSearchParams(window.location.search)
let id = query.get('id')

document.addEventListener("DOMContentLoaded", async () =>{
	const productosLista = new Productos();
	const ui = new UI();

	productos = await productosLista.getProductos()
	if(id){
		ui.detalleProducto(id)
		Storage.saveProduct(productos)
	}else{
		ui.renderProductos(productos)
		Storage.saveProduct(productos)
	}
})

