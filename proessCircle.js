/**
  
   * @param {String} text 设置中间文字
   * @param {Number} val 设置数值百分率
   * @param {String} bg 设置污染率的颜色
*/
  drawpollutionEcharts(text, val, bg) {
    const value1 = val * 75 / 100;
    const value2 = 75 - value1;
    const num1 = value1 / 2;
    const num2 = value2 / 2;
    const series = [];
    for (let i = 0; i < num1; i++) {
      series.push(this.setValue(1, bg), this.setValue(1, 'transparent'));
    }
    for (let i = 0; i < num2; i++) {
      series.push(this.setValue(1, '#d5f0ff'), this.setValue(1, 'transparent'));
    }
    series.push(this.setValue(25, 'transparent'));
    const option = {
      title: {
        x: '48%',
        y: '28%',
        subtext: text,
        textAlign: 'center',
        subtextStyle: {
          fontSize: 40,
          color: '#fff'
        }
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['75%', '85%'],
        center: ['50%', '50%'],
        startAngle: 225,
        hoverAnimation: true,
        legendHoverLink: false,
        labelLine: {
          normal: {
            show: false
          }
        },
        emphasis: {
          show: false
        },
        data: series
      }, {
        name: '',
        type: 'pie',
        radius: ['90%', '93%'],
        center: ['50%', '50%'],
        startAngle: 225,
        hoverAnimation: false,
        legendHoverLink: false,
        labelLine: {
          normal: {
            show: false
          }
        },
        emphasis: {
          show: false
        },
        data: [this.setValue(75, '#4da8fc'), this.setValue(25, 'transparent')]
      }]
    };

    const pollutionEcharts = echarts.init(
      this.elementRef.nativeElement.querySelector('#polluEcharts')
    );
    pollutionEcharts.setOption(option);
  }