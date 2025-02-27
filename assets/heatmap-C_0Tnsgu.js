import{d as m,g as u,U as g,B as c,h,n as p}from"./index-DXwMd8J6.js";import{V as y}from"./VuePlotly-BpPZBeQs.js";import{b}from"./LayoutManager-BfjoD8GM.js";import{l as x}from"./lodash-C_sSUKB1.js";import"./HTTPFileSystem-mhJZeBxO.js";import"./index-6F3aLhar.js";import"./TopSheet-Bo3k3l39.js";import"./papaparse.min-BiqfovEr.js";import"./DashboardDataManager-BPyHyjlN.js";import"./util-DDCxpZ5I.js";import"./fxp-4YEvQr-_.js";import"./extends-CCbyfPlC.js";import"./avro-Dd9UqmeZ.js";import"./RoadNetworkLoader.worker-Dk5IXYzf.js";import"./Coords-D-UV8-Xi.js";import"./group-DobYzF2-.js";import"./index-_doEQLKC.js";const S=m({name:"HeatmapPanel",components:{VuePlotly:y},props:{fileSystemConfig:{type:Object,required:!0},subfolder:{type:String,required:!0},files:{type:Array,required:!0},config:{type:Object,required:!0},cardTitle:{type:String,required:!0},cardId:String,datamanager:{type:Object,required:!0},zoomed:Boolean},data:()=>({globalState:u.state,dataSet:{},id:"heatmap-"+Math.floor(1e12*Math.random()),YAMLrequirementsHeatmap:{dataset:"",y:""},layout:{margin:{t:8,b:50},font:{color:"#444444",family:g},barmode:"",bargap:.08,xaxis:{autorange:!0,title:""},yaxis:{autorange:!0,title:""},legend:{x:1,xanchor:"right",y:1},annotations:[]},data:[],options:{displaylogo:!1,responsive:!0,modeBarButtonsToRemove:["pan2d","zoom2d","select2d","lasso2d","zoomIn2d","zoomOut2d","autoScale2d","hoverClosestCartesian","hoverCompareCartesian","resetScale2d","toggleSpikelines","resetViewMapbox"],toImageButtonOptions:{format:"png",filename:"heatmap",width:1200,height:800,scale:1}}}),async mounted(){this.updateTheme(),this.checkWarningsAndErrors(),this.dataSet=await this.loadData(),Object.keys(this.dataSet).length&&(this.updateChart(),this.options.toImageButtonOptions.filename=b(this.cardTitle,this.subfolder),this.$emit("dimension-resizer",{id:this.cardId,resizer:this.changeDimensions})),this.$emit("isLoaded")},beforeDestroy(){this.datamanager?.removeFilterListener({...this.config,subfolder:this.subfolder},this.handleFilterChanged)},watch:{zoomed(){this.resizePlot()},"globalState.isDarkMode"(){this.updateTheme()}},methods:{changeDimensions(t){this.layout=Object.assign({},this.layout,t)},resizePlot(){var t=document.getElementsByClassName("spinner-box");if(this.zoomed)for(let e of t)e.clientHeight>0&&(this.layout.height=e.clientHeight);else this.layout.height=300},updateTheme(){const t={paper_bgcolor:c[this.globalState.colorScheme],plot_bgcolor:c[this.globalState.colorScheme],font:{color:this.globalState.isDarkMode?"#cccccc":"#444444"}};this.layout=Object.assign({},this.layout,t)},handleFilterChanged(){if(!this.datamanager)return;const{filteredRows:t}=this.datamanager.getFilteredDataset(this.config);if(!t||!t.length)this.dataSet={allRows:{}};else{const e={},i=Object.keys(t[0]);i.forEach(a=>e[a]={name:a,values:[]}),t.forEach(a=>{i.forEach(l=>e[l].values.push(a[l]))}),this.dataSet={allRows:e}}this.updateChart()},async loadData(){try{this.validateYAML();let t=await this.datamanager.getDataset(this.config,{subfolder:this.subfolder});if(!this.config.filters)return t;this.datamanager.addFilterListener({...this.config,subfolder:this.subfolder},this.handleFilterChanged);for(const[e,i]of Object.entries(this.config.filters)){const a={dataset:this.config.dataset,column:e,value:i,range:Array.isArray(i)};this.datamanager.setFilter(a)}return{allRows:{}}}catch(t){this.$emit("error",`Error loading: ${this.subfolder}/${this.config.dataset}`),console.error(""+t)}return{allRows:{}}},validateYAML(){for(const t in this.YAMLrequirementsHeatmap)t in this.config||this.$emit("error",{type:h.ERROR,msg:`YAML file missing required key: ${t}`,desc:"Check this.YAMLrequirementsXY for required keys"})},updateChart(){this.layout.xaxis.title=this.config.xAxisTitle||this.config.xAxisName||"",this.layout.yaxis.title=this.config.yAxisTitle||this.config.yAxisName||"";try{this.config.groupBy?this.updateChartWithGroupBy():this.updateChartSimple()}catch(t){const e=""+t;this.$emit("error",{type:h.ERROR,msg:e,desc:"Add a desription..."})}},updateChartWithGroupBy(){},updateChartSimple(){var t=[],e=[];const i=this.dataSet.allRows||{};let a=this.config.columns||this.config.usedCol||[];if(!a.length){let s=Object.keys(i);const r=this.config.y,o=s.indexOf(r,0);o>-1&&s.splice(o,1),a=s}if(!a.length)return;let l=!0;const d=["y"];for(const s of d)i[this.config[s]]||(this.$emit("error",`${this.cardTitle}: "${this.config.dataset}" ${d} column "${s}" missing`),l=!1);if(!l)return;let n=i[this.config.y].values;for(const s of Object.keys(i))a.includes(s)&&t.push(s);for(let s=0;s<a.length;s++)e[s]=i[a[s]].values;if(this.config.flipAxes||(n=n.reverse(),this.transpose(e),e=e.reverse()),this.data=[{x:this.config.flipAxes?n:t,y:this.config.flipAxes?t:n,z:e,colorscale:"Viridis",type:"heatmap",automargin:!0}],this.config.showLabels){this.layout.annotations.length=0;const s=this.data[0];for(let r=0;r<s.x.length;r++)for(let o=0;o<s.y.length;o++){const f={x:s.x[r],y:s.y[o],text:x.round(s.z[o][r],2),showarrow:!1,font:{family:"Arial Black",size:12,color:"white"}};this.layout.annotations.push(f)}}},transpose(t){for(let e=0;e<t.length;e++)for(let i=0;i<e;i++){const a=t[e][i];t[e][i]=t[i][e],t[i][e]=a}},checkWarningsAndErrors(){var t=this.cardTitle;t.length==0&&this.$emit("error",{type:h.WARNING,msg:"The plot title is missing!",desc:"Please add a plot title in the .yaml-file (title: 'Example title')"})}}});var C=function(){var e=this,i=e._self._c;return e._self._setupProxy,i("VuePlotly",{staticClass:"myplot",attrs:{data:e.data,layout:e.layout,options:e.options,id:e.id}})},v=[],A=p(S,C,v,!1,null,"616c8475");const P=A.exports;export{P as default};
