define(["jquery","common/rivetsExtra","jquery-ui","color-picker"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,e){require(["text!charts/indicators/cdlmathold/cdlmathold.html","text!charts/indicators/indicators.json"],function(f,g){f=a(f),f.appendTo("body"),g=JSON.parse(g);var h=g.cdlmathold,i={title:h.long_display_name,description:h.description};b.bind(f[0],i),f.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,buttons:[{text:"OK",click:function(){var b=a(a(".cdlmathold").data("refererChartID")).highcharts().series[0];b.addIndicator("cdlmathold",{cdlIndicatorCode:"cdlmathold",onSeriesID:b.options.id}),c.call(f)}},{text:"Cancel",click:function(){c.call(this)}}]}),a.isFunction(e)&&e(d)})}return{open:function(b){return 0==a(".cdlmathold").length?void d(b,this.open):void a(".cdlmathold").data("refererChartID",b).dialog("open")}}});