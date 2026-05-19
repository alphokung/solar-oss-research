// === SECTION NAV ===
function showSec(id) {
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.tnb').forEach(b=>b.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  event.currentTarget.classList.add('on');
}

// === PROFILE SELECTOR ===
let currentProfile = null;
function selectProfile(p) {
  currentProfile = p;
  ['house','biz','factory'].forEach(k=>{
    document.getElementById('btn-'+k).className='prof-btn';
    const jb = document.getElementById('jbody-'+k);
    if(jb) jb.classList.remove('vis');
  });
  const btn = document.getElementById('btn-'+p);
  btn.classList.add('sel-'+p);
  const jb = document.getElementById('jbody-'+p);
  if(jb) { jb.classList.add('vis'); }
  document.getElementById('no-profile').style.display='none';
}

// === TOU WIZARD ===
let wizAnswers = {};
let wizStep = 0;

function wiz(q, val) {
  wizAnswers[q] = val;
  document.querySelectorAll('.wiz-opt').forEach(o=>o.classList.remove('chosen'));
  event.currentTarget.classList.add('chosen');
  setTimeout(()=>{
    if(q < 3) {
      showWizStep(q+1);
    } else {
      showWizResult();
    }
  }, 300);
}

function showWizStep(n) {
  wizStep = n;
  document.querySelectorAll('.wiz-step').forEach(s=>s.classList.remove('wvis'));
  document.getElementById('wq'+n).classList.add('wvis');
  // Update progress dots
  for(let i=0;i<=4;i++){
    const d=document.getElementById('wd'+i);
    if(d){d.className='wiz-dot'+(i<n?' done-dot':i===n?' active':'');}
  }
}

function wizBack(current) {
  showWizStep(current-1);
}

