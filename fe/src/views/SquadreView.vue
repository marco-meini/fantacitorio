<template>
  <div>
    <PageTitle title="Squadre" />
    <GenericError v-if="error" />
    <Loading :loading="loading" />
    <div class="row row-cols-1 row-cols-md-3">
      <div class="col" v-for="item in squadre">
        <table class="table table-bordered">
          <thead class="table-dark">
            <tr>
              <th colspan="2" class="text-center">{{ item.nome }}</th>
            </tr>
            <tr>
              <td colspan="2" class="text-center">{{ item.giocatore }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pl, index) in item.politici" :class="{ 'fw-bold': pl.leader }">
              <td>{{ index + 1 }}</td>
              <td>{{ pl.nome }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { GiocoAPIs } from "../api/gioco";
import GenericError from "../components/GenericError.vue";
import Loading from "../components/Loading.vue";
import PageTitle from "../components/PageTitle.vue";

export default {
  data() {
    return {
      loading: false,
      error: false,
      squadre: []
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        this.error = false;
        this.squadre = await GiocoAPIs.squadre();
      } catch (e) {
        console.error(e);
        this.error = true;
      }
      this.loading = false;
    }
  },
  created() {
    this.fetchData();
  },
  components: { PageTitle, GenericError, Loading }
};
</script>
