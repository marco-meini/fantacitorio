<template>
  <div>
    <PageTitle title="Gestione Giornate" />
    <Loading :loading="loading" />
    <GenericError v-if="error" />
    <router-link to="/gestione-giornate" class="btn btn-primary btn-sm mb-2">&lt;&nbsp;Indietro</router-link>
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

export default {
  data: () => ({
    loading: false,
    saving: false,
    error: false,
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
        this.giornata = {
          data: moment().format("YYYY-MM-DD"),
          punteggi: []
        };
        this.politici = await GiocoAPIs.politiciSelect();
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
    save() {
      alert(JSON.stringify(this.giornata));
    }
  },
  created() {
    this.init();
  }
};
</script>