function showWizResult() {
  showWizStep(4);
  const a = wizAnswers;
  let html = '';

  // Factory/EV → almost always yes
  if(a[0]==='factory') {
    html = `<div class="wiz-result r-yes"><h4>✅ แนะนำอย่างยิ่ง: เปลี่ยน TOU Meter</h4>
    <p>โรงงานใช้ไฟหนักช่วง On-Peak ซึ่ง Solar ผลิตได้พอดี ประหยัดได้มากที่สุด</p>
    <ul><li>On-Peak แพง 5.80 บ./หน่วย — Solar ผลิตทดแทนได้ 100%</li>
    <li>ย้าย Load หนักไป Off-Peak (2.64 บ./หน่วย) ประหยัดอีก 40%</li>
    <li>คืนทุนค่ามิเตอร์ภายใน 1–2 เดือน</li>
    <li>ESG Reporting ได้ข้อมูลแยก Peak/Off-Peak ชัดเจน</li></ul>
    </div>`;
  } else if(a[0]==='ev') {
    html = `<div class="wiz-result r-yes"><h4>✅ แนะนำมาก: เปลี่ยน TOU Meter</h4>
    <p>ผู้ใช้รถ EV ได้ประโยชน์สูงสุดจาก TOU</p>
    <ul><li>ชาร์จ EV กลางคืน Off-Peak ราคา 2.64 บ./หน่วย (ถูกกว่า 50%)</li>
    <li>Solar ผลิตกลางวัน On-Peak ลดค่าไฟบ้าน</li>
    <li>ประหยัดค่าชาร์จ EV ได้ 3,000–8,000 บาท/ปี</li>
    <li>ค่าบริการเดือนละ +30 บาท คืนทุนภายใน 1 เดือน</li></ul>
    </div>`;
  } else if(a[0]==='biz') {
    html = `<div class="wiz-result r-yes"><h4>✅ แนะนำ: เปลี่ยน TOU Meter</h4>
    <p>SME ที่ใช้ไฟกลางวัน + มี Solar ได้ประโยชน์ชัดเจน</p>
    <ul><li>Solar ผลิตช่วง On-Peak (5.80 บ./หน่วย) ทดแทนได้</li>
    <li>ย้าย Load ที่ยืดหยุ่นได้ (ซักผ้า บด แช่แข็ง) ไป Off-Peak</li>
    <li>ประหยัดรวมกับ Solar 40–70% ของค่าไฟกลางวัน</li></ul>
    </div>`;
  } else {
    // House — depends on usage + solar + flexibility
    if(a[2]==='yes-solar') {
      if(a[1]==='night' || a[1]==='weekend') {
        html = `<div class="wiz-result r-yes"><h4>✅ แนะนำ: เปลี่ยน TOU Meter</h4>
        <p>คุณใช้ไฟมากกลางคืน + มี Solar ที่ผลิตกลางวัน — นี่คือ combination ที่ดีที่สุดสำหรับ TOU</p>
        <ul><li>Solar ขายไฟช่วง On-Peak ได้ราคาดี</li>
        <li>ใช้ไฟของตัวเองกลางคืน Off-Peak ราคาถูก</li>
        <li>ประหยัดจากทั้ง 2 ทาง</li></ul>
        </div>`;
      } else if(a[3]==='flex') {
        html = `<div class="wiz-result r-yes"><h4>✅ แนะนำ: เปลี่ยน TOU Meter</h4>
        <p>มี Solar + ปรับพฤติกรรมได้ = ได้ประโยชน์เต็มๆ</p>
        <ul><li>ใช้ Solar ช่วงกลางวัน (ฟรี / ถูก)</li>
        <li>ย้ายซักผ้า/อบผ้า/ชาร์จ EV ไปกลางคืน Off-Peak</li>
        <li>ประหยัดได้ 30–50% เพิ่มจากที่มี Solar อยู่แล้ว</li></ul>
        </div>`;
      } else if(a[3]==='some') {
        html = `<div class="wiz-result r-maybe"><h4>🔶 อาจคุ้ม: ลองคำนวณก่อน</h4>
        <p>มี Solar แต่ปรับพฤติกรรมได้บางส่วน — คุ้มหรือไม่ขึ้นกับสัดส่วน</p>
        <ul><li>ถ้าใช้ Off-Peak &gt;50% ของทั้งหมด → คุ้มค่า</li>
        <li>ดูบิลค่าไฟ 3 เดือน ดูว่า pattern กลางวัน vs กลางคืนเป็นอย่างไร</li>
        <li>SolarOne จะช่วยคำนวณให้ฟรีก่อนตัดสินใจ</li></ul>
        </div>`;
      } else {
        html = `<div class="wiz-result r-maybe"><h4>🔶 ไม่จำเป็นต้องเปลี่ยนตอนนี้</h4>
        <p>มี Solar แต่ไม่สามารถปรับพฤติกรรมได้ — TOU อาจไม่ช่วยมาก</p>
        <ul><li>ยังประหยัดได้จาก Solar ที่ผลิตกลางวัน</li>
        <li>แต่ถ้าใช้ไฟกลางวันมาก ค่า On-Peak สูงอาจหักล้างผลดีของ Solar</li>
        <li>แนะนำให้ปรึกษา SolarOne คำนวณก่อนตัดสินใจ</li>
        <li>เปลี่ยนใจภายหลังได้ (รอครบ 1 ปีก่อน)</li></ul>
        </div>`;
      }
    } else {
      // No solar
      if(a[1]==='night' && a[3]==='flex') {
        html = `<div class="wiz-result r-yes"><h4>✅ คุ้มค่า: เปลี่ยน TOU Meter</h4>
        <p>ไม่มี Solar แต่ใช้ไฟกลางคืนเป็นหลัก + ปรับได้ = คุ้มค่า</p>
        <ul><li>ย้ายกิจกรรมทั้งหมดไป Off-Peak 22:00–09:00 น.</li>
        <li>Off-Peak 2.64 บ./หน่วย vs ปกติ ~4.80 บ./หน่วย (ถูกกว่า 45%)</li>
        <li>ค่าบริการ +30 บ./เดือน คืนทุนง่ายมาก</li></ul>
        </div>`;
      } else if(a[1]==='day' || a[3]==='rigid') {
        html = `<div class="wiz-result r-no"><h4>❌ ยังไม่แนะนำ: ยังไม่ต้องเปลี่ยน TOU</h4>
        <p>ใช้ไฟกลางวันมาก + ไม่มี Solar + ปรับพฤติกรรมไม่ได้ = อาจเสียมากกว่าได้</p>
        <ul><li>On-Peak 5.80 บ./หน่วย แพงกว่าอัตราปกติมาก</li>
        <li>ถ้าปรับพฤติกรรมไม่ได้ ค่าไฟอาจแพงขึ้น 20–40%</li>
        <li>แนะนำให้ติด Solar ก่อน แล้วค่อยพิจารณา TOU</li></ul>
        </div>`;
      } else {
        html = `<div class="wiz-result r-maybe"><h4>🔶 อาจคุ้ม: ขึ้นกับพฤติกรรม</h4>
        <p>ไม่มี Solar แต่ปรับพฤติกรรมได้ — คำนวณก่อนตัดสินใจ</p>
        <ul><li>ถ้าย้าย Load หนัก (ซักผ้า อบผ้า ฯลฯ) ไป Off-Peak ได้จริง → คุ้ม</li>
        <li>วันเสาร์-อาทิตย์ใช้ Off-Peak ทั้งวัน ประหยัดมาก</li>
        <li>ทดลองใช้ได้ 1 ปี แล้วค่อยประเมิน</li></ul>
        </div>`;
      }
    }
  }
  document.getElementById('wiz-result-box').innerHTML = html;
}

function wizReset() {
  wizAnswers = {};
  wizStep = 0;
  document.querySelectorAll('.wiz-step').forEach(s=>s.classList.remove('wvis'));
  document.getElementById('wq0').classList.add('wvis');
  for(let i=0;i<=4;i++){
    const d=document.getElementById('wd'+i);
    if(d)d.className='wiz-dot'+(i===0?' active':'');
  }
}