document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector("body"),t=e.getAttribute("data-collection"),o={"Space Age Glam":"#FD8A46","Atomic Allure":"#F3EDD8","Quantum Glamour":"#A24EB5","Stellar Elegance":"#008AA1"};if(t in o){let n=o[t],i=document.querySelectorAll(".intro-grid__img");i.forEach(e=>{e.style.transition="box-shadow 0.3s ease-in-out",e.addEventListener("mouseover",function(){this.style.boxShadow=`0px 0px 6px ${n}`}),e.addEventListener("mouseout",function(){this.style.boxShadow="none"})})}else console.warn(`Collezione "${t}" non trovata nei colori definiti.`)});
