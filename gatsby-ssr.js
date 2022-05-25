/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

//import React from "react"

// const FACEBOOK_PIXEL_ID = "2763906707255404"
// const CAMPAIGN_ID = "zrIs1d9VdqgPtbqOqz2elgOEffk"

// const HeadComponents = [
//   <script
//     key="facebook-pixel"
//     dangerouslySetInnerHTML={{
//       __html: `
// !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
// n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
// n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
// t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
// document,'script','https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', ${FACEBOOK_PIXEL_ID});
// fbq('track', 'PageView');
// `,
//     }}
//   />,
// ]

// const PostBodyComponents = [
//   <script
//     key="viral_loop"
//     dangerouslySetInnerHTML={{
//       __html: `
//       !function(a,b,c,d,t){var e,f=a.getElementsByTagName("head")[0];if(!a.getElementById(c)){if(e=a.createElement(b),e.id=c,e.setAttribute("data-vrlps-ucid",d),e.setAttribute("data-vrlps-version","2"), e.setAttribute("data-vrlps-template", t),e.src="https://app.viral-loops.com/popup_assets/js/vl_load_v2.min.js",window.ub){jQuery=null,$=null;var g=a.createElement(b);g.src="https://code.jquery.com/jquery-2.2.4.min.js",f.appendChild(g)}f.appendChild(e);var h=a.createElement("link");h.rel="stylesheet",h.type="text/css",h.href="https://app.viral-loops.com/static/vl-loader.css",f.appendChild(h);var i=a.createElement("div");i.id="vl-overlay",i.style.display="none";var j=a.createElement("div");j.id="vl-loader",i.appendChild(j),a.addEventListener("DOMContentLoaded",function(b){a.body.appendChild(i);for(var c=a.getElementsByClassName("vrlps-trigger"),d=0;d<c.length;d++)c[d].removeAttribute("href"),c[d].onclick=function(){a.getElementById("vl-overlay").style.display="block"};var e=a.querySelectorAll("[data-vl-widget='popupTrigger']");[].forEach.call(e,function(b){var c=a.createElement("div");c.className="vl-embedded-cta-loader",b.appendChild(c)})})}}(document,"script","vrlps-js","${CAMPAIGN_ID}","waitlist");
// `,
//     }}
//   />,
//   <script
//     key="sumo"
//     dangerouslySetInnerHTML={{
//       __html: `
//       !function(s,u,m,o,j,v){j=u.createElement(m);v=u.getElementsByTagName(m)[0];j.async=1;j.src=o;j.dataset.sumoSiteId='43e11934ac270a411853a861d920a9a4a2b7018f370e70d4cf9704824c6f9283';v.parentNode.insertBefore(j,v)}(window,document,'script','https://load.sumo.com/');`,
//     }}
//   />,
// ]

// export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
//   setHeadComponents(HeadComponents)
//   setPostBodyComponents(PostBodyComponents)
// }
