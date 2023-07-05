
<template>
  <q-page class="q-pa-sm">
    <q-breadcrumbs active-color="secondary" class="q-mt-sm q-ml-lg">
      <q-breadcrumbs-el label="Inicio" icon="home" to="/Inicio" />
      <q-breadcrumbs-el label="Crear lista" icon="fa-solid fa-list-check" />
    </q-breadcrumbs>

    <!--Mobile-->
    <q-card
      class="q-ma-md bg-grey-1"
      v-if="$q.platform.is.nativeMobile && $q.platform.is.android"
    >
      <!--Titulo-->
      <q-card-section class="text-center">
        <span class="text-h4 text-secondary text-weight-bolder">
          CheckList Manager</span
        ></q-card-section
      >
      <q-card-section>
        <q-card class="bg-grey-2">
          <div class="col-12">
            <q-form @submit="confirm">
              <div class="row">
                <!--Primera col-->
                <div class="col-12">
                  <div
                    class="row justify-center text-secondary text-weight-bolder text-h5"
                  >
                    <span>CREAR LISTA</span>
                  </div>
                  <!--Nombre y dueno-->
                  <div class="row">
                    <div class="col-10 q-ma-md">
                      <q-input
                        filled
                        v-model="nombreChecklist"
                        label="Nombre del Checklist"
                        label-color="secondary"
                        rounded
                      />
                    </div>
                    <div class="col-10 q-ma-md">
                      <q-select
                        filled
                        v-model="dueno"
                        use-input
                        input-debounce="0"
                        :options="opcDueno"
                        label="Dueño"
                        label-color="secondary"
                        rounded
                      />
                    </div>
                  </div>
                  <!--Descripcion-->
                  <div class="row">
                    <div class="col q-ma-md">
                      <q-input
                        filled
                        v-model="descripcion"
                        label="Descripción"
                        label-color="secondary"
                        rounded
                        type="textarea"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 text-center">
                      <span class="text-secondary text-weight-bolder text-h5"
                        >ACCIONES</span
                      >
                      <q-table
                        dark
                        class="table-bg"
                        :rows="tableAcciones"
                        :columns="columns"
                        hide-bottom
                      >
                        <!--Acciones-->
                        <template v-slot:body-cell-Action="props">
                          <q-td :props="props">
                            <q-btn
                              icon="fa-solid fa-trash"
                              size="md"
                              flat
                              dense
                              color="accent"
                              @click="eliminarAccion(props)"
                            />
                          </q-td>
                        </template>
                        <!--Acciones-->
                        <template v-slot:body-cell-frecuencia="props">
                          <q-td :props="props">
                            {{ labels[props.row.frecuencia] }}
                          </q-td>
                        </template>
                      </q-table>
                    </div>
                  </div>
                </div>

                <!--Segunda col-->
                <div class="col-12">
                  <div
                    class="row justify-center text-secondary text-weight-bolder text-h5 q-mt-md"
                  >
                    <span>CREAR ACCIÓN</span>
                  </div>
                  <!--NOmbre accion-->
                  <div class="row">
                    <div class="col q-ma-md">
                      <q-input
                        filled
                        v-model="nombreAccion"
                        label="Nombre de Acción"
                        label-color="secondary"
                        rounded
                      />
                    </div>
                  </div>
                  <!--Frecuencia-->
                  <div class="row">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Frecuencia:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-option-group
                            v-model="frecuencia"
                            :options="options"
                            color="secondary"
                            inline
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--opcion diario-->
                  <div class="row" v-if="frecuencia == '0.65'">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Repetir:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-checkbox
                            v-model="lunes"
                            label="Lunes"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="martes"
                            label="Martes"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="miercoles"
                            label="Miércoles"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="jueves"
                            label="Jueves"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="viernes"
                            label="Viernes"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="sabado"
                            label="Sábado"
                            color="secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--opcion semanal-->
                  <div class="row" v-if="frecuencia == '6.65'">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Elegir día de la semana:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-option-group
                            v-model="semanal"
                            :options="optSemanal"
                            color="secondary"
                            inline
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--opcion quincenal-->
                  <div
                    class="row"
                    v-if="
                      frecuencia == '14.65' ||
                      frecuencia == '29.65' ||
                      frecuencia == '89.65' ||
                      frecuencia == '364.65' ||
                      frecuencia == '0'
                    "
                  >
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Días de anticipación:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-input
                            v-model="anticipacion"
                            type="number"
                            filled
                            style="max-width: 95px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Inicio-->
                  <div class="row">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Inicio:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-input
                            filled
                            v-model="inicio"
                            type="date"
                            color="secondary"
                            rounded
                            label-color="secondary text-weight-bold"
                          ></q-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Nota-->
                  <div class="row">
                    <div class="col q-ma-md">
                      <q-input
                        filled
                        v-model="nota"
                        label="Nota"
                        label-color="secondary"
                        rounded
                        type="textarea"
                      />
                    </div>
                  </div>

                  <!--Manual-->
                  <div class="row">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Manual:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-file
                            filled
                            rounded
                            bottom-slots
                            v-model="manual"
                            label="Selecionar Archivo"
                            counter
                            label-color="secondary"
                          >
                            <template v-slot:prepend>
                              <q-icon
                                name="cloud_upload"
                                @click.stop.prevent
                                color="secondary"
                              />
                            </template>
                            <template v-slot:append>
                              <q-icon
                                name="close"
                                @click.stop.prevent="archivo = null"
                                class="cursor-pointer"
                                color="secondary"
                              />
                            </template>

                            <template v-slot:hint
                              ><span class="text-secondary">Máximo 2MB</span>
                            </template>
                          </q-file>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--Acciones de agregar / guardar lista-->
                  <div class="row justify-between">
                    <div class="col text-left q-ma-md">
                      <q-btn
                        color="positive"
                        icon="fa-solid fa-plus"
                        label="Agregar"
                        @click="agregar"
                      />
                    </div>
                    <div class="col text-right q-ma-md">
                      <q-btn
                        color="info"
                        icon="fa-solid fa-floppy-disk"
                        label="Guardar lista"
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
    <!--EScritorio-->
    <q-card class="q-ma-md bg-grey-1" v-else>
      <!--Titulo-->
      <q-card-section class="text-center">
        <span class="text-h4 text-secondary text-weight-bolder">
          CheckList Manager</span
        ></q-card-section
      >
      <q-card-section>
        <q-card class="bg-grey-2">
          <div class="col">
            <q-form @submit="confirm">
              <div class="row">
                <!--Primera col-->
                <div class="col-8">
                  <div
                    class="row justify-center text-secondary text-weight-bolder text-h5"
                  >
                    <span>CREAR LISTA</span>
                  </div>
                  <!--Nombre y dueno-->
                  <div class="row">
                    <div class="col q-ma-md">
                      <q-input
                        filled
                        v-model="nombreChecklist"
                        label="Nombre del Checklist"
                        label-color="secondary"
                        rounded
                      />
                    </div>
                    <div class="col q-ma-md">
                      <q-select
                        filled
                        v-model="dueno"
                        use-input
                        input-debounce="0"
                        :options="opcDueno"
                        label="Dueño"
                        label-color="secondary"
                        rounded
                      />
                    </div>
                  </div>
                  <!--Descripcion-->
                  <div class="row">
                    <div class="col q-ma-md">
                      <q-input
                        filled
                        v-model="descripcion"
                        label="Descripción"
                        label-color="secondary"
                        rounded
                        type="textarea"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder text-h5"
                        >ACCIONES</span
                      >
                      <q-table
                        dark
                        class="table-bg q-ma-xl"
                        :rows="tableAcciones"
                        :columns="columns"
                        hide-bottom
                      >
                        <!--Acciones-->
                        <template v-slot:body-cell-Action="props">
                          <q-td :props="props">
                            <q-btn
                              icon="fa-solid fa-trash"
                              size="md"
                              flat
                              dense
                              color="accent"
                              @click="eliminarAccion(props)"
                            />
                          </q-td>
                        </template>
                        <!--Acciones-->
                        <template v-slot:body-cell-frecuencia="props">
                          <q-td :props="props">
                            {{ labels[props.row.frecuencia] }}
                          </q-td>
                        </template>
                      </q-table>
                    </div>
                  </div>
                </div>

                <!--Segunda col-->
                <div class="col-4">
                  <div
                    class="row justify-center text-secondary text-weight-bolder text-h5"
                  >
                    <span>CREAR ACCIÓN</span>
                  </div>
                  <!--NOmbre accion-->
                  <div class="row">
                    <div class="col q-ma-md">
                      <q-input
                        filled
                        v-model="nombreAccion"
                        label="Nombre de Acción"
                        label-color="secondary"
                        rounded
                      />
                    </div>
                  </div>
                  <!--Frecuencia-->
                  <div class="row">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Frecuencia:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-option-group
                            v-model="frecuencia"
                            :options="options"
                            color="secondary"
                            inline
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--opcion diario-->
                  <div class="row" v-if="frecuencia == '0.65'">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Repetir:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-checkbox
                            v-model="lunes"
                            label="Lunes"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="martes"
                            label="Martes"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="miercoles"
                            label="Miércoles"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="jueves"
                            label="Jueves"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="viernes"
                            label="Viernes"
                            color="secondary"
                          />
                          <q-checkbox
                            v-model="sabado"
                            label="Sábado"
                            color="secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--opcion semanal-->
                  <div class="row" v-if="frecuencia == '6.65'">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Elegir día de la semana:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-option-group
                            v-model="semanal"
                            :options="optSemanal"
                            color="secondary"
                            inline
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--opcion quincenal-->
                  <div
                    class="row"
                    v-if="
                      frecuencia == '14.65' ||
                      frecuencia == '29.65' ||
                      frecuencia == '89.65' ||
                      frecuencia == '364.65' ||
                      frecuencia == '0'
                    "
                  >
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Días de anticipación:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-input
                            v-model="anticipacion"
                            type="number"
                            filled
                            style="max-width: 95px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Inicio-->
                  <div class="row">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Inicio:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-input
                            filled
                            v-model="inicio"
                            type="date"
                            color="secondary"
                            rounded
                            label-color="secondary text-weight-bold"
                          ></q-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Nota-->
                  <div class="row">
                    <div class="col q-ma-md">
                      <q-input
                        filled
                        v-model="nota"
                        label="Nota"
                        label-color="secondary"
                        rounded
                        type="textarea"
                      />
                    </div>
                  </div>

                  <!--Manual-->
                  <div class="row">
                    <div class="col text-center">
                      <span class="text-secondary text-weight-bolder"
                        >Manual:</span
                      >
                      <div class="row">
                        <div class="col q-ma-md">
                          <q-file
                            filled
                            rounded
                            bottom-slots
                            v-model="manual"
                            label="Selecionar Archivo"
                            counter
                            label-color="secondary"
                          >
                            <template v-slot:prepend>
                              <q-icon
                                name="cloud_upload"
                                @click.stop.prevent
                                color="secondary"
                              />
                            </template>
                            <template v-slot:append>
                              <q-icon
                                name="close"
                                @click.stop.prevent="archivo = null"
                                class="cursor-pointer"
                                color="secondary"
                              />
                            </template>

                            <template v-slot:hint
                              ><span class="text-secondary">Máximo 2MB</span>
                            </template>
                          </q-file>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--Acciones de agregar / guardar lista-->
                  <div class="row justify-between">
                    <div class="col text-left q-ma-md">
                      <q-btn
                        color="positive"
                        icon="fa-solid fa-plus"
                        label="Agregar"
                        @click="agregar"
                      />
                    </div>
                    <div class="col text-right q-ma-md">
                      <q-btn
                        color="info"
                        icon="fa-solid fa-floppy-disk"
                        label="Guardar lista"
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useInicio } from "src/composables/useInicio";
import { Cookies } from "quasar";
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  components: {},

  setup() {
    //variables
    const { listas_del_dia, guardarLista, get_empleados, labels } = useInicio();
    const options = [
      {
        label: "2/Día",
        value: 0.2,
      },
      {
        label: "Diario",
        value: 0.65,
      },
      {
        label: "Semanal",
        value: 6.65,
      },
      {
        label: "Quincenal",
        value: 14.65,
      },
      {
        label: "Mensual",
        value: 29.65,
      },
      {
        label: "Trimestral",
        value: 89.65,
      },
      {
        label: "Anual",
        value: 364.65,
      },
      {
        label: "Día Específico",
        value: 0,
      },
    ];
    const optSemanal = [
      {
        label: "Lunes",
        value: "MON",
      },
      {
        label: "Martes",
        value: "TUE",
      },
      {
        label: "Miércoles",
        value: "WED",
      },
      {
        label: "Jueves",
        value: "THU",
      },
      {
        label: "Viernes",
        value: "FRI",
      },
      {
        label: "Sábado",
        value: "SAT",
      },
    ];

    const columns = [
      {
        name: "a_nombre",
        label: "Nombre",
        field: "a_nombre",
        sortable: true,
        align: "left",
      },
      {
        name: "frecuencia",
        label: "Frecuencia",
        field: "frecuencia",
        sortable: true,
        align: "left",
      },
      {
        name: "Action",
        label: "Acciones",
        field: "Action",
        sortable: true,
        align: "left",
      },
    ];

    const $q = useQuasar();

    //para guardar lista
    function confirm() {
      $q.dialog({
        title: "Guardar lista",
        message: "¿Estas seguro/a de guardar esta lista?",
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
            l_nombre: nombreChecklist.value,
            l_descripcion: descripcion.value,
            l_dueno: dueno.value.value,
            ficha_usuario: token.ficha,
            detalles: tableAcciones.value,
          };
          guardarLista(data, archivos.value);
          reseteoCompleto();
          console.log(data);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    let opcDueno = ref([]);
    let frecuencia = ref();
    let semanal = ref();
    let nombreChecklist = ref();
    let dueno = ref();
    let descripcion = ref();
    let nombreAccion = ref();
    let inicio = ref();
    let nota = ref();
    let manual = ref();
    let tableAcciones = ref([]);
    let lunes = ref(true);
    let martes = ref(true);
    let miercoles = ref(true);
    let jueves = ref(true);
    let viernes = ref(true);
    let sabado = ref(true);
    let anticipacion = ref(0);
    let token = Cookies.get("tokenAgenda");
    let archivos = ref([]);

    //funciones
    onMounted(() => {
      listas_del_dia();
    });

    //obtener empleados asignados
    get_empleados().then((response) => {
      console.log(response);
      for (let key in response) {
        opcDueno.value.push({
          label: response[key].NOMBRE,
          value: response[key].FICHA,
        });
      }
    });

    //agregar accion a la tabla
    const agregar = () => {
      if (nombreAccion.value == null) {
        $q.notify({
          type: "negative",
          position: "top",
          message: "Nombre de la ACCIÓN es necesario.",
        });
      } else {
        let a_dia_rep = null;
        if (frecuencia.value == "0.65") {
          if (lunes.value) {
            if (a_dia_rep == null) {
              a_dia_rep = "MON";
            } else {
              a_dia_rep = a_dia_rep + "," + "MON";
            }
          }
          if (martes.value) {
            if (a_dia_rep == null) {
              a_dia_rep = "TUE";
            } else {
              a_dia_rep = a_dia_rep + "," + "TUE";
            }
          }
          if (miercoles.value) {
            if (a_dia_rep == null) {
              a_dia_rep = "WED";
            } else {
              a_dia_rep = a_dia_rep + "," + "WED";
            }
          }
          if (jueves.value) {
            if (a_dia_rep == null) {
              a_dia_rep = "THU";
            } else {
              a_dia_rep = a_dia_rep + "," + "THU";
            }
          }
          if (viernes.value) {
            console.log("entre viernes");
            if (a_dia_rep == null) {
              a_dia_rep = "FRI";
            } else {
              a_dia_rep = a_dia_rep + "," + "FRI";
            }
          }
          if (sabado.value) {
            if (a_dia_rep == null) {
              a_dia_rep = "SAT";
            } else {
              a_dia_rep = a_dia_rep + "," + "SAT";
            }
          }
        } else if (frecuencia.value == "6.65") {
          a_dia_rep = semanal.value;
        }

        archivos.value.push({ file: manual.value });
        tableAcciones.value.push({
          a_nombre: nombreAccion.value,
          a_freq: frecuencia.value,
          a_text: nota.value,
          a_dia_rep: a_dia_rep,
          a_dia_ant: anticipacion.value,
          a_fecha: inicio.value,
          frecuencia: frecuencia.value,
          id_manual: archivos.value.length - 1,
        });
        console.log(archivos.value);
        console.log(tableAcciones.value);
        reseteo();
      }
    };

    //resetear variables
    const reseteo = () => {
      nombreAccion.value = null;
      frecuencia.value = null;
      semanal.value = null;
      lunes.value = false;
      martes.value = false;
      miercoles.value = false;
      jueves.value = false;
      viernes.value = false;
      sabado.value = false;
      nota.value = "";
      anticipacion.value = 0;
      inicio.value = null;
      manual.value = null;
    };

    const reseteoCompleto = () => {
      nombreAccion.value = null;
      frecuencia.value = null;
      semanal.value = null;
      lunes.value = false;
      martes.value = false;
      miercoles.value = false;
      jueves.value = false;
      viernes.value = false;
      sabado.value = false;
      nota.value = "";
      anticipacion.value = 0;
      inicio.value = null;
      manual.value = null;
      nombreChecklist.value = "";
      dueno.value = null;
      descripcion.value = "";
      tableAcciones.value = [];
    };

    //Para eliminar una accion
    function eliminarAccion(data) {
      $q.dialog({
        title: "Eliminar acción",
        message: "¿Estas seguro/a de eliminar esta acción?",
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
          tableAcciones.value.splice(data.pageIndex, 1);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    watch(anticipacion, () => {
      if (anticipacion.value > 5) {
        anticipacion.value = 5;
      }
      if (anticipacion.value < 0) {
        anticipacion.value = 0;
      }
    });

    return {
      //variables
      options,
      frecuencia,
      nombreChecklist,
      dueno,
      descripcion,
      nombreAccion,
      inicio,
      nota,
      manual,
      tableAcciones,
      lunes,
      martes,
      miercoles,
      jueves,
      viernes,
      sabado,
      optSemanal,
      semanal,
      anticipacion,
      columns,
      opcDueno,
      labels,
      //funciones
      agregar,
      eliminarAccion,
      confirm,
    };
  },
};
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>