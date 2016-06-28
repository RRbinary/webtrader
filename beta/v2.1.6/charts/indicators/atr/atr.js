define(["jquery","common/rivetsExtra","jquery-ui","color-picker","ddslick"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,e){require(["css!charts/indicators/atr/atr.css"]);var f=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},g=[new f(30,"red",1,"Dash"),new f(70,"red",1,"Dash")];require(["text!charts/indicators/atr/atr.html","text!charts/indicators/indicators.json"],function(f,h){var i="#cd0a0a";f=a(f),f.appendTo("body"),h=JSON.parse(h);var j=h.atr,k={title:j.long_display_name,description:j.description};b.bind(f[0],k),f.find("input[type='button']").button(),f.find("#atr_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#atr_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted},ok:function(b,c){a("#atr_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted}});var l="Solid";a("#atr_dashStyle").ddslick({imagePosition:"left",width:118,background:"white",onSelected:function(b){a("#atr_dashStyle .dd-selected-image").css("max-width","85px"),l=b.selectedData.value}}),a("#atr_dashStyle .dd-option-image").css("max-width","85px");var m=f.find("#atr_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(g,function(b,c){a(m.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),f.find("#atr_level_delete").click(function(){m.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select level(s) to delete!"})}):m.rows(".selected").remove().draw()}),f.find("#atr_level_add").click(function(){require(["indicator_levels"],function(b){b.open(d,function(b){a.each(b,function(b,c){a(m.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),f.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,dialogClass:"atr-ui-dialog",buttons:[{text:"OK",click:function(){var b=a(".atr_input_width_for_period");if(!_.isInteger(_.toNumber(b.val()))||!_.inRange(b.val(),parseInt(b.attr("min")),parseInt(b.attr("max"))+1))return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+b.attr("min")+" to "+b.attr("max")+" is allowed for "+b.closest("tr").find("td:first").text()+"!"})}),void b.val(b.prop("defaultValue"));var d=[];a.each(m.rows().nodes(),function(){var b=a(this).data("level");b&&d.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var e={period:parseInt(f.find(".atr_input_width_for_period").val()),stroke:i,strokeWidth:parseInt(f.find("#atr_strokeWidth").val()),dashStyle:l,appliedTo:parseInt(f.find("#atr_appliedTo").val()),levels:d};a(a(".atr").data("refererChartID")).highcharts().series[0].addIndicator("atr",e),c.call(f)}},{text:"Cancel",click:function(){c.call(this)}}]}),f.find("select").selectmenu({width:120}),"function"==typeof e&&e(d)})}return{open:function(b){return 0==a(".atr").length?void d(b,this.open):void a(".atr").data("refererChartID",b).dialog("open")}}});