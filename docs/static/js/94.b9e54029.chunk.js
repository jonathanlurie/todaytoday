(this.webpackJsonptoday=this.webpackJsonptoday||[]).push([[94],{456:function(e,t,n){!function(e){"use strict";e.defineMode("shell",(function(){var t={};function n(e,n){for(var r=0;r<n.length;r++)t[n[r]]=e}var r=["true","false"],s=["if","then","do","else","elif","while","until","for","in","esac","fi","fin","fil","done","exit","set","unset","export","function"],i=["ab","awk","bash","beep","cat","cc","cd","chown","chmod","chroot","clear","cp","curl","cut","diff","echo","find","gawk","gcc","get","git","grep","hg","kill","killall","ln","ls","make","mkdir","openssl","mv","nc","nl","node","npm","ping","ps","restart","rm","rmdir","sed","service","sh","shopt","shred","source","sort","sleep","ssh","start","stop","su","sudo","svn","tee","telnet","top","touch","vi","vim","wall","wc","wget","who","write","yes","zsh"];function o(e,n){if(e.eatSpace())return null;var r=e.sol(),s=e.next();if("\\"===s)return e.next(),null;if("'"===s||'"'===s||"`"===s)return n.tokens.unshift(u(s,"`"===s?"quote":"string")),l(e,n);if("#"===s)return r&&e.eat("!")?(e.skipToEnd(),"meta"):(e.skipToEnd(),"comment");if("$"===s)return n.tokens.unshift(f),l(e,n);if("+"===s||"="===s)return"operator";if("-"===s)return e.eat("-"),e.eatWhile(/\w/),"attribute";if(/\d/.test(s)&&(e.eatWhile(/\d/),e.eol()||!/\w/.test(e.peek())))return"number";e.eatWhile(/[\w-]/);var i=e.current();return"="===e.peek()&&/\w+/.test(i)?"def":t.hasOwnProperty(i)?t[i]:null}function u(e,t){var n="("==e?")":"{"==e?"}":e;return function(r,s){for(var i,o=!1;null!=(i=r.next());){if(i===n&&!o){s.tokens.shift();break}if("$"===i&&!o&&"'"!==e&&r.peek()!=n){o=!0,r.backUp(1),s.tokens.unshift(f);break}if(!o&&e!==n&&i===e)return s.tokens.unshift(u(e,t)),l(r,s);if(!o&&/['"]/.test(i)&&!/['"]/.test(e)){s.tokens.unshift(a(i,"string")),r.backUp(1);break}o=!o&&"\\"===i}return t}}function a(e,t){return function(n,r){return r.tokens[0]=u(e,t),n.next(),l(n,r)}}e.registerHelper("hintWords","shell",r.concat(s,i)),n("atom",r),n("keyword",s),n("builtin",i);var f=function(e,t){t.tokens.length>1&&e.eat("$");var n=e.next();return/['"({]/.test(n)?(t.tokens[0]=u(n,"("==n?"quote":"{"==n?"def":"string"),l(e,t)):(/\d/.test(n)||e.eatWhile(/\w/),t.tokens.shift(),"def")};function l(e,t){return(t.tokens[0]||o)(e,t)}return{startState:function(){return{tokens:[]}},token:function(e,t){return l(e,t)},closeBrackets:"()[]{}''\"\"``",lineComment:"#",fold:"brace"}})),e.defineMIME("text/x-sh","shell"),e.defineMIME("application/x-sh","shell")}(n(42))}}]);
//# sourceMappingURL=94.b9e54029.chunk.js.map