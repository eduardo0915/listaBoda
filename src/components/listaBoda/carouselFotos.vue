<template>
  <q-dialog v-model="openCarouselFotos">
    <q-card
      v-bind:style="
        $q.screen.lt.lg
          ? 'width: 35%; max-width: 90%;  '
          : $q.screen.lt.xl
          ? 'width: 40%; max-width: 90%;  '
          : 'width: 25%; max-width: 90%; '
      "
    >
      <q-card-section>
        <q-carousel
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          arrows
        >
          <q-carousel-slide
            v-for="(foto, index) in fotos"
            :key="index"
            :name="index"
            :img-src="foto.base64"
          />
        </q-carousel>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useInicio } from "src/composables/useInicio.js";
export default {
  setup(props) {
    const { openCarouselFotos, get_img_secundarias } = useInicio();

    let fotos = ref([]);
    let slide = ref(0);
    get_img_secundarias().then((response) => {
      console.log(response);
      fotos.value = response;
    });
    return { openCarouselFotos, fotos, slide };
  },
};
</script>

<style>
.q-carousel__arrow .q-icon {
  font-size: 28px;
  color: #153966 !important;
}
</style>