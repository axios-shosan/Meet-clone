<template>
    <div>
      <button class="uploadingBtn">
        <label style="margin-bottom : 0;" for="file-upload" >
          Upload file
        </label>
      </button>
      <input
        id="file-upload"
        ref="file_input"
        class="uploadingBtn"
        v-show="false"
        type="file"
        multiple
        v-bind:name="uploadName"
        @change="fileSelected"
      >
      <p v-show="uploadStarted">Uploading...</p>
    </div>
    <div>
      <!-- <button v-show="!uploadStarted" v-on:click="startUpload">Start Upload</button>       -->
      <button v-show="uploadStarted" v-on:click="cancelUpload">Cancel Upload</button>
    </div>

</template>

<script>
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default {
  name: "UploadsContainer",
  data() {
    return {
      uploadStarted: false,
      uploadName: "files",
      uploadUrl: "http://localhost:3000/api/upload",
      formData: null
    };
  },

  methods: {
    fileSelected(event) {
        if (event.target.files.length === 0) {
            return;
        }

        let files = event.target.files;
        let name = event.target.name;
        var formData = new FormData();


        for (let index = 0; index < files.length; index++) {
          formData.append(name, files[index], files[index].name)
        }

        this.formData = formData
        
        for(var pair of this.formData.entries()) {
            console.log(pair[0]+', '+pair[1] );
        }

        this.startUpload()
    },

    startUpload() {
    //   this.$set(this, "uploadStarted", true);
    this.uploadStarted = true
      this.uploadData(this.formData);
    },

    cancelUpload() {
      if (this.uploadStarted) {
        source.cancel();
      }
    //   this.$set(this, "uploadStarted", false);
    this.uploadStarted = false
    },

    uploadData(formData) {
      if (this.formData == null) {
        return;
      }
      axios
        .post(this.uploadUrl, formData, {
          cancelToken: source.token
        })
        .then(response => {
          if (response.data.length === 0) {
            alert("File not uploaded. Please check the file types");
            return;
          }
          this.updateFilesList(response.data);
        //   this.$set(this, "formData", null);
        this.formData = null
        })
        .catch(() => {
          alert("Error occured while using axios.post in uploadsContainer");
        })
        .then(() => {
        //   this.$set(this, "uploadStarted", false);
        this.uploadStarted = false
        });
    },

    updateFilesList(files) {
      this.$emit("files-uploaded", files);
    }
  }
};
</script>

<style scoped>
  .uploadingBtn{
    color: #B1D0E0;
    padding: 10px 20px;
    border-radius: 7px;
    border: none;
    background-color: #1A374D;
    margin-bottom: 0;
  }
</style>