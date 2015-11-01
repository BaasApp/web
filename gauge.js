var Gauge = function(){};
Gauge._beer = 0;
Gauge._cardio = 0;
setTimeout(function () {
  var chart = c3.generate({
    bindto: '.bottom-bar div',
    data: {
        columns: [
            ['data', 91.4]
        ],
        type: 'gauge',
        // onclick: function (d, i) { console.log("onclick", d, i); },
        // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
         label: {
             format: function(value, ratio) {
               if (value < 30) {
                 return 'Beer time!';
               } else if (value < 70) {
                 return 'Perfect!';
               } else if (value < 90) {
                 return '200% fun!';
               } else {
                 return 'You drunk!';
               }
             },
             show: false // to turn off the min/max labels.
         },
    //  min: -100, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    //  max: 100, // 100 is default
     units: '',
  //    width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#4466FF', '#60B044', '#F6C600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
  //            unit: 'value', // percentage is default
  //            max: 200, // 100 is default
            values: [30, 70, 90, 100]
        }
    },
    tooltip: {
      show: false
    }

    // size: {
    //     height: 180
    // }
  });

  chart.load({
      columns: [['data', 50]]
  });

  // setTimeout(function () {
  // chart.load({
  //     columns: [['data', 50]]
  // });
  // }, 2000);
  //
  // setTimeout(function () {
  // chart.load({
  //     columns: [['data', 70]]
  // });
  // }, 3000);
  //
  // setTimeout(function () {
  // chart.load({
  //     columns: [['data', 0]]
  // });
  // }, 4000);
  //
  // setTimeout(function () {
  // chart.load({
  //     columns: [['data', 100]]
  // });
  // }, 5000);

  var caloriesPerBeer = 150;
  Gauge.addBeer = function () {
    Gauge._beer++;
    Gauge.update();
  };

  Gauge.updateCardio = function (number) {
    Gauge._cardio = number;
    Gauge.update();
  };

  Gauge.update = function () {
    var cardios = (this._cardio + (caloriesPerBeer * 2)) / caloriesPerBeer;
    var ratio = (this._beer + 2 || 0.0001) / (cardios || 0.0001);

    chart.load({
        columns: [['data', ratio * 50]]
    });
  }

}, 1500);
