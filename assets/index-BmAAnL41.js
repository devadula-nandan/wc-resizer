(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const T=globalThis,W=T.ShadowRoot&&(T.ShadyCSS===void 0||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ie=new WeakMap;let pe=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(W&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ie.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ie.set(t,e))}return e}toString(){return this.cssText}};const ge=r=>new pe(typeof r=="string"?r:r+"",void 0,K),P=(r,...e)=>{const t=r.length===1?r[0]:e.reduce(((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1]),r[0]);return new pe(t,r,K)},$e=(r,e)=>{if(W)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const i=document.createElement("style"),s=T.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},se=W?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ge(t)})(r):r;const{is:be,defineProperty:ye,getOwnPropertyDescriptor:_e,getOwnPropertyNames:xe,getOwnPropertySymbols:Ae,getPrototypeOf:we}=Object,j=globalThis,re=j.trustedTypes,ze=re?re.emptyScript:"",Ee=j.reactiveElementPolyfillSupport,C=(r,e)=>r,H={toAttribute(r,e){switch(e){case Boolean:r=r?ze:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},J=(r,e)=>!be(r,e),oe={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&ye(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=_e(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const l=s?.call(this);o?.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??oe}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=we(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,i=[...xe(t),...Ae(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(se(s))}else e!==void 0&&t.push(se(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:H).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:H;this._$Em=s;const l=n.fromAttribute(t,o.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const s=this.constructor,o=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??J)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,o]of i){const{wrapped:n}=o,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,o,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[C("elementProperties")]=new Map,A[C("finalized")]=new Map,Ee?.({ReactiveElement:A}),(j.reactiveElementVersions??=[]).push("2.1.1");const X=globalThis,L=X.trustedTypes,ne=L?L.createPolicy("lit-html",{createHTML:r=>r}):void 0,ue="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+$,Pe=`<${ve}>`,x=document,N=()=>x.createComment(""),R=r=>r===null||typeof r!="object"&&typeof r!="function",Y=Array.isArray,Se=r=>Y(r)||typeof r?.[Symbol.iterator]=="function",q=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ae=/-->/g,le=/>/g,y=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,he=/"/g,me=/^(?:script|style|textarea|title)$/i,Ce=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),U=Ce(1),z=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),de=new WeakMap,_=x.createTreeWalker(x,129);function fe(r,e){if(!Y(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ne!==void 0?ne.createHTML(e):e}const Ne=(r,e)=>{const t=r.length-1,i=[];let s,o=e===2?"<svg>":e===3?"<math>":"",n=S;for(let l=0;l<t;l++){const a=r[l];let h,p,c=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===S?p[1]==="!--"?n=ae:p[1]!==void 0?n=le:p[2]!==void 0?(me.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=y):p[3]!==void 0&&(n=y):n===y?p[0]===">"?(n=s??S,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?y:p[3]==='"'?he:ce):n===he||n===ce?n=y:n===ae||n===le?n=S:(n=y,s=void 0);const g=n===y&&r[l+1].startsWith("/>")?" ":"";o+=n===S?a+Pe:c>=0?(i.push(h),a.slice(0,c)+ue+a.slice(c)+$+g):a+$+(c===-2?l:g)}return[fe(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class O{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const l=e.length-1,a=this.parts,[h,p]=Ne(e,t);if(this.el=O.createElement(h,i),_.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=_.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(ue)){const m=p[n++],g=s.getAttribute(c).split($),D=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:D[2],strings:g,ctor:D[1]==="."?Oe:D[1]==="?"?ke:D[1]==="@"?Ue:I}),s.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:o}),s.removeAttribute(c));if(me.test(s.tagName)){const c=s.textContent.split($),m=c.length-1;if(m>0){s.textContent=L?L.emptyScript:"";for(let g=0;g<m;g++)s.append(c[g],N()),_.nextNode(),a.push({type:2,index:++o});s.append(c[m],N())}}}else if(s.nodeType===8)if(s.data===ve)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf($,c+1))!==-1;)a.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(e,t){const i=x.createElement("template");return i.innerHTML=e,i}}function E(r,e,t=r,i){if(e===z)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl;const o=R(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=E(r,s._$AS(r,e.values),s,i)),e}class Re{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??x).importNode(t,!0);_.currentNode=s;let o=_.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new M(o,o.nextSibling,this,e):a.type===1?h=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(h=new Me(o,this,e)),this._$AV.push(h),a=i[++l]}n!==a?.index&&(o=_.nextNode(),n++)}return _.currentNode=x,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),R(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==z&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Se(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(fe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const o=new Re(s,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=de.get(e.strings);return t===void 0&&de.set(e.strings,t=new O(e)),t}k(e){Y(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new M(this.O(N()),this.O(N()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(o===void 0)e=E(this,e,t,0),n=!R(e)||e!==this._$AH&&e!==z,n&&(this._$AH=e);else{const l=e;let a,h;for(e=o[0],a=0;a<o.length-1;a++)h=E(this,l[i+a],t,a),h===z&&(h=this._$AH[a]),n||=!R(h)||h!==this._$AH[a],h===d?e=d:e!==d&&(e+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oe extends I{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class ke extends I{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class Ue extends I{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??d)===z)return;const i=this._$AH,s=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Me{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}}const De=X.litHtmlPolyfillSupport;De?.(O,M),(X.litHtmlVersions??=[]).push("3.3.1");const Te=(r,e,t)=>{const i=t?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const o=t?.renderBefore??null;i._$litPart$=s=new M(e.insertBefore(N(),o),o,void 0,t??{})}return s._$AI(r),s};const Z=globalThis;class u extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}u._$litElement$=!0,u.finalized=!0,Z.litElementHydrateSupport?.({LitElement:u});const He=Z.litElementPolyfillSupport;He?.({LitElement:u});(Z.litElementVersions??=[]).push("4.2.1");const G=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};const Le={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:J},je=(r=Le,e,t)=>{const{kind:i,metadata:s}=t;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(t.name,r),i==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,r)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(i==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+i)};function f(r){return(e,t)=>typeof t=="object"?je(r,e,t):((i,s,o)=>{const n=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,e,t)}var Ie=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,b=(r,e,t,i)=>{for(var s=i>1?void 0:i?qe(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&Ie(e,t,s),s};let v=class extends u{constructor(){super(),this.topNode=null,this.bottomNode=null,this.leftNode=null,this.rightNode=null,this.orientation="horizontal",this.bounded=!0,this.fluid=!1,this.dragging=!1,this.externalDrag=!1,this.activePointerId=null,this.initialPointerPos=null,this.gridContainer=null,this.ctx=null,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onDoubleClick=this.onDoubleClick.bind(this),this.tabIndex=0,this.role="separator"}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerdown",this.onPointerDown),this.addEventListener("pointermove",this.onPointerMove),this.addEventListener("pointerup",this.onPointerUp),this.addEventListener("pointercancel",this.onPointerUp),this.addEventListener("dblclick",this.onDoubleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onPointerDown),this.removeEventListener("pointermove",this.onPointerMove),this.removeEventListener("pointerup",this.onPointerUp),this.removeEventListener("pointercancel",this.onPointerUp),this.removeEventListener("dblclick",this.onDoubleClick)}willUpdate(r){if(r.has("topNode")||r.has("bottomNode")||r.has("leftNode")||r.has("rightNode")){const e=(this.topNode||this.bottomNode)&&!this.leftNode&&!this.rightNode,t=(this.leftNode||this.rightNode)&&!this.topNode&&!this.bottomNode;this.orientation=e?"vertical":t?"horizontal":null}}resolveContext(){return this.leftNode&&this.rightNode?{axis:"x",startSize:this.leftNode.getBoundingClientRect().width,endSize:this.rightNode.getBoundingClientRect().width}:this.topNode&&this.bottomNode?{axis:"y",startSize:this.topNode.getBoundingClientRect().height,endSize:this.bottomNode.getBoundingClientRect().height}:null}onPointerDown(r){r.preventDefault(),this.dragging=!0,this.activePointerId=r.pointerId,this.initialPointerPos={x:r.clientX,y:r.clientY},this.gridContainer=this.leftNode?.parentElement??this.topNode?.parentElement??this.rightNode?.parentElement??this.bottomNode?.parentElement??null,this.ctx=this.resolveContext(),!(!this.ctx||!this.gridContainer)&&(this.externalDrag||this.setPointerCapture(r.pointerId),document.body.style.userSelect="none")}onPointerMove(r){if(!this.dragging||r.pointerId!==this.activePointerId||!this.initialPointerPos||!this.gridContainer||!this.ctx)return;const e=this.ctx.axis==="x"?r.clientX-this.initialPointerPos.x:r.clientY-this.initialPointerPos.y;let t=this.ctx.startSize+e,i=this.ctx.endSize-e;this.bounded&&(t=Math.max(0,t),i=Math.max(0,i));const s=t+i||1;this.gridContainer.style.setProperty("--start-element-fraction",`${t/s}fr`),this.gridContainer.style.setProperty("--end-element-fraction",`${i/s}fr`)}onPointerUp(r){r.pointerId===this.activePointerId&&(this.dragging=!1,this.activePointerId=null,this.initialPointerPos=null,this.ctx=null,this.externalDrag||this.releasePointerCapture(r.pointerId),document.body.style.userSelect="")}onDoubleClick(){this.gridContainer?.style.setProperty("--start-element-fraction","1fr"),this.gridContainer?.style.setProperty("--end-element-fraction","1fr")}_startFromExternal(r){this.externalDrag=!0,this.onPointerDown(r)}_moveFromExternal(r){this.onPointerMove(r)}_endFromExternal(r){this.externalDrag=!1,this.onPointerUp(r)}render(){return U`
      <slot name="pivot-start"></slot>
      <div class="icon-container">
        <slot name="icon"></slot>
      </div>
      <slot name="pivot-end"></slot>
    `}};v.styles=P`
    :host {
      --resizer-thickness: 2px;
      display: block;
      min-block-size: max(1px, var(--resizer-thickness, 1px));
      min-inline-size: max(1px, var(--resizer-thickness, 1px));
      touch-action: none;
      user-select: none;
    }

    .icon-container {
      inline-size: 100%;
      block-size: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :host([orientation="vertical"]) {
      cursor: row-resize;
    }

    :host([orientation="horizontal"]) {
      cursor: col-resize;
    }
  `;b([f({type:Object})],v.prototype,"topNode",2);b([f({type:Object})],v.prototype,"bottomNode",2);b([f({type:Object})],v.prototype,"leftNode",2);b([f({type:Object})],v.prototype,"rightNode",2);b([f({reflect:!0})],v.prototype,"orientation",2);b([f({type:Boolean})],v.prototype,"bounded",2);b([f({type:Boolean})],v.prototype,"fluid",2);v=b([G("wc-resizer")],v);var w;let Be=(w=class extends u{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#vertical-resizer"),t=this.renderRoot.querySelectorAll(".el")[0],i=this.renderRoot.querySelectorAll(".el")[1];e.topNode=t,e.bottomNode=i})}render(){return U`
      <div class="vertical-container">
        <div class="el">element 1</div>
        <wc-resizer  id="vertical-resizer">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            style="width: max( 1px, var(--resizer-thickness, 1px));height: max( 1px, var(--resizer-thickness, 1px));"
          >
            <rect width="1" height="1" fill="currentColor" />
          </svg>
        </wc-resizer>
        <div class="el">element 2</div>
      </div>
    `}},w.styles=P`
    .el {
      background-color: var(--cds-layer);
      overflow: auto;
    }
    .vertical-container {
      --start-element-fraction: 1fr;
      --end-element-fraction: 1fr;
      display: grid;
      grid-template-rows: var(--start-element-fraction) auto var(
          --end-element-fraction
        );
      block-size: 100%;
    }

    wc-resizer {
      background: var(--cds-border-subtle);
    }
  `,w);customElements.define("vertical-example",Be);const ee=class ee extends u{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#horizontal-resizer"),t=this.renderRoot.querySelectorAll(".el")[0],i=this.renderRoot.querySelectorAll(".el")[1];e.leftNode=t,e.rightNode=i})}render(){return U`
      <div class="horizontal-container">
        <div class="el">element 1</div>
        <wc-resizer  id="horizontal-resizer">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            style="width: max( 1px, var(--resizer-thickness, 1px));height: max( 1px, var(--resizer-thickness, 1px));"
          >
            <rect width="1" height="1" fill="currentColor" />
          </svg>
        </wc-resizer>
        <div class="el">element 2</div>
      </div>
    `}};ee.styles=P`
    .el {
      background-color: var(--cds-layer);
      overflow: auto;
    }
    .horizontal-container {
      --start-element-fraction: 1fr;
      --end-element-fraction: 1fr;
      display: grid;
      grid-template-columns: var(--start-element-fraction) auto var(
          --end-element-fraction
        );
      block-size: 100%;
    }

    wc-resizer {
      background: var(--cds-border-subtle);
    }
  `;let B=ee;customElements.define("horizontal-example",B);var Fe=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,Q=(r,e,t,i)=>{for(var s=i>1?void 0:i?Ve(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&Fe(e,t,s),s};let k=class extends u{constructor(){super(...arguments),this.dragging=!1}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),this.dragging=!0,this.setPointerCapture(r.pointerId),this.horizontalResizer._startFromExternal(r),this.verticalResizer._startFromExternal(r)}),this.addEventListener("pointermove",r=>{this.dragging&&(this.horizontalResizer._moveFromExternal(r),this.verticalResizer._moveFromExternal(r))}),this.addEventListener("pointerup",r=>{r.preventDefault(),r.stopPropagation(),this.dragging=!1,this.releasePointerCapture(r.pointerId),this.horizontalResizer._endFromExternal(r),this.verticalResizer._endFromExternal(r)}),this.addEventListener("pointercancel",r=>{this.dragging=!1,this.horizontalResizer._endFromExternal(r),this.verticalResizer._endFromExternal(r)})}};k.styles=P`
    :host {
      display: inline-block;
      block-size: max(1px, var(--resizer-thickness, 1px));
      inline-size: max(1px, var(--resizer-thickness, 1px));
      position: absolute;
      cursor: move;
    }
    :host([slot="pivot-start"]) {
      margin-inline-start: calc(var(--resizer-thickness, 4px) * -1);
    }
    :host([slot="pivot-end"]) {
      inset-inline-end: 0;
      margin-block-start: calc(var(--resizer-thickness, 4px) * -1);
      margin-inline-end: calc(var(--resizer-thickness, 4px) * -1);
    }
  `;Q([f({type:Object})],k.prototype,"horizontalResizer",2);Q([f({type:Object})],k.prototype,"verticalResizer",2);k=Q([G("wc-resizer-pivot")],k);const te=class te extends u{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#horizontal-resizer"),t=this.renderRoot.querySelector("#vertical-resizer"),i=this.renderRoot.querySelector("#pivot-resizer"),s=this.renderRoot.querySelectorAll(".el")[0],o=this.renderRoot.querySelectorAll(".el")[1],n=this.renderRoot.querySelectorAll(".el")[2],l=this.renderRoot.querySelectorAll(".el")[3];e.leftNode=s,e.rightNode=o,t.topNode=n,t.bottomNode=l,i.horizontalResizer=e,i.verticalResizer=t})}render(){return U`
      <div class="horizontal-container">
        <div class="el">element 1</div>
        <wc-resizer id="horizontal-resizer" > </wc-resizer>
        <div class="vertical-container el">
          <div class="el">element 3</div>
          <wc-resizer id="vertical-resizer" orientation="vertical" >
            <wc-resizer-pivot id="pivot-resizer" slot="pivot-start">
            </wc-resizer-pivot>
            <svg
              slot="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1 1"
              style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px));"
            >
              <rect width="1" height="1" fill="currentColor" />
            </svg>
          </wc-resizer>

          <div class="el">element 4</div>
        </div>
      </div>
    `}};te.styles=P`
    .el {
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    .horizontal-container {
      --start-element-fraction: 1fr;
      --end-element-fraction: 1fr;
      display: grid;
      grid-template-columns: var(--start-element-fraction) auto var(
          --end-element-fraction
        );
      block-size: 100%;
    }
    .vertical-container {
      --start-element-fraction: 1fr;
      --end-element-fraction: 1fr;
      display: grid;
      grid-template-rows: var(--start-element-fraction) auto var(
          --end-element-fraction
        );
      block-size: 100%;
    }

    wc-resizer {
      background-color: var(--cds-border-subtle);
    }
    wc-resizer-pivot {
      background-color: var(--cds-text-primary);
    }
  `;let F=te;customElements.define("pivot-example",F);var We=Object.getOwnPropertyDescriptor,Ke=(r,e,t,i)=>{for(var s=i>1?void 0:i?We(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=n(s)||s);return s};let V=class extends u{getTabFromUrl(){return new URLSearchParams(window.location.search).get("tab")??"home"}firstUpdated(){const r=this.getTabFromUrl(),e=this.renderRoot.querySelector(`cds-tab[value="${r}"]`);requestAnimationFrame(()=>{e?.click()})}updateUrl(r){const e=new URLSearchParams(window.location.search);e.set("tab",r);const t=`${window.location.pathname}?${e.toString()}`;history.pushState({},"",t)}render(){return U`
      <main>
        <cds-tabs
          type=""
          @cds-tabs-selected=${r=>{const e=r.detail.item.value;this.updateUrl(e)}}
        >
          <cds-tab id="tab-home" target="panel-home" value="home">Home</cds-tab>

          <cds-tab
            id="tab-vertical-example"
            target="panel-vertical-example"
            value="vertical-example"
            >Vertical</cds-tab
          >
          <cds-tab
            id="tab-horizontal-example"
            target="panel-horizontal-example"
            value="horizontal-example"
            >Horizontal</cds-tab
          >
          <cds-tab
            id="tab-pivot-example"
            target="panel-pivot-example"
            value="pivot-example"
            >Pivot</cds-tab
          >
        </cds-tabs>
        <div class="custom-flex">
        <div class="left">
          <div class="resize">
            <div
              id="panel-home"
              role="tabpanel"
              aria-labelledby="tab-home"
              hidden=""
            >
              Tab Panel 1
            </div>
            <div
              id="panel-vertical-example"
              role="tabpanel"
              aria-labelledby="tab-vertical-example"
              hidden=""
            >
              <vertical-example></vertical-example>
            </div>
            <div
              id="panel-horizontal-example"
              role="tabpanel"
              aria-labelledby="tab-horizontal-example"
              hidden=""
            >
              <horizontal-example></horizontal-example>
            </div>
            <div
              id="panel-pivot-example"
              role="tabpanel"
              aria-labelledby="tab-pivot-example"
              hidden=""
            >
              <pivot-example></pivot-example>
            </div>
          </div>
        </div>
        <aside class="controls right">
          <cds-heading>Resizer</cds-heading>
        </aside>
        </div>
      </main>
      

      </aside>
    `}};V.styles=P`
    :host {
      box-sizing: border-box;
    }
    cds-tabs {
      box-shadow: inset 0px -2px 0px var(--cds-border-subtle);
      background-color: var(--cds-layer-01);
    }
    .custom-flex {
      display: flex;
      height: calc(100dvh - 40px);
    }
    .left {
      flex: 1;
      max-inline-size: calc(100% - 24rem - 1px);
      max-block-size: 100%;
    }
    .right {
      flex: 0 0 24rem;
      background-color: var(--cds-layer-01);
      border-inline-start: 1px solid var(--cds-border-subtle);
    }
    .resize {
      resize: both;
      padding: 1rem;
      border: dashed 1px var(--cds-border-strong);
      /* outline: dashed 1px var(--cds-border-strong); */
      outline-offset: -17px;
      overflow: hidden;
      max-inline-size: calc(100% - 34px);
      max-block-size: calc(100% - 34px);
      block-size: 100%;
      min-inline-size: 120px;
      min-block-size: 120px;
      box-shadow: inset 0 0 0 1rem var(--cds-layer-02);
    }
    [role="tabpanel"] {
      block-size: 100%;
    }
  `;V=Ke([G("app-root")],V);
