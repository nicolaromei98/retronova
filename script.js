(function(v){typeof define=="function"&&define.amd?define(v):v()})(function(){"use strict";console.log("Script loaded");const v=(s=".intro-grid__img")=>(console.log("Preloading images"),new Promise(o=>{imagesLoaded(document.querySelectorAll(s),{background:!0},o)})),y=(s,o,l)=>{const e=s.getContext("webgl2");if(!e)return console.error("WebGL 2 not available"),null;const t=(h,T)=>{const m=e.createShader(T);return e.shaderSource(m,h),e.compileShader(m),e.getShaderParameter(m,e.COMPILE_STATUS)?m:(console.error(`Error compiling shader: ${e.getShaderInfoLog(m)}`),e.deleteShader(m),null)},n=t(o,e.VERTEX_SHADER),c=t(l,e.FRAGMENT_SHADER),i=e.createProgram();if(e.attachShader(i,n),e.attachShader(i,c),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))return console.error(`Error linking program: ${e.getProgramInfoLog(i)}`),e.deleteProgram(i),null;e.useProgram(i);const d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d);const a=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW);const u=e.getAttribLocation(i,"aVertexPosition");return e.enableVertexAttribArray(u),e.vertexAttribPointer(u,2,e.FLOAT,!1,0,0),{gl:e,program:i}},S=s=>{const o=document.getElementById("webgl-canvas");o.width=s.width,o.height=s.height;const l=`#version 300 es
    precision mediump float;
    in vec3 aVertexPosition;
    in vec2 aTextureCoord;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform mat4 uTextureMatrix;
    out vec2 vTextureCoord;
    out vec3 vVertexPosition;
    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = (uTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    }`,e=`#version 300 es
    precision mediump float;
    in vec3 vVertexPosition;
    in vec2 vTextureCoord;
    uniform sampler2D uTexture;
    uniform float uOffsetX;
    uniform float uTime;
    uniform float uPhase;
    float random (in float x) {
        return fract(sin(x)*1e4);
    }
    out vec4 fragColor;
    void main() {
        vec2 uv = vTextureCoord;
        float time = floor(uTime * 0.5) * 2.;
        float size = 0.03 * 0.2 * random(time + 0.001);
        float floorY = floor(uv.y/size);
        float floorX = floor(uv.x/size);
        float phase = uPhase * 0.01;
        float phaseTime = phase + uTime;
        float chromab = 0.27 * 0.75;
        float offset = 0.;
        float glitchMod = max(0., sign(random(sin(floorY + offset + phase)) - 0.5 - (1. - 0.26*2.)/2.));
        float offX = ( (random(floorY + offset * glitchMod + phase)) * uOffsetX - uOffsetX/2. )/5.;
        uv.x = mix(uv.x, uv.x + offX * 2., glitchMod);
        float waveFreq = 30.0;
        float waveAmp = 0.005 * 0.20;
        float rogue = smoothstep(0., 2., sin((uv.y + uPhase) * waveFreq * (1. - 0.03) * 2. + uTime * 0.05) - 0.5) * 0.2 * 0.20;
        uv.x += sin(uv.y * waveFreq + uTime) * waveAmp + rogue;
        uv.y += sin(uv.x * waveFreq + uTime) * waveAmp;
        float waveX = sin(uv.y * waveFreq + uTime) * waveAmp + rogue * chromab * 0.2;
        vec4 color = texture(uTexture, uv);
        color.r = texture(uTexture, vec2(uv.x + (glitchMod * -offX * chromab - waveX), uv.y)).r;
        color.b = texture(uTexture, vec2(uv.x + (glitchMod * offX * chromab + waveX), uv.y)).b;
        fragColor = color;
    }`,{gl:t,program:n}=y(o,l,e);if(!t)return;const c=t.createTexture();t.bindTexture(t.TEXTURE_2D,c),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,s),t.generateMipmap(t.TEXTURE_2D);const i=d=>{t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLES,0,6),requestAnimationFrame(i)};requestAnimationFrame(i)};document.addEventListener("DOMContentLoaded",function(){console.log("DOM fully loaded and parsed");const s=document.querySelector(".intro-grid-wrap");console.log("introGridWrap:",s);const o=s.querySelector(".intro-grid--images");console.log("introGrid:",o);const l=[...o?o.querySelectorAll(".intro-grid__img"):[]];console.log("gridImages:",l);const e=[...document.querySelectorAll(".intro-grid--labels > .intro-grid__label")];console.log("gridLabels:",e);const t={main:document.querySelector(".intro-title__main"),sub:null};console.log("gridTitle:",t);const n={el:document.querySelector(".slider-title"),main:document.querySelector(".slider-title__main"),desc:document.querySelector(".slider-title__desc")};console.log("sliderTitle:",n);const c=document.querySelector(".controls");console.log("controls:",c);const i=c?c.querySelector("a.close"):null;console.log("closeCtrl:",i);let d=-1,a=!1,u="grid";const h=()=>{console.log("Resetting state"),gsap.set([n.main,n.desc],{clearProps:"all"}),gsap.set(n.el,{opacity:0}),gsap.set(n.main,{y:"100%",display:"none"}),gsap.set(n.desc,{display:"none",opacity:0,marginBottom:"-100%"})},T=r=>{if(console.log("showSlider called"),a||u==="slider")return;a=!0,u="slider";const f=1,g="power4.inOut";d=l.indexOf(r),console.log("current index:",d),gsap.timeline({defaults:{duration:f,ease:g},onComplete:()=>{a=!1,console.log("Animation complete, isAnimating:",a)}}).addLabel("start",0).to([t.main].filter(p=>p),{yPercent:-100,onStart:()=>console.log("Animating gridTitle")},"start").to(e.filter(p=>p),{yPercent:-100,onStart:()=>console.log("Animating gridLabels")},"start").to(r,{filter:"brightness(100%) hue-rotate(0deg)"},"start").add(()=>{console.log("Flip animation starting");const p=Flip.getState(l);if(console.log("flipstate:",p),window.innerWidth<=991){o.classList.add("intro-grid--slider");const x=r.getBoundingClientRect(),A=window.innerHeight/2-(x.top+x.height/2);gsap.set(o,{y:A})}else o.classList.add("intro-grid--scatter"),r.classList.add("intro-grid__img--current"),gsap.set(o,{x:window.innerWidth/2-(r.getBoundingClientRect().left+r.offsetWidth/2),y:window.innerHeight/2-(r.getBoundingClientRect().top+r.offsetHeight/2)});S(r),Flip.from(p,{duration:f,ease:g,absolute:!0,stagger:{each:.02,from:d},simple:!0,prune:!0,onComplete:()=>console.log("Flip animation complete")})},"start").set(n.el,{opacity:1,onComplete:()=>console.log("sliderTitle set to visible")},"start").to(n.main,{y:"-100%",display:"block",onComplete:()=>console.log("sliderTitle main animation complete")},"start").to(n.desc,{display:"block",opacity:1,marginBottom:"0",onComplete:()=>console.log("sliderTitle desc animation complete")},"start").add(()=>{c.classList.add("controls--open"),console.log("controls opened")},"start").fromTo(i,{scale:0},{opacity:1,scale:1,onComplete:()=>console.log("closeCtrl animation complete")},"start")},m=()=>{if(console.log("hideSlider called"),a||u==="grid")return;a=!0,u="grid";const r=1,f="power4.inOut";gsap.timeline({defaults:{duration:r,ease:f},onComplete:()=>{a=!1,console.log("Animation complete, isAnimating:",a),h()}}).to(i,{opacity:0,scale:0,onStart:()=>console.log("Hiding closeCtrl")},"start").add(()=>{c.classList.remove("controls--open"),console.log("controls closed")},"start").to([n.main,n.desc].filter(g=>g),{y:"100%",opacity:0,display:"none",onComplete:()=>gsap.set(n.el,{opacity:0})},"start").add(()=>{const g=Flip.getState(l,{props:"filter"});console.log("flipstate:",g),window.innerWidth<=991?(o.classList.remove("intro-grid--slider"),gsap.set(o,{y:0})):(o.classList.remove("intro-grid--scatter"),l[d].classList.remove("intro-grid__img--current"),gsap.set(l[d],{filter:"brightness(100%) hue-rotate(0deg)"}),gsap.set(o,{x:0,y:0})),Flip.from(g,{duration:r,ease:f,absolute:!0,stagger:{each:.02,from:d},simple:!0,prune:!0,onComplete:()=>console.log("Flip animation complete")})},"start").to([e,[t.main]].flat().filter(g=>g),{yPercent:0,onStart:()=>console.log("Showing gridLabels and gridTitle")},"start")};l.forEach(r=>{console.log("Adding event listeners to images"),r.addEventListener("click",()=>T(r)),r.addEventListener("mouseenter",()=>{u!=="slider"&&gsap.fromTo(r,{filter:"brightness(100%) hue-rotate(0deg)"},{duration:1,ease:"power4",filter:"brightness(200%) hue-rotate(130deg)"})}),r.addEventListener("mouseleave",()=>{u!=="slider"&&gsap.to(r,{duration:1,ease:"power4",filter:"brightness(100%) hue-rotate(0deg)"})}),i&&i.addEventListener("click",f=>{f.preventDefault(),m()})}),v(".intro-grid__img").then(()=>{console.log("Images preloaded"),document.body.classList.remove("loading")})})});
