(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){function b(a){a.state.placeholder&&(a.state.placeholder.parentNode.removeChild(a.state.placeholder),a.state.placeholder=null)}function c(a){b(a);var c=a.state.placeholder=document.createElement("pre");c.style.cssText="height: 0; overflow: visible",c.style.direction=a.getOption("direction"),c.className="CodeMirror-placeholder CodeMirror-line-like";var d=a.getOption("placeholder");"string"==typeof d&&(d=document.createTextNode(d)),c.appendChild(d),a.display.lineSpace.insertBefore(c,a.display.lineSpace.firstChild)}function d(a){f(a)&&c(a)}function e(a){var d=a.getWrapperElement(),e=f(a);d.className=d.className.replace(" CodeMirror-empty","")+(e?" CodeMirror-empty":""),e?c(a):b(a)}function f(a){return 1===a.lineCount()&&""===a.getLine(0)}a.defineOption("placeholder","",function(c,f,g){var h=g&&g!=a.Init;if(f&&!h)c.on("blur",d),c.on("change",e),c.on("swapDoc",e),e(c);else if(!f&&h){c.off("blur",d),c.off("change",e),c.off("swapDoc",e),b(c);var i=c.getWrapperElement();i.className=i.className.replace(" CodeMirror-empty","")}f&&!c.hasFocus()&&d(c)})});