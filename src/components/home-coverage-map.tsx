"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brands } from "@/data/products";
import paths from "@/data/world-map-paths.json";
import { tr, type Locale } from "@/lib/i18n";

const countries = [
  {name:"United States", lon:-98.5, lat:39.8},
  {name:"United Kingdom", lon:-2.5, lat:54},
  {name:"Sweden", lon:15, lat:62},
  {name:"China", lon:104, lat:35},
];
// Purchase-channel evidence is separate from exact product regulatory authorization.
const availability: Record<string,{slug:string; name:string; source:string}> = {
  USA:{slug:"united-states",name:"United States",source:"https://investor.altria.com/press-releases/news-details/2026/on-PLUS-Expands-Nationwide-Retail-Availability/default.aspx"},
  GBR:{slug:"united-kingdom",name:"United Kingdom",source:"https://www.velo.com/gb/en/our-products/product/smooth-papaya"},
  SWE:{slug:"sweden",name:"Sweden",source:"https://www.swedishmatch.se/vara-varumarken/"},
  CHE:{slug:"switzerland",name:"Switzerland",source:"https://www.zyn.com/ch/de/shop/zyn/NP001256.00-PCE-CH.html"},
};
export function HomeCoverageMap({locale}:{locale:Locale}) {
  const [active,setActive]=useState<string|null>(null);
  const [market,setMarket]=useState<string|null>(null);
  const closeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const cancelClose=()=>{if(closeTimer.current){clearTimeout(closeTimer.current);closeTimer.current=null;}};
  const close=()=>{cancelClose();setActive(null);setMarket(null);};
  const scheduleClose=()=>{cancelClose();closeTimer.current=setTimeout(close,180);};
  const openBrand=(id:string)=>{cancelClose();setActive(id);setMarket(null);};
  const openMarket=(id:string)=>{cancelClose();setMarket(id);setActive(null);};
  useEffect(()=>()=>{if(closeTimer.current)clearTimeout(closeTimer.current);},[]);
  const selected=market ? availability[market] : undefined;
  return <div className="overview-art coverage-card" role="group" aria-label={tr(locale,"Brand countries and documented purchase regions")} onPointerLeave={e=>{if(e.pointerType==="mouse")close();}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))close();}} onKeyDown={e=>{if(e.key==="Escape")close();}}>
    <div className="overview-art-header"><span>{tr(locale,"BRAND ORIGINS & AVAILABILITY")}</span><span>{brands.length} {tr(locale,"brands")}</span></div>
    <div className="coverage-map-frame"><div className="coverage-map-canvas coverage-map-vector">
      <svg viewBox="0 0 1080 540" className="coverage-world" aria-label={tr(locale,"Shaded countries have documented purchase channels")}>
        {paths.map(path=>availability[path.id] ? <g key={path.id} className="coverage-country available" role="button" tabIndex={0} aria-expanded={market===path.id} aria-controls="coverage-market-info" aria-label={tr(locale,availability[path.id].name)+": "+tr(locale,"Documented purchase channels")} onClick={()=>openMarket(path.id)} onFocus={()=>openMarket(path.id)} onPointerEnter={e=>{if(e.pointerType==="mouse")openMarket(path.id);}} onPointerLeave={e=>{if(e.pointerType==="mouse")scheduleClose();}} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openMarket(path.id);}}}><path d={path.d}/></g> : <path key={path.id} className="coverage-country" d={path.d}/>) }
      </svg>
      {countries.map(country=>{
        const entries=brands.filter(b=>b.brandCountry===country.name);
        if(!entries.length)return null;
        const id=country.name.replaceAll(" ","-");
        return <div key={id} className={"coverage-marker coverage-marker-"+(country.lon < -30 ? "left":country.lon > 30 ? "right":"center")} style={{left:((country.lon+180)/3.6)+"%",top:((90-country.lat)/1.8)+"%"}} onPointerEnter={e=>{if(e.pointerType==="mouse")cancelClose();}} onPointerLeave={e=>{if(e.pointerType==="mouse")scheduleClose();}}>
          <button type="button" className="coverage-marker-dot" aria-label={tr(locale,country.name)+" · "+entries.map(b=>b.name).join(", ")} aria-expanded={active===id} aria-controls={"brand-map-"+id} onClick={()=>openBrand(id)} onFocus={()=>openBrand(id)} onPointerEnter={e=>{if(e.pointerType==="mouse")openBrand(id);}}/>
          <div id={"brand-map-"+id} className={"coverage-tooltip"+(active===id?" is-open":"")} role="region" aria-label={tr(locale,country.name)}><button type="button" className="coverage-tooltip-close" aria-label={tr(locale,"Close")} onClick={close}>×</button><strong>{tr(locale,country.name)} · {tr(locale,"Brand country")}</strong>{entries.map(b=><Link key={b.id} href={"/brands/"+b.slug}>{b.name} ↗</Link>)}<small>{tr(locale,"Country basis is explained in each brand profile.")}</small></div>
        </div>;
      })}
    </div></div>
    {selected && <div id="coverage-market-info" className="coverage-availability-popover" role="region" aria-label={tr(locale,selected.name)} onPointerEnter={e=>{if(e.pointerType==="mouse")cancelClose();}} onPointerLeave={e=>{if(e.pointerType==="mouse")scheduleClose();}}><button aria-label={tr(locale,"Close")} onClick={close}>×</button><strong>{tr(locale,selected.name)}</strong><span>{tr(locale,"Documented purchase channels")}</span><a href={selected.source} target="_blank" rel="noreferrer">{tr(locale,"Availability source")} ↗</a><Link href={"/markets/"+selected.slug}>{tr(locale,"Open market profile")} ↗</Link></div>}
    <div className="coverage-legend"><span><i className="legend-brand"/>{tr(locale,"Dots: brand countries")}</span><span><i className="legend-availability"/>{tr(locale,"Shading: purchase channels")}</span><small>{tr(locale,"Documented coverage only; availability is not regulatory authorization. Unshaded does not mean unavailable.")}</small></div>
    <div className="overview-art-footer coverage-footer"><span>{tr(locale,"Hover, focus or tap to explore")}</span><a href="https://www.naturalearthdata.com/downloads/110m-cultural-vectors/" target="_blank" rel="noreferrer">{tr(locale,"Map data: Natural Earth")}</a></div>
  </div>;
}
