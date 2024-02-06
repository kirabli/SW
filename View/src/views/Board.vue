<template>
  <div>
    <!-- https://blog.csdn.net/grx1125/article/details/128785335?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-128785335-blog-131802281.235%5Ev43%5Epc_blog_bottom_relevance_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-128785335-blog-131802281.235%5Ev43%5Epc_blog_bottom_relevance_base3&utm_relevant_index=13 -->
    <a target="_bank"
       href="https://blog.csdn.net/grx1125/article/details/128785335?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-128785335-blog-131802281.235%5Ev43%5Epc_blog_bottom_relevance_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-128785335-blog-131802281.235%5Ev43%5Epc_blog_bottom_relevance_base3&utm_relevant_index=13">垂直居中</a>
    <!-- <div class="contain">
      <div>
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
        <div class="box">4</div>
        <div class="box">5</div>
        <div class="box">6</div>
      </div>
      <div>
        <div class="box">7</div>
        <div class="box">8</div>
        <div class="box">9</div>
        <div class="box">10</div>
      </div>
    </div> -->
    <div class="contain1">
      <hr>
      <div class="box1">盒子1</div>
      <div class="box1">盒子2</div>
      <div class="box1">盒子3</div>
      <div class="box1">盒子4</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  components: {
  },
  computed: {
  },
  methods: {

  },
}

</script>

<style scoped>
.contain {
  display: flex;
  width: 800px;
  height: 500px;
  border: 2px solid black;
  box-sizing: border-box;
  flex-flow: column;
  justify-content: space-around;
}
.contain > div {
  width: 100%;
  display: flex;
  height: 200px;
  border: 1px solid;
  justify-content: center;
  align-items: center;
  /* align-content: space-evenly; flex-wrap: wrap; */
  /* justify-items: center; 无效*/
}
.box {
  width: 100px;
  height: 50px;
  border: 1px solid rgb(102, 227, 57);
}
</style>
<style scoped>
.contain1 {
  position: relative;
}
.contain1 hr {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  margin: 0;
}
.contain1 {
  display: flex;
  flex-flow: row wrap;
  width: 500px;
  height: 500px;
  justify-content: center;
  background-color: #e83e78;
  align-items: center; /*每一行单独对齐 */
  align-content: center; /*与交叉轴的中点对齐；设置换行flex-wrap:wrap,这样这个属性的设置才会起作用*/
  align-content: stretch; /*轴线占满整个交叉轴*/
}

.contain1 .box1 {
  width: 200px;
  height: 200px;
}
.contain1 .box1:nth-of-type(1) {
  background-color: #ffc0cb;
  /* align-self:auto 该属性允许单个项目与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-item属性 */
}
.contain1 .box1:nth-of-type(2) {
  background-color: #f0f;
}
.contain1 .box1:nth-of-type(3) {
  background-color: #00f;
}
.contain1 .box1:nth-of-type(4) {
  background-color: #ff0;
}
</style>