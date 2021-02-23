<template>
  <div class="topology-editor-toolbar">
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>撤销</span>
      </template>
      <span class="command" data-command="undo">
        <a-icon type="undo" />
      </span>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>重复</span>
      </template>
      <span class="command" data-command="redo">
        <a-icon type="undo" />
      </span>
    </a-tooltip>
    <span class="separator"/>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>复制</span>
      </template>
      <span class="command" data-command="copy">
        <a-icon type="copy" />
      </span>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>粘贴</span>
      </template>
      <span class="command" data-command="paste">
        <a-icon type="snippets" />
      </span>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>删除</span>
      </template>
      <span class="command" data-command="delete">
        <a-icon type="delete" />
      </span>
    </a-tooltip>
    <span class="separator"/>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>放大</span>
      </template>
      <span class="command" data-command="zoomIn">
        <a-icon type="zoom-in" />
      </span>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>缩小</span>
      </template>
      <span class="command" data-command="zoomOut">
        <a-icon type="zoom-out" />
      </span>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>实际大小</span>
      </template>
      <span class="command" data-command="resetZoom">
        <a-iconfont type="icon-actualsize" />
      </span>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>适应屏幕</span>
      </template>
      <span class="command" data-command="autoFit">
        <a-iconfont type="icon-yidong1" />
      </span>
    </a-tooltip>
    <span class="separator"/>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>移到上一层</span>
      </template>
      <span class="command" data-command="toFront">
        <a-iconfont type="icon-shangyiyiceng" />
      </span>
    </a-tooltip>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>移到下一层</span>
      </template>
      <span class="command" data-command="toBack">
        <a-iconfont type="icon-xiayiyiceng" />
      </span>
    </a-tooltip>
  </div>
</template>
<script>
export default {
  name: 'topology-demo-toolbar'
}
</script>
<style lang="less" scoped>
@topologt-prefix: topology-editor;
.@{topologt-prefix}-toolbar {
  position: absolute;
  top: 0px;
  left: 0px;
  text-align: left;
  width: 100%;
  height: 50px;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #E9E9E9;
  box-shadow: 0 8px 12px 0 rgba(0, 52, 107, 0.04);
  z-index: 1;
  .command {
    display: inline-block;
    margin: 0 6px;
    line-height: 27px;
    border: 1px solid rgba(2, 2, 2, 0);
    border-radius: 2px;

    i {
      margin: 0 6px;
      font-size: 14px;
      &.anticon {
        font-size: 16px;
      }
    }

    &:nth-of-type(1) {
      margin-left: 24px;
    }

    &:hover {
      border: 1px solid #E9E9E9;
      cursor: pointer;
    }
  }
  .separator {
    margin: 4px;
    border-left: 1px solid #E9E9E9;
  }

  .icon-select.disable {
    background: #EEE;
  }

  .disable {
    color: rgba(0, 0, 0, 0.25);

    &:hover {
      border: 1px solid rgba(2, 2, 2, 0);
      cursor: default;
    }
  }
}
</style>