
<template>
  <q-layout>
    <header-comp></header-comp>
    <q-page-container>
      <q-page class="q-pa-sm">
        <q-card class="q-ma-md bg-grey-1">
          <!--cambiar vista-->
          <q-card-section class="text-center">
            <span class="text-h6 text-secondary text-weight-bolder"
              ><div
                class="col-lg-2 col-xl-2 col-md-2 col-sm-2 col-xs-2 q-mr-xl absolute-top-right"
              >
                <q-checkbox
                  left-label
                  v-model="formatoCard"
                  label="Cambiar Diseño"
                  checked-icon="fa-solid fa-list"
                  unchecked-icon="fa-regular fa-address-card"
                />
              </div> </span
          ></q-card-section>
          <q-card-section>
            <lista-bodas
              v-if="cargando == true && formatoCard == false"
              :lista="listasDia"
            ></lista-bodas>
            <lista-bodas-dos
              v-if="cargando == true && formatoCard == true"
              :lista="listasDia"
            ></lista-bodas-dos>
          </q-card-section>
        </q-card> </q-page
    ></q-page-container>
  </q-layout>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";
import { useInicio } from "src/composables/useInicio";
export default {
  components: {
    headerComp: defineAsyncComponent(() =>
      import("src/components/listaBoda/headerComp.vue")
    ),
    listaBodas: defineAsyncComponent(() =>
      import("components/listaBoda/listaBodas.vue")
    ),
    listaBodasDos: defineAsyncComponent(() =>
      import("components/listaBoda/listaBodasDos.vue")
    ),
  },

  setup() {
    const { listas, listasDia } = useInicio();
    const cargando = ref(false);
    let formatoCard = ref(false);

    onMounted(() => {
      listas({
        fInicio: "",
        fFin: "",
        busqueda: "",
      }).then(() => {
        cargando.value = true;
      });
    });

    return {
      cargando,
      listasDia,
      formatoCard,
    };
  },
};
</script>

<style>
.fondoDegradado {
  background: linear-gradient(145deg, #ffffff 80%, #153966 20%);
}
</style>