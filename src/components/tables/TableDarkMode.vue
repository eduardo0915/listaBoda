<template>
  <q-card
    class="table-bg q-mt-md"
    v-for="(lista, index) in listasConHechoN"
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
        class="table-bg-detalle"
        table-class="text-black"
        table-header-class="text-secondary"
        :rows="convertirObjetosAArreglo(lista.acciones)"
        :columns="columns"
        separator="horizontal"
        hide-bottom
      >
        <!--Nombre-->
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label> {{ props.row.descripcion }}</q-item-label>
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
              color="secondary"
            />
            <q-btn
              icon="fa-solid fa-book"
              size="md"
              color="secondary"
              flat
              dense
            >
              <q-popup-proxy>
                <q-banner>
                  {{ props.row.nota_comando }}
                </q-banner>
              </q-popup-proxy>
            </q-btn>
            <!--TODO Cambiar url por la real cuando se pase a producion-->

            <a
              :href="
                'http://172.22.4.46/agendaAPI/api' +
                '/descargar?id=' +
                props.row.archivo
              "
              style="text-decoration: none"
              v-if="props.row.archivo != null"
            >
              <q-icon
                name="fa-solid fa-file-zipper"
                color="secondary"
                size="md"
              />
            </a>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { useInicio } from "src/composables/useInicio";
import { useInicioStore } from "src/store/inicio";

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
    const { listasDia, cambiar_estado, $q } = useInicio();
    const inicioStore = useInicioStore();
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
          if (objeto[key].hecho === "N") {
            arreglo.push(objeto[key]);
          }
        }
      });
      return arreglo;
    }

    //cambiar de estado
    function cambiarEstado(list) {
      console.log(data);
      $q.dialog({
        title: "Concluir Acción",
        message: "¿Esta seguro/a que deseas concluir la acción",
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
          let data = {
            id_lista: list.id_lista,
            id_accion: list.id_accion,
            completada: "S",
          };
          cambiar_estado(data);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    //descargar archivo
    const descargarArchivo = (nombreArchivo) => {
      const url = `http://localhost/agendaAPI/public/manuales/${nombreArchivo}`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nombreArchivo);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return {
      //variables
      data,
      columns,
      listasDia,
      inicioStore,
      //funciones
      convertirObjetosAArreglo,
      cambiarEstado,
      descargarArchivo,
    };
  },

  //FILTRAR SOLO LAS LITAS QUE TENGA AL MENOS UNA ACCION PENDIENTE POR HACER u las tareas completadas
  computed: {
    listasConHechoN() {
      const allListas = this.listasDia.all_listas ?? {};
      let dat = Object.values(allListas).filter((lista) => {
        return Object.values(lista.acciones).some(
          (accion) => accion.hecho === "N"
        );
      });
      let hecho = Object.values(allListas).filter((lista) => {
        return Object.values(lista.acciones).some(
          (accion) => accion.hecho === "S"
        );
      });
      this.inicioStore.setAllDataNotificaciones(dat);
      this.inicioStore.setAllDataCompletadas(hecho);
      console.log(dat);
      console.log(hecho);
      return dat;
    },
  },
});
</script>

<style>
.table-bg {
  background-color: #1c3b70;
  border-color: black !important;
}

.table-bg-detalle {
  background-color: #ffffff;
  border-color: black !important;
}

table--dark tr,
.q-table--dark th,
.q-table--dark td {
  border-color: #1c3b70 !important;
  border-block-width: 1px;
}
.q-table th {
  font-weight: 500;
  font-size: 15px !important;
  font-weight: bold;
  -webkit-user-select: none;
  user-select: none;
}
</style>
