
<template>
  <q-page class="q-pa-sm">
    <card-social icon_position="right" />
    <q-card class="q-ma-md bg-grey-1">
      <!--Titulo-->
      <q-card-section class="text-center">
        <span class="text-h4 text-secondary text-weight-bolder">
          Tareas completadas</span
        ></q-card-section
      >
      <q-card-section>
        <q-card class="bg-grey-2">
          <table-completada-tareas></table-completada-tareas
        ></q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useInicio } from "src/composables/useInicio";
export default {
  components: {
    CardSocial: defineAsyncComponent(() =>
      import("components/cards/CardSocial")
    ),
    TableCompletadaTareas: defineAsyncComponent(() =>
      import("components/tables/TableCompletadaTareas.vue")
    ),
  },

  setup() {
    const { todasListaAll } = useInicio();

    todasListaAll();
  },
};
</script>

<style>
</style>