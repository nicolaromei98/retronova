console.log("Script loaded");const preloadImages=(e=".intro-grid__img")=>(console.log("Preloading images"),new Promise(t=>{imagesLoaded(document.querySelectorAll(e),{background:!0},t)}));document.addEventListener("DOMContentLoaded",function(){console.log("DOM fully loaded and parsed");let e=document.querySelector(".intro-grid-wrap");console.log("introGridWrap:",e);let t=e.querySelector(".intro-grid--images");console.log("introGrid:",t);let o=[...t?t.querySelectorAll(".intro-grid__img"):[]];console.log("gridImages:",o);let l=[...document.querySelectorAll(".intro-grid--labels > .intro-grid__label")];console.log("gridLabels:",l);let i={main:document.querySelector(".intro-title__main"),sub:null};console.log("gridTitle:",i);let r={el:document.querySelector(".slider-title"),main:document.querySelector(".slider-title__main"),desc:document.querySelector(".slider-title__desc")};console.log("sliderTitle:",r);let a=document.querySelector(".controls");console.log("controls:",a);let n=a?a.querySelector("a.close"):null;console.log("closeCtrl:",n);let s=-1,d=!1,g="grid",c=()=>{console.log("Resetting state"),gsap.set([r.main,r.desc],{clearProps:"all"}),gsap.set(r.el,{opacity:0}),gsap.set(r.main,{y:"100%",display:"none"}),gsap.set(r.desc,{display:"none",opacity:0,marginBottom:"-100%"}),o.forEach(e=>{let t=e.querySelector(".overlay_card");t&&gsap.set(t,{display:"none",opacity:0})})},m=()=>{gsap.set(n,{display:"grid"}),gsap.to(n,{opacity:1,scale:1,duration:.5,onComplete:()=>console.log("closeCtrl animation complete")})},p=()=>{gsap.to(n,{opacity:0,scale:0,duration:.5,onComplete(){gsap.set(n,{display:"none"}),console.log("closeCtrl hidden")}})},$=e=>{if(console.log("showSlider called"),d||"slider"===g)return;d=!0,g="slider";let c="power4.inOut";s=o.indexOf(e),console.log("current index:",s),gsap.timeline({defaults:{duration:1,ease:c},onComplete(){d=!1,console.log("Animation complete, isAnimating:",d);let t=e.querySelector(".overlay_card");t&&gsap.to(t,{display:"block",opacity:1,duration:.5})}}).addLabel("start",0).to([i.main].filter(e=>e),{yPercent:-100,onStart:()=>console.log("Animating gridTitle")},"start").to(l.filter(e=>e),{yPercent:-100,onStart:()=>console.log("Animating gridLabels")},"start").to(e,{filter:"brightness(100%) hue-rotate(0deg)"},"start").add(()=>{console.log("Flip animation starting");let l=Flip.getState(o);if(console.log("flipstate:",l),window.innerWidth<=991){t.classList.add("intro-grid--slider");let i=e.getBoundingClientRect(),r=window.innerHeight/2-(i.top+i.height/2);gsap.set(t,{y:r})}else t.classList.add("intro-grid--scatter"),e.classList.add("intro-grid__img--current"),gsap.set(t,{x:window.innerWidth/2-(e.getBoundingClientRect().left+e.offsetWidth/2),y:window.innerHeight/2-(e.getBoundingClientRect().top+e.offsetHeight/2)});Flip.from(l,{duration:1,ease:c,absolute:!0,stagger:{each:.02,from:s},simple:!0,prune:!0,onComplete:()=>console.log("Flip animation complete")})},"start").set(r.el,{opacity:1,onComplete:()=>console.log("sliderTitle set to visible")},"start").to(r.main,{y:"-100%",display:"block",onComplete:()=>console.log("sliderTitle main animation complete")},"start").to(r.desc,{display:"block",opacity:1,marginBottom:"0",onComplete:()=>console.log("sliderTitle desc animation complete")},"start").add(()=>{a.classList.add("controls--open"),console.log("controls opened")},"start").fromTo(n,{scale:0},{opacity:1,scale:1,onStart:m,onComplete:()=>console.log("closeCtrl animation complete")},"start")},y=()=>{if(console.log("hideSlider called"),d||"grid"===g)return;d=!0,g="grid";let e="power4.inOut";gsap.timeline({defaults:{duration:1,ease:e},onComplete(){d=!1,console.log("Animation complete, isAnimating:",d),c()}}).to(n,{opacity:0,scale:0,onStart:p,onComplete:()=>console.log("closeCtrl hidden")},"start").add(()=>{a.classList.remove("controls--open"),console.log("controls closed")},"start").to([r.main,r.desc].filter(e=>e),{y:"100%",opacity:0,display:"none",onComplete:()=>gsap.set(r.el,{opacity:0})},"start").add(()=>{let l=Flip.getState(o,{props:"filter"});console.log("flipstate:",l),window.innerWidth<=991?(t.classList.remove("intro-grid--slider"),gsap.set(t,{y:0})):(t.classList.remove("intro-grid--scatter"),o[s].classList.remove("intro-grid__img--current"),gsap.set(o[s],{filter:"brightness(100%) hue-rotate(0deg)"}),gsap.set(t,{x:0,y:0})),Flip.from(l,{duration:1,ease:e,absolute:!0,stagger:{each:.02,from:s},simple:!0,prune:!0,onComplete(){console.log("Flip animation complete");let e=o[s].querySelector(".overlay_card");e&&gsap.to(e,{display:"none",opacity:0,duration:.5})}})},"start").to([l,[i.main]].flat().filter(e=>e),{yPercent:0,onStart:()=>console.log("Showing gridLabels and gridTitle")},"start")};o.forEach(e=>{console.log("Adding event listeners to images"),e.addEventListener("click",()=>$(e)),e.addEventListener("mouseenter",()=>{"slider"!==g&&gsap.fromTo(e,{filter:"brightness(100%) hue-rotate(0deg)"},{duration:1,ease:"power4",filter:"brightness(200%) hue-rotate(130deg)"})}),e.addEventListener("mouseleave",()=>{"slider"!==g&&gsap.to(e,{duration:1,ease:"power4",filter:"brightness(100%) hue-rotate(0deg)"})}),n&&n.addEventListener("click",e=>{e.preventDefault(),y()})}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(console.log("Esc key pressed"),y())}),preloadImages(".intro-grid__img").then(()=>{console.log("Images preloaded"),document.body.classList.remove("loading")})});
