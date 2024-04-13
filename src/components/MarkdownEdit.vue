<template>

    <div class="markdown-container">
        <el-input v-model="blogName" placeholder="博客名称（格式需要满足:yyyy-MM-dd-title）"></el-input>
        <el-input type="textarea" :rows="30" v-model="markdownText"></el-input>
        <el-button type="success" round @click="submitMarkdown">提交</el-button>
        <div class="rendered-markdown" v-html="renderedMarkdown"></div>
    </div>
</template>

<style>
.markdown-container {
    text-align: left;
}

.el-button {
    margin-top: 10px;
}

.rendered-markdown {
    /* 添加其他样式 */
}
</style>

<script>
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import { Message } from 'element-ui';

export default {
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
        };
    },
    watch: {
        markdownText() {
            this.renderMarkdown();
        },
    },
    methods: {
        renderMarkdown() {
            const md = new MarkdownIt();
            this.renderedMarkdown = md.render(this.markdownText);
        },
        submitMarkdown() {
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
                    } else if (response.data.code >= 400) {
                        Message.success('上传失败！');
                    }

                })
                .catch(error => {
                    // 处理错误
                    console.error(error);
                });
        },
    },
};
</script>