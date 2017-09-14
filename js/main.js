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
          center: [0, 0],
          zoom: 3,
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

///////////////////////////////////////////////////////////////////////////////

function d3Viz(map){


    /* Initialize the SVG layer */
	L.svg().addTo(map)

	/* We simply pick up the SVG from the map object */
	var svg = d3.select("#mapid").select("svg"),
	g = svg.append("g");
  var circles = {"objects":[
{"circle":{"coordinates":[45,-90]}},
{"circle":{"coordinates":[43,-89]}},
{"circle":{"coordinates":[44.5,-88]}},
{"circle":{"coordinates":[45.79,-89.31]}}
]};



	d3.json(circles, function() {
		/* Add a LatLng object to each item in the dataset */
		circles.objects.forEach(function(d) {
			d.LatLng = new L.LatLng(d.circle.coordinates[0],
									d.circle.coordinates[1]);

		})
    console.log(circles);

		 feature = g.selectAll("circle")
			.data(circles.objects)
			.enter().append("circle")
			.style("stroke", "black")
			.style("opacity", .6)
			.style("fill", "red")
			.attr("r", 20);
      console.log(map);
      map.on("load", update());
       map.on("zoom", function(){
         console.log("ya zoomed gurl")
         update();
       });
      // map.on("move", update());

	})
  };

////////////////////////////////////////////////////////////////////////////////
function update() {
  counter ++;
  console.log(counter);
  console.log(feature);
  feature.attr("transform",
  function(d) {
    console.log(d);
    return "translate("+map.latLngToLayerPoint(d.LatLng).x +","+map.latLngToLayerPoint(d.LatLng).y +")";
    }
  )
};
////////////////////////////////////////////////////////////////////////////////


$(document).ready(createMap);
