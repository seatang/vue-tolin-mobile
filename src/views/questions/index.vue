<template>
  <div>
    <h1>问答</h1>
    <draggable v-model="myArray">
      <transition-group class="group">
        <p
          v-for="item in myArray"
          :key="item"
        >
          {{ 'A'+item }}
        </p>
      </transition-group>
    </draggable>
    <draggable v-model="myArray1">
      <transition-group class="group">
        <p
          v-for="item in myArray1"
          :key="item"
        >
          {{ 'B'+item }}
        </p>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'questions',
  data () {
    return {
      myArray: [1, 2, 3, 4, 5, 6],
      myArray1: [1, 2, 3, 4]
    }
  },
  methods: {
  },
  components: {
    draggable
  }
}
</script>

<style scoped lang="less">
.group {
  display: flex;
  justify-items: center;
  align-content: center;
  p {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    margin-right: 20px;
  }
}
</style>
