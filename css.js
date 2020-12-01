(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){"use strict";function b(a){for(var b={},c=0;c<a.length;++c)b[a[c].toLowerCase()]=!0;return b}function c(a,b){for(var c,d=!1;null!=(c=a.next());){if(d&&"/"==c){b.tokenize=null;break}d="*"==c}return["comment","comment"]}a.defineMode("css",function(b,c){function d(a,b){return o=b,a}function e(a,b){var c=a.next();if(r[c]){var e=r[c](a,b);if(!1!==e)return e}if("@"==c)return a.eatWhile(/[\w\\\-]/),d("def",a.current());if("="==c||("~"==c||"|"==c)&&a.eat("="))return d(null,"compare");if("\""==c||"'"==c)return b.tokenize=f(c),b.tokenize(a,b);if("#"==c)return a.eatWhile(/[\w\\\-]/),d("atom","hash");if("!"==c)return a.match(/^\s*\w*/),d("keyword","important");if(/\d/.test(c)||"."==c&&a.eat(/\d/))return a.eatWhile(/[\w.%]/),d("number","unit");if("-"===c){if(/[\d.]/.test(a.peek()))return a.eatWhile(/[\w.%]/),d("number","unit");if(a.match(/^-[\w\\\-]*/))return a.eatWhile(/[\w\\\-]/),a.match(/^\s*:/,!1)?d("variable-2","variable-definition"):d("variable-2","variable");if(a.match(/^\w+-/))return d("meta","meta")}else return /[,+>*\/]/.test(c)?d(null,"select-op"):"."==c&&a.match(/^-?[_a-z][_a-z0-9-]*/i)?d("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(c)?d(null,c):a.match(/[\w-.]+(?=\()/)?(/^(url(-prefix)?|domain|regexp)$/.test(a.current().toLowerCase())&&(b.tokenize=g),d("variable callee","variable")):/[\w\\\-]/.test(c)?(a.eatWhile(/[\w\\\-]/),d("property","word")):d(null,null)}function f(a){return function(b,c){for(var e,f=!1;null!=(e=b.next());){if(e==a&&!f){")"==a&&b.backUp(1);break}f=!f&&"\\"==e}return e!=a&&(f||")"==a)||(c.tokenize=null),d("string","string")}}function g(a,b){return a.next(),b.tokenize=a.match(/\s*[\"\')]/,!1)?null:f(")"),d(null,"(")}function h(a,b,c){this.type=a,this.indent=b,this.prev=c}function i(a,b,c,d){return a.context=new h(c,b.indentation()+(!1===d?0:q),a.context),c}function j(a){return a.context.prev&&(a.context=a.context.prev),a.context.type}function k(a,b,c){return F[c.context.type](a,b,c)}function l(a,b,c,d){for(var e=d||1;0<e;e--)c.context=c.context.prev;return k(a,b,c)}function m(a){var b=a.current().toLowerCase();p=B.hasOwnProperty(b)?"atom":A.hasOwnProperty(b)?"keyword":"variable"}var n=c.inline;c.propertyKeywords||(c=a.resolveMode("text/css"));var o,p,q=b.indentUnit,r=c.tokenHooks,s=c.documentTypes||{},t=c.mediaTypes||{},u=c.mediaFeatures||{},v=c.mediaValueKeywords||{},w=c.propertyKeywords||{},x=c.nonStandardPropertyKeywords||{},y=c.fontProperties||{},z=c.counterDescriptors||{},A=c.colorKeywords||{},B=c.valueKeywords||{},C=c.allowNested,D=c.lineComment,E=!0===c.supportsAtComponent,F={};return F.top=function(a,b,c){if("{"==a)return i(c,b,"block");if("}"==a&&c.context.prev)return j(c);if(E&&/@component/i.test(a))return i(c,b,"atComponentBlock");if(/^@(-moz-)?document$/i.test(a))return i(c,b,"documentTypes");if(/^@(media|supports|(-moz-)?document|import)$/i.test(a))return i(c,b,"atBlock");if(/^@(font-face|counter-style)/i.test(a))return c.stateArg=a,"restricted_atBlock_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(a))return"keyframes";if(a&&"@"==a.charAt(0))return i(c,b,"at");if("hash"==a)p="builtin";else if("word"==a)p="tag";else{if("variable-definition"==a)return"maybeprop";if("interpolation"==a)return i(c,b,"interpolation");if(":"==a)return"pseudo";if(C&&"("==a)return i(c,b,"parens")}return c.context.type},F.block=function(a,b,c){if("word"==a){var d=b.current().toLowerCase();return w.hasOwnProperty(d)?(p="property","maybeprop"):x.hasOwnProperty(d)?(p="string-2","maybeprop"):C?(p=b.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(p+=" error","maybeprop")}return"meta"==a?"block":C||"hash"!=a&&"qualifier"!=a?F.top(a,b,c):(p="error","block")},F.maybeprop=function(a,b,c){return":"==a?i(c,b,"prop"):k(a,b,c)},F.prop=function(a,b,c){if(";"==a)return j(c);if("{"==a&&C)return i(c,b,"propBlock");if("}"==a||"{"==a)return l(a,b,c);if("("==a)return i(c,b,"parens");if("hash"==a&&!/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(b.current()))p+=" error";else if("word"==a)m(b);else if("interpolation"==a)return i(c,b,"interpolation");return"prop"},F.propBlock=function(a,b,c){return"}"==a?j(c):"word"==a?(p="property","maybeprop"):c.context.type},F.parens=function(a,b,c){return"{"==a||"}"==a?l(a,b,c):")"==a?j(c):"("==a?i(c,b,"parens"):"interpolation"==a?i(c,b,"interpolation"):("word"==a&&m(b),"parens")},F.pseudo=function(a,b,c){return"meta"==a?"pseudo":"word"==a?(p="variable-3",c.context.type):k(a,b,c)},F.documentTypes=function(a,b,c){return"word"==a&&s.hasOwnProperty(b.current())?(p="tag",c.context.type):F.atBlock(a,b,c)},F.atBlock=function(a,b,c){if("("==a)return i(c,b,"atBlock_parens");if("}"==a||";"==a)return l(a,b,c);if("{"==a)return j(c)&&i(c,b,C?"block":"top");if("interpolation"==a)return i(c,b,"interpolation");if("word"==a){var d=b.current().toLowerCase();p="only"==d||"not"==d||"and"==d||"or"==d?"keyword":t.hasOwnProperty(d)?"attribute":u.hasOwnProperty(d)?"property":v.hasOwnProperty(d)?"keyword":w.hasOwnProperty(d)?"property":x.hasOwnProperty(d)?"string-2":B.hasOwnProperty(d)?"atom":A.hasOwnProperty(d)?"keyword":"error"}return c.context.type},F.atComponentBlock=function(a,b,c){return"}"==a?l(a,b,c):"{"==a?j(c)&&i(c,b,C?"block":"top",!1):("word"==a&&(p="error"),c.context.type)},F.atBlock_parens=function(a,b,c){return")"==a?j(c):"{"==a||"}"==a?l(a,b,c,2):F.atBlock(a,b,c)},F.restricted_atBlock_before=function(a,b,c){return"{"==a?i(c,b,"restricted_atBlock"):"word"==a&&"@counter-style"==c.stateArg?(p="variable","restricted_atBlock_before"):k(a,b,c)},F.restricted_atBlock=function(a,b,c){return"}"==a?(c.stateArg=null,j(c)):"word"==a?(p=("@font-face"!=c.stateArg||y.hasOwnProperty(b.current().toLowerCase()))&&("@counter-style"!=c.stateArg||z.hasOwnProperty(b.current().toLowerCase()))?"property":"error","maybeprop"):"restricted_atBlock"},F.keyframes=function(a,b,c){return"word"==a?(p="variable","keyframes"):"{"==a?i(c,b,"top"):k(a,b,c)},F.at=function(a,b,c){return";"==a?j(c):"{"==a||"}"==a?l(a,b,c):("word"==a?p="tag":"hash"==a&&(p="builtin"),"at")},F.interpolation=function(a,b,c){return"}"==a?j(c):"{"==a||";"==a?l(a,b,c):("word"==a?p="variable":"variable"!=a&&"("!=a&&")"!=a&&(p="error"),"interpolation")},{startState:function(a){return{tokenize:null,state:n?"block":"top",stateArg:null,context:new h(n?"block":"top",a||0,null)}},token:function(a,b){if(!b.tokenize&&a.eatSpace())return null;var c=(b.tokenize||e)(a,b);return c&&"object"==typeof c&&(o=c[1],c=c[0]),p=c,"comment"!=o&&(b.state=F[b.state](o,a,b)),p},indent:function(a,b){var c=Math.max,d=a.context,e=b&&b.charAt(0),f=d.indent;return"prop"==d.type&&("}"==e||")"==e)&&(d=d.prev),d.prev&&("}"==e&&("block"==d.type||"top"==d.type||"interpolation"==d.type||"restricted_atBlock"==d.type)?(d=d.prev,f=d.indent):(")"==e&&("parens"==d.type||"atBlock_parens"==d.type)||"{"==e&&("at"==d.type||"atBlock"==d.type))&&(f=c(0,d.indent-q))),f},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:D,fold:"brace"}});var d=["domain","regexp","url","url-prefix"],e=b(d),f=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],g=b(f),h=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover"],i=b(h),j=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive"],k=b(j),l=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","justify-items","justify-self","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","mix-blend-mode","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","place-content","place-items","place-self","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","user-select","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],m=b(l),n=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"],o=b(n),p=b(["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"]),q=b(["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"]),r=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],s=b(r),t=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","auto-flow","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","contents","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","opacity","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","scroll-position","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","self-start","self-end","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","space-evenly","spell-out","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","symbolic","symbols","system-ui","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","transform","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","unset","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],u=b(t),v=d.concat(f).concat(h).concat(j).concat(l).concat(n).concat(r).concat(t);a.registerHelper("hintWords","css",v),a.defineMIME("text/css",{documentTypes:e,mediaTypes:g,mediaFeatures:i,mediaValueKeywords:k,propertyKeywords:m,nonStandardPropertyKeywords:o,fontProperties:p,counterDescriptors:q,colorKeywords:s,valueKeywords:u,tokenHooks:{"/":function(a,b){return!!a.eat("*")&&(b.tokenize=c,c(a,b))}},name:"css"}),a.defineMIME("text/x-scss",{mediaTypes:g,mediaFeatures:i,mediaValueKeywords:k,propertyKeywords:m,nonStandardPropertyKeywords:o,colorKeywords:s,valueKeywords:u,fontProperties:p,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(a,b){return a.eat("/")?(a.skipToEnd(),["comment","comment"]):a.eat("*")?(b.tokenize=c,c(a,b)):["operator","operator"]},":":function(a){return!!a.match(/\s*\{/,!1)&&[null,null]},$:function(a){return a.match(/^[\w-]+/),a.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(a){return!!a.eat("{")&&[null,"interpolation"]}},name:"css",helperType:"scss"}),a.defineMIME("text/x-less",{mediaTypes:g,mediaFeatures:i,mediaValueKeywords:k,propertyKeywords:m,nonStandardPropertyKeywords:o,colorKeywords:s,valueKeywords:u,fontProperties:p,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(a,b){return a.eat("/")?(a.skipToEnd(),["comment","comment"]):a.eat("*")?(b.tokenize=c,c(a,b)):["operator","operator"]},"@":function(a){return a.eat("{")?[null,"interpolation"]:!a.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i,!1)&&(a.eatWhile(/[\w\\\-]/),a.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),a.defineMIME("text/x-gss",{documentTypes:e,mediaTypes:g,mediaFeatures:i,propertyKeywords:m,nonStandardPropertyKeywords:o,fontProperties:p,counterDescriptors:q,colorKeywords:s,valueKeywords:u,supportsAtComponent:!0,tokenHooks:{"/":function(a,b){return!!a.eat("*")&&(b.tokenize=c,c(a,b))}},name:"css",helperType:"gss"})});