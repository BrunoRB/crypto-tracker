(function(t){function e(e){for(var o,i,a=e[0],c=e[1],u=e[2],p=0,d=[];p<a.length;p++)i=a[p],n[i]&&d.push(n[i][0]),n[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);l&&l(e);while(d.length)d.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var t,e=0;e<s.length;e++){for(var r=s[e],o=!0,a=1;a<r.length;a++){var c=r[a];0!==n[c]&&(o=!1)}o&&(s.splice(e--,1),t=i(i.s=r[0]))}return t}var o={},n={0:0},s=[];function i(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=o,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(r,o,function(e){return t[e]}.bind(null,o));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var l=c;s.push([0,1]),r()})({0:function(t,e,r){t.exports=r("Vtdi")},"A0++":function(t,e,r){"use strict";var o=r("mKCy"),n=r.n(o);n.a},Vtdi:function(t,e,r){"use strict";r.r(e);var o=r("6DIm"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("router-view",{key:t.$route.path})],1)},s=[],i={name:"app",components:{}},a=i,c=(r("A0++"),r("psIG")),u=Object(c["a"])(a,n,s,!1,null,null,null),l=u.exports,p=r("OeKD"),d=r.n(p),h=r("SvlV"),f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"products"}},[r("h1",[t._v("Welcome to yet another Crypto Tracker 😃")]),r("div",{attrs:{id:"select"}},[r("pulse-loader",{attrs:{loading:t.loading}}),t.loading?t._e():r("v-select",{attrs:{options:t.options,"on-change":t.onChange},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),r("div",{attrs:{id:"prices"}},[r("clip-loader",{attrs:{loading:t.loadingProd}}),t.products&&Object.keys(t.products).length?r("div",t._l(t.products,function(e){return r("div",{key:e.exchange,staticClass:"card",class:{lower:e.isLower,higher:e.isHigher}},[r("div",{staticClass:"container"},[r("p",[r("strong",[t._v(t._s(e.exchange))])]),r("p",{staticClass:"price"},[r("em",[t._v(t._s(e.price))])])])])})):t._e()],1),t.errors&&t.errors.length?r("ul",{attrs:{id:"errors"}},t._l(t.errors,function(e){return r("li",{key:e},[t._v("\n\t\t\t"+t._s(e)+"\n\t\t")])})):t._e()])},E=[],_=r("czhI"),m=r.n(_),g=r("nck6"),v=r("Q5DN"),O=r("lhvG"),b=r.n(O);const N=b.a.SERVER_HOST+":"+b.a.SERVER_PORT;var y={name:"Products",components:{PulseLoader:g["a"],ClipLoader:v["a"]},props:{},data:()=>{return{options:[],selected:null,products:[],errors:[],loading:!0,loadingProd:!1}},mounted(){this.errors=[];let t=Promise.resolve();this.$route.params.options?(this.options=this.$route.params.options,this.loading=!1):t=this.getAll(),this.$route.params.product?(this.selected=this.$route.params.product,t.then(()=>{this.getProduct(this.$route.params.product)})):this.products=[]},methods:{getAll(){return this.loading=!0,m.a.get(`${N}/api/products`).then(t=>{this.loading=!1,this.options=t.data}).catch(t=>{return this.loading=!1,this.errors.push("Failed trying to fetch the product list"),console.error(t),Promise.reject(t)})},getProduct(t){return this.loadingProd=!0,m.a.get(`${N}/api/products/${t}/prices`).then(t=>{this.loadingProd=!1,this.products=t.data}).catch(e=>{this.loadingProd=!1,console.error(e),this.errors.push(`${t} fetch failed`)})},onChange(t){t?this.$router.push({name:"Product",params:{product:t,options:this.options}}):this.$router.push({name:"Products",params:{options:this.options}})}}},P=y,T=(r("fT71"),Object(c["a"])(P,f,E,!1,null,"01bced76",null)),j=T.exports,$=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},D=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"not-found"}},[r("h1",[t._v("\n\t\tCould not find the requested resource.\n\t\t"),r("a",{attrs:{href:"/"}},[t._v("Get back to the main page.")])])])}],w={},A=Object(c["a"])(w,$,D,!1,null,null,null),M=A.exports;let R=[{path:"/",redirect:"/products"},{path:"/products",name:"Products",component:j,meta:{}},{path:"/product/:product/prices",name:"Product",component:j,meta:{}},{path:"*",component:M,meta:{unauthorized:!0}}];const S=new h["a"]({base:"",mode:"history",routes:R});o["a"].use(h["a"]);var x=S;o["a"].config.productionTip=!1,o["a"].component("v-select",d.a),new o["a"]({render:t=>t(l),router:x}).$mount("#app")},fT71:function(t,e,r){"use strict";var o=r("mRTp"),n=r.n(o);n.a},lhvG:function(t,e,r){"use strict";(function(e){const o=r("Gstq")("ct-br:confs");r("R8iU");let n={isProduction:!1,MONEEDA_TOKEN:null,SERVER_HOST:"http://localhost",SERVER_PORT:8081},s={};const i="function"!==typeof r&&"object"===typeof e;if(i){try{s=r(!function(){var t=new Error("Cannot find module './../prod-confs.json'");throw t.code="MODULE_NOT_FOUND",t}()),o("Found production confs",Object.keys(s))}catch(t){o("Production confs not found at ./../prod-confs.json")}if(!s.MONEEDA_TOKEN&&!Object({NODE_ENV:"production",BASE_URL:"/"}).MONEEDA_TOKEN)throw'\n\t\t\tMissing MONEEDA_TOKEN.\n\t\t\tPlease include it in src/prod-confs.json or use the ENV var "MONEEDA_TOKEN".\n\t\t';Object({NODE_ENV:"production",BASE_URL:"/"}).MONEEDA_TOKEN&&(s.MONEEDA_TOKEN=Object({NODE_ENV:"production",BASE_URL:"/"}).MONEEDA_TOKEN);let t=s.MONEEDA_TOKEN;o("MONEEDA_TOKEN",`${t.substring(0,4)}...${t.substring(t.length-4)}`)}for(let t in s)n[t]=s[t];t.exports=n}).call(this,r("b8mS"))},mKCy:function(t,e,r){},mRTp:function(t,e,r){}});
//# sourceMappingURL=app.2d484036.js.map