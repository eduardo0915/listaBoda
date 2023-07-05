<template>
  <div class="item-container">
    <q-card style="height: 500px;">
        <q-card-section>
            <div class="item-top">
      <div class="top-left-logo">
        <img src="logoOchoa.png" alt="" />
      </div>
      <!--carrito-->
      <div class="top-right-cart">
               <q-btn
            round
            dense
            flat
            :color="getCantidadProducto(producto.FAMILIA,producto.DIVISION,producto.SECUENCIA) < 1 ? 'black' : 'secondary' "
            icon="fa-solid fa-cart-shopping"
          >
            <q-badge color="red" text-color="white" floating>
              {{ getCantidadProducto(producto.FAMILIA,producto.DIVISION,producto.SECUENCIA) }}
            </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
            
                <q-card class="text-center no-shadow no-border">
                  <div >
    <button class="buttonCantidad text-white"  @click="setRestar(producto)">-</button>
    <input type="number"  min="0" :value="getCantidadProducto(producto.FAMILIA,producto.DIVISION,producto.SECUENCIA)" />
    <button class="buttonCantidad text-white" @click="setSumar(producto)">+</button>
  </div>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
      </div>
    </div>
    <div class="main-item cursor-pointer"  @click="abrirCarousel({
      FAMILIA : producto.FAMILIA,
      DIVISION : producto.DIVISION,
      SECUENCIA: producto.SECUENCIA
    })">
      <q-img
        style="width: 200px"
        :src="producto.IMAGEN == null ? 'nopic.jpg' : producto.base64"
        alt=""
       
      />
    </div>
        </q-card-section>
        <!--Detalle-->
        <q-card-section style="position: absolute; bottom: 0;;width: 100%;">
            
    
        <h2 class="item-heading text-body2">{{ producto.DESCRIPCION }}</h2>
     

      <p class="item-description">
        <div class="row">
            <div class="col-6"> <span class="text-secondary text-weight-bold">{{
          producto.FAMILIA + "-" + producto.DIVISION + "-" + producto.SECUENCIA
        }}</span> </div>
            <div class="col-6">
                <span class="float-right text-secondary text-weight-bold"> {{ producto.MARCA }}</span>
               </div>
        </div>
       
      </p>
      <p class="item-description">{{ producto.REFERENCIA }}</p>
  
      <p class="item-price"><span >RD$</span>{{producto.PRECIO}}</p>
      <button class="item-cart-btn gradient-button cursor-pointer" @click="agregar" >Agregar</button>
   
        </q-card-section>
    </q-card>
    <carousel-fotos></carousel-fotos>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useInicio } from "src/composables/useInicio";

export default {
  props: ["producto"],
  setup(props) {
    console.log(props.producto);
    //variables
    const {
      convertir_base64,
      agregarCarrito,
      setRestarProductoCart,
      setSumarProductoCart,
      listaCarrito,
      openCarouselFotos,
      inicioStore,
    } = useInicio();

    //funciones

    //agregar al carrito
    const agregar = () => {
      console.log(props.producto);
      agregarCarrito(props.producto);
    };

    //cantida de producto
    const getCantidadProducto = (familia, division, secuencia) => {
      console.log("entre");
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

    //sumar producto
    const setSumar = (producto) => {
      setSumarProductoCart(producto);
    };

    //restar producto
    const setRestar = (producto) => {
      setRestarProductoCart(producto);
    };

    //ABRIR CAROUSEL DE IMAGENES DE PRODUCTOS

    const abrirCarousel = (producto) => {
      console.log(producto);
      inicioStore.setProductoCarousel(producto);
      inicioStore.setCarouselFotos(true);
    };
    return {
      convertir_base64,
      agregar,
      getCantidadProducto,
      setSumar,
      setRestar,
      abrirCarousel,
      openCarouselFotos,
    };
  },
};
</script>

<style>
@font-face {
  font-family: "Poppins";
  src: url("/public/Poppins/Poppins-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Poppins";
  src: url("/public/Poppins/Poppins-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

input[type="number"] {
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  width: 60px;
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
.item-container {
  background-color: #fff;
  width: 20rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-left-logo {
  width: 60px;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-left-logo img {
  width: 100%;
}

.top-right-cart {
  font-size: 1.4rem;
  margin-right: 1rem;
}

.main-item {
  width: 200px;
  display: block;
  margin: 0 auto;
}

.item-heading {
  text-transform: capitalize;
  font-size: 12px;
  font-weight: 500;
}

.item-description {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 200;
}

.item-price {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.item-price sup {
  color: #153966;
}

.rating i {
  color: rgb(21, 57, 102);
  margin-bottom: 1rem;
}

.item-cart-btn {
  border: none;
  background-color: transparent;
  margin: 0 auto;
  width: 100%;
  border: 1px;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: rgb(200, 142, 254);
  color: #fff;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 200;
  position: relative;
  bottom: 0;
  cursor: pointer;
  transition: all 0.3s linear;
}

.item-cart-btn:hover {
  color: #fff;
  background-color: rgb(160, 110, 206);
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
</style>