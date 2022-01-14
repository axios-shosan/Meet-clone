<template>

</template>

<script>
import axios from 'axios'
import FileDownload from "js-file-download";
export default {
  data() {
    return {
      source: ""
    };
  },
  methods: {
    downloadFile(source) {
        source = source.split(':8080')[1]
    axios
        .get('http://localhost:3000'+source, {
            responseType: "blob",
        })
        .then(response => {
            this.source = response.data
            FileDownload(response.data, source);
            console.log(response);
        }).catch(err=> console.error("weird error on axios when requesting to download a file",err));
    }
  }
};
</script>