<template>
  <div>
    <PageTitle title="Gestione Giornate" />
    <Loading :loading="loading" />
    <GenericError v-if="error" />
    <router-link to="/gestione-giornata" class="btn btn-primary btn-sm mb-2">Inserisci giornata</router-link>
    <div v-if="!loading">
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th scope="col">Giornata</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in giornate" :key="item.puntata_pn">
            <td>{{ formatDate(item.puntata_pn) }}</td>
            <td></td>
          </tr>
          <tr v-if="giornate.length === 0">
            <td colspan="2">Nessuna giornata inserita</td>
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
            }
            catch (e) {
                console.error(e);
            }
            this.loading = false;
        },
        formatDate(date) {
            return moment(date).format("DD.MM.YYYY");
        },
        add() {
        },
        edit() { }
    },
    created() {
        this.fetchGiornate();
    },
    components: { GenericError, Loading, PageTitle }
};
</script>
