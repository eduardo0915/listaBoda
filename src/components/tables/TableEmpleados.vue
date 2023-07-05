<template>
  <q-tabs v-model="tab" class="text-secondary">
    <q-tab name="diario" icon="fa-solid fa-chart-simple" label="Diario" />
    <q-tab name="semanal" icon="fa-solid fa-chart-simple" label="semanal" />
    <q-tab name="mensual" icon="fa-solid fa-chart-simple" label="usuarios" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <!--diario-->
    <q-tab-panel
      name="diario"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <q-card>
        <q-card-section class="text-center">
          <div class="text-h6 text-secondary">Analítica diaria por usuario</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <q-table grid :rows="dataUsu" :columns="columns" hide-bottom>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <card-profile
                  :avatar="props.row.avatar"
                  :name="props.row.name"
                  :des="props.row.des"
                  :estadistica="props.row.estadistica"
                  v-if="status"
                ></card-profile>
              </div>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-tab-panel>
    <!--semanal-->
    <q-tab-panel
      name="semanal"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <q-card>
        <q-card-section class="text-center">
          <div class="text-h6 text-secondary">Analítica de la semana</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <grafico-circular :estadistica="graficoSemanal"></grafico-circular>
        </q-card-section>
      </q-card>
    </q-tab-panel>

    <!--Usuarios-->
    <q-tab-panel
      name="mensual"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <q-card>
        <q-card-section class="text-center">
          <div class="text-h6 text-secondary">
            Analítica de usuarios en general
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <!--Periodo de tiempo usuario-->
          <div class="row q-ml-lg q-mr-lg q-mb-xs q-mt-md">
            <div class="col-12">
              <q-field
                :label="
                  periodoUsuarios ? ' ' : 'Selecciona un periodo de tiempo'
                "
              >
                <template v-slot:prepend>
                  <q-btn icon="event" round color="secondary">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="periodoUsuarios" range>
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="busquedaAvanzada()"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
                <template v-slot:control>
                  <div
                    class="self-center full-width no-outline"
                    tabindex="0"
                    v-if="periodoUsuarios"
                  >
                    {{
                      periodoUsuarios.from +
                      " " +
                      ":" +
                      " " +
                      periodoUsuarios.to
                    }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>
          <grafico-circular :estadistica="graficoUsuarios"></grafico-circular>
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useInicio } from "src/composables/useInicio";
import CardProfile from "components/cards/CardProfile";
import GraficoCircular from "components/charts/GraficoCircular.vue";
import { Cookies } from "quasar";
const columns = [
  { name: "Name", label: "Name", field: "name", sortable: true, align: "left" },
  {
    name: "Crated Date",
    label: "Crated Date",
    field: "Crated_Date",
    sortable: true,
    align: "left",
  },
  {
    name: "Project",
    label: "Project",
    field: "Project",
    sortable: true,
    align: "left",
  },
  {
    name: "Action",
    label: "",
    field: "Action",
    sortable: false,
    align: "center",
  },
];

