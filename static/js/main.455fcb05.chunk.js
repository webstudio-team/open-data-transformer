(this["webpackJsonpopen-data-transformer"]=this["webpackJsonpopen-data-transformer"]||[]).push([[0],{100:function(e,t){},102:function(e,t){},120:function(e,t,a){},122:function(e,t,a){},124:function(e,t,a){},125:function(e,t,a){},126:function(e,t,a){},127:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),i=a(56),r=a.n(i),s=(a(67),a(2)),l=a(5),o=(a(68),a(69),a.p+"static/media/download.30c31dca.svg"),d=a.p+"static/media/download-icon.47fd62fd.svg",j=a.p+"static/media/logo-data-mzcr.3d29bba8.svg",u=a.p+"static/media/logo-uzis.412624c0.svg",b=a.p+"static/media/logo-iba-mu.904293c3.svg",m=a.p+"static/media/web_studio.db15bc58.svg",h=a(31),v=a.n(h),f=a(20),p=a.n(f),O=a(32),x=a.n(O),g=a(33),k=a(35),y=a(57),N=a(58),_=a(59),w=a(37),z=a.n(w),S=a(60),C=a.n(S),F=a(9),D=(a(120),a(0));function P(e){var t=e.index,a=e.columnName,c=e.handleChange,i=e.descriptionLengthLimit,r=void 0===i?200:i,s=Object(n.useState)(0),o=Object(l.a)(s,2),d=o[0],j=o[1],u=function(e){c(t,Object(F.a)({},e.target.name,e.target.value))};return Object(D.jsxs)("div",{className:"form-column",children:[Object(D.jsxs)("div",{className:"form-column__wrapper",children:[Object(D.jsxs)("div",{className:"form-column__name",children:[Object(D.jsx)("label",{htmlFor:"name",children:"N\xe1zev:"}),Object(D.jsx)("div",{children:Object(D.jsx)("input",{name:"name",type:"text",defaultValue:a,onChange:u})})]}),Object(D.jsxs)("div",{className:"form-column__select",children:[Object(D.jsx)("label",{htmlFor:"datatype",children:"Datov\xfd typ:"}),Object(D.jsx)("div",{children:Object(D.jsxs)("select",{name:"datatype",id:"datatype",onChange:u,children:[Object(D.jsx)("option",{value:"string",children:"string"}),Object(D.jsx)("option",{value:"integer",children:"integer"}),Object(D.jsx)("option",{value:"float",children:"float"}),Object(D.jsx)("option",{value:"boolean",children:"boolean"})]})})]})]}),Object(D.jsxs)("div",{className:"form-column-description__label",children:[Object(D.jsx)("label",{htmlFor:"description",children:"Popis:"}),Object(D.jsxs)("span",{className:"form-column-description__indicator",children:[d,"/",r]})]}),Object(D.jsx)("input",{className:"form-column-description__input",name:"description",type:"text",onChange:function(e){var a=e.target;if(a.value.length>r)return a.value=a.value.slice(0,r),a.classList.add("has-border"),void a.nextSibling.classList.remove("hidden");a.classList.remove("has-border"),a.nextSibling.classList.add("hidden"),c(t,Object(F.a)({},a.name,a.value)),j(a.value.length)},placeholder:"Maxim\xe1ln\u011b ".concat(r," znak\u016f")}),Object(D.jsx)("div",{className:"warning hidden",children:"Dos\xe1hli jste limitu po\u010dtu znak\u016f!"})]})}a(122);var I=a.p+"static/media/csv-file.a22d929a.svg",L=a.p+"static/media/close.7dda5159.svg";function E(e){var t=e.inputRef,a=e.setEncoding,c=e.setDelimiter,i=e.setFile,r=e.file,s=Object(n.useRef)(),l=Object(n.useRef)();return Object(n.useEffect)((function(){a(s.current.value),c(l.current.value)}),[]),Object(D.jsxs)("div",{className:"form-upload ".concat(r?"":"visually-hidden"),children:[Object(D.jsx)("div",{children:"Nahran\xfd soubor:"}),Object(D.jsx)("div",{className:"form-upload__input",children:!!r&&Object(D.jsxs)(D.Fragment,{children:[Object(D.jsxs)("div",{children:[Object(D.jsx)("img",{src:I,alt:"csv file"}),Object(D.jsx)("span",{children:r.name})]}),Object(D.jsx)("img",{src:L,alt:"zav\u0159\xedt",onClick:function(){i()}})]})}),Object(D.jsxs)("div",{className:"form-upload__hidden-input visually-hidden",children:[Object(D.jsx)("label",{htmlFor:"file",children:"Nahran\xfd soubor:"}),Object(D.jsx)("div",{children:Object(D.jsx)("input",{name:"file",type:"file",ref:t,onChange:function(){return i(t.current.files[0])}})})]}),Object(D.jsxs)("div",{className:"form-upload__menu",children:[Object(D.jsxs)("div",{className:"form-upload__selects",children:[Object(D.jsxs)("div",{children:[Object(D.jsx)("label",{htmlFor:"encoding",children:"Pou\u017eit\xe9 k\xf3dov\xe1n\xed:"}),Object(D.jsx)("div",{className:"form-upload__selects--label",children:Object(D.jsxs)("select",{ref:s,onChange:function(e){return a(e.target.value)},name:"encoding",id:"encoding",children:[Object(D.jsx)("option",{value:"win1250",children:"win1250"}),Object(D.jsx)("option",{value:"utf8",children:"utf8"})]})})]}),Object(D.jsxs)("div",{children:[Object(D.jsx)("label",{htmlFor:"delimiter",children:"Pou\u017eit\xfd odd\u011blova\u010d:"}),Object(D.jsx)("div",{className:"form-upload__selects--label",children:Object(D.jsxs)("select",{ref:l,onChange:function(e){return c(e.target.value)},name:"delimiter",id:"delimiter",children:[Object(D.jsx)("option",{value:";",children:";"}),Object(D.jsx)("option",{value:",",children:","})]})})]})]}),Object(D.jsx)("div",{children:Object(D.jsx)("input",{type:"submit",value:"Na\u010d\xedst",className:"button--submit"})})]})]})}a(123),a(124);var T=a(61);function M(e){var t=e.datasetMetadata,a=e.setDatasetMetadata,c=e.tags,i=e.setTags,r=e.descriptionLengthLimit,l=void 0===r?500:r,o=function(e){a(Object(s.a)(Object(s.a)({},t),{},Object(F.a)({},e.target.name,e.target.value)))},d=Object(n.useCallback)((function(e){a(Object(s.a)(Object(s.a)({},t),{},Object(F.a)({},e.target.name,e.target.value.slice(0,l))))}),[l,t]);return Object(D.jsxs)("div",{className:"metadata-from",children:[Object(D.jsx)("div",{className:"metadata-from__heading",children:Object(D.jsx)("h2",{children:"Popis datov\xe9 sady"})}),Object(D.jsxs)("div",{className:"metadata-from__title",children:[Object(D.jsx)("label",{htmlFor:"title",children:"Titulek:"}),Object(D.jsx)("div",{children:Object(D.jsx)("input",{name:"title",type:"text",onChange:o,placeholder:"Nap\u0159\xedklad \u201cCOVID, \u010cervenec 2021\u201d"})})]}),Object(D.jsxs)("div",{className:"metadata-from__filename",children:[Object(D.jsx)("label",{htmlFor:"filename",children:"N\xe1zev souboru:"}),Object(D.jsx)("div",{children:Object(D.jsx)("input",{name:"filename",type:"text",onChange:o,placeholder:'Nap\u0159\xedklad "covid-cervenec-21.csv"'})})]}),Object(D.jsxs)("div",{className:"metadata-from__source",children:[Object(D.jsx)("label",{htmlFor:"source",children:"Zdroj:"}),Object(D.jsx)("div",{children:Object(D.jsx)("input",{name:"source",type:"text",onChange:o,placeholder:"Nap\u0159\xedklad \u201c\xdaZIS \u010cR\u201d"})})]}),Object(D.jsxs)("div",{className:"metadata-from__tags",children:[Object(D.jsx)("label",{htmlFor:"tags",children:"Tagy:"}),Object(D.jsx)("div",{children:Object(D.jsx)(T.a,{name:"tags",tags:c,placeholder:"Zadejte a stiskn\u011bte ENTER",onChange:function(e){return i(e)}})})]}),Object(D.jsxs)("div",{className:"metadata-from__description",children:[Object(D.jsxs)("div",{className:"metadata-from__description--label",children:[Object(D.jsx)("label",{htmlFor:"description",children:"Popis:"}),Object(D.jsxs)("div",{children:[t.description.length,"/",l]})]}),Object(D.jsx)("div",{children:Object(D.jsx)("textarea",{name:"description",value:t.description,onChange:d,placeholder:"Maxim\xe1ln\u011b 500 znak\u016f",className:l===t.description.length?"has-border":""})}),l===t.description.length?Object(D.jsx)("div",{className:"warning",children:"Dos\xe1hli jste limitu po\u010dtu znak\u016f!"}):""]})]})}a(125);var R=a.p+"static/media/upload.ecc3d64c.svg";function V(e){var t=e.file,a=e.setFile,n=e.onClick;return Object(D.jsxs)("div",{className:"drag-drop-zone".concat(t?"--hidden":""),onDragOver:function(e){return function(e){e.preventDefault(),e.stopPropagation()}(e)},onDrop:function(e){return function(e){e.preventDefault(),e.stopPropagation();var t=e.dataTransfer.files;a(t[0]),console.log(t)}(e)},onClick:n,children:[Object(D.jsx)("img",{src:R,alt:"upload"}),Object(D.jsxs)("p",{children:["Klikn\u011bte pro nahr\xe1n\xed ",Object(D.jsx)("strong",{children:"CSV. souboru"})," nebo ho sem p\u0159et\xe1hn\u011bte"]})]})}a(126);function W(e){var t=e.onClick,a=e.children,n=e.type,c=e.name;return Object(D.jsxs)("button",{onClick:t,className:"button--".concat(n),children:[Object(D.jsx)("img",{src:c,alt:"".concat(c," ikonka")}),a]})}function Z(){var e=Object(n.useState)(),t=Object(l.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(),r=Object(l.a)(i,2),h=r[0],f=r[1],O=Object(n.useState)({title:"",description:"",filename:"",source:""}),_=Object(l.a)(O,2),w=_[0],S=_[1],F=Object(n.useState)([]),I=Object(l.a)(F,2),L=I[0],T=I[1],R=Object(n.useState)([]),Z=Object(l.a)(R,2),A=Z[0],H=Z[1],B=Object(n.useState)(),J=Object(l.a)(B,2),K=J[0],U=J[1],q=Object(n.useRef)();function G(){return Object(s.a)(Object(s.a)({encoding:a,delimiter:h,overrideHeaders:!0},w),{},{keywords:L,columns:A})}function Q(e){return z.a.createWriteStream(e).getWriter()}function X(e,t){A[e]=Object(s.a)(Object(s.a)({},A[e]),t),H(A)}return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsxs)("div",{className:"content",children:[Object(D.jsx)("div",{className:"wrapper",children:Object(D.jsx)("div",{className:"container",children:Object(D.jsxs)("div",{className:"header",children:[Object(D.jsx)("img",{src:j,alt:"logo-data-mzcr"}),Object(D.jsx)("h1",{children:"Open Data Transformer"})]})})}),Object(D.jsx)("div",{className:"wrapper__metadata-form",children:Object(D.jsxs)("div",{className:"container",children:[Object(D.jsx)(V,{file:K,setFile:U,onClick:function(){q.current.click()}}),Object(D.jsxs)("form",{onSubmit:function(e){e.preventDefault(),function(){if(void 0===K)return void console.log("Please select file.");var e=function(e){return v()(e)},t=function(){return p.a.enableStreamingAPI(x.a),p.a.decodeStream(a)},n=Object(k.createParser)({delimiter:h,overrideHeaders:!1},g.a),c=[];e(K).pipe(t()).pipe(n).on("readable",(function(){if(0===c.length){c=n.read();var e=[];c.forEach((function(t,a){e[a]={name:t,datatype:"string",description:""}})),H(e)}}))}()},children:[Object(D.jsx)(E,{inputRef:q,setEncoding:c,setDelimiter:f,file:K,setFile:U}),!!A.length&&Object(D.jsx)(M,{datasetMetadata:w,setDatasetMetadata:S,tags:L,setTags:T})]})]})}),Object(D.jsx)("div",{className:"wrapper".concat(A.length?"__column-form":""),children:Object(D.jsx)("div",{className:"container",children:Object(D.jsxs)("form",{children:[!!A.length&&Object(D.jsx)("div",{children:Object(D.jsx)("h2",{className:"form-column__heading",children:"Popis sloupcu datov\xe9 sady"})}),Object(D.jsx)("ul",{children:!!A.length&&A.map((function(e,t){return Object(D.jsx)("li",{children:Object(D.jsx)(P,{index:t,columnName:e.name,handleChange:X},t)},e.name)}))})]})})}),!!A.length&&Object(D.jsxs)("div",{className:"container",children:[Object(D.jsxs)("div",{className:"form-buttons",children:[Object(D.jsx)(W,{type:"download",name:o,onClick:function(){var e=G();if(void 0!==K){var t=Object(k.createParser)(e,g.a),a=Object(y.createTransformer)(e,N.a),n=Q(e.filename);(function(e){return v()(e)})(K).pipe((p.a.enableStreamingAPI(x.a),p.a.decodeStream(e.encoding))).pipe(t).pipe(a).on("readable",(function(){for(var e;null!==(e=a.read());)n.write((new TextEncoder).encode(e))})).on("finish",(function(){n.close()}))}else console.log("Please select file.")},children:"St\xe1hnout CSV"}),Object(D.jsx)(W,{type:"download",name:o,onClick:function(){var e=G(),t=C.a.generate(e),a=Q(e.filename+"-metadata.json");a.write((new TextEncoder).encode(JSON.stringify(t,null,4))),a.close()},children:"St\xe1hnout metadata"})]}),Object(D.jsxs)("div",{className:"text--center",children:[Object(D.jsx)("p",{children:"Nezapome\u0148te validovat va\u0161i datovou sadu"}),Object(D.jsxs)("a",{href:"https://csvw.opendata.cz/",target:"_blank",rel:"noreferrer",className:"button--validate",children:["Validovat data",Object(D.jsx)("img",{src:d,alt:"".concat(d," ikonka")})]})]})]})]}),Object(D.jsxs)("footer",{children:[Object(D.jsx)("div",{children:Object(D.jsx)("div",{className:"container",children:Object(D.jsxs)("div",{className:"footer__logo",children:[Object(D.jsx)("a",{href:"http://www.iba.muni.cz/",target:"_blank",rel:"noreferrer noopener",title:"Institut biostatistiky a anal\xfdz L\xe9ka\u0159sk\xe9 fakulty Masarykovy univerzity","aria-label":"Institut biostatistiky a anal\xfdz L\xe9ka\u0159sk\xe9 fakulty Masarykovy univerzity",children:Object(D.jsx)("img",{src:b,alt:"Institut biostatistiky a anal\xfdz L\xe9ka\u0159sk\xe9 fakulty Masarykovy univerzity"})}),Object(D.jsx)("a",{href:"https://www.uzis.cz/",target:"_blank",rel:"noreferrer noopener",title:"\xdastav zdravotnick\xfdch informac\xed a statistiky \u010cesk\xe9 republiky","aria-label":"\xdastav zdravotnick\xfdch informac\xed a statistiky \u010cesk\xe9 republiky",children:Object(D.jsx)("img",{src:u,alt:"\xdastav zdravotnick\xfdch informac\xed a statistiky \u010cesk\xe9 republiky"})}),Object(D.jsxs)("div",{children:["spole\u010dn\xe9 pracovi\u0161t\u011b ",Object(D.jsx)("br",{})," ",Object(D.jsx)("a",{href:"http://www.iba.muni.cz/",target:"_blank",rel:"noreferrer noopener",title:"Institut biostatistiky a anal\xfdz L\xe9ka\u0159sk\xe9 fakulty Masarykovy univerzity","aria-label":"Institut biostatistiky a anal\xfdz L\xe9ka\u0159sk\xe9 fakulty Masarykovy univerzity",children:"IBA LF MU"})," ","a"," ",Object(D.jsx)("a",{href:"https://www.uzis.cz/",target:"_blank",rel:"noreferrer noopener",title:"\xdastav zdravotnick\xfdch informac\xed a statistiky \u010cR","aria-label":"\xdastav zdravotnick\xfdch informac\xed a statistiky \u010cesk\xe9 republiky",children:"\xdaZIS \u010cR"})]})]})})}),Object(D.jsx)("div",{className:"wrapper__footer",children:Object(D.jsxs)("div",{className:"container",children:[Object(D.jsxs)("div",{children:[Object(D.jsx)("button",{className:"button--cookies","aria-label":"Prohl\xe9dnout si nastaven\xed cookies soubor\u016f",children:"COOKIES"}),Object(D.jsx)("span",{className:"footer--vertical"}),Object(D.jsx)("a",{href:"https://www.uzis.cz/index.php?pg=kontakt",target:"_blank",children:"HELPDESK"})]}),Object(D.jsx)("a",{href:"https://webstudio.team/",target:"_blank",rel:"noreferrer noopener",title:"webstudio.team","aria-label":"Webov\xe1 str\xe1nka webstudio.team (extern\xed odkaz, nov\xe1 z\xe1lo\u017eka)",children:Object(D.jsx)("img",{src:m,alt:"Web studio"})})]})})]})]})}z.a.WritableStream=_.a;var A=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,128)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),i(e),r(e)}))};r.a.render(Object(D.jsx)(c.a.StrictMode,{children:Object(D.jsx)(Z,{})}),document.getElementById("root")),A()},35:function(e,t,a){var n=a(107).parse;function c(e){var t={delimiter:e.delimiter};return e.overrideHeaders&&(t.on_record=function(t,a){return 1===a.lines?Object.values(e.columns).map((function(e){return e.name})):t}),t}t.createParser=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;return t(c(e))}},57:function(e,t,a){var n=a(108).createArrayCsvStringifier,c=a(119).transform,i=["string","integer","float","boolean"];function r(e,t){if(!i.includes(t))throw new Error("Datatype ".concat(t," is not allowed or valid."));switch(t){case"string":return e.trim();case"integer":return parseInt(e);case"float":return parseFloat(e);case"boolean":return[1,"1",!0,"true"].includes(e);default:return e}}t.createTransformer=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c,a=n({recordDelimiter:"\r\n"}),i=Object.values(e.columns).map((function(e){return e.datatype})),s=0;return t((function(e){s++;var t=[];return 1===s?t=e:e.forEach((function(e,a){var n=i[a];t.push(r(e,n))})),a.stringifyRecords([t])}))}},60:function(e,t){e.exports={generate:function(e){return{"@context":["http://www.w3.org/ns/csvw",{"@language":"cs"}],url:e.filename,"dc:title":e.title,"dc:description":e.description,"dc:source":e.source,"dcat:keyword":e.keywords,"dc:publisher":{"schema:name":"\xdaZIS \u010cR","schema:url":{"@id":"https://www.uzis.cz/"}},"dc:license":{"@id":"https://data.gov.cz/podm\xednky-u\u017eit\xed/voln\xfd-p\u0159\xedstup/"},"dc:modified":{"@value":(new Date).toISOString(),"@type":"xsd:dateTime"},tableSchema:{columns:(t=e.columns,t.map((function(e){return{name:e.name,titles:e.name,datatype:e.datatype,"dc:description":e.description}})))}};var t}}},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){},74:function(e,t){},76:function(e,t){},99:function(e,t){}},[[127,1,2]]]);
//# sourceMappingURL=main.455fcb05.chunk.js.map