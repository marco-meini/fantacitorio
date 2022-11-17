<template>
  <div>
    <PageTitle title="Punteggi" />
    <GenericError v-if="error" />
    <Loading :loading="loading" />
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
      error: false
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        this.error = false;
        //this.squadre = await GiocoAPIs.squadre();
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
