<template>
    <div>
        <div class="panelRow">
            <div>{{i18n['label']}}：</div>
            <a-input style="width:90%; font-size:12px"
                      :disabled="readOnly"
                      :value="model.label"
                      @change="(value) => {onChange('label', value)}" />
        </div>
        <div class="panelRow">
            <a-checkbox @change="(value) => onChange('hideIcon', value)"
                         :disabled="readOnly"
                         :checked="!!model.hideIcon">{{i18n['hideIcon']}}</a-checkbox>
        </div>
    </div>
</template>
<script>
  export default {
    inject: ['i18n'],
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
