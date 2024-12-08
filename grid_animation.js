console.log("Script loaded");const preloadImages=(e=".intro-grid__img")=>(console.log("Preloading images"),new Promise(t=>{imagesLoaded(document.querySelectorAll(e),{background:!0},t)}));document.addEventListener("DOMContentLoaded",function(){console.log("DOM fully loaded and parsed");let e=document.querySelector(".intro-grid-wrap");console.log("introGridWrap:",e);let t=e.querySelector(".intro-grid--images");console.log("introGrid:",t);let i=[...t?t.querySelectorAll(".intro-grid__img"):[]];console.log("gridImages:",i);let o=[...document.querySelectorAll(".intro-grid--labels > .intro-grid__label")];console.log("gridLabels:",o);let l={main:document.querySelector(".intro-title__main"),sub:null};console.log("gridTitle:",l);let r={el:document.querySelector(".slider-title"),main:document.querySelector(".slider-title__main"),desc:document.querySelector(".slider-title__desc")};console.log("sliderTitle:",r);let a=document.querySelector(".controls");console.log("controls:",a);let s=a?a.querySelector("a.close"):null;console.log("closeCtrl:",s);let n=()=>window.innerWidth<=991,d=-1,g=!1,c="grid",p=()=>{console.log("Resetting state"),gsap.set([r.main,r.desc],{clearProps:"all"}),gsap.set(r.el,{opacity:0}),gsap.set(r.main,{y:"100%",display:"none"}),gsap.set(r.desc,{display:"none",opacity:0,marginBottom:"-100%"}),i.forEach(e=>{let t=e.querySelector(".overlay_card");t&&gsap.set(t,{display:"none",opacity:0})})},m=()=>{gsap.set(s,{display:"grid",opacity:0,scale:0}),gsap.to(s,{opacity:1,scale:1,duration:.5,onComplete:()=>console.log("closeCtrl animation complete")})},y=e=>{if(console.log("showSlider called"),g||"slider"===c)return;g=!0,c="slider";let s="power4.inOut";d=i.indexOf(e),console.log("current index:",d),gsap.timeline({defaults:{duration:1,ease:s},onComplete(){if(g=!1,console.log("Animation complete, isAnimating:",g),!n()){let t=e.querySelector(".overlay_card");t&&gsap.to(t,{display:"block",opacity:1,duration:.5})}}}).addLabel("start",0).to([l.main].filter(e=>e),{yPercent:-100,onStart:()=>console.log("Animating gridTitle")},"start").to(o.filter(e=>e),{yPercent:-100,onStart:()=>console.log("Animating gridLabels")},"start").to(e,{filter:"brightness(100%) hue-rotate(0deg)"},"start").add(()=>{console.log("Flip animation starting");let o=Flip.getState(i);if(console.log("flipstate:",o),n()){t.classList.add("intro-grid--slider");let l=e.getBoundingClientRect(),r=window.innerHeight/2-(l.top+l.height/2);gsap.set(t,{y:r})}else t.classList.add("intro-grid--scatter"),e.classList.add("intro-grid__img--current"),gsap.set(t,{x:window.innerWidth/2-(e.getBoundingClientRect().left+e.offsetWidth/2),y:window.innerHeight/2-(e.getBoundingClientRect().top+e.offsetHeight/2)});Flip.from(o,{duration:1,ease:s,absolute:!0,stagger:{each:.02,from:d},simple:!0,prune:!0,onComplete:()=>console.log("Flip animation complete")})},"start").set(r.el,{opacity:1,onComplete:()=>console.log("sliderTitle set to visible")},"start").to(r.main,{y:"-100%",display:"block",onComplete:()=>console.log("sliderTitle main animation complete")},"start").to(r.desc,{display:"block",opacity:1,marginBottom:"0",onComplete:()=>console.log("sliderTitle desc animation complete")},"start").add(()=>{a.classList.add("controls--open"),console.log("controls opened")},"start").add(()=>{m()},"start")},u=()=>{if(console.log("hideSlider called"),g||"grid"===c)return;g=!0,c="grid";let e="power4.inOut";gsap.timeline({defaults:{duration:1,ease:e},onComplete(){g=!1,console.log("Animation complete, isAnimating:",g),p()}}).to(s,{opacity:0,scale:0,onComplete(){gsap.set(s,{display:"none"}),console.log("closeCtrl hidden")}},"start").add(()=>{a.classList.remove("controls--open"),console.log("controls closed")},"start").to([r.main,r.desc].filter(e=>e),{y:"100%",opacity:0,display:"none",onComplete:()=>gsap.set(r.el,{opacity:0})},"start").add(()=>{let o=Flip.getState(i,{props:"filter"});console.log("flipstate:",o),n()?(t.classList.remove("intro-grid--slider"),gsap.set(t,{y:0})):(t.classList.remove("intro-grid--scatter"),i[d].classList.remove("intro-grid__img--current"),gsap.set(i[d],{filter:"brightness(100%) hue-rotate(0deg)"}),gsap.set(t,{x:0,y:0})),Flip.from(o,{duration:1,ease:e,absolute:!0,stagger:{each:.02,from:d},simple:!0,prune:!0,onComplete(){if(console.log("Flip animation complete"),!n()){let e=i[d].querySelector(".overlay_card");e&&gsap.to(e,{display:"none",opacity:0,duration:.5})}}})},"start").to([o,[l.main]].flat().filter(e=>e),{yPercent:0,onStart:()=>console.log("Showing gridLabels and gridTitle")},"start")};i.forEach(e=>{console.log("Adding event listeners to images"),e.addEventListener("click",()=>{if(n()){let t=e.querySelector(".overlay_card");"slider"!==c||g?y(e):"block"===t.style.display?gsap.to(t,{display:"none",opacity:0,duration:.5}):gsap.to(t,{display:"block",opacity:1,duration:.5})}else y(e)}),e.addEventListener("mouseenter",()=>{"slider"!==c&&gsap.fromTo(e,{filter:"brightness(100%) hue-rotate(0deg)"},{duration:1,ease:"power4",filter:"brightness(200%) hue-rotate(130deg)"})}),e.addEventListener("mouseleave",()=>{"slider"!==c&&gsap.to(e,{duration:1,ease:"power4",filter:"brightness(100%) hue-rotate(0deg)"})}),s&&s.addEventListener("click",e=>{e.preventDefault(),u()})}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(console.log("Esc key pressed"),u())}),preloadImages(".intro-grid__img").then(()=>{console.log("Images preloaded"),document.body.classList.remove("loading")})});
