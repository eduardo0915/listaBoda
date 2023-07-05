<template>
  <q-table
    flat
    bordered
    :rows="lista"
    :columns="columns"
    :filter="filter"
    hide-header
    hide-bottom
    :pagination="{ rowsPerPage: 30 }"
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
    <!--Celda de novio y novia-->
    <template v-slot:body-cell-novio="props">
      <q-td :props="props">
        <span
          class="text-secondary"
          v-bind:style="
            $q.platform.is.nativeMobile && $q.platform.is.android
              ? 'font-family: Great Vibes; font-size: 2em'
              : 'font-family: Great Vibes; font-size: 4em'
          "
        >
          {{ props.row.novia + " " + "y" + " " + props.row.novio }}</span
        >
      </q-td>
    </template>
    <template v-slot:body-cell-novia="props">
      <q-td :props="props"> </q-td>
    </template>
    <!--Acciones-->
    <template v-slot:body-cell-acciones="props">
      <q-td :props="props">
        <q-btn
          icon="fa-solid fa-eye"
          size="lg"
          color="secondary"
          label="Ver lista"
          flat
          dense
          @click="abrirLista(props.row)"
        >
          <q-popup-proxy>
            <q-banner> Ver lista </q-banner>
          </q-popup-proxy>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["lista"],
  setup(props) {
    console.log(props.lista);
    const router = useRouter();
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

    const abrirLista = (list) => {
      router.push({
        name: "abrir",
        params: {
          data: JSON.stringify({
            sec_lista: list.sec_lista,
            depid: list.depid,
            novio: list.novio,
            novia: list.novia,
          }),
          skipLocationChange: true,
        },
      });
    };
    return { columns, filter, abrirLista };
  },
};
</script>

<style>
</style>