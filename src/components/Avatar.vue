<template>

  <div>
    <el-avatar :src="imageSrc"></el-avatar>
  </div>

</template>


<script>
import avatarImage from '@/assets/logo.png';
export default {
  name: 'Avatar',
  data() {
    return {
      imageSrc: avatarImage
    };
  },
}
</script>