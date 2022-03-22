const filterMixins = {
  computed: {
    filterProjectList() {
      if (Array.isArray(this.projectList) && this.projectList.length > 0) {
        return this.projectList.filter((item) => item.projectStatus);
      }
    },
  },
};

export default filterMixins;
