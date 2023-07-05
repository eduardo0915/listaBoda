
<template>
  <q-layout>
    <header-comp></header-comp>
    <q-page-container>
      <q-page class="q-pa-sm">
        <q-breadcrumbs active-color="secondary" class="q-mt-sm q-ml-lg">
          <q-breadcrumbs-el label="Inicio" icon="home" to="/Buscar_lista" />
          <q-breadcrumbs-el label="Lista de boda" icon="widgets" to="/panel" />
        </q-breadcrumbs>
        <q-card class="q-ma-md bg-grey-1">
          <!--cambiar vista-->
          <q-card-section class="text-center">
            <span class="text-h6 text-secondary text-weight-bolder"
              ><div
                class="col-lg-2 col-xl-2 col-md-2 col-sm-2 col-xs-2 q-mr-xl absolute-top-right"
              >
                <!--  <q-checkbox
                  left-label
                  v-model="formatoCard"
                  label="Cambiar Diseño"
                  checked-icon="fa-solid fa-list"
                  unchecked-icon="fa-regular fa-address-card"
                /> -->
              </div>
            </span></q-card-section
          >
          <q-card-section
            ><lista-productos
              v-if="cargando"
              :lista="listaAbierta"
              :pareja="pareja"
            ></lista-productos>
          </q-card-section> </q-card
        ><q-page-sticky
          position="right"
          :offset="[18, 18]"
          v-if="listaCarrito.length > 0"
        >
          <q-fab
            icon="fa-solid fa-cart-shopping"
            direction="left"
            color="secondary"
          >
            <q-fab-action
              @click="openModalCart = true"
              color="secondary"
              icon="fa-solid fa-forward-step"
              label="Finalizar"
            />
          </q-fab>
        </q-page-sticky>
        <modal-check-cart
          v-if="openModalCart"
          :sec_lista="sec_lista"
        ></modal-check-cart>
        <carousel-fotos v-if="openCarouselFotos"></carousel-fotos> </q-page
    ></q-page-container>
  </q-layout>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";
import { useInicio } from "src/composables/useInicio";
import { useRoute } from "vue-router";
export default {
  components: {
    headerComp: defineAsyncComponent(() =>
      import("src/components/listaBoda/headerComp.vue")
    ),
    listaProductos: defineAsyncComponent(() =>
      import("components/listaBoda/listaProductos.vue")
    ),
    listaBodasDos: defineAsyncComponent(() =>
      import("components/listaBoda/listaBodasDos.vue")
    ),
    modalCheckCart: defineAsyncComponent(() =>
      import("components/listaBoda/modalCheckCart.vue")
    ),
    carouselFotos: defineAsyncComponent(() =>
      import("src/components/listaBoda/carouselFotos.vue")
    ),
  },

  setup() {
    const {
      listaAbierta,
      abrir_listas,
      inicioStore,
      openModalCart,
      listaCarrito,
      openCarouselFotos,
    } = useInicio();
    const cargando = ref(false);
    let formatoCard = ref(false);
    const route = useRoute();
    let pareja = ref("");
    let sec_lista = ref("");

    onMounted(() => {
      inicioStore.setResetearCarrito();
      let lista = JSON.parse(route.params["data"]);
      pareja.value = lista.novia + " " + " y " + " " + lista.novio;
      sec_lista.value = lista.sec_lista;
      abrir_listas({
        depid: lista.depid,
        sec_lista: lista.sec_lista,
      }).then(() => {
        cargando.value = true;
      });
    });

    return {
      cargando,
      formatoCard,
      listaAbierta,
      pareja,
      openModalCart,
      listaCarrito,
      sec_lista,
      openCarouselFotos,
    };
  },
};
</script>

<style>
.fondoDegradado {
  background: linear-gradient(145deg, #ffffff 80%, #153966 20%);
}
</style>