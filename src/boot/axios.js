import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { setup } from 'axios-cache-adapter'
import { wrapper } from 'axios-cookiejar-support'
import { useQuasar } from 'quasar'

const $q = useQuasar()
let baseURL = 'http://172.22.4.46/apiListaBoda/api'
console.log(window.location.hostname)
if (window.location.hostname === 'intranet.ochoa.local') {
	baseURL = 'http://172.22.4.46/apiListaBoda/api'
} else if (window.location.hostname === '172.17.0.150') {
	baseURL = 'http://172.22.4.46/apiListaBoda/api'
} else if (window.location.hostname === '172.22.4.46') {
	baseURL = 'http://172.22.4.46/apiListaBoda/api'
} else if (window.location.hostname === 'localhost') {
	baseURL = 'http://172.22.4.46/apiListaBoda/api'
}

const api = wrapper(
	axios.create({
		baseURL: baseURL,
	})
)

//prueba para intercertar cuando el usuario pierda la session en la api y notificarle para que vuela a iniciar session.
api.interceptors.response.use((response) => {
	if (window.location.hostname === '172.22.4.46') {
		console.log('Response:', response)
	}
	//Es Necesario Inicia sesión
	if (response.data.message == 'Es Necesario Inicia sesión') {
		console.log('Es Necesario Inicia sesión')
	}
	//console.log('Response:', response)
	return response
})

export default boot(({ app }) => {
	// for use inside Vue files (Options API) through this.$axios and this.$api

	app.config.globalProperties.$axios = axios
	// ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
	//       so you won't necessarily have to import axios in each vue file

	app.config.globalProperties.$api = api
	// ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
	//       so you can easily perform requests against your app's API
})

export { api }