export default defineComponent({
  name: "TableCustomGrid",
  components: { GraficoCircular, CardProfile },
  props: ["analiticas"],
  setup(props) {
    //variables
    console.log(props.analiticas);
    const {
      data_usuario,
      get_empleados,
      cambiarDiaSemana,
      calcularTotales,
      generarGraficaSemanal,
      generarGraficaUsuario,
      get_analitica_fecha,
      analiticas,
    } = useInicio();
    let dataUsu = ref([]);
    let status = ref(false);
    let TrabajadaSemanal = ref();
    let TrabajadaUsuarios = ref();
    let graficoSemanal = ref([]);
    let graficoUsuarios = ref([]);
    let totalSemanal = ref(0);
    let totalUsuarios = ref(0);
    let periodoUsuarios = ref();

    //funciones
    //verifica las tareas realizadas y no realizadas del dia del usuario
    const listasConHechoN = (lista) => {
      const allListas = lista.all_listas ?? {};
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

      let datos = [
        {
          no: dat.length,
          si: hecho.length,
        },
      ];
      console.log(datos);

      return datos;
    };

    get_empleados().then((response) => {
      dataUsu.value = [];
      console.log(response);
      for (let key in response) {
        dataUsu.value.push({
          name: response[key].NOMBRE,
          avatar:
            "http://172.17.0.150:8081/intranetAPI/assets/themes/default/images/empleados/" +
            response[key].FICHA +
            ".JPG",
          des: response[key].DEPTO,
        });

        //analitica por dia
        data_usuario(response[key].FICHA).then((response2) => {
          console.log(response2);
          //console.log(response2);
          let resp = listasConHechoN(response2);
          let data_chart = {
            labels: ["Diario"],
            datasets: [
              {
                label: "En proceso:" + " " + [resp[0].no],
                //label: "En proceso",
                borderColor: "#e57373",
                pointBackgroundColor: "black",
                borderWidth: 2,
                backgroundColor: "#d41731",
                data: [resp[0].no],
              },
              {
                label: "Concluidas:" + " " + [resp[0].si],
                //label: "Concluidas",
                borderColor: "#81c784",
                pointBackgroundColor: "black",
                borderWidth: 2,
                backgroundColor: "#20145F",
                data: [resp[0].si],
              },
            ],
          };

          dataUsu.value[key].estadistica = data_chart;
        });

        //analitica por semana
        //obtener la fecha semanal
        /*         const fechaActual = new Date()
          .toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .split("/")
          .reverse()
          .join("/");
        const fecha7DiasAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .split("/")
          .reverse()
          .join("/");

        const fechaActualDMY = fechaActual.split("/").reverse().join("/");
        const fecha7DiasAtrasDMY = fecha7DiasAtras
          .split("/")
          .reverse()
          .join("/");

        console.log(fechaActualDMY);
        console.log(fecha7DiasAtrasDMY);
        get_analitica_fecha({
          ficha: response[key].FICHA,
          desde: fecha7DiasAtrasDMY,
          hasta: fechaActualDMY,
          anio: "2023",
        }).then((response3) => {
          console.log(response3);
          let data_chart = {
            labels: ["Semanal"],
            datasets: [
              {
                label: "Concluidas:" + " " + response3[0].TOTAL,
                //label: "Concluidas",
                borderColor: "#81c784",
                pointBackgroundColor: "black",
                borderWidth: 2,
                backgroundColor: "#20145F",
                data: [response3[0].TOTAL],
              },
            ],
          };

          dataUsu.value[key].estadisticaSemanal = data_chart;
          console.log(dataUsu.value);
        }); */
      }

      status.value = true;
    });

    const reportes = () => {
      //analitica semanal
      TrabajadaSemanal.value = cambiarDiaSemana(analiticas.value.semana);
      console.log(analiticas.value.semana);
      totalSemanal.value = calcularTotales(TrabajadaSemanal.value);
      graficoSemanal.value = generarGraficaSemanal(
        TrabajadaSemanal.value,
        totalSemanal.value
      );

      TrabajadaUsuarios.value = analiticas.value.usuarios;
      console.log(TrabajadaUsuarios.value);
      totalUsuarios.value = calcularTotales(TrabajadaUsuarios.value);
      graficoUsuarios.value = generarGraficaUsuario(
        TrabajadaUsuarios.value,
        totalUsuarios.value
      );
    };

    reportes();

    //aplicar filtros
    const busquedaAvanzada = () => {
      let token = Cookies.get("tokenAgenda");
      console.log("entre");
      let anioSeleccionado = new Date().getFullYear();

      const from = new Date(periodoUsuarios.value.from);
      const to = new Date(periodoUsuarios.value.to);

      const desde = `${from.getDate().toString().padStart(2, "0")}/${(
        from.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${from.getFullYear()}`;
      const hasta = `${to.getDate().toString().padStart(2, "0")}/${(
        to.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${to.getFullYear()}`;

      get_analitica_fecha({
        ficha: token.ficha,
        desde: desde,
        hasta: hasta,
        anio: anioSeleccionado,
      }).then(() => {
        reportes();
      });
    };

    return {
      columns,
      status,
      dataUsu,
      graficoSemanal,
      graficoUsuarios,
      periodoUsuarios,
      busquedaAvanzada,
      tab: ref("diario"),
    };
  },
});
</script>

<style scoped>
</style>
