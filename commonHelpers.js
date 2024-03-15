import{a as d}from"./assets/vendor-34f890c2.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function u(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=u(t);fetch(t.href,s)}})();const f=document.querySelector(".search-form"),i=document.querySelector(".gallary"),a=document.querySelector(".load-more-btn");f.addEventListener("submit",p);a.addEventListener("click",h);let o,n="";function p(l){l.preventDefault(),o=1,n=l.currentTarget.elements.input.value,i.innerHTML="",i.insertAdjacentHTML("afterend",'<span class="loader"></span>'),d.get("https://pixabay.com/api/",{params:{key:"42677735-fe61580d2fc9bff74664cab68",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:130,page:o}}).then(e=>{i.nextElementSibling.remove(),i.insertAdjacentHTML("beforeend",m(e)),i.children.length<e.data.totalHits?(console.log(111),a.classList.remove("visually-hidden")):a.classList.add("visually-hidden")}),f.reset()}function h(l){o+=1,i.insertAdjacentHTML("afterend",'<span class="loader"></span>'),d.get("https://pixabay.com/api/",{params:{key:"42677735-fe61580d2fc9bff74664cab68",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:130,page:o}}).then(e=>{i.nextElementSibling.remove(),i.insertAdjacentHTML("beforeend",m(e)),i.children.length<e.data.totalHits?(console.log(222),a.classList.remove("visually-hidden")):a.classList.add("visually-hidden")})}function m({data:{hits:l}}){return l.map(e=>`<li class="gallary-item">
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
       </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
