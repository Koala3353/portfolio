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
 * screen (html[data-boot="show"]), keep it up long enough for the logo to build itself, then
 * hide it once the page has loaded (or after 4 seconds, or on a click, whichever comes first).
 */
export const BOOT_SCRIPT = `(function(){
var root=document.documentElement;
var replay=/[?&]intro(=|&|$)/.test(location.search);
try{if(sessionStorage.getItem('kb-boot')&&!replay)return;sessionStorage.setItem('kb-boot','1');}catch(e){if(!replay)return;}
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
root.dataset.boot='show';
var start=Date.now(),min=reduce?250:1750,gone=false;
function leave(){if(gone)return;gone=true;root.dataset.boot='done';}
function ready(){setTimeout(leave,Math.max(0,min-(Date.now()-start)));}
if(document.readyState==='complete')ready();else window.addEventListener('load',ready);
setTimeout(leave,4000);
document.addEventListener('click',leave,{once:true});
})();`;
