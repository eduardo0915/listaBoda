<template>
  <q-table
    grid
    :rows="lista"
    :columns="columns"
    :filter="filter"
    :pagination="{ rowsPerPage: 50 }"
    rows-per-page-label="Registros por página"
    no-data-label="Ingrese los parametros para realizar la busqueda"
    no-results-label="El buscador no encontro ningún resultado."
  >
    <!--Buscador-->
    <template v-slot:top>
      <div class="col">
        <div class="row justify-center q-mb-md">
          <q-input
            color="primary"
            rounded
            v-model="filter"
            outlined
            placeholder="Tip: Buscar por nombre de Novio o Novia."
            style="width: 50%"
          >
            <template v-slot:append>
              <q-icon v-if="filter === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="filter = ''"
              />
            </template>
          </q-input>
        </div>
      </div>
    </template>

    <template v-slot:item="props">
      <lista-bodas-card :lista="props.row"></lista-bodas-card>
    </template>
  </q-table>
</template>

<script>
import { ref } from "vue";
import listaBodasCard from "src/components/listaBoda/listaBodasCard.vue";
export default {
  components: { listaBodasCard },
  props: ["lista"],
  setup(props) {
    console.log(props.lista);

    const columns = [
      {
        name: "novio",
        required: true,
        align: "left",
        field: (row) => row.novio,
      },

      {
        name: "novia",
        required: true,
        align: "left",
        field: (row) => row.novia,
      },
      { name: "acciones", align: "left", field: "acciones" },
    ];

    let filter = ref("");

    return { columns, filter };
  },
};
</script>

<style>
</style>