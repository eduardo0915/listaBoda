
<template>
  <q-page class="q-pa-sm">
    <q-card class="q-ma-md bg-grey-1">
      <!--Titulo-->
      <q-card-section class="text-center">
        <span class="text-h4 text-secondary text-weight-bolder">
          Editar lista</span
        ></q-card-section
      >
      <q-card-section>
        <q-card class="bg-grey-2">
          <q-stepper
            v-model="step"
            vertical
            active-color="secondary"
            done-color="positive"
            animated
          >
            <!--Datos de la novia-->
            <q-step
              :name="1"
              title="Datos de la Novia"
              icon="create_new_folder"
              :done="step > 1"
            >
              <q-card class="bg-grey-2">
                <div class="col-12 text-center">
                  <span class="text-secondary text-weight-bolder text-h6"
                    >Datos de la novia</span
                  >
                </div>
                <div class="col-12">
                  <div class="row">
                    <!--nombre novia-->
                    <div class="col-7">
                      <q-input
                        filled
                        v-model="nombreNovia"
                        label="Nombre "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                    <!--cedula-->
                    <div class="col-5">
                      <q-input
                        filled
                        v-model="cedula"
                        label="Cedula"
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        type="text"
                        maxlength="13"
                      />
                    </div>
                  </div>
                  <!--Direccion novia-->
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        filled
                        v-model="direcionNovia"
                        label="Dirección "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <!--Telefono novia-->
                    <div class="col-4">
                      <q-input
                        filled
                        v-model="telefonoNovia"
                        label="Teléfono "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        maxlength="12"
                      />
                    </div>
                    <!--Celular novia-->
                    <div class="col-4">
                      <q-input
                        filled
                        v-model="celularNovia"
                        label="Celular "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        maxlength="12"
                      />
                    </div>
                    <!--Email novia-->
                    <div class="col-4">
                      <q-input
                        filled
                        v-model="emailNovia"
                        label="Email "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                  </div>
                </div>
              </q-card>
              <q-stepper-navigation>
                <q-btn
                  @click="verificarModulo(step)"
                  color="secondary"
                  label="Continuar"
                />
              </q-stepper-navigation>
            </q-step>

            <!--Datos del novio-->
            <q-step
              :name="2"
              title="Datos del novio"
              icon="fa-solid fa-user-pen"
              :done="step > 2"
            >
              <q-card class="bg-grey-2">
                <div class="col-12 text-center">
                  <span class="text-secondary text-weight-bolder text-h6"
                    >Datos del novio</span
                  >
                </div>
                <div class="col-12">
                  <div class="row">
                    <!--nombre novia-->
                    <div class="col-7">
                      <q-input
                        filled
                        v-model="nombreNovio"
                        label="Nombre "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                    <!--cedula-->
                    <div class="col-5">
                      <q-input
                        filled
                        v-model="cedulaNovio"
                        label="Cedula"
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        type="text"
                        maxlength="13"
                      />
                    </div>
                  </div>
                  <!--Direccion novio-->
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        filled
                        v-model="direcionNovio"
                        label="Dirección "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <!--Telefono novio-->
                    <div class="col-4">
                      <q-input
                        filled
                        v-model="telefonoNovio"
                        label="Teléfono "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        maxlength="12"
                      />
                    </div>
                    <!--Celular novio-->
                    <div class="col-4">
                      <q-input
                        filled
                        v-model="celularNovio"
                        label="Celular "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        maxlength="12"
                      />
                    </div>
                    <!--Email novio-->
                    <div class="col-4">
                      <q-input
                        filled
                        v-model="emailNovio"
                        label="Email "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                  </div>
                </div>
              </q-card>

              <q-stepper-navigation>
                <q-btn
                  @click="verificarModulo(step)"
                  color="secondary"
                  label="Continuar"
                />
                <q-btn
                  flat
                  @click="step = 1"
                  color="secondary"
                  label="Atras"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
            <!--Datos de la Boda-->
            <q-step
              :name="3"
              title="Datos de la Boda"
              icon="fa-solid fa-user-group"
              :done="step > 3"
            >
              <q-card class="bg-grey-2">
                <div class="col-12 text-center">
                  <span class="text-secondary text-weight-bolder text-h6"
                    >Datos de la Boda</span
                  >
                </div>
                <div class="col-12">
                  <!--Dirección de los Regalos-->
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        filled
                        v-model="direcionRegalos"
                        label="Dirección de los Regalos "
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <!--Lugar de la Celebración-->
                    <div class="col-10">
                      <q-input
                        filled
                        v-model="lugarCelebracion"
                        label="Lugar de la Celebración"
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                      />
                    </div>
                    <!--Número de Invitaciones-->
                    <div class="col-2">
                      <q-input
                        filled
                        v-model="numeroInvitaciones"
                        label="Número de Invitaciones"
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <!--Fecha Boda-->
                    <div class="col-6">
                      <span class="text-secondary text-weight-bolder q-ml-lg"
                        >Fecha Boda:</span
                      >
                      <q-input
                        filled
                        v-model="fechaBoda"
                        type="date"
                        color="secondary"
                        rounded
                        label-color="secondary text-weight-bold"
                        class="q-ma-md"
                      ></q-input>
                    </div>
                    <!--Fecha envio de Invitaciones-->
                    <div class="col-6">
                      <span class="text-secondary text-weight-bolder q-ml-lg"
                        >Fecha envio de Invitaciones:</span
                      >
                      <q-input
                        filled
                        v-model="fechaInvitaciones"
                        type="date"
                        color="secondary"
                        rounded
                        label-color="secondary text-weight-bold"
                        class="q-ma-md"
                      ></q-input>
                    </div>
                  </div>
                  <!--Nota-->
                  <div class="row">
                    <!--nota-->
                    <div class="col-12">
                      <q-input
                        filled
                        v-model="nota"
                        label="Nota"
                        label-color="secondary"
                        rounded
                        class="q-ma-md"
                        type="textarea"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <q-checkbox
                        left-label
                        v-model="enviar"
                        label="¿Para Enviar? "
                        color="positive"
                        class="text-weight-bolder text-secondary q-ma-md"
                      />
                      <q-checkbox
                        left-label
                        v-model="imprimirLista"
                        label="Imprimir Lista"
                        color="positive"
                        class="text-weight-bolder text-secondary q-ma-md"
                      />
                      <q-checkbox
                        left-label
                        v-model="enviarEmail"
                        label="Enviar Lista por Email"
                        color="positive"
                        class="text-weight-bolder text-secondary q-ma-md"
                      />
                    </div>
                  </div>
                </div>
              </q-card>

              <q-stepper-navigation>
                <q-btn
                  @click="verificarModulo(step)"
                  color="secondary"
                  label="Continuar"
                />
                <q-btn
                  flat
                  @click="step = 2"
                  color="secondary"
                  label="Atras"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <!--Lista de regalos-->
            <q-step
              :name="4"
              title=" Lista de Regalos"
              icon="fa-solid fa-gifts"
            >
              <q-card class="bg-secondary">
                <q-card-section>
                  <q-card class="bg-grey-2">
                    <q-card-section class="text-center">
                      <span
                        class="text-h3 text-secondary text-weight-bold"
                        style="font-family: Great Vibes"
                        >Lista de Regalos</span
                      >
                    </q-card-section>
                    <!--entrada codigo-->
                    <q-card-section>
                      <div class="row q-ml-md">
                        <div class="col-2"></div>
                        <div class="col-8">
                          <span>
                            <q-input
                              filled
                              v-model="codigo"
                              label="Codigo del producto"
                              label-color="secondary"
                              rounded
                              maxlength="10"
                            >
                              <template v-slot:prepend>
                                <q-icon
                                  name="fa-solid fa-store"
                                  style="color: #20145f"
                                />
                              </template> </q-input
                          ></span>
                        </div>
                        <div class="col-2"></div>
                      </div>
                    </q-card-section>

                    <q-card-section>
                      <div class="row">
                        <div class="col-12">
                          <q-table
                            :rows="listaProducto"
                            :columns="columns"
                            bordered
                            no-data-label="No se encontraron consumos en transito."
                            no-results-label="El filtro no encontro ningún resultado."
                            rows-per-page-label="Registros por página"
                            responsive
                            :pagination="{ rowsPerPage: 7 }"
                            class="table-bg-detalle"
                            table-class="text-black"
                            table-header-class="text-white"
                            separator="cell"
                            style="height: 100%"
                          >
                            <!--buscado no data-->
                            <template v-slot:no-data="{ message }">
                              <div
                                class="full-width row text-indigo-5 text-weight-medium"
                              >
                                <q-icon
                                  size="2em"
                                  name="fa-solid fa-money-bill-wheat"
                                  class="q-mr-xs"
                                />
                                <span style="font-size: 18px"
                                  >{{ message }}
                                </span>
                              </div>
                            </template>
                            <!--Celda de imagen-->
                            <template v-slot:body-cell-IMAGEN="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section avatar>
                                    <q-img
                                      @click="eliminarProducto(props.row.data)"
                                      style="width: 50px"
                                      :src="
                                        props.row.data.imagen == null
                                          ? 'nopic.jpg'
                                          : props.row.data.imagen
                                      "
                                      alt=""
                                      class="cursosr-pointer"
                                    />
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de codigo-->
                            <template v-slot:body-cell-FAMILIA="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      {{ props.row.data.codigo }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de DESCRIPCION-->
                            <template v-slot:body-cell-DESCRIPCION="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      {{ props.row.data.descripcion }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de REFERENCIA-->
                            <template v-slot:body-cell-REFERENCIA="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      {{ props.row.data.referencia }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de MARCA-->
                            <template v-slot:body-cell-MARCA="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      {{ props.row.data.marca }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de ALMACEN-->
                            <template v-slot:body-cell-ALMACEN="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      {{ props.row.data.almacen }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de CANTIDADCOMPRADA-->
                            <template v-slot:body-cell-CANTIDADCOMPRADA="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <div class="col text-right">
                                      <button
                                        class="buttonCantidad text-white"
                                        @click="
                                          setRestar(
                                            props.row.data,
                                            props.row.cantidad
                                          )
                                        "
                                      >
                                        -
                                      </button>
                                      <input
                                        type="number"
                                        min="0"
                                        :value="
                                          getCantidadProductoReg(
                                            props.row.data.codigo
                                          )
                                        "
                                      />
                                      <button
                                        class="buttonCantidad text-white"
                                        @click="setSumar(props.row.data)"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de UNIDAD-->
                            <template v-slot:body-cell-UNIDAD="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      {{ props.row.data.unidad }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de PRECIO-->
                            <template v-slot:body-cell-PRECIO="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      RD${{
                                        parseFloat(props.row.data.precio)
                                          .toFixed(2)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                      }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de Importe-->
                            <template v-slot:body-cell-Importe="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <span>
                                      RD${{
                                        (
                                          parseInt(props.row.cantidad) *
                                          parseFloat(props.row.data.precio)
                                        )
                                          .toFixed(2)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                      }}
                                    </span>
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <!--Celda de acciones-->
                            <template v-slot:body-cell-acciones="props">
                              <q-td :props="props">
                                <q-item>
                                  <q-item-section>
                                    <q-btn
                                      color="negative"
                                      icon="fa-solid fa-trash"
                                      @click="eliminarProducto(props.row.data)"
                                      dense
                                      flat
                                    />
                                  </q-item-section>
                                </q-item>
                              </q-td>
                            </template>
                            <template v-slot:loading>
                              <q-inner-loading showing color="secondary" />
                            </template>
                          </q-table>
                        </div>
                      </div>

                      <!--Total de la lista precio total-->
                      <q-item>
                        <q-item-section>
                          <q-item-label>
                            <div class="row text-right">
                              <div class="col-12">
                                <span class="text-h4"
                                  >Total: RD${{ totalRegalos }}</span
                                >
                              </div>
                            </div>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-card-section>
                  </q-card>
                </q-card-section>
              </q-card>

              <q-stepper-navigation>
                <q-btn
                  color="secondary"
                  label="Guardar"
                  @click="guardarLista"
                />
                <q-btn
                  flat
                  @click="step = 3"
                  color="secondary"
                  label="Atras"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card>
      </q-card-section>
    </q-card>
    <modal-card-producto v-if="openCardProducto"></modal-card-producto>
  </q-page>
