(this["webpackJsonpnotes-app-client"]=this["webpackJsonpnotes-app-client"]||[]).push([[0],{130:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(32),l=a.n(s),c=(a(77),a(71)),i=a(23),o=a(132),u=a(133),p=a(134),m=a(34),h=(a(84),a(21)),d=a(2),f=a.n(d),g=a(8),v=a(4),E=a(10),b=a(7),y=a(6),x="https://api.npham24.me",k={normal:"#A8A878",fighting:"#C03028",flying:"#A890F0",poison:"#A040A0",ground:"#E0C068",rock:"#B8A038",bug:"#A8B820",ghost:"#705898",steel:"#B8B8D0",fire:"#F08030",water:"#6890F0",grass:"#78C850",electric:"#F8D030",psychic:"#F85888",ice:"#98D8D8",dragon:"#7038F8",dark:"#705848",fairy:"#EE99AC"},S={common:"#D99454",uncommon:"#296EDF",rare:"#2EE75A",super_rare:"#B846EA",ultra_rare:"#EE5252",legendary:"#F9F52D"},j=function(){var e=Object(g.a)(f.a.mark((function e(t){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=localStorage.getItem("authHeader"),e.next=3,fetch(t,{headers:{Authorization:a}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=a(66),O=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).renderAllMoves=function(){var e=n.state.moves.map(n.renderOneMove);return r.a.createElement("table",{style:{marginLeft:"auto",marginRight:"auto"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{style:{padding:"5px"}},"Move"),r.a.createElement("th",{style:{padding:"5px"}},"Type"),r.a.createElement("th",{style:{padding:"5px"}},"Category"),r.a.createElement("th",{style:{padding:"5px"}},"Power"),r.a.createElement("th",{style:{padding:"5px"}},"Accuracy"))),r.a.createElement("tbody",null,e))},n.renderOneMove=function(e){var t="physical"===e?"#C92112":"#4F5870";return r.a.createElement("tr",{key:e.name},r.a.createElement("td",{style:{padding:"5px"}},e.name),r.a.createElement("td",{style:{backgroundColor:k[e.type],color:"white",padding:"5px"}},e.type),r.a.createElement("td",{style:{backgroundColor:t,color:"white",padding:"5px"}},e.category),r.a.createElement("td",{style:{padding:"5px"}},e.power),r.a.createElement("td",{style:{padding:"5px"}},e.acc))},n.state={moves:[]},n}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[],a=Object(w.a)(this.props.moves),e.prev=2,a.s();case 4:if((n=a.n()).done){e.next=12;break}return r=n.value,e.next=8,this.getMove(r);case 8:(s=e.sent)&&t.push(s);case 10:e.next=4;break;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(2),a.e(e.t0);case 17:return e.prev=17,a.f(),e.finish(17);case 20:this.setState({moves:t});case 21:case"end":return e.stop()}}),e,this,[[2,14,17,20]])})));return function(){return e.apply(this,arguments)}}()},{key:"getMove",value:function(){var e=Object(g.a)(f.a.mark((function e(t){var a,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="/v1/moves/"+t,e.next=3,j(x+a);case 3:if(200!==(n=e.sent).status){e.next=6;break}return e.abrupt("return",n.json());case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"card",style:{width:"400px"}},r.a.createElement("img",{src:x+"/v1/pokedex/image/"+this.props.pokemonName,alt:this.props.pokemonName+" image"}),r.a.createElement("h3",null,this.props.nickName),r.a.createElement("h4",null,"Species: "+this.props.pokemonName),r.a.createElement("h4",null,"level: "+this.props.level),r.a.createElement("p",null,"nature: "+this.props.nature),r.a.createElement("br",null),r.a.createElement("p",null,"IV:"),r.a.createElement("p",null,"HP: "+this.props.IV.hp),r.a.createElement("p",null,"ATK: "+this.props.IV.atk),r.a.createElement("p",null,"DEF: "+this.props.IV.def),r.a.createElement("p",null,"SPA: "+this.props.IV.spa),r.a.createElement("p",null,"SPD: "+this.props.IV.spd),r.a.createElement("p",null,"SPE: "+this.props.IV.spe),r.a.createElement("br",null),r.a.createElement("p",null,"Stats:"),r.a.createElement("p",null,"HP: "+this.props.stats.hp),r.a.createElement("p",null,"ATK: "+this.props.stats.atk),r.a.createElement("p",null,"DEF: "+this.props.stats.def),r.a.createElement("p",null,"SPA: "+this.props.stats.spa),r.a.createElement("p",null,"SPD: "+this.props.stats.spd),r.a.createElement("p",null,"SPE: "+this.props.stats.spe),r.a.createElement("br",null),r.a.createElement("p",null,"Moves:"),this.renderAllMoves())}}]),a}(r.a.Component),N=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={balls:[]},e}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r,s,l,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/inventory",e.next=3,j(x+"/v1/inventory");case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,n=[],r=0,s=Object.keys(a.balls);case 9:if(!(r<s.length)){e.next=20;break}return l=s[r],e.next=13,this.getBallInfo(l);case 13:(c=e.sent).remaining=a.balls[l],c.imageName=l,c&&n.push(c);case 17:r++,e.next=9;break;case 20:this.setState({balls:n});case 21:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getBallInfo",value:function(){var e=Object(g.a)(f.a.mark((function e(t){var a,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="/v1/items/"+t+"?type=ball",e.next=3,j(x+a);case 3:return n=e.sent,e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.state.balls.map((function(t){return r.a.createElement(C,Object.assign({selectSpecificBall:e.props.selectSpecificBall,selected:e.props.selected,key:t.imageName},t))})))}}]),a}(r.a.Component),C=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=t.call.apply(t,[this].concat(s))).renderItemCard=function(){var t=e.props.selected===e.props.imageName?"2px solid black":"";return r.a.createElement("div",{className:"card",onClick:function(){e.props.selectSpecificBall(e.props.imageName)},style:{padding:"5px",width:"250px",border:t}},r.a.createElement("img",{style:{width:"150px",height:"150px"},src:x+"/v1/items/image/"+e.props.imageName,alt:e.props.itemName+" image"}),r.a.createElement("h4",null,e.props.itemName),r.a.createElement("p",null,e.props.desc),r.a.createElement("h4",null,"Remaining: "+e.props.remaining))},e}return Object(E.a)(a,[{key:"render",value:function(){return this.renderItemCard()}}]),a}(r.a.Component),A=N,I=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).encounter=Object(g.a)(f.a.mark((function e(){var t,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/encounter",e.next=3,j(x+"/v1/encounter");case 3:if(401!==(t=e.sent).status){e.next=8;break}n.setState({errorMessage:"Please log in."}),e.next=20;break;case 8:return n.clearErrorMsg(),e.next=11,t.json();case 11:return a=e.sent,n.state.caughtPokemon&&n.setState({caughtPokemon:null}),e.t0=n,e.t1={isEncountering:!0,pokemonName:a.pokemonName,rarity:a.rarity},e.next=17,n.isCaught(a.pokemonName);case 17:e.t2=e.sent,e.t3={encountering:e.t1,isAlreadyCaughtBefore:e.t2},e.t0.setState.call(e.t0,e.t3);case 20:case"end":return e.stop()}}),e)}))),n.runaway=Object(g.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/runaway",e.next=3,j(x+"/v1/runaway");case 3:return t=e.sent,e.next=6,t.text();case 6:e.sent,n.setState({encountering:{isEncountering:!1}});case 8:case"end":return e.stop()}}),e)}))),n.catch=Object(g.a)(f.a.mark((function e(){var t,a,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="/v1/catch/"+n.state.encountering.pokemonName+"?ball="+n.state.pokeball,e.next=3,j(x+t);case 3:return a=e.sent,e.next=6,a.json();case 6:"success"===(r=e.sent).status?n.setState({encountering:{isEncountering:!1},caughtPokemon:r.pokemon}):alert("Catch failed!");case 8:case"end":return e.stop()}}),e)}))),n.changeBall=Object(g.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/inventory",e.next=3,j(x+"/v1/inventory");case 3:return t=e.sent,e.next=6,t.json();case 6:e.sent,n.setState({isSelectingBall:!0});case 8:case"end":return e.stop()}}),e)}))),n.selectSpecificBall=function(e){n.setState({pokeball:e})},n.isCaught=function(){var e=Object(g.a)(f.a.mark((function e(t){var a,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/pokedex",e.next=3,j(x+"/v1/pokedex");case 3:return a=e.sent,e.next=6,a.json();case 6:return n=e.sent,e.abrupt("return",n[t]);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.clearErrorMsg=function(){n.setState({errorMessage:""})},n.render=function(){return r.a.createElement("div",null,n.state.errorMessage&&r.a.createElement("p",{className:"alert alert-danger"},n.state.errorMessage),n.state.isSelectingBall?r.a.createElement("div",null,r.a.createElement(A,{selectSpecificBall:n.selectSpecificBall,selected:n.state.pokeball}),r.a.createElement("button",{onClick:function(){n.setState({isSelectingBall:!1})}},"Back")):r.a.createElement("div",null,n.state.encountering.isEncountering?r.a.createElement("div",null,r.a.createElement("button",{onClick:n.catch},"Catch"),r.a.createElement("button",{onClick:n.runaway},"Run Away"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement("h3",null,"Using ball: "),r.a.createElement("img",{style:{width:"50px",height:"50px"},src:x+"/v1/items/image/"+n.state.pokeball,alt:n.state.pokeball+" image"}),r.a.createElement("button",{style:{marginLeft:"10px"},onClick:n.changeBall},"Change ball")),r.a.createElement("h2",null,"Encountering:"),r.a.createElement("div",{className:"card",style:{width:"400px",border:"2px solid",borderColor:S[n.state.encountering.rarity],paddingTop:"10px",paddingBottom:"5px"}},r.a.createElement("img",{src:x+"/v1/pokedex/image/"+n.state.encountering.pokemonName,alt:n.props.name+" image"}),r.a.createElement("h3",null,n.state.encountering.pokemonName),r.a.createElement("h4",null,r.a.createElement("span",null,"Rarity: "),r.a.createElement("span",{style:{color:S[n.state.encountering.rarity]}},n.state.encountering.rarity)),n.state.isAlreadyCaughtBefore?r.a.createElement("h4",{style:{color:"green"}},"Already Caught"):r.a.createElement("div",null))):r.a.createElement("button",{onClick:n.encounter},"Encounter"),n.state.caughtPokemon&&r.a.createElement("div",null,r.a.createElement("h2",null,"Yes! "+n.state.caughtPokemon.pokemonName+" was caught!"),r.a.createElement(O,n.state.caughtPokemon))))},n.state={searchResults:[],names:[],one:"",images:[],pokemon:[],savedPokemon:new Map,encountering:{isEncountering:!1,pokemonName:"",rarity:""},isAlreadyCaughtBefore:!1,caught:!1,caughtPokemon:null,pokeball:"pokeball",isSelectingBall:!1,errorMessage:""},n}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r,s,l;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"/v1/pokedex",e.next=4,j(x+"/v1/pokedex");case 4:if(401!==(t=e.sent).status){e.next=9;break}this.setState({errorMessage:"Please log in."}),e.next=15;break;case 9:return this.clearErrorMsg(),e.next=12,t.json();case 12:for(a=e.sent,n=[],r=0,s=Object.keys(a);r<s.length;r++)l=s[r],a[l]&&n.push(l),this.setState({caughtMon:n});case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),console.log(e.t0);case 20:case"end":return e.stop()}}),e,this,[[0,17]])})));return function(){return e.apply(this,arguments)}}()}]),a}(r.a.Component);a(86);function M(){return r.a.createElement("div",{className:"NotFound"},r.a.createElement("h3",null,"An error has occured - page not found. "))}var D=a(25),F=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).state={email:"",password:"",passwordconf:"",username:"",firstname:"",lastname:""},n}return Object(E.a)(a,[{key:"handleChange",value:function(e){e.preventDefault();var t=e.target.value;"email"===e.target.name?this.setState({email:t}):"password"===e.target.name?this.setState({password:t}):"username"===e.target.name?this.setState({username:t}):"firstname"===e.target.name?this.setState({firstname:t}):"lastname"===e.target.name?this.setState({lastname:t}):"passwordconf"===e.target.name&&this.setState({passwordconf:t})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},this.props.errorMessage&&r.a.createElement("p",{className:"alert alert-danger"},this.props.errorMessage),this.props.user&&r.a.createElement("div",{className:"alert alert-success"},r.a.createElement("h1",null,"Logged in as ",this.props.user.userName)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Email:"),r.a.createElement("input",{className:"form-control",name:"email",value:this.props.email,onChange:function(t){e.handleChange(t)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",className:"form-control",name:"password",value:this.props.password,onChange:function(t){e.handleChange(t)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-success mr-2",onClick:function(){e.props.handleSignIn(e.state.email,e.state.password)}},"Sign In")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Confirm Password:"),r.a.createElement("input",{type:"password",className:"form-control",name:"passwordconf",value:this.props.passwordconf,onChange:function(t){e.handleChange(t)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username:"),r.a.createElement("input",{className:"form-control",name:"username",value:this.props.username,onChange:function(t){e.handleChange(t)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Firstname:"),r.a.createElement("input",{className:"form-control",name:"firstname",value:this.props.firstname,onChange:function(t){e.handleChange(t)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"lastname:"),r.a.createElement("input",{className:"form-control",name:"lastname",value:this.props.lastname,onChange:function(t){e.handleChange(t)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary mr-2",onClick:function(){e.props.handleSignUp(e.state.email,e.state.password,e.state.passwordconf,e.state.username,e.state.firstname,e.state.lastname)}},"Sign Up")),r.a.createElement("button",{className:"btn btn-danger mr-2",onClick:this.props.handleSignOut},"Sign Out"))}}]),a}(n.Component),B=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).state={user:null,errorMessage:""},n.handleSignUp=n.handleSignUp.bind(Object(D.a)(n)),n.handleSignOut=n.handleSignOut.bind(Object(D.a)(n)),n.handleSignIn=n.handleSignIn.bind(Object(D.a)(n)),n.handleError=n.handleError.bind(Object(D.a)(n)),n}return Object(E.a)(a,[{key:"handleSignUp",value:function(e,t,a,n,r,s){var l=this;this.removeError();var c={email:e,password:t,passwordConf:a,userName:n,firstName:r,lastName:s},i=JSON.stringify(c);fetch("https://api.npham24.me/v1/users",{method:"POST",body:i,headers:{"Content-Type":"application/json"}}).then(this.setAuthHeader).then(this.parseAsJSON).then((function(e){return l.setState({user:e})})).catch(this.handleError)}},{key:"setAuthHeader",value:function(e){return localStorage.setItem("authHeader",e.headers.get("Authorization")),e}},{key:"parseAsJSON",value:function(e){return e.status<300?e.json():e.text().then((function(e){throw e}))}},{key:"handleError",value:function(e){this.setState({errorMessage:e})}},{key:"removeError",value:function(){this.setState({errorMessage:null})}},{key:"handleSignIn",value:function(e,t){var a=this;this.removeError();var n={email:e,password:t},r=JSON.stringify(n);fetch("https://api.npham24.me/v1/sessions",{method:"POST",body:r,headers:{"Content-Type":"application/json"}}).then(this.setAuthHeader).then(this.parseAsJSON).then((function(e){return a.setState({user:e})})).catch(this.handleError)}},{key:"handleSignOut",value:function(){var e=this;this.removeError();var t={method:"DELETE",headers:{Authorization:localStorage.getItem("authHeader")}};fetch("https://api.npham24.me/v1/sessions/mine",t).then((function(e){return console.log(e.status),e.ok?e:e.text().then((function(e){throw e}))})).then((function(t){return localStorage.clear(),e.setState({user:null}),alert("Signed out successfully"),t})).catch(this.handleError)}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement(F,{errorMessage:this.state.errorMessage,user:this.state.user,handleSignUp:this.handleSignUp,handleSignIn:this.handleSignIn,handleSignOut:this.handleSignOut}))}}]),a}(n.Component),P=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={items:[],errorMessage:""},e}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r,s,l,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/inventory",e.next=3,j(x+"/v1/inventory");case 3:if(401!=(t=e.sent).status){e.next=7;break}return this.setState({errorMessage:"Please log in."}),e.abrupt("return");case 7:return e.next=9,t.json();case 9:a=e.sent,n=[],r=0,s=Object.keys(a.items);case 12:if(!(r<s.length)){e.next=23;break}return l=s[r],e.next=16,this.getItemInfo(l);case 16:(c=e.sent).remaining=a.items[l],c.imageName=l,c&&n.push(c);case 20:r++,e.next=12;break;case 23:this.setState({items:n});case 24:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getItemInfo",value:function(){var e=Object(g.a)(f.a.mark((function e(t){var a,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="/v1/items/"+t+"?type=item",e.next=3,j(x+a);case 3:return n=e.sent,e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.state.errorMessage&&r.a.createElement("p",{className:"alert alert-danger"},this.state.errorMessage),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.state.items.map((function(t){return r.a.createElement(T,Object.assign({selected:e.props.selected,selectSpecificItem:e.props.selectSpecificItem,key:t.imageName},t))}))))}}]),a}(r.a.Component),T=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).renderItemCard=function(){var e=n.props.selected===n.props.imageName?"1px solid black":"";return r.a.createElement("div",{className:"card",onClick:function(){n.props.selectSpecificItem(n.props.imageName)},style:{padding:"5px",width:"150px",border:e}},r.a.createElement("img",{style:{width:"50px",height:"50px"},src:x+"/v1/items/image/"+n.props.imageName,alt:n.props.itemName+" image"}),r.a.createElement("h4",null,n.props.itemName))},n}return Object(E.a)(a,[{key:"render",value:function(){return this.renderItemCard()}}]),a}(r.a.Component),L=P,R=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={pokemons:[],current:[],errorMessage:""},e.filter=function(t){var a=e.state.pokemons.filter((function(e){return e._id===t}));e.setState({current:a})},e.reset=function(){e.setState({current:e.state.pokemons})},e.requery=Object(g.a)(f.a.mark((function t(){var a,n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"/v1/team",t.next=3,j(x+"/v1/team");case 3:if(401!=(a=t.sent).status){t.next=7;break}return e.setState({errorMessage:"Please log in."}),t.abrupt("return");case 7:return t.next=9,a.json();case 9:n=t.sent,e.setState({pokemons:n});case 11:case"end":return t.stop()}}),t)}))),e}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/team",e.next=3,j(x+"/v1/team");case 3:if(401!=(t=e.sent).status){e.next=7;break}return this.setState({errorMessage:"Please log in."}),e.abrupt("return");case 7:return e.next=9,t.json();case 9:a=e.sent,this.setState({pokemons:a,current:a});case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getTeam",value:function(){var e=this;return this.state.current.map((function(t){return r.a.createElement(H,Object.assign({filter:e.filter,reset:e.reset,requery:e.requery,key:t._id},t))}))}},{key:"render",value:function(){return r.a.createElement("div",null,this.state.errorMessage&&r.a.createElement("p",{className:"alert alert-danger"},this.state.errorMessage),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.getTeam()))}}]),a}(r.a.Component),H=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).toggleSpecificRender=function(){n.setState({general:!n.state.general})},n.submitNickname=function(){var e=Object(g.a)(f.a.mark((function e(t){var a,r,s,l,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="/v1/team/"+n.props._id,r={nickName:t},s=localStorage.getItem("authHeader"),e.next=5,fetch(x+a,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Authorization:s},body:JSON.stringify(r)});case 5:return l=e.sent,e.next=8,l.json();case 8:c=e.sent,n.setState({nickName:c.nickName});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.selectSpecificItem=function(e){n.setState({selectedItem:e})},n.useItem=Object(g.a)(f.a.mark((function e(){var t,a,r,s,l;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="/v1/team/"+n.props._id,a={useItem:n.state.selectedItem},r=localStorage.getItem("authHeader"),e.next=5,fetch(x+t,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Authorization:r},body:JSON.stringify(a)});case 5:if(200!==(s=e.sent).status){e.next=14;break}return e.next=9,s.json();case 9:l=e.sent,n.state.pokemonName!=l.pokemonName&&n.props.requery(),n.setState({level:l.level,stats:l.stats,moves:l.moves,pokemonName:l.pokemonName,nickName:l.nickName}),e.next=15;break;case 14:alert("Can't use this item. Check your inventory");case 15:case"end":return e.stop()}}),e)}))),n.state={general:!0,nickName:n.props.nickName,level:n.props.level,stats:n.props.stats,moves:n.props.moves,pokemonName:n.props.pokemonName,selectedItem:""},n}return Object(E.a)(a,[{key:"render",value:function(){var e=this;return this.state.general?r.a.createElement("div",{className:"card",style:{width:"400px"},onClick:function(){e.toggleSpecificRender(),e.props.filter(e.props._id)}},r.a.createElement("img",{src:x+"/v1/pokedex/image/"+this.state.pokemonName,alt:this.props.pokemonName+" image"}),r.a.createElement("h3",null,this.state.nickName),r.a.createElement("h4",null,"level: "+this.state.level),r.a.createElement("br",null)):r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},r.a.createElement("div",{onClick:function(){e.toggleSpecificRender(),e.props.reset()}},r.a.createElement(O,Object.assign({key:this.props._id},this.props,{nickName:this.state.nickName,level:this.state.level,stats:this.state.stats,moves:this.state.moves,pokemonName:this.state.pokemonName}))),r.a.createElement("div",null,r.a.createElement(V,{placeholderText:"Submit new nickname...",onSubmit:this.submitNickname}),r.a.createElement(L,{selectSpecificItem:this.selectSpecificItem,selected:this.state.selectedItem}),r.a.createElement("button",{onClick:this.useItem},"Use Item")))}}]),a}(r.a.Component),V=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).render=function(){return r.a.createElement("div",{className:"input_form"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),n.props.onSubmit(n.state.inputValue)}},r.a.createElement("input",{className:"input_text",type:"text",placeholder:n.props.placeholderText,onChange:function(e){var t=e.target.value;n.setState({inputValue:t})}})))},n.state={inputValue:""},n}return a}(r.a.Component),_=R,W=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).state={},n}return Object(E.a)(a,[{key:"renderAbilities",value:function(){return r.a.createElement("div",null,r.a.createElement("p",null,"0: "+this.props.abilities[0]),this.props.abilities[1]?r.a.createElement("p",null,"1: "+this.props.abilities[1]):r.a.createElement("p",null),r.a.createElement("p",null,"H: "+this.props.abilities.H))}},{key:"renderTypes",value:function(){var e=[];return this.props.types.forEach((function(t){e.push(r.a.createElement("div",{key:t,style:{backgroundColor:k[t.toLowerCase()],padding:"5px",border:"1px solid #9C531F",borderRadius:"3px",color:"#FFFFFF",width:"70px"}},t))})),r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},e)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"card",style:{padding:"10px"}},r.a.createElement("img",{src:x+"/v1/pokedex/image/"+this.props.imageName,alt:this.props.name+" image"}),r.a.createElement("h3",null,this.props.name),r.a.createElement("h4",null,"Dex no. "+this.props.dexNumber),r.a.createElement("p",null,"Desc: "+this.props.desc),r.a.createElement("p",null,"Type: "),this.renderTypes(),r.a.createElement("br",null),r.a.createElement("p",null,"Abilities:"),this.renderAbilities(),r.a.createElement("br",null),r.a.createElement("p",null,"Height: "+this.props.height+"m"),r.a.createElement("p",null,"Weight: "+this.props.weight+"kg"),r.a.createElement("p",null,"Egg group: "+this.props.eggGroups),r.a.createElement("br",null),r.a.createElement(U,{baseStats:this.props.baseStats})))}}]),a}(r.a.Component),U=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(){return Object(v.a)(this,a),t.apply(this,arguments)}return Object(E.a)(a,[{key:"render",value:function(){return r.a.createElement("table",{style:{marginLeft:"auto",marginRight:"auto"}},r.a.createElement("tbody",null,r.a.createElement("tr",{style:{background:"#9DB7F5"}},r.a.createElement("th",{style:{textAlign:"center"}},"Stat")),r.a.createElement("tr",{style:{background:"#FF5959",textAlign:"center"}},r.a.createElement("th",{style:{width:"85px",paddingLeft:"0.5em",paddingRight:"0.5em"}},r.a.createElement("div",{style:{float:"left"}},r.a.createElement("span",{style:{color:"#000"}},"HP:")),r.a.createElement("div",{style:{float:"right"}},this.props.baseStats.hp)),r.a.createElement("td",{style:{width:"255px"}},r.a.createElement("div",{style:{backgroundColor:"#FF0000",border:"1px solid #A60000",width:"calc(100% * "+this.props.baseStats.hp+" /255)",height:"20px"}}))),r.a.createElement("tr",{style:{background:"#F5AC78",textAlign:"center"}},r.a.createElement("th",{style:{width:"85px",paddingLeft:"0.5em",paddingRight:"0.5em"}},r.a.createElement("div",{style:{float:"left"}},r.a.createElement("span",{style:{color:"#000"}},"ATK:")),r.a.createElement("div",{style:{float:"right"}},this.props.baseStats.atk)),r.a.createElement("td",{style:{width:"255px"}},r.a.createElement("div",{style:{backgroundColor:"#F08030",border:"1px solid #9C531F",width:"calc(100% * "+this.props.baseStats.atk+" /255)",height:"20px"}}))),r.a.createElement("tr",{style:{background:"#FAE078",textAlign:"center"}},r.a.createElement("th",{style:{width:"85px",paddingLeft:"0.5em",paddingRight:"0.5em"}},r.a.createElement("div",{style:{float:"left"}},r.a.createElement("span",{style:{color:"#000"}},"DEF:")),r.a.createElement("div",{style:{float:"right"}},this.props.baseStats.def)),r.a.createElement("td",{style:{width:"255px"}},r.a.createElement("div",{style:{backgroundColor:"#F8D030",border:"1px solid #A1871F",width:"calc(100% * "+this.props.baseStats.def+" /255)",height:"20px"}}))),r.a.createElement("tr",{style:{background:"#9DB7F5",textAlign:"center"}},r.a.createElement("th",{style:{width:"85px",paddingLeft:"0.5em",paddingRight:"0.5em"}},r.a.createElement("div",{style:{float:"left"}},r.a.createElement("span",{style:{color:"#000"}},"SPA:")),r.a.createElement("div",{style:{float:"right"}},this.props.baseStats.spa)),r.a.createElement("td",{style:{width:"255px"}},r.a.createElement("div",{style:{backgroundColor:"#6890F0",border:"1px solid #445E9C",width:"calc(100% * "+this.props.baseStats.spa+" /255)",height:"20px"}}))),r.a.createElement("tr",{style:{background:"#A7DB8D",textAlign:"center"}},r.a.createElement("th",{style:{width:"85px",paddingLeft:"0.5em",paddingRight:"0.5em"}},r.a.createElement("div",{style:{float:"left"}},r.a.createElement("span",{style:{color:"#000"}},"SPD:")),r.a.createElement("div",{style:{float:"right"}},this.props.baseStats.spd)),r.a.createElement("td",{style:{width:"255px"}},r.a.createElement("div",{style:{backgroundColor:"#78C850",border:"1px solid #4E8234",width:"calc(100% * "+this.props.baseStats.spd+" /255)",height:"20px"}}))),r.a.createElement("tr",{style:{background:"#FA92B2",textAlign:"center"}},r.a.createElement("th",{style:{width:"85px",paddingLeft:"0.5em",paddingRight:"0.5em"}},r.a.createElement("div",{style:{float:"left"}},r.a.createElement("span",{style:{color:"#000"}},"SPE:")),r.a.createElement("div",{style:{float:"right"}},this.props.baseStats.spe)),r.a.createElement("td",{style:{width:"255px"}},r.a.createElement("div",{style:{backgroundColor:"#F85888",border:"1px solid #A13959",width:"calc(100% * "+this.props.baseStats.spe+" /255)",height:"20px"}})))))}}]),a}(r.a.Component),J=W,z=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).render=function(){return r.a.createElement("div",{className:"input_form"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),n.props.onSubmit(n.state.inputValue)}},r.a.createElement("input",{className:"input_text",type:"text",placeholder:n.props.placeholderText,onChange:function(e){var t=e.target.value;n.setState({inputValue:t})}}),r.a.createElement("button",{id:"form_button",type:"submit"},r.a.createElement("i",{className:"fa fa-search fa-lg"}))),r.a.createElement("div",{id:"message"},r.a.createElement("p",null,"Search for a pokemon ")))},n.state={inputValue:""},n}return a}(r.a.Component),q=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={dex:[],current:[],errorMessage:""},e.filter=function(t){var a=e.state.dex.filter((function(e){return e.name.toLowerCase()===t.toLowerCase()}));e.setState({current:a})},e.filterAutoComplete=function(t){var a=e.state.dex.filter((function(e){return e.name.toLowerCase().startsWith(t.toLowerCase())}));e.setState({current:a})},e.filterByDexNumberAutoComplete=function(t){var a=e.state.dex.filter((function(e){return e.dexNumber.toString().startsWith(t.toString())}));e.setState({current:a})},e.reset=function(){e.setState({current:e.state.dex})},e.searchMonInDex=function(t){var a=parseInt(t);t&&""!=t?isNaN(a)?e.filterAutoComplete(t):e.filterByDexNumberAutoComplete(a):e.reset()},e.clearErrorMsg=function(){e.setState({errorMessage:""})},e}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r,s,l,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/pokedex",e.next=3,j(x+"/v1/pokedex");case 3:if(401!=(t=e.sent).status){e.next=7;break}return this.setState({errorMessage:"Please log in."}),e.abrupt("return");case 7:return e.next=9,t.json();case 9:a=e.sent,n=[],r=0,s=Object.keys(a);case 12:if(!(r<s.length)){e.next=24;break}if(l=s[r],!a[l]){e.next=21;break}return e.next=18,this.getPokemonInDex(l);case 18:(c=e.sent).imageName=l,n.push(c);case 21:r++,e.next=12;break;case 24:this.setState({dex:n,current:n});case 25:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getPokemonInDex",value:function(){var e=Object(g.a)(f.a.mark((function e(t){var a,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="/v1/pokedex/"+t,e.next=3,j(x+a);case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement("div",{style:{textAlign:"center",width:"50px",height:"50px",lineHeight:"50px",border:"1px solid green",borderRadius:"10%",marginRight:"5px"}},this.state.dex.length),r.a.createElement(z,{placeholderText:"Search for a pokemon...",onSubmit:this.searchMonInDex})),r.a.createElement("hr",null),this.state.errorMessage&&r.a.createElement("p",{className:"alert alert-danger"},this.state.errorMessage),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.state.current.map((function(t){return r.a.createElement(K,Object.assign({filter:e.filter,reset:e.reset,key:t.name},t))}))))}}]),a}(r.a.Component),K=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).toggleSpecificRender=function(){n.setState({general:!n.state.general})},n.state={general:!0},n}return Object(E.a)(a,[{key:"render",value:function(){var e=this;return this.state.general?r.a.createElement("div",{className:"card",style:{width:"400px",paddingTop:"10px",paddingBottom:"5px"},onClick:function(){e.toggleSpecificRender(),e.props.filter(e.props.name)}},r.a.createElement("img",{src:x+"/v1/pokedex/image/"+this.props.imageName,alt:this.props.name+" image"}),r.a.createElement("h3",null,this.props.name),r.a.createElement("h4",null,"Dex no. "+this.props.dexNumber)):r.a.createElement("div",{style:{margin:"auto"},onClick:function(){e.toggleSpecificRender(),e.props.reset()}},r.a.createElement(J,Object.assign({key:this.props.name},this.props)),r.a.createElement("button",{onClick:this.props.reset},"Back"))}}]),a}(r.a.Component),G=q,Y=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={balls:[],items:[],errorMessage:""},e}return Object(E.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t,a,n,r,s,l,c,i,o,u,p,m;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/v1/inventory",e.next=3,j(x+"/v1/inventory");case 3:if(401!=(t=e.sent).status){e.next=7;break}return this.setState({errorMessage:"Please log in."}),e.abrupt("return");case 7:return e.next=9,t.json();case 9:a=e.sent,n=[],r=0,s=Object.keys(a.balls);case 12:if(!(r<s.length)){e.next=23;break}return l=s[r],e.next=16,this.getItemInfo(l,"ball");case 16:(c=e.sent).remaining=a.balls[l],c.imageName=l,c&&n.push(c);case 20:r++,e.next=12;break;case 23:i=[],o=0,u=Object.keys(a.items);case 25:if(!(o<u.length)){e.next=36;break}return p=u[o],e.next=29,this.getItemInfo(p,"item");case 29:(m=e.sent).remaining=a.items[p],m.imageName=p,m&&i.push(m);case 33:o++,e.next=25;break;case 36:this.setState({balls:n,items:i});case 37:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getItemInfo",value:function(){var e=Object(g.a)(f.a.mark((function e(t,a){var n,r,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="",n="item"===a.toLowerCase()?"?type=item":"?type=ball",r="/v1/items/"+t+n,e.next=5,j(x+r);case 5:return s=e.sent,e.next=8,s.json();case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",null,this.state.errorMessage&&r.a.createElement("p",{className:"alert alert-danger"},this.state.errorMessage),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.state.balls.map((function(e){return r.a.createElement($,Object.assign({key:e.imageName},e))}))),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},this.state.items.map((function(e){return r.a.createElement($,Object.assign({key:e.imageName},e))}))))}}]),a}(r.a.Component),$=function(e){Object(b.a)(a,e);var t=Object(y.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).renderItemCard=function(){return r.a.createElement("div",{className:"card",style:{padding:"5px",width:"250px"}},r.a.createElement("img",{style:{width:"150px",height:"150px"},src:x+"/v1/items/image/"+n.props.imageName,alt:n.props.itemName+" image"}),r.a.createElement("h4",null,n.props.itemName),r.a.createElement("p",null,n.props.desc),r.a.createElement("h4",null,"Remaining: "+n.props.remaining))},n}return Object(E.a)(a,[{key:"render",value:function(){return this.renderItemCard()}}]),a}(r.a.Component),Q=Y;function X(){return r.a.createElement(h.g,null,r.a.createElement(h.d,{exact:!0,path:"/"},r.a.createElement(I,null)),r.a.createElement(h.d,{exact:!0,path:"/login"},r.a.createElement(B,null)),r.a.createElement(h.d,{path:"/pokedex"},r.a.createElement(G,null)),r.a.createElement(h.d,{path:"/team"},r.a.createElement(_,null)),r.a.createElement(h.d,{path:"/inventory"},r.a.createElement(Q,null)),r.a.createElement(h.d,null,r.a.createElement(M,null)))}var Z=function(){var e=Object(n.useState)(!1),t=Object(c.a)(e,2),a=t[0],s=t[1];return r.a.createElement("div",{className:"App container"},r.a.createElement(o.a,{fluid:!0,collapseOnSelect:!0},r.a.createElement(o.a.Header,null,r.a.createElement(o.a.Brand,null,r.a.createElement(i.Link,{to:"/"}," Gotta Catch Em All")),r.a.createElement(o.a.Toggle,null)),r.a.createElement(o.a.Collapse,null,r.a.createElement(u.a,{pullRight:!0},a?r.a.createElement(p.a,{onClick:function(){s(!1)}},"Logout"):r.a.createElement(r.a.Fragment,null,r.a.createElement(m.LinkContainer,{to:"/inventory"},r.a.createElement(p.a,null,"Inventory")),r.a.createElement(m.LinkContainer,{to:"/pokedex"},r.a.createElement(p.a,null,"Dex")),r.a.createElement(m.LinkContainer,{to:"/team"},r.a.createElement(p.a,null,"Team")),r.a.createElement(m.LinkContainer,{to:"/login"},r.a.createElement(p.a,null,"Login")))))),r.a.createElement(X,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(i.BrowserRouter,null,r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},72:function(e,t,a){e.exports=a(130)},77:function(e,t,a){},84:function(e,t,a){},86:function(e,t,a){}},[[72,1,2]]]);
//# sourceMappingURL=main.0a33b926.chunk.js.map