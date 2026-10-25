/* Experimental fixed-timeline H.264 MP4 exporter. Video-only. No external dependencies. */
(()=>{'use strict';
const U=(...a)=>{let n=a.reduce((s,v)=>s+v.length,0),o=new Uint8Array(n),p=0;for(const v of a){o.set(v,p);p+=v.length}return o};
const n8=x=>new Uint8Array([x&255]),n16=x=>new Uint8Array([(x>>>8)&255,x&255]),n32=x=>new Uint8Array([(x>>>24)&255,(x>>>16)&255,(x>>>8)&255,x&255]),s=x=>new TextEncoder().encode(x),z=n=>new Uint8Array(n),box=(type,...data)=>{let body=U(...data);return U(n32(body.length+8),s(type),body)},full=(t,v,f,...d)=>box(t,n8(v),new Uint8Array([(f>>16)&255,(f>>8)&255,f&255]),...d);
const matrix=U(n32(65536),n32(0),n32(0),n32(0),n32(65536),n32(0),n32(0),n32(0),n32(1073741824));
function mp4(samples,w,h,fps,avcc){const scale=90000,delta=Math.round(scale/fps),duration=delta*samples.length;let mdat=box('mdat',...samples.map(x=>x.data));let ftyp=box('ftyp',s('isom'),n32(512),s('isom'),s('iso2'),s('avc1'),s('mp41'));
const mvhd=full('mvhd',0,0,n32(0),n32(0),n32(scale),n32(duration),n32(65536),n16(256),z(10),matrix,z(24),n32(2));
const tkhd=full('tkhd',0,7,n32(0),n32(0),n32(1),n32(0),n32(duration),z(8),n16(0),n16(0),n16(0),n16(0),matrix,n32(w*65536),n32(h*65536));
const mdhd=full('mdhd',0,0,n32(0),n32(0),n32(scale),n32(duration),n16(0x55c4),n16(0));
const hdlr=full('hdlr',0,0,n32(0),s('vide'),z(12),s('VideoHandler\0'));
const vmhd=full('vmhd',0,1,n16(0),n16(0),n16(0),n16(0));
const dinf=box('dinf',full('dref',0,0,n32(1),full('url ',0,1)));
const avc1=box('avc1',z(6),n16(1),z(16),n16(w),n16(h),n32(0x00480000),n32(0x00480000),n32(0),n16(1),z(32),n16(24),n16(0xffff),box('avcC',avcc));
const stsd=full('stsd',0,0,n32(1),avc1),stts=full('stts',0,0,n32(1),n32(samples.length),n32(delta));
const stsc=full('stsc',0,0,n32(1),n32(1),n32(samples.length),n32(1));
const stsz=full('stsz',0,0,n32(0),n32(samples.length),...samples.map(x=>n32(x.data.length)));
const key=samples.map((x,i)=>x.key?i+1:0).filter(Boolean);const stss=full('stss',0,0,n32(key.length),...key.map(n32));
function moov(offset){let stco=full('stco',0,0,n32(1),n32(offset));let stbl=box('stbl',stsd,stts,stsc,stsz,stco,stss);let minf=box('minf',vmhd,dinf,stbl);return box('moov',mvhd,box('trak',tkhd,box('mdia',mdhd,hdlr,minf)))}
let provisional=moov(0);let moovBytes=moov(ftyp.length+provisional.length+8);return new Blob([ftyp,moovBytes,mdat],{type:'video/mp4'});
}
async function seek(video,time){if(Math.abs(video.currentTime-time)<.0001&&video.readyState>=2)return;await new Promise((resolve,reject)=>{let timer=setTimeout(()=>{cleanup();reject(Error('Frame seek timeout'))},10000);function cleanup(){clearTimeout(timer);video.removeEventListener('seeked',done);video.removeEventListener('error',bad)}function done(){cleanup();resolve()}function bad(){cleanup();reject(Error('Video seek failed'))}video.addEventListener('seeked',done,{once:true});video.addEventListener('error',bad,{once:true});video.currentTime=time})}
window.fixedTimelineExport=async({video,canvas,frame,start,end,fps,width,height,onProgress})=>{
if(!window.VideoEncoder||!window.VideoFrame)throw Error('WebCodecs VideoEncoder unavailable');
const config={codec:'avc1.42E01F',width,height,bitrate:Math.max(500000,Math.min(8000000,width*height*fps*.16)),framerate:fps,avc:{format:'avc'}};
const support=await VideoEncoder.isConfigSupported(config);if(!support.supported)throw Error('H.264 encoder configuration unsupported');
let samples=[],avcc=null,err=null;const encoder=new VideoEncoder({output:(chunk,meta)=>{if(meta?.decoderConfig?.description)avcc=new Uint8Array(meta.decoderConfig.description);let data=new Uint8Array(chunk.byteLength);chunk.copyTo(data);samples.push({data,key:chunk.type==='key'})},error:e=>{err=e}});
encoder.configure(config);const count=Math.max(1,Math.ceil((end-start)*fps));const wasPaused=video.paused;video.pause();
try{for(let i=0;i<count;i++){
 if(err)throw err;
 await seek(video,Math.min(end-.0001,start+i/fps));await frame();
 const vf=new VideoFrame(canvas,{timestamp:Math.round(i*1000000/fps),duration:Math.round(1000000/fps)});
 encoder.encode(vf,{keyFrame:i%Math.max(1,Math.round(fps*2))===0});vf.close();
 if(encoder.encodeQueueSize>3)await encoder.flush();
 if(i%3===0||i===count-1){onProgress?.(i+1,count);await new Promise(r=>setTimeout(r,0))}
 }await encoder.flush();if(err)throw err;if(!avcc)throw Error('H.264 decoder configuration missing');if(samples.length!==count)throw Error(`Encoded ${samples.length}/${count} frames`);return {blob:mp4(samples,width,height,fps,avcc),frames:count};
}finally{encoder.close();if(!wasPaused)video.pause()}
};
})();
