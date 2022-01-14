<template>
  <div>
    <h1>Files List</h1>

    <ul>
      <UploadedFile v-for="file in files" :key="file" v-bind:file="file"  v-on:delete-file="deleteFile"/>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import UploadedFile from "./UploadedFile";

export default {
  name: "UploadedFilesList",
  data() {
    return {
      files: []
    };
  },
  components: {
    UploadedFile
  },
  methods: {
    fetchFiles() {
    // let self = this;
      axios
        .get("http://localhost:3000/api/files")
        .then(response => {
          this.files = response.data
        }).catch(err=> console.error("weird error on axios for uploadedFilesList",err));
    },
    filesUploaded(files) {
        files.forEach(file => {
            this.files.push(file)
        })
    },

    deleteFile(file) {
        if (confirm('Are you sure you want to delete the file?')) {
            axios.delete('http://localhost:3000/api/files/' + file._id)
            .then(() => {
                let fileIndex = this.files.indexOf(file)
                this.files.splice(fileIndex, 1)
            })
            .catch(() => {
                console.log("Error deleting file")
            })
        }
    }
  },
  mounted() {
    this.fetchFiles();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>