<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-md-4 col-sm-12 col-xs-12 cursor-pointer"
          @click="cargarTareas(item.title)"
        >
          <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
            <q-item-section
              v-if="icon_position === 'left'"
              side
              :style="`background-color: ${item.color2}`"
              class="q-pa-lg q-mr-none text-white"
            >
              <q-icon :name="item.icon" color="white" size="24px"></q-icon>
            </q-item-section>
            <q-item-section class="q-pa-md q-ml-none text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{
                item.value
              }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
            <q-item-section
              v-if="icon_position === 'right'"
              side
              class="q-mr-md text-white"
            >
              <q-icon :name="item.icon" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useInicio } from "src/composables/useInicio";
import { useInicioStore } from "src/store/inicio";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "CardSocial",
  props: {
    icon_position: {
      required: false,
      default: "left",
    },
  },

  setup() {
    //variables
    const { listasDia, tareasCompletadas } = useInicio();
    const inicioStore = useInicioStore();
    const router = useRouter();
    const TareasDia = computed(() => {
      if (
        listasDia.value.all_listas === undefined ||
        listasDia.value.all_listas === null
      ) {
        return 0; // o cualquier otro valor predeterminado que quieras utilizar
      }
      return Object.keys(listasDia.value.all_listas).length;
    });

    const AllTareas = computed(() => {
      if (
        listasDia.value.lista_usuario === undefined ||
        listasDia.value.lista_usuario === null
      ) {
        return 0; // o cualquier otro valor predeterminado que quieras utilizar
      }
      return Object.keys(listasDia.value.all_listas).length;
    });

    const cargarTareas = (tipo) => {
      if (tipo == "Todas las tareas") {
        router.push("/Todas");
      } else if (tipo == "Tareas del dia") {
        router.push("/");
      } else if (tipo == "Tareas completadas") {
        router.push("/Completadas");
      }
    };

    return { TareasDia, AllTareas, tareasCompletadas, cargarTareas };
  },
  computed: {
    items: function () {
      return [
        {
          title: "Tareas del dia",
          icon: "fa-solid fa-list-check",
          value: this.TareasDia,
          color1: "#546bfa",
          color2: "#3e51b5",
        },
        {
          title: "Tareas completadas",
          icon: "fa-solid fa-list-check",
          value: this.tareasCompletadas.length,
          color1: "#3a9688",
          color2: "#3e51b5",
        },

        {
          title: "Todas las tareas",
          icon: "fa-solid fa-bars-progress",
          value: this.AllTareas,
          color1: "#f88c2b",
          color2: "#3e51b5",
        },
      ];
    },
  },
});
</script>
