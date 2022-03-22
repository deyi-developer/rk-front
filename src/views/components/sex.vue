<!--  -->
<template functional>
  <span>
    <el-tag v-if="props.sex == '0'">男</el-tag>
    <el-tag v-else type="danger">女</el-tag>
  </span>
</template>
<script>
export default {
  functional: true,
};
</script>
