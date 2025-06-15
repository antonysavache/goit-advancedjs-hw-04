import{a as v,S as E,i as s}from"./assets/vendor-DWXSRYDZ.js";/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const q="24514938-64e9aafcd379537f737cf2780",P="https://pixabay.com/api/";async function h(e,r=1,n=15){try{return(await v.get(P,{params:{key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:n}})).data}catch(i){throw new Error(`Error fetching images: ${i.message}`)}}function R(e){return`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <div class="photo-card">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${e.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${e.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${e.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${e.downloads}
            </p>
          </div>
        </div>
      </a>
    </li>
  `}function y(e){return e.map(R).join("")}function $(e){e.innerHTML=""}function I(e,r){e.insertAdjacentHTML("beforeend",r)}function b(e){e.style.display="block"}function d(e){e.style.display="none"}function M(e){e.style.display="block"}function w(e){e.style.display="none"}function H(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}const g=document.querySelector(".form"),B=document.querySelector(".search-input"),m=document.querySelector(".gallery"),a=document.querySelector(".loader"),l=document.querySelector(".load-more-btn");let L="",c=1,u=0;const f=15;let S=new E(".gallery a",{captionsData:"alt",captionDelay:250});g&&g.addEventListener("submit",O);l&&l.addEventListener("click",C);async function O(e){e.preventDefault();const r=B.value.trim();if(r===""){s.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}L=r,c=1,$(m),w(l),b(a);try{const n=await h(r,c,f);if(d(a),n.hits.length===0){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}u=n.totalHits;const i=y(n.hits);m.innerHTML=i,S.refresh(),c*f<u&&M(l),s.success({title:"Success",message:`Hooray! We found ${u} images!`,position:"topRight"})}catch(n){d(a),console.error("Error fetching images:",n),s.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}}async function C(){c+=1,b(a);try{const e=await h(L,c,f);d(a);const r=y(e.hits);I(m,r),S.refresh(),H(),c*f>=u&&(w(l),s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){d(a),console.error("Error loading more images:",e),s.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}}
//# sourceMappingURL=index.js.map
