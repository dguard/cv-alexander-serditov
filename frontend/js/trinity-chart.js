const trinityData = '{"mobile screens":{"screen registration":{"figma mockup":3,"component":3,"animation":3,"memoization":3,"caching":2,"theme":3,"api call":3,"story book":3},"screen login":{"figma mockup":2,"component":2,"animation":4,"memoization":3,"caching":2,"theme":1,"api call":3,"story book":3},"screen restore password":{"figma mockup":2,"component":2,"animation":3,"memoization":3,"caching":3,"theme":2,"api call":2,"story book":3},"screen confirm account":{"figma mockup":3,"component":3,"animation":3,"memoization":2,"caching":3,"theme":2,"api call":1,"story book":2},"screen update account":{"figma mockup":1,"component":2,"animation":4,"memoization":1,"caching":1,"theme":3,"api call":4,"story book":2},"screen sales per day":{"figma mockup":3,"component":3,"animation":2,"memoization":3,"caching":3,"theme":2,"api call":3,"story book":2},"screen dashboard":{"figma mockup":2,"component":2,"animation":2,"memoization":2,"caching":2,"theme":2,"api call":3,"story book":2},"screen invoices":{"figma mockup":2,"component":2,"animation":3,"memoization":3,"caching":2,"theme":2,"api call":3,"story book":2}},"web pages":{"page crm (client management)":{"figma mockup":3,"component":3,"animation":3,"api call":2},"page management products":{"figma mockup":2,"component":2,"animation":3,"api call":3},"page management invoices":{"figma mockup":3,"component":1,"animation":3,"api call":2}},"api endpoint":{"module api product management":{"entity":3,"endpoint":2,"repository":2,"sdk call":1,"unit testing":2,"postman":2,"rate testing":2},"module api crm (client management)":{"entity":3,"endpoint":2,"repository":2,"sdk call":3,"unit testing":2,"postman":3,"rate testing":2},"module api cabinet":{"entity":2,"endpoint":3,"repository":3,"sdk call":4,"unit testing":2,"postman":1,"rate testing":3},"module api rate limiting":{"entity":3,"endpoint":2,"repository":1,"sdk call":1,"unit testing":2,"postman":2,"rate testing":3},"module api & service email sending":{"entity":2,"endpoint":2,"repository":2,"sdk call":3,"unit testing":2,"postman":3,"rate testing":2},"mobile sdk & service crashlytics":{"sdk call":1},"mobile sdk & service user behavior analytics":{"sdk call":3},"mobile sdk & service push notifications":{"sdk call":1,"unit testing":2,"postman":3,"rate testing":3},"module api & service sms sending":{"sdk call":3,"&unit testing":2,"postman":2,"rate testing":3},"module api & service static file serving":{"sdk call":3,"unit testing":3,"postman":3,"rate testing":2},"module api & service instances deploying":{"sdk cal":3,"unit testing":2,"postman":1,"rate testing":3}},"mobile store":{"release into store":{"entire":2},"privacy policy":{"entire":3},"screenshots in market & description":{"figma mockup & screens":2}},"mobile testing":{"feat dashboard":{"e2e testing":3},"feat navigation":{"e2e testing":4},"feat sales":{"e2e testing":1},"feat invoices":{"e2e testing":2},"feat update profile":{"e2e testing":3},"feat restore profile":{"e2e testing":2}}}';
function getJson(cb){
  cb(JSON.parse(trinityData))
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
        color: ['#005488', '#00a3ce', '#00b9e0', '#00475b', '#00778d', '#0091ad'][regionI]
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
  Highcharts.chart('trinity-container', {
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
      text: 'Point Of Sale: Segments, Technologies, Implementation'
    }
  });

});