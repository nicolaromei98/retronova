$(document).ready(function(){function t(t){gsap.to(".load_grid-item",{opacity:0,duration:.001,stagger:{amount:.5,from:"random"},onComplete:function(){window.location.href=t}})}(function t(){let e=$("body").attr("data-collection"),o="#070707";switch(e){case"Space Age Glam":o="#FD8A46";break;case"Atomic Allure":o="#F3EDD8";break;case"Quantum Glamour":o="#A24EB5";break;case"Stellar Elegance":o="#008AA1"}$(".load_grid-item").css("background-color",o)})(),gsap.set(".load_grid",{display:"grid"}),gsap.fromTo(".load_grid-item",{opacity:0},{opacity:1,duration:.001,stagger:{amount:.5,from:"random"}}),$("a").on("click",function(e){if($(this).prop("hostname")===window.location.host&&-1===$(this).attr("href").indexOf("#")&&"_blank"!==$(this).attr("target")){e.preventDefault();t($(this).attr("href"))}}),$(document).on("click",".next_collection",function(e){e.preventDefault();t($(this).attr("href"))}),window.onpageshow=function(t){(t.persisted||"back_forward"===performance.getEntriesByType("navigation")[0].type)&&window.location.reload()},$(window).on("load",function(){"back_forward"===performance.getEntriesByType("navigation")[0].type&&window.location.reload()})}),document.addEventListener("DOMContentLoaded",function(){let t=["Space Age Glam","Atomic Allure","Quantum Glamour","Stellar Elegance"],e=document.querySelector("#next_collection");e&&e.addEventListener("click",function(e){var o;e.preventDefault();let a,n,r=(o=(a=document.querySelector(".data-collection"))?a.getAttribute("data-collection"):null,-1!==(n=t.indexOf(o))?t[(n+1)%t.length]:null);r&&transitionOut(`/collections/${r.replace(/\s+/g,"-").toLowerCase()}`)})});
