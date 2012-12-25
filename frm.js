var lon = 13.40;
var lat = 52.51;
var zoom = 11;
var proj1=new OpenLayers.Projection("EPSG:4326");
var proj2=new OpenLayers.Projection("EPSG:900913");         
var map, vectors, controls, PoiLayer, PoiLayer2;
var loadnewzoomMax = 11; // parameter to trigger new file load based on Max zoomlevel
var loadnewzoomMin = 11; // parameter to trigger new file load based on Min zoomlevel
var loadnewlatS = 0;  // parameter to trigger new file load if lat South of this point
var loadnewlatN = 0;  // parameter to trigger new file load if lat North of this point
var loadnewlonW = 0;  // parameter to trigger new file load if lon West  of this point
var loadnewlatE = 0;  // parameter to trigger new file load if lon East of this point
   
function DisplayAlert(id,left,top, lat, lon) {
	      var queryString = new String();  
			queryString = window.location.search;  
        	queryStringqueryString = queryString.substring(1);  
			
			document.getElementById(id).style.left=left+'px';
			document.getElementById(id).style.top=top+'px';
			if (queryStringqueryString == 1) {
	    	document.getElementById('Welcome').style.display='none';
	    	document.getElementById('Hash').style.display='none';
	    	document.getElementById('Logo2').style.display='none';
				}
			else {document.getElementById(id).style.display='block';}
}


//Load features static -> to be replaced by REST-Service
function getFeatures() {
        var features = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [13.42875, 52.52123]},
                    "properties": {"Name": "TestPlace", "Country":"Germany", "City":"Berlin"}},   
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [13.39283, 52.51714]},
                    "properties": {"Name": "TestPlace3", "Country":"Germany", "City":"Berlin"}}
            ]
        };
        var reader = new OpenLayers.Format.GeoJSON({
                'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            });

        return reader.read(features);
    } 

    
     function checkURL(){
        	var queryString = new String();  
				queryString = window.location.search;  
  				queryStringqueryString = queryString.substring(1);  
			if (queryStringqueryString == "LeihLager-D") {
				document.getElementById('LeihLagerDiskussion').style.display='block';
				document.getElementById('s1-2-1').style.display='block'; 
				document.getElementById('s1-2').style.display='none'; 
				document.getElementById('Intro').style.display='none'; 
				}
			else
			if (queryStringqueryString == "LeihLager") {
				document.getElementById('LeihLagerInfo').style.display='block';
				document.getElementById('s1-2-1').style.display='block'; 
				document.getElementById('s1-2').style.display='none';
				document.getElementById('Intro').style.display='none';  
				}
			else
       	if (queryStringqueryString == "Ticket-D") {
				document.getElementById('TicketDiskussion').style.display='block';
				document.getElementById('s1-3-1').style.display='block'; 
				document.getElementById('s1-3').style.display='none';
				document.getElementById('Intro').style.display='none';   
				}
			else
		  	if (queryStringqueryString == "Ticket") {
				document.getElementById('TicketInfo').style.display='block';
				document.getElementById('s1-3-1').style.display='block'; 
				document.getElementById('s1-3').style.display='none';  
				document.getElementById('Intro').style.display='none'; 
				}
			else
       	if (queryStringqueryString == "Pfand-D") {
				document.getElementById('PfandDiskussion').style.display='block'; 
				document.getElementById('s1-4-1').style.display='block'; 
				document.getElementById('s1-4').style.display='none'; 
				document.getElementById('Intro').style.display='none';  
				}
			else
       	if (queryStringqueryString == "Pfand") {
				document.getElementById('PfandInfo').style.display='block'; 
				document.getElementById('s1-4-1').style.display='block'; 
				document.getElementById('s1-4').style.display='none';  
				document.getElementById('Intro').style.display='none'; 
				}
			else
       	if (queryStringqueryString == "GiveTake-D") {
				document.getElementById('GiveTakeDiskussion').style.display='block';
				document.getElementById('s1-1-1').style.display='block'; 
				document.getElementById('s1-1').style.display='none';  
				document.getElementById('Intro').style.display='none'; 
				}
			else
       	if (queryStringqueryString == "GiveTake") {
				document.getElementById('GiveTakeInfo').style.display='block';
				document.getElementById('s1-1-1').style.display='block'; 
				document.getElementById('s1-1').style.display='none';  
				document.getElementById('Intro').style.display='none'; 
				}
			else
       	if (queryStringqueryString == "Mehr") {
				document.getElementById('Mehr').style.display='block';
				document.getElementById('s1-5-1').style.display='block'; 
				document.getElementById('s1-5').style.display='none';  
				document.getElementById('Intro').style.display='none'; 
				}
			else
       	if (queryStringqueryString == "Stickr") {
				document.getElementById('Stickr').style.display='block';
				document.getElementById('s1-5-1').style.display='block'; 
				document.getElementById('s1-5').style.display='none';  
				document.getElementById('Intro').style.display='none'; 
				}
			else {
				}		
		}	    
    
     			
function init(){
	
				// Event handler for zoom event to add and remove layers based on zoom level            	
		function mapEvent(event) {
	   	 zoomlevel = map.getZoom();

			if (zoomlevel < loadnewzoomMax) 
				{
//				alert("Zoomed to: "+ zoomlevel);
				PoiLayer.destroyFeatures();

				}
			if (zoomlevel > loadnewzoomMin) 
				{
//				alert("Zoomed to: "+ zoomlevel);
  	   	 	PoiLayer.addFeatures(getFeatures()); 	
				}                                
		}	               
          
          checkURL();     
               map = new OpenLayers.Map('map', {
    				controls: [
        				new OpenLayers.Control.Zoom({
            			zoomInId: "zoomin",
            			zoomOutId: "zoomout"
        					}),
       				new OpenLayers.Control.ArgParser(),
        				new OpenLayers.Control.Attribution(),
        				new OpenLayers.Control.SmartPopup(),
        				new OpenLayers.Control.Navigation(
            			{dragPanOptions: {enableKinetic: true}}
        				)],
        			eventListeners: {
                 "moveend": mapEvent,
                 "zoomend": mapEvent
                 }				
					});

              		var cloudmade = new OpenLayers.Layer.CloudMade("CloudMade", {
   				 		key: 'fd5d9267dbb7483587e625ab0701b304',
   				 		styleId: 67505
						});
      
					 map.addLayer(cloudmade);
				               
                map.setCenter(
						new OpenLayers.LonLat(lon, lat).transform(
     					new OpenLayers.Projection("EPSG:4326"),
       					map.getProjectionObject()
   						), zoom
 					);		
 					

			    // Vector layers
     PoiLayer = new OpenLayers.Layer.Vector("PoiLayers", {
        selectTemplateURI: "popup/sprintCode-i18n.html",
        styleMap: new OpenLayers.StyleMap({
				externalGraphic: "img/hashad.png",
            graphicOpacity: 1.0,
            graphicWith: 16,
            graphicHeight: 26,
            graphicYOffset: -26
        })
    });

    PoiLayer.addFeatures(getFeatures()); 					
	 map.addLayer(PoiLayer); 	
//	 map.events.register('zoomend', null, displayAfterZoom);  

    
 }







      			