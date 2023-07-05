<template>
  <q-card class="text-center no-shadow no-border">
    <span class="text-weight-bold text-secondary">Tu carrito de compras</span>
    <q-list bordered v-for="(producto, index) in listaCarrito" :key="index">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-img
            style="width: 75px"
            :src="
              producto.data.IMAGEN == null ? 'nopic.jpg' : producto.data.base64
            "
            alt=""
          />
        </q-item-section>
        <q-item-section>
          <div class="row">
            <div class="col-8">
              <span class="text-left">{{ producto.data.DESCRIPCION }}</span>
            </div>
            <div class="col-4">
              <div class="row">
                <div class="col text-right">
                  <span>RD${{ producto.data.PRECIO }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col text-right">
                  <button
                    class="buttonCantidad text-white"
                    @click="setRestar(producto.data)"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    :value="
                      getCantidadProducto(
                        producto.data.FAMILIA,
                        producto.data.DIVISION,
                        producto.data.SECUENCIA
                      )
                    "
                  />
                  <button
                    class="buttonCantidad text-white"
                    @click="setSumar(producto.data)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator spaced inset vertical dark />
    <q-card-section>
      <div class="row">
        <div class="col-6">
          <span class="text-weight-bold text-secondary">SUBTOTAL: </span>
          <span class="text-weight-bold">RD${{ totalCarrito }}</span>
        </div>
        <div class="col-6 text-right">
          <q-chip
            class="glossy cursor-pointer"
            label="Finalizar"
            color="secondary"
            text-color="white"
            @click="openModalCart = true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12"></div>
      </div>
    </q-card-section>
  </q-card>
  <modal-check-cart
    v-if="openModalCart"
    :sec_lista="producto.data.SEC_LISTA"
  ></modal-check-cart>
</template>

<script>
import { computed, ref } from "vue";
import { useInicio } from "src/composables/useInicio";
import modalCheckCart from "src/components/listaBoda/modalCheckCart.vue";
export default {
  components: { modalCheckCart },
  setup(props) {
    const {
      listaCarrito,
      setSumarProductoCart,
      setRestarProductoCart,
      inicioStore,
      totalCarrito,
      openModalCart,
    } = useInicio();

    let total = ref(0);

    //sumar producto
    const setSumar = (producto) => {
      setSumarProductoCart(producto);
    };

    //restar producto
    const setRestar = (producto) => {
      setRestarProductoCart(producto);
    };

    //cantida de producto
    const getCantidadProducto = (familia, division, secuencia) => {
      const index = listaCarrito.value.findIndex(
        (item) =>
          item.data.FAMILIA === familia &&
          item.data.DIVISION === division &&
          item.data.SECUENCIA === secuencia
      );
      if (index !== -1) {
        return listaCarrito.value[index].cantidad;
      } else {
        return 0;
      }
    };

    //sumar subtotal
    const setTotalCarrito = computed(() => {
      inicioStore.setSumarTotalCart();
    });

    return {
      listaCarrito,
      setSumar,
      setRestar,
      getCantidadProducto,
      setTotalCarrito,
      totalCarrito,
      openModalCart,
    };
  },
};
</script>

<style>
input[type="number"] {
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  width: 40px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.buttonCantidad {
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #153966;
}
</style>