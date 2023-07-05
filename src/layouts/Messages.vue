<template>
  <div>
    <q-item
      style="max-width: 420px"
      v-for="msg in dataNotificaciones"
      :key="msg.id"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-avatar>
          <q-icon name="fa-solid fa-list-check" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ msg.nombre }}</q-item-label>
        <q-item-label caption lines="1">{{ msg.nota }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        {{ msg.labels[msg.acciones[1].frecuencia] }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useInicio } from "src/composables/useInicio";
export default defineComponent({
  name: "Messages",
  setup() {
    const { dataNotificaciones } = useInicio();
    return {
      dataNotificaciones,
      messages: [
        {
          id: 5,
          name: "Pratik Patel",
          msg:
            " -- I'll be in your neighborhood doing errands this\n" +
            "            weekend. Do you want to grab brunch?",
          avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4",
          time: "10:42 PM",
        },
        {
          id: 6,
          name: "Winfield Stapforth",
          msg:
            " -- I'll be in your neighborhood doing errands this\n" +
            "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
          time: "11:17 AM",
        },
        {
          id: 1,
          name: "Boy",
          msg:
            " -- I'll be in your neighborhood doing errands this\n" +
            "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          time: "5:17 AM",
        },
        {
          id: 2,
          name: "Jeff Galbraith",
          msg:
            " -- I'll be in your neighborhood doing errands this\n" +
            "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
          time: "5:17 AM",
        },
        {
          id: 3,
          name: "Razvan Stoenescu",
          msg:
            " -- I'll be in your neighborhood doing errands this\n" +
            "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
          time: "5:17 AM",
        },
      ],
    };
  },
});
</script>

<style scoped>
</style>
