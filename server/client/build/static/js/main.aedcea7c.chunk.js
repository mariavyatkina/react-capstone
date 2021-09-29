(this.webpackJsonpfinal=this.webpackJsonpfinal||[]).push([[0],{23:function(e,t,c){},41:function(e,t,c){},44:function(e,t,c){},50:function(e,t,c){},6:function(e,t,c){"use strict";t.__esModule=!0,t.setInStorage=t.getFromStorage=void 0,t.getFromStorage=function(e){if(!e)return null;try{var t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(c){return null}},t.setInStorage=function(e,t){e||console.error("Error: Key is missing");try{localStorage.setItem(e,JSON.stringify(t))}catch(c){console.error(c)}}},72:function(e,t,c){},73:function(e,t,c){},74:function(e,t,c){},75:function(e,t,c){},76:function(e,t,c){},77:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(32),o=c.n(a),i=(c(41),c(42),c(4)),r=c(3),l=c(0);var j=function(){return Object(l.jsx)("nav",{className:"navbar navbar-expand-md navbar-dark  bg-dark",children:Object(l.jsx)("nav",{className:"navbar-brand p-3 pb-0",children:"Movie App"})})},b=c(2),d=(c(11),c(44),c(6));function u(e){var t=Object(n.useState)(""),c=Object(b.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)(!0),j=Object(b.a)(o,2),u=j[0],h=j[1];return Object(n.useEffect)((function(){var e=Object(d.getFromStorage)("the_main_app");if(e&&e.token){var t=e.token;console.log("token = ".concat(t)),fetch("".concat("http://localhost:9999","/api/account/verify?token=")+t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success?(a(t),h(!1)):h(!1)}))}else h(!1)}),[]),u?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):s?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(r.a,{to:"/account"}),Object(l.jsx)(p,{})]}):(console.log("url: https://images.unsplash.com/photo-1563381013529-1c922c80ac8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"),Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{className:"container-fluid maindiv text-center",children:Object(l.jsxs)("div",{className:"container home-content",children:[Object(l.jsx)("h1",{className:"display-4",children:"Welcome to Movie App"}),Object(l.jsx)("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi repellat alias distinctio, sed labore fugiat amet iusto suscipit. Numquam eaque doloribus, soluta atque ipsa dicta incidunt eos qui odio quas?"}),Object(l.jsx)(i.b,{className:"btn btn-primary m-2 p-3",to:"/signin",children:"Sign In"}),Object(l.jsx)(i.b,{className:"btn btn-success m-2 p-3",to:"/signup",children:"Sign Up"})]})})}))}function h(e){return Object(l.jsxs)("div",{className:" card  bg-secondary p-4 mt-2 user-info",children:[Object(l.jsx)("div",{className:"card-header",children:Object(l.jsx)("h5",{children:"Account Info"})}),Object(l.jsxs)("div",{className:"card-body ",children:[Object(l.jsx)("label",{className:"col col-form-label m-2",children:"Username:"}),Object(l.jsx)("label",{className:"col col-form-label m-2",children:e.user.username})," ",Object(l.jsx)("br",{}),Object(l.jsx)("label",{className:"col col-form-label m-2",children:"Email:"}),Object(l.jsx)("label",{className:"col col-form-label m-2",children:e.user.email}),Object(l.jsx)("br",{}),Object(l.jsx)("label",{className:"col col-form-label m-2",children:"Deleted: "}),Object(l.jsx)("label",{className:"col col-form-label m-2",children:e.user.isDeleted?Object(l.jsx)(l.Fragment,{children:"Yes"}):Object(l.jsx)(l.Fragment,{children:"No"})}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("button",{className:"col-sm-12 btn btn-success m-2",onClick:e.logout,children:"Logout"}),Object(l.jsx)(i.b,{className:"col-sm-12 btn btn-primary m-2",to:{pathname:"/account/password-reset",state:{userId:e.user.userId}},children:"Reset Password"}),Object(l.jsx)("button",{className:"col-sm-12 btn btn-danger m-2",onClick:e.deleteUser,children:"Delete Account"})]})]})]})}c(50);var m=c(35);function p(e){var t=Object(n.useState)(""),c=Object(b.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)(""),j=Object(b.a)(o,2),m=j[0],p=j[1],O=Object(n.useState)(!1),f=Object(b.a)(O,2),x=f[0],g=f[1],v=Object(n.useState)(""),N=Object(b.a)(v,2),S=N[0],w=N[1],y=Object(n.useState)(""),k=Object(b.a)(y,2),C=k[0],T=k[1],I=Object(n.useState)(!0),E=Object(b.a)(I,2),P=(E[0],E[1]);function D(){P(!0);var e=Object(d.getFromStorage)("the_main_app");if(e&&e.token){var t=e.token;fetch("".concat("http://localhost:9999","/api/account/logout?token=").concat(t),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("Within logout function"),e.success?(T(""),P(!1)):P(!1)})).catch((function(e){console.log("Error: ".concat(e.message))}))}else P(!1),T("");console.log("Token: "+C),window.location.reload()}Object(n.useEffect)((function(){var e=Object(d.getFromStorage)("the_main_app");if(e&&e.token){var t=e.token;console.log("token = ".concat(t)),fetch("".concat("http://localhost:9999","/api/account/verify?token=")+t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success&&T(t)})),fetch("".concat("http://localhost:9999","/api/account/user/").concat(t),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success&&w(e.userId)})).catch((function(e){console.log("error: "+e)})),fetch("".concat("http://localhost:9999","/api/account/").concat(S),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success?(a(e.email),p(e.username),g(e.isDeleted),P(!1)):P(!1)})).catch((function(e){console.log("Error: ".concat(e.message))}))}else P(!1)}),[S,C]);var A={email:s,username:m,isDeleted:x,userId:S};return C&&S?Object(l.jsxs)("div",{className:"container-fluid account mt-5 ml-5",children:[Object(l.jsx)("h4",{className:"greeting",children:Object(l.jsxs)("strong",{children:[" Hi, ",Object(l.jsx)("strong",{className:"text-danger",children:A.username})]})}),Object(l.jsxs)("div",{className:"row account-content text-center ",children:[Object(l.jsx)("div",{className:"col-md-3",children:Object(l.jsx)(h,{user:A,logout:D,deleteUser:function(){P(!0),fetch("".concat("http://localhost:9999","/api/account/").concat(S),{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success?(P(!1),alert(e.message),D()):(P(!1),console.log(e.message))})).catch((function(e){P(!1),console.log("Error : ".concat(e.message))}))}})}),Object(l.jsxs)("div",{className:"col-md-6 account-browse",children:[Object(l.jsx)(i.b,{to:"account/browse-movies",children:Object(l.jsx)("div",{className:"container-fluid text-center browse-movies-banner",children:Object(l.jsx)("h1",{className:"display-3 ",children:"Browse Movies  "})})}),Object(l.jsxs)("div",{className:"buttons-account mt-5",children:[Object(l.jsx)(i.b,{className:"btn btn-danger button-account",to:{pathname:"/account/favorites",state:{userId:S,category:"Favorites"}},style:{fontSize:"25px",margin:"20px",padding:"15px 50px"},children:"Favorites"}),Object(l.jsx)(i.b,{className:"btn btn-warning button-account",to:{pathname:"/account/watchlist",state:{userId:S,category:"Watchlist"}},style:{fontSize:"25px",margin:"20px",padding:"15px 50px"},children:"Watchlist"})]})]})]})]}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(r.a,{to:"/"}),Object(l.jsx)(u,{})]})}c.n(m).a.config();c(23);function O(e){var t=Object(n.useState)(""),c=Object(b.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)(""),j=Object(b.a)(o,2),u=j[0],h=j[1],m=Object(n.useState)(""),p=Object(b.a)(m,2),O=p[0],f=p[1],x=Object(n.useState)(!0),g=Object(b.a)(x,2),v=g[0],N=g[1],S=Object(n.useState)(""),w=Object(b.a)(S,2),y=w[0],k=w[1],C=Object(n.useState)(!1),T=Object(b.a)(C,2),I=T[0],E=T[1];return Object(n.useEffect)((function(){e.justSignedUp&&alert("You have successfully signed up!");var t=Object(d.getFromStorage)("the_main_app");if(t&&t.token){var c=t.token;console.log("token = ".concat(c)),fetch("".concat("http://localhost:9999","/api/account/verify?token=")+c,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success?(k(c),N(!1)):N(!1)}))}else N(!1)}),[]),v?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):y?Object(l.jsx)(r.a,{to:"/account"}):Object(l.jsx)("div",{className:"container-fluid maindiv",children:Object(l.jsxs)("div",{className:"jumbotron login vertical-center horizontal-center col-5",children:[s?Object(l.jsx)("p",{children:s}):null,Object(l.jsxs)("div",{className:"container p-6 login-container",children:[Object(l.jsx)("h3",{children:"Sign In"}),Object(l.jsxs)("form",{className:"form mt-2",children:[Object(l.jsxs)("div",{className:"form-group",children:[Object(l.jsx)("label",{children:"Email:"}),Object(l.jsx)("input",{className:"form-control",type:"email",placeholder:"email",value:u,onChange:function(e){h(e.target.value)}}),Object(l.jsx)("br",{})]}),Object(l.jsxs)("div",{className:"form-group",children:[Object(l.jsx)("label",{children:"Password:"}),Object(l.jsx)("input",{className:"form-control",type:I?"text":"password",placeholder:"password",value:O,onChange:function(e){f(e.target.value)}}),Object(l.jsx)("span",{className:"badge mt-1 show-password-button",onClick:function(e){e.preventDefault(),E(!I)},children:I?"Hide Password":"Show Password"})]}),Object(l.jsx)("br",{}),Object(l.jsx)("button",{className:"btn btn-primary",onClick:function(){N(!0),fetch("".concat("http://localhost:9999","/api/account/signin"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,password:O})}).then((function(e){return e.json()})).then((function(e){e.success?(Object(d.setInStorage)("the_main_app",{token:e.token}),a(e.message),N(!1),h(""),f(""),k(e.token)):(a(e.message),N(!1))}))},children:"Sign In"}),Object(l.jsx)(i.b,{className:"text-light m-2 ",to:"/signup",children:"Sign Up"}),Object(l.jsx)(i.b,{className:"text-light",to:"/",children:"Back to Home"})]})]})]})})}function f(e){var t=Object(n.useState)(""),c=Object(b.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)(""),r=Object(b.a)(o,2),j=r[0],u=r[1],h=Object(n.useState)(""),m=Object(b.a)(h,2),p=m[0],f=m[1],x=Object(n.useState)(""),g=Object(b.a)(x,2),v=g[0],N=g[1],S=Object(n.useState)(!0),w=Object(b.a)(S,2),y=w[0],k=w[1],C=Object(n.useState)(""),T=Object(b.a)(C,2),I=T[0],E=T[1],P=Object(n.useState)(!1),D=Object(b.a)(P,2),A=D[0],F=D[1],_=Object(n.useState)(!1),U=Object(b.a)(_,2),M=U[0],L=U[1];return Object(n.useEffect)((function(){var e=Object(d.getFromStorage)("the_main_app");if(e&&e.token){var t=e.token;console.log("token = ".concat(t)),fetch("".concat("http://localhost:9999","/api/account/verify?token=")+t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success?(E(t),k(!1)):k(!1)}))}else k(!1)}),[]),A?Object(l.jsx)(O,{justSignedUp:A}):y?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):I?Object(l.jsx)(O,{justSignedUp:!0}):Object(l.jsx)("div",{className:"container-fluid maindiv",children:Object(l.jsxs)("div",{className:"jumbotron login col-5 vertical-center ",children:[s?Object(l.jsx)("p",{children:s}):null,Object(l.jsxs)("div",{className:"container login-container p-6",children:[Object(l.jsx)("h3",{children:"Sign Up"}),Object(l.jsxs)("form",{className:"form mt-2",children:[Object(l.jsxs)("div",{className:"form-group col-md-6",children:[Object(l.jsx)("label",{children:"Username: "}),Object(l.jsx)("input",{className:"form-control",type:"text",placeholder:"username",value:j,onChange:function(e){u(e.target.value)}})]}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"form-group col-md-6",children:[Object(l.jsx)("label",{children:"Email: "}),Object(l.jsx)("input",{className:"form-control",type:"email",placeholder:"email",value:p,onChange:function(e){f(e.target.value)}})]}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"form-group col-md-6",children:[Object(l.jsx)("label",{children:"Password: "}),Object(l.jsx)("input",{className:"form-control",type:M?"text":"password",placeholder:"password",value:v,onChange:function(e){N(e.target.value)}}),Object(l.jsx)("span",{className:"badge mt-1 mb-1 show-password-button",onClick:function(e){e.preventDefault(),L(!M)},children:M?"Hide Password":"Show Password"}),Object(l.jsx)("br",{})]}),Object(l.jsx)("button",{className:"btn btn-primary",onClick:function(){k(!0),fetch("".concat("http://localhost:9999","/api/account/signup"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:j,email:p,password:v})}).then((function(e){return e.json()})).then((function(e){e.success?(a(e.message),k(!1),f(""),N(""),u(""),F(!0)):(a(e.message),k(!1))}))},children:"Sign Up"}),Object(l.jsx)(i.b,{className:"text-light m-2 ",to:"/signin",children:"Sign In"}),Object(l.jsx)(i.b,{className:"text-light",to:"/",children:"Back to Home"})]})]})]})})}var x=c(36);function g(){return Object(l.jsx)("nav",{children:Object(l.jsx)("div",{children:Object(l.jsx)(i.b,{className:"btn btn-success m-2",to:"/account",children:"My Account"})})})}function v(e){return Object(l.jsxs)("div",{className:"col-3 selected-movie",children:[Object(l.jsx)("div",{className:"row",children:Object(l.jsx)("button",{className:"btn btn-dark remove-button",onClick:function(){console.log("imdbID: "+e.movie.imdbID),fetch("".concat("http://localhost:9999","/api/movies/").concat(e.userId,"/set-").concat(e.category,"/").concat(e.movie.imdbID),{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(t){if(t.success){var c=e.movies.filter((function(t){return t.imdbID!==e.movie.imdbID}));e.setMovies(c)}}))},children:"Remove"})}),Object(l.jsx)("div",{className:"row",children:Object(l.jsx)("img",{src:e.movie.poster_url,alt:"selected-movie"})})]})}var N=c(13),S=c.n(N);c(72);function w(e){var t=Object(r.g)(),c=t.state.userId,s=t.state.category,a=Object(n.useState)(!0),o=Object(b.a)(a,2),i=o[0],j=o[1],d=Object(n.useState)([]),u=Object(b.a)(d,2),h=u[0],m=u[1];return Object(n.useEffect)((function(){fetch("".concat("http://localhost:9999","/api/account/").concat(s.toLowerCase(),"/").concat(c),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success&&(console.log("SUCCESS"),0===h.length&&e.imdbs.forEach((function(e){S.a.get("".concat("https://www.omdbapi.com","/?i=").concat(e,"&apikey=").concat("82b52605")).then((function(t){var c={imdbID:e,title:t.data.Title,poster_url:t.data.Poster};h.includes(c)||m((function(e){return[].concat(Object(x.a)(e),[c])}))})).catch((function(e){return console.log("Error: ".concat(e.message))}))}))),j(!1)})).catch((function(e){console.log("Error: ".concat(e.message))})),console.log("userId: "+c)}),[i,h]),i?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):(console.log(h),Object(l.jsxs)("div",{className:"container-fluid movie-app",children:[Object(l.jsx)(g,{}),Object(l.jsxs)("h3",{children:["My ",s]}),Object(l.jsx)("div",{className:"row",children:h.map((function(e,t){return Object(l.jsx)(v,{movie:e,category:s,userId:c,movies:h,setMovies:m})}))})]}))}c(73);function y(){var e=Object(r.g)(),t=Object(n.useState)(!0),c=Object(b.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)(!1),i=Object(b.a)(o,2),j=i[0],u=i[1],h=Object(n.useState)(!1),m=Object(b.a)(h,2),p=m[0],O=m[1],f=e.state.movieDetails;function x(t){t.preventDefault(),a(!0),fetch("".concat("http://localhost:9999","/api/movies/").concat(e.state.userId,"/add-movie/").concat(e.state.imdbID),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(t){console.log(t.message),t.success?fetch("".concat("http://localhost:9999","/api/movies/").concat(e.state.userId,"/set-favorites/").concat(e.state.imdbID),{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success&&u(!j),a(!1)})).catch((function(e){console.log("Error: ".concat(e.message))})):console.log(t.message)})).catch((function(e){console.log("Error: ".concat(e.message))}))}function v(t){t.preventDefault(),fetch("".concat("http://localhost:9999","/api/movies/").concat(e.state.userId,"/add-movie/").concat(e.state.imdbID),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(t){console.log(t.message),t.success?fetch("".concat("http://localhost:9999","/api/movies/").concat(e.state.userId,"/set-watchlist/").concat(e.state.imdbID),{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){O(!p)})).catch((function(e){console.log("Error: ".concat(e.message))})):console.log(t.message)})).catch((function(e){console.log("Error: ".concat(e.message))}))}return Object(n.useEffect)((function(){var t=Object(d.getFromStorage)("the_main_app");if(t&&t.token){t.token;fetch("".concat("http://localhost:9999","/api/movies/").concat(e.state.userId,"/").concat(e.state.imdbID),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e.message),e.success?(a(!1),u(e.isFavorited),O(e.isOnWatchlist)):a(!1)})).catch((function(e){console.log("Error: ".concat(e.message))}))}}),[p,j]),s?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(g,{}),Object(l.jsxs)("div",{className:"card movie-details movie-card",children:[Object(l.jsx)("img",{className:"card-img-top",src:f.Poster,alt:"Card image cap"}),Object(l.jsxs)("div",{className:"card-body details bg-dark",children:[Object(l.jsxs)("h5",{className:"card-title text-warning",children:[f.Title," - ",f.Year," ",Object(l.jsx)("span",{className:"badge bg-danger m-2 float-right",children:f.Rated})]}),Object(l.jsxs)("p",{className:"card-text",children:["Plot :  ",f.Plot,Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),"Released :  ",f.Released,Object(l.jsx)("br",{}),"Runtime :  ",f.Runtime,Object(l.jsx)("br",{}),"Genre :  ",f.Genre,Object(l.jsx)("br",{}),"Director :  ",f.Director,Object(l.jsx)("br",{}),"Writer :  ",f.Writer,Object(l.jsx)("br",{}),"Actors :  ",f.Actors,Object(l.jsx)("br",{}),"Language :  ",f.Language,Object(l.jsx)("br",{}),"Country :  ",f.Country,Object(l.jsx)("br",{}),"Awards :  ",f.Awards,Object(l.jsx)("br",{})]}),Object(l.jsxs)("div",{className:"form-group row m-2",children:[p?Object(l.jsx)("button",{className:"btn btn-secondary m-2",onClick:v,children:" Watchlisted"}):Object(l.jsx)("button",{className:"btn btn-warning m-2",onClick:v,children:" Add to Watchlist"}),j?Object(l.jsx)("button",{className:"btn btn-success m-2",onClick:x,children:" Favorited"}):Object(l.jsx)("button",{className:"btn btn-danger m-2",onClick:x,children:" Add to Favorites"})]})]})]})]})}function k(){return Object(l.jsx)("footer",{id:"footer",children:Object(l.jsx)("div",{className:"container bg-dark text-white text-center",children:Object(l.jsx)("span",{className:"text-muted",children:"Made by Maria Vyatkina"})})})}c(74);function C(){var e=Object(r.g)().state.userId;console.log("location.state = "+e);var t=Object(n.useState)(!1),c=Object(b.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)(""),i=Object(b.a)(o,2),j=i[0],d=i[1],u=Object(n.useState)(""),h=Object(b.a)(u,2),m=h[0],p=h[1],O=Object(n.useState)(""),f=Object(b.a)(O,2),x=f[0],g=(f[1],Object(n.useState)(!1)),v=Object(b.a)(g,2),N=v[0],S=v[1],w=Object(n.useState)(!1),y=Object(b.a)(w,2),k=y[0],C=y[1];return s?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):N?Object(l.jsx)(r.a,{to:"/account"}):Object(l.jsxs)("div",{className:"card password-reset bg-secondary mt-3 mb-3",children:[Object(l.jsx)("div",{className:"card-header",children:"Password Reset"}),Object(l.jsxs)("div",{className:"card-body",children:[x?Object(l.jsx)("h1",{className:"text-white",children:x}):null,Object(l.jsxs)("form",{children:[Object(l.jsxs)("div",{className:"form-group row",children:[Object(l.jsx)("label",{className:"col-form-label",children:"Enter Password"}),Object(l.jsx)("div",{className:"col",children:Object(l.jsx)("input",{type:k?"text":"password",className:"form-control",id:"inputPassword",placeholder:"Password",onChange:function(e){d(e.target.value)}})})]}),Object(l.jsxs)("div",{className:"form-group row",children:[Object(l.jsx)("label",{className:"col-form-label",children:"Enter New Password"}),Object(l.jsx)("div",{className:"col",children:Object(l.jsx)("input",{type:k?"text":"password",className:"form-control",id:"inputNewPassword",placeholder:"New Password",onChange:function(e){p(e.target.value)}})})]}),Object(l.jsx)("div",{className:"form-group row",children:Object(l.jsx)("span",{className:"badge mt-1 show-password-button",onClick:function(e){e.preventDefault(),C(!k)},children:k?"Hide Password":"Show Password"})}),Object(l.jsx)("div",{className:"form-group row ",children:Object(l.jsx)("button",{className:"btn btn-primary mt-3",onClick:function(){a(!0),fetch("".concat("http://localhost:9999","/api/account/").concat(e),{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({password:j,new_password:m})}).then((function(e){return e.json()})).then((function(e){e.success?(console.log(e.message),alert(e.message),a(!1),S(!0)):(a(!1),console.log(e.message))})).catch((function(e){console.log("Error ".concat(e.message))}))},children:"Reset Password"})})]})]})]})}c(75);function T(e){var t=Object(n.useState)({}),c=Object(b.a)(t,2),s=c[0],a=c[1],o=Object(n.useState)(!0),r=Object(b.a)(o,2),j=r[0],u=r[1],h=Object(n.useState)(""),m=Object(b.a)(h,2),p=m[0],O=m[1],f=Object(n.useState)(!1),x=Object(b.a)(f,2),g=x[0],v=x[1],N=Object(n.useState)(!1),w=Object(b.a)(N,2),y=w[0],k=w[1];function C(t){t.preventDefault(),fetch("".concat("http://localhost:9999","/api/movies/").concat(p,"/add-movie/").concat(e.movie.imdbID),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(t){console.log(t.message),t.success?fetch("".concat("http://localhost:9999","/api/movies/").concat(p,"/set-favorites/").concat(e.movie.imdbID),{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){v(!g)})).catch((function(e){console.log("Error: ".concat(e.message))})):console.log(t.message)})).catch((function(e){console.log("Error: ".concat(e.message))}))}function T(t){t.preventDefault(),fetch("".concat("http://localhost:9999","/api/movies/").concat(p,"/add-movie/").concat(e.movie.imdbID),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(t){console.log(t.message),t.success?fetch("".concat("http://localhost:9999","/api/movies/").concat(p,"/set-watchlist/").concat(e.movie.imdbID),{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){k(!y)})).catch((function(e){console.log("Error: ".concat(e.message))})):console.log(t.message)})).catch((function(e){console.log("Error: ".concat(e.message))}))}return Object(n.useEffect)((function(){var t=Object(d.getFromStorage)("the_main_app");if(t&&t.token){var c=t.token;S.a.get("".concat("https://www.omdbapi.com","/?i=").concat(e.movie.imdbID,"&apikey=").concat("82b52605")).then((function(e){"True"===e.data.Response?(u(!1),a(e.data)):u(!1)})).catch((function(e){u(!1),console.log("Error: ".concat(e.message))})),fetch("".concat("http://localhost:9999","/api/account/user/").concat(c),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.success&&O(e.userId)})).catch((function(e){console.log("error: "+e)})),console.log("fetched userId: "+p),fetch("".concat("http://localhost:9999","/api/movies/").concat(p,"/").concat(e.movie.imdbID),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e.message),e.success&&(console.log("SUCCESS"),v(e.isFavorited),k(e.isOnWatchlist))})).catch((function(e){console.log("Error: ".concat(e.message))}))}}),[p,y,g]),j?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):Object(l.jsxs)("div",{className:" col-5 card movie-card",children:[Object(l.jsx)("img",{className:"card-img-top",src:e.movie.Poster,alt:"Card image cap"}),Object(l.jsxs)("div",{className:"card-body bg-dark",children:[Object(l.jsx)("h5",{className:"card-title",children:e.movie.Title}),Object(l.jsxs)("p",{className:"card-text",children:["Release Year: ",e.movie.Year,Object(l.jsx)("br",{}),"Type: ",e.movie.Type]}),Object(l.jsx)("div",{className:"row m-1 mb-2 pt-2 pb-2",children:Object(l.jsx)(i.b,{className:"btn btn-primary",to:{pathname:"/account/browse-movies/movie-details",state:{movieDetails:s,imdbID:e.movie.imdbID,userId:p}},children:"Details"})}),Object(l.jsx)("div",{className:"row m-1",children:y?Object(l.jsx)("button",{className:"btn btn-secondary",onClick:T,children:" Watchlisted"}):Object(l.jsx)("button",{className:"btn btn-warning",onClick:T,children:" Add to Watchlist"})}),Object(l.jsx)("div",{className:"row m-1",children:g?Object(l.jsx)("button",{className:"btn btn-success",onClick:C,children:" Favorited"}):Object(l.jsx)("button",{className:"btn btn-danger",onClick:C,children:" Add to Favorites"})})]})]})}function I(e){var t=e.movies.filter((function(e){return"N/A"!==e.Poster})).map((function(e){return Object(l.jsx)(T,{movie:e})}));return Object(l.jsxs)("div",{children:[Object(l.jsx)("h5",{className:"text-light text-center p-3",children:e.isSearched?"Search Results: ":"Search results will be displayed here"}),Object(l.jsx)("div",{className:"row movie-list",children:t})]})}c(76);function E(){var e=Object(n.useState)(""),t=Object(b.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)([]),o=Object(b.a)(a,2),i=o[0],r=o[1],j=Object(n.useState)(!1),d=Object(b.a)(j,2),u=d[0],h=d[1],m=Object(n.useState)(!1),p=Object(b.a)(m,2),O=p[0],f=p[1];return u?Object(l.jsx)("div",{children:Object(l.jsx)("p",{children:"Loading..."})}):Object(l.jsxs)("div",{className:"browse-movies",children:[Object(l.jsx)(g,{}),Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"input-group m-2",children:[Object(l.jsx)("input",{type:"search",className:"form-control rounded",placeholder:"Search","aria-label":"Search","aria-describedby":"search-addon",onChange:function(e){s(e.target.value),console.log("Current MT: "+c)}}),Object(l.jsx)("button",{type:"button",className:"btn btn-outline-primary",onClick:function(){h(!0),f(!0),S.a.get("".concat("https://www.omdbapi.com","/?s=").concat(c,"&apikey=").concat("82b52605")).then((function(e){console.log(e.data),"True"===e.data.Response?(h(!1),r(e.data.Search)):h(!1)})).catch((function(e){h(!1),console.log("Error: ".concat(e.message))}))},children:"Search Movies"})]}),Object(l.jsx)(I,{movies:i,isSearched:O})]})]})}var P=function(){return Object(l.jsx)(i.a,{children:Object(l.jsxs)("div",{className:"App container-fluid bg-dark",children:[Object(l.jsx)(j,{}),Object(l.jsxs)(r.d,{children:[Object(l.jsx)(r.b,{path:"/signin",children:Object(l.jsx)(O,{})}),Object(l.jsx)(r.b,{path:"/signup",children:Object(l.jsx)(f,{})}),Object(l.jsx)(r.b,{path:"/account/password-reset",children:Object(l.jsx)(C,{})}),Object(l.jsx)(r.b,{path:"/account/browse-movies/movie-details",children:Object(l.jsx)(y,{})}),Object(l.jsx)(r.b,{path:"/account/browse-movies",children:Object(l.jsx)(E,{})}),Object(l.jsx)(r.b,{path:"/account/favorites",children:Object(l.jsx)(w,{})}),Object(l.jsx)(r.b,{path:"/account/watchlist",children:Object(l.jsx)(w,{})}),Object(l.jsx)(r.b,{path:"/account",children:Object(l.jsx)(p,{})}),Object(l.jsx)(r.b,{path:"/",children:Object(l.jsx)(u,{})})]}),Object(l.jsx)(k,{})]})})};o.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(P,{})}),document.getElementById("root"))}},[[77,1,2]]]);
//# sourceMappingURL=main.aedcea7c.chunk.js.map