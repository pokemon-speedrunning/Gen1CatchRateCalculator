(()=>{var I=Object.defineProperty,fe=Object.defineProperties;var Ae=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var ne=(e,a,t)=>a in e?I(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,ce=(e,a)=>{for(var t in a||(a={}))ae.call(a,t)&&ne(e,t,a[t]);if(g)for(var t of g(a))te.call(a,t)&&ne(e,t,a[t]);return e},le=(e,a)=>fe(e,Ae(a)),Ne=e=>I(e,"__esModule",{value:!0});var se=(e,a)=>{var t={};for(var c in e)ae.call(e,c)&&a.indexOf(c)<0&&(t[c]=e[c]);if(e!=null&&g)for(var c of g(e))a.indexOf(c)<0&&te.call(e,c)&&(t[c]=e[c]);return t};var _=(e,a)=>{Ne(e);for(var t in a)I(e,t,{get:a[t],enumerable:!0})};var k={};_(k,{default:()=>ie});var{useContext:ge,useMemo:Ie}=__ALEPH__.pack["https://esm.sh/react@17.0.2"],{default:Te}=__ALEPH__.pack["https://deno.land/x/aleph@v0.3.0-beta.19/shared/util.ts"],{default:ke}=__ALEPH__.pack["https://deno.land/x/aleph@v0.3.0-beta.19/framework/core/events.ts"],{RouterContext:_e,SSRContext:Ge}=__ALEPH__.pack["https://deno.land/x/aleph@v0.3.0-beta.19/framework/react/context.ts"],{inDeno:De}=__ALEPH__.pack["https://deno.land/x/aleph@v0.3.0-beta.19/framework/react/helper.ts"];function re(){return ge(_e)}var{AnchorHTMLAttributes:ye,CSSProperties:Me,createElement:Oe,MouseEvent:Be,PropsWithChildren:Ue,useCallback:T,useEffect:ve,useMemo:m}=__ALEPH__.pack["https://esm.sh/react@17.0.2"],{default:l}=__ALEPH__.pack["https://deno.land/x/aleph@v0.3.0-beta.19/shared/util.ts"],{default:Le}=__ALEPH__.pack["https://deno.land/x/aleph@v0.3.0-beta.19/framework/core/events.ts"],{redirect:Ce}=__ALEPH__.pack["https://deno.land/x/aleph@v0.3.0-beta.19/framework/core/redirect.ts"],me=new Set;function O(e){let Q=e,{rel:a,href:t,["aria-current"]:c,["data-active-className"]:V="active",["data-active-style"]:Z,className:C,style:S,onClick:$,onMouseEnter:X,children:be}=Q,Re=se(Q,["rel","href","aria-current","data-active-className","data-active-style","className","style","onClick","onMouseEnter","children"]),b=m(()=>a?a.split(" "):[],[a]),q=m(()=>b.includes("prefetch"),[b]),z=m(()=>b.includes("replace"),[b]),f=m(()=>b.includes("nav"),[b]),{pathname:A,params:ue,query:J}=re(),r=m(()=>{if(!l.isFilledString(t))return"";if(l.isLikelyHttpURL(t))return t;let[n,x]=l.splitBy(t,"?");return n.startsWith("/")?n=l.cleanPath(n):n=l.cleanPath(A+"/"+n),[n,x].filter(Boolean).join("?")},[A,t]),o=m(()=>{if(!l.isFilledString(t))return!1;let[n,x]=l.splitBy(t,"?");if(l.trimSuffix(n,"/")!==A)return!1;let ee=new URLSearchParams(x);return ee.sort(),ee.toString()===J.toString()},[A,ue,J,t]),He=m(()=>!f||!o?C:[C,V].filter(l.isFilledString).map(n=>n.trim()).filter(Boolean).join(" "),[C,V,o,f]),Pe=m(()=>!f||!o?S:Object.assign({},S,Z),[S,Z,o,f]),Ee=m(()=>{if(l.isFilledString(c))return c;if(r.startsWith("/"))return"page"},[r,c]),N=T(()=>{r&&!l.isLikelyHttpURL(r)&&!o&&!me.has(r)&&(Le.emit("fetch-page-module",{href:r}),me.add(r))},[o]),pe=T(n=>{l.isFunction(X)&&X(n),!n.defaultPrevented&&N()},[N]),de=T(n=>{l.isFunction($)&&$(n),!(n.defaultPrevented||Se(n))&&(n.preventDefault(),o||Ce(r,z))},[o,r,z]);return ve(()=>{q&&N()},[q,N]),Oe("a",le(ce({},Re),{className:He,style:Pe,href:r,onClick:de,onMouseEnter:pe,"aria-current":Ee}),be)}function Se(e){let{target:a}=e.currentTarget,t=e.nativeEvent;return a&&a!=="_self"||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||t&&t.which===2}var{default:s}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function oe(e){return s.createElement("li",{className:"nav-item active"},s.createElement(O,{className:"nav-link",href:e.linkUrl},e.linkName))}function ie(){return s.createElement(s.Fragment,null,s.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},s.createElement("div",{className:"container-fluid"},s.createElement(O,{className:"navbar-brand",href:"index.html"},"Gen 1 Catch Rate Calculator"),s.createElement("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},s.createElement("span",{className:"navbar-toggler-icon"})),s.createElement("div",{id:"navbarSupportedContent",className:"collapse navbar-collapse"},s.createElement("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0"},s.createElement(oe,{linkName:"Home",linkUrl:"/Gen1CatchRateCalculator"}),s.createElement(oe,{linkName:"Advanced",linkUrl:"/Gen1CatchRateCalculator/advanced"}))))))}var G={};_(G,{default:()=>he});var{default:R}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function he(e){return R.createElement(R.Fragment,null,R.createElement("p",{className:"mb-1"},e.progressName),R.createElement("p",{className:"mb-1"},e.progressValue,"%"),R.createElement("div",{className:"progress"},R.createElement("div",{className:"progress-bar",id:e.progressBarID,role:"progressbar",style:{width:`${e.progressValue}%`},"aria-valuenow":e.progressValue,"aria-valuemin":0,"aria-valuemax":100})))}var w={};_(w,{AdvancedInput:()=>Y,BallSelect:()=>F,GameSelect:()=>y,HPInput:()=>M,LevelInput:()=>B,NumberFormat:()=>W,SpeciesSelect:()=>U,StatusSelect:()=>K});var D={};_(D,{default:()=>E});var E={pokeBall:{ballName:"Poke Ball",ballFactor:12,reroll1:!1,reroll2:!1,ballRerollCutoff:256,ballIndex:1},greatBall:{ballName:"Great Ball",ballFactor:8,reroll1:!0,reroll2:!1,ballRerollCutoff:201,ballIndex:0},ultraBall:{ballName:"Ultra Ball",ballFactor:12,reroll1:!0,reroll2:!0,ballRerollCutoff:151,ballIndex:1},safariBall:{ballName:"Safari Ball",ballFactor:12,reroll1:!0,reroll2:!0,ballRerollCutoff:151,ballIndex:1}};var{default:u}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function F(e){return u.createElement(u.Fragment,null,u.createElement("label",{htmlFor:"ball"},"Poke Ball Type"),u.createElement("select",{id:"ball",className:"form-control","aria-describedby":"ballHelp",onChange:a=>e.onChange(E[a.target.value])},Object.keys(E).map(a=>u.createElement("option",{key:a,value:a},E[a].ballName))),u.createElement("small",{id:"ballHelp",className:"form-text text-muted"},"The poke ball you want to use"))}var{default:i}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function y(e){return i.createElement(i.Fragment,null,i.createElement("label",{htmlFor:"game"},"Game"),i.createElement("select",{id:"game",className:"form-control","aria-describedby":"gameHelp",onChange:a=>e.onChange(a.target.value)},i.createElement("option",{key:"RB",value:"RB"},"Red/Blue"),i.createElement("option",{key:"Y",value:"Y"},"Yellow")),i.createElement("small",{id:"gameHelp",className:"form-text text-muted"}," The game you're playing"))}var{default:v}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function M(e){return v.createElement(v.Fragment,null,v.createElement("label",{htmlFor:"hpRange"},"% of Max HP"),v.createElement("input",{id:"hpRange",className:"form-range",type:"range",min:"1",max:"100",value:e.currentHPPercent,onChange:a=>e.onChange(parseInt(a.target.value))}))}var{default:p}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function B(e){return p.createElement(p.Fragment,null,p.createElement("label",{htmlFor:"level"},"Encounter Level"),p.createElement("input",{id:"level",className:"form-control",type:"number","aria-describedby":"levelHelp",value:e.level,min:"2",max:"70",onChange:a=>e.onChange(parseInt(a.target.value))}),p.createElement("small",{id:"levelHelp",className:"form-text text-muted"},"The level of the Pokemon you want to catch 2-70"))}var L=[{name:"BULBASAUR",baseHP:45,catchRate:45},{name:"IVYSAUR",baseHP:60,catchRate:45},{name:"VENUSAUR",baseHP:80,catchRate:45},{name:"CHARMANDER",baseHP:39,catchRate:45},{name:"CHARMELEON",baseHP:58,catchRate:45},{name:"CHARIZARD",baseHP:78,catchRate:45},{name:"SQUIRTLE",baseHP:44,catchRate:45},{name:"WARTORTLE",baseHP:59,catchRate:45},{name:"BLASTOISE",baseHP:79,catchRate:45},{name:"CATERPIE",baseHP:45,catchRate:255},{name:"METAPOD",baseHP:50,catchRate:120},{name:"BUTTERFREE",baseHP:60,catchRate:45},{name:"WEEDLE",baseHP:40,catchRate:255},{name:"KAKUNA",baseHP:45,catchRate:120},{name:"BEEDRILL",baseHP:65,catchRate:45},{name:"PIDGEY",baseHP:40,catchRate:255},{name:"PIDGEOTTO",baseHP:63,catchRate:120},{name:"PIDGEOT",baseHP:83,catchRate:45},{name:"RATTATA",baseHP:30,catchRate:255},{name:"RATICATE",baseHP:55,catchRate:90},{name:"SPEAROW",baseHP:40,catchRate:255},{name:"FEAROW",baseHP:65,catchRate:90},{name:"EKANS",baseHP:35,catchRate:255},{name:"ARBOK",baseHP:60,catchRate:90},{name:"PIKACHU",baseHP:35,catchRate:190},{name:"RAICHU",baseHP:60,catchRate:75},{name:"SANDSHREW",baseHP:50,catchRate:255},{name:"SANDSLASH",baseHP:75,catchRate:90},{name:"NIDORAN_F",baseHP:55,catchRate:235},{name:"NIDORINA",baseHP:70,catchRate:120},{name:"NIDOQUEEN",baseHP:90,catchRate:45},{name:"NIDORAN_M",baseHP:46,catchRate:235},{name:"NIDORINO",baseHP:61,catchRate:120},{name:"NIDOKING",baseHP:81,catchRate:45},{name:"CLEFAIRY",baseHP:70,catchRate:150},{name:"CLEFABLE",baseHP:95,catchRate:25},{name:"VULPIX",baseHP:38,catchRate:190},{name:"NINETALES",baseHP:73,catchRate:75},{name:"JIGGLYPUFF",baseHP:115,catchRate:170},{name:"WIGGLYTUFF",baseHP:140,catchRate:50},{name:"ZUBAT",baseHP:40,catchRate:255},{name:"GOLBAT",baseHP:75,catchRate:90},{name:"ODDISH",baseHP:45,catchRate:255},{name:"GLOOM",baseHP:60,catchRate:120},{name:"VILEPLUME",baseHP:75,catchRate:45},{name:"PARAS",baseHP:35,catchRate:190},{name:"PARASECT",baseHP:60,catchRate:75},{name:"VENONAT",baseHP:60,catchRate:190},{name:"VENOMOTH",baseHP:70,catchRate:75},{name:"DIGLETT",baseHP:10,catchRate:255},{name:"DUGTRIO",baseHP:35,catchRate:50},{name:"MEOWTH",baseHP:40,catchRate:255},{name:"PERSIAN",baseHP:65,catchRate:90},{name:"PSYDUCK",baseHP:50,catchRate:190},{name:"GOLDUCK",baseHP:80,catchRate:75},{name:"MANKEY",baseHP:40,catchRate:190},{name:"PRIMEAPE",baseHP:65,catchRate:75},{name:"GROWLITHE",baseHP:55,catchRate:190},{name:"ARCANINE",baseHP:90,catchRate:75},{name:"POLIWAG",baseHP:40,catchRate:255},{name:"POLIWHIRL",baseHP:65,catchRate:120},{name:"POLIWRATH",baseHP:90,catchRate:45},{name:"ABRA",baseHP:25,catchRate:200},{name:"KADABRA",baseHP:40,catchRate:100},{name:"ALAKAZAM",baseHP:55,catchRate:50},{name:"MACHOP",baseHP:70,catchRate:180},{name:"MACHOKE",baseHP:80,catchRate:90},{name:"MACHAMP",baseHP:90,catchRate:45},{name:"BELLSPROUT",baseHP:50,catchRate:255},{name:"WEEPINBELL",baseHP:65,catchRate:120},{name:"VICTREEBEL",baseHP:80,catchRate:45},{name:"TENTACOOL",baseHP:40,catchRate:190},{name:"TENTACRUEL",baseHP:80,catchRate:60},{name:"GEODUDE",baseHP:40,catchRate:255},{name:"GRAVELER",baseHP:55,catchRate:120},{name:"GOLEM",baseHP:80,catchRate:45},{name:"PONYTA",baseHP:50,catchRate:190},{name:"RAPIDASH",baseHP:65,catchRate:60},{name:"SLOWPOKE",baseHP:90,catchRate:190},{name:"SLOWBRO",baseHP:95,catchRate:75},{name:"MAGNEMITE",baseHP:25,catchRate:190},{name:"MAGNETON",baseHP:50,catchRate:60},{name:"FARFETCHD",baseHP:52,catchRate:45},{name:"DODUO",baseHP:35,catchRate:190},{name:"DODRIO",baseHP:60,catchRate:45},{name:"SEEL",baseHP:65,catchRate:190},{name:"DEWGONG",baseHP:90,catchRate:75},{name:"GRIMER",baseHP:80,catchRate:190},{name:"MUK",baseHP:105,catchRate:75},{name:"SHELLDER",baseHP:30,catchRate:190},{name:"CLOYSTER",baseHP:50,catchRate:60},{name:"GASTLY",baseHP:30,catchRate:190},{name:"HAUNTER",baseHP:45,catchRate:90},{name:"GENGAR",baseHP:60,catchRate:45},{name:"ONIX",baseHP:35,catchRate:45},{name:"DROWZEE",baseHP:60,catchRate:190},{name:"HYPNO",baseHP:85,catchRate:75},{name:"KRABBY",baseHP:30,catchRate:225},{name:"KINGLER",baseHP:55,catchRate:60},{name:"VOLTORB",baseHP:40,catchRate:190},{name:"ELECTRODE",baseHP:60,catchRate:60},{name:"EXEGGCUTE",baseHP:60,catchRate:90},{name:"EXEGGUTOR",baseHP:95,catchRate:45},{name:"CUBONE",baseHP:50,catchRate:190},{name:"MAROWAK",baseHP:60,catchRate:75},{name:"HITMONLEE",baseHP:50,catchRate:45},{name:"HITMONCHAN",baseHP:50,catchRate:45},{name:"LICKITUNG",baseHP:90,catchRate:45},{name:"KOFFING",baseHP:40,catchRate:190},{name:"WEEZING",baseHP:65,catchRate:60},{name:"RHYHORN",baseHP:80,catchRate:120},{name:"RHYDON",baseHP:105,catchRate:60},{name:"CHANSEY",baseHP:250,catchRate:30},{name:"TANGELA",baseHP:65,catchRate:45},{name:"KANGASKHAN",baseHP:105,catchRate:45},{name:"HORSEA",baseHP:30,catchRate:225},{name:"SEADRA",baseHP:55,catchRate:75},{name:"GOLDEEN",baseHP:45,catchRate:225},{name:"SEAKING",baseHP:80,catchRate:60},{name:"STARYU",baseHP:30,catchRate:225},{name:"STARMIE",baseHP:60,catchRate:60},{name:"MR_MIME",baseHP:40,catchRate:45},{name:"SCYTHER",baseHP:70,catchRate:45},{name:"JYNX",baseHP:65,catchRate:45},{name:"ELECTABUZZ",baseHP:65,catchRate:45},{name:"MAGMAR",baseHP:65,catchRate:45},{name:"PINSIR",baseHP:65,catchRate:45},{name:"TAUROS",baseHP:75,catchRate:45},{name:"MAGIKARP",baseHP:20,catchRate:255},{name:"GYARADOS",baseHP:95,catchRate:45},{name:"LAPRAS",baseHP:130,catchRate:45},{name:"DITTO",baseHP:48,catchRate:35},{name:"EEVEE",baseHP:55,catchRate:45},{name:"VAPOREON",baseHP:130,catchRate:45},{name:"JOLTEON",baseHP:65,catchRate:45},{name:"FLAREON",baseHP:65,catchRate:45},{name:"PORYGON",baseHP:65,catchRate:45},{name:"OMANYTE",baseHP:35,catchRate:45},{name:"OMASTAR",baseHP:70,catchRate:45},{name:"KABUTO",baseHP:30,catchRate:45},{name:"KABUTOPS",baseHP:60,catchRate:45},{name:"AERODACTYL",baseHP:80,catchRate:45},{name:"SNORLAX",baseHP:160,catchRate:25},{name:"ARTICUNO",baseHP:90,catchRate:3},{name:"ZAPDOS",baseHP:90,catchRate:3},{name:"MOLTRES",baseHP:90,catchRate:3},{name:"DRATINI",baseHP:41,catchRate:45},{name:"DRAGONAIR",baseHP:61,catchRate:27},{name:"DRAGONITE",baseHP:91,catchRate:9},{name:"MEWTWO",baseHP:106,catchRate:3},{name:"MEW",basehp:100,catchRate:45}];var{default:H}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function U(e){return H.createElement(H.Fragment,null,H.createElement("label",{htmlFor:"species"},"Encounter Species"),H.createElement("select",{id:"species",className:"form-control","aria-describedby":"speciesHelp",style:{textTransform:"capitalize"},onChange:a=>e.onChange(L[a.target.value])},Object.keys(L).map(a=>H.createElement("option",{key:a,value:a},L[a].name.toLowerCase()))),H.createElement("small",{id:"speciesHelp",className:"form-text text-muted"},"Which pokemon you're encountering"))}var j={none:0,poisoned:12,paralyzed:12,burned:12,frozen:25,asleep:25};var{default:P}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function K(e){return P.createElement(P.Fragment,null,P.createElement("label",{htmlFor:"status"},"Status Effect"),P.createElement("select",{id:"status",className:"form-control","aria-describedby":"statusHelp",style:{textTransform:"capitalize"},onChange:a=>e.onChange(a.target.value)},Object.keys(j).map(a=>P.createElement("option",{key:a,value:j[a]},a))),P.createElement("small",{id:"statusHelp",className:"form-text text-muted"},"Status effect if any"))}var{default:h}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function W(e){return h.createElement(h.Fragment,null,h.createElement("label",{htmlFor:"numberFormat"},"Number Format"),h.createElement("select",{id:"numberFormat",className:"form-control","aria-describedby":"numberFormatHelp",onChange:a=>e.onChange(a.target.value==="hex")},h.createElement("option",{key:"hex",value:"hex"},"Hex"),h.createElement("option",{key:"decimal",value:"decimal"},"Decimal")),h.createElement("small",{id:"numberFormatHelp",className:"form-text text-muted"},"Whether to parse inputs as hex 0x (your input) or decimal"))}var{default:d}=__ALEPH__.pack["https://esm.sh/react@17.0.2"];function Y(e){return d.createElement(d.Fragment,null,d.createElement("label",{htmlFor:e.name},e.label),d.createElement("input",{id:e.name,className:"form-control",type:e.isHex?"text":"number","aria-describedby":`${e.name}Help`,value:e.isHex?e.value.toString(16):e.value,onChange:a=>e.onChange(parseInt((e.isHex?"0x":"")+a.target.value))}),d.createElement("small",{id:`${e.name}Help`,className:"form-text text-muted"},e.helpText))}__ALEPH__.pack["/components/navigation.tsx"]=k;__ALEPH__.pack["/components/progress.tsx"]=G;__ALEPH__.pack["/components/inputs/index.tsx"]=w;__ALEPH__.pack["/lib/pokeballs.json"]=D;})();
