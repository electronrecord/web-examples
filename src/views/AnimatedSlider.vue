<template>
  <div class="main-container"
       @mousemove="mouseMoving"
       @mouseup="stopDrag">
    <div class="upper-container" :style="bgStyle">
      <h2 class="temperature-text">{{currentTemperature | round}}</h2>
      <div class="temperature-graduation">
        <div class="temperature-element"
             :style="tempElementStyle(el)"
             v-for="el in temperatureGrades"
             :key="el">
          <span class="temperature-element-number">{{el}}</span><br>
          <span class="temperature-element-line">|</span>
        </div>
      </div>
    </div>
    <div class="lower-container">
      <div class="slider-container" :style="sliderStyle">
        <svg width="150" height="30" viewBox="0 0 150 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M74.3132 0C47.0043 2.44032e-05 50.175 30 7.9179 30H144.27C99.4571 30 101.622 -2.44032e-05 74.3132 0Z" transform="translate(-7.38794 0.5)" fill="#12132C"/>
        </svg>
        <div class="slider-button"
             @mousedown="startDrag">
          <i class="fas fa-thermometer-empty slider-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  const sliderMinX = 0
  const sliderMaxX = 240
  const coldGradient = {start: '#5564C2', end: '#3A2E8D'}
  const hotGradient = {start:'#F0AE4B', end: '#9B4D1B'}
  export default {
    name: 'home',
    data () {
      return {
        temperatureGrades: [10, 15, 20, 25, 30],
        dragging: false,
        initialMouseX: 0,
        sliderX: 0,
        initialSliderX: 0,
        gradientStart: coldGradient.start,
        gradientEnd: coldGradient.end
      }
    },
    filters: {
      round (num) {
        return Math.round(num)
      }
    },
    methods: {
      tempElementStyle (tempNumber) {
        const nearDistance = 3
        const liftDistance = 12

        // lifts up the element when the current temperature is near it
        const diff = Math.abs(this.currentTemperature - tempNumber)
        const distY = (diff / nearDistance) - 1

        // constrain the distance so that the element doesn't go to the bottom
        const elementY = Math.min(distY * liftDistance, 0)
        return `transform: translate3d(0, ${elementY}px, 0)`
      },
      startDrag (e) {
        this.dragging = true
        this.initialMouseX = e.pageX
        this.initialSliderX = this.sliderX
      },
      stopDrag () {
        this.dragging = false
      },
      mouseMoving (e) {
        if (this.dragging) {
          const dragAmount = e.pageX - this.initialMouseX
          const targetX = this.initialSliderX + dragAmount
          this.sliderX = Math.max(Math.min(targetX, sliderMaxX), sliderMinX)
        }
        let targetGradient = coldGradient
        if (this.currentTemperature >= 25) {
          targetGradient = hotGradient
        }

        if (this.gradientStart !== targetGradient.start) {
          // gradient changed
          TweenLite.to(this, 0.7, {
            'gradientStart': targetGradient.start,
            'gradientEnd': targetGradient.end
          })
        }
      }
    },
    computed: {
      sliderStyle () {
        return `transform: translate3d(${this.sliderX}px,0,0)`
      },
      currentTemperature () {
        const tempRangeStart = 10
        const tempRange = 20 // from 10 - 30
        return (this.sliderX / sliderMaxX * tempRange ) + tempRangeStart
      },
      bgStyle () {
        return `background: linear-gradient(to bottom right, ${this.gradientStart}, ${this.gradientEnd});`
      }
    }
  }
</script>

<style lang="less">
  .main-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 1fr;
    height: 100vh;
  }
  .upper-container {
    position: relative;
    background: linear-gradient(to bottom right, #5564C2, #3A2E8D);
  }
  .lower-container {
    background-color: #12132C;
  }
  .temperature-text {
    position: absolute;
    bottom: 150px;
    font-size: 100px;
    width: 100%;
    text-align: center;
    user-select: none;
  }
  .temperature-element {
    text-align: center;
    display: inline-block;
    width: 40px;
    margin: 0 10px 0 10px;
    opacity: 0.7;
  }
  .temperature-element-line {
    font-size: 7px;
  }
  .temperature-graduation {
    position: absolute;
    left: calc(50% - 150px); // subtracting half the width to center
    bottom: 25px;
    user-select: none;
  }
  .slider-container {
    width: 150px;
    height: 80px;
    margin-top: -30px;
    margin-left: calc(50% - 187px);
    position: relative;
  }
  .slider-button {
    position: absolute;
    left: 42px;
    top: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #2724A2;

    cursor: grab;
    cursor: -webkit-grab;
    cursor: -moz-grab;
  }

  .slider-icon {
    margin-top: 16px;
    margin-left: 21px;
    color: white;
  }
</style>
