<template>
  <div class="row text-center">
    <div class="col-12">
      <span
        class="text-secondary"
        style="font-family: Great Vibes; font-size: 2em"
        >{{ pareja }}</span
      >
    </div>
  </div>

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
      <div class="col-lg-3 col-md-4 col-xl-2">
        <lista-productos-card :producto="props.row"></lista-productos-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import { ref } from "vue";
import listaProductosCard from "src/components/listaBoda/listaProductosCard.vue";
export default {
  components: { listaProductosCard },
  props: ["lista", "pareja"],
  setup(props) {
    console.log(props.lista);

    const columns = [
      {
        name: "DESCRIPCION",
        required: true,
        align: "left",
        field: (row) => row.DESCRIPCION,
      },

      {
        name: "MARCA",
        required: true,
        align: "left",
        field: (row) => row.MARCA,
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