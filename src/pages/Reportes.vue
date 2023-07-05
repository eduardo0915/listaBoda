
<template>
  <q-page class="q-pa-sm">
    <card-social icon_position="right" />
    <q-card class="q-ma-md bg-grey-1">
      <!--Titulo-->
      <q-card-section class="text-center">
        <span class="text-h4 text-secondary text-weight-bolder">
          Reportes</span
        ></q-card-section
      >
      <q-card-section>
        <q-card class="bg-grey-2"
          ><table-empleados
            :analiticas="analiticas"
            v-if="cargando"
          ></table-empleados>
        </q-card>
        <q-card class="bg-grey-2 q-mt-md">
          <div class="row q-ml-lg q-mr-lg q-mb-xs q-mt-xs">
            <div class="col text-center">
              <q-icon
                name="fa-solid fa-clock"
                color="secondary"
                size="md"
                class="q-mr-xs"
              />

              <span class="text-h6 text-secondary q-mr-xs"
                >Analítica anual
              </span>
            </div>
          </div>
          <!--Periodo de tiempo ano-->
          <div class="row q-ml-lg q-mr-lg q-mb-xs q-mt-md">
            <div class="col-12">
              <q-select
                v-model="anioSeleccionado"
                :options="listaAnios"
                filled
                label="Selecciona un año"
              />
            </div>
          </div>
          <grafico-circular :estadistica="graficoMensual"></grafico-circular
        ></q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineAsyncComponent, ref, onMounted, watch } from "vue";
import { useInicio } from "src/composables/useInicio";
import { Cookies } from "quasar";
export default {
  components: {
    TableEmpleados: defineAsyncComponent(() =>
      import("components/tables/TableEmpleados.vue")
    ),
    GraficoCircular: defineAsyncComponent(() =>
      import("components/charts/GraficoCircular.vue")
    ),
    CardSocial: defineAsyncComponent(() =>
      import("components/cards/CardSocial.vue")
    ),
  },

  setup() {
    const {
      listas_del_dia,
      get_analitica_fecha,
      cambiarNumeroANombreMes,
      generarGrafica,
      calcularTotales,
    } = useInicio();
    let TrabajadaMes = ref();
    let graficoMensual = ref([]);
    let totalMes = ref(0);
    let anioSeleccionado = ref(new Date().getFullYear());
    let listaAnios = ref([]);
    let analiticas = ref();
    let cargando = ref(false);
    let token = Cookies.get("tokenAgenda");
    //funciones
    const reportes = () => {
      //analitica mensual
      //obtener la fecha mensual

      const { format, startOfYear, endOfYear } = require("date-fns");

      // Obtener el primer y último día del mes actual
      const primerDiaDelMes = format(startOfYear(new Date()), "dd/MM/yyyy");
      const ultimoDiaDelMes = format(endOfYear(new Date()), "dd/MM/yyyy");
      get_analitica_fecha({
        ficha: token.ficha,
        desde: primerDiaDelMes,
        hasta: ultimoDiaDelMes,
        anio: anioSeleccionado.value,
      }).then((response4) => {
        analiticas.value = response4;

        console.log(response4);
        TrabajadaMes.value = cambiarNumeroANombreMes(response4.Meses);
        totalMes.value = calcularTotales(TrabajadaMes.value);
        graficoMensual.value = generarGrafica(TrabajadaMes.value);
        console.log(graficoMensual.value);
        cargando.value = true;
      });
    };

    watch(anioSeleccionado, () => {
      reportes();
    });

    //llenar listas
    const llenarListaAnios = () => {
      for (let i = 2015; i <= anioSeleccionado.value; i++) {
        listaAnios.value.push(i);
      }
    };

    onMounted(() => {
      reportes();
      listas_del_dia();
      llenarListaAnios();
    });
    return {
      graficoMensual,
      totalMes,
      anioSeleccionado,
      listaAnios,
      analiticas,
      cargando,
      reportes,
    };
  },
};
</script>

<style>
</style>