(function() {
  angular.module('DemoApp').service('dataFactoryHandsontable', dataFactoryHandsontable);

  dataFactoryHandsontable.$inject = [];

  function dataFactoryHandsontable() {
    const methods = {
      mapData,
      mapHeaders,
      renderer,
      getColorChangeStep,
      pickHex
    }

    return methods;
  }

  function mapData(data, {diff, minValue}){
    const scale = 1/diff;

    const mappedData = data.map(rowData => {
      const mappedRowData = rowData.map(cellValue => {
        const isNumber = Number(cellValue);
        if(!Number.isNaN(isNumber)){
          const weight = (cellValue - minValue) * scale;
          return pickHex(weight);
        }
        return cellValue
      })

      return mappedRowData
    })

    return mappedData
  }

  function mapHeaders(columnHeaders){
    const mappedHeaders = columnHeaders.map(header => {
      const mappedHeader = header.toLowerCase().replaceAll(' ', '_');
      const isVersion = header === columnHeaders[0]
      let titleHTML = `<div class="custom-header-column-wrapper"><div class="custom-caption">${header}</div><div class="custom-tick">&#124;</div></div>`;
      if(isVersion){
        titleHTML = '<div class="custom-header-column-wrapper"></div>'
      }
      return {
        value: mappedHeader,
        title: titleHTML,
        renderer: renderer
      }
    })

    return mappedHeaders
  }

  function renderer(hotInstance, td, row, col, prop, value, cellProperties){
    td.innerHTML = `<div class="custom-header-row-wrapper"><div class="custom-caption">${value}</div><div class="custom-tick">&mdash;</div></div>`;

    if(Array.isArray(value)){
      td.innerHTML = '';
      td.style.backgroundColor = 'rgb(' + value.join(',') + ')';
    }

    return td
  }

  function getColorChangeStep(data){
    const onlyNumbers = data.reduce((res, item) => {
      const onlyNumbers = item.slice(1);
      res = [].concat(res, ...onlyNumbers)
      return res;
    }, []);


    const sortedValues = onlyNumbers.sort(function(prev, next){
      return prev - next
    });
    const minValue = sortedValues[0];
    const maxValue = sortedValues[sortedValues.length -1];

    const diff = (maxValue - minValue);

    return {diff, minValue};
  }

  function pickHex (weight) {
    const startColor = [0,125,0];
    const endColor = [255,0,0];
    const w1 = weight;
    const w2 = 1 - w1;
    const rgb = [Math.round(startColor[0] * w1 + endColor[0] * w2),
      Math.round(startColor[1] * w1 + endColor[1] * w2),
      Math.round(startColor[2] * w1 + endColor[2] * w2)];
    return rgb;
  }

}());
