<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['mailTask']}}</div>
        <div class="panelBody">
            <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>{{i18n['mailTask.to']}}：</div>
                <a-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.to"
                          @change="(value) => {onChange('to', value)}" />
            </div>
            <div class="panelRow">
                <div>{{i18n['mailTask.subject']}}：</div>
                <a-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.subject"
                          @change="(value) => {onChange('subject', value)}" />
            </div>
            <div class="panelRow">
                <div>{{i18n['mailTask.content']}}：</div>
                <a-input style="width:90%; font-size:12px"
                          type="textarea"
                          :rows="4"
                          :disabled="readOnly"
                          :value="model.content"
                          @change="(value) => {onChange('content', value)}" />
            </div>
        </div>
    </div>
</template>
<script>
  import DefaultDetail from "./DefaultDetail";
  export default {
    inject: ['i18n'],
    components: {
      DefaultDetail
    },
    props: {
      model: {
        type:Object,
        default: ()=>({}),
      },
      onChange: {
        type: Function,
        default: ()=>{}
      },
      readOnly:{
        type: Boolean,
        default: false,
      }
    },
  }
</script>
