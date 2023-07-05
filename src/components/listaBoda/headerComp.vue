<template>
  <q-header elevated class="fondoDegradado">
    <div class="row">
      <q-toolbar class="col-4">
        <q-toolbar-title>
          <q-img src="logoOchoa.png" width="40%"
        /></q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="col-4">
        <q-toolbar-title>
          <span
            class="text-secondary greatx2"
            v-bind:style="
              $q.platform.is.nativeMobile && $q.platform.is.android
                ? 'font-family: Great Vibes; font-size: 40px'
                : 'font-family: Great Vibes; font-size: 2em'
            "
            >Buscar Lista de Boda</span
          >
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="col-4">
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <!--carrito-->
          <q-btn
            round
            dense
            flat
            color="white"
            icon="fa-solid fa-cart-shopping"
          >
            <q-badge color="red" text-color="white" floating>
              {{ listaCarrito.length }}
            </q-badge>
            <q-menu style="min-width: 200px" v-if="listaCarrito.length > 0">
              <carrito-header></carrito-header>
            </q-menu>
          </q-btn>
          <!--Pantalla completa-->
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          >
          </q-btn>
          <!--Salir-->
          <q-btn
            round
            dense
            flat
            color="white"
            icon="fa-solid fa-right-from-bracket"
            @click="salir()"
            label="Salir"
          >
          </q-btn>
        </div>
      </q-toolbar>
    </div>
  </q-header>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useInicio } from "src/composables/useInicio";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";
export default {
  components: {
    carritoHeader: defineAsyncComponent(() =>
      import("src/components/listaBoda/carritoHeader.vue")
    ),
  },
  setup() {
    //variables

    const { $q, listaCarrito } = useInicio();
    const router = useRouter();
    //cerrar session
    function salir() {
      $q.dialog({
        title: "Cerrar sesion",
        message: "¿Estas seguro/a de cerrar sesion?",
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
          Cookies.remove("tokenListaBoda");
          router.push("/");
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    return {
      salir,
      $q,
      listaCarrito,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,900;1,100&display=swap");
.greatx2 {
  font-family: "Roboto", sans-serif;
  font-size: 2em;
}
</style>