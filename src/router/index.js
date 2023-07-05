import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { Cookies } from 'quasar'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
	const createHistory =
		process.env.MODE === 'ssr'
			? createMemoryHistory
			: process.env.VUE_ROUTER_MODE === 'history'
			? createWebHistory
			: createWebHashHistory

	const Router = createRouter({
		scrollBehavior: () => ({ left: 0, top: 0 }),
		routes,

		// Leave this as is and make changes in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
	})

	//protecion de rutas
	Router.beforeEach((to, from, next) => {
		//variables
		//const inicioStore = useInicioStore()
		//condicion
		let token = Cookies.get('tokenListaBoda')
		//verifica si la ruta esta protegida
		if (to.meta.requiresAuth) {
			//en caso de que si, verifica que el usuario este autenticado y lo dirije a la pagina solicitada
			if (Cookies.has('tokenListaBoda')) {
				next()
			}
			//en caso de no estar autenticado le llama la pantalla de login
			else {
				Cookies.remove('tokenListaBoda')
				next('')
			}
		} else {
			if (Cookies.has('tokenListaBoda')) {
				if (token.app == 1) {
					console.log('1')
					next('Buscar_lista')
				} else {
					console.log('2')
					next('Inicio')
				}
			} else {
				console.log('3')
				next()
			}
		}
	})

	return Router
})

