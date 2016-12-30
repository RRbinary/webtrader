define(["jquery","lodash","jquery-ui","color-picker","ddslick"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,f){require(["css!charts/indicators/mama/mama.css"]),require(["text!charts/indicators/mama/mama.html","text!charts/indicators/indicators.json"],function(g,h){var i="#cd0a0a";g=a(g),g.appendTo("body"),h=JSON.parse(h);var j=h.mama;g.attr("title",j.long_display_name),g.find(".mama-description").html(j.description),g.find("input[type='button']").button(),g.find("#mama_stroke").colorpicker({showOn:"click",position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#mama_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted},ok:function(b,c){a("#mama_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted}});var k="Solid";a("#mama_dashStyle").ddslick({imagePosition:"left",width:150,background:"white",onSelected:function(b){a("#mama_dashStyle .dd-selected-image").css("max-height","5px").css("max-width","115px"),k=b.selectedData.value}}),a("#mama_dashStyle .dd-option-image").css("max-height","5px").css("max-width","115px");var l={autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"mama-ui-dialog",buttons:[{text:"OK",click:function(){var d=!0;if(a(".mama_input_width_for_period").each(function(){if(!b.inRange(a(this).val(),parseInt(a(this).attr("min")),parseInt(a(this).attr("max"))+.01)){var c=a(this);return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})}),c.val(c.prop("defaultValue")),void(d=!1)}}),d){var f={fastLimit:parseFloat(g.find("#mama_fast_limit").val()),slowLimt:parseFloat(g.find("#mama_slow_limit").val()),stroke:i,strokeWidth:parseInt(g.find("#mama_strokeWidth").val()),dashStyle:k,appliedTo:parseInt(g.find("#mama_appliedTo").val())};e&&e(),a(a(".mama").data("refererChartID")).highcharts().series[0].addIndicator("mama",f),c.call(g)}}},{text:"Cancel",click:function(){c.call(this)}}],icons:{close:"custom-icon-close",minimize:"custom-icon-minimize",maximize:"custom-icon-maximize"}};g.dialog(l).dialogExtend(b.extend(l,{maximizable:!1,minimizable:!1,collapsable:!1})),g.find("select").each(function(b,c){a(c).selectmenu({width:150}).selectmenu("menuWidget").css("max-height","85px")}),a.isFunction(f)&&f(d)})}var e=null;return{open:function(b,c){e=c||e;var f=function(){a(".mama").data("refererChartID",b).dialog("open")};0==a(".mama").length?d(b,this.open):f()}}});