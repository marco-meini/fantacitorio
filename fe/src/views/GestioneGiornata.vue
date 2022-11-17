<template>
  <div>
    <PageTitle title="Gestione Giornate" />
    <router-link to="/gestione-giornate" class="btn btn-primary btn-sm mb-2">&lt;&nbsp;Indietro</router-link>
    <Loading :loading="loading" />
    <GenericError v-if="error" />
    <Result class="col-lg-6" :result="result" />
    <form v-if="!error && !loading">
      <div class="row mb-3">
        <div class="col-lg-3">
          <label for="date" class="form-label">Data puntata</label>
          <input type="date" class="form-control" id="date" v-model="giornata.data" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Politico</th>
                <th>Punteggio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of giornata.punteggi">
                <td>
                  <v-select id="politico" :options="politici" :reduce="(label) => label.code" v-model="item.id"></v-select>
                </td>
                <td style="width: 10px">
                  <input type="number" class="form-control" v-model="item.punteggio" />
                </td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="removeElement(index)">- elimina</button>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <button type="button" class="btn btn-primary btn-sm" @click="addElement()">+ aggiungi</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button v-if="!saving" type="button" class="btn btn-success" @click="save">Salva</button>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import { GiocoAPIs } from "../api/gioco";
import GenericError from "../components/GenericError.vue";
import Loading from "../components/Loading.vue";
import PageTitle from "../components/PageTitle.vue";
import Result from "../components/Result.vue";

export default {
  data: () => ({
    loading: false,
    saving: false,
    error: false,
    result: null,
    politici: [],
    giornata: {
      data: moment().format("YYYY-MM-DD"),
      punteggi: []
    }
  }),
  methods: {
    async init() {
      try {
        this.loading = true;
        this.saving = false;
        this.error = false;
        this.politici = [];
        this.result = null;
        this.politici = await GiocoAPIs.politiciSelect();
        let edit = this.$route.params && this.$route.params.puntata;
        let data = edit ? moment(this.$route.params.puntata) : moment();
        this.giornata = {
          data: data.format("YYYY-MM-DD"),
          punteggi: edit ? await GiocoAPIs.punteggiGiornata(this.$route.params.puntata) : []
        };
      } catch (e) {
        console.error(e);
        this.error = true;
      }
      this.loading = false;
    },
    addElement() {
      this.giornata.punteggi.push({ punteggio: 0 });
    },
    removeElement(index) {
      this.giornata.punteggi.splice(index, 1);
    },
    async save() {
      try {
        this.loading = true;
        this.result = await GiocoAPIs.saveGiornata(this.giornata);
        //if (this.result.success) this.$router.replace({ path: "/gestione-giornate" });
      } catch (e) {
        this.error = true;
        console.error(e);
      }
      this.loading = false;
    }
  },
  created() {
    this.init();
  },
  components: { Loading, GenericError, Result, PageTitle }
};
</script>
