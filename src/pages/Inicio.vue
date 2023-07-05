
<template>
  <q-page class="q-pa-sm">
    <q-card class="q-ma-md bg-grey-1">
      <!--Titulo-->
      <q-card-section class="text-center">
        <span class="text-h4 text-secondary text-weight-bolder">
          Crear lista</span
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
                    <!--entrada nombre del cliente-->
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
                        <div class="col-2">
                          <span> </span>
                        </div>
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
                            :loading="loading"
                            :filter="filter"
                            responsive
                            hide-bottom
                            :pagination="{ rowsPerPage: 200 }"
                            class="table-bg-detalle"
                            table-class="text-black"
                            table-header-class="text-white"
                            separator="cell"
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
                                      style="width: 50px"
                                      :src="
                                        props.row.data.imagen == null
                                          ? 'nopic.jpg'
                                          : props.row.data.imagen
                                      "
                                      alt=""
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
                                        @click="setRestar(props.row.data)"
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
                                        props.row.data.oferta == "NONE"
                                          ? props.row.data.precio
                                          : props.row.data.oferta
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
                                          (props.row.data.oferta == "NONE"
                                            ? parseFloat(
                                                props.row.data.precio_raw
                                              )
                                            : parseFloat(
                                                props.row.data.oferta_raw
                                              ))
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

                      <!--Tabla de productos-->
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
import { defineAsyncComponent, ref, onMounted, watch, computed } from "vue";
import { useInicio } from "src/composables/useInicio";
import modalCardProducto from "src/components/listaBoda/modalCardProducto.vue";
import { Cookies } from "quasar";

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
      crearListaRegalo,
      cargarArticuloBarra,
    } = useInicio();

    const step = ref(1);
    let token = Cookies.get("tokenListaBoda");

    onMounted(() => {
      inicioStore.setProductosListaReg([]);
      // listas_del_dia();
      if ($q.platform.is.nativeMobile && $q.platform.is.android) {
        document.addEventListener("keydown", handleKeyDown);
      }
    });
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
    let codigoBarra = ref();
    let barcode = ref(false);
    let tempInput = null;
    watch(cedula, (newVal) => {
      if (newVal !== null) {
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
          cedula.value =
            cedula.value.slice(0, 11) + "-" + cedula.value.slice(11);
        }
      }
    });

    watch(telefonoNovia, (newVal) => {
      if (newVal !== null) {
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
            telefonoNovia.value.slice(0, 7) +
            "-" +
            telefonoNovia.value.slice(7);
        }
      }
    });

    watch(celularNovia, (newVal) => {
      if (newVal !== null) {
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
      }
    });

    watch(cedulaNovio, (newVal) => {
      if (newVal !== null) {
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
      }
    });

    watch(telefonoNovio, (newVal) => {
      if (newVal !== null) {
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
            telefonoNovio.value.slice(0, 7) +
            "-" +
            telefonoNovio.value.slice(7);
        }
      }
    });

    watch(celularNovio, (newVal) => {
      if (newVal !== null) {
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
      // Eliminar los guiones existentes y cualquier carácter no numérico

      if (newVal !== null) {
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

        // Insertar el segundo guion después de los siguientes 4 dígitos
      }
    });

    //buscar articulo por codigo o por codigo de barra
    const buscar_codigo = (familia, division, secuencia, cod_barra = null) => {
      buscar_articulo({ familia, division, secuencia, cod_barra }).then(() => {
        codigo.value = null;
      });
    };
    /* 
    let timerId = null;
    const WAIT_TIME = 500; // Tiempo de espera en milisegundos

    watch(codigoBarra, (newVal) => {
      clearTimeout(timerId); // Reiniciar el temporizador cada vez que se detecte un cambio

      timerId = setTimeout(() => {
        // Lógica a ejecutar cuando se haya completado la lectura del código de barras

        if (newVal != null) {
          cargarArticuloBarra(newVal);
          tempInput.value = null;
          codigoBarra.value = null;
        }
      }, WAIT_TIME);
    });

    watch(openCardProducto, (newVal) => {
      if (openCardProducto.value === false) {
        barcode.value = false;
        toggleBarcode();
      }
    });
    //tomar codigo de barra
    // Referencia al elemento de input
    const inputBarcodeRef = ref(null);

    const setFocus = () => {
      tempInput = document.createElement("input");
      tempInput.type = "text";
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
    };

    const toggleBarcode = () => {
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
    }; */
    const handleKeyDown = (event) => {
      const scannedValue = event.key;

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
    //sumar producto
    const setSumar = (producto) => {
      setSumarProductoReg(producto);
    };

    //restar producto
    const setRestar = (producto) => {
      setRestarProductoReg(producto);
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
          inicioStore.setEliminarProductoReg(producto);
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
          message:
            "Formato de cedula incorrecto o cantidad de dígitos inválida",
        });
        return false;
      }
    };

    //verificar numero
    const verificarNumero = (numero) => {
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
          message:
            "Formato de numero incorrecto o cantidad de dígitos inválida",
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
            verificarParametroNoVacio(
              nombreNovia.value,
              "Nombre de la novia"
            ) &&
            verificarParametroNoVacio(
              telefonoNovia.value,
              "Telefono de la novia"
            ) &&
            verificarParametroNoVacio(celularNovia.value, "Celular de la novia")
          ) {
            step.value = 2;
          }
          break;
        //datos novio
        case 2:
          if (
            verificarParametroNoVacio(nombreNovio.value, "Nombre del novio") &&
            verificarParametroNoVacio(
              telefonoNovio.value,
              "Telefono del novio"
            ) &&
            verificarParametroNoVacio(celularNovio.value, "Celular del novio")
          ) {
            step.value = 3;
          }
          break;
        //datos de la boda
        case 3:
          if (
            verificarParametroNoVacio(
              direcionRegalos.value,
              "Dirección de la boda"
            ) &&
            verificarParametroNoVacio(
              lugarCelebracion.value,
              "Lugar de celebración de la boda"
            ) &&
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
      // Verificar el formato y la cantidad de dígitos de cedula.value
      const codigoFormatoValido = /^(\d{2})-(\d{2})-(\d{4})$/.test(codigo);

      if (codigoFormatoValido) {
        // Dividir cedula.value en serie, secuencia y digitador
        const [, familia, division, secuencia] = codigo.match(
          /^(\d{2})-(\d{2})-(\d{4})$/
        );

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
          message:
            "Formato de codigo incorrecto o cantidad de dígitos inválida",
        });
        return false;
      }
    };

    //guardar lista
    const guardarLista = () => {
      //lista de regalos
      let listaRegalos = [];
      for (let key in listaProducto.value) {
        let codigo = verificarCodigo(listaProducto.value[key].data.codigo);
        listaRegalos.push({
          familia: codigo.familia,
          division: codigo.division,
          secuencia: codigo.secuencia,
          cantidad: listaProducto.value[key].cantidad,
          almacen: 21,
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
        let data = {
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
          id_dependencia: token.id_dependencia,
          //lista de regalos
          regalos: listaRegalos,
        };

        crearListaRegalo(data).then((response) => {
          //limpiar todo
          if (response) {
            limpiar();
            inicioStore.setResetearListaReg();
          }
        });
      }
    };

    //limpiar
    const limpiar = () => {
      step.value = 1;
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