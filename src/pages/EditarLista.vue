
<template>
  <q-page class="q-pa-sm">
    <q-card class="q-ma-md bg-grey-1">
      <!--cambiar vista-->
      <q-card-section class="text-center">
        <span class="text-h6 text-secondary text-weight-bolder"
          ><div
            class="col-lg-2 col-xl-2 col-md-2 col-sm-2 col-xs-2 q-mr-xl absolute-top-center"
          >
            <span>Administración de lista de bodas</span>
          </div>
        </span></q-card-section
      >
      <q-card-section>
        <tablelista-bodas
          v-if="cargando == true && formatoCard == false"
          :lista="listasDia"
        ></tablelista-bodas>
        <lista-bodas-dos
          v-if="cargando == true && formatoCard == true"
          :lista="listasDia"
        ></lista-bodas-dos>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";
import { useInicio } from "src/composables/useInicio";
export default {
  components: {
    headerComp: defineAsyncComponent(() =>
      import("src/components/listaBoda/headerComp.vue")
    ),
    TablelistaBodas: defineAsyncComponent(() =>
      import("components/listaBoda/TablelistaBodas.vue")
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
</style>