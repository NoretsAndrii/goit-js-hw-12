import{i as l,a as u,S as g}from"./assets/vendor-03da8548.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function c(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function f(t){if(t.ep)return;t.ep=!0;const s=c(t);fetch(t.href,s)}})();const m=document.querySelector(".search-form"),i=document.querySelector(".gallary"),a=document.querySelector(".load-more-btn");m.addEventListener("submit",y);a.addEventListener("click",b);let n,o="",p;function y(r){if(r.preventDefault(),o=r.currentTarget.elements.input.value.trim(),!o){r.currentTarget.elements.input.value="",l.warning({close:!1,position:"topRight",progressBar:!1,message:"Enter a search word. Please try again!"});return}n=1,i.innerHTML="",i.insertAdjacentHTML("afterend",'<span class="loader"></span>'),u.get("https://pixabay.com/api/",{params:{key:"42677735-fe61580d2fc9bff74664cab68",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:n}}).then(e=>{if(e.data.hits.length===0){i.nextElementSibling.remove(),l.error({close:!1,message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",progressBar:!1});return}i.nextElementSibling.remove(),i.insertAdjacentHTML("beforeend",h(e)),p=new g(".gallary-item-link",{captionsData:"alt",captionDelay:250}),i.children.length<e.data.totalHits?a.classList.remove("visually-hidden"):(a.classList.add("visually-hidden"),l.info({close:!1,message:"We're sorry, but you've reached the end of search results.",position:"topRight",progressBar:!1}))}),m.reset()}function b(r){a.classList.add("visually-hidden"),n+=1,i.insertAdjacentHTML("afterend",'<span class="loader"></span>'),u.get("https://pixabay.com/api/",{params:{key:"42677735-fe61580d2fc9bff74664cab68",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:n}}).then(e=>{i.nextElementSibling.remove(),i.insertAdjacentHTML("beforeend",h(e));let c=i.firstChild.getBoundingClientRect().height;window.scrollBy(0,2*c),p.refresh(),i.children.length<e.data.totalHits?a.classList.remove("visually-hidden"):(a.classList.add("visually-hidden"),l.info({close:!1,message:"We're sorry, but you've reached the end of search results.",position:"topRight",progressBar:!1}))})}function h({data:{hits:r}}){return r.map(e=>`<li class="gallary-item">
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
