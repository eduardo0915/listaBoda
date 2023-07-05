
<template>
  <q-page class="q-pa-sm">
    <q-breadcrumbs active-color="secondary" class="q-mt-sm q-ml-lg">
      <q-breadcrumbs-el label="Inicio" icon="home" to="/Inicio'" />
      <q-breadcrumbs-el
        label="Administrar listas"
        icon="fa-solid fa-list-check"
      />
    </q-breadcrumbs>
    <q-card class="q-ma-md bg-grey-1">
      <div class="q-ml-md">
        <q-checkbox
          left-label
          v-model="statusAdm"
          :label="statusAdm ? 'Activos' : 'Desactivados'"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
          color="positive"
        />
      </div>
      <!--Titulo-->
      <q-card-section class="text-center">
        <span class="text-h4 text-secondary text-weight-bolder">
          Administrar listas</span
        ></q-card-section
      >
      <q-card-section>
        <q-card class="bg-grey-2">
          <table-adm-listas></table-adm-listas
        ></q-card>
      </q-card-section>
    </q-card>
    <modal-lista v-if="openModalList"></modal-lista>
  </q-page>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";
import { useInicio } from "src/composables/useInicio";
export default {
  components: {
    tableAdmListas: defineAsyncComponent(() =>
      import("components/tables/tableAdmListas.vue")
    ),
    modalLista: defineAsyncComponent(() =>
      import("components/modales/modalLista.vue")
    ),
  },

  setup() {
    const { openModalList, statusAdm } = useInicio();

    return { openModalList, statusAdm };
  },
};
</script>

<style>
</style>