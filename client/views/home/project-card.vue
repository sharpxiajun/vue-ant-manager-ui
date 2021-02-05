<template>
  <div class="project-card">
    <div class="project-card-main">
      <div class="project-card-head">
        <div class="project-card-head-content">
          <a-iconfont :type="userIcon" v-if="userIcon" class="mr-5" />
          <span>{{ data.workspaceName }}</span>
        </div>
        <div class="project-card-head-oper" @click.stop="toSpace">
          <a-icon type="setting" title="空间设置" />
        </div>
      </div>
      <div class="project-card-body">
        <p>
          <label>创建：</label>
          <span>{{ data.creator }}</span>
        </p>
        <p>
          <label>项目负责人：</label>
          <span>{{ data.owner }}</span>
        </p>
      </div>
    </div>
    <div class="project-card-foot">
      <div>{{ data.memberCnt }}人</div>
      <div>
        <a-iconfont type="icon-diamond" />
        {{ role }}
      </div>
    </div>
  </div>
</template>
<script>
import {roles, userIconTypes} from '@/config/dics'
export default {
  name: 'ProjectCard',
  props: {
    data: {
      type: Object,
      default: {
        workspaceName: '亚鸿项目',
        workspaceType: 1,
        creator: 'xsharp',
        owner: 'ACT',
        memberCnt: '任子行集团'
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    userIcon() {
      return userIconTypes[String(this.data.workspaceType)]
    },
    role() {
      return roles[this.data.roleId]
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: @gray10;
  cursor: pointer;
  &-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px 15px 0 15px;    
  }
  &-head {
    display: flex;
    justify-content: space-between;
    color: @gray4;

    &-content {
      font-size: 1.6vh;
    }
    &-oper {
      padding: 1px 3px;
    }
  }
  &-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    label {
      color: @gray2;
    }
  }
  &-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 40px;
    border-top: 1px solid @deep-border;
    color: @gray2;

    .anticon {
      font-weight: bold;
      color: fade(@primary-color, 80%);
    }
  }
}
</style>