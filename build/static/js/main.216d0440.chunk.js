(this["webpackJsonpconnect-four"]=this["webpackJsonpconnect-four"]||[]).push([[0],{11:function(n,e,t){n.exports=t(18)},16:function(n,e,t){},17:function(n,e,t){},18:function(n,e,t){"use strict";t.r(e);var l=t(0),r=t.n(l),u=t(4),a=t.n(u),o=(t(16),t(5)),i=t(6),c=t(9),f=t(7),s=t(2),v=t(10),d=t(1),h=function(n){var e=0,t=0;return n.forEach((function(n){n.forEach((function(n){"y"===n?e++:"r"===n&&t++}))})),[e,t]},m=function(n,e){for(var t=n.length-1;t>=0;){if(!n[t][e])return t;t--}},g=function(n,e){for(var t=1,l=e,r=e;r<e+3&&n[r]===n[r+1];r++)t++,l++;return[t,l]},b=function(n,e,t,l){var r=1,u=t;n:for(var a=e;a>e-3;a--)switch(l){case"straight":if(n[a][t]!==n[a-1][t])break n;r++;break;case"forward":if(!(t<=3&&n[a][u]===n[a-1][u+1]))break n;r++,u++;break;case"backward":if(!(t>=3&&n[a][u]===n[a-1][u-1]))break n;r++,u--}return[r,u]},p=function(n,e,t){return 4===b(n,e,t,"straight")[0]||(4===b(n,e,t,"forward")[0]||4===b(n,e,t,"backward")[0])},y=function(n,e,t,l){var r;r="defense"===l?"y"===e?"r":"y":e;for(var u=n.length-1;u>=0;u--)for(var a=0;a<7;a++)if(n[u][a]===r){if(u>=3){var o=w(n,u,a,t);if(null!==o)return o;var i=x(n,u,a,t);if(null!==i)return i;var c=E(n,u,a,t);if(null!==c)return c}var f=k(n,u,a,t);if(null!==f)return f}return null},k=function(n,e,t,l){var r=g(n[e],t),u=Object(d.a)(r,2),a=u[0],o=u[1];if(o<=5&&a>=l){if(j("row",a,e,t),null===n[e][o+1]){var i=o+1;if(!C(n,e,i))return i}if(t>0&&null===n[e][t-1]){var c=t-1;if(!C(n,e,c))return c}}return null},w=function(n,e,t,l){var r=b(n,e,t,"straight")[0];return j("column straight",r,e,t),r>=l&&null===n[e-l][t]&&void 0!==m(n,t)?t:null},x=function(n,e,t,l){var r=b(n,e,t,"forward"),u=Object(d.a)(r,2),a=u[0],o=u[1];j("column forward",a,e,t);var i=o+1,c=e-l,f=C(n,c,i);if(a>=l&&null===n[c][i]&&void 0!==m(n,t)&&!f)return i;if(e>0&&t>0){var s=t-1,v=e-1,h=C(n,v,s);if(null===n[v][s]&&!h)return s}return null},E=function(n,e,t,l){var r=b(n,e,t,"backward"),u=Object(d.a)(r,2),a=u[0],o=u[1];j("column backward",a,e,t);var i=o-1,c=e-l,f=C(n,c,i);if(a>=l&&null===n[c][i]&&void 0!==m(n,t)&&!f)return i;if(e<5&&t<6){var s=t+1,v=e+1,h=C(n,v,s);if(null===n[v][s]&&!h)return s}return null},C=function(n,e,t){var l=!1;if(e<n.length-1)for(var r=e+1;r<n.length;r++)null===n[r][t]&&(l=!0);return l},j=function(n,e,t,l){console.log("connected ".concat(n,": ").concat(e," row: ").concat(t," column ").concat(l))},M=function(n){if(!n)return!1;var e=h(n),t=Object(d.a)(e,2),l=t[0],r=t[1];return!(l<r||l-r>1)&&!function(n){for(var e=n.length-2;e>=0;e--)for(var t=0;t<7;t++)if(n[e][t]&&!n[e+1][t])return!0;return!1}(n)},O=function(n,e,t){var l=n;if(e<0||e>6)return!1;if("y"!==t&&"r"!==t)return!1;var r=m(n,e);return void 0!==r&&(l[r][e]=t,l)},S=function(n){for(var e=n.length-1;e>=0;e--)for(var t=0;t<7;t++)if(n[e][t]){if(t<=3&&4===g(n[e],t)[0])return!0;if(e>=3&&p(n,e,t))return!0}return!1},B=function(n,e,t){for(var l=t;l>0;){var r=y(n,e,l);if(null!==r)return r;var u=y(n,e,l,"defense");if(null!==u)return u;l--}return null},R=t(8),P=t.n(R),A=function(n){function e(){var n;return Object(o.a)(this,e),(n=Object(c.a)(this,Object(f.a)(e).call(this))).state={gameState:[[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]],mode:"1",winner:null},n.onClickMove=n.onClickMove.bind(Object(s.a)(n)),n.onClickRestart=n.onClickRestart.bind(Object(s.a)(n)),n.toggleMode=n.toggleMode.bind(Object(s.a)(n)),n}return Object(v.a)(e,n),Object(i.a)(e,[{key:"renderTable",value:function(){var n=this,e=this.state.gameState.map((function(n,e){var t=n.map((function(n,e){var t={};return"y"===n?t=N.yellowPlayer:"r"===n&&(t=N.redPlayer),r.a.createElement("td",{key:e,style:N.cell},r.a.createElement("div",{style:t}))}));return r.a.createElement("tr",{key:e},t)})),t=[0,1,2,3,4,5,6].map((function(e){return r.a.createElement("td",{key:e,style:N.cell},r.a.createElement("button",{style:N.moveButton,onClick:n.onClickMove,value:e}))}));return r.a.createElement("table",{border:"1"},e,r.a.createElement("tr",null,t))}},{key:"toggleMode",value:function(n){var e=n.target.value;this.setState({mode:e})}},{key:"onClickMove",value:function(n){var e=this,t=n.target.value,l=this.state,r=l.gameState,u=l.winner,a=l.mode;if(!u){var o=function(n){var e=h(n),t=Object(d.a)(e,2);return t[0]>t[1]?"r":"y"}(r),i=O(r,t,o);M(i)?this.setState({gameState:i},(function(){var n=S(i);n?(n="y"===o?"yellow":"red",e.setState({winner:n})):"1"===a&&e.computerMove()})):console.error("invalid game state")}}},{key:"onClickRestart",value:function(){this.setState({gameState:[[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]],winner:null})}},{key:"computerMove",value:function(){var n=this,e=this.state.gameState,t=function(n,e){var t=B(n,e,3);return null!==t?t:Math.floor(6*Math.random())}(e,"r"),l=O(e,t,"r");M(l)?this.setState({gameState:l},(function(){var e=S(l);e&&(e="red",n.setState({winner:e}))})):console.error("invalid game state")}},{key:"render",value:function(){var n=this.state.winner,e="1"===this.state.mode?N.activeButton:N.button,t="2"===this.state.mode?N.activeButton:N.button;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:P.a,className:"App-logo",alt:"logo",width:"100px"}),n&&r.a.createElement("h1",null,n," wins!"),r.a.createElement("div",{style:N.modeContainer},r.a.createElement("button",{style:e,onClick:this.toggleMode,value:"1"},"1 Player"),r.a.createElement("button",{style:t,onClick:this.toggleMode,value:"2"},"2 Players")),this.renderTable(),r.a.createElement("button",{style:N.button,onClick:this.onClickRestart},"Restart")))}}]),e}(l.Component),N={yellowPlayer:{borderRadius:"25px",backgroundColor:"yellow",width:"40px",height:"40px",margin:"auto"},redPlayer:{borderRadius:"25px",backgroundColor:"red",width:"40px",height:"40px",margin:"auto"},cell:{width:"50px",height:"50px"},moveButton:{width:"40px",height:"40px"},button:{width:"120px",height:"40px",margin:"10px",cursor:"pointer"},activeButton:{width:"120px",height:"40px",margin:"10px",cursor:"pointer",backgroundColor:"grey"},modeContainer:{display:"flex",justifyContent:"flex-end"}};t(17);var J=function(){return r.a.createElement(A,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))},8:function(n,e,t){n.exports=t.p+"static/media/logo.5d5d9eef.svg"}},[[11,1,2]]]);
//# sourceMappingURL=main.216d0440.chunk.js.map