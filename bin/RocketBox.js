var h=void 0,j=null,l,m=this;
function p(a){var b=typeof a;if(b=="object")if(a){if(a instanceof Array)return"array";else if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if(c=="[object Window]")return"object";if(c=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(c=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if(b=="function"&&typeof a.call=="undefined")return"object";return b}function aa(a){var b=p(a);return b=="array"||b=="object"&&typeof a.length=="number"}function q(a){return typeof a=="string"}function ba(a){var b=typeof a;return b=="object"&&a!=j||b=="function"}function r(a){return a[ca]||(a[ca]=++da)}var ca="closure_uid_"+Math.floor(Math.random()*2147483648).toString(36),da=0;function ea(a,b,c){return a.call.apply(a.bind,arguments)}
function fa(a,b,c){if(!a)throw Error();if(arguments.length>2){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}else return function(){return a.apply(b,arguments)}}function s(a,b,c){s=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ea:fa;return s.apply(j,arguments)}
function ha(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}}function t(a,b){function c(){}c.prototype=b.prototype;a.ua=b.prototype;a.prototype=new c};function ia(a){if(!ja.test(a))return a;a.indexOf("&")!=-1&&(a=a.replace(ka,"&amp;"));a.indexOf("<")!=-1&&(a=a.replace(la,"&lt;"));a.indexOf(">")!=-1&&(a=a.replace(ma,"&gt;"));a.indexOf('"')!=-1&&(a=a.replace(na,"&quot;"));return a}var ka=/&/g,la=/</g,ma=/>/g,na=/\"/g,ja=/[&<>\"]/;function u(a,b){if(a<b)return-1;else if(a>b)return 1;return 0}function oa(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};var v,w,x,z,pa;function qa(){return m.navigator?m.navigator.userAgent:j}z=x=w=v=!1;var A;if(A=qa()){var ra=m.navigator;v=A.indexOf("Opera")==0;w=!v&&A.indexOf("MSIE")!=-1;x=!v&&A.indexOf("WebKit")!=-1;z=!v&&!x&&ra.product=="Gecko"}var sa=v,B=w,C=z,D=x,ta,ua=m.navigator;ta=ua&&ua.platform||"";pa=ta.indexOf("Mac")!=-1;var va=ta.indexOf("Win")!=-1,wa;
a:{var E="",F;if(sa&&m.opera)var xa=m.opera.version,E=typeof xa=="function"?xa():xa;else if(C?F=/rv\:([^\);]+)(\)|;)/:B?F=/MSIE\s+([^\);]+)(\)|;)/:D&&(F=/WebKit\/(\S+)/),F)var ya=F.exec(qa()),E=ya?ya[1]:"";if(B){var za,Aa=m.document;za=Aa?Aa.documentMode:h;if(za>parseFloat(E)){wa=String(za);break a}}wa=E}var Ba={};
function H(a){var b;if(!(b=Ba[a])){b=0;for(var c=String(wa).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=Math.max(c.length,d.length),e=0;b==0&&e<f;e++){var g=c[e]||"",i=d[e]||"",k=RegExp("(\\d*)(\\D*)","g"),o=RegExp("(\\d*)(\\D*)","g");do{var G=k.exec(g)||["","",""],n=o.exec(i)||["","",""];if(G[0].length==0&&n[0].length==0)break;b=u(G[1].length==0?0:parseInt(G[1],10),n[1].length==0?0:parseInt(n[1],10))||u(G[2].length==0,n[2].length==
0)||u(G[2],n[2])}while(b==0)}b=Ba[a]=b>=0}return b}var Ca={};function I(){return Ca[9]||(Ca[9]=B&&!!document.documentMode&&document.documentMode>=9)};function Da(a,b){for(var c in a)b.call(h,a[c],c,a)}var Ea="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");function Fa(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var e=0;e<Ea.length;e++)c=Ea[e],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var J=Array.prototype,K=J.indexOf?function(a,b,c){return J.indexOf.call(a,b,c)}:function(a,b,c){c=c==j?0:c<0?Math.max(0,a.length+c):c;if(q(a))return!q(b)||b.length!=1?-1:a.indexOf(b,c);for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ga=J.forEach?function(a,b,c){J.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=q(a)?a.split(""):a,e=0;e<d;e++)e in f&&b.call(c,f[e],e,a)},Ha=J.filter?function(a,b,c){return J.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=[],e=0,g=q(a)?a.split(""):
a,i=0;i<d;i++)if(i in g){var k=g[i];b.call(c,k,i,a)&&(f[e++]=k)}return f};function Ia(a){var b=a.length;if(b>0){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}function Ja(a,b,c){return arguments.length<=2?J.slice.call(a,b):J.slice.call(a,b,c)};function L(a,b){this.width=a;this.height=b}function Ka(a,b){return a==b?!0:!a||!b?!1:a.width==b.width&&a.height==b.height}L.prototype.toString=function(){return"("+this.width+" x "+this.height+")"};L.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};L.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var La;function Ma(a){a=a.className;return q(a)&&a.match(/\S+/g)||[]}function Na(a,b){for(var c=Ma(a),d=Ja(arguments,1),f=c.length+d.length,e=c,g=0;g<d.length;g++)K(e,d[g])>=0||e.push(d[g]);a.className=c.join(" ");return c.length==f}function Oa(a,b){var c=Ma(a),d=Ja(arguments,1),c=Pa(c,d);a.className=c.join(" ")}function Pa(a,b){return Ha(a,function(a){return!(K(b,a)>=0)})};var Qa=!B||I();!C&&!B||B&&I()||C&&H("1.9.1");B&&H("9");function Ra(a,b){var c=b&&b!="*"?b.toUpperCase():"";return a.querySelectorAll&&a.querySelector&&c?a.querySelectorAll(c+""):a.getElementsByTagName(c||"*")}function Sa(a,b){Da(b,function(b,d){d=="style"?a.style.cssText=b:d=="class"?a.className=b:d=="for"?a.htmlFor=b:d in Ta?a.setAttribute(Ta[d],b):d.lastIndexOf("aria-",0)==0||d.lastIndexOf("data-",0)==0?a.setAttribute(d,b):a[d]=b})}
var Ta={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function Ua(a){a=a.document;a=a.compatMode=="CSS1Compat"?a.documentElement:a.body;return new L(a.clientWidth,a.clientHeight)}function M(a,b,c){return Va(document,arguments)}
function Va(a,b){var c=b[0],d=b[1];if(!Qa&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',ia(d.name),'"');if(d.type){c.push(' type="',ia(d.type),'"');var f={};Fa(f,d);d=f;delete d.type}c.push(">");c=c.join("")}c=a.createElement(c);if(d)q(d)?c.className=d:p(d)=="array"?Na.apply(j,[c].concat(d)):Sa(c,d);b.length>2&&Wa(a,c,b);return c}
function Wa(a,b,c){function d(c){c&&b.appendChild(q(c)?a.createTextNode(c):c)}for(var f=2;f<c.length;f++){var e=c[f];if(aa(e)&&!(ba(e)&&e.nodeType>0)){var g;a:{if(e&&typeof e.length=="number")if(ba(e)){g=typeof e.item=="function"||typeof e.item=="string";break a}else if(p(e)=="function"){g=typeof e.item=="function";break a}g=!1}Ga(g?Ia(e):e,d)}else d(e)}}function N(a){this.j=a||m.document||document}N.prototype.U=function(a,b,c){return Va(this.j,arguments)};N.prototype.createElement=function(a){return this.j.createElement(a)};
N.prototype.createTextNode=function(a){return this.j.createTextNode(a)};N.prototype.appendChild=function(a,b){a.appendChild(b)};function O(a,b){q(b)?Xa(a,h,b):Da(b,ha(Xa,a))}function Xa(a,b,c){a.style[oa(c)]=b}function Ya(a){var b=a.offsetWidth,c=a.offsetHeight,d=D&&!b&&!c;if((b===h||d)&&a.getBoundingClientRect){b=a.getBoundingClientRect();if(B)a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop;return new L(b.right-b.left,b.bottom-b.top)}return new L(b,c)};function Za(){this.w={}}Za.prototype={Z:function(a){this.w||(this.w={});this.w[a]||(this.w[a]=[]);return this.w[a]},aa:function(a,b,c){this.h("LOG","Events: Listener Attached: "+a);a=this.Z(a);c&&(b=s(b,c));a.push(b)},h:function(a,b){a!=="LOG"&&a!=="APP:TICK"&&a!=="CURSOR:MOVE"&&a!=="MOUSE:MOVE"&&a!=="KEYBOARD:KEY"&&this.h("LOG","Events: Fired: "+a,b);Ga(this.Z(a),function(a){a.apply(j,!b?[]:typeof b=="array"?b:[b])})}};function $a(){}var ab=0;l=$a.prototype;l.key=0;l.p=!1;l.Q=!1;l.m=function(a,b,c,d,f,e){if(p(a)=="function")this.$=!0;else if(a&&a.handleEvent&&p(a.handleEvent)=="function")this.$=!1;else throw Error("Invalid listener argument");this.v=a;this.fa=b;this.src=c;this.type=d;this.capture=!!f;this.I=e;this.Q=!1;this.key=++ab;this.p=!1};l.handleEvent=function(a){return this.$?this.v.call(this.I||this.src,a):this.v.handleEvent.call(this.v,a)};!B||I();var bb=!B||I(),cb=B&&!H("8");!D||H("528");C&&H("1.9b")||B&&H("8")||sa&&H("9.5")||D&&H("528");C&&!H("8")||B&&H("9");function db(){};function P(a,b){this.type=a;this.currentTarget=this.target=b}P.prototype.o=!1;P.prototype.W=!1;P.prototype.D=!0;P.prototype.preventDefault=function(){this.W=!0;this.D=!1};function eb(a){eb[" "](a);return a}eb[" "]=function(){};function Q(a,b){a&&this.m(a,b)}t(Q,P);l=Q.prototype;l.target=j;l.relatedTarget=j;l.offsetX=0;l.offsetY=0;l.clientX=0;l.clientY=0;l.screenX=0;l.screenY=0;l.button=0;l.keyCode=0;l.charCode=0;l.ctrlKey=!1;l.altKey=!1;l.shiftKey=!1;l.metaKey=!1;l.ta=!1;l.X=j;
l.m=function(a,b){var c=this.type=a.type;P.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(C){var f;a:{try{eb(d.nodeName);f=!0;break a}catch(e){}f=!1}f||(d=j)}}else if(c=="mouseover")d=a.fromElement;else if(c=="mouseout")d=a.toElement;this.relatedTarget=d;this.offsetX=D||a.offsetX!==h?a.offsetX:a.layerX;this.offsetY=D||a.offsetY!==h?a.offsetY:a.layerY;this.clientX=a.clientX!==h?a.clientX:a.pageX;this.clientY=a.clientY!==h?a.clientY:a.pageY;this.screenX=
a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||(c=="keypress"?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.ta=pa?a.metaKey:a.ctrlKey;this.state=a.state;this.X=a;a.W&&this.preventDefault();delete this.o};
l.preventDefault=function(){Q.ua.preventDefault.call(this);var a=this.X;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,cb)try{if(a.ctrlKey||a.keyCode>=112&&a.keyCode<=123)a.keyCode=-1}catch(b){}};var R={},S={},T={},U={};
function V(a,b,c,d,f){if(b)if(p(b)=="array"){for(var e=0;e<b.length;e++)V(a,b[e],c,d,f);return j}else{var d=!!d,g=S;b in g||(g[b]={e:0,d:0});g=g[b];d in g||(g[d]={e:0,d:0},g.e++);var g=g[d],i=r(a),k;g.d++;if(g[i]){k=g[i];for(e=0;e<k.length;e++)if(g=k[e],g.v==c&&g.I==f){if(g.p)break;return k[e].key}}else k=g[i]=[],g.e++;e=fb();e.src=a;g=new $a;g.m(c,e,a,b,d,f);c=g.key;e.key=c;k.push(g);R[c]=g;T[i]||(T[i]=[]);T[i].push(g);a.addEventListener?(a==m||!a.V)&&a.addEventListener(b,e,d):a.attachEvent(b in
U?U[b]:U[b]="on"+b,e);return c}else throw Error("Invalid event type");}function fb(){var a=gb,b=bb?function(c){return a.call(b.src,b.key,c)}:function(c){c=a.call(b.src,b.key,c);if(!c)return c};return b}function hb(a,b,c,d,f){if(p(b)=="array")for(var e=0;e<b.length;e++)hb(a,b[e],c,d,f);else{d=!!d;a:{e=S;if(b in e&&(e=e[b],d in e&&(e=e[d],a=r(a),e[a]))){a=e[a];break a}a=j}if(a)for(e=0;e<a.length;e++)if(a[e].v==c&&a[e].capture==d&&a[e].I==f){ib(a[e].key);break}}}
function ib(a){if(R[a]){var b=R[a];if(!b.p){var c=b.src,d=b.type,f=b.fa,e=b.capture;c.removeEventListener?(c==m||!c.V)&&c.removeEventListener(d,f,e):c.detachEvent&&c.detachEvent(d in U?U[d]:U[d]="on"+d,f);c=r(c);if(T[c]){var f=T[c],g=K(f,b);g>=0&&J.splice.call(f,g,1);f.length==0&&delete T[c]}b.p=!0;if(b=S[d][e][c])b.ba=!0,jb(d,e,c,b);delete R[a]}}}
function jb(a,b,c,d){if(!d.A&&d.ba){for(var f=0,e=0;f<d.length;f++)d[f].p?d[f].fa.src=j:(f!=e&&(d[e]=d[f]),e++);d.length=e;d.ba=!1;e==0&&(delete S[a][b][c],S[a][b].e--,S[a][b].e==0&&(delete S[a][b],S[a].e--),S[a].e==0&&delete S[a])}}function X(a,b,c,d,f){var e=1,b=r(b);if(a[b]){a.d--;a=a[b];a.A?a.A++:a.A=1;try{for(var g=a.length,i=0;i<g;i++){var k=a[i];k&&!k.p&&(e&=kb(k,f)!==!1)}}finally{a.A--,jb(c,d,b,a)}}return Boolean(e)}function kb(a,b){a.Q&&ib(a.key);return a.handleEvent(b)}
function gb(a,b){if(!R[a])return!0;var c=R[a],d=c.type,f=S;if(!(d in f))return!0;var f=f[d],e,g;if(!bb){var i;if(!(i=b))a:{i="window.event".split(".");for(var k=m;e=i.shift();)if(k[e]!=j)k=k[e];else{i=j;break a}i=k}e=i;i=!0 in f;k=!1 in f;if(i){if(e.keyCode<0||e.returnValue!=h)return!0;a:{var o=!1;if(e.keyCode==0)try{e.keyCode=-1;break a}catch(G){o=!0}if(o||e.returnValue==h)e.returnValue=!0}}o=new Q;o.m(e,this);e=!0;try{if(i){for(var n=[],W=o.currentTarget;W;W=W.parentNode)n.push(W);g=f[!0];g.d=g.e;
for(var y=n.length-1;!o.o&&y>=0&&g.d;y--)o.currentTarget=n[y],e&=X(g,n[y],d,!0,o);if(k){g=f[!1];g.d=g.e;for(y=0;!o.o&&y<n.length&&g.d;y++)o.currentTarget=n[y],e&=X(g,n[y],d,!1,o)}}else e=kb(c,o)}finally{if(n)n.length=0}return e}d=new Q(b,this);return e=kb(c,d)};function lb(){}t(lb,db);l=lb.prototype;l.V=!0;l.ca=j;l.addEventListener=function(a,b,c,d){V(this,a,b,c,d)};l.removeEventListener=function(a,b,c,d){hb(this,a,b,c,d)};
l.dispatchEvent=function(a){var b=a.type||a,c=S;if(b in c){if(q(a))a=new P(a,this);else if(a instanceof P)a.target=a.target||this;else{var d=a,a=new P(b,this);Fa(a,d)}var d=1,f,c=c[b],b=!0 in c,e;if(b){f=[];for(e=this;e;e=e.ca)f.push(e);e=c[!0];e.d=e.e;for(var g=f.length-1;!a.o&&g>=0&&e.d;g--)a.currentTarget=f[g],d&=X(e,f[g],a.type,!0,a)&&a.D!=!1}if(!1 in c)if(e=c[!1],e.d=e.e,b)for(g=0;!a.o&&g<f.length&&e.d;g++)a.currentTarget=f[g],d&=X(e,f[g],a.type,!1,a)&&a.D!=!1;else for(f=this;!a.o&&f&&e.d;f=
f.ca)a.currentTarget=f,d&=X(e,f,a.type,!1,a)&&a.D!=!1;a=Boolean(d)}else a=!0;return a};function mb(a){this.t=a||window;this.qa=V(this.t,"resize",this.oa,!1,this);this.M=Ua(this.t||window);if(D&&va||sa&&this.t.self!=this.t.top)this.ya=window.setInterval(s(this.S,this),nb)}t(mb,lb);var nb=500;l=mb.prototype;l.qa=j;l.t=j;l.M=j;l.ya=j;l.oa=function(){this.S()};l.S=function(){var a=Ua(this.t||window);if(!Ka(a,this.M))this.M=a,this.dispatchEvent("resize")};function ob(a){this.b=a.b;this.O=this.r=h;this.k=[];this.Y=0;this.N=a&&a.N?a.N:1;this.c=a&&a.c?a.c:30;this.F=a&&a.F?a.F:"TICK";this.T=0;this.q=!1}
ob.prototype={play:function(){this.ha();this.q=!0;this.pa=setInterval(s(this.ha,this),1E3/this.c)},pause:function(){clearInterval(this.pa);this.q=!1;this.r=h},ha:function(){this.O=(new Date).getTime();var a=!this.r?0:this.O-this.r;this.r&&a>0&&(a>1E3/this.c&&(a=1E3/this.c),this.T+=a/100);this.b.h(this.F,{dt:a,fps:this.Y,counter:this.T,speed:this.N});if(this.r&&a>0&&(this.k.push(1E3/a),this.k.length>this.c)){for(var b=a=0,c=this.k.length;b<c;b++)a+=this.k[b];this.Y=Math.round(a/this.k.length);this.k=
[]}this.r=this.O}};var qb=pb,Y="RocketBox".split("."),Z=m;!(Y[0]in Z)&&Z.execScript&&Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)!Y.length&&qb!==h?Z[$]=qb:Z=Z[$]?Z[$]:Z[$]={};
function pb(a,b){this.G=a;if(!this.G)this.G={initalise:function(){}};this.options={id:h,title:h,description:h,autoPlay:!0,fps:30,width:480,height:320,fullscreen:!1};Fa(this.options,b);this.R=h;this.a={};this.u={ra:"&#9658;",da:"&#9658; PLAY",sa:"&#10073;&#10073; PAUSE",Aa:"DEMO",l:"FULLSCREEN"};this.H={ka:"APP:TICK",ja:"APP:PLAY",ia:"APP:PAUSE"};this.na={la:".rocketBox.fullscreen { margin:0 !important; max-width:100% !important; z-index:5337; position:absolute !important; width:100% !important; height:100% !important; left:0px; right:0px;  top:0px; bottom:0px; } .rocketBoxFullScreenBody { width:100%; height:100%; margin:0; }"};
this.b=new Za;this.s=new ob({b:this.b,c:this.options.fps,F:this.H.ka});this.ea=new L(this.options.width,this.options.height);this.xa=new mb;V(this.xa,"resize",s(this.L,this));this.m()}
pb.prototype={m:function(){var e;var a=this.na.la,b=La||(La=new N),c=j;if(B)e=c=b.j.createStyleSheet(),b=e,B?b.cssText=a:b.innerHTML=a;else{var d=Ra(b.j,"head")[0];d||(c=Ra(b.j,"body")[0],d=b.U("head"),c.parentNode.insertBefore(d,c));var f=c=b.U("style");B?f.cssText=a:f.innerHTML=a;b.appendChild(d,c)}this.b.aa("APP:TICK",this.P,this);this.ma();this.L();this.G.initalise({canvas:this.a.canvas,canvasContext:this.R,events:{fire:s(this.b.h,this.b),listen:s(this.b.aa,this.b)},viewportWidth:h,viewportHeight:h,
renderCallback:s(this.P,this)});window.ga===h&&this.options.autoPlay&&this.play({za:!1})},L:function(){var a;a=this.a.canvas;var b;b:{b=a.nodeType==9?a:a.ownerDocument||a.document;if(b.defaultView&&b.defaultView.getComputedStyle&&(b=b.defaultView.getComputedStyle(a,j))){b=b.display||b.getPropertyValue("display")||"";break b}b=""}if((b||(a.currentStyle?a.currentStyle.display:j)||a.style&&a.style.display)!="none")a=Ya(a);else{b=a.style;var c=b.display,d=b.visibility,f=b.position;b.visibility="hidden";
b.position="absolute";b.display="inline";a=Ya(a);b.display=c;b.position=f;b.visibility=d}if(!Ka(this.ea,a))O(this.a.g,{width:"100%",height:a.height+"px"}),O(this.a.B,{lineHeight:a.height+"px"}),this.ea=a,this.b.h("APP:RESIZE",{width:a.width,height:a.height}),Sa(this.a.canvas,{width:a.width,height:a.height})},va:function(){var a=Ma(this.a.f);K(a,"fullscreen")>=0?(Oa(this.a.f,"fullscreen"),Oa(document.body,"rocketBoxFullScreenBody")):(Na(this.a.f,"fullscreen"),Na(document.body,"rocketBoxFullScreenBody"));
this.L()},wa:function(){this.s.q?this.pause():this.play()},play:function(){if(!this.s.q)this.b.h(this.H.ja),this.s.play(),window.ga=this.options.id,this.a.n.innerHTML=this.u.sa,this.a.g.style.display="none"},pause:function(){if(this.s.q)this.b.h(this.H.ia),this.s.pause(),this.a.n.innerHTML=this.u.da,this.a.g.style.display=""},P:function(a){this.a.c.innerHTML=a.fps?a.fps:"...";this.s.q&&window.ga!==this.options.id&&this.pause()},ma:function(){this.a.f=M("div",{"class":"rocketBox"});O(this.a.f,{position:"relative",
backgroundColor:"#444",border:"1px solid #111",maxWidth:this.options.width+"px",margin:"10px auto 10px auto",borderRadius:"0 0 5px 5px"});document.getElementById(this.options.id).appendChild(this.a.f);this.a.canvas=M("canvas",{id:this.options.id+"_canvas",width:this.options.width,height:this.options.height});O(this.a.canvas,{width:"100%"});this.a.f.appendChild(this.a.canvas);if(!this.a.canvas.getContext)throw"Failed to create canvas element";this.R=this.a.canvas.getContext("2d");this.a.i=M("div");
O(this.a.i,{backgroundColor:"#111",height:"25px",padding:"5px",textAlign:"left"});this.a.n=M("button");this.a.n.innerHTML=this.u.da;O(this.a.n,{backgroundColor:"#ff8000",color:"rgb(255,255,255)",borderRadius:"5px",border:"0px",width:"70px",font:"12px Arial",fontWeight:"bold",marginRight:"10px",cursor:"hand",height:"25px"});V(this.a.n,"click",s(this.wa,this));this.a.i.appendChild(this.a.n);this.a.l=M("button");this.a.l.innerHTML=this.u.l.toUpperCase();O(this.a.l,{backgroundColor:"#ff8000",color:"rgb(255,255,255)",
borderRadius:"5px",border:"0px",width:"100px",font:"12px Arial",fontWeight:"bold",marginLeft:"10px","float":"right",cursor:"hand",height:"25px"});V(this.a.l,"click",s(this.va,this));this.a.i.appendChild(this.a.l);this.a.K=M("span");this.a.K.innerHTML=this.options.title.toUpperCase();O(this.a.K,{color:"rgb(180,180,180)",font:"12px Arial",fontWeight:"bold",lineHeight:"25px"});this.a.C=M("span");O(this.a.C,{color:"rgb(100,100,100)",font:"12px Arial",fontWeight:"bold",lineHeight:"25px"});this.options.appType&&
this.a.C.appendChild(document.createTextNode(this.options.appType.toUpperCase()+": "));this.a.C.appendChild(this.a.K);this.a.i.appendChild(this.a.C);this.a.c=M("span");this.a.c.innerHTML="...";O(this.a.c,{color:"rgb(140,140,140)",font:"12px Arial",fontWeight:"bold",lineHeight:"25px"});this.a.z=M("span");O(this.a.z,{color:"rgb(100,100,100)",font:"12px Arial","float":"right",lineHeight:"25px"});this.a.z.appendChild(document.createTextNode("FPS: "));this.a.z.appendChild(this.a.c);this.a.i.appendChild(this.a.z);
this.a.f.appendChild(this.a.i);this.a.J=M("div");O(this.a.J,{backgroundColor:"#333",color:"#777",padding:"5px 5px 7px 5px",textAlign:"left",font:"12px Arial",borderRadius:"0 0 5px 5px"});this.a.J.appendChild(document.createTextNode(this.options.description));this.a.f.appendChild(this.a.J);this.a.g=M("div");O(this.a.g,{backgroundColor:"rgba(0,0,0,0.35)",width:"100%",height:this.options.height+"px",position:"absolute",top:0,left:0,cursor:"hand"});this.a.B=M("div");this.a.B.innerHTML=this.u.ra;O(this.a.B,
{color:"#eee",fontSize:"64px",textAlign:"center",lineHeight:this.options.height+"px",margin:"auto auto auto auto",textShadow:"0px 0px 15px #222"});this.a.g.appendChild(this.a.B);this.a.f.appendChild(this.a.g);V(this.a.g,"mousemove",s(this.play,this));V(this.a.g,"click",s(this.play,this))}};
