(function() {
  angular
    .module('DemoApp')
    .service('dataFactoryHighcharts', dataFactoryHighcharts);

  dataFactoryHighcharts.$inject = [];

  function dataFactoryHighcharts() {
    const methods = {
      getHighchartsBaseConfig
    }

    return methods;
  }

  function getHighchartsBaseConfig(headers, data){
    return {
      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
        width: 1000
      },

      title: {
        text: 'Test HeatMap chart'
      },

      xAxis: {
        categories: headers
      },

      yAxis: {
        categories: getYHeaders(data),
        title: null,
        reversed: true
      },

      colorAxis: {
        minColor: '#FF0000',
        maxColor: '#00FF00'
      },

      legend: {
        align: 'right',
        layout: 'vertical',
        reversed: true,
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },

      tooltip: {
        formatter: function () {
          return '<b>' + getPointCategoryName(this.point, 'x') + '</b><br><b>' +
              getPointCategoryName(this.point, 'y')  + '</b> value is <br><b>' + this.point.value + '</b>';
        }
      },

      series: [{
        borderWidth: 1,
        data: mapData(data),
        dataLabels: {
          enabled: false
        }
      }]

    };
  }

  function mapData(data){
    const mappedDataHeatChart = data.reduce((result,rowData, indexX) =>{
      const mappedRowData = rowData.reduce((res, cell, indexY) => {
        if(indexY !== 0){
          res.push([indexY, indexX, cell])
        }
        return res
      },[])

      result =  [].concat(result,mappedRowData);
      return result;
    }, [])

    return mappedDataHeatChart
  }

  function getYHeaders(data){
    const mappedHeaders = data.map(rowData => {
      return rowData[0]
    })
    return mappedHeaders
  }

  function getPointCategoryName(point, dimension) {
    const series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
  }


}());
