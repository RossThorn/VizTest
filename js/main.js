var feature;
var map;
var counter = 0;
  //function to instantiate the Leaflet map
  function createMap(){

      var southWest = L.latLng(-90, -180),
      northEast = L.latLng(90, 180),
      bounds = L.latLngBounds(southWest, northEast);

      //create the map
       map = L.map('mapid', {
          center: [45, -89],
          zoom: 6,
          //maxBounds: bounds,
          maxBoundsViscosity:.7
      });

      //add OSM base tilelayer
      L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
          minZoom:2
      }).addTo(map);

      // Create necessary panes in correct order
      map.createPane("pointsPane");
      map.createPane("polygonsPane");


      //window resize function so map takes up entirety of screen on resize
      $(window).on("resize", function () { $("#mapid").height($(window).height()); map.invalidateSize(); }).trigger("resize");
      $(document).ready(function() {$(window).resize(function() {
      var bodyheight = $(this).height();
      $("#page-content").height(bodyheight-70);
    }).resize();
  });

  d3Viz(map);


  };

//////////////////////////////////////////////////////////////////////////

function d3Viz(map){

    /* Initialize the SVG layer */
	L.svg().addTo(map)

	/* We simply pick up the SVG from the map object */
	var svg = d3.select("#mapid").select("svg"),
	g = svg.append("g");
  var sites = {"objects":[
{"plot":{"coordinates":[45,-90]}}
]};



	d3.json(sites, function() {
		/* Add a LatLng object to each item in the dataset */
		sites.objects.forEach(function(d) {
			d.LatLng = new L.LatLng(d.plot.coordinates[0],
									d.plot.coordinates[1]);

		})
    console.log(sites);



    // // Area chart Attempt
    // feature = g.selectAll("plots")
    //   .data(sites.objects)
    //  .enter().append(
    //    function(){
    //      var margin = {top: 20, right: 20, bottom: 30, left: 50},
    //          width = 500 - margin.left - margin.right,
    //          height = 500 - margin.top - margin.bottom;
    //
    //      // parse the date / time
    //      var parseTime = d3.timeParse("%d-%b-%y");
    //
    //      // set the ranges
    //      var y = d3.scaleTime().range([height, 0]);
    //      var x = d3.scaleLinear().range([0, width]);
    //
    //      // define the area
    //      var area = d3.area()
    //          .x(function(d) { return x(d.close); })
    //          .y0(height)
    //          .y1(function(d) { return y(d.date); });
    //
    //      // define the line
    //      var valueline = d3.line()
    //          .x(function(d) { return x(d.close); })
    //          .y(function(d) { return y(d.date); });
    //
    //      // append the svg obgect to the body of the page
    //      // appends a 'group' element to 'svg'
    //      // moves the 'group' element to the top left margin
    //      var svg = d3.select("body").append("svg")
    //          .attr("width", width + margin.left + margin.right)
    //          .attr("height", height + margin.top + margin.bottom)
    //          .append("g")
    //          .attr("transform",
    //                "translate(" + margin.left + "," + margin.top + ")");
    //
    //      // get the data
    //      d3.csv("data.csv", function(error, data) {
    //        if (error) throw error;
    //
    //        // format the data
    //        data.forEach(function(d) {
    //            d.date = parseTime(d.date);
    //            d.close = +d.close;
    //        });
    //
    //        // scale the range of the data
    //        y.domain(d3.extent(data, function(d) { return d.date; }));
    //        x.domain([0, d3.max(data, function(d) { return d.close; })]);
    //
    //        // add the area
    //          svg.append("path")
    //             .data([data])
    //             .attr("class", "area")
    //             .attr("d", area);
    //
    //        // add the valueline path.
    //        svg.append("path")
    //            .data([data])
    //            .attr("class", "line")
    //            .attr("d", valueline);
    //
    //        // add the X Axis
    //        svg.append("g")
    //            .attr("transform", "translate(0," + height + ")")
    //            .call(d3.axisBottom(x));
    //
    //        // add the Y Axis
    //        svg.append("g")
    //            .call(d3.axisLeft(y));
    //
    //      });
    //
    //  });



      // Attempt to get the radar chart on the map
		 feature = g.selectAll("plots")
			 .data(sites.objects)
			.enter().append(
        function(){
        var width = 100,
            height = 100;

        // Config for the Radar chart
        var config = {
            w: width,
            h: height,
            maxValue: 100,
            levels: 5,
            ExtraWidthX: 300
        };
        //Call function to draw the Radar chart
        d3.json("radardata2.json", function(error, data) {
          // console.log(data);
            if (error) throw error;
            RadarChart.draw("g", data, config);
        });

      });




      // // The plain circle on the map.
      // feature = g.selectAll("plots")
 		  // .data(sites.objects)
      // .enter().append("circle")
			// .style("stroke", "black")
			// .style("opacity", .6)
			// .style("fill", "red")
			// .attr("r", function(){
      //   var radius = Math.random()*30;
      //   return radius;
      // });

      console.log("boom")

      map.on("load", update());
      map.on("zoom", function(){
         console.log("ya zoomed gurl")
         update();
       });
       map.on("move", function(){
         console.log("ya moved gurl")
         update();
       });
      // map.on("move", update());

	})
  };

////////////////////////////////////////////////////////////////////////////////
function update() {
  counter ++;
  // console.log(counter);
  // console.log(feature);
  feature.attr("transform",
  function(d) {
    console.log(d);
    return "translate("+map.latLngToLayerPoint(d.LatLng).x +","+map.latLngToLayerPoint(d.LatLng).y +")";
    }
  )
};
//////////////////////////////////////////////////////////////////////////


$(document).ready(createMap);
