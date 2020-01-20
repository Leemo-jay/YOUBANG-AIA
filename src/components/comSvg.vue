<template>
  <span>
    <!-- 不選中 -->
    <span class="center" v-if='type == "unchecked"'>
      <svg style="width: 23px;height: 23px;" viewBox="0 0 96 96" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 56 (81588) - https://sketch.com -->
        <title>编组 6</title>
        <desc>Created with Sketch.</desc>
        <g id="頁面-1" stroke="none" stroke-width="3" fill="none" fill-rule="evenodd">
          <g id="编组-6">
            <circle id="椭圆形备份" stroke="#6A6A6A" stroke-width="3" fill-opacity="0" fill="#D8D8D8" cx="48" cy="48" r="46.5"></circle>
            <g id="对号备份" transform="translate(17.000000, 17.000000)" fill-rule="nonzero">
              <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="62" height="62"></rect>
              <polygon id="路径" fill="#6A6A6A" points="53.7263914 12 23.8050867 42.3346952 9.27360858 27.6024513 5 31.9351037 19.5314781 46.6673476 23.8050867 51 28.0786953 46.6673476 58 16.3326524"></polygon>
            </g>
          </g>
        </g>
      </svg>
    </span>
    <span class="center" v-if='type == "checked"'>
      <svg style="width: 23px;height: 23px;" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 54.1 (76490) - https://sketchapp.com -->
        <title>单選框/選中复制 2</title>
        <desc>Created with Sketch.</desc>
        <g id="融云" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="投保資訊_投保人資訊复制" transform="translate(-650.000000, -813.000000)">
            <g id="编组-41" transform="translate(0.000000, 649.000000)">
              <g id="單選框/選中" transform="translate(650.000000, 164.000000)">
                <g>
                  <circle id="Oval-26" class="comStyle" fill="#16C1D2" cx="18" cy="18" r="18"></circle>
                  <g id="对号" transform="translate(7.043478, 7.043478)">
                    <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="21.9130435" height="21.9130435"></rect>
                    <path d="M2.12199506,10.4908009 L7.22258932,14.4294587 C7.22258932,14.4294587 7.5039358,14.5700886 7.85561891,14.4294587 L20.4142735,3.94437468 C20.4142735,3.94437468 22.2039497,3.56290744 21.8719745,5.46209118 C20.6606215,6.69277312 8.31297683,18.5794011 8.31297683,18.5794011 C8.31297683,18.5794011 7.5039358,19.0366182 6.72989319,18.5794011 C5.95653015,17.8055966 0.786278851,12.1437124 0.786278851,12.1437124 C0.786278851,12.1437124 0.644586239,10.7724005 2.12199506,10.4908009 Z" id="路径" fill="#FFFFFF"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </span>
    <span class="center" v-if='type == "tabCheck"'>
      <svg t="1565335365500" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1737" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
        <defs>
          <style type="text/css"></style>
        </defs>
        <path d="M512.465455 0.116364C230.609455 0.116364 1.210182 229.492364 1.210182 511.371636S230.586182 1022.650182 512.465455 1022.650182s511.278545-229.376 511.278545-511.278546C1023.720727 229.492364 794.344727 0.116364 512.465455 0.116364z m286.091636 413.230545L466.013091 754.222545a42.519273 42.519273 0 0 1-30.254546 12.753455h-0.232727a42.589091 42.589091 0 0 1-30.114909-12.427636l-178.711273-178.827637a42.565818 42.565818 0 0 1 0-60.253091 42.565818 42.565818 0 0 1 60.253091 0l148.363637 148.247273 302.312727-310.062545a42.682182 42.682182 0 0 1 60.253091-0.698182 42.821818 42.821818 0 0 1 0.674909 60.392727z m0 0" p-id="1738" data-spm-anchor-id="a313x.7781069.0.i0" class="" fill="#d6d6d6"></path>
      </svg>
    </span>

  </span>
</template>
<script>
export default {
  name: 'comSvg',
  props: {
    type: {
      required: false,
      default: 1
    },
    large: {
      required: false,
      default: false
    },

  },
  data() {
    return {
      isShow: false,

    }
  },
  watch: {},
  methods: {

  },
  mounted() { }
}
</script>
<style lang="scss"></style>
