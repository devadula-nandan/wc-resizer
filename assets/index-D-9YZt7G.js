(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const H=globalThis,V=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),se=new WeakMap;let ue=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(V&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=se.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&se.set(t,e))}return e}toString(){return this.cssText}};const ge=r=>new ue(typeof r=="string"?r:r+"",void 0,K),z=(r,...e)=>{const t=r.length===1?r[0]:e.reduce(((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1]),r[0]);return new ue(t,r,K)},ye=(r,e)=>{if(V)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const i=document.createElement("style"),s=H.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},re=V?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ge(t)})(r):r;const{is:be,defineProperty:_e,getOwnPropertyDescriptor:xe,getOwnPropertyNames:we,getOwnPropertySymbols:Ae,getPrototypeOf:Se}=Object,L=globalThis,oe=L.trustedTypes,ze=oe?oe.emptyScript:"",Pe=L.reactiveElementPolyfillSupport,E=(r,e)=>r,M={toAttribute(r,e){switch(e){case Boolean:r=r?ze:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},J=(r,e)=>!be(r,e),ne={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&_e(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=xe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const a=s?.call(this);o?.call(this,n),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ne}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=Se(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,i=[...we(t),...Ae(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(re(s))}else e!==void 0&&t.push(re(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ye(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:M;this._$Em=s;const a=n.fromAttribute(t,o.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const s=this.constructor,o=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??J)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,o]of i){const{wrapped:n}=o,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[E("elementProperties")]=new Map,w[E("finalized")]=new Map,Pe?.({ReactiveElement:w}),(L.reactiveElementVersions??=[]).push("2.1.1");const X=globalThis,T=X.trustedTypes,le=T?T.createPolicy("lit-html",{createHTML:r=>r}):void 0,ve="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,fe="?"+g,Ee=`<${fe}>`,x=document,C=()=>x.createComment(""),N=r=>r===null||typeof r!="object"&&typeof r!="function",Y=Array.isArray,Ce=r=>Y(r)||typeof r?.[Symbol.iterator]=="function",I=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ae=/-->/g,he=/>/g,b=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,de=/"/g,me=/^(?:script|style|textarea|title)$/i,Ne=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),U=Ne(1),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),pe=new WeakMap,_=x.createTreeWalker(x,129);function $e(r,e){if(!Y(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(e):e}const Oe=(r,e)=>{const t=r.length-1,i=[];let s,o=e===2?"<svg>":e===3?"<math>":"",n=P;for(let a=0;a<t;a++){const l=r[a];let c,p,h=-1,f=0;for(;f<l.length&&(n.lastIndex=f,p=n.exec(l),p!==null);)f=n.lastIndex,n===P?p[1]==="!--"?n=ae:p[1]!==void 0?n=he:p[2]!==void 0?(me.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=b):p[3]!==void 0&&(n=b):n===b?p[0]===">"?(n=s??P,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?b:p[3]==='"'?de:ce):n===de||n===ce?n=b:n===ae||n===he?n=P:(n=b,s=void 0);const $=n===b&&r[a+1].startsWith("/>")?" ":"";o+=n===P?l+Ee:h>=0?(i.push(c),l.slice(0,h)+ve+l.slice(h)+g+$):l+g+(h===-2?a:$)}return[$e(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class O{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,l=this.parts,[c,p]=Oe(e,t);if(this.el=O.createElement(c,i),_.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=_.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(ve)){const f=p[n++],$=s.getAttribute(h).split(g),D=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:D[2],strings:$,ctor:D[1]==="."?Ue:D[1]==="?"?ke:D[1]==="@"?De:j}),s.removeAttribute(h)}else h.startsWith(g)&&(l.push({type:6,index:o}),s.removeAttribute(h));if(me.test(s.tagName)){const h=s.textContent.split(g),f=h.length-1;if(f>0){s.textContent=T?T.emptyScript:"";for(let $=0;$<f;$++)s.append(h[$],C()),_.nextNode(),l.push({type:2,index:++o});s.append(h[f],C())}}}else if(s.nodeType===8)if(s.data===fe)l.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(g,h+1))!==-1;)l.push({type:7,index:o}),h+=g.length-1}o++}}static createElement(e,t){const i=x.createElement("template");return i.innerHTML=e,i}}function S(r,e,t=r,i){if(e===A)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl;const o=N(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=S(r,s._$AS(r,e.values),s,i)),e}class Re{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??x).importNode(t,!0);_.currentNode=s;let o=_.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new k(o,o.nextSibling,this,e):l.type===1?c=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(c=new He(o,this,e)),this._$AV.push(c),l=i[++a]}n!==l?.index&&(o=_.nextNode(),n++)}return _.currentNode=x,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),N(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ce(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement($e(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const o=new Re(s,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=pe.get(e.strings);return t===void 0&&pe.set(e.strings,t=new O(e)),t}k(e){Y(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new k(this.O(C()),this.O(C()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(o===void 0)e=S(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==A,n&&(this._$AH=e);else{const a=e;let l,c;for(e=o[0],l=0;l<o.length-1;l++)c=S(this,a[i+l],t,l),c===A&&(c=this._$AH[l]),n||=!N(c)||c!==this._$AH[l],c===d?e=d:e!==d&&(e+=(c??"")+o[l+1]),this._$AH[l]=c}n&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ue extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class ke extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class De extends j{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??d)===A)return;const i=this._$AH,s=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class He{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const Me=X.litHtmlPolyfillSupport;Me?.(O,k),(X.litHtmlVersions??=[]).push("3.3.1");const Te=(r,e,t)=>{const i=t?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const o=t?.renderBefore??null;i._$litPart$=s=new k(e.insertBefore(C(),o),o,void 0,t??{})}return s._$AI(r),s};const Z=globalThis;class u extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}}u._$litElement$=!0,u.finalized=!0,Z.litElementHydrateSupport?.({LitElement:u});const Le=Z.litElementPolyfillSupport;Le?.({LitElement:u});(Z.litElementVersions??=[]).push("4.2.1");const G=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};const je={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:J},Ie=(r=je,e,t)=>{const{kind:i,metadata:s}=t;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(t.name,r),i==="accessor"){const{name:n}=t;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,r)},init(a){return a!==void 0&&this.C(n,void 0,r,a),a}}}if(i==="setter"){const{name:n}=t;return function(a){const l=this[n];e.call(this,a),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+i)};function m(r){return(e,t)=>typeof t=="object"?Ie(r,e,t):((i,s,o)=>{const n=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,e,t)}var qe=Object.defineProperty,We=Object.getOwnPropertyDescriptor,y=(r,e,t,i)=>{for(var s=i>1?void 0:i?We(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&qe(e,t,s),s};let v=class extends u{constructor(){super(),this.topNode=null,this.bottomNode=null,this.leftNode=null,this.rightNode=null,this.orientation="horizontal",this.bounded=!1,this.fluid=!1,this.dragging=!1,this.externalDrag=!1,this.activePointerId=null,this.initialPointerPos=null,this.currentSizes=null,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onDoubleClick=this.onDoubleClick.bind(this),this.tabIndex=0,this.role="separator"}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerdown",this.onPointerDown),this.addEventListener("pointermove",this.onPointerMove),this.addEventListener("pointerup",this.onPointerUp),this.addEventListener("pointercancel",this.onPointerUp),this.addEventListener("dblclick",this.onDoubleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onPointerDown),this.removeEventListener("pointermove",this.onPointerMove),this.removeEventListener("pointerup",this.onPointerUp),this.removeEventListener("pointercancel",this.onPointerUp),this.removeEventListener("dblclick",this.onDoubleClick)}willUpdate(r){if(r.has("topNode")||r.has("bottomNode")||r.has("leftNode")||r.has("rightNode")){const e=(this.topNode||this.bottomNode)&&!this.leftNode&&!this.rightNode,t=(this.leftNode||this.rightNode)&&!this.topNode&&!this.bottomNode;this.orientation=e?"vertical":t?"horizontal":null}}onPointerDown(r){r.preventDefault(),this.dragging=!0,this.activePointerId=r.pointerId,this.initialPointerPos={x:r.clientX,y:r.clientY},this.currentSizes={topHeight:this.topNode?.offsetHeight,bottomHeight:this.bottomNode?.offsetHeight,leftWidth:this.leftNode?.offsetWidth,rightWidth:this.rightNode?.offsetWidth},this.externalDrag||this.setPointerCapture(r.pointerId),document.body.style.userSelect="none"}onPointerMove(r){if(!this.dragging||r.pointerId!==this.activePointerId||!this.initialPointerPos||!this.currentSizes)return;const e=r.clientX-this.initialPointerPos.x,t=r.clientY-this.initialPointerPos.y;let i=e,s=t;if(this.bounded&&this.currentSizes.leftWidth!==void 0&&this.currentSizes.rightWidth!==void 0){const o=-this.currentSizes.leftWidth,n=this.currentSizes.rightWidth;i=Math.min(n,Math.max(o,e))}if(this.bounded&&this.currentSizes.topHeight!==void 0&&this.currentSizes.bottomHeight!==void 0){const o=-this.currentSizes.topHeight,n=this.currentSizes.bottomHeight;s=Math.min(n,Math.max(o,t))}this.topNode&&this.currentSizes.topHeight!==void 0&&(this.topNode.style.blockSize=`${this.currentSizes.topHeight+s}px`),this.bottomNode&&this.currentSizes.bottomHeight!==void 0&&(this.bottomNode.style.blockSize=`${this.currentSizes.bottomHeight-s}px`),this.leftNode&&this.currentSizes.leftWidth!==void 0&&(this.leftNode.style.inlineSize=`${this.currentSizes.leftWidth+i}px`),this.rightNode&&this.currentSizes.rightWidth!==void 0&&(this.rightNode.style.inlineSize=`${this.currentSizes.rightWidth-i}px`)}onPointerUp(r){r.pointerId===this.activePointerId&&(this.dragging=!1,this.activePointerId=null,this.initialPointerPos=null,this.currentSizes=null,this.externalDrag||this.releasePointerCapture(r.pointerId),document.body.style.userSelect="")}onDoubleClick(){console.log("omdc")}_startFromExternal(r){this.externalDrag=!0,this.onPointerDown(r)}_moveFromExternal(r){this.onPointerMove(r)}_endFromExternal(r){this.externalDrag=!1,this.onPointerUp(r)}render(){return U` <slot name="pivot-start"></slot>
      <div class="icon-container">
        <slot name="icon"> </slot>
      </div>
      <slot name="pivot-end"></slot>`}};v.styles=z`
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
  `;y([m({type:Object})],v.prototype,"topNode",2);y([m({type:Object})],v.prototype,"bottomNode",2);y([m({type:Object})],v.prototype,"leftNode",2);y([m({type:Object})],v.prototype,"rightNode",2);y([m({reflect:!0})],v.prototype,"orientation",2);y([m({type:Boolean})],v.prototype,"bounded",2);y([m({type:Boolean})],v.prototype,"fluid",2);v=y([G("wc-resizer")],v);const ee=class ee extends u{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#ex-2"),t=this.renderRoot.querySelector("#ex-2-el-1"),i=this.renderRoot.querySelector("#ex-2-el-2");e.topNode=t,e.bottomNode=i})}render(){return U`
      <div class="container" style="display: inline-block">
        <div id="ex-2-el-1" class="el">element 1</div>
        <wc-resizer id="ex-2" bounded>
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            style="width: max( 1px, var(--resizer-thickness, 1px));height: max( 1px, var(--resizer-thickness, 1px));"
          >
            <rect width="1" height="1" fill="currentColor" />
          </svg>
        </wc-resizer>
        <div id="ex-2-el-2" class="el">element 2</div>
      </div>
    `}};ee.styles=z`
    .el {
      height: 199px;
      width: 600px;
      background-color: var(--cds-layer);
      overflow: auto;
    }

    wc-resizer {
      background: var(--cds-border-subtle);
    }
  `;let q=ee;customElements.define("vertical-example",q);const te=class te extends u{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#ex-2"),t=this.renderRoot.querySelector("#ex-2-el-1"),i=this.renderRoot.querySelector("#ex-2-el-2");e.leftNode=t,e.rightNode=i})}render(){return U`
      <div class="container" style="display: inline-flex;">
        <div id="ex-2-el-1" class="el">element 1</div>
        <wc-resizer id="ex-2" bounded>
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            style="width: max( 1px, var(--resizer-thickness, 1px));height: max( 1px, var(--resizer-thickness, 1px));"
          >
            <rect width="1" height="1" fill="currentColor" />
          </svg>
        </wc-resizer>
        <div id="ex-2-el-2" class="el">element 2</div>
      </div>
    `}};te.styles=z`
    .el {
      height: 400px;
      width: 299px;
      background-color: var(--cds-layer);
      overflow: auto;
    }

    wc-resizer {
      background: var(--cds-border-subtle);
    }
  `;let W=te;customElements.define("horizontal-example",W);var Be=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,Q=(r,e,t,i)=>{for(var s=i>1?void 0:i?Fe(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&Be(e,t,s),s};let R=class extends u{constructor(){super(...arguments),this.dragging=!1}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),this.dragging=!0,this.setPointerCapture(r.pointerId),this.horizontalResizer._startFromExternal(r),this.verticalResizer._startFromExternal(r)}),this.addEventListener("pointermove",r=>{this.dragging&&(this.horizontalResizer._moveFromExternal(r),this.verticalResizer._moveFromExternal(r))}),this.addEventListener("pointerup",r=>{r.preventDefault(),r.stopPropagation(),this.dragging=!1,this.releasePointerCapture(r.pointerId),this.horizontalResizer._endFromExternal(r),this.verticalResizer._endFromExternal(r)}),this.addEventListener("pointercancel",r=>{this.dragging=!1,this.horizontalResizer._endFromExternal(r),this.verticalResizer._endFromExternal(r)})}};R.styles=z`
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
  `;Q([m({type:Object})],R.prototype,"horizontalResizer",2);Q([m({type:Object})],R.prototype,"verticalResizer",2);R=Q([G("wc-resizer-pivot")],R);const ie=class ie extends u{connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.renderRoot.querySelector("#horizontal-resizer"),t=this.renderRoot.querySelector("#vertical-resizer"),i=this.renderRoot.querySelector("wc-resizer-pivot"),s=this.renderRoot.querySelector("#el-1"),o=this.renderRoot.querySelector("#el-2"),n=this.renderRoot.querySelector("#el-3"),a=this.renderRoot.querySelector("#el-4");e.leftNode=s,e.rightNode=o,t.topNode=n,t.bottomNode=a,i.horizontalResizer=e,i.verticalResizer=t})}render(){return U`
      <div class="container c-1" style="display: inline-flex;">
        <div id="el-1">element 1</div>
        <wc-resizer id="horizontal-resizer" bounded> </wc-resizer>
        <div
          class="container"
          id="el-2"
          style="display: inline-flex; flex-direction: column;"
        >
          <div id="el-3">element 3</div>
          <wc-resizer id="vertical-resizer" orientation="vertical" bounded>
            <wc-resizer-pivot slot="pivot-start"> </wc-resizer-pivot>
            <svg
              slot="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1 1"
              style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px));"
            >
              <rect width="1" height="1" fill="currentColor" />
            </svg>
          </wc-resizer>

          <div id="el-4">element 4</div>
        </div>
      </div>
    `}};ie.styles=z`
    #el-1 {
      width: 299px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    #el-2 {
      width: 299px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    #el-3 {
      height: 199px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }
    #el-4 {
      height: 199px;
      background-color: var(--cds-layer);
      overflow: hidden;
    }

    wc-resizer {
      background: var(--cds-border-subtle);
    }
    wc-resizer-pivot {
      background-color: var(--cds-text-primary);
    }
  `;let B=ie;customElements.define("pivot-example",B);var Ve=Object.getOwnPropertyDescriptor,Ke=(r,e,t,i)=>{for(var s=i>1?void 0:i?Ve(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=n(s)||s);return s};let F=class extends u{getTabFromUrl(){return new URLSearchParams(window.location.search).get("tab")??"home"}firstUpdated(){const r=this.getTabFromUrl(),e=this.renderRoot.querySelector(`cds-tab[value="${r}"]`);requestAnimationFrame(()=>{e?.click()})}updateUrl(r){const e=new URLSearchParams(window.location.search);e.set("tab",r);const t=`${window.location.pathname}?${e.toString()}`;history.pushState({},"",t)}render(){return U`
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
      </main>
    `}};F.styles=z`
    :host {
      box-sizing: border-box;
    }
    cds-tabs {
      box-shadow: inset 0px -2px 0px var(--cds-border-subtle);
      background-color: var(--cds-layer-01);
    }
  `;F=Ke([G("app-root")],F);
