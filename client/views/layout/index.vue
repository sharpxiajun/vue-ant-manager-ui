/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 18:34:47 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 16:31:40
 */
<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="header-left">
        <img width="40" src="@/assets/images/logo.png" />
        <strong>UIM</strong>
        <span>
          Beta
          <a-iconfont type="icon-diamond" />
        </span>
      </div>
      <div class="header-center">
        <a-menu
            v-model="selectedKeys"
            mode="horizontal"
            theme="dark"
          >
          <template v-for="menu in initMenus">
              <a-sub-menu :key="menu.name" v-if="menu.children && menu.children.length > 0">
                <span slot="title">
                  <a-iconfont :type="menu.meta.icon" />
                  <span>{{ menu.meta.name }}</span>
                </span>
                <a-menu-item v-for="subMenu in menu.children" :key="subMenu.name" :class="subMenu.meta.active">
                  <router-link :to="subMenu.path" ref="noopener noreferrer">
                    <a-iconfont :type="subMenu.meta.icon" />
                    <span>{{ subMenu.meta.name }}</span>
                  </router-link>                   
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item v-else :key="menu.name" :class="menu.meta.active">
                <router-link :to="menu.path" ref="noopener noreferrer">
                  <a-iconfont :type="menu.meta.icon" />
                  <span>{{ menu.meta.name }}</span>
                </router-link>
              </a-menu-item> 
          </template>         
        </a-menu>     
      </div>
      <div class="header-right">
        <div class="mr-15">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>发送信息</span>
            </template>
            <a-icon type="message" />
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>查看帮助</span>
            </template>
            <a-icon type="question-circle" />
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>系统设置</span>
            </template>
            <a-icon type="setting" />
          </a-tooltip>
        </div>
        <div class="account">
          <img
            width="30"
            height="30"
            src="~@/assets/images/user_logo.png"
            alt
          />
          <div class="account-info">
            <div class="account-info-head">
              <div class="account-info-head-left">
                <img
                  width="36"
                  height="36"
                  src="~@/assets/images/user_logo.png"
                  alt
                />
              </div>
              <div class="account-info-head-right">
                <div class="usernick">{{ userinfo.usernick }}</div>
                <div class="username">{{ userinfo.userName }}</div>
              </div>
            </div>
            <div class="account-info-content">
              <div class="account-info-content-item" @click="logout">
                <a-icon type="logout" />
                <span>注销</span>
              </div>
            </div>
          </div>
        </div>
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
                  <a-menu-item v-for="subMenu in menu.children" :key="subMenu.name" :class="subMenu.meta.active">
                    <router-link :to="subMenu.path" ref="noopener noreferrer">
                      <a-iconfont :type="subMenu.meta.icon" />
                      <span>{{ subMenu.meta.name }}</span>
                    </router-link>                   
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item v-else :key="menu.name" :class="menu.meta.active">
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
        collapsed: true,
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
      logout() {
        console.log('logout')
      }
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
    .header-center {
      display: flex;
    }
    .header-right {
      display: flex;
      align-items: center;
      .anticon {
        color: @shadow-secondary-text;
        font-size: 16px;
        margin-right: 15px;
        cursor: pointer;
      }
      .account {
            padding: 0 20px;
            > img {
              margin-top: -2px;
              cursor: pointer;
            }

            &:hover {
              .account-info {
                display: block;
              }
            }
            &-info {
              display: none;
              position: fixed;
              top: @layout-header-height - 3;
              right: 0;
              z-index: 99;
              width: 286px;
              background: @input-dark-bg;

              &-head {
                display: flex;
                align-items: center;
                padding: 15px;
                line-height: normal;

                &-left {
                  margin-right: 8px;
                }

                &-right {
                  line-height: normal;
                  font-family: Alibaba-PuHuiTi-Regular, 'PingFang SC',
                    'Hiragino Sans GB';
                  .usernick {
                    color: @shadow-primary;
                  }
                  .username {
                    color: @shadow-secondary-text;
                  }
                }
              }
              &-content {
                &-item {
                  border-top: 1px solid @shadow-border;
                  line-height: 36px;
                  color: @shadow-primary;
                  padding: 0 15px;
                  cursor: pointer;
                  &:hover {
                    background-color: @menu-dark-item-active-bg;
                  }
                }
              }
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

        // 设置菜单高亮是的按钮的颜色
        each(@shadowHover, {
            @class: ~"shadow-@{key}";

            .@{class}.@{ant-prefix}-menu-item-selected, .@{class}.@{ant-prefix}-menu-item:hover {
              .anticon {
                color: @value;
              }
            }
          }
        ) 
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