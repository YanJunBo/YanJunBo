<template>

  <div class="numbox">
    <button
      type="button"
      class="btn-numbox-minus"
      v-on:click="$emit('minus')"
    >-</button>
    <input
      type="number"
      class="numbox-input"
      :value="number"
      disabled
    >
    <button
      type="button"
      class="btn-numbox-plus"
      v-on:click="$emit('add')"
    >+</button>
  </div>
</template>

<script>
export default {
  name: "numbox",
  props: {
    number: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.numbox {
  position: relative;
  display: inline-block;
  overflow: hidden;
  max-width:55px;
  height: 25px;
  padding: 0 40px;
  vertical-align: top;
  vertical-align: middle;
  border: solid 1px #bbb;
  border-radius: 3px;
  background-color: #efeff4;
}
.numbox [class*="btn-numbox"],
.numbox [class*="numbox-btn"] {
  font-size: 18px;
  font-weight: 400;
  line-height: 100%;
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 40px;
  height: 100%;
  padding: 0;
  color: #555;
  border: none;
  border-radius: 0;
  background-color: #f9f9f9;
}
.numbox .input-numbox,
.numbox .numbox-input {
  display: inline-block;
  overflow: hidden;
  width: 100% !important;
  height: 100%;
  margin: 0;
  padding: 0 3px !important;
  text-align: center;
  text-overflow: ellipsis;
  word-break: normal;
  border: none !important;
  border-right: solid 1px #ccc !important;
  border-left: solid 1px #ccc !important;
  border-radius: 0 !important;
}
.numbox .btn-numbox-minus,
.numbox .numbox-btn-minus {
  left: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.numbox .btn-numbox-plus,
.numbox .numbox-btn-plus {
  right: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
input[type="color"],
input[type="date"],
input[type="datetime-local"],
input[type="datetime"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select,
textarea {
  display: inline-block;
  overflow: hidden;
  width: 100% !important;
  height: 100%;
  margin: 0;
  padding: 0 3px !important;
  text-align: center;
  text-overflow: ellipsis;
  word-break: normal;
  border: none !important;
  border-right: solid 1px #ccc !important;
  border-left: solid 1px #ccc !important;
  border-radius: 0 !important;
}
</style>
