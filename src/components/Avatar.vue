<template>
  <div>
    <!-- 显示用户头像 -->
    <el-avatar :src="imageSrc"></el-avatar>
    <!-- 根据登录状态显示文字或链接 -->
    <span v-if="isLoggedIn">{{ userName }}</span>
    <router-link v-else to="/login">登录</router-link>
  </div>
</template>

<script>
import avatarImage from '@/assets/logo.png';
export default {
  name: 'Avatar',
  data() {
    return {
      imageSrc: avatarImage,
      isLoggedIn: false,
      userName: null
    };
  },
  mounted() {
    // 组件创建时加载用户登录状态
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // 使用this.$axios发起请求判断用户是否已登录
      this.$axios.get('/api/isLogin', { withCredentials: true })
        .then(response => {
          // 如果已登录，更新状态并显示用户名
          if (response.data.code === 200) {
            this.isLoggedIn = true;
            this.userName = response.data.data; 
          }
        })
        .catch(error => {
          // 如果未登录，显示错误信息
          console.error('Error checking login status:', error);
          this.isLoggedIn = false;
          this.userName = null;
        });
    }
  }
};
</script>
