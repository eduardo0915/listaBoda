import { ref } from 'vue'
import { api } from 'boot/axios'
import { storeToRefs } from 'pinia'
import { LocalStorage } from 'quasar'
//import { SessionStorage } from "quasar";
import { useQuasar } from 'quasar'
import { Cookies } from 'quasar'
import { useInicioStore } from '../store/inicio'
import { useRouter } from 'vue-router'

const useInicio = () => {
	//variables

	const $q = useQuasar()
	const inicioStore = useInicioStore()
	const router = useRouter()
	const XLSX = require('xlsx')
	//importacion del store de inicio
	const {
		listasDia,
		listaAbierta,
		listaCarrito,
		totalCarrito,
		openModalCart,
		openCarouselFotos,
		productoCarousel,
		openCardProducto,
		productoView,
		listaProducto,
		totalRegalos,
		openModalDescargas,
	} = storeToRefs(inicioStore)

	//funciones
	//*TODO Cambio y creacion de cuenta intranet*/

	//obtener listas del dia
	const listas = async function (data) {
		let token = Cookies.get('tokenListaBoda')
		let resp
		await api
			.post('buscar_lista', { fInicio: data.fInicio, fFin: data.fFin, busqueda: data.busqueda })
			.then((response) => {
				console.log(response)
				resp = response.data.status
				if (response.data.status) {
					inicioStore.setDataDia(response.data.data)
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return resp
	}

	//abrir lista
	const abrir_listas = async function (data) {
		loading('Cargando lista')
		let resp
		await api
			.post('abrir_lista', { depid: data.depid, sec_lista: data.sec_lista })
			.then((response) => {
				cerrarLoading()
				console.log(response)
				resp = response.data.status
				if (response.data.status) {
					inicioStore.setListaAbierta(response.data.data)
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				cerrarLoading()
				console.log(error)
			})
		return resp
	}

	//convertir a base64 imagen
	const convertir_base64 = async function (imagen) {
		let resp
		await api
			.post(
				'convertir_img',
				{ imagen: imagen },
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log(response)
				if (response.data.status) {
					resp = response.data.data
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return resp
	}

	//iniciar session
	const login = async function (data, app) {
		console.log(app.value)
		let resp
		await api
			.post('login', { user: data.usuario, pass: data.password })
			.then((response) => {
				resp = response.data.status
				if (response.status == 200) {
					$q.notify({
						type: 'positive',
						position: 'top',
						message: response.data.message,
					})
					let usuario = response.data.data
					console.log(response.data.data)
					Cookies.set(
						'tokenListaBoda',
						{
							nombres: usuario.NOMBRES,
							apellidos: usuario.APELLIDOS,
							completo: usuario.COMP,
							ficha: usuario.FICHA,
							digitador: usuario.DIGITADOR,
							almacen: usuario.ALMACEN,
							deptono: usuario.DEPTONO,
							id_dependencia: usuario.ID_DEPENDENCIA,
							nivel: usuario.NIVEL,
							app: app.value,
						},
						{ expires: '22h' }
					)
					if (app.value == 1) {
						router.push('Buscar_lista')
					} else {
						router.push('Inicio')
					}
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: 'Intentar de nuevo',
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return resp
	}

	//loading para la carga
	const loading = (mensaje) => {
		$q.loading.show({
			message: mensaje,
		})
	}

	//Terminar loading
	const cerrarLoading = () => {
		$q.loading.hide()
	}

	//agregar al carrito
	const agregarCarrito = (producto) => {
		inicioStore.setListaCarrito(producto)
		$q.notify({
			type: 'positive',
			position: 'top',
			message: 'Se ha agregado al carrito',
		})
	}

	//agregar a la lista de regalos
	const agregarListaReg = (producto) => {
		inicioStore.setListaProductos(producto)
		$q.notify({
			type: 'positive',
			position: 'top',
			message: 'Se ha agregado al carrito',
		})
		inicioStore.setModalProducto(false)
	}

	//sumar al carrito
	const setSumarProductoCart = (producto) => {
		inicioStore.setSumarProductoCart(producto)
	}

	//restar al carrito
	const setRestarProductoCart = (producto) => {
		inicioStore.setRestarProductoCart(producto)
	}

	//sumar a la lista de regalos
	const setSumarProductoReg = (producto) => {
		inicioStore.setSumarProductoReg(producto)
	}

	//restar a la lista de regalos
	const setRestarProductoReg = (producto) => {
		inicioStore.setRestarProductoReg(producto)
	}
	//cantida de producto
	const getCantidadProducto = (familia, division, secuencia) => {
		const index = listaCarrito.value.findIndex(
			(item) => item.data.FAMILIA === familia && item.data.DIVISION === division && item.data.SECUENCIA === secuencia
		)
		if (index !== -1) {
			return listaCarrito.value[index].cantidad
		} else {
			return 0
		}
	}

	//cantida de producto lista de regalo
	const getCantidadProductoReg = (codigo) => {
		const index = listaProducto.value.findIndex((item) => item.data.codigo === codigo)
		if (index !== -1) {
			return listaProducto.value[index].cantidad
		} else {
			return 0
		}
	}

	//crear orden
	const crearOrden = async function (data) {
		loading('Creando Orden')
		let resp
		await api
			.post('crear_orden', {
				cliente: data.cliente,
				digitador: data.digitador,
				ficha: data.ficha,
				productos: data.productos,
				sec_lista: data.sec_lista,
			})
			.then((response) => {
				cerrarLoading()
				console.log(response)
				resp = response.data.status
				if (response.data.status) {
					$q.notify({
						type: 'positive',
						position: 'top',
						message: response.data.message,
					})
					inicioStore.setResetearCarrito()
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				cerrarLoading()
				console.log(error)
			})
		return resp
	}

	//convertir a base64 imagen
	const get_img_secundarias = async function () {
		let resp
		await api
			.post('buscar_imagenes', {
				familia: productoCarousel.value.FAMILIA,
				division: productoCarousel.value.DIVISION,
				secuencia: productoCarousel.value.SECUENCIA,
			})
			.then((response) => {
				console.log(response)
				if (response.data.status) {
					resp = response.data.data
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return resp
	}

	//buscar articulo
	const buscar_articulo = async function (data) {
		loading('buscando articulo')
		let resp
		let token = Cookies.get('tokenListaBoda')
		await api
			.post('buscar_articulo', {
				familia: data.familia,
				division: data.division,
				secuencia: data.secuencia,
				cod_barra: data.cod_barra,
				ficha: token.ficha,
			})
			.then((response) => {
				cerrarLoading()
				console.log(response)

				if (response.data.status) {
					if (response.data.data.codigo !== undefined) {
						inicioStore.setProductoView(response.data.data)
						inicioStore.setModalProducto(true)
					} else {
						$q.notify({
							type: 'negative',
							position: 'top',
							message: 'No existe',
						})
					}
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				cerrarLoading()
				console.log(error)
			})
		return resp
	}

	//crear lista de regalos
	const crearListaRegalo = async function (data) {
		loading('Creando Lista')
		let resp
		await api
			.post('crear_lista', data)
			.then((response) => {
				cerrarLoading()
				console.log(response)
				resp = response.data.status
				if (response.data.status) {
					$q.notify({
						type: 'positive',
						position: 'top',
						message: response.data.message,
					})
					if (data['imprimirLista'] === 'S') {
						// Simular clic en enlace
						const link = document.createElement('a')
						link.href =
							'http://172.22.4.46/apiListaBoda/api/descargar?id_dependencia=' +
							response.data.data.id_dependencia +
							'&sec_lista=' +
							response.data.data.sec_lista
						link.target = '_blank'
						link.click()
					}
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				cerrarLoading()
				console.log(error)
			})
		return resp
	}

	//obtener lista para editar
	const editarListaRegalo = async function (data) {
		loading('Obteniendo Lista de regalo')
		let resp
		await api
			.post('obtener_lista_edit', data)
			.then((response) => {
				cerrarLoading()
				console.log(response)

				if (response.data.status) {
					resp = response.data.data
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				cerrarLoading()
				console.log(error)
			})
		return resp
	}

	//eliminar producto de la lista
	const eliminarProductoReg = async function (data) {
		loading('Eliminando producto')
		let resp
		await api
			.post('eliminar_producto_lista', data)
			.then((response) => {
				cerrarLoading()
				console.log(response)
				resp = response.data.status
				if (response.data.status) {
					$q.notify({
						type: 'positive',
						position: 'top',
						message: response.data.message,
					})
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				cerrarLoading()
				console.log(error)
			})
		return resp
	}

	//buscar articulo por codigo de barra
	const buscar_codigo_barra = async function (codigo) {
		let resp
		await api
			.post('codigo_barra', {
				cod_barra: codigo,
			})
			.then((response) => {
				if (response.data.status) {
					resp = response.data.data
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return resp
	}

	//actualizar lista de regalos
	const actualizarListaRegalo = async function (data) {
		loading('Actualizando Lista')
		let resp
		await api
			.post('editar_lista', data)
			.then((response) => {
				cerrarLoading()
				console.log(response)
				resp = response.data.status
				if (response.data.status) {
					$q.notify({
						type: 'positive',
						position: 'top',
						message: response.data.message,
					})
					if (data.imprimirLista == 'S') {
						console.log('entre')
						// Simular clic en enlace
						const link = document.createElement('a')
						link.href =
							'http://172.22.4.46/apiListaBoda/api/descargar?id_dependencia=' +
							data.id_dependencia +
							'&sec_lista=' +
							data.sec_lista
						link.target = '_blank'
						link.click()
					}
					router.push('/Editar')
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				cerrarLoading()
				console.log(error)
			})
		return resp
	}

	//buscar articulo por codigo de barra y abrir modal
	const cargarArticuloBarra = (barra) => {
		buscar_codigo_barra(barra).then((codigo) => {
			buscar_articulo({
				familia: codigo.FAMILIA,
				division: codigo.DIVISION,
				secuencia: codigo.SECUENCIA,
				cod_barra: barra,
			})
		})
	}

	//cambiar estado de una lista
	const cambiar_estado = async function (data) {
		console.log(data)
		let resp
		await $q
			.dialog({
				title: 'Eliminar Producto',
				message: '¿Estas seguro/a de eliminar este producto?',
				cancel: true,
				persistent: true,
				ok: {
					push: true,
					color: 'positive',
					label: 'aceptar',
				},
				cancel: {
					push: true,
					color: 'negative',
				},
			})
			.onOk(() => {
				loading('Eliminando lista')
				api
					.post('cambiar_estado_lista', data)
					.then((response) => {
						cerrarLoading()
						console.log(response)
						resp = response.data.status
						if (response.data.status) {
							$q.notify({
								type: 'positive',
								position: 'top',
								message: response.data.message,
							})
							listas({
								fInicio: '',
								fFin: '',
								busqueda: '',
							})
						} else {
							$q.notify({
								type: 'negative',
								position: 'top',
								message: response.data.message,
							})
						}
					})
					.catch((error) => {
						cerrarLoading()
						console.log(error)
					})
			})
			.onCancel(() => {
				// console.log('>>>> Cancel')
			})
			.onDismiss(() => {
				// console.log('I am triggered on both OK and Cancel')
			})

		return resp
	}

	//obtener reporte listas de regalos comprados y pendientes
	const reportesPendComp = async function (data, tipo) {
		let columns = []
		let rows = []
		let resp
		await api
			.post('reporte_reg', data)
			.then((response) => {
				console.log(response)

				if (response.data.status) {
					console.log(response)
					data = response.data.data

					data.forEach((element) => {
						if ((element.COMPRADOS > 0) & (tipo == 'C')) {
							rows.push({
								CODIGO: element.CODIGO,
								DESCRIPCION: element.DESCRIPCION,
								REFERENCIA: element.REFERENCIA,
								MARCA: element.MARCA,
								UNIDAD: element.UNIDAD,
								CANTIDAD: element.CANTIDAD,
								PENDIENTE: element.PEND_COMPRA,
								COMPRADOS: element.COMPRADOS,
							})
						}
						if ((element.PEND_COMPRA > 0) & (tipo == 'P')) {
							rows.push({
								CODIGO: element.CODIGO,
								DESCRIPCION: element.DESCRIPCION,
								REFERENCIA: element.REFERENCIA,
								MARCA: element.MARCA,
								UNIDAD: element.UNIDAD,
								CANTIDAD: element.CANTIDAD,
								PENDIENTE: element.PEND_COMPRA,
							})
						}
					})
					if (tipo == 'C') {
						columns.push(
							{
								name: 'CODIGO',
								align: 'left',
								label: 'CODIGO',
								field: 'CODIGO',
								sortable: true,
							},
							{
								name: 'DESCRIPCION',
								align: 'left',
								label: 'DESCRIPCION',
								field: 'DESCRIPCION',
								sortable: true,
							},
							{
								name: 'REFERENCIA',
								align: 'left',
								label: 'REFERENCIA',
								field: 'REFERENCIA',
								sortable: true,
							},
							{
								name: 'MARCA',
								align: 'left',
								label: 'MARCA',
								field: 'MARCA',
								sortable: true,
							},
							{
								name: 'UNIDAD',
								align: 'left',
								label: 'UNIDAD',
								field: 'UNIDAD',
								sortable: true,
							},
							{
								name: 'CANTIDAD',
								align: 'left',
								label: 'CANTIDAD',
								field: 'CANTIDAD',
								sortable: true,
							},
							{
								name: 'PENDIENTE',
								align: 'left',
								label: 'PENDIENTE',
								field: 'PENDIENTE',
								sortable: true,
							},
							{
								name: 'COMPRADOS',
								align: 'left',
								label: 'COMPRADOS',
								field: 'COMPRADOS',
								sortable: true,
							}
						)
					}
					if (tipo == 'P') {
						columns.push(
							{
								name: 'CODIGO',
								align: 'left',
								label: 'CODIGO',
								field: 'CODIGO',
								sortable: true,
							},
							{
								name: 'DESCRIPCION',
								align: 'left',
								label: 'DESCRIPCION',
								field: 'DESCRIPCION',
								sortable: true,
							},
							{
								name: 'REFERENCIA',
								align: 'left',
								label: 'REFERENCIA',
								field: 'REFERENCIA',
								sortable: true,
							},
							{
								name: 'MARCA',
								align: 'left',
								label: 'MARCA',
								field: 'MARCA',
								sortable: true,
							},
							{
								name: 'UNIDAD',
								align: 'left',
								label: 'UNIDAD',
								field: 'UNIDAD',
								sortable: true,
							},
							{
								name: 'CANTIDAD',
								align: 'left',
								label: 'CANTIDAD',
								field: 'CANTIDAD',
								sortable: true,
							},
							{
								name: 'PENDIENTE',
								align: 'left',
								label: 'PENDIENTE',
								field: 'PENDIENTE',
								sortable: true,
							}
						)
					}
					// create worksheet
					const ws = XLSX.utils.json_to_sheet(rows, {
						header: columns.map((col) => col.name),
					})

					// create workbook
					const wb = XLSX.utils.book_new()
					if (tipo == 'C') {
						XLSX.utils.book_append_sheet(wb, ws, 'Reporte articulos comprados')
					}

					if (tipo == 'P') {
						XLSX.utils.book_append_sheet(wb, ws, 'Reporte articulos Pendientes')
					}

					// generate binary data
					const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })

					// create blob from binary data
					const blob = new Blob([s2ab(wbout)], {
						type: 'application/octet-stream',
					})

					// create URL from blob and download file
					const url = URL.createObjectURL(blob)
					const link = document.createElement('a')
					link.href = url
					if (tipo == 'C') {
						link.download = 'articulos_comprados_lista.xlsx'
					}

					if (tipo == 'P') {
						link.download = 'articulos_Pendientes_lista.xlsx'
					}

					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return resp
	}

	//obtener reporte listas de regalos con existencia
	const reportesExistencia = async function (data, tipo) {
		console.log(data)
		let columns = []
		let rows = []
		let resp
		await api
			.post('buscar_reporte', data)
			.then((response) => {
				console.log(response)

				if (response.data.status) {
					console.log(response)
					data = response.data.data

					data.forEach((element) => {
						if ((element.COMPRADOS > 0) & (tipo == 'E')) {
							rows.push({
								CODIGO: element.CODIGO,
								DESCRIPCION: element.DESCRIPCION,
								REFERENCIA: element.REFERENCIA,
								MARCA: element.MARCA,
								UNIDAD: element.UNIDAD,
								COMPRADOS: element.COMPRADOS,
							})
						}
					})
					if (tipo == 'E') {
						columns.push(
							{
								name: 'CODIGO',
								align: 'left',
								label: 'CODIGO',
								field: 'CODIGO',
								sortable: true,
							},
							{
								name: 'DESCRIPCION',
								align: 'left',
								label: 'DESCRIPCION',
								field: 'DESCRIPCION',
								sortable: true,
							},
							{
								name: 'REFERENCIA',
								align: 'left',
								label: 'REFERENCIA',
								field: 'REFERENCIA',
								sortable: true,
							},
							{
								name: 'MARCA',
								align: 'left',
								label: 'MARCA',
								field: 'MARCA',
								sortable: true,
							},
							{
								name: 'UNIDAD',
								align: 'left',
								label: 'UNIDAD',
								field: 'UNIDAD',
								sortable: true,
							},
							{
								name: 'COMPRADOS',
								align: 'left',
								label: 'COMPRADOS',
								field: 'COMPRADOS',
								sortable: true,
							}
						)
					}

					// create worksheet
					const ws = XLSX.utils.json_to_sheet(rows, {
						header: columns.map((col) => col.name),
					})

					// create workbook
					const wb = XLSX.utils.book_new()
					if (tipo == 'E') {
						XLSX.utils.book_append_sheet(wb, ws, 'Reporte articulos comprados')
					}

					// generate binary data
					const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })

					// create blob from binary data
					const blob = new Blob([s2ab(wbout)], {
						type: 'application/octet-stream',
					})

					// create URL from blob and download file
					const url = URL.createObjectURL(blob)
					const link = document.createElement('a')
					link.href = url
					if (tipo == 'E') {
						link.download = 'articulos_comprados_lista.xlsx'
					}

					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
				} else {
					$q.notify({
						type: 'negative',
						position: 'top',
						message: response.data.message,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return resp
	}

	//función de utilidad para convertir una cadena binaria en un búfer de matriz
	function s2ab(s) {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
		return buf
	}

	return {
		//metodos
		listas,
		login,
		abrir_listas,
		convertir_base64,
		agregarCarrito,
		setSumarProductoCart,
		setRestarProductoCart,
		getCantidadProducto,
		crearOrden,
		get_img_secundarias,
		getCantidadProductoReg,
		setSumarProductoReg,
		setRestarProductoReg,
		agregarListaReg,
		crearListaRegalo,
		eliminarProductoReg,
		buscar_codigo_barra,
		//propiedades
		listasDia,
		$q,
		listaAbierta,
		listaCarrito,
		inicioStore,
		totalCarrito,
		openModalCart,
		openCarouselFotos,
		buscar_articulo,
		openCardProducto,
		productoView,
		listaProducto,
		totalRegalos,
		openModalDescargas,
		editarListaRegalo,
		actualizarListaRegalo,
		cargarArticuloBarra,
		cambiar_estado,
		reportesPendComp,
		reportesExistencia,
	}
}

export { useInicio }

