<template>
    <div class="mjc-btn" :style="{color:fontColor}">
        <slot></slot>
    </div>
</template>
<script>
export default{
    props:["fontColor"]
}
</script>
<style scoped lang="less">
    .mjc-btn{
        cursor:pointer;
        display:inline-block;
        color:white;
        font-weight:600;
        padding:8px 16px;
        background:#ff0000;
        border-radius: 8px;
    }
</style>