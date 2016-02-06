define(["jquery","windows/windows","websockets/binary_websockets","jquery-ui","datatables","jquery-growl"],function(a,b,c){"use strict";function d(a){a.click(function(){i?i.moveToTop():g()})}function e(a){var b=a.proposal_open_contract,c=b.contract_id,d=b.bid_price;if(j){var e=j.api().row("#"+c),f=e.data();if(!f)return;var g=f[3];f[3]=d,e.data(f);var h=j.find("#"+c);b.is_valid_to_sell?(h.removeClass("resale-not-offered"),g!==d&&h.removeClass("indicative-red indicative-green").addClass(1*d>1*g?"indicative-green":"indicative-red")):h.removeClass("indicative-red indicative-green").addClass("resale-not-offered")}}function f(b){if("subscribe"===b)++m,!l&&m>0&&c.send({proposal_open_contract:1,subscribe:1}).then(function(){l=!0})["catch"](function(b){a.growl.error({message:b.message})});else if("forget"===b)--m,l&&0===m&&c.send({forget_all:"proposal_open_contract"}).then(function(){l=!1})["catch"](function(a){l=!1});else{if("resubscribe"!==b)return;c.send({forget_all:"proposal_open_contract"}).then(function(){return l=!1,c.send({proposal_open_contract:1,subscribe:1})})["catch"](function(a){l=!1})}}function g(){require(["css!portfolio/portfolio.css"]),c.send({balance:1}).then(function(d){var g=function(b){"minimized"===i.dialogExtend("state")&&i.dialogExtend("restore"),c.send({balance:1})["catch"](function(b){a.growl.error({message:b.message})}),h(),f(b===!0?"subscribe":"resubscribe")};c.events.on("balance",function(a){m=a.balance.currency,k.update(a.balance.balance)}),c.events.on("transaction",function(a){a.transaction;h(),f("resubscribe")}),i=b.createBlankWindow(a("<div/>"),{title:"Portfolio",width:700,minHeight:60,"data-authorized":"true",close:function(){f("forget"),c.events.off("proposal_open_contract",e)},open:function(){g(!0),c.events.on("proposal_open_contract",e)},destroy:function(){j&&j.DataTable().destroy(!0),i=null},refresh:g});var l=i.parent().find(".ui-dialog-title").addClass("with-content");k=a('<span class="span-in-dialog-header" />').insertAfter(l),k.update=function(a){k.html("Account balance: <strong>"+m+" "+formatPrice(a)+"</strong>")};var m=d.balance.currency;j=a("<table width='100%' class='portfolio-dialog display compact'/>"),j.appendTo(i),j=j.dataTable({data:[],columns:[{title:"Ref."},{title:"Contract Details"},{title:"Purchase",render:function(a){return m+' <span class="bold">'+a+"</span>"}},{title:"Indicative",render:function(a){return m+' <span class="bold">'+a+"</span>"}}],rowId:"4",paging:!1,ordering:!1,processing:!0}),j.parent().addClass("hide-search-input"),i.on("click",n),i.dialog("open")})["catch"](function(a){})}function h(){var b=a("#"+j.attr("id")+"_processing").show();c.send({portfolio:1}).then(function(a){var c=a.portfolio&&a.portfolio.contracts,d=c.map(function(a){var b="up",c='<img class="arrow" src="images/'+b+'-arrow.svg"/>';return[a.transaction_id,c+a.longcode,formatPrice(a.buy_price),"0.00",a.contract_id,a]});j.api().rows().remove(),j.api().rows.add(d),j.api().draw(),b.hide()})["catch"](function(c){j.api().rows().remove(),j.api().draw(),b.hide(),a.growl.error({message:c.message})})}var i=null,j=null,k=null,l=!1,m=0;c.events.on("logout",function(){l=!1,m=0});var n=function(b){var c=b.target,d=a(c);if("IMG"===c.tagName&&!d.hasClass("disabled")){var e=c.parentElement.parentElement,f=j.api().row(e).data();f=_.last(f),d.addClass("disabled"),require(["viewtransaction/viewTransaction"],function(a){a.init(f.contract_id,f.transaction_id).then(function(){d.removeClass("disabled")})})}};return{proposal_open_contract:{subscribe:function(){f("subscribe")},forget:function(){f("forget")},resubscribe:function(){f("resubscribe")}},init:d}});