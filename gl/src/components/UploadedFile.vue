<template>
  <div>
    <div>
      <a v-bind:href="'/file/download/' + file.encodedName" v-on:click="downloadFile" download>{{ file.name }}</a>
      <button v-on:click="deleteFile(file)">Delete</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import FileDownload from "js-file-download";

export default {

  components : {
  },

  props: ["file"],

  name: "UploadedFile",
  methods: {

    deleteFile (file) {
      this.$emit("delete-file", file);
    },

    downloadFile(event) {
      let source = event.target.href
      source = source.split(':8080')[1]
      axios
          .get('http://localhost:3000'+source, {
              responseType: "blob",
          })
          .then(response => {
              FileDownload(response.data, source);
              console.log(response);
          }).catch(err=> console.error("weird error on axios when requesting to download a file",err));
    }
  }
};
</script>

<style scoped>

.btn{
    font-size: 25px;
    padding : 5px;

    border-radius:15px;
    background-color: #A2416B;
}
</style>