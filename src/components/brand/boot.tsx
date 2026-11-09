import { MARK_SVG } from "./markSvg";

/**
 * The first-visit loading screen. Server-rendered and hidden by default, so React and
 * no-JS visitors never notice it; BOOT_SCRIPT (in <head>) shows it via html[data-boot].
 */
export default function Boot() {
  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-stage">
        <div className="boot-mark" dangerouslySetInnerHTML={{ __html: MARK_SVG }} />
        <p className="boot-name">Keene Brigado</p>
        <p className="boot-line">
          Tidying up the desk<span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
        <div className="boot-bar">
          <i />
        </div>
      </div>
    </div>
  );
}

/**
 * Runs in <head> before anything paints. First visit in a browser tab (or any page with ?intro): show the loading
 * screen (html[data-boot="show"]) for one second while the logo builds itself, then hide it
 * (sooner on a click). The page keeps loading underneath, so it never holds a visitor past 1s.
 */
export const BOOT_SCRIPT = `(function(){
var root=document.documentElement;
var replay=/[?&]intro(=|&|$)/.test(location.search);
try{if(sessionStorage.getItem('kb-boot')&&!replay)return;sessionStorage.setItem('kb-boot','1');}catch(e){if(!replay)return;}
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
root.dataset.boot='show';
var gone=false;
function leave(){if(gone)return;gone=true;root.dataset.boot='done';}
setTimeout(leave,reduce?250:1000);
document.addEventListener('click',leave,{once:true});
})();`;
