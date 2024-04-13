<template>
    <div class="test">
        <el-button @click="visible = true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
        </el-dialog>
    </div>


    <!-- import JavaScript -->

</template>

<script>
export default {
name: 'Test',
data () {
    return { visible: false }
}
}
</script>