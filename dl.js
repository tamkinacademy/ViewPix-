(function(){
var K="AIzaSyD1uWle_USBMBO_rJuT64TMCmmzyO1rdH8",B="https://firestore.googleapis.com/v1/projects/techcraft-gigs/databases/(default)/documents";
var box=document.getElementById("vp-dl");if(!box)return;
var css=document.createElement("style");css.textContent=".vpd{max-width:460px;margin:20px auto;background:#171723;color:#f2f1fa;border:1px solid #2c2c40;border-radius:20px;padding:18px;font-family:'Hind Siliguri',system-ui,sans-serif;text-align:center;line-height:1.6}.vpd img{max-width:100%;max-height:300px;border-radius:12px;margin-bottom:10px}.vpd b{font-size:18px}.vpd .k{color:#9d9bb5;font-size:14px}.vpd input{width:100px;text-align:center;background:#1f1f2e;border:1px solid #2c2c40;border-radius:10px;padding:9px;color:#fff;font-size:18px;margin:6px 0}.vpd button,.vpd a.b{display:inline-block;border:0;border-radius:99px;padding:11px 26px;font-size:16px;font-weight:700;color:#fff;background:linear-gradient(90deg,#7c5cff,#ff5c8a);cursor:pointer;text-decoration:none;margin-top:8px}.vpd button[disabled]{opacity:.5;cursor:not-allowed}.vpd .e{color:#ff7a7a;min-height:20px;font-size:14px}";
document.head.appendChild(css);
function bn(n){return String(n).replace(/[0-9]/g,function(d){return "০১২৩৪৫৬৭৮৯"[d]})}
function en(s){return String(s).replace(/[০-৯]/g,function(d){return "০১২৩৪৫৬৭৮৯".indexOf(d)})}
function esc(s){var d=document.createElement("div");d.textContent=s==null?"":s;return d.innerHTML}
var m=location.search.match(/[?&]p=([A-Za-z0-9_\-]+)/);var id=m?m[1]:"";
function say(h){box.innerHTML='<div class="vpd">'+h+"</div>"}
if(!id){say("<b>ViewPix</b><p class='k'>ডাউনলোডের জন্য ViewPix সাইট থেকে কোনো ছবির \"ডাউনলোড\" বাটনে চাপুন।</p>");return}
say("<p class='k'>লোড হচ্ছে…</p>");
fetch(B+"/vp_photos/"+id+"?key="+K).then(function(r){return r.json()}).then(function(d){
 if(!d.fields){say("<b>ছবিটি পাওয়া যায়নি</b><p class='k'>ছবিটি হয়তো মুছে ফেলা হয়েছে।</p>");return}
 var f=d.fields,title=f.title&&f.title.stringValue||"",name=f.name&&f.name.stringValue||"",th=f.th&&f.th.stringValue||"";
 var a=2+Math.floor(Math.random()*8),b=2+Math.floor(Math.random()*8),ans=a+b,left=10,started=false;
 say('<img src="'+th+'" alt=""><div><b>'+esc(title||"ছবি")+'</b></div><div class="k">শিল্পী: '+esc(name)+'</div><hr style="border:0;border-top:1px solid #2c2c40;margin:12px 0"><div>আপনি মানুষ কিনা যাচাই করুন:<br><b>'+bn(a)+" + "+bn(b)+' = ?</b></div><input id="vq" inputmode="numeric" maxlength="2"><div class="e" id="ve"></div><button id="vg">যাচাই করুন</button><div class="k" style="margin-top:10px">বিজ্ঞাপনে ক্লিক করতে হবে না। শুধু কয়েক সেকেন্ড অপেক্ষা করুন।</div>');
 document.getElementById("vg").onclick=function(){
  if(started)return;
  if(parseInt(en(document.getElementById("vq").value),10)!==ans){document.getElementById("ve").textContent="উত্তর ভুল, আবার চেষ্টা করুন";return}
  started=true;var bt=document.getElementById("vg");bt.disabled=true;document.getElementById("ve").textContent="";
  var t=setInterval(function(){left--;bt.textContent="অপেক্ষা করুন "+bn(left)+" সেকেন্ড";if(left<=0){clearInterval(t);bt.textContent="⬇ ডাউনলোড করুন";bt.disabled=false;bt.onclick=dl}},1000);
  bt.textContent="অপেক্ষা করুন "+bn(left)+" সেকেন্ড"};
 function dl(){
  var bt=document.getElementById("vg");bt.disabled=true;bt.textContent="নামানো হচ্ছে…";
  fetch(B+"/vp_full/"+id+"?key="+K).then(function(r){return r.json()}).then(function(x){
   var img=x.fields&&x.fields.img&&x.fields.img.stringValue;if(!img)throw 0;
   var p=img.split(","),bin=atob(p[1]),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
   var url=URL.createObjectURL(new Blob([u],{type:"image/jpeg"})),el=document.createElement("a");el.href=url;el.download="viewpix-"+id+".jpg";document.body.appendChild(el);el.click();el.remove();
   bt.textContent="✓ ডাউনলোড হয়েছে";bt.disabled=false;bt.onclick=dl;
   try{if(!sessionStorage.getItem("vpd"+id)){sessionStorage.setItem("vpd"+id,"1");fetch(B+":commit?key="+K,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({writes:[{transform:{document:"projects/techcraft-gigs/databases/(default)/documents/vp_photos/"+id,fieldTransforms:[{fieldPath:"dl",increment:{integerValue:"1"}}]}}]})})}}catch(e){}
  }).catch(function(){bt.disabled=false;bt.textContent="আবার চেষ্টা করুন";document.getElementById("ve").textContent="ডাউনলোড হয়নি, আবার চাপুন"})}
}).catch(function(){say("<b>লোড করা যায়নি</b><p class='k'>ইন্টারনেট দেখে আবার চেষ্টা করুন।</p>")});
})();
