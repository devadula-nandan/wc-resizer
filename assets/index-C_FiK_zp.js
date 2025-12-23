(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const R=globalThis,F=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),st=new WeakMap;let $t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(F&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&st.set(e,t))}return t}toString(){return this.cssText}};const bt=o=>new $t(typeof o=="string"?o:o+"",void 0,J),P=(o,...t)=>{const e=o.length===1?o[0]:t.reduce(((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1]),o[0]);return new $t(e,o,J)},At=(o,t)=>{if(F)o.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const i=document.createElement("style"),s=R.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},ot=F?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return bt(e)})(o):o;const{is:xt,defineProperty:wt,getOwnPropertyDescriptor:St,getOwnPropertyNames:Et,getOwnPropertySymbols:Pt,getPrototypeOf:zt}=Object,T=globalThis,rt=T.trustedTypes,Nt=rt?rt.emptyScript:"",Ct=T.reactiveElementPolyfillSupport,N=(o,t)=>o,D={toAttribute(o,t){switch(t){case Boolean:o=o?Nt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},X=(o,t)=>!xt(o,t),nt={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),T.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&wt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=St(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){const l=s?.call(this);r?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??nt}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;const t=zt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){const e=this.properties,i=[...Et(e),...Pt(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(ot(s))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return At(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:D).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:D;this._$Em=s;const l=n.fromAttribute(e,r.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??X)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:n}=r,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,r,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[N("elementProperties")]=new Map,w[N("finalized")]=new Map,Ct?.({ReactiveElement:w}),(T.reactiveElementVersions??=[]).push("2.1.1");const Y=globalThis,L=Y.trustedTypes,ht=L?L.createPolicy("lit-html",{createHTML:o=>o}):void 0,vt="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+g,Ot=`<${gt}>`,A=document,C=()=>A.createComment(""),O=o=>o===null||typeof o!="object"&&typeof o!="function",Z=Array.isArray,kt=o=>Z(o)||typeof o?.[Symbol.iterator]=="function",I=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,at=/>/g,_=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,dt=/"/g,yt=/^(?:script|style|textarea|title)$/i,Ut=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=Ut(1),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),pt=new WeakMap,b=A.createTreeWalker(A,129);function _t(o,t){if(!Z(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}const Ht=(o,t)=>{const e=o.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",n=z;for(let l=0;l<e;l++){const h=o[l];let c,p,a=-1,$=0;for(;$<h.length&&(n.lastIndex=$,p=n.exec(h),p!==null);)$=n.lastIndex,n===z?p[1]==="!--"?n=lt:p[1]!==void 0?n=at:p[2]!==void 0?(yt.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=_):p[3]!==void 0&&(n=_):n===_?p[0]===">"?(n=s??z,a=-1):p[1]===void 0?a=-2:(a=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?_:p[3]==='"'?dt:ct):n===dt||n===ct?n=_:n===lt||n===at?n=z:(n=_,s=void 0);const v=n===_&&o[l+1].startsWith("/>")?" ":"";r+=n===z?h+Ot:a>=0?(i.push(c),h.slice(0,a)+vt+h.slice(a)+g+v):h+g+(a===-2?l:v)}return[_t(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class k{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const l=t.length-1,h=this.parts,[c,p]=Ht(t,e);if(this.el=k.createElement(c,i),b.currentNode=this.el.content,e===2||e===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(s=b.nextNode())!==null&&h.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const a of s.getAttributeNames())if(a.endsWith(vt)){const $=p[n++],v=s.getAttribute(a).split(g),M=/([.?@])?(.*)/.exec($);h.push({type:1,index:r,name:M[2],strings:v,ctor:M[1]==="."?Rt:M[1]==="?"?Dt:M[1]==="@"?Lt:j}),s.removeAttribute(a)}else a.startsWith(g)&&(h.push({type:6,index:r}),s.removeAttribute(a));if(yt.test(s.tagName)){const a=s.textContent.split(g),$=a.length-1;if($>0){s.textContent=L?L.emptyScript:"";for(let v=0;v<$;v++)s.append(a[v],C()),b.nextNode(),h.push({type:2,index:++r});s.append(a[$],C())}}}else if(s.nodeType===8)if(s.data===gt)h.push({type:2,index:r});else{let a=-1;for(;(a=s.data.indexOf(g,a+1))!==-1;)h.push({type:7,index:r}),a+=g.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function E(o,t,e=o,i){if(t===S)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl;const r=O(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=E(o,s._$AS(o,t.values),s,i)),t}class Mt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);b.currentNode=s;let r=b.nextNode(),n=0,l=0,h=i[0];for(;h!==void 0;){if(n===h.index){let c;h.type===2?c=new H(r,r.nextSibling,this,t):h.type===1?c=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&(c=new Tt(r,this,t)),this._$AV.push(c),h=i[++l]}n!==h?.index&&(r=b.nextNode(),n++)}return b.currentNode=A,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class H{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=k.createElement(_t(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const r=new Mt(s,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new k(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new H(this.O(C()),this.O(C()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(r===void 0)t=E(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==S,n&&(this._$AH=t);else{const l=t;let h,c;for(t=r[0],h=0;h<r.length-1;h++)c=E(this,l[i+h],e,h),c===S&&(c=this._$AH[h]),n||=!O(c)||c!==this._$AH[h],c===d?t=d:t!==d&&(t+=(c??"")+r[h+1]),this._$AH[h]=c}n&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Rt extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Dt extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Lt extends j{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===S)return;const i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const jt=Y.litHtmlPolyfillSupport;jt?.(k,H),(Y.litHtmlVersions??=[]).push("3.3.1");const It=(o,t,e)=>{const i=e?.renderBefore??t;let s=i._$litPart$;if(s===void 0){const r=e?.renderBefore??null;i._$litPart$=s=new H(t.insertBefore(C(),r),r,void 0,e??{})}return s._$AI(o),s};const G=globalThis;let f=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=It(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};f._$litElement$=!0,f.finalized=!0,G.litElementHydrateSupport?.({LitElement:f});const Wt=G.litElementPolyfillSupport;Wt?.({LitElement:f});(G.litElementVersions??=[]).push("4.2.1");const Q=o=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(o,t)})):customElements.define(o,t)};const qt={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:X},Bt=(o=qt,t,e)=>{const{kind:i,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),i==="accessor"){const{name:n}=e;return{set(l){const h=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,h,o)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(i==="setter"){const{name:n}=e;return function(l){const h=this[n];t.call(this,l),this.requestUpdate(n,h,o)}}throw Error("Unsupported decorator location: "+i)};function x(o){return(t,e)=>typeof e=="object"?Bt(o,t,e):((i,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}const ut=new WeakMap,ft=o=>{if((e=>e.pattern!==void 0)(o))return o.pattern;let t=ut.get(o);return t===void 0&&ut.set(o,t=new URLPattern({pathname:o.path})),t};let Vt=class{constructor(t,e,i){this.routes=[],this.o=[],this.t={},this.i=s=>{if(s.routes===this)return;const r=s.routes;this.o.push(r),r.h=this,s.stopImmediatePropagation(),s.onDisconnect=()=>{this.o?.splice(this.o.indexOf(r)>>>0,1)};const n=mt(this.t);n!==void 0&&r.goto(n)},(this.l=t).addController(this),this.routes=[...e],this.fallback=i?.fallback}link(t){if(t?.startsWith("/"))return t;if(t?.startsWith("."))throw Error("Not implemented");return t??=this.u,(this.h?.link()??"")+t}async goto(t){let e;if(this.routes.length===0&&this.fallback===void 0)e=t,this.u="",this.t={0:e};else{const i=this.p(t);if(i===void 0)throw Error("No route found for "+t);const s=ft(i).exec({pathname:t}),r=s?.pathname.groups??{};if(e=mt(r),typeof i.enter=="function"&&await i.enter(r)===!1)return;this.v=i,this.t=r,this.u=e===void 0?t:t.substring(0,t.length-e.length)}if(e!==void 0)for(const i of this.o)i.goto(e);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(t){const e=this.routes.find((i=>ft(i).test({pathname:t})));return e||this.fallback===void 0?e:this.fallback?{...this.fallback,path:"/*"}:void 0}hostConnected(){this.l.addEventListener(U.eventName,this.i);const t=new U(this);this.l.dispatchEvent(t),this._=t.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}};const mt=o=>{let t;for(const e of Object.keys(o))/\d+/.test(e)&&(t===void 0||e>t)&&(t=e);return t&&o[t]};class U extends Event{constructor(t){super(U.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}}U.eventName="lit-routes-connected";const Kt=location.origin||location.protocol+"//"+location.host;class Ft extends Vt{constructor(){super(...arguments),this.m=t=>{const e=t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey;if(t.defaultPrevented||e)return;const i=t.composedPath().find((n=>n.tagName==="A"));if(i===void 0||i.target!==""||i.hasAttribute("download")||i.getAttribute("rel")==="external")return;const s=i.href;if(s===""||s.startsWith("mailto:"))return;const r=window.location;i.origin===Kt&&(t.preventDefault(),s!==r.href&&(window.history.pushState({},"",s),this.goto(i.pathname)))},this.R=t=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener("click",this.m),window.addEventListener("popstate",this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener("click",this.m),window.removeEventListener("popstate",this.R)}}var Jt=Object.getOwnPropertyDescriptor,Xt=(o,t,e,i)=>{for(var s=i>1?void 0:i?Jt(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(s)||s);return s};let W=class extends f{render(){return u`
      <nav>
        <a href="/wc-resizer/">Home</a>
        <a href="/wc-resizer/vertical-example">Vertical Example</a>
        <a href="/wc-resizer/horizontal-example">Horizontal Example</a>
        <a href="/wc-resizer/axis-example">Axis Example</a>
      </nav>
    `}};W.styles=[P`
      :host {
        font-size: 1rem;
      }
    `];W=Xt([Q("main-navigation")],W);var Yt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,y=(o,t,e,i)=>{for(var s=i>1?void 0:i?Zt(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Yt(t,e,s),s};let m=class extends f{constructor(){super(),this.topNode=null,this.bottomNode=null,this.leftNode=null,this.rightNode=null,this.orientation="horizontal",this.bounded=!1,this.fluid=!1,this.dragging=!1,this.activePointerId=null,this.initialPointerPos=null,this.currentSizes=null,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onDoubleClick=this.onDoubleClick.bind(this),this.tabIndex=0,this.role="separator"}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerdown",this.onPointerDown),this.addEventListener("pointermove",this.onPointerMove),this.addEventListener("pointerup",this.onPointerUp),this.addEventListener("pointercancel",this.onPointerUp),this.addEventListener("dblclick",this.onDoubleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onPointerDown),this.removeEventListener("pointermove",this.onPointerMove),this.removeEventListener("pointerup",this.onPointerUp),this.removeEventListener("pointercancel",this.onPointerUp),this.removeEventListener("dblclick",this.onDoubleClick)}willUpdate(o){if(o.has("topNode")||o.has("bottomNode")||o.has("leftNode")||o.has("rightNode")){const t=(this.topNode||this.bottomNode)&&!this.leftNode&&!this.rightNode,e=(this.leftNode||this.rightNode)&&!this.topNode&&!this.bottomNode;this.orientation=t?"vertical":e?"horizontal":null}}onPointerDown(o){o.preventDefault(),this.dragging=!0,this.activePointerId=o.pointerId,this.initialPointerPos={x:o.clientX,y:o.clientY},this.currentSizes={topHeight:this.topNode?.offsetHeight,bottomHeight:this.bottomNode?.offsetHeight,leftWidth:this.leftNode?.offsetWidth,rightWidth:this.rightNode?.offsetWidth},this.setPointerCapture(o.pointerId),document.body.style.userSelect="none"}onPointerMove(o){if(!this.dragging||o.pointerId!==this.activePointerId||!this.initialPointerPos||!this.currentSizes)return;const t=o.clientX-this.initialPointerPos.x,e=o.clientY-this.initialPointerPos.y;let i=t,s=e;if(this.bounded&&this.currentSizes.leftWidth!==void 0&&this.currentSizes.rightWidth!==void 0){const r=-this.currentSizes.leftWidth,n=this.currentSizes.rightWidth;i=Math.min(n,Math.max(r,t))}if(this.bounded&&this.currentSizes.topHeight!==void 0&&this.currentSizes.bottomHeight!==void 0){const r=-this.currentSizes.topHeight,n=this.currentSizes.bottomHeight;s=Math.min(n,Math.max(r,e))}this.topNode&&this.currentSizes.topHeight!==void 0&&(this.topNode.style.blockSize=`${this.currentSizes.topHeight+s}px`),this.bottomNode&&this.currentSizes.bottomHeight!==void 0&&(this.bottomNode.style.blockSize=`${this.currentSizes.bottomHeight-s}px`),this.leftNode&&this.currentSizes.leftWidth!==void 0&&(this.leftNode.style.inlineSize=`${this.currentSizes.leftWidth+i}px`),this.rightNode&&this.currentSizes.rightWidth!==void 0&&(this.rightNode.style.inlineSize=`${this.currentSizes.rightWidth-i}px`)}onPointerUp(o){o.pointerId===this.activePointerId&&(this.dragging=!1,this.activePointerId=null,this.initialPointerPos=null,this.currentSizes=null,this.releasePointerCapture(o.pointerId),document.body.style.userSelect="")}onDoubleClick(){console.log("omdc")}render(){return u`<slot name="icon"></slot>`}};m.styles=P`
    :host {
      display: block;
      min-block-size: 4px;
      min-inline-size: 4px;
      position: relative;
      touch-action: none;
      user-select: none;
    }

    :host::before {
      content: "";
      position: absolute;
      inset: 0;
      background: #ffffff13;
    }

    :host([orientation="vertical"]) {
      cursor: row-resize;
    }

    :host([orientation="vertical"])::before {
      top: -4px;
      block-size: calc(100% + 8px);
      inline-size: 100%;
    }

    :host([orientation="horizontal"]) {
      cursor: col-resize;
    }

    :host([orientation="horizontal"])::before {
      left: -4px;
      inline-size: calc(100% + 8px);
      block-size: 100%;
    }

    ::slotted([slot="icon"]) {
      position: absolute;
      inset: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  `;y([x({type:Object})],m.prototype,"topNode",2);y([x({type:Object})],m.prototype,"bottomNode",2);y([x({type:Object})],m.prototype,"leftNode",2);y([x({type:Object})],m.prototype,"rightNode",2);y([x({reflect:!0})],m.prototype,"orientation",2);y([x({type:Boolean})],m.prototype,"bounded",2);y([x({type:Boolean})],m.prototype,"fluid",2);m=y([Q("wc-resizer")],m);const tt=class tt extends f{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const t=this.renderRoot.querySelector("#ex-1"),e=this.renderRoot.querySelector("#ex-1-el-1"),i=this.renderRoot.querySelector("#ex-1-el-2");t.topNode=e,t.bottomNode=i})}render(){return u`
      <div class="container" style="display: inline-block">
        <div id="ex-1-el-1" class="el">element 1</div>
        <wc-resizer id="ex-1" bounded> </wc-resizer>
        <div id="ex-1-el-2" class="el">element 2</div>
      </div>
    `}};tt.styles=P`
    .el {
      height: 198px;
      width: 600px;
      background-color: #ffffff31;
      overflow: auto;
    }

    wc-resizer {
      background: gray;
    }
  `;let q=tt;customElements.define("vertical-example",q);const et=class et extends f{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const t=this.renderRoot.querySelector("#ex-2"),e=this.renderRoot.querySelector("#ex-2-el-1"),i=this.renderRoot.querySelector("#ex-2-el-2");t.leftNode=e,t.rightNode=i})}render(){return u`
      <div class="container" style="display: inline-flex;">
        <div id="ex-2-el-1" class="el">element 1</div>
        <wc-resizer id="ex-2" bounded> </wc-resizer>
        <div id="ex-2-el-2" class="el">element 2</div>
      </div>
    `}};et.styles=P`
    .el {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: auto;
    }

    wc-resizer {
      background: gray;
    }
  `;let B=et;customElements.define("horizontal-example",B);const it=class it extends f{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const t=this.renderRoot.querySelector("#ex-1"),e=this.renderRoot.querySelector("#ex-2"),i=this.renderRoot.querySelector("#ex-axis"),s=this.renderRoot.querySelector("#el-1"),r=this.renderRoot.querySelector("#el-2"),n=this.renderRoot.querySelector("#el-3"),l=this.renderRoot.querySelector("#el-4");t.leftNode=s,t.rightNode=r,e.topNode=n,e.bottomNode=l,i.leftNode=s,i.rightNode=r,i.topNode=n,i.bottomNode=l})}render(){return u`
      <div class="container c-1" style="display: inline-flex;">
        <div id="el-1">element 1</div>
        <wc-resizer id="ex-1" bounded> </wc-resizer>
        <div class="container" id="el-2" style="display: inline-flex; flex-direction: column;">
          <div id="el-3">element 3</div>
         <div id="ex-1-2"> <wc-resizer id="ex-axis" bounded> </wc-resizer>
          <wc-resizer id="ex-2" orientation="vertical" bounded> </wc-resizer></div>
          <div id="el-4">element 4</div>
        </div>
      </div>
    `}};it.styles=P`
    #el-1 {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: hidden;
    }
    #el-2 {
      height: 400px;
      width: 298px;
      background-color: #ffffff31;
      overflow: hidden;
    }
    #el-3 {
      height: 198px;
      background-color: #ffffff31;
      overflow: hidden;
    }
    #el-4 {
      height: 198px;
      background-color: #ffffff31;
      overflow: hidden;
    }

    #ex-axis {
      block-size: 4px;
      inline-size: 4px;
      background: #ffffff;
      position: absolute;
      z-index: 10;
      margin-left: -4px;
      cursor: move;

      &::before {
        content: "";
        block-size: 12px;
        inline-size: 12px;
        background: transparent;
        position: absolute;
        inset: 50%;
        /* background-color: #ffffff13; */
        background-color: transparent;
        transform: translate(-50%, -50%);
      }
    }

    .c-1 {
      position: relative;
    }

    wc-resizer {
      background: gray;
    }
  `;let V=it;customElements.define("axis-example",V);var Gt=Object.getOwnPropertyDescriptor,Qt=(o,t,e,i)=>{for(var s=i>1?void 0:i?Gt(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(s)||s);return s};let K=class extends f{constructor(){super(...arguments),this.router=new Ft(this,[{path:"/wc-resizer/vertical-example",render:()=>u`<vertical-example></vertical-example>`},{path:"/wc-resizer/horizontal-example",render:()=>u`<horizontal-example></horizontal-example>`},{path:"/wc-resizer/axis-example",render:()=>u`<axis-example></axis-example>`},{path:"/wc-resizer/",render:()=>u`<p>Welcome to Home</p>`}])}render(){return u`
      <main-navigation></main-navigation>
      <main>${this.router.outlet()}</main>
    `}};K.styles=P`
    :host {
      box-sizing: border-box;
    }
  `;K=Qt([Q("app-root")],K);
