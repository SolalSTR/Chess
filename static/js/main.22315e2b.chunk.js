(this.webpackJsonpchess=this.webpackJsonpchess||[]).push([[0],[,,,,,,,,,,function(t,e,n){t.exports=n(22)},,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var a=n(0),s=n.n(a),i=n(8),o=n.n(i),r=(n(15),n(1)),c=n(2),p=n(5),l=n(3),h=n(4),u=n(9),g=(n(16),n(17),function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(p.a)(this,Object(l.a)(e).call(this,t))).moveInside=function(){if(n.plateau.state.choosing.isChoosing&&n.props.glowing){var t=n.state.pos;n.props.changeTurn(),n.plateau.state.choosing.pion.move(t.x,t.y,n.plateau.state.pions)}},n.state={color:n.props.color,pion:!1,pos:{x:n.props.x,y:n.props.y},style:{background:n.props.color},glowing:n.props.glowing},n.plateau=n.props.plateau,n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.props.glowing?"active":"",e=this.plateau.state.pions[this.state.pos.x][this.state.pos.y];return"empty"!==e&&(t+="-kill"),"empty"!==e&&"king"===e.state.type&&(e.checkLine(e.state.pos,this.plateau.state.pions)||(t+=" danger")),s.a.createElement("div",{className:"case "+t,onClick:this.moveInside,x:this.state.pos.x,y:this.state.pos.y,style:this.state.style})}}]),e}(a.Component)),y=n(6),f=(n(18),function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(p.a)(this,Object(l.a)(e).call(this,t))).move=function(t,e,a){console.log(Object(y.a)(n));var s=n.state.pos,i=n.props.changePions(Object(y.a)(n),[s.x,s.y],[t,e]);console.log(i);var o={pos:{x:t,y:e},isFirstTour:!1};"pawn"!==n.state.type||0!==e&&e!==n.plateau.state.size-1||n.props.askPopUp("endPlateau","",n.changeType.bind(Object(y.a)(n))),"king"===n.state.type&&(s.x-t===2?(console.log(i[0][s.y]),i[0][s.y].move(s.x-1,s.y,i)):s.x-t===-2&&(console.log(i[7][s.y]),i[7][s.y].move(s.x+1,s.y,i)),n.props.changeKingPos(n.state.team,o.pos)),n.setState(o)},n.changeType=function(t){n.setState({type:t})},n.die=function(){if("king"===n.state.type){var t="white"===n.state.team?"black":"white";n.props.askPopUp("win",t,n.changeType.bind(Object(y.a)(n)))}n.setState({isDead:!0})},n.showCase=function(t){if(!n.state.isDead&&n.plateau.state.teamTurn===n.state.team){t.stopPropagation();var e=n.getAllPossibleCases(n.plateau.state.pions);n.props.change(e,Object(y.a)(n))}},n.getAllPossibleCases=function(t){var e=[],a=n.state.pos;switch(n.state.type){case"pawn":e=n.pawnMoves(a,t);break;case"rook":e=n.rookMoves(a,t);break;case"knight":e=n.knightMoves(a,t);break;case"bishop":e=n.bishopMoves(a,t);break;case"queen":e=n.queenMoves(a,t);break;case"king":e=n.kingMoves(a,t);break;default:console.log("rien")}if("king"!==n.state.type){var s=[];for(var i in e){var o=e[i],r=[],c=!0,p=!1,l=void 0;try{for(var h,u=t[Symbol.iterator]();!(c=(h=u.next()).done);c=!0){var g=h.value;r.push(Array.from(g))}}catch(f){p=!0,l=f}finally{try{c||null==u.return||u.return()}finally{if(p)throw l}}r[o[0]][o[1]]=r[a.x][a.y],r[a.x][a.y]="empty";var y=n.props.kingPos[n.state.team];n.checkLine(y,r)&&s.push(o)}return s}return e},n.pawnMoves=function(t,e){var a=[],s="black"===n.state.team?1:-1;if("empty"===e[t.x][t.y+1*s]&&(a.push([t.x,t.y+1*s]),n.state.isFirstTour&&"empty"===e[t.x][t.y+2*s]&&a.push([t.x,t.y+2*s])),n.inRange(t.y+1*s)){if(n.inRange(t.x+1)){var i=e[t.x+1][t.y+1*s];"empty"!==i&&i.state.team!==n.state.team&&a.push([t.x+1,t.y+1*s])}if(n.inRange(t.x-1)){var o=e[t.x-1][t.y+1*s];"empty"!==o&&o.state.team!==n.state.team&&a.push([t.x-1,t.y+1*s])}}return a},n.rookMoves=function(t,e){return[].concat(n.goInLine(8,[1,0],t,e),n.goInLine(8,[-1,0],t,e),n.goInLine(8,[0,1],t,e),n.goInLine(8,[0,-1],t,e))},n.bishopMoves=function(t,e){return[].concat(n.goInLine(8,[1,1],t,e),n.goInLine(8,[-1,1],t,e),n.goInLine(8,[-1,-1],t,e),n.goInLine(8,[1,-1],t,e))},n.queenMoves=function(t,e){return[].concat(n.goInLine(8,[1,1],t,e),n.goInLine(8,[-1,1],t,e),n.goInLine(8,[-1,-1],t,e),n.goInLine(8,[1,-1],t,e),n.goInLine(8,[1,0],t,e),n.goInLine(8,[-1,0],t,e),n.goInLine(8,[0,1],t,e),n.goInLine(8,[0,-1],t,e))},n.kingMoves=function(t,e){var a=[];return n.state.isFirstTour&&(n.checkRockLine([1,0],t,e)&&(console.log("rigth"),n.checkLine({x:t.x+2,y:t.y},e)&&a.push([t.x+2,t.y,"rock"])),n.checkRockLine([-1,0],t,e)&&(console.log("lzft"),n.checkLine({x:t.x-2,y:t.y},e)&&a.push([t.x-2,t.y,"rock"]))),[].concat(n.kingLine([1,1],t,e),n.kingLine([-1,1],t,e),n.kingLine([-1,-1],t,e),n.kingLine([1,-1],t,e),n.kingLine([1,0],t,e),n.kingLine([-1,0],t,e),n.kingLine([0,1],t,e),n.kingLine([0,-1],t,e),a)},n.knightMoves=function(t,e){return[].concat(n.goInLine(2,[2,1],t,e),n.goInLine(2,[-2,-1],t,e),n.goInLine(2,[-2,1],t,e),n.goInLine(2,[2,-1],t,e),n.goInLine(2,[1,2],t,e),n.goInLine(2,[-1,-2],t,e),n.goInLine(2,[-1,2],t,e),n.goInLine(2,[1,-2],t,e))},n.goInLine=function(t,e,a,s){for(var i=[],o=1;o<t;o++){var r=[a.x+e[0]*o,a.y+e[1]*o];if(!n.inRange(r[0])||!n.inRange(r[1]))return i;if("empty"!==s[r[0]][r[1]])return s[r[0]][r[1]].state.team!==n.state.team&&i.push(r),i;i.push(r)}return i},n.kingLine=function(t,e,a){var s=[],i=[e.x+t[0],e.y+t[1]];if(!n.inRange(i[0])||!n.inRange(i[1]))return s;if("empty"!==a[i[0]][i[1]]){if(a[i[0]][i[1]].state.team===n.state.team)if("king"==a[i[0]][i[1]].state.type)n.checkLine({x:i[0],y:i[1]},a)&&s.push(i);if(a[i[0]][i[1]].state.team!==n.state.team)n.checkLine({x:i[0],y:i[1]},a)&&s.push(i);return s}return n.checkLine({x:i[0],y:i[1]},a)&&s.push(i),s},n.checkRockLine=function(t,e,a){for(var s=1;s<8;s++){var i=[e.x+t[0]*s,e.y+t[1]*s];if(!n.inRange(i[0])||!n.inRange(i[1]))break;var o=a[i[0]][i[1]];if("empty"!==o){if(o.state.team===n.state.team&&"rook"===o.state.type)return!0;break}}return!1},n.checkLine=function(t,e){for(var a=0,s="white"===n.state.team?[[-1,-1],[1,-1]]:[[-1,1],[1,1]];a<s.length;a++)for(var i=s[a],o=1;o<2;o++){var r=[t.x+i[0]*o,t.y+i[1]*o];if(!n.inRange(r[0])||!n.inRange(r[1]))break;var c=e[r[0]][r[1]];if("empty"!==c){if(c.state.team!==n.state.team&&"pawn"===c.state.type)return!1;if("king"!==c.state.type)break}}for(var p=0,l=[[1,1],[-1,1],[1,-1],[-1,-1]];p<l.length;p++)for(var h=l[p],u=1;u<8;u++){var g=[t.x+h[0]*u,t.y+h[1]*u];if(!n.inRange(g[0])||!n.inRange(g[1]))break;var y=e[g[0]][g[1]];if("empty"!==y){if(y.state.team!==n.state.team){if("king"===y.state.type&&u<=1)return!1;switch(y.state.type){case"queen":case"bishop":return!1}break}if("king"!==y.state.type)break}}for(var f=0,k=[[1,0],[-1,0],[0,-1],[0,1]];f<k.length;f++)for(var v=k[f],m=1;m<8;m++){var b=[t.x+v[0]*m,t.y+v[1]*m];if(!n.inRange(b[0])||!n.inRange(b[1]))break;var d=e[b[0]][b[1]];if("empty"!==d){if(d.state.team!==n.state.team){if("king"===d.state.type&&m<=1)return!1;switch(d.state.type){case"queen":case"rook":return!1}break}if("king"!==d.state.type)break}}for(var w=0,P=[[2,1],[-2,-1],[-2,1],[2,-1],[1,2],[-1,-2],[-1,2],[1,2]];w<P.length;w++){var x=P[w],C=[t.x+x[0],t.y+x[1]];if(n.inRange(C[0])&&n.inRange(C[1])){var T=e[C[0]][C[1]];if("empty"!==T&&T.state.team!==n.state.team&&"knight"===T.state.type)return!1}}return!0},n.state={colors:n.props.colors,isDead:!1,team:n.props.team,type:n.props.type,pos:{x:n.props.x,y:n.props.y},isFirstTour:!0},n.plateau=n.props.plateau,n.pionSize=100/n.plateau.state.size,n.props.getThis(Object(y.a)(n)),"king"===n.state.type&&n.props.changeKingPos(n.state.team,n.state.pos),n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.state.isDead?"dead ":"",e=this.props.colors,n={color:e.borderColor,borderColor:e.borderColor,background:e.color,top:this.state.pos.y*this.pionSize+"%",left:this.state.pos.x*this.pionSize+"%",width:this.pionSize+"%",height:this.pionSize+"%",transform:"rotate("+-this.props.rotation+"deg)"};return s.a.createElement("div",{className:"pion "+t,onClick:this.showCase,style:n},s.a.createElement("i",{className:"fas fa-chess-"+this.state.type}))}},{key:"inRange",value:function(t){return t<this.plateau.state.size&&t>=0}}]),e}(a.Component)),k=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(p.a)(this,Object(l.a)(e).call(this,t))).teamOnPat=function(t,e){var n=!0,a=!1,s=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done);n=!0){var r=i.value,c=!0,p=!1,l=void 0;try{for(var h,u=r[Symbol.iterator]();!(c=(h=u.next()).done);c=!0){var g=h.value;if("empty"!==g&&g.state.team===t&&g.getAllPossibleCases(e).length>0)return!1}}catch(y){p=!0,l=y}finally{try{c||null==u.return||u.return()}finally{if(p)throw l}}}}catch(y){a=!0,s=y}finally{try{n||null==o.return||o.return()}finally{if(a)throw s}}return!0},n.teamOnMat=function(t,e,a){var s=n.state.kingPos[t];!1!==a&&(s=a);var i=e[s.x][s.y];if(console.log(i),i.checkLine(s,e))return!1;if(i.getAllPossibleCases(e)>0)return!1;var o=!0,r=!1,c=void 0;try{for(var p,l=n.state.pions[Symbol.iterator]();!(o=(p=l.next()).done);o=!0){var h=p.value,u=!0,g=!1,y=void 0;try{for(var f,k=h[Symbol.iterator]();!(u=(f=k.next()).done);u=!0){var v=f.value;if("empty"!==v&&v.state.team===t&&v.getAllPossibleCases(e).length>0)return!1}}catch(m){g=!0,y=m}finally{try{u||null==k.return||k.return()}finally{if(g)throw y}}}}catch(m){r=!0,c=m}finally{try{o||null==l.return||l.return()}finally{if(r)throw c}}return!0},n.chooseCase=function(t){if(n.state.choosing.isChoosing){var e=n.createArrayCases();n.setState({cases:e,choosing:{isChoosing:!1,pion:null}})}},n.state={pionsPattern:n.props.pionsPattern,colors:n.props.colors,size:n.props.size,cases:n.createArrayCases(),teamTurn:"white",choosing:{isChoosing:!1,pion:null},echec:!1,pions:n.createArrayPions(),kingPos:{white:null,black:null}},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"changeTurn",value:function(){"white"===this.state.teamTurn?this.setState({teamTurn:"black"}):this.setState({teamTurn:"white"})}},{key:"changeArray",value:function(t,e){var n=this.createArrayCases(),a=!0,s=!1,i=void 0;try{for(var o,r=t[Symbol.iterator]();!(a=(o=r.next()).done);a=!0){var c=o.value;c[0]>=0&&c[0]<this.state.size&&c[1]>=0&&c[1]<this.state.size&&(n[c[0]][c[1]]=!0)}}catch(p){s=!0,i=p}finally{try{a||null==r.return||r.return()}finally{if(s)throw i}}this.setState({cases:n,choosing:{isChoosing:!0,pion:e}})}},{key:"changePions",value:function(t,e,n){var a=Object(u.a)(this.state.pions),s=a[e[0]].splice(e[1],1,"empty");"empty"!==a[n[0]][n[1]]&&a[n[0]][n[1]].die(),a[n[0]][n[1]]=s[0];var i=!1;return"king"==t.state.type?(i={x:n[0],y:n[1]},this.testPat(a),this.testMat(a,i)):(this.testPat(a),this.testMat(a,i)),this.setState({pions:a}),a}},{key:"inEchec",value:function(t){this.setState({echec:{inEchec:!0,pos:t}})}},{key:"changeKingPos",value:function(t,e){var n=this.state.kingPos;"white"===t?n.white=e:n.black=e,this.setState({kingPos:n})}},{key:"createArrayCases",value:function(){for(var t=[],e=0;e<this.props.size;e++){for(var n=[],a=0;a<this.props.size;a++)n.push(!1);t.push(n)}return t}},{key:"createArrayPions",value:function(){for(var t=[],e=0;e<this.props.size;e++){for(var n=[],a=0;a<this.props.size;a++)n.push("empty");t.push(n)}return t}},{key:"getThis",value:function(t){var e=this.state.pions,n=t.state.pos;e[n.x][n.y]=t,this.setState({pions:e})}},{key:"renderPlateau",value:function(){for(var t=[],e=0;e<this.props.size;e++){for(var n=[],a=0;a<this.props.size;a++)n.push([s.a.createElement(g,{changeTurn:this.changeTurn.bind(this),key:e+a,x:a,y:e,glowing:this.state.cases[a][e],plateau:this,color:(a+e)%2===0?this.state.colors.firstColor.first:this.state.colors.secondaryColor.first}),this.renderPions(e,a)]);t.push(n)}return t}},{key:"renderPions",value:function(t,e){if(t>=this.state.size-this.state.pionsPattern.length||t<this.state.pionsPattern.length){var n=this.state.size/2<=t?this.state.colors.firstColor.first:this.state.colors.secondaryColor.first,a=this.state.size/2<=t?this.state.colors.firstColor.secondary:this.state.colors.secondaryColor.secondary,i="pion",o="";return t<this.state.pionsPattern.length&&(i=this.state.pionsPattern[t][e],o="black"),t>=this.state.size-this.state.pionsPattern.length&&(i=this.state.pionsPattern[this.state.size-t-1][e],o="white"),s.a.createElement(f,{askPopUp:this.props.askPopUp,typeToChange:this.props.typeToChange,rotation:this.props.rotation,changePions:this.changePions.bind(this),getThis:this.getThis.bind(this),change:this.changeArray.bind(this),key:t+e+"p",x:e,y:t,plateau:this,colors:{color:n,borderColor:a},type:i,team:o,inEchec:this.inEchec.bind(this),echec:this.state.echec,changeKingPos:this.changeKingPos.bind(this),testPat:this.testPat.bind(this),testMat:this.testMat.bind(this),kingPos:this.state.kingPos})}return null}},{key:"testPat",value:function(t){this.teamOnPat("white",t)&&this.props.askPopUp("pat","white",(function(){console.log("e")})),this.teamOnPat("black",t)&&this.props.askPopUp("pat","black",(function(){console.log("e")}))}},{key:"testMat",value:function(t,e){this.teamOnMat("white",t,e)&&this.props.askPopUp("mat","white",(function(){console.log("e")})),this.teamOnMat("black",t,e)&&this.props.askPopUp("mat","black",(function(){console.log("e")}))}},{key:"render",value:function(){var t={gridTemplate:"repeat("+this.props.size+",1fr) / repeat("+this.props.size+",1fr)",border:"15px outset "+this.state.colors.firstColor.secondary,transform:"rotate("+this.props.rotation+"deg)"};return s.a.createElement("div",{onClick:this.chooseCase,id:"plateau",style:t},this.renderPlateau())}}]),e}(a.Component),v=(n(19),function(t){function e(){return Object(r.a)(this,e),Object(p.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"renderPopup",value:function(){var t=this;switch(this.props.type){case"endPlateau":return s.a.createElement("div",null,s.a.createElement("h2",null,"Choose your new pawn type ?"),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){t.props.changeType("queen")}},s.a.createElement("i",{className:"fas fa-chess-queen"})),s.a.createElement("button",{onClick:function(){t.props.changeType("rook")}},s.a.createElement("i",{className:"fas fa-chess-rook"})),s.a.createElement("button",{onClick:function(){t.props.changeType("bishop")}},s.a.createElement("i",{className:"fas fa-chess-bishop"})),s.a.createElement("button",{onClick:function(){t.props.changeType("knight")}},s.a.createElement("i",{className:"fas fa-chess-knight"}))));case"win":return s.a.createElement("div",null,s.a.createElement("h2",null,"The ",this.props.winnerTeam," team win !"));case"pat":return s.a.createElement("div",null,s.a.createElement("h2",null,this.props.winnerTeam," team is on Pat !"));case"mat":return s.a.createElement("div",null,s.a.createElement("h2",null,this.props.winnerTeam," team is on Mat !"))}}},{key:"render",value:function(){return s.a.createElement("div",{id:"popupContainer"},this.renderPopup())}}]),e}(s.a.Component)),m=(n(20),n(21),function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(p.a)(this,Object(l.a)(e).call(this,t))).startRotation=function(t){t.stopPropagation();var e=n.getAngle(t.clientX-window.innerWidth/2,t.clientY-window.innerHeight/2);n.setState({lastAngle:e,clicked:!0})},n.stopRotation=function(t){t.stopPropagation();var e=n.state.rotation;n.setState({lastRotation:e,clicked:!1})},n.rotation=function(t){if(t.stopPropagation(),n.state.clicked){var e=n.getAngle(t.clientX-window.innerWidth/2,t.clientY-window.innerHeight/2)-n.state.lastAngle,a=n.state.lastRotation;n.setState({rotation:a+e})}},n.rotateTooTurn=function(t){t.stopPropagation();var e=n.state.lastRotation;n.setState({rotation:e+180})},n.getAngle=function(t,e){return(360+180*Math.atan2(e,t)/Math.PI)%360},n.colors={firstColor:{first:"#d7d6e2",secondary:"#f7f6ff"},secondaryColor:{first:"#bdbbc7",secondary:"#9795a1"}},n.pionsPattern=[["rook","knight","bishop","queen","king","bishop","knight","rook"],["pawn","pawn","pawn","pawn","pawn","pawn","pawn","pawn"]],n.state={lastAngle:0,lastRotation:0,rotation:0,clicked:!1,askNewType:!1,func:null,type:"",winnerTeam:""},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"changeType",value:function(t){this.setState({askNewType:!1}),this.state.func(t)}},{key:"createPopUp",value:function(){if(this.state.askNewType)return s.a.createElement(v,{type:this.state.type,winnerTeam:this.state.winnerTeam,changeType:this.changeType.bind(this)})}},{key:"askPopUp",value:function(t,e,n){this.setState({type:t,winnerTeam:e,func:n,askNewType:!0})}},{key:"render",value:function(){return s.a.createElement("div",{id:"container"},s.a.createElement(k,{askPopUp:this.askPopUp.bind(this),typeToChange:this.state.newType,rotation:this.state.rotation,size:8,colors:this.colors,pionsPattern:this.pionsPattern}),s.a.createElement("div",{style:{zIndex:this.state.clicked?1:0},id:"pla",onDoubleClick:this.rotateTooTurn,onMouseMove:this.rotation,onMouseUp:this.stopRotation,onMouseOut:this.stopRotation,onMouseDown:this.startRotation}),this.createPopUp())}}]),e}(s.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.22315e2b.chunk.js.map