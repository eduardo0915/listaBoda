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
      <q-td :props="props" :class="calculateRowStyles(props.rowIndex)">
        <span class="text-secondary text-h6">
          {{ props.row.novia + " " + "y" + " " + props.row.novio }}</span
        >
      </q-td>
    </template>
    <template v-slot:body-cell-novia="props">
      <q-td :props="props" :class="calculateRowStyles(props.rowIndex)"> </q-td>
    </template>
    <!--Acciones-->
    <template v-slot:body-cell-acciones="props">
      <q-td :props="props" :class="calculateRowStyles(props.rowIndex)">
        <q-btn
          icon="fa-solid fa-pen-to-square"
          size="lg"
          color="secondary"
          flat
          dense
          label="Editar"
          @click="abrirLista(props.row)"
        >
          <q-popup-proxy>
            <q-banner> Editar</q-banner>
          </q-popup-proxy>
        </q-btn>

        <q-btn
          icon="fa-solid fa-file-pdf"
          size="lg"
          color="accent"
          flat
          dense
          label="Reportes"
          @click="abrirModal(props.row.depid, props.row.sec_lista)"
        >
        </q-btn>
      </q-td>
    </template>
  </q-table>
  <modal-descargas
    :dependencia="id_dependencia"
    :serie="sec_lista"
    v-if="openModalDescargas"
  ></modal-descargas>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useInicio } from "src/composables/useInicio.js";
import ModalDescargas from "src/components/listaBoda/ModalDescargas.vue";
import { useInicioStore } from "src/store/inicio.js";
export default {
  components: { ModalDescargas },
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
      { name: "acciones", align: "right", field: "acciones" },
    ];
    const { openModalDescargas } = useInicio();
    let filter = ref("");
    let id_dependencia = ref();
    let sec_lista = ref();
    const inicioStore = useInicioStore();

    const abrirLista = (list) => {
      router.push({
        name: "modificarLista",
        params: {
          data: JSON.stringify({
            sec_lista: list.sec_lista,
            depid: list.depid,
          }),
        },
      });
    };

    function calculateRowStyles(index) {
      if (index % 2 === 0) {
        return "bg-grey-3";
      } else {
        return "bg-grey-1";
      }
    }

    const abrirModal = (dependencia, serie) => {
      id_dependencia.value = dependencia;
      sec_lista.value = serie;
      inicioStore.setModalDescagas(true);
    };
    return {
      columns,
      filter,
      abrirLista,
      calculateRowStyles,
      openModalDescargas,
      abrirModal,
      id_dependencia,
      sec_lista,
    };
  },
};
</script>

<style>
</style>