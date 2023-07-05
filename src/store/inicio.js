import { defineStore } from 'pinia'

export const useInicioStore = defineStore('inicio', {
	state: () => ({
		//listas del dia
		listasDia: [],
		listaAbierta: [],
		listaCarrito: [],
		totalCarrito: 0,
		totalRegalos: 0,
		openModalCart: false,
		openCarouselFotos: false,
		productoCarousel: [],
		openCardProducto: false,
		productoView: [],
		listaProducto: [],
		openModalDescargas: false,
	}),
	actions: {
		//guardar data de las listas del dias
		setDataDia(data) {
			this.listasDia = data
		},

		//lista abierta
		setListaAbierta(data) {
			this.listaAbierta = data
		},

		//lista de productos en el carrito
		setListaCarrito(data) {
			const index = this.listaCarrito.findIndex(
				(item) =>
					item.data.FAMILIA === data.FAMILIA &&
					item.data.DIVISION === data.DIVISION &&
					item.data.SECUENCIA === data.SECUENCIA
			)
			if (index !== -1) {
				this.listaCarrito[index].cantidad++
			} else {
				this.listaCarrito.unshift({ data: data, cantidad: 1 })
			}
			console.log(this.listaCarrito)
			this.setSumarTotalCart()
		},

		//lista de productos en las lista de regalos
		setListaProductos(data) {
			const index = this.listaProducto.findIndex((item) => item.data.codigo === data.codigo)
			if (index !== -1) {
				this.listaProducto[index].cantidad++
			} else {
				this.listaProducto.unshift({ data: data, cantidad: 1 })
			}
			console.log(this.listaProducto)
			this.setSumarTotalReg()
		},

		//sumar producto
		setSumarProductoCart(data) {
			const index = this.listaCarrito.findIndex(
				(item) =>
					item.data.FAMILIA === data.FAMILIA &&
					item.data.DIVISION === data.DIVISION &&
					item.data.SECUENCIA === data.SECUENCIA
			)

			// Verificar que el producto exista en la lista
			if (index !== -1) {
				this.listaCarrito[index].cantidad++
			} else {
				const nuevoProducto = { data: data, cantidad: 1 }
				this.listaCarrito.push(nuevoProducto)
			}
			console.log(this.listaCarrito)
			this.setSumarTotalCart()
		},

		//restar producto
		setRestarProductoCart(data) {
			const index = this.listaCarrito.findIndex(
				(item) =>
					item.data.FAMILIA === data.FAMILIA &&
					item.data.DIVISION === data.DIVISION &&
					item.data.SECUENCIA === data.SECUENCIA
			)

			// Verificar que el producto exista en la lista
			if (index !== -1) {
				// Si la cantidad es 1, eliminar el producto de la lista
				if (this.listaCarrito[index].cantidad === 1) {
					this.listaCarrito.splice(index, 1)
				} else {
					this.listaCarrito[index].cantidad--
				}
				console.log(this.listaCarrito)
			}
			this.setSumarTotalCart()
		},

		//total Carrito
		setSumarTotalCart() {
			let totalFormateado = 0 // Reiniciar totalCarrito a 0
			this.listaCarrito.forEach((item) => {
				const precio = parseFloat(item.data.PRECIO_R)
				const cantidad = parseInt(item.cantidad)
				console.log(precio)
				console.log(cantidad)
				totalFormateado += precio * cantidad
			})

			this.totalCarrito = totalFormateado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},

		//total Lista regalos
		setSumarTotalReg() {
			let totalFormateado = 0 // Reiniciar totalCarrito a 0
			this.listaProducto.forEach((item) => {
				const precio = parseFloat(item.data.precio_raw)
				const cantidad = parseInt(item.cantidad)

				totalFormateado += precio * cantidad
			})

			this.totalRegalos = totalFormateado.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},

		//resetear Carrito
		setResetearCarrito() {
			this.listaCarrito = []
			this.totalCarrito = 0
			this.openModalCart = false
		},

		//resetear lista de regalos
		setResetearListaReg() {
			this.productoView = []
			this.totalRegalos = 0
			this.openCardProducto = false
			this.listaProducto = []
		},

		//abrir / cerrar modal del cart
		setModalCart(data) {
			this.openModalCart = data
		},

		//abrir / cerrar modal de descargas de reportes
		setModalDescagas(data) {
			this.openModalDescargas = data
		},

		//producto mostrado en el card del producto
		setProductoView(data) {
			this.productoView = {
				...data,
				agregar: true,
			}
		},

		//abrir / cerrar modal del card producto
		setModalProducto(data) {
			this.openCardProducto = data
		},

		//imagenes del producto abierto en el carousel
		setProductoCarousel(data) {
			this.productoCarousel = data
		},

		//abrir / cerrar modal del carousel fotos
		setCarouselFotos(data) {
			this.openCarouselFotos = data
		},

		//eliminar producto del carrito
		setEliminarProducto(data) {
			const index = this.listaCarrito.findIndex(
				(item) =>
					item.data.FAMILIA === data.FAMILIA &&
					item.data.DIVISION === data.DIVISION &&
					item.data.SECUENCIA === data.SECUENCIA
			)

			// Verificar que el producto exista en la lista
			if (index !== -1) {
				this.listaCarrito.splice(index, 1)
			}
		},

		//eliminar producto de la lista de regalos
		setEliminarProductoReg(data) {
			const index = this.listaProducto.findIndex((item) => item.data.codigo === data.codigo)

			// Verificar que el producto exista en la lista
			if (index !== -1) {
				this.listaProducto.splice(index, 1)
			}

			this.setSumarTotalReg()
		},

		//sumar producto
		setSumarProductoReg(data) {
			const index = this.listaProducto.findIndex((item) => item.data.codigo === data.codigo)

			// Verificar que el producto exista en la lista
			if (index !== -1) {
				this.listaProducto[index].cantidad++
			} else {
				const nuevoProducto = { data: data, cantidad: 1 }
				this.listaProducto.push(nuevoProducto)
			}
			console.log(this.listaProducto)
			this.setSumarTotalReg()
		},

		//restar producto
		setRestarProductoReg(data) {
			const index = this.listaProducto.findIndex((item) => item.data.codigo === data.codigo)

			// Verificar que el producto exista en la lista
			if (index !== -1) {
				// Si la cantidad es 1, eliminar el producto de la lista
				if (this.listaProducto[index].cantidad === 1) {
					this.listaProducto.splice(index, 1)
				} else {
					this.listaProducto[index].cantidad--
				}
				console.log(this.listaProducto)
			}
			this.setSumarTotalReg()
		},

		setProductosListaReg(data) {
			this.listaProducto = data
			this.setSumarTotalReg()
		},
	},
})

