define(['jquery','common','nprogress','echarts'], function($,undefined,nprogress,echarts) {

    nprogress.done();

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'IQ表'
        },
        tooltip: {},
        legend: {
            data:['傻逼指数'],
        },
        xAxis: {
            data: ["邱东岳","刘亚伦","郝毅哲","苏桂纯","赖丽","秋如"]
        },
        yAxis: {},
        series: [{
            name: "傻逼指数",
            type: 'bar',
            data: [4, 7, 40, 50, 50,100]
        }]

    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});
