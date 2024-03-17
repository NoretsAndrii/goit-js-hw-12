import{a as y,i as o,S as L}from"./assets/vendor-2cfd16ce.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function f(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();async function m(l,e){return await y.get("https://pixabay.com/api/",{params:{key:"42677735-fe61580d2fc9bff74664cab68",q:l,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})}function h({data:{hits:l}}){return l.map(e=>`<li class="gallary-item">
      <a class="gallary-item-link" href="${e.largeImageURL}"><img
        class="gallary-image"
        src="${e.webformatURL}"
        alt="${e.tags}"
      /></a>
         <ul class="info-list">
          <li class="info-list-item">
            <h2 class="list-item-title">Likes</h2>
            <p class="list-item-info">${e.likes}</p>
          </li>
          <li class="info-box-list-item">
            <h2 class="list-item-title">Views</h2>
            <p class="list-item-info">${e.views}</p>
          </li>
          <li class="info-box-list-item">
            <h2 class="list-item-title">Comments</h2>
            <p class="list-item-info">${e.comments}</p>
          </li>
          <li class="info-box-list-item">
            <h2 class="list-item-title">Downloads</h2>
            <p class="list-item-info">${e.downloads}</p>
          </li>
        </ul>
       </li>`).join("")}const p=document.querySelector(".search-form"),i=document.querySelector(".gallary"),r=document.querySelector(".load-more-btn"),u=document.querySelector(".scroll-top");p.addEventListener("submit",v);r.addEventListener("click",b);window.addEventListener("scroll",function(){if(pageYOffset<75){u.classList.add("visually-hidden");return}u.classList.remove("visually-hidden")});let c,n="",g;function v(l){if(l.preventDefault(),n=l.currentTarget.elements.input.value.trim(),!n){l.currentTarget.elements.input.value="",o.warning({close:!1,position:"topRight",progressBar:!1,message:"Enter a search word. Please try again!"});return}c=1,i.innerHTML="",i.insertAdjacentHTML("afterend",'<span class="loader"></span>'),r.classList.add("visually-hidden"),m(n,c).then(e=>{if(e.data.hits.length===0){i.nextElementSibling.remove(),o.error({close:!1,message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",progressBar:!1});return}i.nextElementSibling.remove(),i.insertAdjacentHTML("beforeend",h(e)),g=new L(".gallary-item-link",{captionsData:"alt",captionDelay:250}),i.children.length<e.data.totalHits?r.classList.remove("visually-hidden"):(r.classList.add("visually-hidden"),o.info({close:!1,message:"We're sorry, but you've reached the end of search results.",position:"topRight",progressBar:!1}))}).catch(e=>console.log(e)),p.reset()}function b(l){r.classList.add("visually-hidden"),c+=1,i.insertAdjacentHTML("afterend",'<span class="loader"></span>'),m(n,c).then(e=>{i.nextElementSibling.remove(),i.insertAdjacentHTML("beforeend",h(e));let a=i.firstChild.getBoundingClientRect().height;window.scrollBy(0,2*a),g.refresh(),i.children.length<e.data.totalHits?r.classList.remove("visually-hidden"):(r.classList.add("visually-hidden"),o.info({close:!1,message:"We're sorry, but you've reached the end of search results.",position:"topRight",progressBar:!1}))}).catch(e=>console.log(e))}
//# sourceMappingURL=commonHelpers.js.map
