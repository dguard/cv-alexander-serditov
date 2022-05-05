const xdefiData = '{"mobile screens":{"screen wallet":{"figma mockup":3,"component":1,"animation":1,"api call":2},"screen tx":{"figma mockup":2,"component":2,"animation":3,"api call":2},"screen account":{"figma mockup":1,"component":2,"animation":2,"api call":3},"screen exchange":{"figma mockup":2,"component":1,"animation":2,"api call":2},"screen send tx":{"figma mockup":3,"component":2,"animation":1,"api call":3},"screen integration bitcoin":{"figma mockup":3,"component":2,"animation":3,"api call":3},"screen integration litecoin":{"figma mockup":3,"component":2,"animation":1,"api call":2},"screen integration ethereum":{"figma mockup":1,"component":3,"animation":2,"api call":1},"screen integration binance":{"figma mockup":3,"component":2,"animation":2,"api call":3},"screen integration binance smart chain":{"figma mockup":1,"component":2,"animation":3,"api call":2}},"web pages":{"page wallet":{"figma mockup":3,"component":2,"animation":1,"api call":1},"page tx":{"figma mockup":2,"component":3,"animation":1,"api call":2},"page account":{"figma mockup":2,"component":2,"animation":2,"api call":1},"page exchange":{"figma mockup":3,"component":2,"animation":2,"api call":1},"page send tx":{"figma mockup":2,"component":1,"animation":2,"api call":1},"page integration bitcoin":{"figma mockup":1,"component":3,"animation":2,"api call":3},"page integration litecoin":{"figma mockup":3,"component":3,"animation":1,"api call":2},"page integration ethereum":{"figma mockup":1,"component":3,"animation":2,"api call":2},"page integration binance":{"figma mockup":1,"component":3,"animation":2,"api call":1},"page integration binance smart chain":{"figma mockup":2,"component":1,"animation":2,"api call":1}},"api endpoint":{"module api txs management":{"entity":2,"endpoint":3,"repository":1,"sdk call":2,"unit testing":1,"postman":2,"rate testing":3},"module api crm (client management)":{"entity":3,"endpoint":3,"repository":1,"sdk call":2,"unit testing":2,"postman":1,"rate testing":2},"module api cabinet":{"entity":1,"endpoint":3,"repository":2,"sdk call":3,"unit testing":3,"postman":2,"rate testing":2},"module api rate limiting":{"entity":3,"endpoint":1,"repository":2,"sdk call":2,"unit testing":2,"postman":2,"rate testing":2},"module api & service email sending":{"entity":1,"endpoint":1,"repository":2,"sdk call":2,"unit testing":1,"postman":2,"rate testing":1},"module api & service instances deploying":{"sdk cal":1,"unit testing":3,"postman":2,"rate testing":2},"module api authentication":{"entity":2,"endpoint":1,"repository":1,"sdk call":3,"unit testing":2,"postman":2,"rate testing":2},"module api ethereum & binance":{"entity":1,"endpoint":3,"repository":2,"sdk call":2,"unit testing":1,"postman":1,"rate testing":2},"module api bitcoin & litecoin":{"entity":3,"endpoint":3,"repository":1,"sdk call":2,"unit testing":2,"postman":2,"rate testing":2},"module api binance smart chain":{"entity":2,"endpoint":2,"repository":2,"sdk call":2,"unit testing":2,"postman":2,"rate testing":2}},"testing":{"feat wallet":{"e2e testing":1},"feat send tx":{"e2e testing":2},"feat exchange":{"e2e testing":3},"feat top up balance with a card":{"e2e testing":2},"feat retrieve tx details":{"e2e testing":2},"feat update account details":{"e2e testing":1},"feat integration ethereum & binance":{"e2e testing":2},"feat integration bitcoin & litecoin":{"e2e testing":2},"feat integration binance smart chain":{"e2e testing":1}},"serving":{"api instance":{"docker integration":1,"aws integration":2},"deployer":{"docker integration":1,"aws integration":1},"proxy":{"docker integration":2,"aws integration":3},"load balancer":{"docker integration":3,"aws integration":2}}}\n'

function getJson(cb){
  cb(JSON.parse(xdefiData))
}

getJson(function (data) {

  var points = [],
    regionP,
    regionVal,
    regionI = 0,
    countryP,
    countryI,
    causeP,
    causeI,
    region,
    country,
    cause;

  for (region in data) {
    if (Object.hasOwnProperty.call(data, region)) {
      regionVal = 0;
      regionP = {
        id: 'id_' + regionI,
        name: region,
        color: ['#00475b', '#00778d', '#0091ad', '#00a8c9', '#16bfd1', '#87dce3'][regionI]
      };
      countryI = 0;
      for (country in data[region]) {
        if (Object.hasOwnProperty.call(data[region], country)) {
          countryP = {
            id: regionP.id + '_' + countryI,
            name: country,
            parent: regionP.id
          };
          points.push(countryP);
          causeI = 0;
          for (cause in data[region][country]) {
            if (Object.hasOwnProperty.call(
              data[region][country], cause
            )) {
              causeP = {
                id: countryP.id + '_' + causeI,
                name: cause,
                parent: countryP.id,
                value: Math.round(+data[region][country][cause])
              };
              regionVal += causeP.value;
              points.push(causeP);
              causeI = causeI + 1;
            }
          }
          countryI = countryI + 1;
        }
      }
      regionP.value = regionVal;
      points.push(regionP);
      regionI = regionI + 1;
    }
  }
  Highcharts.chart('xdefi-container', {
    series: [{
      name: 'segments',
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      allowDrillToNode: true,
      animationLimit: 1000,
      dataLabels: {
        enabled: false
      },
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 3,
        levelIsConstant: false
      }, {
        level: 1,
        dataLabels: {
          style: {
            fontSize: '14px'
          }
        }
      }],
      accessibility: {
        exposeAsGroupOnly: true
      },
      data: points
    }],
    subtitle: {
      text: 'Click points to drill down.'
    },
    title: {
      text: 'Crypto Wallet: Segments, Technologies, Implementation'
    }
  });

});