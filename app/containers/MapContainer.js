var React = require('react');
var Map = require('../components/Map');
var googleapi = require('../utils/googleapi');
var nlpapi = require('../utils/nlpapi');

//var arrayFromNLP = nlpapi.returnMapArray();

var MapContainer = React.createClass({
	getInitialState: function(){
		return {
			isLoading : true,
		}
	},
	render: function(){
		return (
		<Map 
			 isLoading = {this.state.isLoading}
			 />
		)
	},
	componentDidMount : function(){


		nlpapi.logNews().then(function(data){
			this.setState({
				isLoading : false,
			});
			//INITIATE THE MAP HERE

			let mapData = [['Country', 'Value', {role: 'tooltip', p:{html:true}}]];
			mapData = mapData.concat(data);
			//console.log("DATA:",data)
			//console.log("MAP DATA AFT:",mapData);
		google.load('visualization', '1.1', {packages: ['geochart'], callback: drawVisualization});
		function drawVisualization() {
		    var data = google.visualization.arrayToDataTable(mapData);
		    var chart = new google.visualization.GeoChart(document.getElementById('myMap'));
		    chart.draw(data, {
		        width: '100%',
		        height: 500,
		        tooltip: {isHtml: true},
		        defaultColor: "#c0392b",
		        datalessRegionColor: "#8e44ad",
		        legend  : {textStyle:{color: "#2980b9"}},
		        backgroundColor: "#2c3e50"})
		}
			//END OF MAP INITIATION


		}.bind(this));
		//TEST COMMANDS
/*		if(this.state.isLoading){
			console.log('THE CHANGE')
			nlpapi.logNews();
		}
*/

		//TEST COMMANDS			
/*		google.load('visualization', '1.1', {packages: ['geochart'], callback: drawVisualization});
		function drawVisualization() {
		    var data = google.visualization.arrayToDataTable(arrayFromNLP);
		    var chart = new google.visualization.GeoChart(document.getElementById('myMap'));
		    chart.draw(data, {
		        width: '100%',
		        height: 500,
		        tooltip: {isHtml: true}  })
		} */

	}

})

module.exports = MapContainer;