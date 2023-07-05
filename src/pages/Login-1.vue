<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <!--Mobile-->
        <q-card
          v-bind:style="
            $q.screen.lt.sm
              ? ' width: 80%;border-radius: 50px '
              : $q.screen.lt.md
              ? ' width: 80%;border-radius: 50px '
              : $q.screen.lt.lg
              ? ' width: 65%;border-radius: 50px '
              : ' width: 50%;border-radius: 50px '
          "
          class="shadow-2"
          v-if="$q.platform.is.nativeMobile && $q.platform.is.android"
        >
          <q-card-section>
            <div class="row">
              <!--Logo-->
              <div class="col-6">
                <div class="row q-mb-xl justify-center">
                  <q-img src="novios.png" width="75%" />
                </div>
                <div class="row">
                  <div class="col text-center">
                    <span
                      class="text-h5 text-weight-medium"
                      style="color: #20145f"
                      >LISTA DE BODA</span
                    >
                  </div>
                </div>
              </div>
              <!--Formulario-->
              <div class="col-6">
                <q-form class="q-gutter-md q-ma-xl" @submit="logueo">
                  <q-input
                    filled
                    v-model="username"
                    label="Usuario"
                    rounded
                    color="secondary"
                    class="q-mb-xl"
                  >
                    <template v-slot:prepend>
                      <q-icon name="fa-solid fa-user" style="color: #20145f" />
                    </template>
                  </q-input>

                  <q-input
                    type="password"
                    filled
                    v-model="password"
                    label="Contraseña"
                    rounded
                    color="secondary"
                    class="q-mb-xl"
                  >
                    <template v-slot:prepend>
                      <q-icon name="fa-solid fa-lock" style="color: #20145f" />
                    </template>
                  </q-input>

                  <q-select
                    v-model="aplicacion"
                    :options="opcAplicaciones"
                    label="Aplicación"
                    filled
                    rounded
                    class="q-mb-xl"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="fa-solid fa-display"
                        style="color: #20145f"
                      /> </template
                  ></q-select>
                  <div class="q-mb-xl">
                    <q-btn
                      label="Login"
                      type="submit"
                      class="gradient-button"
                    />
                  </div>
                </q-form>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!--Escritorio-->
        <q-card
          v-bind:style="
            $q.screen.lt.sm
              ? ' width: 80%;border-radius: 50px '
              : $q.screen.lt.md
              ? ' width: 80%;border-radius: 50px '
              : $q.screen.lt.lg
              ? ' width: 65%;border-radius: 50px '
              : ' width: 50%;border-radius: 50px '
          "
          class="shadow-2"
          v-else
        >
          <!--  border-radius: 75px  <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Iniciar Sesión</div>
            </div>
          </q-card-section> -->
          <q-card-section>
            <div class="row">
              <!--Logo-->
              <div class="col-6">
                <div class="row q-mb-xl justify-center">
                  <q-img src="novios.png" width="75%" />
                </div>
                <div class="row">
                  <div class="col text-center">
                    <span
                      class="text-h5 text-weight-medium"
                      style="color: #20145f"
                      >LISTA DE BODA</span
                    >
                  </div>
                </div>
              </div>
              <!--Formulario-->
              <div class="col-6">
                <q-form class="q-gutter-md q-ma-xl" @submit="logueo">
                  <q-input
                    filled
                    v-model="username"
                    label="Usuario"
                    rounded
                    color="secondary"
                    class="q-mb-xl"
                  >
                    <template v-slot:prepend>
                      <q-icon name="fa-solid fa-user" style="color: #20145f" />
                    </template>
                  </q-input>

                  <q-input
                    type="password"
                    filled
                    v-model="password"
                    label="Contraseña"
                    rounded
                    color="secondary"
                    class="q-mb-xl"
                  >
                    <template v-slot:prepend>
                      <q-icon name="fa-solid fa-lock" style="color: #20145f" />
                    </template>
                  </q-input>

                  <q-select
                    v-model="aplicacion"
                    :options="opcAplicaciones"
                    label="Aplicación"
                    filled
                    rounded
                    class="q-mb-xl"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="fa-solid fa-display"
                        style="color: #20145f"
                      /> </template
                  ></q-select>
                  <div class="q-mb-xl">
                    <q-btn
                      label="Login"
                      type="submit"
                      class="gradient-button"
                    />
                  </div>
                </q-form>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useInicio } from "src/composables/useInicio";

export default defineComponent({
  setup() {
    const { login, $q } = useInicio();

    let username = ref("f8a01529");
    let password = ref("none");

    let aplicacion = ref({ label: "Buscar Lista de Boda", value: 1 });
    let opcAplicaciones = ref([
      { label: "Buscar Lista de Boda", value: 1 },
      { label: "Crear Lista de Boda", value: 2 },
    ]);

    //iniciar sesion
    const logueo = () => {
      let data = {
        usuario: username.value,
        password: password.value,
      };
      login(data, aplicacion.value).then((response) => {
        console.log(response);
      });
    };

    return {
      username,
      password,
      opcAplicaciones,
      aplicacion,
      logueo,
      $q,
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #ffffff55 0%, #ffffff76 100%);
}
.gradient-button {
  background-image: linear-gradient(to right, #d41731, #20145f);
  color: #fff; /* Establece el color de texto para que sea legible en el gradiente */
  border: none; /* Elimina el borde predeterminado del botón */
  cursor: pointer; /* Establece el cursor a un puntero para indicar que es un elemento interactivo */
  padding: 10px 20px; /* Ajusta el relleno del botón según tus preferencias */
  border-radius: 8px; /* Establece un borde redondeado para el botón */
  width: 100%; /* Establece el ancho del botón al 100% del ancho del contenedor */
  display: block; /* Hace que el botón ocupe todo el ancho disponible */
}
.shadow-2 {
  box-shadow: 6px 6px 15px 8px rgba(0, 0, 0, 0.2);
}
</style>
