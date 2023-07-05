<template>
  <q-dialog v-model="openModalCart">
    <q-card
      class="q-ma-xl bg-secondary"
      v-bind:style="
        $q.screen.lt.lg
          ? 'width: 100%; max-width: 90%;  '
          : $q.screen.lt.xl
          ? 'width: 90%; max-width: 90%;  '
          : 'width: 90%; max-width: 90%; '
      "
    >
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
              <div class="col-8">
                <span>
                  <q-input
                    filled
                    v-model="nombreCLiente"
                    label="*Nombre del cliente"
                    label-color="secondary"
                    rounded
                  >
                    <template v-slot:prepend>
                      <q-icon name="fa-solid fa-user" style="color: #20145f" />
                    </template> </q-input
                ></span>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <q-table
              :rows="listaCarrito"
              :columns="columns"
              bordered
              no-data-label="No se encontraron consumos en transito."
              no-results-label="El filtro no encontro ningún resultado."
              rows-per-page-label="Registros por página"
              :loading="loading"
              :filter="filter"
              responsive
              hide-bottom
              :pagination="{ rowsPerPage: 20 }"
              class="table-bg-detalle"
              table-class="text-black"
              table-header-class="text-white"
              separator="cell"
            >
              <!--buscado no data-->
              <template v-slot:no-data="{ message }">
                <div class="full-width row text-indigo-5 text-weight-medium">
                  <q-icon
                    size="2em"
                    name="fa-solid fa-money-bill-wheat"
                    class="q-mr-xs"
                  />
                  <span style="font-size: 18px">{{ message }} </span>
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
                          props.row.data.IMAGEN == null
                            ? 'nopic.jpg'
                            : props.row.data.base64
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
                        {{
                          props.row.data.FAMILIA +
                          "-" +
                          props.row.data.DIVISION +
                          "-" +
                          props.row.data.SECUENCIA
                        }}
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
                        {{ props.row.data.DESCRIPCION }}
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
                        {{ props.row.data.REFERENCIA }}
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
                        {{ props.row.data.MARCA }}
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
                        {{ props.row.data.ALMACEN }}
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
                            getCantidadProducto(
                              props.row.data.FAMILIA,
                              props.row.data.DIVISION,
                              props.row.data.SECUENCIA
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
                        {{ props.row.data.UNIDAD }}
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
                      <span> RD${{ props.row.data.PRECIO }} </span>
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
                            parseFloat(props.row.data.PRECIO_R)
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

            <q-item>
              <q-item-section>
                <q-item-label>
                  <div class="row text-right">
                    <div class="col-12">
                      <span class="text-h4">Total: RD${{ totalCarrito }}</span>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>

            <!--Tabla de productos-->

            <!--Botones de guardar borrar registros-->
            <q-item>
              <q-item-section>
                <div class="row q-mt-md">
                  <div class="col-12 text-center">
                    <q-btn
                      color="positive"
                      icon="fa-solid fa-floppy-disk"
                      label="Guardar"
                      @click="guardarFactura"
                      class="glossy q-mr-lg"
                    />
                    <q-btn
                      color="negative"
                      icon="fa-solid fa-trash"
                      label="Borrar"
                      @click="eliminarCarrito"
                      class="glossy"
                    />
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useInicio } from "src/composables/useInicio";
import { Cookies } from "quasar";
export default {
  props: ["sec_lista"],
  setup(props) {
    //variables
    const {
      openModalCart,
      listaCarrito,
      inicioStore,
      $q,
      totalCarrito,
      getCantidadProducto,
      setSumarProductoCart,
      setRestarProductoCart,
      crearOrden,
    } = useInicio();
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
    let nombreCLiente = ref();
    const filter = ref("");
    let token = Cookies.get("tokenListaBoda");
    //funciones

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
          inicioStore.setEliminarProducto(producto);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };

    //eliminar carrito
    const eliminarCarrito = () => {
      $q.dialog({
        title: "Eliminar carrito",
        message: "¿Estas seguro/a de eliminar este carrito?",
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
          inicioStore.setResetearCarrito();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };

    //sumar producto
    const setSumar = (producto) => {
      setSumarProductoCart(producto);
    };

    //restar producto
    const setRestar = (producto) => {
      setRestarProductoCart(producto);
    };

    //guardar factura
    const guardarFactura = (data) => {
      if (nombreCLiente.value && nombreCLiente.value.trim() !== "") {
        $q.dialog({
          title: "Crear orden",
          message: "¿Estas seguro/a de crear la orden?",
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
            let productos = [];
            for (let key in listaCarrito.value) {
              console.log(listaCarrito.value[key]);
              productos.push({
                familia: listaCarrito.value[key].data.FAMILIA,
                division: listaCarrito.value[key].data.DIVISION,
                secuencia: listaCarrito.value[key].data.SECUENCIA,
                cantidad: listaCarrito.value[key].cantidad,
                almacen: listaCarrito.value[key].data.ALMACEN,
              });
            }

            console.log(props.sec_lista);
            let datos = {
              ficha: token.ficha,
              cliente: nombreCLiente.value,
              digitador: token.digitador,
              productos: productos,
              sec_lista: props.sec_lista,
            };

            console.log(datos);
            crearOrden(datos);
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } else {
        $q.notify({
          type: "negative",
          position: "top",
          message: "El nombre del cliente es obligatorio",
        });
      }
    };

    return {
      openModalCart,
      listaCarrito,
      columns,
      filter,
      nombreCLiente,
      totalCarrito,
      eliminarProducto,
      eliminarCarrito,
      getCantidadProducto,
      setSumar,
      setRestar,
      guardarFactura,
    };
  },
};
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

.q-table tr,
.q-table th,
.q-table td {
  border-color: #1c3b70 !important;
  border-block-width: 1px;
  font-size: 12px !important;
}
.q-table th {
  font-weight: 500;
  font-size: 11px !important;
  font-weight: bold;
  -webkit-user-select: none;
  user-select: none;
}
.q-table thead {
  background-color: #1c3b70;
}
</style>