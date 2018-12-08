!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,o){return e||(e=window),o&&o.fn.dataTable||(o=require("datatables.net")(e,o).$),t(o,e,e.document)}:t(jQuery,window,document)}(function(t,e,o,s){"use strict";function n(t){for(var e=[],o=0,s=t.length;o<s;o++)e[t[o]]=o;return e}function r(t,e,o){var s=t.splice(e,1)[0];t.splice(o,0,s)}function i(t,e,o){for(var s=[],n=0,r=t.childNodes.length;n<r;n++)1==t.childNodes[n].nodeType&&s.push(t.childNodes[n]);var i=s[e];null!==o?t.insertBefore(i,s[o]):t.appendChild(i)}var a=t.fn.dataTable;t.fn.dataTableExt.oApi.fnColReorder=function(e,o,a,l,d){var f,h,u,c,m,g,C,p=e.aoColumns.length,x=function(t,e,o){if(t[e]&&"function"!=typeof t[e]){var s=t[e].split("."),n=s.shift();isNaN(1*n)||(t[e]=o[1*n]+"."+s.join("."))}};if(o!=a){if(o<0||o>=p)return void this.oApi._fnLog(e,1,"ColReorder 'from' index is out of bounds: "+o);if(a<0||a>=p)return void this.oApi._fnLog(e,1,"ColReorder 'to' index is out of bounds: "+a);var R=[];for(f=0,h=p;f<h;f++)R[f]=f;r(R,o,a);var _=n(R);for(f=0,h=e.aaSorting.length;f<h;f++)e.aaSorting[f][0]=_[e.aaSorting[f][0]];if(null!==e.aaSortingFixed)for(f=0,h=e.aaSortingFixed.length;f<h;f++)e.aaSortingFixed[f][0]=_[e.aaSortingFixed[f][0]];for(f=0,h=p;f<h;f++){for(C=e.aoColumns[f],u=0,c=C.aDataSort.length;u<c;u++)C.aDataSort[u]=_[C.aDataSort[u]];C.idx=_[C.idx]}for(t.each(e.aLastSort,function(t,o){e.aLastSort[t].src=_[o.src]}),f=0,h=p;f<h;f++)C=e.aoColumns[f],"number"==typeof C.mData?C.mData=_[C.mData]:t.isPlainObject(C.mData)&&(x(C.mData,"_",_),x(C.mData,"filter",_),x(C.mData,"sort",_),x(C.mData,"type",_));if(e.aoColumns[o].bVisible){var T=this.oApi._fnColumnIndexToVisible(e,o),b=null;for(f=a<o?a:a+1;null===b&&f<p;)b=this.oApi._fnColumnIndexToVisible(e,f),f++;for(g=e.nTHead.getElementsByTagName("tr"),f=0,h=g.length;f<h;f++)i(g[f],T,b);if(null!==e.nTFoot)for(g=e.nTFoot.getElementsByTagName("tr"),f=0,h=g.length;f<h;f++)i(g[f],T,b);for(f=0,h=e.aoData.length;f<h;f++)null!==e.aoData[f].nTr&&i(e.aoData[f].nTr,T,b)}for(r(e.aoColumns,o,a),f=0,h=p;f<h;f++)e.oApi._fnColumnOptions(e,f,{});for(r(e.aoPreSearchCols,o,a),f=0,h=e.aoData.length;f<h;f++){var v=e.aoData[f],S=v.anCells;if(S)for(r(S,o,a),u=0,m=S.length;u<m;u++)S[u]&&S[u]._DT_CellIndex&&(S[u]._DT_CellIndex.column=u);"dom"!==v.src&&t.isArray(v._aData)&&r(v._aData,o,a)}for(f=0,h=e.aoHeader.length;f<h;f++)r(e.aoHeader[f],o,a);if(null!==e.aoFooter)for(f=0,h=e.aoFooter.length;f<h;f++)r(e.aoFooter[f],o,a);for((d||d===s)&&t.fn.dataTable.Api(e).rows().invalidate(),f=0,h=p;f<h;f++)t(e.aoColumns[f].nTh).off("click.DT"),this.oApi._fnSortAttachListener(e,e.aoColumns[f].nTh,f);t(e.oInstance).trigger("column-reorder.dt",[e,{from:o,to:a,mapping:_,drop:l,iFrom:o,iTo:a,aiInvertMapping:_}])}};var l=function(e,o){var s=new t.fn.dataTable.Api(e).settings()[0];if(s._colReorder)return s._colReorder;o===!0&&(o={});var n=t.fn.dataTable.camelToHungarian;return n&&(n(l.defaults,l.defaults,!0),n(l.defaults,o||{})),this.s={dt:null,init:t.extend(!0,{},l.defaults,o),fixed:0,fixedRight:0,reorderCallback:null,mouse:{startX:-1,startY:-1,offsetX:-1,offsetY:-1,target:-1,targetIndex:-1,fromIndex:-1},aoTargets:[]},this.dom={drag:null,pointer:null},this.s.dt=s,this.s.dt._colReorder=this,this._fnConstruct(),this};return t.extend(l.prototype,{fnReset:function(){return this._fnOrderColumns(this.fnOrder()),this},fnGetCurrentOrder:function(){return this.fnOrder()},fnOrder:function(e,o){var r,i,a=[],l=this.s.dt.aoColumns;if(e===s){for(r=0,i=l.length;r<i;r++)a.push(l[r]._ColReorder_iOrigCol);return a}if(o){var d=this.fnOrder();for(r=0,i=e.length;r<i;r++)a.push(t.inArray(e[r],d));e=a}return this._fnOrderColumns(n(e)),this},fnTranspose:function(e,o){o||(o="toCurrent");var s=this.fnOrder(),n=this.s.dt.aoColumns;return"toCurrent"===o?t.isArray(e)?t.map(e,function(e){return t.inArray(e,s)}):t.inArray(e,s):t.isArray(e)?t.map(e,function(t){return n[t]._ColReorder_iOrigCol}):n[e]._ColReorder_iOrigCol},_fnConstruct:function(){var e,o=this,s=this.s.dt.aoColumns.length,r=this.s.dt.nTable;for(this.s.init.iFixedColumns&&(this.s.fixed=this.s.init.iFixedColumns),this.s.init.iFixedColumnsLeft&&(this.s.fixed=this.s.init.iFixedColumnsLeft),this.s.fixedRight=this.s.init.iFixedColumnsRight?this.s.init.iFixedColumnsRight:0,this.s.init.fnReorderCallback&&(this.s.reorderCallback=this.s.init.fnReorderCallback),e=0;e<s;e++)e>this.s.fixed-1&&e<s-this.s.fixedRight&&this._fnMouseListener(e,this.s.dt.aoColumns[e].nTh),this.s.dt.aoColumns[e]._ColReorder_iOrigCol=e;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(t,e){o._fnStateSave.call(o,e)},"ColReorder_State");var i=null;if(this.s.init.aiOrder&&(i=this.s.init.aiOrder.slice()),this.s.dt.oLoadedState&&"undefined"!=typeof this.s.dt.oLoadedState.ColReorder&&this.s.dt.oLoadedState.ColReorder.length==this.s.dt.aoColumns.length&&(i=this.s.dt.oLoadedState.ColReorder),i)if(o.s.dt._bInitComplete){var a=n(i);o._fnOrderColumns.call(o,a)}else{var l=!1;t(r).on("draw.dt.colReorder",function(){if(!o.s.dt._bInitComplete&&!l){l=!0;var t=n(i);o._fnOrderColumns.call(o,t)}})}else this._fnSetColumnIndexes();t(r).on("destroy.dt.colReorder",function(){t(r).off("destroy.dt.colReorder draw.dt.colReorder"),t(o.s.dt.nTHead).find("*").off(".ColReorder"),t.each(o.s.dt.aoColumns,function(e,o){t(o.nTh).removeAttr("data-column-index")}),o.s.dt._colReorder=null,o.s=null})},_fnOrderColumns:function(e){var o=!1;if(e.length!=this.s.dt.aoColumns.length)return void this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"ColReorder - array reorder does not match known number of columns. Skipping.");for(var s=0,n=e.length;s<n;s++){var i=t.inArray(s,e);s!=i&&(r(e,i,s),this.s.dt.oInstance.fnColReorder(i,s,!0,!1),o=!0)}t.fn.dataTable.Api(this.s.dt).rows().invalidate(),this._fnSetColumnIndexes(),o&&(""===this.s.dt.oScroll.sX&&""===this.s.dt.oScroll.sY||this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),null!==this.s.reorderCallback&&this.s.reorderCallback.call(this))},_fnStateSave:function(e){var o,s,n,r=this.s.dt,i=r.aoColumns;if(e.ColReorder=[],e.aaSorting){for(o=0;o<e.aaSorting.length;o++)e.aaSorting[o][0]=i[e.aaSorting[o][0]]._ColReorder_iOrigCol;var a=t.extend(!0,[],e.aoSearchCols);for(o=0,s=i.length;o<s;o++)n=i[o]._ColReorder_iOrigCol,e.aoSearchCols[n]=a[o],e.abVisCols[n]=i[o].bVisible,e.ColReorder.push(n)}else if(e.order){for(o=0;o<e.order.length;o++)e.order[o][0]=i[e.order[o][0]]._ColReorder_iOrigCol;var l=t.extend(!0,[],e.columns);for(o=0,s=i.length;o<s;o++)n=i[o]._ColReorder_iOrigCol,e.columns[n]=l[o],e.ColReorder.push(n)}},_fnMouseListener:function(e,o){var s=this;t(o).on("mousedown.ColReorder",function(t){t.preventDefault(),s._fnMouseDown.call(s,t,o)})},_fnMouseDown:function(e,n){var r=this,i=t(e.target).closest("th, td"),a=i.offset(),l=parseInt(t(n).attr("data-column-index"),10);l!==s&&(this.s.mouse.startX=e.pageX,this.s.mouse.startY=e.pageY,this.s.mouse.offsetX=e.pageX-a.left,this.s.mouse.offsetY=e.pageY-a.top,this.s.mouse.target=this.s.dt.aoColumns[l].nTh,this.s.mouse.targetIndex=l,this.s.mouse.fromIndex=l,this._fnRegions(),t(o).on("mousemove.ColReorder",function(t){r._fnMouseMove.call(r,t)}).on("mouseup.ColReorder",function(t){r._fnMouseUp.call(r,t)}))},_fnMouseMove:function(t){if(null===this.dom.drag){if(Math.pow(Math.pow(t.pageX-this.s.mouse.startX,2)+Math.pow(t.pageY-this.s.mouse.startY,2),.5)<5)return;this._fnCreateDragNode()}this.dom.drag.css({left:t.pageX-this.s.mouse.offsetX,top:t.pageY-this.s.mouse.offsetY});for(var e=!1,o=this.s.mouse.toIndex,s=1,n=this.s.aoTargets.length;s<n;s++)if(t.pageX<this.s.aoTargets[s-1].x+(this.s.aoTargets[s].x-this.s.aoTargets[s-1].x)/2){this.dom.pointer.css("left",this.s.aoTargets[s-1].x),this.s.mouse.toIndex=this.s.aoTargets[s-1].to,e=!0;break}e||(this.dom.pointer.css("left",this.s.aoTargets[this.s.aoTargets.length-1].x),this.s.mouse.toIndex=this.s.aoTargets[this.s.aoTargets.length-1].to),this.s.init.bRealtime&&o!==this.s.mouse.toIndex&&(this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex,!1),this.s.mouse.fromIndex=this.s.mouse.toIndex,this._fnRegions())},_fnMouseUp:function(e){t(o).off("mousemove.ColReorder mouseup.ColReorder"),null!==this.dom.drag&&(this.dom.drag.remove(),this.dom.pointer.remove(),this.dom.drag=null,this.dom.pointer=null,this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex,!0),this._fnSetColumnIndexes(),""===this.s.dt.oScroll.sX&&""===this.s.dt.oScroll.sY||this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),null!==this.s.reorderCallback&&this.s.reorderCallback.call(this))},_fnRegions:function(){var e=this.s.dt.aoColumns;this.s.aoTargets.splice(0,this.s.aoTargets.length),this.s.aoTargets.push({x:t(this.s.dt.nTable).offset().left,to:0});for(var o=0,s=this.s.aoTargets[0].x,n=0,r=e.length;n<r;n++)n!=this.s.mouse.fromIndex&&o++,e[n].bVisible&&"none"!==e[n].nTh.style.display&&(s+=t(e[n].nTh).outerWidth(),this.s.aoTargets.push({x:s,to:o}));0!==this.s.fixedRight&&this.s.aoTargets.splice(this.s.aoTargets.length-this.s.fixedRight),0!==this.s.fixed&&this.s.aoTargets.splice(0,this.s.fixed)},_fnCreateDragNode:function(){var e=""!==this.s.dt.oScroll.sX||""!==this.s.dt.oScroll.sY,o=this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh,s=o.parentNode,n=s.parentNode,r=n.parentNode,i=t(o).clone();this.dom.drag=t(r.cloneNode(!1)).addClass("DTCR_clonedTable").append(t(n.cloneNode(!1)).append(t(s.cloneNode(!1)).append(i[0]))).css({position:"absolute",top:0,left:0,width:t(o).outerWidth(),height:t(o).outerHeight()}).appendTo("body"),this.dom.pointer=t("<div></div>").addClass("DTCR_pointer").css({position:"absolute",top:e?t("div.dataTables_scroll",this.s.dt.nTableWrapper).offset().top:t(this.s.dt.nTable).offset().top,height:e?t("div.dataTables_scroll",this.s.dt.nTableWrapper).height():t(this.s.dt.nTable).height()}).appendTo("body")},_fnSetColumnIndexes:function(){t.each(this.s.dt.aoColumns,function(e,o){t(o.nTh).attr("data-column-index",e)})}}),l.defaults={aiOrder:null,bRealtime:!0,iFixedColumnsLeft:0,iFixedColumnsRight:0,fnReorderCallback:null},l.version="1.3.2",t.fn.dataTable.ColReorder=l,t.fn.DataTable.ColReorder=l,"function"==typeof t.fn.dataTable&&"function"==typeof t.fn.dataTableExt.fnVersionCheck&&t.fn.dataTableExt.fnVersionCheck("1.10.8")?t.fn.dataTableExt.aoFeatures.push({fnInit:function(t){var e=t.oInstance;if(t._colReorder)e.oApi._fnLog(t,1,"ColReorder attempted to initialise twice. Ignoring second");else{var o=t.oInit,s=o.colReorder||o.oColReorder||{};new l(t,s)}return null},cFeature:"R",sFeature:"ColReorder"}):alert("Warning: ColReorder requires DataTables 1.10.8 or greater - www.datatables.net/download"),t(o).on("preInit.dt.colReorder",function(e,o){if("dt"===e.namespace){var s=o.oInit.colReorder,n=a.defaults.colReorder;if(s||n){var r=t.extend({},s,n);s!==!1&&new l(o,r)}}}),t.fn.dataTable.Api.register("colReorder.reset()",function(){return this.iterator("table",function(t){t._colReorder.fnReset()})}),t.fn.dataTable.Api.register("colReorder.order()",function(t,e){return t?this.iterator("table",function(o){o._colReorder.fnOrder(t,e)}):this.context.length?this.context[0]._colReorder.fnOrder():null}),t.fn.dataTable.Api.register("colReorder.transpose()",function(t,e){return this.context.length&&this.context[0]._colReorder?this.context[0]._colReorder.fnTranspose(t,e):t}),l});