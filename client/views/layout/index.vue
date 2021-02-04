/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 18:34:47 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 23:32:26
 */
<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="header-left">
        <img width="40" src="@/assets/images/logo_BI.png" />
        <strong>ACT</strong>
        <span>
          Beta
          <a-iconfont type="icon-diamond" />
        </span>
      </div>
    </a-layout-header>
    <a-layout-content>
      <section class="sidemenu-layout">
        <div :class="['side-menu', collapsed && 'is-collapsed']">
          <div class="collapse-btn">
            <a-icon
              @click="collapsed = !collapsed"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            />
          </div>
            <a-menu
              v-model="selectedKeys"
              mode="inline"
              :inlineCollapsed="collapsed"
              theme="dark"
            >
            <template v-for="menu in initMenus">
                <a-sub-menu :key="menu.name" v-if="menu.children && menu.children.length > 0">
                  <span slot="title">
                    <a-iconfont :type="menu.meta.icon" />
                    <span>{{ menu.meta.name }}</span>
                  </span>
                  <a-menu-item v-for="subMenu in menu.children" :key="subMenu.name">
                    <router-link :to="subMenu.path" ref="noopener noreferrer">
                      <a-iconfont :type="subMenu.meta.icon" />
                      <span>{{ subMenu.meta.name }}</span>
                    </router-link>                   
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item v-else :key="menu.name" class="menu.meta.active">
                  <router-link :to="menu.path" ref="noopener noreferrer">
                    <a-iconfont :type="menu.meta.icon" />
                    <span>{{ menu.meta.name }}</span>
                  </router-link>
                </a-menu-item> 
            </template>         
          </a-menu>          
        </div>
        <div class="main">
          <transition name="fadeinright" mode="out-in">
            <router-view></router-view>
          </transition>          
        </div>
      </section>

    </a-layout-content>
  </a-layout>
</template>

<script>
  export default {
    name: 'layout',
    data() {
      return {
        collapsed: false,
        hasMenuGroup: false,
        selectedKeys: []
      }
    },
    computed: {
      initMenus() {
        return this.$router.options.routes[0].children
      }
    },
    created() {
      
    },
    mounted() {
      console.log('initMenus:', this.initMenus)
    },
    methods: {
    }
  }
</script>

<style lang="less">
@import '~@/assets/less/var.less';
.layout {
  height: 100vh;
  background: @shadow-bg-1;
  min-width: 1360px;
  .@{ant-prefix}-layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    position: relative;
    z-index: 100;
    .header-left {
      line-height: normal;
      display: flex;
      align-items: center;
      margin-left: 15px;
      strong {
        color: @shadow-title;
        font-size: 24px;
        margin-left: 20px;
      }
      span {
        color: @yellow;
        margin-left: 20px;
        font-size: 12px;
        .anticon {
          color: @gold-6;
          font-size: 14px;
        }
      }    
    }
  }
  .@{ant-prefix}-layout-content {
    min-height: calc(~'100% - 64px - 69px');
    > * {
      height: 100%;
    }
    .sidemenu-layout {
      display: flex;
      .side-menu {
        width: 225px;
        height: 100%;
        overflow: auto;
        background: @menu-dark-bg;
        transition: @transition;

        @gutter: 24px;
        @indent: 8px;

        .@{ant-prefix}-menu-item {
          a {
            font-size: 14px;
            .anticon {
              font-size: 16px;
              color: @shadow-secondary-text;
            }
          }
        }

        .@{ant-prefix}-menu-submenu {
          &-title {
            span {
              .anticon {
                font-size: 16px;
                color: @shadow-secondary-text;
              }
              span {
                color: @shadow-secondary-text;
              }
            }
          }
        }
        
        &.is-collapsed {
          width: @menu-collapsed-width;
          .collapse-btn {
            padding: 5px 17px;
            transition: @transition;
          }

          @{deep} .@{ant-prefix}-menu {
            .anticon {
              font-size: 18px;
            }
            .@{ant-prefix}-menu-item-group-title {
              height: 0;
              padding: 0;
              overflow: hidden;
            }
          }
        }

        .collapse-btn {
          color: @shadow-secondary-text;
          padding: 5px @gutter - @indent;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: @shadow-title;
          }
        }
      }
      .main {
        flex: 1;
        padding: 15px;
        overflow: auto;
      } 
    }
  }
}
</style>