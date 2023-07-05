<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="fondoDegradado">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="fa-solid fa-bars"
          aria-label="Menu"
        />
        <q-toolbar-title> Lista de Boda</q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
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
            @click="salir"
          >
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!--Barra lateral-->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="text-white"
      style="
        background-image: url('fondo.jpeg'); !important;
        background-size: cover !important;
      "
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          height: 100%;
          background-color: rgba(1, 1, 1, 0.75);
        "
      >
        <q-list>
          <q-item to="/" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-avatar size="45px" class="q-mb-sm">
                <img :src="urlPic" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">{{ nombreUser }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="bg-grey-7" size="2px" inset></q-separator>
          <!--Inicio-->
          <q-item to="/Inicio" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Crear lista</q-item-label>
            </q-item-section>
          </q-item>
          <!--Crear lista-->
          <q-item to="/Editar" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="fa-solid fa-list-check" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Administrar listas </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Messages from "./Messages";
import { useInicio } from "src/composables/useInicio";
import { Cookies } from "quasar";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MainLayout",

  components: {
    Messages,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const { dataNotificaciones, $q } = useInicio();
    let nombreUser = ref("");
    let urlPic = ref("");
    let token = Cookies.get("tokenListaBoda");
    console.log(token);

    nombreUser.value = token.completo;

    urlPic.value =
      "http://172.17.0.150:8081/intranetAPI/assets/themes/default/images/empleados/" +
      token.ficha +
      ".JPG";
    const router = useRouter();
    //funciones

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
      dataNotificaciones,
      leftDrawerOpen,
      nombreUser,
      urlPic,
      token,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      salir,
    };
  },
});
</script>

<style>
.fondoDegradado {
  background: linear-gradient(145deg, #206a50 15%, #153966 70%);
}
</style>

