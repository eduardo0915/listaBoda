<template>
  <BarChart :chartData="estadistica"></BarChart>
</template>

<script>
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useInicio } from "src/composables/useInicio";
import { ref } from "vue";

Chart.register(...registerables);
export default {
  components: { BarChart },
  props: ["estadistica"],
  setup() {
    const {} = useInicio();

    let data_chart = {
      labels: ["Diario"],
      datasets: [
        {
          label: "En proceso",
          borderColor: "#e57373",
          pointBackgroundColor: "black",
          borderWidth: 2,
          backgroundColor: "#d41731",
          data: [2, 1],
        },
        {
          label: "Concluidas",
          borderColor: "#81c784",
          pointBackgroundColor: "black",
          borderWidth: 2,
          backgroundColor: "#20145F",
          data: [3, 2],
        },
      ],
    };

    return { data_chart };
  },
};
</script>

<style>
</style>
