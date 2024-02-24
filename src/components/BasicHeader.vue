<template>
  <div class="basic-header">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="title-logo" src="../assets/logo.png" />
          <div class="title">kkoj</div>
        </div>
      </a-menu-item>
      <a-menu-item key="1">Home</a-menu-item>
      <a-menu-item key="2">Solution</a-menu-item>
      <a-menu-item key="3">Cloud Service</a-menu-item>
      <a-menu-item key="4">Cooperation</a-menu-item>
    </a-menu>
  </div>
</template>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title-logo {
  height: 50px;
  cursor: pointer;
}

.title {
  margin-left: 2px;
  color: #42b983;
}
</style>
