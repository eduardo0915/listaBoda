<template>
  <q-dialog v-model="openModalDescargas">
    <!--style="width: 75%; max-width: 35vw; height: 35%; max-height: 300px"-->
    <!--</q-card> style="width: 120px; height: 150px; border: 3px solid #ddd"-->

    <div
      style="
        border-radius: 81px;
        background: #fff;
        box-shadow: inset 13px 13px 0px #153966, inset -13px -13px 0px #206a50;
      "
    >
      <!--Titulo-->
      <div class="text-center q-mb-none row justify-center">
        <span
          class="text-secondary text-weight-bold q-pl-xl q-pr-xl q-pt-xl q-pb-md"
          >Reportes</span
        >
      </div>
      <div class="row">
        <!--Select para motivo-->
        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-item-section>
            <a
              :href="
                'http://172.22.4.46/apiListaBoda/api/descargar?id_dependencia=' +
                dependencia +
                '&sec_lista=' +
                serie
              "
              style="text-decoration: none"
              class="q-mr-xl q-ml-xl"
            >
              <q-btn
                rounded
                color="secondary"
                class="glossy"
                icon="fa-solid fa-download"
                label="Lista de regalos"
                style="width: 100%"
              />
            </a>
          </q-item-section>
        </q-item>
        <!--comprados-->
        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mb-lg">
          <q-item-section>
            <q-btn
              rounded
              color="secondary"
              class="glossy q-mr-xl q-ml-xl"
              icon="fa-solid fa-download"
              label="Status códigos"
              @click="
                reportesPendComp(
                  {
                    depid: dependencia,
                    sec_lista: serie,
                  },
                  'C'
                )
              "
            />
          </q-item-section>
        </q-item>

        <!--existencia-->
        <!--        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mb-lg">
          <q-item-section>
            <q-btn
              rounded
              color="secondary"
              class="glossy q-mr-xl q-ml-xl"
              icon="fa-solid fa-download"
              label="Existencia de articulos
              "
              @click="
                reportesExistencia(
                  {
                    sec_lista: serie,
                    depid: dependencia,
                  },
                  'E'
                )
              "
            />
          </q-item-section>
        </q-item> -->
      </div>
    </div>
  </q-dialog>
</template>
  
  <script>
import { ref } from "vue";
import { useInicio } from "src/composables/useInicio";
export default {
  props: ["dependencia", "serie"],
  setup(props) {
    //variables
    const { openModalDescargas, reportesPendComp, reportesExistencia } =
      useInicio();
    const motivo = ref("Sugerencia");
    const descripcion = ref("");

    return {
      //variables
      opcionMotivo: ["Sugerencia", "Comentario", "Felicitación"],
      openModalDescargas,
      motivo,
      descripcion,
      //funciones
      reportesPendComp,
      reportesExistencia,
    };
  },
};
</script>
  
  <style>
</style>
  