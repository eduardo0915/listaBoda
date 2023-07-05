
<template>
  <q-page class="q-pa-sm">
    <q-breadcrumbs active-color="secondary" class="q-mt-sm q-ml-lg">
      <q-breadcrumbs-el label="Inicio" icon="home" to="/Inicio'" />
      <q-breadcrumbs-el
        label="Administrar listas"
        icon="fa-solid fa-list-check"
        to="/administrar"
      />
      <q-breadcrumbs-el label="Editar lista" icon="fa-solid fa-pen-to-square" />
    </q-breadcrumbs>
    <q-card class="q-ma-md bg-grey-1">
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
                    <span>EDITAR LISTA</span>
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
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'El Nombre del Checklist es obligatorio',
                        ]"
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
                        :pagination="{ rowsPerPage: 100 }"
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
                              @click="
                                eliminarAccion(props, props.row.id_accion)
                              "
                            />
                            <q-btn
                              icon="fa-solid fa-pen-to-square"
                              size="md"
                              flat
                              dense
                              color="info"
                              @click="editarAccion(props.row)"
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
                  <div
                    class="row"
                    v-if="frecuencia == '0.65' || frecuencia == 0.65"
                  >
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
                  <div
                    class="row"
                    v-if="frecuencia == '6.65' || frecuencia == 6.65"
                  >
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
import { ref, watch } from "vue";
import { useInicio } from "src/composables/useInicio";
import { Cookies, date } from "quasar";
import useQuasar from "quasar/src/composables/use-quasar.js";
import { useRoute } from "vue-router";
export default {
  components: {},

  setup() {
    //variables
    const { visualizar_list, get_empleados, editarLista, labels } = useInicio();
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

    const route = useRoute();
    let data = route.params["data"];
    console.log(data);
    const $q = useQuasar();

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
    let lunes = ref(false);
    let martes = ref(false);
    let miercoles = ref(false);
    let jueves = ref(false);
    let viernes = ref(false);
    let sabado = ref(false);
    let anticipacion = ref(0);
    let ficha = ref();
    let token = Cookies.get("tokenAgenda");
    let listEliminar = ref([]);
    let isEditar = ref(null);
    let nomArchivo = ref();

    //funciones

    //cargar lista
    visualizar_list(data).then((response) => {
      nombreChecklist.value = response.nombre;
      descripcion.value = response.nota;
      ficha.value = response.dueno;

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
      obtener_emp();
    });

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
          let data1 = {
            l_nombre: nombreChecklist.value,
            l_descripcion: descripcion.value,
            l_dueno: dueno.value.value,
            ficha_usuario: token.ficha,
            detalles: tableAcciones.value,
            to_delete: listEliminar.value,
            id_list: data,
          };
          editarLista(data1, manual.value);
          console.log(data1);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    //obtener empleados asignados
    const obtener_emp = () => {
      opcDueno.value = [];
      get_empleados().then((response) => {
        console.log(response);
        for (let key in response) {
          opcDueno.value.push({
            label: response[key].NOMBRE,
            value: response[key].FICHA,
          });
          if (response[key].FICHA == ficha.value) {
            dueno.value = {
              label: response[key].NOMBRE,
              value: ficha.value,
            };
          }
        }
      });
    };

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

        if (isEditar.value != null) {
          console.log(a_dia_rep);
          console.log(viernes.value);
          const index = tableAcciones.value.findIndex(
            (accion) => accion.id_accion == isEditar.value
          );

          if (index !== -1) {
            // se encontró el objeto que se desea editar
            tableAcciones.value[index].a_nombre = nombreAccion.value;
            tableAcciones.value[index].a_freq = frecuencia.value;
            tableAcciones.value[index].a_text = nota.value;
            tableAcciones.value[index].archivo = nomArchivo.value;
            tableAcciones.value[index].a_dia_rep = a_dia_rep;
            tableAcciones.value[index].a_dia_ant = anticipacion.value;
            tableAcciones.value[index].a_fecha = inicio.value;
            tableAcciones.value[index].frecuencia = frecuencia.value;
            tableAcciones.value[index].a_es_edit = isEditar.value;
          } else {
            $q.notify({
              type: "negative",
              position: "top",
              message: "No existe una accion con ese id para editar",
            });
          }
        } else {
          // se agrega un nuevo objeto si no existe
          tableAcciones.value.push({
            a_nombre: nombreAccion.value,
            a_freq: frecuencia.value,
            a_text: nota.value,
            a_dia_rep: a_dia_rep,
            a_dia_ant: anticipacion.value,
            a_fecha: inicio.value,
            frecuencia: frecuencia.value,
            id_accion: null,
          });
        }

        reseteo();
        console.log(tableAcciones.value);
      }
    };

    //editar accionnes
    const editarAccion = (prop) => {
      //resetea todas las variables de accion antes de comenzar a asignar sus valores
      reseteo();

      //verificar que la accion a editar tenda un id
      if (prop.id_accion != null) {
        isEditar.value = prop.id_accion;
      } else {
        isEditar = null;
      }

      //separa los dias a repetir la accion con coma y loas asigna a una variable
      let repetir = prop.a_dia_rep == null ? [] : prop.a_dia_rep.split(",");
      let fechaConvertida = null;

      //convierte la fecha en un formatoque el input pueda aceptar
      if (prop.a_fecha != null && /^\d{2}\/\d{2}\/\d{4}$/.test(prop.a_fecha)) {
        let fechaOriginal = prop.a_fecha;
        let partesFecha = fechaOriginal.split("/");
        fechaConvertida =
          partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
      } else {
        fechaConvertida = prop.a_fecha;
      }

      //activar los dias que se va a repetir la accion
      if (prop.a_freq == ".65" || prop.a_freq == "0.65") {
        for (let key in repetir) {
          console.log(repetir[key]);
          if (repetir[key] == "MON") {
            console.log("entre");
            lunes.value = true;
          }
          if (repetir[key] == "TUE") {
            martes.value = true;
          }
          if (repetir[key] == "WED") {
            miercoles.value = true;
          }
          if (repetir[key] == "THU") {
            jueves.value = true;
          }
          if (repetir[key] == "FRI") {
            viernes.value = true;
          }
          if (repetir[key] == "SAT") {
            sabado.value = true;
          }
        }
      } else if (prop.a_freq == "6.65") {
        if (repetir.length == 1) {
          semanal.value = repetir[0];
          semanal.value = repetir[0];
        }
      }

      //activar la Frecuencia
      switch (prop.a_freq) {
        case "0":
        case 0:
          frecuencia.value = parseFloat(prop.a_freq);
          break;
        case "0.2":
        case 0.2:
        case ".2":
          frecuencia.value = parseFloat(prop.a_freq);
          break;
        case "0.65":
        case 0.65:
        case ".65":
          frecuencia.value = parseFloat(prop.a_freq);
          break;
        case "6.65":
        case 6.65:
        case "14.65":
        case 14.65:
        case "29.65":
        case 29.65:
        case "89.65":
        case 89.65:
        case "364.65":
        case 364.65:
          frecuencia.value = parseFloat(prop.a_freq);
          break;
        default:
          break;
      }

      //asigna los valores correspondiente a cada variable a editar
      nombreAccion.value = prop.a_nombre;
      inicio.value = fechaConvertida;
      anticipacion.value = prop.a_dia_ant;
      nota.value = prop.a_text;
      nomArchivo.value = prop.archivo;
    };

    //Para eliminar una accion
    function eliminarAccion(data, id) {
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
          if (id != null) {
            listEliminar.value.push(id);
          }
          console.log(listEliminar.value);
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

    //resetear variables
    const reseteo = () => {
      nombreAccion.value = "";
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
      nomArchivo.value = null;
    };
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
      editarAccion,
    };
  },
};
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>