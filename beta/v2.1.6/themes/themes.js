define(["jquery","windows/windows","common/util","highstock","jquery-growl"],function(a,b){function c(c,e,f){if(d)d.moveToTop();else{d=b.createBlankWindow(a('<div class="dialog-confirm-new-theme"/>'),{title:"Apply new theme?",width:360,height:240,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,closable:!1,closeOnEscape:!1,modal:!0,ignoreTileAction:!0,"data-authorized":"true",destroy:function(){d=null},buttons:{Apply:function(){a.growl.notice({message:"Loading "+f});var b=e.replace("theme_","").replace("_","-");c?(local_storage.remove("theme"),local_storage.set("custom_theme",c)):"default"===b?(local_storage.remove("theme"),local_storage.remove("custom_theme")):local_storage.set("theme",{name:b}),location.reload()},Cancel:function(){a(this).dialog("close"),a(this).dialog("destroy")}}});var g=a("<p>In order to properly apply theme, a full refresh of page is required. Are you sure you want to proceed?</p>");g.appendTo(d),d.dialog("open")}}var d=null,e=local_storage.get("theme"),f=local_storage.get("custom_theme");return e=e&&e.name,e?require(["lib/highstock/themes/"+e]):Highcharts.setOptions(f?f:{plotOptions:{candlestick:{lineColor:"rgba(0,0,0,1)",color:"rgba(215,24,24,1)",upColor:"rgba(2,146,14,1)",upLineColor:"rgba(0,0,0,1)",shadow:!0}}}),a("a.theme_dark_blue, a.theme_dark_green, a.theme_dark_unica, a.theme_gray, a.theme_grid, a.theme_grid_light, a.theme_sand_signika, a.theme_skies, a.theme_default").off("click").on("click",function(){var b=a(this),d=b.text(),e=b.attr("class");c(null,e,d)}),{confirmationDialog:c}});