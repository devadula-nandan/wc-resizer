(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const M=globalThis,K=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ne=new WeakMap;let ge=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(K&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ne.set(t,e))}return e}toString(){return this.cssText}};const ze=r=>new ge(typeof r=="string"?r:r+"",void 0,J),b=(r,...e)=>{const t=r.length===1?r[0]:e.reduce(((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1]),r[0]);return new ge(t,r,J)},_e=(r,e)=>{if(K)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const i=document.createElement("style"),s=M.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},oe=K?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ze(t)})(r):r;const{is:xe,defineProperty:Ae,getOwnPropertyDescriptor:we,getOwnPropertyNames:Se,getOwnPropertySymbols:Ee,getPrototypeOf:Ce}=Object,j=globalThis,ae=j.trustedTypes,ke=ae?ae.emptyScript:"",Pe=j.reactiveElementPolyfillSupport,C=(r,e)=>r,D={toAttribute(r,e){switch(e){case Boolean:r=r?ke:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Z=(r,e)=>!xe(r,e),le={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=le){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ae(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=we(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){const l=s?.call(this);n?.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??le}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=Ce(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,i=[...Se(t),...Ee(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(oe(s))}else e!==void 0&&t.push(oe(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:D).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const n=i.getPropertyOptions(s),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:D;this._$Em=s;const l=o.fromAttribute(t,n.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const s=this.constructor,n=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??Z)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,n]of i){const{wrapped:o}=n,l=this[s];o!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,n,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[C("elementProperties")]=new Map,x[C("finalized")]=new Map,Pe?.({ReactiveElement:x}),(j.reactiveElementVersions??=[]).push("2.1.1");const Q=globalThis,L=Q.trustedTypes,ce=L?L.createPolicy("lit-html",{createHTML:r=>r}):void 0,be="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+f,Te=`<${ve}>`,z=document,k=()=>z.createComment(""),P=r=>r===null||typeof r!="object"&&typeof r!="function",ee=Array.isArray,Oe=r=>ee(r)||typeof r?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,de=/>/g,$=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pe=/'/g,ue=/"/g,fe=/^(?:script|style|textarea|title)$/i,Ue=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),m=Ue(1),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),me=new WeakMap,y=z.createTreeWalker(z,129);function $e(r,e){if(!ee(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ce!==void 0?ce.createHTML(e):e}const Ne=(r,e)=>{const t=r.length-1,i=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=E;for(let l=0;l<t;l++){const a=r[l];let h,p,c=-1,g=0;for(;g<a.length&&(o.lastIndex=g,p=o.exec(a),p!==null);)g=o.lastIndex,o===E?p[1]==="!--"?o=he:p[1]!==void 0?o=de:p[2]!==void 0?(fe.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=$):p[3]!==void 0&&(o=$):o===$?p[0]===">"?(o=s??E,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?$:p[3]==='"'?ue:pe):o===ue||o===pe?o=$:o===he||o===de?o=E:(o=$,s=void 0);const v=o===$&&r[l+1].startsWith("/>")?" ":"";n+=o===E?a+Te:c>=0?(i.push(h),a.slice(0,c)+be+a.slice(c)+f+v):a+f+(c===-2?l:v)}return[$e(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class T{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0;const l=e.length-1,a=this.parts,[h,p]=Ne(e,t);if(this.el=T.createElement(h,i),y.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=y.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(be)){const g=p[o++],v=s.getAttribute(c).split(f),R=/([.?@])?(.*)/.exec(g);a.push({type:1,index:n,name:R[2],strings:v,ctor:R[1]==="."?Me:R[1]==="?"?De:R[1]==="@"?Le:I}),s.removeAttribute(c)}else c.startsWith(f)&&(a.push({type:6,index:n}),s.removeAttribute(c));if(fe.test(s.tagName)){const c=s.textContent.split(f),g=c.length-1;if(g>0){s.textContent=L?L.emptyScript:"";for(let v=0;v<g;v++)s.append(c[v],k()),y.nextNode(),a.push({type:2,index:++n});s.append(c[g],k())}}}else if(s.nodeType===8)if(s.data===ve)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(f,c+1))!==-1;)a.push({type:7,index:n}),c+=f.length-1}n++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function w(r,e,t=r,i){if(e===A)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl;const n=P(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=w(r,s._$AS(r,e.values),s,i)),e}class Re{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??z).importNode(t,!0);y.currentNode=s;let n=y.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new O(n,n.nextSibling,this,e):a.type===1?h=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(h=new He(n,this,e)),this._$AV.push(h),a=i[++l]}o!==a?.index&&(n=y.nextNode(),o++)}return y.currentNode=z,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),P(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=T.createElement($e(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const n=new Re(s,this),o=n.u(this.options);n.p(t),this.T(o),this._$AH=n}}_$AC(e){let t=me.get(e.strings);return t===void 0&&me.set(e.strings,t=new T(e)),t}k(e){ee(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new O(this.O(k()),this.O(k()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,s){const n=this.strings;let o=!1;if(n===void 0)e=w(this,e,t,0),o=!P(e)||e!==this._$AH&&e!==A,o&&(this._$AH=e);else{const l=e;let a,h;for(e=n[0],a=0;a<n.length-1;a++)h=w(this,l[i+a],t,a),h===A&&(h=this._$AH[a]),o||=!P(h)||h!==this._$AH[a],h===d?e=d:e!==d&&(e+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Me extends I{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class De extends I{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class Le extends I{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??d)===A)return;const i=this._$AH,s=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class He{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const je=Q.litHtmlPolyfillSupport;je?.(T,O),(Q.litHtmlVersions??=[]).push("3.3.1");const Ie=(r,e,t)=>{const i=t?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const n=t?.renderBefore??null;i._$litPart$=s=new O(e.insertBefore(k(),n),n,void 0,t??{})}return s._$AI(r),s};const te=globalThis;class u extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ie(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}}u._$litElement$=!0,u.finalized=!0,te.litElementHydrateSupport?.({LitElement:u});const Ge=te.litElementPolyfillSupport;Ge?.({LitElement:u});(te.litElementVersions??=[]).push("4.2.1");const S=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};const qe={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:Z},Be=(r=qe,e,t)=>{const{kind:i,metadata:s}=t;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(t.name,r),i==="accessor"){const{name:o}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(i==="setter"){const{name:o}=t;return function(l){const a=this[o];e.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function U(r){return(e,t)=>typeof t=="object"?Be(r,e,t):((i,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(s,n):void 0})(r,e,t)}function Ve(r){return U({...r,state:!0,attribute:!1})}var Fe=Object.getOwnPropertyDescriptor,We=(r,e,t,i)=>{for(var s=i>1?void 0:i?Fe(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(s)||s);return s};let q=class extends u{render(){return m`
      <slot name="left"></slot>
      <slot name="top"></slot>
      <slot name="handle-horizontal"></slot>
      <slot name="handle-vertical"></slot>
      <slot name="right"></slot>
      <slot name="bottom"></slot>
    `}};q.styles=b`
    :host {
      --start-element-size: 1fr;
      --end-element-size: 1fr;

      display: grid;
      block-size: 100%;
      inline-size: 100%;
      overflow: hidden;

      transition: grid-template-columns 180ms cubic-bezier(0.25, 0.9, 0.25, 1),
        grid-template-rows 180ms cubic-bezier(0.25, 0.9, 0.25, 1);
    }

    :host([axis="x"]) {
      grid-template-columns: var(--start-element-size) auto var(
          --end-element-size
        );
    }

    :host([axis="y"]) {
      grid-template-rows: var(--start-element-size) auto var(--end-element-size);
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }
  `;q=We([S("resize-grid")],q);var Ye=Object.getOwnPropertyDescriptor,Xe=(r,e,t,i)=>{for(var s=i>1?void 0:i?Ye(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(s)||s);return s};let B=class extends u{render(){return m` <slot></slot> `}};B.styles=b`
    :host {
      overflow: hidden;
    }
  `;B=Xe([S("resize-panel")],B);var Ke=Object.getOwnPropertyDescriptor,Je=(r,e,t,i)=>{for(var s=i>1?void 0:i?Ke(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(s)||s);return s};let V=class extends u{constructor(){super(...arguments),this.startSize=0,this.endSize=0,this.axis="x",this.lastTapTime=0,this.lastTapX=0,this.lastTapY=0,this.resetSizes=r=>{r.preventDefault(),this.grid.style.removeProperty("--start-element-size"),this.grid.style.removeProperty("--end-element-size")},this.startDrag=r=>{if(this.detectDoubleTap(r))return;r.preventDefault();const e=this.startNode.getBoundingClientRect(),t=this.endNode.getBoundingClientRect();this.startSize=this.axis==="x"?e.width:e.height,this.endSize=this.axis==="x"?t.width:t.height;const i=this.axis==="x"?r.clientX:r.clientY,s=o=>{this.grid.style.transition="none";const l=(this.axis==="x"?o.clientX:o.clientY)-i,a=this.startSize+l,h=this.endSize-l,p=a+h||1,c=g=>Math.max(0,g/p);this.grid.style.setProperty("--start-element-size",`${c(a)}fr`),this.grid.style.setProperty("--end-element-size",`${c(h)}fr`)},n=()=>{window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",n),this.grid.style.removeProperty("transition")};window.addEventListener("pointermove",s),window.addEventListener("pointerup",n)}}connectedCallback(){super.connectedCallback(),this.grid=this.closest("resize-grid"),this.axis=this.getAttribute("slot")==="handle-vertical"?"y":"x";const r=Array.from(this.grid.querySelectorAll("resize-panel"));this.axis==="x"?(this.startNode=r.find(e=>e.slot==="left"),this.endNode=r.find(e=>e.slot==="right")):(this.startNode=r.find(e=>e.slot==="top"),this.endNode=r.find(e=>e.slot==="bottom")),this.addEventListener("pointerdown",this.startDrag)}get pivot(){const r=this.closest("resize-panel")?.getAttribute("slot");if(r==="left")return"end";if(r==="right")return"start"}detectDoubleTap(r){const e=Date.now(),t=e-this.lastTapTime,i=Math.abs(r.clientX-this.lastTapX),s=Math.abs(r.clientY-this.lastTapY);return t<300&&i<24&&s<24?("vibrate"in navigator&&navigator.vibrate(8),this.resetSizes(r),this.lastTapTime=0,!0):(this.lastTapTime=e,this.lastTapX=r.clientX,this.lastTapY=r.clientY,!1)}render(){return m`
      <div class="handle-content">
        <div>
          ${this.pivot==="start"?m`<slot name="pivot"></slot>`:""}
        </div>
        <div class="icon-container" part="icon-container">
          <slot name="icon"></slot>
        </div>
        <div>
          ${this.pivot==="end"?m`<slot name="pivot"></slot>`:""}
        </div>
      </div>
    `}};V.styles=b`
    :host {
      touch-action: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background: var(--cds-border-subtle);
      min-block-size: max(1px, var(--resizer-thickness));
      min-inline-size: max(1px, var(--resizer-thickness));
    }
    :host([slot="handle-horizontal"]) {
      cursor: ew-resize;

      .icon-container {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          block-size: 100%;
          inline-size: calc(
            max(1px, var(--resizer-thickness)) +
              max(0px, var(--resizer-grab-thickness))
          );
          background-color: var(--resizer-grab-color);
        }
      }
    }
    :host([slot="handle-vertical"]) {
      cursor: ns-resize;
      min-inline-size: 0;
      .icon-container {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          inline-size: 100%;
          block-size: calc(
            max(1px, var(--resizer-thickness)) +
              max(0px, var(--resizer-grab-thickness))
          );
          background-color: var(--resizer-grab-color);
        }
      }
    }
    .handle-content {
      block-size: 100%;
      inline-size: 100%;
      display: flex;
    }
    .icon-container {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;V=Je([S("resize-handle")],V);var Ze=Object.getOwnPropertyDescriptor,Qe=(r,e,t,i)=>{for(var s=i>1?void 0:i?Ze(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=o(s)||s);return s};let F=class extends u{constructor(){super(...arguments),this.resetSizes=r=>{const e=this.getRootNode();(e instanceof ShadowRoot||e instanceof Document)&&e.querySelector("resize-handle")?.resetSizes(r)},this.handlePointerDown=r=>{const e=this.getRootNode();(e instanceof ShadowRoot||e instanceof Document)&&e.querySelector("resize-handle")?.startDrag(r)}}connectedCallback(){super.connectedCallback(),this.setAttribute("slot","pivot"),this.addEventListener("pointerdown",this.handlePointerDown),this.addEventListener("dblclick",this.resetSizes),this.setAttribute("position",this.parentElement.pivot)}render(){return m``}};F.styles=b`
    :host {
      display: block;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background: currentColor;
      block-size: max(1px, var(--resizer-thickness));
      inline-size: max(1px, var(--resizer-thickness));
      cursor: all-scroll;
      position: absolute;
      &:before {
        content: "";
        position: absolute;
        margin-block-start: calc(
          -1 * max(0px, var(--resizer-grab-thickness)) / 2
        );
        margin-inline-start: calc(
          -1 * max(0px, var(--resizer-grab-thickness)) / 2
        );
        inline-size: calc(
          max(1px, var(--resizer-thickness)) +
            max(0px, var(--resizer-grab-thickness))
        );
        block-size: calc(
          max(1px, var(--resizer-thickness)) +
            max(0px, var(--resizer-grab-thickness))
        );
        background-color: var(--resizer-grab-color);
        z-index: 1;
      }
    }
    :host([position="start"]) {
      margin-inline-start: calc(-1 * max(1px, var(--resizer-thickness)));
    }
  `;F=Qe([S("resize-handle-pivot")],F);const se=class se extends u{render(){return m`
      <resize-grid axis="x" class="outer-grid">
        <resize-panel slot="left">
          <cds-toggle
            label-b="Fluid"
            label-a="Fixed"
            size="sm"
            @cds-toggle-changed=${e=>e.target.parentElement.toggleAttribute("fixed",e.target.toggled)}
          ></cds-toggle>
        </resize-panel>
        <resize-handle slot="handle-horizontal"></resize-handle>
        <resize-panel slot="right">
          <resize-grid axis="y" class="inner-grid">
            <resize-panel slot="top">
              <cds-toggle
                label-b="Fluid"
                label-a="Fixed"
                size="sm"
                @cds-toggle-changed=${e=>e.target.parentElement.toggleAttribute("fixed",e.target.toggled)}
              ></cds-toggle>
            </resize-panel>
            <resize-handle slot="handle-vertical">
              <resize-handle-pivot></resize-handle-pivot>
              <div
                slot="icon"
                style="height: max(1px, var(--resizer-thickness, 1px));width: clamp(1px, var(--resizer-thickness, 1px), 100%); background: currentColor;"
              ></div>
            </resize-handle>
            <resize-panel slot="bottom">
              <cds-toggle
                label-b="Fluid"
                label-a="Fixed"
                size="sm"
                @cds-toggle-changed=${e=>e.target.parentElement.toggleAttribute("fixed",e.target.toggled)}
              ></cds-toggle>
            </resize-panel>
          </resize-grid>
        </resize-panel>
      </resize-grid>
    `}};se.styles=b`
    .outer-grid {
      --start-element-size: 1fr;
      --end-element-size: 4fr;
    }
    .inner-grid {
      --start-element-size: 3fr;
      --end-element-size: 1fr;
    }
    cds-toggle {
      padding: 0.6rem;
      display: block;
    }
  `;let W=se;customElements.define("pivot-example",W);const ie=class ie extends u{render(){return m`
      <resize-grid axis="y">
        <resize-panel slot="top">Panel 1</resize-panel>
        <resize-handle slot="handle-vertical">
          <div
            slot="icon"
            style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px)); background: currentColor;"
          ></div>
        </resize-handle>
        <resize-panel slot="bottom">Panel 2</resize-panel>
      </resize-grid>
    `}};ie.styles=b``;let Y=ie;customElements.define("vertical-example",Y);const re=class re extends u{render(){return m`
      <resize-grid axis="x">
        <resize-panel slot="left">Panel 1</resize-panel>
        <resize-handle slot="handle-horizontal">
          <div
            slot="icon"
            style="width: max(1px, var(--resizer-thickness, 1px));height: max(1px, var(--resizer-thickness, 1px)); background: currentColor;"
          ></div>
        </resize-handle>
        <resize-panel slot="right">Panel 2</resize-panel>
      </resize-grid>
    `}};re.styles=b``;let X=re;customElements.define("horizontal-example",X);var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,N=(r,e,t,i)=>{for(var s=i>1?void 0:i?tt(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&et(e,t,s),s};let _=class extends u{constructor(){super(...arguments),this.resizerThickness=4,this.resizerGrabThickness=8,this.resizerGrabColorEnabled=!1,this.theme="white"}connectedCallback(){super.connectedCallback(),this.resizerThickness=Number(localStorage.getItem("resizer-thickness"))||4,this.resizerGrabThickness=Number(localStorage.getItem("resizer-grab-thickness"))||8;const r=localStorage.getItem("resizer-grab-color-enabled");this.resizerGrabColorEnabled=r===null?!1:r==="true",this.theme=localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"g100":"white"),this.updateApp()}updateApp(){const r=document.querySelector("app-root");r?.style.setProperty("--resizer-thickness",`${this.resizerThickness}px`),localStorage.setItem("resizer-thickness",String(this.resizerThickness)),r?.style.setProperty("--resizer-grab-thickness",`${this.resizerGrabThickness}px`),localStorage.setItem("resizer-grab-thickness",String(this.resizerGrabThickness)),r?.style.setProperty("--resizer-grab-color",this.resizerGrabColorEnabled?"var(--cds-background-selected)":"transparent"),localStorage.setItem("resizer-grab-color-enabled",String(this.resizerGrabColorEnabled)),document.documentElement.className=`cds-theme-zone-${this.theme}`,localStorage.setItem("theme",this.theme)}render(){return m`
      <cds-layer level="1">
        <cds-stack gap="7">
          <cds-heading>Resizer</cds-heading>

          <!-- Resizer Thickness -->
          <cds-number-input
            label="--resizer-thickness"
            min="0"
            max="16"
            step="1"
            invalid-text="Are you sure about that?"
            .value=${this.resizerThickness}
            @cds-number-input=${r=>{this.resizerThickness=Number(r.target.value),this.updateApp()}}
          ></cds-number-input>
          <cds-number-input
            label="--resizer-grab-thickness"
            min="0"
            max="32"
            step="1"
            invalid-text="Are you sure about that?"
            .value=${this.resizerGrabThickness}
            @cds-number-input=${r=>{this.resizerGrabThickness=Number(r.target.value),this.updateApp()}}
          ></cds-number-input>
          <cds-checkbox
            ?checked=${this.resizerGrabColorEnabled}
            @cds-checkbox-changed=${r=>{this.resizerGrabColorEnabled=r.target.checked,this.updateApp()}}
          >
            Show grabbable area
          </cds-checkbox>

          <!-- Theme -->
          <cds-dropdown
            label="Theme"
            .value=${this.theme}
            @cds-dropdown-selected=${r=>{this.theme=r.detail.item.value,this.updateApp(),this.requestUpdate()}}
          >
            <cds-dropdown-item value="white">White</cds-dropdown-item>
            <cds-dropdown-item value="g10">Gray 10</cds-dropdown-item>
            <cds-dropdown-item value="g90">Gray 90</cds-dropdown-item>
            <cds-dropdown-item value="g100">Dark</cds-dropdown-item>
          </cds-dropdown>

          <!-- Reset -->
          <cds-button
            kind="danger"
            @click=${()=>{this.resizerThickness=4,this.resizerGrabThickness=8,this.resizerGrabColorEnabled=!1,this.theme="white",this.updateApp(),this.requestUpdate()}}
          >
            Reset
          </cds-button>
        </cds-stack>
      </cds-layer>
    `}};_.styles=b`
    :host {
      display: block;
      padding: 1rem;
      box-sizing: border-box;
    }
  `;N([U({type:Number})],_.prototype,"resizerThickness",2);N([U({type:Number})],_.prototype,"resizerGrabThickness",2);N([U({type:Boolean})],_.prototype,"resizerGrabColorEnabled",2);N([U({type:String})],_.prototype,"theme",2);_=N([S("control-panel")],_);var st=Object.defineProperty,it=Object.getOwnPropertyDescriptor,ye=(r,e,t,i)=>{for(var s=i>1?void 0:i?it(e,t):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&st(e,t,s),s};let H=class extends u{constructor(){super(...arguments),this.controlsVisible=!0}getTabFromUrl(){return new URLSearchParams(window.location.search).get("tab")??"home"}firstUpdated(){const r=this.getTabFromUrl(),e=this.renderRoot.querySelector(`cds-tab[value="${r}"]`);requestAnimationFrame(()=>{e?.click()})}updateUrl(r){const e=new URLSearchParams(window.location.search);e.set("tab",r);const t=`${window.location.pathname}?${e.toString()}`;history.pushState({},"",t)}render(){return m`
      <main>
        <div class="nav-container">
          <cds-tabs
          type=""
          @cds-tabs-selected=${r=>{const e=r.detail.item.value;this.updateUrl(e)}}
        >
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
        <cds-button size="md" tooltip-text="Controls" kind="ghost" tooltip-position="left" isselected=${this.controlsVisible} @click=${()=>{this.controlsVisible=!this.controlsVisible}}>
  <svg focusable="false" slot="icon" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z"></path><path d="M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z"></path></svg>
</cds-button>
        </div>
        <div class="custom-flex">
        <div class="left ${this.controlsVisible?"":"fw"}">
          <div class="resize">
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
        ${this.controlsVisible?m`<aside class="right">
                <control-panel></control-panel>
              </aside>`:d}
        </div>
      </main>
      </aside>
    `}};H.styles=b`
    :host {
      box-sizing: border-box;
    }
    cds-tabs {
      background-color: var(--cds-layer-01);
      box-shadow: inset 0px -2px 0px var(--cds-border-subtle);
    }
    .custom-flex {
      display: flex;
      height: calc(100dvh - 40px);
    }
    .left {
      flex: 1 1 auto;
      max-inline-size: calc(100% - 24rem - 1px);
      max-block-size: 100%;
    }
    .left.fw{
      max-inline-size: 100%;
    }
    .right {
      flex: 0 0 24rem;
      background-color: var(--cds-layer-01);
      border-inline-start: 1px solid var(--cds-border-subtle);
      z-index: 1;
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
      box-shadow: inset 0 0 0 1rem var(--cds-border-subtle);
    }
    .nav-container {
      display: flex;
      box-shadow: inset 0px -2px 0px var(--cds-border-subtle);
    }
    [role="tabpanel"] {
      block-size: 100%;
    }
  `;ye([Ve()],H.prototype,"controlsVisible",2);H=ye([S("app-root")],H);
