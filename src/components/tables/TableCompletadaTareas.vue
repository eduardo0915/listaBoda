<template>
  <q-card
    class="table-bg q-mt-md"
    v-for="(lista, index) in tareasCompletadas"
    :key="index"
  >
    <q-card-section>
      <div class="text-h6 text-white">
        <div class="row">{{ lista.nombre }}</div>
        <div class="row">
          <span class="text-weight-thin">{{ lista.nota }}</span>
        </div>
      </div>
    </q-card-section>
    <q-separator color="white" />

    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="convertirObjetosAArreglo(lista.acciones)"
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
        <template v-slot:body-cell-unidad_tiempo="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>{{
                  lista.labels[props.row.frecuencia]
                }}</q-item-label>
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
            />
            <q-btn icon="fa-solid fa-book" size="md" flat dense>
              <q-popup-proxy>
                <q-banner>
                  {{ props.row.nota_comando }}
                </q-banner>
              </q-popup-proxy>
            </q-btn>
            <q-btn
              icon="fa-solid fa-file-zipper "
              size="md"
              flat
              dense
              v-if="props.row.archivo != null"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { useInicio } from "src/composables/useInicio";

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
    name: "descripcion",
    label: "Acción",
    field: "descripcion",
    sortable: true,
    align: "left",
  },
  {
    name: "unidad_tiempo",
    label: "Frecuencia",
    field: "unidad_tiempo",
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
  name: "TableDarkMode",
  setup() {
    const { allTareasUsu, tareasCompletadas, cambiar_estado } = useInicio();

    // function convertirObjetosAArreglo(...objetos) {
    //   let arreglo = [];
    //   objetos.forEach((objeto) => {
    //     for (let key in objeto) {
    //       arreglo.push(objeto[key]);
    //     }
    //   });
    //   return arreglo;
    // }

    //FILTRAR SOLO LAS ACCIONES QUE FALTAN POR REALIZAR PARA QUE SE MUESTREN EN LA TABLA
    function convertirObjetosAArreglo(...objetos) {
      let arreglo = [];
      objetos.forEach((objeto) => {
        for (let key in objeto) {
          if (objeto[key].hecho === "S") {
            arreglo.push(objeto[key]);
          }
        }
      });
      return arreglo;
    }

    //cambiar estado de una accion
    const cambiarEstado = (list) => {
      let data = {
        id_lista: list.id_lista,
        id_accion: list.id_accion,
        completada: "S",
      };
      cambiar_estado(data);
      console.log(data);
    };

    return {
      //variables
      data,
      columns,
      allTareasUsu,
      tareasCompletadas,
      //funciones
      convertirObjetosAArreglo,
      cambiarEstado,
    };
  },

  //FILTRAR LISTAS
  computed: {
    listasConHechoN() {
      const allListas = this.allTareasUsu.all_listas ?? {};
      return allListas;
    },
  },
});
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>
