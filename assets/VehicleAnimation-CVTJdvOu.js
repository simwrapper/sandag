import{j as n,d as D,n as k,r as C,g as m,R as T,M as P,L as w,C as u}from"./index-DXwMd8J6.js";import{d as R}from"./index-1GW52lzC.js";import{r as V}from"./index-BRmf_z99.js";import{Y as N}from"./index-6F3aLhar.js";import{c as d}from"./index-B9fw0f6a.js";import{C as O}from"./CollapsiblePanel-Xr3kzqwk.js";import{P as H,a as j,I as B,b as G}from"./PathTraceLayer-DRHE2wIG.js";import{Z as W}from"./ZoomButtons-DjT_93U7.js";import{a as U,g as Y}from"./util-DDCxpZ5I.js";import{A as X,L as J,D as K,S as Z}from"./set-rtl-text-plugin-Cr2Q1psc.js";import{A as Q}from"./arc-layer-C4UL1X_E.js";import{H as ee}from"./HTTPFileSystem-mhJZeBxO.js";import"./index-WM0UQc7M.js";import"./index-DgdUD6UN.js";import"./icon-manager-D8vYbXtY.js";import"./line-layer-DG6F2WFV.js";import"./fxp-4YEvQr-_.js";import"./extends-CCbyfPlC.js";function te(s){const e=s.items.map(t=>n.createElement("li",{key:t.value+t.value[0],style:{display:"flex"}},t.label&&n.createElement("div",{style:{margin:"0 0.5rem 0.0rem 0",fontWeight:"bold"}},t.label),n.createElement("div",{style:{width:"100%",height:"3px",marginTop:"0.5rem",backgroundColor:`rgb(${t.color})`}})));return n.createElement("div",null,n.createElement("h4",{style:{textAlign:"left",fontWeight:"bold",margin:"1rem 0 0.25rem 0",fontSize:"0.8rem"}},s.title),n.createElement("p",null,s.description),n.createElement("ul",{style:{listStyle:"none",padding:0,margin:0}},e))}const se={messages:{en:{requests:"DRT&nbsp;Requests",passengers:"Passengers",search:"Search",showhide:"Show/Hide",vehicles:"DRT Vehicles",routes:"Routes",speed:"Speed",backgroundTraffic:"All Traffic"},de:{requests:"DRT&nbsp;Anfragen",passengers:"Passagiere",search:"Suche",showhide:"Ein-/Ausblenden",vehicles:"DRT Fahrzeuge",routes:"Routen",speed:"Geschwindigkeit",backgroundTraffic:"Alle Fahrzeuge"}}},ie=D({name:"XmasSettingsPanel",i18n:se,components:{ToggleButton:R.ToggleButton},props:{items:{type:Object,required:!0}}});var ae=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",{staticClass:"settings-panel-content"},[t("h4",[e._v(e._s(e.$t("showhide")))]),e._l(Object.keys(e.items),function(i){return t("div",{key:i,staticClass:"row"},[t("toggle-button",{staticClass:"toggle",attrs:{width:40,value:e.items[i],labels:!1,color:{checked:"#4b7cc4",unchecked:"#222"}},on:{change:function(h){return e.$emit("click",i)}}}),t("label",{domProps:{innerHTML:e._s(e.$t(i))}})],1)})],2)},re=[],oe=k(ie,ae,re,!1,null,"35a3a3e8");const ne=oe.exports,le={currentTime:{type:"number",value:0,min:0},getTimeStart:{type:"accessor",value:null},getTimeEnd:{type:"accessor",value:null},searchFlag:{type:"number",value:0}};class v extends Q{getShaders(){const e=super.getShaders();return e.inject={"vs:#decl":`        attribute float timeStart;
        attribute float timeEnd;
        uniform float currentTime;
        uniform float searchFlag;
        varying float vTime;
      `,"vs:#main-start":`        if (searchFlag == 1.0) {
          vTime = 999.0;
        } else if (timeEnd == -1.0 || timeStart > currentTime || timeEnd < currentTime ) {
          vTime = -1.0;
          return;
        } else {
          float nearBeginning = currentTime - timeStart;
          float nearEnd = timeEnd - currentTime;
          vTime = min(nearBeginning, nearEnd);
        }
      `,"fs:#decl":`        uniform float currentTime;
        uniform float searchFlag;
        varying float vTime;
      `,"fs:#main-start":`      if (searchFlag == 0.0 && vTime == -1.0 ) discard;
      `,"fs:DECKGL_FILTER_COLOR":`        if (vTime <= 10.0) color.a *= (vTime / 10.0);
      `},e}initializeState(e){super.initializeState(e),this.getAttributeManager().addInstanced({timeStart:{size:1,accessor:"getTimeStart"},timeEnd:{size:1,accessor:"getTimeEnd"}})}draw(e){const{currentTime:t}=this.props;e.uniforms=Object.assign({},e.uniforms,{currentTime:t}),super.draw(e)}}v.layerName="DrtRequestArcLayer";v.defaultProps=le;const he="/",ce={marker:{x:0,y:0,width:128,height:128,mask:!0},info:{x:128,y:0,width:128,height:128,mask:!0},vehicle:{x:128,y:128,width:128,height:128,mask:!0},diamond:{x:0,y:128,width:128,height:128,mask:!1}},me=new X({color:[255,255,255],intensity:1}),ue=new H({color:[255,255,255],intensity:2,position:[-74.05,40.7,8e3]}),de=new J({ambientLight:me,pointLight:ue}),pe={vehicleColor:[200,130,250],trailColor0:[235,235,25],trailColor1:[23,184,190],effects:[de]},p={time:0,fromX:1,fromY:2,toX:3,toY:4,veh:5,arrival:6};function ge(s){const{simulationTime:e,paths:t,traces:i,drtRequests:h,settingsShowLayers:l,center:o,dark:r,vehicleLookup:c,searchEnabled:S,onClick:y,viewId:q}=s,L=pe,[A,_]=C.useState(o?{center:[16,42],longitude:o[0],latitude:o[1],pitch:0,bearing:0,zoom:10}:Object.assign({},m.state.viewState));T[q]=()=>{_(m.state.viewState)};const $=1,[g,E]=C.useState({}),f=[];function F(){console.log(g),g.object?y(g.object.v):y(null)}function M({hoverInfo:a}){const{object:b,x:z,y:I}=a;if(!b)return null;const x=c[b.v];return n.createElement("div",{className:"tooltip",style:{fontSize:"0.8rem",backgroundColor:"#ddddeedd",borderLeft:"6px solid green",boxShadow:"2.5px 2px 4px rgba(0,0,0,0.25)",color:"#223",padding:"1rem 1rem",position:"absolute",left:z+40,top:I-30}},n.createElement("big",null,n.createElement("b",null,x)),n.createElement("div",null,"Passagiere: ",b.occ," "))}return l.routes&&f.push(new j({id:"Routen",data:i,currentTime:e,getSourcePosition:a=>a.p0,getTargetPosition:a=>a.p1,getTimeStart:a=>a.t0,getTimeEnd:a=>a.t1,getColor:a=>s.colors[a.occ],getWidth:1,opacity:.7,widthMinPixels:2,rounded:!1,shadowEnabled:!1,searchFlag:S?1:0,pickable:!0,autoHighlight:!0,highlightColor:[255,0,255],onHover:E})),l.vehicles&&f.push(new B({id:"Vehicles",data:t,getPathStart:a=>a.p0,getPathEnd:a=>a.p1,getTimeStart:a=>a.t0,getTimeEnd:a=>a.t1,getIcon:a=>"vehicle",getColor:a=>s.colors[a.occ],iconMoving:"vehicle",iconStill:"diamond",getSize:S?72:54,opacity:1,currentTime:e,shadowEnabled:!1,noAlloc:!0,iconAtlas:`${he}icon-atlas.png`,iconMapping:ce,sizeScale:.5,billboard:!1,pickable:!0,depthTest:!0,autoHighlight:!1,highlightColor:[255,0,255],onHover:E,parameters:{depthTest:!1}})),l.requests&&f.push(new v({id:"DRT Requests",data:h,currentTime:e,getSourcePosition:a=>[a[p.fromX],a[p.fromY]],getTargetPosition:a=>[a[p.toX],a[p.toY]],getTimeStart:a=>a[p.time],getTimeEnd:a=>a[p.arrival],getSourceColor:[255,0,255],getTargetColor:[200,255,255],getWidth:$,opacity:.5,searchFlag:S?1:0})),n.createElement(K,{layers:f,effects:L.effects,pickingRadius:5,viewState:A,controller:!0,getCursor:()=>"pointer",onClick:F,onViewStateChange:a=>{m.commit("setMapCamera",a.viewState)}},n.createElement(Z,{mapStyle:m.getters.mapStyle,mapboxApiAccessToken:P}),M({hoverInfo:g}))}const fe={messages:{en:{requests:"DRT Requests",passengers:"Passengers",search:"Search",showhide:"Show/Hide",vehicles:"Vehicles",routes:"Routes",speed:"Speed"},de:{requests:"DRT Anfragen",passengers:"Passagiere",search:"Suche",showhide:"Ein-/Ausblenden",vehicles:"DRT Fahrzeuge",routes:"DRT Routen",speed:"Geschwindigkeit"}}},Se=D({name:"VehicleAnimationPlugin",i18n:fe,components:{CollapsiblePanel:O,SettingsPanel:ne,LegendColors:te,TripViz:ge,PlaybackControls:G,ToggleButton:R.ToggleButton,ZoomButtons:W},props:{root:{type:String,required:!0},subfolder:{type:String,required:!0},configFromDashboard:{type:Object,required:!1},yamlConfig:String,thumbnail:Boolean},data:()=>{const s={0:[140,140,160],1:[85,255,85],2:[255,255,85],3:[240,110,30],4:[192,30,50]},e={vehicles:!0,routes:!0,requests:!1};return{viewId:Math.floor(1e12*Math.random()),COLOR_OCCUPANCY:s,SETTINGS:e,legendItems:Object.keys(s).map(t=>({type:w.line,color:s[t],value:t,label:t})),legendRequests:[{type:w.line,color:[255,0,255],value:0,label:""}],vizDetails:{network:"",drtTrips:"",projection:"",title:"",description:"",thumbnail:"",center:[13.45,52.5],zoom:10,mapIsIndependent:!1,theme:""},myState:{statusMessage:"",clock:"00:00",colorScheme:u.DarkMode,isRunning:!1,isShowingHelp:!1,subfolder:"",yamlConfig:"",thumbnail:!1,data:[]},timeStart:0,timeEnd:86400,traces:d([]),traceStart:{},traceEnd:{},traceVehicle:{},paths:d([]),pathStart:{},pathEnd:{},pathVehicle:{},requests:d([]),requestStart:{},requestEnd:{},requestVehicle:{},simulationTime:6*3600,timeElapsedSinceLastFrame:0,searchTerm:"",searchEnabled:!1,globalState:m.state,isDarkMode:m.state.isDarkMode,isLoaded:!0,showHelp:!1,speedStops:[-20,-10,-5,-2,-1,-.5,-.25,0,.25,.5,1,2,5,10,20],speed:10,legendBits:[],isEmbedded:!1,thumbnailUrl:"url('assets/thumbnail.jpg') no-repeat;",vehicleLookup:[],vehicleLookupString:{},isPausedDueToHiding:!1}},computed:{fileApi(){return new ee(this.fileSystem,m)},fileSystem(){const s=this.$store.state.svnProjects.filter(e=>e.slug===this.root);if(s.length===0)throw console.log("no such project"),Error;return s[0]},urlThumbnail(){return this.thumbnailUrl},textColor(){const s={text:"#3498db",bg:"#eeeef480"},e={text:"white",bg:"#181518aa"};return this.myState.colorScheme===u.DarkMode?e:s}},watch:{"$store.state.viewState"(){this.vizDetails.mapIsIndependent||T[this.viewId]&&T[this.viewId]()},async"globalState.authAttempts"(){console.log("AUTH CHANGED - Reload"),this.yamlConfig||this.buildRouteFromUrl(),await this.getVizDetails()},"globalState.colorScheme"(){this.isDarkMode=this.globalState.colorScheme===u.DarkMode,this.updateLegendColors()},searchTerm(){const s=this.vehicleLookupString[this.searchTerm];s>-1?(console.log("vehicle",s),this.pathVehicle?.filterExact(s),this.traceVehicle?.filterExact(s),this.requestVehicle?.filterExact(s),this.requestStart.filterAll(),this.requestEnd.filterAll(),this.searchEnabled=!0):(console.log("nope"),this.pathVehicle?.filterAll(),this.traceVehicle?.filterAll(),this.requestVehicle?.filterAll(),this.searchEnabled=!1),this.updateDatasetFilters()}},methods:{async handleSettingChange(s){console.log(s),this.SETTINGS[s]=!this.SETTINGS[s],this.updateDatasetFilters(),this.simulationTime+=1},buildRouteFromUrl(){const s=this.$route.params;if(!s.project||!s.pathMatch){console.log("I CANT EVEN: NO PROJECT/PARHMATCH");return}const e=1+s.pathMatch.lastIndexOf("/"),t=s.pathMatch.substring(0,e),i=s.pathMatch.substring(e);this.myState.subfolder=t,this.myState.yamlConfig=i},async getVizDetails(){if(this.configFromDashboard)this.vizDetails=JSON.parse(JSON.stringify(this.configFromDashboard));else try{const e=this.myState.yamlConfig.indexOf("/")>-1?this.myState.yamlConfig:this.myState.subfolder+"/"+this.myState.yamlConfig,t=await this.fileApi.getFileText(e);this.vizDetails=N.parse(t)}catch(e){console.log("failed");const t=e;this.fileSystem.needPassword&&t.status===401?m.commit("requestLogin",this.fileSystem.slug):this.$emit("error",""+t)}this.vizDetails.theme&&this.$store.commit("setTheme",this.vizDetails.theme),this.vizDetails.center&&this.$store.commit("setMapCamera",{longitude:this.vizDetails.center[0],latitude:this.vizDetails.center[1],zoom:this.vizDetails.zoom||10,pitch:20,bearing:0});const s=this.vizDetails.title?this.vizDetails.title:"Agent Animation";this.$emit("title",s),this.buildThumbnail()},async buildThumbnail(){if(this.thumbnail&&this.vizDetails.thumbnail)try{const s=await this.fileApi.getFileBlob(this.myState.subfolder+"/"+this.vizDetails.thumbnail),e=await V.arraybuffer(s),t=U(e);t&&(this.thumbnailUrl=`center / cover no-repeat url(data:image/png;base64,${t})`)}catch(s){console.error(s)}},handleClick(s){if(s===null){this.searchTerm="";return}const e=this.vehicleLookup[s];console.log(e),this.searchTerm===e?this.searchTerm="":this.searchTerm=e},updateLegendColors(){},setWallClock(){const s=Math.floor(this.simulationTime/3600),e=Math.floor(this.simulationTime/60)%60;this.myState.clock=`${s<10?"0":""}${s}${e<10?":0":":"}${e}`},setTime(s){this.simulationTime=s,this.setWallClock(),this.traceStart&&this.pathStart&&this.requestStart&&(this.pathStart.filter([0,this.simulationTime]),this.pathEnd.filter([this.simulationTime,1/0]),this.searchEnabled||(this.traceStart.filter([0,this.simulationTime]),this.traceEnd.filter([this.simulationTime,1/0]),this.requestStart.filter([0,this.simulationTime]),this.requestEnd.filter([this.simulationTime,1/0]))),this.$options.paths=this.paths.allFiltered(),this.$options.traces=this.traces.allFiltered(),this.$options.drtRequests=this.requests.allFiltered()},toggleSimulation(){this.myState.isRunning=!this.myState.isRunning,this.timeElapsedSinceLastFrame=Date.now(),this.myState.isRunning&&this.speed===0&&(this.speed=1),this.myState.isRunning&&this.animate()},async parseDrtRequests(s){if(this.vehicleLookup.length)for(const e of s)try{e[5]=this.vehicleLookupString[e[5]]}catch{}return d(s)},async parseVehicles(s){const e=[];let t=-1;for(const i of s){const h=i.path,l=i.timestamps,o=i.passengers;t++,this.vehicleLookup[t]=i.id,this.vehicleLookupString[i.id]=t;for(let r=0;r<i.path.length-1;r++){const c={t0:l[r],t1:l[r+1],p0:h[r],p1:h[r+1],v:t,occ:o[r]};c.p0[0]==c.p1[0]&&c.p0[1]==c.p1[1]&&(c.occ=0),e.push(c)}}return d(e)},setEmbeddedMode(){"embed"in this.$route.query&&(console.log("EMBEDDED MODE"),this.isEmbedded=!0,this.$store.commit("setShowLeftBar",!1),this.$store.commit("setFullWidth",!0))},updateDatasetFilters(){!this.traceStart||!this.pathStart||!this.requestStart||(this.SETTINGS.routes&&(this.searchEnabled?(this.traceStart.filterAll(),this.traceEnd.filterAll()):(this.traceStart.filter([0,this.simulationTime]),this.traceEnd.filter([this.simulationTime,1/0])),this.$options.traces=this.traces.allFiltered()),this.SETTINGS.vehicles&&(this.pathStart.filter([0,this.simulationTime]),this.pathEnd.filter([this.simulationTime,1/0]),this.$options.paths=this.paths.allFiltered()),this.SETTINGS.requests&&(this.searchEnabled?(this.requestStart.filterAll(),this.requestEnd.filterAll()):(this.requestStart.filter([0,this.simulationTime]),this.requestEnd.filter([this.simulationTime,1/0])),this.$options.drtRequests=this.requests.allFiltered()))},animate(){if(this.myState.isRunning){const s=Date.now()-this.timeElapsedSinceLastFrame;this.timeElapsedSinceLastFrame+=s,this.simulationTime+=s*this.speed*.06,this.updateDatasetFilters(),this.setWallClock(),window.requestAnimationFrame(this.animate)}},handleVisibilityChange(){this.isPausedDueToHiding&&!document.hidden?(console.log("unpausing"),this.isPausedDueToHiding=!1,this.toggleSimulation()):this.myState.isRunning&&document.hidden&&(console.log("pausing"),this.isPausedDueToHiding=!0,this.toggleSimulation())},async parseRouteTraces(s){let e=-1;const t=[];for(const i of s){e++;let h=i.timestamps[0],l=i.timestamps[0],o=[];for(let r=1;r<i.path.length;r++)l=i.timestamps[r],i.path[r][0]===i.path[r-1][0]&&i.path[r][1]===i.path[r-1][1]?(o.forEach(c=>{c.t1=i.timestamps[r-1]}),t.push(...o),o=[],h=l):o.push({t0:h,p0:i.path[r-1],p1:i.path[r],v:e,occ:i.passengers[r-1]});o.forEach(r=>{r.t1=l}),t.push(...o)}return d(t)},async loadFiles(){let s=[],e=[];try{if(this.vizDetails.drtTrips.endsWith("json")){const t=await this.fileApi.getFileJson(this.myState.subfolder+"/"+this.vizDetails.drtTrips);s=t.trips,e=t.drtRequests}else if(this.vizDetails.drtTrips.endsWith("gz")){const i=await(await this.fileApi.getFileBlob(this.myState.subfolder+"/"+this.vizDetails.drtTrips)).arrayBuffer(),h=Y(i),l=new TextDecoder("utf-8").decode(h),o=JSON.parse(l);s=o.trips,e=o.drtRequests}}catch(t){console.error(t),this.myState.statusMessage=""+t}return{trips:s,drtRequests:e}},toggleLoaded(s){this.isLoaded=s},rotateColors(){this.myState.colorScheme=this.myState.colorScheme===u.DarkMode?u.LightMode:u.DarkMode,localStorage.setItem("plugin/agent-animation/colorscheme",this.myState.colorScheme)}},async mounted(){if(m.commit("setFullScreen",!this.thumbnail),this.myState.thumbnail=this.thumbnail,this.myState.yamlConfig=this.yamlConfig??"",this.myState.subfolder=this.subfolder,this.setEmbeddedMode(),await this.getVizDetails(),this.thumbnail)return;this.showHelp=!1,this.updateLegendColors(),this.setWallClock(),this.myState.statusMessage="/ Dateien laden...",console.log("loading files");const{trips:s,drtRequests:e}=await this.loadFiles();console.log("parsing vehicle motion"),this.myState.statusMessage=`${this.$t("vehicles")}...`,this.paths=await this.parseVehicles(s),this.pathStart=this.paths.dimension(t=>t.t0),this.pathEnd=this.paths.dimension(t=>t.t1),this.pathVehicle=this.paths.dimension(t=>t.v),console.log("Routes..."),this.myState.statusMessage=`${this.$t("routes")}...`,this.traces=await this.parseRouteTraces(s),this.traceStart=this.traces.dimension(t=>t.t0),this.traceEnd=this.traces.dimension(t=>t.t1),this.traceVehicle=this.traces.dimension(t=>t.v),console.log("Requests..."),this.myState.statusMessage=`${this.$t("requests")}...`,this.requests=await this.parseDrtRequests(e),this.requestStart=this.requests.dimension(t=>t[0]),this.requestEnd=this.requests.dimension(t=>t[6]),this.requestVehicle=this.requests.dimension(t=>t[5]),console.log("GO!"),this.myState.statusMessage="",document.addEventListener("visibilitychange",this.handleVisibilityChange,!1),this.myState.isRunning=!0,this.timeElapsedSinceLastFrame=Date.now(),this.animate()},beforeDestroy(){document.removeEventListener("visibilityChange",this.handleVisibilityChange),m.commit("setFullScreen",!1),this.$store.commit("setFullScreen",!1),this.myState.isRunning=!1}});var be=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",{staticClass:"gl-app",class:{"hide-thumbnail":!e.thumbnail},style:{background:e.urlThumbnail},attrs:{oncontextmenu:"return false"}},[e.thumbnail?e._e():t("trip-viz",{staticClass:"anim",attrs:{center:e.vizDetails.center,colors:e.COLOR_OCCUPANCY,drtRequests:e.$options.drtRequests,dark:e.globalState.isDarkMode,paths:e.$options.paths,settingsShowLayers:e.SETTINGS,searchEnabled:e.searchEnabled,simulationTime:e.simulationTime,traces:e.$options.traces,vehicleLookup:e.vehicleLookup,viewId:e.viewId,onClick:e.handleClick}}),e.thumbnail?e._e():t("zoom-buttons"),e.isLoaded&&!e.thumbnail?t("div",{staticClass:"right-side"},[t("collapsible-panel",{attrs:{direction:"right"}},[t("div",{staticClass:"big clock"},[t("p",[e._v(e._s(e.myState.clock))])]),t("div",{staticClass:"panel-items"},[e.legendItems.length?t("legend-colors",{staticClass:"legend-block",attrs:{title:`${e.$t("passengers")}:`,items:e.legendItems}}):e._e(),t("legend-colors",{staticClass:"legend-block",attrs:{title:`${e.$t("requests")}:`,items:e.legendRequests}}),t("div",{staticClass:"search-panel"},[t("p",{staticClass:"speed-label",style:{margin:"1rem 0 0 0"}},[e._v(e._s(e.$t("search")))]),t("form",{attrs:{autocomplete:"off"}}),t("div",{staticClass:"field"},[t("p",{staticClass:"control has-icons-left"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchTerm,expression:"searchTerm"}],staticClass:"input is-small",attrs:{type:"email",placeholder:`${e.$t("search")}...`},domProps:{value:e.searchTerm},on:{input:function(i){i.target.composing||(e.searchTerm=i.target.value)}}}),t("span",{staticClass:"icon is-small is-left"},[t("i",{staticClass:"fas fa-search"})])])])]),t("settings-panel",{staticClass:"settings-area",attrs:{items:e.SETTINGS},on:{click:e.handleSettingChange}}),t("div",{staticClass:"speed-block"},[t("p",{staticClass:"speed-label"},[e._v(e._s(e.$t("speed"))+":"),t("br"),e._v(e._s(e.speed)+"x")]),t("b-slider",{staticClass:"speed-slider",attrs:{min:e.speedStops[0],max:e.speedStops[e.speedStops.length-1],duration:0,dotSize:20,tooltip:!0,"tooltip-placement":"bottom","tooltip-formatter":i=>i+"x"},model:{value:e.speed,callback:function(i){e.speed=i},expression:"speed"}},[e._l(e.speedStops,function(i){return[t("b-slider-tick",{key:i,attrs:{value:i}})]})],2)],1)],1)])],1):e._e(),!e.thumbnail&&e.isLoaded?t("playback-controls",{staticClass:"bottom-area",attrs:{timeStart:e.timeStart,timeEnd:e.timeEnd,isRunning:e.myState.isRunning,currentTime:e.simulationTime},on:{click:e.toggleSimulation,time:e.setTime}}):e._e()],1)},Te=[],ve=k(Se,be,Te,!1,null,"7d2500c4");const Ve=ve.exports;export{Ve as default};
