<template>
  <div>
    <h1 class="mb-4">Classifica</h1>
    <Loading :loading="loading" />
    <div v-if="!loading">
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th scope="col">Squadra</th>
            <th scope="col">Punteggio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in classifica" :key="item.id_sq">
            <td>
              <b>{{ item.nome_sq }}</b
              >&nbsp;({{ item.giocatore_sq }})
            </td>
            <td class="text-end" style="width: 10px;">{{ item.punteggio }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { GiocoAPIs } from "../api/gioco";
import Loading from "../components/Loading.vue";

export default {
  data: () => ({
    loading: false,
    classifica: [],
  }),
  methods: {
    async fetchClassifica() {
      try {
        this.loading = true;
        this.classifica = await GiocoAPIs.getClassifica();
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    },
  },
  created() {
    this.fetchClassifica();
  },
  components: {
    Loading
  },
};
</script> 