import{l as L}from"./index-DXwMd8J6.js";var O={exports:{}};(function(T,P){(function(l,t){T.exports=t()})(L,function(){return function(f){var l={};function t(n){if(l[n])return l[n].exports;var r=l[n]={i:n,l:!1,exports:{}};return f[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=f,t.c=l,t.i=function(n){return n},t.d=function(n,r,s){t.o(n,r)||Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:s})},t.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(r,"a",r),r},t.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},t.p="/dist/",t(t.s=2)}([function(f,l,t){t(8);var n=t(6)(t(1),t(7),"data-v-25adc6c0",null);f.exports=n.exports},function(f,l,t){Object.defineProperty(l,"__esModule",{value:!0});var n=t(3),r=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s="#75c791",c="#bfcbd9",p="on",d="off",y="#fff";l.default={name:"ToggleButton",props:{value:{type:Boolean,default:!1},name:{type:String},disabled:{type:Boolean,default:!1},tag:{type:String},sync:{type:Boolean,default:!1},speed:{type:Number,default:300},color:{type:[String,Object],validator:function(o){return t.i(n.a)(o)||t.i(n.b)(o,"checked")||t.i(n.b)(o,"unchecked")||t.i(n.b)(o,"disabled")}},switchColor:{type:[String,Object],validator:function(o){return t.i(n.a)(o)||t.i(n.b)(o,"checked")||t.i(n.b)(o,"unchecked")}},cssColors:{type:Boolean,default:!1},labels:{type:[Boolean,Object],default:!1,validator:function(o){return(typeof o>"u"?"undefined":r(o))==="object"?o.checked||o.unchecked:typeof o=="boolean"}},height:{type:Number,default:22},width:{type:Number,default:50},margin:{type:Number,default:3},fontSize:{type:Number}},computed:{className:function(){var o=this.toggled,h=this.disabled;return["vue-js-switch",{toggled:o,disabled:h}]},coreStyle:function(){return{width:t.i(n.c)(this.width),height:t.i(n.c)(this.height),backgroundColor:this.cssColors?null:this.disabled?this.colorDisabled:this.colorCurrent,borderRadius:t.i(n.c)(Math.round(this.height/2))}},buttonRadius:function(){return this.height-this.margin*2},distance:function(){return t.i(n.c)(this.width-this.height+this.margin)},buttonStyle:function(){var o="transform "+this.speed+"ms",h=t.i(n.c)(this.margin),b=this.toggled?t.i(n.d)(this.distance,h):t.i(n.d)(h,h),U=this.switchColor?this.switchColorCurrent:null;return{width:t.i(n.c)(this.buttonRadius),height:t.i(n.c)(this.buttonRadius),transition:o,transform:b,background:U}},labelStyle:function(){return{lineHeight:t.i(n.c)(this.height),fontSize:this.fontSize?t.i(n.c)(this.fontSize):null}},colorChecked:function(){var o=this.color;return t.i(n.e)(o)?t.i(n.f)(o,"checked",s):o||s},colorUnchecked:function(){return t.i(n.f)(this.color,"unchecked",c)},colorDisabled:function(){return t.i(n.f)(this.color,"disabled",this.colorCurrent)},colorCurrent:function(){return this.toggled?this.colorChecked:this.colorUnchecked},labelChecked:function(){return t.i(n.f)(this.labels,"checked",p)},labelUnchecked:function(){return t.i(n.f)(this.labels,"unchecked",d)},switchColorChecked:function(){return t.i(n.f)(this.switchColor,"checked",y)},switchColorUnchecked:function(){return t.i(n.f)(this.switchColor,"unchecked",y)},switchColorCurrent:function(){return this.switchColor,t.i(n.e)(this.switchColor)?this.toggled?this.switchColorChecked:this.switchColorUnchecked:this.switchColor||y}},watch:{value:function(o){this.sync&&(this.toggled=!!o)}},data:function(){return{toggled:!!this.value}},methods:{toggle:function(o){var h=!this.toggled;this.sync||(this.toggled=h),this.$emit("input",h),this.$emit("change",{value:h,tag:this.tag,srcEvent:o})}}}},function(f,l,t){Object.defineProperty(l,"__esModule",{value:!0});var n=t(0),r=t.n(n);t.d(l,"ToggleButton",function(){return r.a});var s=!1;l.default={install:function(p){s||(p.component("ToggleButton",r.a),s=!0)}}},function(f,l,t){t.d(l,"a",function(){return r}),t.d(l,"e",function(){return s}),t.d(l,"b",function(){return c}),t.d(l,"f",function(){return p}),t.d(l,"c",function(){return d}),t.d(l,"d",function(){return y});var n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(o){return typeof o=="string"},s=function(o){return(typeof o>"u"?"undefined":n(o))==="object"},c=function(o,h){return s(o)&&o.hasOwnProperty(h)},p=function(o,h,b){return c(o,h)?o[h]:b},d=function(o){return o+"px"},y=function(o,h){var b=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"0px";return"translate3d("+o+", "+h+", "+b+")"}},function(f,l,t){l=f.exports=t(5)(),l.push([f.i,".vue-js-switch[data-v-25adc6c0]{display:inline-block;position:relative;vertical-align:middle;user-select:none;font-size:10px;cursor:pointer}.vue-js-switch .v-switch-input[data-v-25adc6c0]{opacity:0;position:absolute;width:1px;height:1px}.vue-js-switch .v-switch-label[data-v-25adc6c0]{position:absolute;top:0;font-weight:600;color:#fff;z-index:1}.vue-js-switch .v-switch-label.v-left[data-v-25adc6c0]{left:10px}.vue-js-switch .v-switch-label.v-right[data-v-25adc6c0]{right:10px}.vue-js-switch .v-switch-core[data-v-25adc6c0]{display:block;position:relative;box-sizing:border-box;outline:0;margin:0;transition:border-color .3s,background-color .3s;user-select:none}.vue-js-switch .v-switch-core .v-switch-button[data-v-25adc6c0]{display:block;position:absolute;overflow:hidden;top:0;left:0;border-radius:100%;background-color:#fff;z-index:2}.vue-js-switch.disabled[data-v-25adc6c0]{pointer-events:none;opacity:.6}",""])},function(f,l){f.exports=function(){var t=[];return t.toString=function(){for(var r=[],s=0;s<this.length;s++){var c=this[s];c[2]?r.push("@media "+c[2]+"{"+c[1]+"}"):r.push(c[1])}return r.join("")},t.i=function(n,r){typeof n=="string"&&(n=[[null,n,""]]);for(var s={},c=0;c<this.length;c++){var p=this[c][0];typeof p=="number"&&(s[p]=!0)}for(c=0;c<n.length;c++){var d=n[c];(typeof d[0]!="number"||!s[d[0]])&&(r&&!d[2]?d[2]=r:r&&(d[2]="("+d[2]+") and ("+r+")"),t.push(d))}},t}},function(f,l){f.exports=function(n,r,s,c){var p,d=n=n||{},y=typeof n.default;(y==="object"||y==="function")&&(p=n,d=n.default);var e=typeof d=="function"?d.options:d;if(r&&(e.render=r.render,e.staticRenderFns=r.staticRenderFns),s&&(e._scopeId=s),c){var o=Object.create(e.computed||null);Object.keys(c).forEach(function(h){var b=c[h];o[h]=function(){return b}}),e.computed=o}return{esModule:p,exports:d,options:e}}},function(f,l){f.exports={render:function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("label",{class:t.className},[r("input",{staticClass:"v-switch-input",attrs:{type:"checkbox",name:t.name,disabled:t.disabled},domProps:{checked:t.value},on:{change:function(s){return s.stopPropagation(),t.toggle(s)}}}),t._v(" "),r("div",{staticClass:"v-switch-core",style:t.coreStyle},[r("div",{staticClass:"v-switch-button",style:t.buttonStyle})]),t._v(" "),t.labels?[t.toggled?r("span",{staticClass:"v-switch-label v-left",style:t.labelStyle},[t._t("checked",[[t._v(t._s(t.labelChecked))]])],2):r("span",{staticClass:"v-switch-label v-right",style:t.labelStyle},[t._t("unchecked",[[t._v(t._s(t.labelUnchecked))]])],2)]:t._e()],2)},staticRenderFns:[]}},function(f,l,t){var n=t(4);typeof n=="string"&&(n=[[f.i,n,""]]),n.locals&&(f.exports=n.locals),t(9)("2283861f",n,!0)},function(f,l,t){var n=typeof document<"u";if(typeof DEBUG<"u"&&DEBUG&&!n)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r=t(10),s={},c=n&&(document.head||document.getElementsByTagName("head")[0]),p=null,d=0,y=!1,e=function(){},o=typeof navigator<"u"&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());f.exports=function(i,g,u){y=u;var a=r(i,g);return h(a),function(m){for(var C=[],S=0;S<a.length;S++){var R=a[S],x=s[R.id];x.refs--,C.push(x)}m?(a=r(i,m),h(a)):a=[];for(var S=0;S<C.length;S++){var x=C[S];if(x.refs===0){for(var D=0;D<x.parts.length;D++)x.parts[D]();delete s[x.id]}}}};function h(i){for(var g=0;g<i.length;g++){var u=i[g],a=s[u.id];if(a){a.refs++;for(var v=0;v<a.parts.length;v++)a.parts[v](u.parts[v]);for(;v<u.parts.length;v++)a.parts.push(U(u.parts[v]));a.parts.length>u.parts.length&&(a.parts.length=u.parts.length)}else{for(var m=[],v=0;v<u.parts.length;v++)m.push(U(u.parts[v]));s[u.id]={id:u.id,refs:1,parts:m}}}}function b(){var i=document.createElement("style");return i.type="text/css",c.appendChild(i),i}function U(i){var g,u,a=document.querySelector('style[data-vue-ssr-id~="'+i.id+'"]');if(a){if(y)return e;a.parentNode.removeChild(a)}if(o){var v=d++;a=p||(p=b()),g=E.bind(null,a,v,!1),u=E.bind(null,a,v,!0)}else a=b(),g=M.bind(null,a),u=function(){a.parentNode.removeChild(a)};return g(i),function(C){if(C){if(C.css===i.css&&C.media===i.media&&C.sourceMap===i.sourceMap)return;g(i=C)}else u()}}var B=function(){var i=[];return function(g,u){return i[g]=u,i.filter(Boolean).join(`
`)}}();function E(i,g,u,a){var v=u?"":a.css;if(i.styleSheet)i.styleSheet.cssText=B(g,v);else{var m=document.createTextNode(v),C=i.childNodes;C[g]&&i.removeChild(C[g]),C.length?i.insertBefore(m,C[g]):i.appendChild(m)}}function M(i,g){var u=g.css,a=g.media,v=g.sourceMap;if(a&&i.setAttribute("media",a),v&&(u+=`
/*# sourceURL=`+v.sources[0]+" */",u+=`
/*# sourceMappingURL=data:application/json;base64,`+btoa(unescape(encodeURIComponent(JSON.stringify(v))))+" */"),i.styleSheet)i.styleSheet.cssText=u;else{for(;i.firstChild;)i.removeChild(i.firstChild);i.appendChild(document.createTextNode(u))}}},function(f,l){f.exports=function(n,r){for(var s=[],c={},p=0;p<r.length;p++){var d=r[p],y=d[0],e=d[1],o=d[2],h=d[3],b={id:n+":"+p,css:e,media:o,sourceMap:h};c[y]?c[y].parts.push(b):s.push(c[y]={id:y,parts:[b]})}return s}}])})})(O);var A=O.exports;export{A as d};
