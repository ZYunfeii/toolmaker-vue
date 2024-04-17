<template>
    <div class="login-container">
        <h1 class="login-title">云飞后台管理登录</h1>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="Username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" placeholder="Password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { required: true, message: 'Please enter your username', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please enter your password', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        login() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // Perform login action
                    // You can make an API request to authenticate the user here
                    // For simplicity, we'll just log the form data
                    console.log('Login form data:', this.loginForm);
                    this.$axios.post('/api/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                    })
                        .then(response => {
                            console.log(response.data);
                            if (response.data.code === 200) {
                                Message.success({
                                    message: '登录成功！',
                                    onClose: () => {
                                        this.$router.push('/menu2');
                                    }
                                });
                            } else if (response.data.code >= 400) {
                                Message.success('登录失败');
                            }

                        })
                        .catch(error => {
                            // 处理错误
                            console.error(error);
                        });
                } else {
                    console.log('Form validation failed');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-title {
    font-family: 'Arial', sans-serif;
    /* 替换为您喜欢的字体 */
    font-size: 24px;
    margin-bottom: 20px;
}

.login-form {
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>