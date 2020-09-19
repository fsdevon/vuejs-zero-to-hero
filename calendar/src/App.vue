<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">
        <awesome-icon :icon="['fas', 'home']" />Home </router-link
      >|
      <router-link to="/about">About</router-link>-->
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">Tracking</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item class="right-menu">
          <el-dropdown :hide-on-click="false">
            <div class="avatar-wrapper">
              <el-avatar
                size="small"
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              ></el-avatar>Fsdevon
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item divided icon="el-icon-plus">Sign out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <div>
              <svg-icon data="@icon/language.svg" />
              <!-- <svg-icon :data="languageIcon" class="international-icon" /> -->
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>English</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "App"
})
export default class extends Vue {
  private activeIndex2 = "1";

  private handleSelect(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
}
</script>

<style lang="scss">
#nav {
  padding-bottom: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .right-menu {
    float: right;

    > div {
      padding: 0 12px;
    }
  }
}

.avatar-wrapper {
  display: flex;
  align-items: center;

  .el-avatar {
    margin-right: 8px;
  }
}
</style>
