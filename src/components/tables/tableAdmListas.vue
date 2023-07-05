<template>
  <q-card class="table-bg q-mt-md">
    <q-card-section>
      <div class="text-h6 text-white">
        <div class="row">Listas:</div>
      </div>
    </q-card-section>
    <q-separator color="white" />

    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="admListas"
        :columns="columns"
        :pagination="{ rowsPerPage: 100 }"
      >
        <!--Nota-->
        <template v-slot:body-cell-NOTA="props">
          <q-td :props="props">
            <div
              style="
                white-space: pre-wrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 500px;
              "
            >
              <span>{{ props.row.NOTA }}</span>
            </div>
          </q-td>
        </template>
        <!--Acciones-->
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              :icon="
                statusAdm
                  ? 'fa-solid fa-circle-xmark'
                  : 'fa-solid fa-circle-check'
              "
              size="md"
              flat
              dense
              :color="statusAdm ? 'yellow' : 'positive'"
              @click="
                statusAdm
                  ? eliminarAccion(props.row, 'D')
                  : eliminarAccion(props.row, 'A')
              "
            >
              <q-tooltip :offset="[10, 10]" class="bg-secondary text-body1">
                {{ statusAdm ? "Eliminar" : "Activar" }}
              </q-tooltip></q-btn
            >
            <router-link
              :to="{
                name: 'cargarLista',
                params: { data: props.row.ID_LISTA },
              }"
              style="text-decoration: none"
            >
              <q-btn
                icon="fa-solid fa-pen-to-square"
                size="md"
                flat
                dense
                color="info"
              >
                <q-tooltip :offset="[10, 10]" class="bg-secondary text-body1">
                  Editar
                </q-tooltip></q-btn
              >
            </router-link>
            <q-btn
              icon="fa-solid fa-eye"
              size="md"
              flat
              dense
              color="positive"
              @click="abrirModal(props.row.ID_LISTA)"
            >
              <q-tooltip :offset="[10, 10]" class="bg-secondary text-body1">
                Visualizar Lista
              </q-tooltip></q-btn
            >
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, watch } from "vue";
import { useInicio } from "src/composables/useInicio";
import { useInicioStore } from "src/store/inicio";
import useQuasar from "quasar/src/composables/use-quasar.js";
import { useRouter } from "vue-router";
const data = [
  {
    name: "Sisifo",
    frecuencia: "Diario",
  },
  {
    name: "Aquiles",
    frecuencia: "Diario",
  },
];
const columns = [
  {
    name: "NOMBRE",
    label: "NOMBRE",
    field: "NOMBRE",
    sortable: true,
    align: "left",
  },
  {
    name: "NOTA",
    label: "NOTA",
    field: "NOTA",
    sortable: true,
    align: "left",
  },
  {
    name: "Action",
    label: "",
    field: "Action",
    sortable: false,
    align: "right",
  },
];

export default defineComponent({
  setup() {
    //variables
    const {
      admListas,
      openModalList,
      idListModal,
      statusAdm,
      adm_lista,
      desactivar_list,
    } = useInicio();
    const inicioStore = useInicioStore();
    const $q = useQuasar();

    //funciones
    adm_lista("A");
    //Para eliminar una lista
    function eliminarAccion(data, status) {
      console.log(data);
      $q.dialog({
        title: "Desactivar Checklist",
        message:
          "¿Esta seguro/a que deseas" +
          " " +
          (status == "D" ? "desactivar" : "activar") +
          " " +
          "este Checklist?",
        cancel: true,
        persistent: true,
        ok: {
          push: true,
          color: "positive",
          label: "aceptar",
        },
        cancel: {
          push: true,
          color: "negative",
        },
      })
        .onOk(() => {
          desactivar_list(data.ID_LISTA, status);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    const abrirModal = (id) => {
      idListModal.value = id;
      inicioStore.setModalList(true);
    };

    //ACTIVOS /DESACTIVADOS
    watch(statusAdm, () => {
      if (statusAdm.value) {
        adm_lista("A");
      } else {
        adm_lista("D");
      }
    });

    return {
      //variables
      columns,
      admListas,
      openModalList,
      statusAdm,
      //funciones
      eliminarAccion,
      abrirModal,
    };
  },
});
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>
