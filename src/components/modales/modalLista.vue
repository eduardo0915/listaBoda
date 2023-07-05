<template>
  <q-dialog v-model="openModalList">
    <!--Card-->
    <q-card
      v-bind:style="
        $q.screen.lt.lg
          ? 'width: 100%; max-width: 95vw;  max-height: 750px;border: 2px solid #ffffff; border-radius: 75px'
          : $q.screen.lt.xl
          ? 'width: 75%; max-width: 75vw;  max-height: 725px;border: 2px solid #ffffff; border-radius: 75px'
          : 'width: 75%; max-width: 60vw; max-height: 700px;border: 2px solid #ffffff; border-radius: 75px'
      "
      class="table-bg q-mt-md"
    >
      <q-card-section>
        <div class="text-h6 text-white">
          <div class="row q-ml-md">{{ nombreChecklist }}</div>
          <div class="row q-ml-md">
            <span class="text-weight-thin">{{ descripcion }}</span>
          </div>
        </div>
      </q-card-section>
      <q-separator color="white" />

      <!--Tabla de descuentos-->
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-table
              dark
              class="table-bg"
              :rows="tableAcciones"
              :columns="columns"
              hide-bottom
            >
              <!--Nombre-->
              <template v-slot:body-cell-Name="props">
                <q-td :props="props">
                  <q-item style="max-width: 420px">
                    <q-item-section>
                      <q-item-label>{{ props.row.descripcion }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <!--Frecuencia-->
              <template v-slot:body-cell-a_freq="props">
                <q-td :props="props">
                  <q-item style="max-width: 420px">
                    <q-item-section>
                      <q-item-label>{{ label[props.row.a_freq] }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <!--Acciones-->
              <template v-slot:body-cell-Action="props">
                <q-td :props="props">
                  <q-btn
                    icon="fa-regular fa-square-check"
                    size="md"
                    flat
                    dense
                    @click="cambiarEstado(props.row)"
                  >
                    <q-tooltip
                      :offset="[10, 10]"
                      class="bg-secondary text-body1"
                    >
                      Concluir acción
                    </q-tooltip></q-btn
                  >
                  <q-btn icon="fa-solid fa-book" size="md" flat dense>
                    <q-popup-proxy>
                      <q-banner>
                        {{ props.row.nota_comando }}
                      </q-banner>
                    </q-popup-proxy>
                  </q-btn>
                  <!--TODO Cambiar url por la real cuando se pase a producion-->

                  <q-btn
                    icon="fa-solid fa-file-zipper "
                    size="md"
                    flat
                    dense
                    color="white"
                    v-if="props.row.archivo != null"
                    @click="descargarArchivo(props.row.archivo)"
                  >
                    <q-tooltip
                      :offset="[10, 10]"
                      class="bg-secondary text-body1"
                    >
                      Descargar manual
                    </q-tooltip></q-btn
                  >
                </q-td>
              </template>
            </q-table>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
  
  
  
  <script>
import { ref } from "vue";
import { useInicio } from "src/composables/useInicio";
const columns = [
  {
    name: "a_nombre",
    label: "Acción",
    field: "a_nombre",
    sortable: true,
    align: "left",
  },
  {
    name: "a_freq",
    label: "Frecuencia",
    field: "a_freq",
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
export default {
  setup() {
    //variables
    const { openModalList, idListModal, visualizar_list, cambiar_estado } =
      useInicio();

    let nombreChecklist = ref();
    let tableAcciones = ref([]);
    let descripcion = ref();
    let label = ref([]);
    console.log("entre");
    //cargar lista
    visualizar_list(idListModal.value).then((response) => {
      console.log(response);
      nombreChecklist.value = response.nombre;
      descripcion.value = response.nota;
      label.value = response.labels;
      for (let key in response.acciones) {
        tableAcciones.value.push({
          a_nombre: response.acciones[key].descripcion,
          a_freq: response.acciones[key].frecuencia,
          a_text: response.acciones[key].nota_comando,
          a_dia_rep: response.acciones[key].repetir,
          a_dia_ant: response.acciones[key].anticipacion,
          a_fecha: response.acciones[key].fecha_inicio,
          frecuencia: response.acciones[key].frecuencia,
          id_lista: response.acciones[key].id_lista,
          id_accion: response.acciones[key].id_accion,
          a_es_edit: response.acciones[key].id_accion,
        });
      }
    });

    //cambiar estado de una accion a completada
    const cambiarEstado = (list) => {
      console.log(list);
      let data = {
        id_lista: list.id_lista,
        id_accion: list.id_accion,
        completada: "S",
      };
      cambiar_estado(data);
      console.log(data);
    };
    return {
      columns,
      openModalList,
      nombreChecklist,
      tableAcciones,
      descripcion,
      label,
      cambiarEstado,
    };
  },
};
</script>
  
  <style>
.table-bg {
  background-color: #162b4d;
}
</style>
  