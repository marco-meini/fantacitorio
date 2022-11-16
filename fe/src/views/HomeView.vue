<template>
  <div>
    <PageTitle title="Classifica" />
    <Loading :loading="loading" />
    <GenericError v-if="error" />
    <div v-if="!loading && !error">
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
            <td class="text-end" style="width: 10px">{{ item.punteggio }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { GiocoAPIs } from "../api/gioco";

export default {
  data: () => ({
    loading: false,
    classifica: [],
    error: false
  }),
  methods: {
    async fetchClassifica() {
      try {
        this.loading = true;
        this.error = false;
        this.classifica = await GiocoAPIs.getClassifica();
      } catch (e) {
        console.error(e);
        this.error = true;
      }
      this.loading = false;
    }
  },
  created() {
    this.fetchClassifica();
  }
};
</script>
