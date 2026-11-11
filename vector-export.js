/* AnalogImageProcessor v37: native editable vector primitives; no raster image embedded. */
(function(){
'use strict';
const supported=new Set([0,4,7,10]);
const clamp=(v,a=0,b=255)=>Math.min(b,Math.max(a,v));
const lum=(r,g,b)=>.2126*r+.7152*g+.0722*b;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const num=n=>Number(n.toFixed(3));
const hex=(r,g,b)=>'#'+[r,g,b].map(v=>Math.round(clamp(v)).toString(16).padStart(2,'0')).join('');
const colors=[['#f92383','#1653b5'],['#df3434','#2446ad'],['#178e63','#ff8c34'],['#171717','#d52c3c'],['#169c9a','#e97469'],['#8643a6','#f2cb32'],['#236bd4','#e9c52e'],['#d7488c','#3b9448'],['#192d68','#d5a33b'],['#78364d','#70cbb3'],['#7045aa','#a4d943'],['#15b9d2','#c43a92'],['#216349','#df7194'],['#8a5b3a','#77b8e6'],['#171717','#edcb2f'],['#4234a4','#e38a2b']];
function makeDocument(){
 if(!original||!supported.has(current)||videoMode)throw Error('VECTOR export is available for selected photo effects only.');
 const w0=original.width,h0=original.height,scale=Math.min(1,1100/Math.max(w0,h0));
 const w=Math.max(1,Math.round(w0*scale)),h=Math.max(1,Math.round(h0*scale));
 const src=document.createElement('canvas');src.width=w;src.height=h;
 drawPhotoSource(src.getContext('2d',{willReadFrequently:true}),original,0,0,w,h);
 const data=src.getContext('2d',{willReadFrequently:true}).getImageData(0,0,w,h).data;
 const sample=(x,y)=>{const i=(Math.min(h-1,Math.max(0,Math.floor(y)))*w+Math.min(w-1,Math.max(0,Math.floor(x))))*4;const brightness=Number(generalValues.brightness||0),contrast=Number(generalValues.contrast||100)/100,sat=Number(generalValues.saturation||100)/100;let r=data[i],g=data[i+1],b=data[i+2],l=lum(r,g,b);r=clamp((l+(r-l)*sat-128)*contrast+128+brightness);g=clamp((l+(g-l)*sat-128)*contrast+128+brightness);b=clamp((l+(b-l)*sat-128)*contrast+128+brightness);return [r,g,b,lum(r,g,b)]};
 const ratio=w/Math.max(1,canvas.width),v={...values},shapes=[];
 const rect=(x,y,width,height,fill,group='dots')=>{if(width>0&&height>0)shapes.push({type:'rect',x:num(x),y:num(y),w:num(width),h:num(height),fill,group})};
 const circle=(x,y,r,fill,group='dots')=>{if(r>.05)shapes.push({type:'circle',x:num(x),y:num(y),r:num(r),fill,group})};
 const text=(x,y,char,size,fill,weight)=>shapes.push({type:'text',x:num(x),y:num(y),char,size:num(size),fill,weight});
 let background='#fff';
 if(current===0){
  background='#fff';let step=Math.max(1,Number(v.scale)*ratio),threshold=Number(v.threshold),bayer=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
  // Native per-cell vector squares. Floyd-Steinberg is evaluated on the sampled grid.
  let nx=Math.ceil(w/step),ny=Math.ceil(h/step),arr=new Float32Array(nx*ny);
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++)arr[j*nx+i]=sample(i*step,j*step)[3];
  if(v.pattern==='FLOYD STEINBERG')for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){let p=j*nx+i,old=arr[p],nv=old>=threshold?255:0,er=old-nv;arr[p]=nv;if(i+1<nx)arr[p+1]+=er*7/16;if(j+1<ny){if(i)arr[p+nx-1]+=er*3/16;arr[p+nx]+=er*5/16;if(i+1<nx)arr[p+nx+1]+=er/16}}
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){let z=v.pattern==='FLOYD STEINBERG'?arr[j*nx+i]:(arr[j*nx+i]+(bayer[j%4][i%4]-7.5)*9>=threshold?255:0);if(z<128)rect(i*step,j*step,Math.min(step,w-i*step),Math.min(step,h-j*step),'#000','black-cells')}
 }
 if(current===4){
  const palette=(config[4].palette||[]).indexOf(v.palette),pair=colors[Math.max(0,palette)]||colors[0],paper=Math.round(v.paper*2.55);background=hex(paper,paper,paper);
  const step=Math.max(1,Number(v.dotSize)*ratio),off=Number(v.misregistration)*ratio;
  for(let y=step/2;y<h;y+=step)for(let x=step/2;x<w;x+=step){const s=sample(x,y),l=clamp((s[3]-128)*v.contrast/100+128),a=Math.max(0,1-l/255)*v.inkDensity/100,r=step*.56*Math.sqrt(a);circle(x,y,r,pair[0],'ink-1');circle(x+off,y-off,r*.8,pair[1],'ink-2')}
 }
 if(current===10){
  const step=Math.max(1,Number(v.dotSize)*ratio*100/Number(v.frequency)),paper=Math.round(v.paperColor*2.55);background=hex(paper,paper,paper);
  for(let y=step/2;y<h;y+=step)for(let x=step/2;x<w;x+=step){const s=sample(x,y),l=clamp((s[3]-128)*v.contrast/100+128),r=step*.68*Math.sqrt(1-l/255)*(1+v.inkSpread/250);let color=v.colorMode==='ORIGINAL'?hex(...s):v.colorMode==='CMYK'?hex(s[0]*.5,s[1]*.5,s[2]*.5):'#181818';
   if(v.pattern==='DOT')circle(x,y,r,color,'halftone');else {const a=Number(v.angle)*Math.PI/180,cos=Math.cos(a),sin=Math.sin(a);const paths=[];const boxes=v.pattern==='SQUARE'?[[-r,-r,2*r,2*r]]:[[-step/2,-r,step,2*r],...(v.pattern==='CROSS'?[[-r,-step/2,2*r,step]]:[])];for(const [bx,by,bw,bh] of boxes){let points=[[bx,by],[bx+bw,by],[bx+bw,by+bh],[bx,by+bh]].map(([px,py])=>[num(x+px*cos-py*sin),num(y+px*sin+py*cos)]);shapes.push({type:'polygon',points,fill:color,group:'halftone'})}}
  }
 }
 if(current===7){
  background=v.background==='WHITE'?'#fff':'#050505';const sets={'ALPHABET':'MWNHOAKXVTILJYri;,. ','KANJI':'MWNHOAKXVTILJYri;,. ','LETTERS':'MWNHOAKXVTILJYri;,. ','NUMBERS':'9876543210 ','SYMBOLS':'█▓▒░◆●+·  ','BLOCKS':'█▓▒░ '},chars=(window.AIP_CHARSETS&&window.AIP_CHARSETS[v.characterSet])||sets[v.characterSet]||sets.ALPHABET;
  const sz=Number(v.characterSize)*ratio,stepX=Math.max(3*ratio,sz*.64*v.spacing/100*100/v.density),stepY=Math.max(4*ratio,sz*1.1*100/v.density);
  for(let y=0;y<h;y+=stepY)for(let x=0;x<w;x+=stepX){const s=sample(x,y),l=clamp((s[3]-128)*v.contrast/100+128+Number(v.brightness)),p=v.invert?Math.pow(l/255,100/v.gamma):1-Math.pow(l/255,100/v.gamma),k=Math.min(chars.length-1,Math.floor(p*chars.length)),ch=chars[k];if(!ch||ch===' '||ch==='　')continue;let color=v.color==='ORIGINAL COLOR'?hex(...s):({'WHITE':'#f8f8f8','NEON GREEN':'#4dff71','AMBER':'#ffbd55'})[v.color]||'#fff';text(x,y,ch,sz,color,v.fontWeight)}
 }
 return {w,h,background,shapes,effect:current,charset:v.characterSet};
}
function svg(doc){let parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="${doc.w}" height="${doc.h}" viewBox="0 0 ${doc.w} ${doc.h}">`,`<title>AnalogImageProcessor editable vector</title>`,`<rect width="100%" height="100%" fill="${doc.background}"/>`];let group='';for(const s of doc.shapes){const g=s.group||'characters';if(g!==group){if(group)parts.push('</g>');parts.push(`<g id="${esc(g)}">`);group=g}if(s.type==='rect')parts.push(`<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="${s.fill}"/>`);else if(s.type==='circle')parts.push(`<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="${s.fill}"/>`);else if(s.type==='polygon')parts.push(`<polygon points="${s.points.map(p=>p.join(',')).join(' ')}" fill="${s.fill}"/>`);else if(s.type==='text')parts.push(`<text x="${s.x}" y="${s.y}" font-family="monospace" font-weight="${s.weight}" font-size="${s.size}" dominant-baseline="text-before-edge" fill="${s.fill}">${esc(s.char)}</text>`)}if(group)parts.push('</g>');parts.push('</svg>');return parts.join('\n')}
function pdf(doc){
 // Native PDF path/text operators. Standard Courier text is editable for Latin ASCII.
 // Non-Latin legacy symbol sets are approximated with editable ASCII in PDF; SVG keeps the original glyphs.
 if(window.AIP_CHARSETS && window.AIP_CHARSETS[doc.charset] && doc.shapes.some(s=>s.type==='text' && !/^[\x20-\x7e]$/.test(s.char)))throw Error('Japanese characters require SVG export for editable text. PDF supports Latin characters only; use SVG in Illustrator. / 漢字の編集可能な書き出しはSVGを使用してください。');
 const pdfChar=c=>({'█':'M','▓':'W','▒':'N','░':'i','◆':'O','●':'O','·':'.','　':' '})[c]||(/^[\x20-\x7e]$/.test(c)?c:'?');
 const enc=new TextEncoder(),content=[],h=doc.h;
 const rgb=c=>{let x=c.match(/[a-f\d]{2}/gi);return x?x.map(v=>(parseInt(v,16)/255).toFixed(4)).join(' '):'0 0 0'};
 const fill=c=>content.push(`${rgb(c)} rg`);
 fill(doc.background);content.push(`0 0 ${doc.w} ${h} re f`);
 for(const s of doc.shapes){fill(s.fill);if(s.type==='rect')content.push(`${s.x} ${num(h-s.y-s.h)} ${s.w} ${s.h} re f`);else if(s.type==='circle'){let r=s.r,k=.5522847498*r,x=s.x,y=h-s.y;content.push(`${num(x+r)} ${num(y)} m ${num(x+r)} ${num(y+k)} ${num(x+k)} ${num(y+r)} ${num(x)} ${num(y+r)} c ${num(x-k)} ${num(y+r)} ${num(x-r)} ${num(y+k)} ${num(x-r)} ${num(y)} c ${num(x-r)} ${num(y-k)} ${num(x-k)} ${num(y-r)} ${num(x)} ${num(y-r)} c ${num(x+k)} ${num(y-r)} ${num(x+r)} ${num(y-k)} ${num(x+r)} ${num(y)} c f`)}else if(s.type==='polygon'){const pts=s.points;content.push(`${pts[0][0]} ${num(h-pts[0][1])} m `+pts.slice(1).map(p=>`${p[0]} ${num(h-p[1])} l`).join(' ')+' h f')}else if(s.type==='text'){const ch=pdfChar(s.char).replace(/([()\\])/g,'\\$1');content.push(`BT /F1 ${s.size} Tf 1 0 0 1 ${s.x} ${num(h-s.y-s.size*.84)} Tm (${ch}) Tj ET`)}}
 const stream=enc.encode(content.join('\n')+'\n');const objects=[null,`<< /Type /Catalog /Pages 2 0 R >>`,`<< /Type /Pages /Kids [3 0 R] /Count 1 >>`,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${doc.w} ${h}] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>`,null,`<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>`];
 const chunks=[],offsets=[0];let pos=0;function add(s){let bytes=typeof s==='string'?enc.encode(s):s;chunks.push(bytes);pos+=bytes.length}add('%PDF-1.4\n');for(let i=1;i<=5;i++){offsets[i]=pos;add(`${i} 0 obj\n`);if(i===4){add(`<< /Length ${stream.length} >>\nstream\n`);add(stream);add('endstream\n')}else add(objects[i]+'\n');add('endobj\n')}let start=pos;add(`xref\n0 6\n0000000000 65535 f \n`);for(let i=1;i<=5;i++)add(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`);return new Blob(chunks,{type:'application/pdf'})
}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}
window.AnalogVector={supported,previewSVG(){return svg(makeDocument())},async save(format){const doc=makeDocument();if(doc.shapes.length>90000)throw Error('Too many vector objects. Increase dot/character size to reduce complexity.');let blob=format==='svg'?new Blob([svg(doc)],{type:'image/svg+xml;charset=utf-8'}):pdf(doc);download(blob,`analog-image-vector.${format}`);return {count:doc.shapes.length,size:blob.size}}};
})();
