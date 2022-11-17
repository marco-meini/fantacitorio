<template>
  <div>
    <PageTitle title="Puntate" />
    <GenericError v-if="error" />
    <Loading :loading="loading" />
    <div class="row">
      <div v-if="!loading" class="col-4 col-md-2">
        <ul class="list-group">
          <li v-for="item in puntate" class="list-group-item" :class="{ active: active(item.puntata_pn) }" @click="selectPuntata(item)">{{ formatDate(item.puntata_pn, "DD.MM.YYYY") }}</li>
        </ul>
      </div>
      <div class="col-8 col-md-10">
        <Loading :loading="loadingPuntata" />
        <div v-if="!loadingPuntata" class="row row-cols-1 row-cols-md-2">
          <div class="col" v-for="item in squadre">
            <table class="table table-bordered">
              <thead class="table-dark">
                <tr>
                  <th colspan="2" class="text-center">
                    {{ item.nome }} <small>({{ item.giocatore }})</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="2" class="lead fw-bold">Totale:&nbsp;{{ item.totale }}</td>
                </tr>
                <tr v-for="(pl, index) in item.politici" :class="{ 'fw-semibold': pl.punteggio > 0 }">
                  <td>{{ pl.nome }}</td>
                  <td>{{ pl.punteggio }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { GiocoAPIs } from "../api/gioco";
import GenericError from "../components/GenericError.vue";
import Loading from "../components/Loading.vue";
import PageTitle from "../components/PageTitle.vue";

export default {
  data() {
    return {
      loading: false,
      loadingPuntata: false,
      error: false,
      puntate: [],
      selected: null,
      squadre: []
    };
  },
  methods: {
    formatDate(date, format) {
      return moment(date).format(format);
    },
    active(data) {
      return this.selected === moment(data).format("YYYYMMDD");
    },
    async fetchData() {
      try {
        this.loading = true;
        this.error = false;
        this.puntate = await GiocoAPIs.giornate();
        this.selected = this.formatDate(this.puntate[0].puntata_pn, "YYYYMMDD");
        this.squadre = await GiocoAPIs.puntata(this.selected);
      } catch (e) {
        console.error(e);
        this.error = true;
      }
      this.loading = false;
    },
    async selectPuntata(item) {
      try {
        this.loadingPuntata = true;
        this.error = false;
        this.selected = this.formatDate(item.puntata_pn, "YYYYMMDD");
        this.squadre = await GiocoAPIs.puntata(this.selected);
      } catch (e) {
        console.error(e);
        this.error = true;
      }
      this.loadingPuntata = false;
    }
  },
  created() {
    this.fetchData();
  },
  components: { PageTitle, GenericError, Loading }
};
</script>
