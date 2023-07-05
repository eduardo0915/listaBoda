const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '/Inicio', component: () => import('pages/Inicio.vue'), meta: { requiresAuth: true } },
			{ path: '/Editar', component: () => import('pages/EditarLista.vue'), meta: { requiresAuth: true } },
			{
				path: '/Modificar/:data',
				name: 'modificarLista',
				component: () => import('pages/ModificarListaRegalos.vue'),
				meta: { requiresAuth: true },
			},

			{ path: '/Todas', component: () => import('pages/TodasTareas.vue'), meta: { requiresAuth: true } },
			{ path: '/Completadas', component: () => import('pages/CompletadasTareas.vue'), meta: { requiresAuth: true } },
			{ path: '/Crear_lista', component: () => import('pages/CrearLista.vue'), meta: { requiresAuth: true } },
			{ path: '/administrar', component: () => import('pages/admListas.vue'), meta: { requiresAuth: true } },
			{
				path: '/Cargar_lista/:data',
				name: 'cargarLista',
				component: () => import('pages/CargarLista.vue'),
				meta: { requiresAuth: true },
			},
			{ path: '/reportes', component: () => import('pages/ReporteBoda.vue'), meta: { requiresAuth: true } },

			// Not completed yet
			// {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/Error404.vue'),
	},
	{ path: '/Buscar_lista', component: () => import('pages/BuscarLista.vue'), meta: { requiresAuth: true } },
	{
		path: '/Abrir_lista/:data',
		name: 'abrir',
		component: () => import('pages/AbrirLista.vue'),
		meta: { requiresAuth: true },
	},

	{ path: '', component: () => import('pages/Login-1.vue') },
]

export default routes

