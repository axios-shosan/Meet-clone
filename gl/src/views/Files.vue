<template>

    <div class="container">
      <div class="content">
          <h3 class="title">Files</h3>
          <uploaded-files class="filesList" ref="filesList" v-bind:files="files"></uploaded-files>
          <uploads-container v-on:files-uploaded="filesUploaded"></uploads-container>
      </div>
    </div>


</template>

<script>
// import axios from "axios";
import UploadedFiles from "../components/UploadedFilesList";
import UploadsContainer from '../components/UploadsContainer.vue'

export default {
  name: "Files",
  data() {
    return {
      files: []
    };
  },
  components: {
    UploadedFiles,
    UploadsContainer
  },
  methods: {
  filesUploaded(files) {
    this.$refs.filesList.filesUploaded(files)
  }
}
};
</script>

<style scoped>


.title{
  margin-top : O;
}
.container {
    color : #1A374D;
    background-color: transparent;
    margin : 0 10px;
}

.content {
  background: rgba(255,255,255,0.3);;
  padding: 3em;
  padding-top : 1em;
  /* width : 18vw; */
  height : 50vh; 
  border-radius: 20px;
  border-left: 1px solid rgba(255,255,255,0.3);;
  border-top: 1px solid rgba(255,255,255,0.3);;
  backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0,0,0,0.2);
  text-align: center;
  position: relative;
  transition: all 0.2s ease-in-out;

}

p {
  font-weight: 500;
  opacity: 0.7;
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 60px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  text-shadow: 2px 2px 6px #00000040;
}





.drop {
  background: rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.3);
  box-shadow: 10px 10px 60px -8px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
  position: relative;
}
  .drop-1 {
    height: 80px;
    width: 80px;
    top: -300px;
    left: -40px;
    z-index: -1;
  }
  
  .drop-2 {
    height: 80px;
    width: 80px;
    bottom: -30px;
    right: -10px;
  }
  
  .drop-3 {
    height: 100px;
    width: 100px;
    bottom: 120px;
    right: -50px;
    z-index: -1;
  }
  
  .drop-4 {
    height: 120px;
    width: 120px;
    top: -60px;
    right: -60px;
  }
  
  .drop-5 {
    height: 60px;
    width: 60px;
    bottom: 170px;
    left: 90px;
    z-index: -1;
  }

.container:hover {
border-radius: 20px;
box-shadow: 0 0 5px #03e9f4,
            0 0 10px #03e9f4,
            0 0 20px #03e9f4,
            0 0 30px #03e9f4;
}

</style>