$(document).ready(function(){function t(t){gsap.set(".load_grid",{display:"grid"}),gsap.fromTo(".load_grid-item",{opacity:1},{opacity:0,duration:.5,stagger:{amount:.5,from:"random"},onComplete(){window.location.href=t}})}let o;o=function t(o){switch(o){case"Space Age Glam":return"#FD8A46";case"Atomic Allure":return"#F3EDD8";case"Quantum Glamour":return"#A24EB5";case"Stellar Elegance":return"#008AA1";default:return"#070707"}}($("body").attr("data-collection")),$(".load_grid-item").css("background-color",o),gsap.fromTo(".load_grid-item",{opacity:0},{opacity:1,duration:.5,stagger:{amount:.7,from:"random"},onComplete(){gsap.set(".load_grid",{display:"none"})}}),$("a").on("click",function(o){if($(this).prop("hostname")===window.location.host&&-1===$(this).attr("href").indexOf("#")&&"_blank"!==$(this).attr("target")){o.preventDefault();t($(this).attr("href"))}}),$(document).on("click",".next_collection",function(o){o.preventDefault();let e=$(this).attr("href");gsap.fromTo(".load_grid-item",{opacity:1},{opacity:0,duration:.5,stagger:{amount:.5,from:"random"},onComplete(){t(e)}})}),window.onpageshow=function(t){(t.persisted||"back_forward"===performance.getEntriesByType("navigation")[0].type)&&window.location.reload()},$(window).on("load",function(){"back_forward"===performance.getEntriesByType("navigation")[0].type&&window.location.reload()});let e=["Space Age Glam","Atomic Allure","Quantum Glamour","Stellar Elegance"],a=document.querySelector("#next_collection");a&&a.addEventListener("click",function(){let o=document.querySelector("body").getAttribute("data-collection"),a=e[(e.indexOf(o)+1)%e.length];if(a){let r=`/collections/${a.replace(/\s+/g,"-").toLowerCase()}`;gsap.fromTo(".load_grid-item",{opacity:1},{opacity:0,duration:.5,stagger:{amount:.5,from:"random"},onComplete(){t(r)}})}})});
