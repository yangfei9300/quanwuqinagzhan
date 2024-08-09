<template> 
    <view class="huihui_parent" :style="parentCss">
        <view class="huihui_process" :style="processCss"></view>
        <view class="huihui_left_part" :style="leftCss"></view>
        <view class="huihui_right_part" :style="rightCss"></view> 
        <view class="huihui_inner_circle" :style="innerCircleCss">
		   <slot></slot> 
        </view>
    </view> 
</template>

<script>  
export default {
    data () {
        return{ 
        }
    },
    props: {
        processColor: {
            type: String,
            default: '#42b983'
        },
        originalColor: {
            type: String,
            default: '#EEEEEE'
        },
		innerbgColor:{
			type: String,
			default: '#FFFFFF'
		}, 
        process: {
            type: Number,
            default: 0
        },
        radius: {
            type: Number,
            default: 100
        },
        barWidth: {
            type: Number,
            default: 3
        },
		startPosDegree:{
			type:Number,
			default:0
		}
    },
    computed: {
	  processCss() {
	   const { radius, processColor } = this;
	   return { 
	 	   borderRadius: `${radius}rpx`,
	       height: `${radius * 2}rpx`,
	       width: `${radius * 2}rpx`,
	       backgroundColor: processColor,
	   }
	  },
      parentCss() {
        const { radius,startPosDegree } = this;
        return { 
			borderRadius: `${radius}rpx`,
            height: `${radius * 2}rpx`,
            width: `${radius * 2}rpx`,
			transform: 'rotate('+ startPosDegree +'deg )',
        }
      }, 
      leftCss() {
        let { radius, originalColor,process  } = this;
		let leftTransformerDegree = (process>50? ((process>100?100:process) - 50) * 3.6:0)+ 'deg';
        return {
            height: `${radius * 2}rpx`,
            width: `${radius}rpx`,
			backgroundColor: originalColor,
			transform: 'rotate('+ leftTransformerDegree +')',
			transformOrigin: 'right center', 
            borderTopLeftRadius: `${radius}rpx`,
            borderBottomLeftRadius: `${radius}rpx`,
			left:0,
			top:0
        }
      },
      rightCss() {
        let { radius, processColor,originalColor,process } = this;
		let rightTransformerDegree = ((process > 50 ? 0 : process) * 3.6) + 'deg';
		
        return {
            height: `${radius * 2}rpx`,
            width: `${radius}rpx`,
            backgroundColor: process > 50 ?processColor:originalColor,
			transform: 'rotate('+rightTransformerDegree+')',
			transformOrigin: 'left center',
            borderTopRightRadius: `${radius}rpx`,
            borderBottomRightRadius: `${radius}rpx`,
			left:`${radius}rpx`,
			top:0
        }
	  },
	  innerCircleCss() {
	    const { radius, innerbgColor,barWidth ,startPosDegree} = this;
	    return { 
	  		borderRadius: `${radius - barWidth}rpx`,
	        height: `${(radius - barWidth) * 2}rpx`,
	        width: `${(radius - barWidth) * 2}rpx`,
			transform: 'rotate('+ (0-startPosDegree) +'deg )',
	        backgroundColor: innerbgColor,
			left:`${barWidth}rpx`,
			top:`${barWidth}rpx`,
	    }
	  }, 
    },
    mounted() {
        
    }, 
    methods: {
    }
}
</script>

<style scoped>
  .huihui_component {
    justify-content: center;
    align-items: center;
  }
  .huihui_parent {
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .huihui_process {
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .huihui_inner_circle {
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute; 
	display: flex;
  }
  .huihui_left_part {
    overflow: hidden;
    position: absolute; 
  }
  .huihui_right_part {
    overflow: hidden;
    position: absolute; 
  }
</style>