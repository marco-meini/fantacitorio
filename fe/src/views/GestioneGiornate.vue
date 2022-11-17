<template>
  <div>
    <PageTitle title="Gestione Puntate" />
    <Loading :loading="loading" />
    <GenericError v-if="error" />
    <router-link to="/gestione-giornata" class="btn btn-primary btn-sm mb-2">Inserisci giornata</router-link>
    <div class="col-lg-6" v-if="!loading">
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th scope="col">Giornata</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in giornate" :key="item.puntata_pn">
            <td>{{ formatDate(item.puntata_pn) }}</td>
            <td style="width: 10px">
              <router-link :to="editLink(item)" class="btn btn-primary btn-sm"><i class="bi bi-pencil"></i></router-link>
            </td>
            <td style="width: 10px">
              <button @click="del(item)" type="button" class="btn btn-danger btn-sm"><i class="bi bi-trash3"></i></button>
            </td>
          </tr>
          <tr v-if="giornate.length === 0">
            <td colspan="3">Nessuna giornata inserita</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { GiocoAPIs } from "../api/gioco";
import moment from "moment";
import GenericError from "../components/GenericError.vue";
import Loading from "../components/Loading.vue";
import PageTitle from "../components/PageTitle.vue";

export default {
  data: () => ({
    loading: false,
    error: false,
    giornate: []
  }),
  methods: {
    async fetchGiornate() {
      try {
        this.loading = true;
        this.giornate = await GiocoAPIs.giornate();
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    },
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },
    editLink(item) {
      return { path: `/gestione-giornata/${moment(item.puntata_pn).format("YYYYMMDD")}` };
    },
    async del(item) {
      try {
        this.loading = true;
        await GiocoAPIs.deleteGiornata(moment(item.puntata_pn).format("YYYYMMDD"));
        this.giornate = await GiocoAPIs.giornate();
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    }
  },
  created() {
    this.fetchGiornate();
  },
  components: { GenericError, Loading, PageTitle }
};
</script>
