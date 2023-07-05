<template>
  <q-card>
    <q-card-section class="text-center">
      <q-avatar size="100px" class="shadow-10">
        <img :src="avatar" />
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none text-center">
      <div class="text-h6 text-grey-8">
        {{ name }}
      </div>
      <div class="text-caption text-grey-8">
        {{ des }}
      </div>
    </q-card-section>
    <q-card-section>
      <grafico-circular :estadistica="estadistica"> </grafico-circular
    ></q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import GraficoCircular from "components/charts/GraficoCircular.vue";

export default defineComponent({
  name: "CardProfile",
  props: ["avatar", "name", "des", "estadistica"],
  components: { GraficoCircular },

  setup(props) {},
});
</script>

<style scoped>
</style>
