function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
  }

  function showJourney(type) {
    document.querySelectorAll('.journey-content').forEach(c => c.classList.remove('visible'));
    document.querySelectorAll('.journey-tab').forEach(t => {
      t.classList.remove('active-house','active-biz','active-factory');
    });
    document.getElementById('journey-' + type).classList.add('visible');
    const tab = event.target;
    if (type === 'house') tab.classList.add('active-house');
    else if (type === 'biz') tab.classList.add('active-biz');
    else tab.classList.add('active-factory');
  }