</template>

<script>
import { defineAsyncComponent, ref, onMounted, watch, nextTick } from "vue";
import { useInicio } from "src/composables/useInicio";
import modalCardProducto from "src/components/listaBoda/modalCardProducto.vue";
import { Cookies } from "quasar";
import { useRoute } from "vue-router";

export default {
  components: {
    TableDarkMode: defineAsyncComponent(() =>
      import("components/tables/TableDarkMode")
    ),
    modalCardProducto,
  },

  setup() {
    const {
      buscar_articulo,
      openCardProducto,
      listaProducto,
      setRestarProductoReg,
      setSumarProductoReg,
      getCantidadProductoReg,
      totalRegalos,
      inicioStore,
      $q,
      editarListaRegalo,
      eliminarProductoReg,
      actualizarListaRegalo,
      cargarArticuloBarra,
    } = useInicio();
    const step = ref(1);
    const route = useRoute();
    let data = JSON.parse(route.params["data"]);

    let token = Cookies.get("tokenListaBoda");

    const columns = [
      {
        name: "IMAGEN",
        required: true,
        label: "Imagen",
        align: "left",
        field: (row) => row.IMAGEN,
        sortable: true,
      },
      {
        name: "FAMILIA",
        required: true,
        label: "Código",
        align: "center",
        field: (row) => row.FAMILIA,
        sortable: true,
      },
      {
        name: "DESCRIPCION",
        align: "center",
        label: "Descripción",
        field: "DESCRIPCION",
        sortable: true,
      },
      {
        name: "REFERENCIA",
        align: "center",
        label: "Referencia",
        field: "REFERENCIA",
        sortable: true,
      },
      {
        name: "MARCA",
        align: "center",
        label: "Marca",
        field: "MARCA",
        sortable: true,
      },
      {
        name: "ALMACEN",
        align: "center",
        label: "Alm.",
        field: "ALMACEN",
        sortable: true,
      },
      {
        name: "CANTIDADCOMPRADA",
        align: "center",
        label: "Cant.",
        field: "SERIE",
        sortable: true,
      },
      {
        name: "UNIDAD",
        align: "center",
        label: "Unidad",
        field: "UNIDAD",
        sortable: true,
      },
      {
        name: "PRECIO",
        align: "center",
        label: "Precio",
        field: "PRECIO",
        sortable: true,
      },

      {
        name: "Importe",
        align: "center",
        label: "Importe",
        field: "Importe",
        sortable: true,
      },
      {
        name: "acciones",
        align: "center",
        field: "acciones",
        sortable: true,
      },
    ];

    //datos de la novia
    let cedula = ref();
    let telefonoNovia = ref();
    let celularNovia = ref();
    let emailNovia = ref();
    let nombreNovia = ref();
    let direcionNovia = ref();
    //datos del novio
    let cedulaNovio = ref();
    let telefonoNovio = ref();
    let celularNovio = ref();
    let emailNovio = ref();
    let nombreNovio = ref();
    let direcionNovio = ref();
    //datos de la boda
    let enviar = ref(false);
    let enviarEmail = ref(false);
    let imprimirLista = ref(false);
    let direcionRegalos = ref();
    let lugarCelebracion = ref();
    let numeroInvitaciones = ref();
    let fechaBoda = ref();
    let fechaInvitaciones = ref();
    let nota = ref();
    //lista de regalos
    let codigo = ref();
    let codigoBarra = ref("");
    let barcode = ref(false);
    let tempInput = null;

    function formatearCedula(SERIE_NOVIO, CEDULA_NOVIO, DIGITO_NOVIO) {
      // Verificar si los parámetros son null o están en blanco
      if (
        SERIE_NOVIO === null ||
        SERIE_NOVIO.trim() === "" ||
        CEDULA_NOVIO === null ||
        CEDULA_NOVIO.trim() === "" ||
        DIGITO_NOVIO === null ||
        DIGITO_NOVIO.trim() === ""
      ) {
        return null; // Devolver null si algún parámetro es inválido
      }

      // Unir los parámetros con un guion
      const cadenaFormateada = `${SERIE_NOVIO}-${CEDULA_NOVIO}-${DIGITO_NOVIO}`;
      return cadenaFormateada;
    }

    function clasificarTelefonos(arr) {
      // Verificar si el arreglo está vacío
      if (arr.length === 0) {
        return {
          TELNOVIA: null,
          CELNOVIA: null,
          TELNOVIO: null,
          CELNOVIO: null,
        };
      }

      // Variables para almacenar los teléfonos y celulares
      let telNovia = null;
      let celNovia = null;
      let telNovio = null;
      let celNovio = null;

      // Iterar sobre cada objeto del arreglo
      arr.forEach((obj) => {
        const sexo = obj.SEXO;
        const tpTelefono = obj.TP_TELEFONO;
        const areaTel = obj.AREA_TEL;
        const perfilTel = obj.PERFIL_TEL;
        const numTel = obj.NUM_TEL;

        // Verificar las condiciones para clasificar los teléfonos y celulares
        if (sexo === "F" && tpTelefono === "1") {
          telNovia = `${areaTel}-${perfilTel}-${numTel}`;
        } else if (sexo === "F" && tpTelefono === "2") {
          celNovia = `${areaTel}-${perfilTel}-${numTel}`;
        } else if (sexo === "M" && tpTelefono === "1") {
          telNovio = `${areaTel}-${perfilTel}-${numTel}`;
        } else if (sexo === "M" && tpTelefono === "2") {
          celNovio = `${areaTel}-${perfilTel}-${numTel}`;
        }
      });

      // Crear el objeto de resultado
      const resultado = {
        TELNOVIA: telNovia,
        CELNOVIA: celNovia,
        TELNOVIO: telNovio,
        CELNOVIO: celNovio,
      };

      // Verificar si falta algún teléfono o celular y asignar null en caso afirmativo
      if (!telNovia) resultado.CELNOVIA = null;
      if (!celNovia) resultado.TELNOVIA = null;
      if (!telNovio) resultado.CELNOVIO = null;
      if (!celNovio) resultado.TELNOVIO = null;

      return resultado;
    }

    const { parse, isValid, format } = require("date-fns");

    function convertirFecha(fecha) {
      // Verificar el formato de la fecha
      if (isValid(parse(fecha, "dd/MM/yyyy", new Date()))) {
        // Si el formato no es válido, convertirlo al formato deseado
        fecha = format(parse(fecha, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
      }

      console.log(fecha);
      return fecha;
    }

    /* Keyboard.addListener("keyboardWillShow", (info) => {
      if (barcode.value) {
        //Keyboard.hide();
      }
    });
 */
    /*  function handleOutsideClick(event) {
      $q.notify({
        type: "negative",
        position: "top",
        message: "1",
      });
      const targetElement = event.target;
      const inputElement = document.querySelector('input[type="text"]');
      const isInputClicked =
        inputElement && inputElement.contains(targetElement);

      if (!isInputClicked && step.value == 4) {
        $q.notify({
          type: "negative",
          position: "top",
          message: "2",
        });
        // El clic ocurrió fuera del input, volver a establecer el foco
        barcode.value = false;
        toggleBarcode();
      } else {
        $q.notify({
          type: "negative",
          position: "top",
          message: "3",
        });
        barcode.value = false;
      }
    } */
    /*   function handleKeyboardEvent(info) {
      // Verifica si la entrada de texto proviene del escáner
      if (info && info.isHardwareKeyboard) {
        // Aquí puedes procesar la entrada de texto del escáner
        console.log("Entrada de texto del escáner:", info.text);
      }
    }

    function listenForScannerInput() {
      // Aquí puedes mantener el escucha activo para recibir la entrada de texto del escáner
      Keyboard.addListener("keyboardDidHide", handleScannerInput);
    }

    function handleScannerInput(info) {
      // Procesa la entrada de texto del escáner
      console.log("Entrada de texto del escáner:", info.text);
    } */
    //carga inicial
    onMounted(() => {
      if ($q.platform.is.nativeMobile && $q.platform.is.android) {
        document.addEventListener("keydown", handleKeyDown);
      }

      // document.body.addEventListener("click", handleOutsideClick);
      // listenForScannerInput();
      console.log(data);
      editarListaRegalo({
        id_lista: data.sec_lista,
        id_dependencia: data.depid,
      }).then((response) => {
        console.log(response);
        const encabezado = response.encabezado;
        const detalle = response.detalle;
        const telefonos = clasificarTelefonos(response.telefonos);
        console.log(telefonos);
        //datos de la novia
        nombreNovia.value = encabezado.NOMBRE_NOVIA;
        emailNovia.value = encabezado.EMAIL_NOVIA;
        direcionNovia.value = encabezado.DIRECCION_NOVIA;
        cedula.value = formatearCedula(
          encabezado.SERIE_NOVIA,
          encabezado.CEDULA_NOVIA,
          encabezado.DIGITO_NOVIA
        );
        telefonoNovia.value = telefonos.TELNOVIA;
        celularNovia.value = telefonos.CELNOVIA;
        //datos de la novio
        nombreNovio.value = encabezado.NOMBRE_NOVIO;
        emailNovio.value = encabezado.EMAIL_NOVIO;
        direcionNovio.value = encabezado.DIRECCION_NOVIO;
        cedulaNovio.value = formatearCedula(
          encabezado.SERIE_NOVIO,
          encabezado.CEDULA_NOVIO,
          encabezado.DIGITO_NOVIO
        );
        telefonoNovio.value = telefonos.TELNOVIO;
        celularNovio.value = telefonos.CELNOVIO;
        //datos de la boda
        direcionRegalos.value = encabezado.DIRECCION_REGALOS;
        lugarCelebracion.value = encabezado.LUGAR_CEREMONIDA;
        numeroInvitaciones.value = encabezado.NO_INVITACIONES;
        fechaBoda.value = convertirFecha(encabezado.FECHA_BODA);
        fechaInvitaciones.value = convertirFecha(encabezado.FECH_INVITACIONES);
        nota.value = encabezado.NOTA;
        enviar.value = encabezado.PENVIAR == "N" ? false : true;
        //datos del productoa
        let listaProductosReg = [];
        detalle.forEach((producto) => {
          listaProductosReg.push({
            cantidad: producto.CANTIDAD,
            data: {
              codigo:
                producto.FAMILIA +
                "-" +
                producto.DIVISION +
                "-" +
                producto.SECUENCIA,
              imagen: producto.BASE64,
              almacen: producto.ALMACEN,
              precio: producto.PRECIOTOTAL_RAW,
              descripcion: producto.DESCRIPCION,
              referencia: producto.REFERENCIA,
              marca: producto.MARCA,
              unidad: producto.UNIDAD,
              precio_raw: producto.PRECIOTOTAL_RAW,
              agregar: false,
            },
          });
        });
        console.log(listaProductosReg);
        inicioStore.setProductosListaReg(listaProductosReg);
      });
    });

    /*    onBeforeUnmount(() => {
      document.body.removeEventListener("click", handleOutsideClick);
    }); */
    watch(cedula, (newVal) => {
      if (newVal === null) {
        return; // No hacer nada si cedula es null
      }
      console.log(newVal);
      // Eliminar los guiones existentes y cualquier carácter no numérico
      const cedulaNumerica = newVal.replace(/-/g, "").replace(/\D/g, "");

      // Insertar el primer guion después de los primeros 3 dígitos
      if (cedulaNumerica.length > 3) {
        cedula.value =
          cedulaNumerica.slice(0, 3) + "-" + cedulaNumerica.slice(3);
      } else {
        cedula.value = cedulaNumerica;
      }

      // Insertar el segundo guion después de los siguientes 7 dígitos teniendo en cuenta el guion existente
      if (cedula.value.length > 10) {
        cedula.value = cedula.value.slice(0, 11) + "-" + cedula.value.slice(11);
      }
    });

    watch(telefonoNovia, (newVal) => {
      console.log(newVal);
      // Eliminar los guiones existentes y cualquier carácter no numérico
      const telefonoNumerica = newVal.replace(/-/g, "").replace(/\D/g, "");

      // Insertar el primer guion después de los primeros 3 dígitos
      if (telefonoNumerica.length > 3) {
        telefonoNovia.value =
          telefonoNumerica.slice(0, 3) + "-" + telefonoNumerica.slice(3);
      } else {
        telefonoNovia.value = telefonoNumerica;
      }

      // Insertar el segundo guion después de los siguientes 6 dígitos
      if (telefonoNovia.value.length > 7) {
        telefonoNovia.value =
          telefonoNovia.value.slice(0, 7) + "-" + telefonoNovia.value.slice(7);
      }
    });

    watch(celularNovia, (newVal) => {
      console.log(newVal);
      // Eliminar los guiones existentes y cualquier carácter no numérico
      const telefonoNumerica = newVal.replace(/-/g, "").replace(/\D/g, "");

      // Insertar el primer guion después de los primeros 3 dígitos
      if (telefonoNumerica.length > 3) {
        celularNovia.value =
          telefonoNumerica.slice(0, 3) + "-" + telefonoNumerica.slice(3);
      } else {
        celularNovia.value = telefonoNumerica;
      }

      // Insertar el segundo guion después de los siguientes 6 dígitos
      if (celularNovia.value.length > 7) {
        celularNovia.value =
          celularNovia.value.slice(0, 7) + "-" + celularNovia.value.slice(7);
      }
    });

    watch(cedulaNovio, (newVal) => {
      console.log(newVal);
      // Eliminar los guiones existentes y cualquier carácter no numérico
      const cedulaNumerica = newVal.replace(/-/g, "").replace(/\D/g, "");

      // Insertar el primer guion después de los primeros 3 dígitos
      if (cedulaNumerica.length > 3) {
        cedulaNovio.value =
          cedulaNumerica.slice(0, 3) + "-" + cedulaNumerica.slice(3);
      } else {
        cedulaNovio.value = cedulaNumerica;
      }

      // Insertar el segundo guion después de los siguientes 7 dígitos teniendo en cuenta el guion existente
      if (cedulaNovio.value.length > 10) {
        cedulaNovio.value =
          cedulaNovio.value.slice(0, 11) + "-" + cedulaNovio.value.slice(11);
      }
    });

    watch(telefonoNovio, (newVal) => {
      console.log(newVal);
      // Eliminar los guiones existentes y cualquier carácter no numérico
      const telefonoNumerica = newVal.replace(/-/g, "").replace(/\D/g, "");

      // Insertar el primer guion después de los primeros 3 dígitos
      if (telefonoNumerica.length > 3) {
        telefonoNovio.value =
          telefonoNumerica.slice(0, 3) + "-" + telefonoNumerica.slice(3);
      } else {
        telefonoNovio.value = telefonoNumerica;
      }

      // Insertar el segundo guion después de los siguientes 6 dígitos
      if (telefonoNovio.value.length > 7) {
        telefonoNovio.value =
          telefonoNovio.value.slice(0, 7) + "-" + telefonoNovio.value.slice(7);
      }
    });

    watch(celularNovio, (newVal) => {
      console.log(newVal);
      // Eliminar los guiones existentes y cualquier carácter no numérico
      const telefonoNumerica = newVal.replace(/-/g, "").replace(/\D/g, "");

      // Insertar el primer guion después de los primeros 3 dígitos
      if (telefonoNumerica.length > 3) {
        celularNovio.value =
          telefonoNumerica.slice(0, 3) + "-" + telefonoNumerica.slice(3);
      } else {
        celularNovio.value = telefonoNumerica;
      }

      // Insertar el segundo guion después de los siguientes 6 dígitos
      if (celularNovio.value.length > 7) {
        celularNovio.value =
          celularNovio.value.slice(0, 7) + "-" + celularNovio.value.slice(7);
      }
    });

    watch(codigo, (newVal) => {
      console.log(newVal);
      /*   if (newVal.length > 6 && !newVal.includes("-")) {
        $q.notify({
          type: "negative",
          position: "top",
          message: "Formato de código incorrecto",
        });
      } */
      if (newVal !== null) {
        // Eliminar los guiones existentes y cualquier carácter no numérico
        const codigoNumerico = newVal.replace(/-/g, "").replace(/\D/g, "");

        // Insertar el primer guion después de los primeros 2 dígitos
        if (codigoNumerico.length > 2) {
          codigo.value =
            codigoNumerico.slice(0, 2) + "-" + codigoNumerico.slice(2);
        } else {
          codigo.value = codigoNumerico;
        }

        // Insertar el segundo guion después de los siguientes 4 dígitos
        if (codigo.value.length > 5) {
          codigo.value = codigo.value.slice(0, 5) + "-" + codigo.value.slice(5);
        }

        if (codigo.value.length === 10) {
          const codigoSinGuiones = codigo.value.replace(/-/g, ""); // Eliminar guiones del código
          const familia = codigoSinGuiones.slice(0, 2);
          const division = codigoSinGuiones.slice(2, 4);
          const secuencia = codigoSinGuiones.slice(4);

          buscar_codigo(familia, division, secuencia);
          // Aquí puedes asignar las variables a donde necesites utilizarlas
        }
      }

      // Insertar el segundo guion después de los siguientes 4 dígitosd
    });

    watch(codigoBarra, (newVal) => {
      console.log(newVal);
    });

    //buscar articulo por codigo o por codigo de barradssds
    const buscar_codigo = (familia, division, secuencia, cod_barra = null) => {
      buscar_articulo({ familia, division, secuencia, cod_barra }).then(() => {
        codigo.value = null;
      });
    };

    let timerId = null;
    const WAIT_TIME = 500; // Tiempo de espera en milisegundos
    /* 
    watch(codigoBarra, (newVal) => {
      clearTimeout(timerId); // Reiniciar el temporizador cada vez que se detecte un cambio

      timerId = setTimeout(() => {
        // Lógica a ejecutar cuando se haya completado la lectura del código de barras

        if (newVal != null) {
          $q.notify({
            type: "negative",
            position: "top",
            message: "entre ahora",
          });
          cargarArticuloBarra(newVal);
          tempInput.value = null;
          codigoBarra.value = null;
        }
      }, WAIT_TIME);
    }); */

    /*   watch(openCardProducto, (newVal) => {
      if (openCardProducto.value === false) {
        barcode.value = true;
        toggleBarcode();
      }
    }); */
    //tomar codigo de barra
    // Referencia al elemento de input
    const inputBarcodeRef = ref(null);

    /*    const setFocus = () => {
      tempInput = document.createElement("input");
      tempInput.type = "number";
      tempInput.style.position = "absolute";
      tempInput.style.top = "-9999px";
      document.body.appendChild(tempInput);

      tempInput.value = null;
      tempInput.focus();

      tempInput.addEventListener("input", (event) => {
        const scannedValue = event.target.value.trim();
        codigoBarra.value = null;
        // Borrar el valor anterior
        codigoBarra.value = scannedValue; // Asignar el nudevo valor del escaneo
      });

      tempInput.addEventListener("blur", () => {
        document.body.removeChild(tempInput);
        codigoBarra.value = null;
      });
    }; */

    /*    const setFocus = () => {
      tempTextarea = document.createElement("textarea");
      tempTextarea.style.position = "absolute";
      tempTextarea.style.top = "-9999px";
      document.body.appendChild(tempTextarea);

      tempTextarea.value = null;
      tempTextarea.focus();

      tempTextarea.addEventListener("input", (event) => {
        const scannedValue = event.target.value.trim();
        codigoBarra.value = null;
        // Borrar el valor anterior
        codigoBarra.value = scannedValue; // Asignar el nuevo valor del escaneo
      });

      tempTextarea.addEventListener("blur", () => {
        document.body.removeChild(tempTextarea);
        codigoBarra.value = null;
      });
    }; */

    /*  const setFocus = () => {
      document.addEventListener("keydown", handleKeyDown);
    }; */

    const handleKeyDown = (event) => {
      const scannedValue = event.key;
      console.log(scannedValue);
      // Verifica si step.value es igual a 4
      if (step.value === 4) {
        // Verifica si la tecla presionada es un número
        if (!isNaN(scannedValue) && scannedValue !== undefined) {
          // Agrega la tecla al codigoBarra.value solo si es un número
          codigoBarra.value += scannedValue;
        }

        // Verifica si se presionó la tecla "Enter" y la longitud es mayor o igual a 9
        if (scannedValue === "Enter" && codigoBarra.value.length >= 9) {
          // Ejecuta la función

          cargarArticuloBarra(codigoBarra.value);
          codigoBarra.value = "";
        }

        // Evita que se active el teclado
        event.preventDefault();
      }
    };

    /*   const toggleBarcode = () => {
      barcode.value = !barcode.value;
      if (barcode.value) {
        setFocus();
      }
    };

    // Evento para evitar que el teclado se abra automáticamented
    const handleInputFocus = () => {
      if (barcode.value) {
        inputBarcodeRef.value.blur();
      }
    };
 */
    //sumar producto
    const setSumar = (producto) => {
      setSumarProductoReg(producto);
    };

    //restar producto
    const setRestar = (producto, cantidad) => {
      if (cantidad == 1 && producto.agregar == false) {
        $q.dialog({
          title: "Eliminar Producto",
          message: "¿Estas seguro/a de eliminar este producto?",
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
            const codigoSplit = producto.codigo.split("-");
            const familia = codigoSplit[0];
            const division = codigoSplit[1];
            const secuencia = codigoSplit[2];

            eliminarProductoReg({
              id_lista: data.sec_lista,
              id_dependencia: data.depid,
              familia: familia,
              division: division,
              secuencia: secuencia,
            }).then((response) => {
              if (response) {
                inicioStore.setEliminarProductoReg(producto);
              }
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } else {
        setRestarProductoReg(producto);
      }
    };

    //eliminar prodcuto de la lista
    const eliminarProducto = (producto) => {
      $q.dialog({
        title: "Eliminar Producto",
        message: "¿Estas seguro/a de eliminar este producto?",
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
          const codigoSplit = producto.codigo.split("-");
          const familia = codigoSplit[0];
          const division = codigoSplit[1];
          const secuencia = codigoSplit[2];

          eliminarProductoReg({
            id_lista: data.sec_lista,
            id_dependencia: data.depid,
            familia: familia,
            division: division,
            secuencia: secuencia,
          }).then((response) => {
            if (response) {
              inicioStore.setEliminarProductoReg(producto);
            }
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };

    //verificar cedula
    const verificarCedula = (cedula) => {
      // Verificar si la cédula está vacía o es nula
      if (cedula === null || cedula.trim() === "") {
        return {
          serie: null,
          secuencia: null,
          digitador: null,
        };
      }

      // Verificar el formato y la cantidad de dígitos de cedula.value
      const cedulaFormatoValido = /^(\d{3})-(\d{7})-(\d{1})$/.test(cedula);

      if (cedulaFormatoValido) {
        // Dividir cedula.value en serie, secuencia y digitador
        const [, serie, secuencia, digitador] = cedula.match(
          /^(\d{3})-(\d{7})-(\d{1})$/
        );

        // Ejemplo: Imprimir los valores
        console.log("Serie:", serie);
        console.log("Secuencia:", secuencia);
        console.log("Digitador:", digitador);
        return {
          serie: serie,
          secuencia: secuencia,
          digitador: digitador,
        };
      } else {
        $q.notify({
          type: "negative",
          position: "top",
          message: "Formato de cedula incorrecto",
        });
        return false;
      }
    };

    //verificar numero
    const verificarNumero = (numero) => {
      // Verificar si el número está vacío, es nulo o está en blanco
      if (numero === null || numero.trim() === "") {
        return {
          area: null,
          perfil: null,
          numeroF: null,
        };
      }

      // Verificar el formato y la cantidad de dígitos de cedula.value
      const numeroFormatoValido = /^(\d{3})-(\d{3})-(\d{4})$/.test(numero);

      if (numeroFormatoValido) {
        // Dividir cedula.value en serie, secuencia y digitador
        const [, area, perfil, numeroF] = numero.match(
          /^(\d{3})-(\d{3})-(\d{4})$/
        );

        // Ejemplo: Imprimir los valores
        console.log("area:", area);
        console.log("perfil:", perfil);
        console.log("numeroF:", numeroF);
        return {
          area: area,
          perfil: perfil,
          numeroF: numeroF,
        };
      } else {
        $q.notify({
          type: "negative",
          position: "top",
          message: "Formato de numero incorrecto",
        });
        return false;
      }
    };

    //verificar variable
    function verificarParametroNoVacio(parametro, nombreParametro) {
      if (parametro && parametro.trim() !== "") {
        return true;
      } else {
        $q.notify({
          type: "negative",
          position: "top",
          message: `El parámetro '${nombreParametro}' está en blanco.`,
        });
        return false;
      }
    }

    //verificar modulos
    const verificarModulo = (steep) => {
      switch (steep) {
        //datos novia
        case 1:
          if (
            verificarParametroNoVacio(nombreNovia.value, "Nombre de la novia")
          ) {
            step.value = 2;
          }
          break;
        //datos novio
        case 2:
          if (
            verificarParametroNoVacio(nombreNovio.value, "Nombre del novio")
          ) {
            step.value = 3;
          }
          break;
        //datos de la boda
        case 3:
          if (
            verificarParametroNoVacio(fechaBoda.value, "Fecha de la boda") &&
            verificarParametroNoVacio(
              fechaInvitaciones.value,
              "Fecha de las invitaciones"
            )
          ) {
            step.value = 4;
          }
          break;

        default:
          break;
      }
    };

    //verificar codigo
    const verificarCodigo = (codigo) => {
      // Verificar el formato del código
      const codigoFormatoValido = /^(\d+)-(\d+)-(\d+)$/.test(codigo);

      if (codigoFormatoValido) {
        // Dividir el código en familia, división y secuencia
        const [, familia, division, secuencia] =
          codigo.match(/^(\d+)-(\d+)-(\d+)$/);

        // Ejemplo: Imprimir los valores
        console.log("familia:", familia);
        console.log("division:", division);
        console.log("secuencia:", secuencia);

        return {
          familia: familia,
          division: division,
          secuencia: secuencia,
        };
      } else {
        $q.notify({
          type: "negative",
          position: "top",
          message: "Formato de código incorrecto",
        });
        return false;
      }
    };

    //guardar lista
    const guardarLista = () => {
      //lista de regalos
      let listaRegalos = [];
      for (let key in listaProducto.value) {
        console.log(listaProducto.value[key].data.codigo);
        let codigo = verificarCodigo(listaProducto.value[key].data.codigo);
        listaRegalos.push({
          familia: codigo.familia,
          division: codigo.division,
          secuencia: codigo.secuencia,
          cantidad: listaProducto.value[key].cantidad,
          almacen: listaProducto.value[key].data.almacen,
          guardar: listaProducto.value[key].data.agregar,
        });
      }

      //verificar
      const cedulaNovia = verificarCedula(cedula.value);
      const cedulaNovioDivisor = verificarCedula(cedulaNovio.value);
      const TelefonoNoviaDivisor = verificarNumero(telefonoNovia.value);
      const celularNoviaDivisor = verificarNumero(celularNovia.value);
      const TelefonoNovioDivisor = verificarNumero(telefonoNovio.value);
      const celularNovioDivisor = verificarNumero(celularNovio.value);

      if (
        cedulaNovia &&
        cedulaNovioDivisor &&
        TelefonoNoviaDivisor &&
        celularNoviaDivisor &&
        TelefonoNovioDivisor &&
        celularNovioDivisor
      ) {
        let dataEditar = {
          //datos novia
          serieNovia: cedulaNovia.serie,
          secuenciaNovia: cedulaNovia.secuencia,
          digitadorNovia: cedulaNovia.digitador,
          areaTelNovia: TelefonoNoviaDivisor.area,
          perfilTelNovia: TelefonoNoviaDivisor.perfil,
          numeroTelNovia: TelefonoNoviaDivisor.numeroF,
          areaCelNovia: celularNoviaDivisor.area,
          perfilCelNovia: celularNoviaDivisor.perfil,
          numeroCelNovia: celularNoviaDivisor.numeroF,
          emailNovia: emailNovia.value,
          nombreNovia: nombreNovia.value,
          direccionNovia: direcionNovia.value,
          //datos novio
          serieNovio: cedulaNovioDivisor.serie,
          secuenciaNovio: cedulaNovioDivisor.secuencia,
          digitadorNovio: cedulaNovioDivisor.digitador,
          areaTelNovio: TelefonoNovioDivisor.area,
          perfilTelNovio: TelefonoNovioDivisor.perfil,
          numeroTelNovio: TelefonoNovioDivisor.numeroF,
          areaCelNovio: celularNovioDivisor.area,
          perfilCelNovio: celularNovioDivisor.perfil,
          numeroCelNovio: celularNovioDivisor.numeroF,
          emailNovio: emailNovio.value,
          nombreNovio: nombreNovio.value,
          direccionNovio: direcionNovio.value,
          //datos boda
          enviar: enviar.value ? "S" : "N",
          direccionRegalos: direcionRegalos.value,
          lugarCelebracion: lugarCelebracion.value,
          numeroInvitaciones: numeroInvitaciones.value,
          fechaBoda: fechaBoda.value,
          fechaInvitaciones: fechaInvitaciones.value,
          nota: nota.value,
          imprimirLista: imprimirLista.value ? "S" : "N",
          enviarEmail: enviarEmail.value ? "S" : "N",
          //generales
          sec_lista: data.sec_lista,
          id_dependencia: data.depid,
          //lista de regalos
          regalos: listaRegalos,
        };
        console.log(dataEditar);
        actualizarListaRegalo(dataEditar).then((response) => {
          //limpiar todo
          if (response) {
            inicioStore.setResetearListaReg();
          }
        });
      }
    };

    //limpiar
    const limpiar = () => {
      cedula.value = null;
      telefonoNovia.value = null;
      celularNovia.value = null;
      emailNovia.value = null;
      nombreNovia.value = null;
      direcionNovia.value = null;
      cedulaNovio.value = null;
      telefonoNovio.value = null;
      celularNovio.value = null;
      emailNovio.value = null;
      nombreNovio.value = null;
      direcionNovio.value = null;
      enviar.value = false;
      enviarEmail.value = false;
      imprimirLista.value = false;
      direcionRegalos.value = null;
      lugarCelebracion.value = null;
      numeroInvitaciones.value = null;
      fechaBoda.value = null;
      fechaInvitaciones.value = null;
      nota.value = null;
    };
    /* 
    const startScan = async () => {
      // Check camera permission
      // This is just a simple example, check out the better checks below
      await BarcodeScanner.checkPermission({ force: true });

      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
      }
    }; */

    return {
      step,
      cedula,
      telefonoNovia,
      celularNovia,
      emailNovia,
      nombreNovia,
      cedulaNovio,
      telefonoNovio,
      celularNovio,
      emailNovio,
      nombreNovio,
      enviar,
      enviarEmail,
      imprimirLista,
      codigo,
      columns,
      openCardProducto,
      listaProducto,
      getCantidadProductoReg,
      setSumar,
      setRestar,
      totalRegalos,
      eliminarProducto,
      direcionNovia,
      direcionNovio,
      direcionRegalos,
      lugarCelebracion,
      numeroInvitaciones,
      fechaBoda,
      fechaInvitaciones,
      nota,
      guardarLista,
      verificarModulo,
      codigoBarra,
      barcode,
    };
  },
};
</script>

<style>
.q-table td {
  font-weight: 500;
  font-size: 10px !important;
  font-weight: bold;
  -webkit-user-select: none;
  user-select: none;
}
</style>