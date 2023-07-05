<template>
  <q-dialog v-model="openCardProducto">
    <card-producto :producto="productoView"></card-producto>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useInicio } from "src/composables/useInicio";
import { Cookies } from "quasar";
import CardProducto from "src/components/listaBoda/CardProducto.vue";
export default {
  components: { CardProducto },
  props: ["sec_lista"],
  setup(props) {
    //variables
    const {
      openCardProducto,
      productoView,
      listaCarrito,
      inicioStore,
      $q,
      totalCarrito,
      getCantidadProducto,
      setSumarProductoCart,
      setRestarProductoCart,
      crearOrden,
    } = useInicio();

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
      openCardProducto,
      productoView,
      listaCarrito,
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
</style>