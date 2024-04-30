<template>
    <el-container>
        <el-header>
            <el-row :gutter="20" class="align-center">
                <el-col :span="6">
                    博客名称（格式需要满足:yyyy-MM-dd-title）:
                </el-col>
                <el-col :span="10">
                    <el-input v-model="blogName"></el-input>
                </el-col>
                
            </el-row>


        </el-header>
        <el-container>
            <el-aside width="50%">
                <el-input type="textarea" :rows="40" v-model="markdownText"></el-input>
                <el-col :span="2" style="padding: 0;">
                    <el-button type="success" round :disabled="buttonDisabled" @click="submitMarkdown">提交</el-button>
                </el-col>
            </el-aside>
            <el-main>
                <div class="markdown-container">
                    <vue-markdown :source="markdownText"></vue-markdown>
                </div>
            </el-main>
        </el-container>
    </el-container>

</template>

<style scoped>
.markdown-container {
    text-align: left;
}

.markdown-container {
    text-align: left;
}

.el-button {
    margin-top: 10px;
}

.align-center {
    display: flex;
    align-items: center;
}

.rendered-markdown {
    /* 添加其他样式 */
}

.left-align {
    text-align: left;
}
</style>

<script>
import VueMarkdown from 'vue-markdown';
import axios from 'axios';
import { Message } from 'element-ui';

export default {
    components: {
        VueMarkdown
    },
    created() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");

        const title = "your-title"; // 替换成你想要的标题

        this.blogName = `${year}-${month}-${day}-${title}`;
        this.markdownText = this.markdownText.replace(/date:.*\n/, `date: ${year}-${month}-${day} ${hours}:${minutes}:${seconds} +/-TTTT\n`);
    },
    data() {
        return {
            blogName: '',
            markdownText: `---
title: 博客名称
date: 2024-04-02 14:28:28 +/-TTTT
categories: [生活, "旅游"]
tags: [旅游]     # TAG names should always be lowercase
---
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .gallery {
            column-count: 2; /* 设置列数 */
            column-gap: 10px; /* 设置列之间的间隙 */
        }
        .gallery img {
            width: 100%;
            break-inside: avoid; /* 避免图片跨列显示 */
            margin-bottom: 10px; /* 设置图片之间的间隙 */
        }
    </style>
</head>
<body>

<div class="gallery">
    <img src="https://onedrive.live.com/embed?resid=477C91427BD93A4E%21234092&authkey=%21AJgtIYxn1orhUzg&width=660" alt="Photo 1">
    <img src="https://onedrive.live.com/embed?resid=477C91427BD93A4E%21237615&authkey=%21ABZAykkt4IVZrLA&height=660" alt="Photo 2">
    <img src="https://onedrive.live.com/embed?resid=477C91427BD93A4E%21234098&authkey=%21AGyH7YGb_ntyqWQ&height=660" alt="Photo 3">
    <img src="https://onedrive.live.com/embed?resid=477C91427BD93A4E%21234090&authkey=%21AG3M_A5rHXidS3A&width=660" alt="Photo 4">
    <img src="https://onedrive.live.com/embed?resid=477C91427BD93A4E%21234101&authkey=%21AN_jhU1A9JPfknU&width=660" alt="Photo 5">
    <!-- 更多图片 -->
</div>

</body>`
            ,
            renderedMarkdown: '',
            placeholderMarkdown: '在此处输入 Markdown 文本',
            buttonDisabled: false
        };
    },
    methods: {
        submitMarkdown() {
            this.buttonDisabled = true;
            axios.post('/api/blog/submit', {
                blogName: this.blogName,
                markdown: this.markdownText,
            })
                .then(response => {
                    console.log(response.data);
                    if (response.data.code === 200) {
                        Message.success({
                            message: '上传成功！',
                            onClose: () => {
                                this.$router.push('/menu2');
                            }
                        });
                    } else if (response.data.code === 40001) {
                        Message.error({
                            message: '删除失败，未认证！',
                        })
                        this.$router.push('/login');
                    } else {
                        Message.error({
                            message: '删除失败！',
                        })
                    }
                    this.buttonDisabled = false;
                })
                .catch(error => {
                    // 处理错误
                    console.error(error);
                    this.buttonDisabled = false;
                });
        },
    },
};
</script>