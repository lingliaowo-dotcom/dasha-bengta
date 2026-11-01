(function () {
  'use strict';

  var STORAGE_KEY = 'sjz_dasha_v2';
  var NAME_PREFIX = 'SJZ2:';

  var CLUES = [
    { id: 'newspaper',        title: '1998年10月8日《燕赵晚报》头版', act: '第一幕 · 六点下班', href: 'newspaper.html' },
    { id: 'gate',             title: '第四制药厂门卫登记簿',           act: '第一幕 · 六点下班', href: 'gate.html' },
    { id: 'locker',           title: '更衣柜 No.071',                 act: '第一幕 · 六点下班', href: 'locker.html' },
    { id: 'home',             title: '1998年10月7日的厨房',            act: '第二幕 · 熬粥的人', href: 'home.html' },
    { id: 'hospital',         title: '李素芬的病历（1952—1998）',       act: '第二幕 · 熬粥的人', href: 'hospital.html' },
    { id: 'mall',             title: '人民商场八角柜台',               act: '第三幕 · 假钞与假枪', href: 'mall.html' },
    { id: 'school',           title: '师大附中球室（1998.10.07）',      act: '第四幕 · 背向的少年', href: 'school.html' },
    { id: 'bbs',              title: '华北平原BBS·石家庄站',           act: '第五幕 · 第三排货架', href: 'bbs.html' },
    { id: 'bbs_post',         title: '树洞帖：一万匹马在我脑海里奔跑',  act: '第五幕 · 第三排货架', href: 'bbs-post.html' },
    { id: 'tape',             title: '磁带 A 面（TDK D60）',           act: '第五幕 · 第三排货架', href: 'tape.html' },
    { id: 'classroom',        title: '2026年，高三（2）班旧教室',       act: '第六幕 · 无法离开的教室', href: 'classroom.html' },
    { id: 'coldroom_inside',  title: '三号冷库·第三排货架·铁盒',       act: '第六幕 · 无法离开的教室', href: 'coldroom-inside.html' },
    { id: 'confession',       title: '未公开访谈：郑国华口述（2003）',  act: '终幕 · 云层深处', href: 'confession.html' }
  ];

  var DETAILS = [
    { flag: 'photo_back',   title: '合影背面的铅笔字',        act: '第一幕' },
    { flag: 'badge',        title: '更衣柜里的厂徽 04071',     act: '第一幕' },
    { flag: 'paddle_date',  title: '球拍柄上的刻字 10·07',     act: '第一幕' },
    { flag: 'three_bowls',  title: '厨房桌上的三只碗',         act: '第二幕' },
    { flag: 'fake_note',    title: '假钞背面的铅笔字',         act: '第三幕' },
    { flag: 'tape_end',     title: '磁带 02:13 之后的低语',    act: '第五幕' },
    { flag: 'door_scratches', title: '冷库门内侧的抓痕',       act: '第五幕' },
    { flag: 'notice',       title: '爆破通知书：22:00 封闭',   act: '第五幕' },
    { flag: 'tally',        title: '墙上的二十九个半“正”字',  act: '第五幕' },
    { flag: 'bbs_hidden',   title: '2026年重新出现的缓存帖',   act: '第五幕' },
    { flag: 'server',       title: '断电二十八年的服务器',     act: '第五幕' },
    { flag: 'iron_box',     title: '铁盒里的十七人名单',       act: '终幕' }
  ];

  var ENDINGS = {
    '1': {
      stamp: '结局一 · 失踪',
      title: '受案回执',
      kicker: '石家庄市公安局桥西分局 · 失踪人口',
      body: [
        '你去了派出所。民警从柜子里翻出1998年的旧卷宗，纸页发脆，边角被虫蛀成了锯齿。',
        '“陈卫东，失踪人口，未销案。”他念了一遍，抬头看你，“你是他什么人？”',
        '“儿子。”',
        '他在笔录上写下这两个字，让你签字。走出门时，石家庄下起了雨。铁皮柜里的东西还在，那栋楼已经不在了。',
        '你没有拼出父亲最后那一夜。'
      ],
      sign: '失踪，未销案。—— 1998.10.08'
    },
    '2': {
      stamp: '结局二 · 假枪',
      title: '社会新闻版',
      kicker: '《燕赵晚报》 · 2026-08-19',
      body: [
        '你认定父亲是去抢钱。你把猜测告诉了当年办案的人，也告诉了一个做自媒体的老同学。',
        '三天后，一篇旧闻被重新翻了出来：《男子持假枪夜闯厂区，疑因下岗精神失常》。配图是人民商场的八角柜台，一把塑料手枪，一张拾元假钞。',
        '父亲的名字又一次出现在报纸上，以一个笑话的方式。母亲的照片被记者拍走。',
        '你关掉手机。有些答案，错了就是一辈子。'
      ],
      sign: '“用一张假钞，买一把假枪。”'
    },
    '3': {
      stamp: '结局三 · 一篇报道',
      title: '二十八年后的头版',
      kicker: '《燕赵都市报》 · 2026-08-21 · 头版',
      body: [
        '你把拿到的材料交给了《燕赵都市报》。报道刊出，名单上的十七个名字被逐一念出。',
        '郑国华已于2009年病故，第四制药厂早已改制注销。没有人被追责。母亲没能等到这一天。',
        '但在报纸的角落里，父亲的名字第一次没有被写成“失踪”。',
        '报道的最后一段，记者引用了你提供的那盘磁带：“我没想伤人。那把枪是塑料的。”',
        '你还可以做得更好。有些材料，还留在案卷里。'
      ],
      sign: '“名字登出来了，楼已经没了。”'
    },
    '4': {
      stamp: '结局四 · 一万匹马',
      title: '空教室',
      kicker: '河北师大附中旧教学楼 · 2026-08-18 凌晨',
      body: [
        '你没有回家。深夜，你一个人回到即将拆除的教学楼。',
        '球室的门开着。月光下，一个穿蓝色工装的背影站在窗前。',
        '“小默，”他说，“你打球的时候，背对着我。”',
        '你喊他。他转过身来，脸是一张被雨泡烂的报纸。',
        '你醒来时躺在医院。他们说你在地下停车场晕倒了。铁盒不见了。',
        '一万匹马还在你脑海里奔跑。'
      ],
      sign: '“生活在经验里，直到大厦崩塌。”'
    },
    '5': {
      stamp: '结局五 · 如此生活三十年',
      title: '楼倒了，名字还在',
      kicker: 'TRUE END · 2026年8月20日',
      body: [
        '2026年8月20日，河北师大附中旧教学楼拆除。同一天，第四制药厂旧址地下停车场B3层被重新打开。',
        '铁盒里的十七个名字，郑国华的口述录音，以及那盘磁带，一起被送进了检察院。母亲的名字在第三行，后面画着一个很小的圈。',
        '母亲没能等到这一天。她把病历、磁带和那枚厂徽留给了我。',
        '那天清晨，我在餐桌上摆了三只碗。粥还在锅里，火关得很小。',
        '父亲的名字从失踪人口名单上划掉，改写成：陈卫东，第四制药厂仓库保管员，工号 04071。',
        '如此生活三十年，直到大厦崩塌。',
        '但这一次，楼倒了，名字还在。'
      ],
      sign: '—— 全线通关 · 感谢你把每一份材料都带回来 ——'
    }
  };

  function defaults() {
    return { visited: [], flags: {}, ending: null, answers: null };
  }

  function loadState() {
    var parsed = null;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) parsed = JSON.parse(raw);
    } catch (e) {}
    if (!parsed) {
      try {
        var name = window.name || '';
        if (name.indexOf(NAME_PREFIX) === 0) parsed = JSON.parse(name.slice(NAME_PREFIX.length));
      } catch (e) {}
    }
    if (!parsed || typeof parsed !== 'object') parsed = defaults();
    if (!Array.isArray(parsed.visited)) parsed.visited = [];
    if (!parsed.flags || typeof parsed.flags !== 'object') parsed.flags = {};
    return parsed;
  }

  var state = loadState();

  function saveState() {
    state.visited = state.visited.filter(function (v, i, arr) { return arr.indexOf(v) === i; });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    try { window.name = NAME_PREFIX + JSON.stringify(state); } catch (e) {}
  }

  function hasClue(id) {
    return state.visited.indexOf(id) !== -1;
  }

  function clueCount() {
    return CLUES.filter(function (c) { return hasClue(c.id); }).length;
  }

  function setFlag(key) {
    if (!key) return;
    state.flags[key] = true;
    saveState();
  }

  function hasFlag(key) {
    return !!state.flags[key];
  }

  function addVisited(id) {
    if (!id || hasClue(id)) return false;
    state.visited.push(id);
    saveState();
    return true;
  }

  function bindReveals() {
    document.querySelectorAll('[data-reveal]').forEach(function (btn) {
      var key = btn.getAttribute('data-reveal');
      var target = document.querySelector('[data-reveal-content="' + key + '"]');
      if (!target) return;
      if (hasFlag(key)) {
        target.hidden = false;
        btn.hidden = true;
        return;
      }
      btn.addEventListener('click', function () {
        setFlag(key);
        target.hidden = false;
        btn.hidden = true;
      });
    });
  }

  function openLocked(flagKey) {
    document.querySelectorAll('[data-lock-open="' + flagKey + '"]').forEach(function (el) {
      el.hidden = false;
    });
    document.querySelectorAll('form[data-lock-form][data-flag="' + flagKey + '"]').forEach(function (form) {
      form.hidden = true;
      var hint = form.parentElement.querySelector('.lock-hint');
      if (hint) hint.hidden = true;
    });
  }

  function normalizeDigits(raw) {
    return String(raw || '')
      .replace(/[\uFF10-\uFF19]/g, function (ch) {
        return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0);
      })
      .replace(/\D/g, '');
  }

  function bindLocks() {
    document.querySelectorAll('form[data-lock-form]').forEach(function (form) {
      var flagKey = form.getAttribute('data-flag') || '';
      if (flagKey && hasFlag(flagKey)) {
        openLocked(flagKey);
        return;
      }

      var expected = String(form.getAttribute('data-lock') || '');
      var next = form.getAttribute('data-next') || '';
      var scope = form.parentElement || form;
      var input = form.querySelector('input');
      var msg = form.querySelector('[data-lock-msg]');
      var deep = scope.querySelector('[data-lock-deep]');
      var failures = 0;
      var busy = false;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (busy) return;

        var digits = normalizeDigits(input ? input.value : '');
        var ok = digits === expected ||
          (digits.length === expected.length + 1 && digits.charAt(0) === '0' && digits.slice(1) === expected);

        if (ok) {
          busy = true;
          if (flagKey) setFlag(flagKey);
          if (msg) {
            msg.textContent = '锁芯转动了一下。';
            msg.className = 'lock-msg ok';
          }
          if (input) input.blur();
          if (next) {
            window.setTimeout(function () { window.location.href = next; }, 220);
          } else if (flagKey) {
            openLocked(flagKey);
          }
        } else {
          if (!digits) {
            if (msg) {
              msg.textContent = '锁没有动。先输入四位数字。';
              msg.className = 'lock-msg';
            }
            if (input) input.focus();
            return;
          }

          failures += 1;
          if (msg) {
            msg.textContent = failures === 1 ? '锁没有动。再想想。' : '锁没有动。也许你漏掉了某个日期。';
            msg.className = 'lock-msg';
          }
          if (deep && failures >= 2) deep.hidden = false;
          if (input) {
            input.value = '';
            input.focus();
          }
        }
      });
    });
  }

  function bindFinal() {
    var form = document.querySelector('[data-final-form]');
    if (!form) return;
    var msg = form.querySelector('[data-final-msg]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var idv = (form.querySelector('input[name="code_id"]') || {}).value || '';
      var door = (form.querySelector('input[name="code_door"]') || {}).value || '';
      var num = (form.querySelector('input[name="code_num"]') || {}).value || '';
      var idDigits = idv.replace(/\D/g, '');
      var doorDigits = door.replace(/\D/g, '');
      var numDigits = num.replace(/\D/g, '');

      if (!(idDigits === '04071' || idDigits === '4071') || doorDigits !== '0817' || numDigits !== '17') {
        if (msg) {
          msg.className = 'form-msg';
          msg.textContent = '结案报告上的三组编号还没有全部对上。工号、门禁、名单人数，都在材料里。';
        }
        return;
      }

      var q1 = form.querySelector('input[name="q1"]:checked');
      var q2 = form.querySelector('input[name="q2"]:checked');
      var q3 = form.querySelector('input[name="q3"]:checked');
      if (!q1 || !q2 || !q3) {
        if (msg) {
          msg.className = 'form-msg';
          msg.textContent = '三个问题都要写下答案。黑板上不能留空。';
        }
        return;
      }

      var a1 = q1.value, a2 = q2.value, a3 = q3.value;
      var correct = (a1 === 'cold' ? 1 : 0) + (a2 === 'threaten' ? 1 : 0) + (a3 === 'factory' ? 1 : 0);
      var full = clueCount() === CLUES.length && hasFlag('iron_box');
      var ending;

      if (a1 === 'school') {
        ending = 4;
      } else if (a2 === 'money' || a1 === 'mall') {
        ending = 2;
      } else if (a1 === 'cold' && a2 === 'threaten' && a3 === 'factory') {
        ending = full ? 5 : 3;
      } else if (correct >= 2) {
        ending = 3;
      } else {
        ending = 1;
      }

      state.answers = {
        code_id: idDigits,
        code_door: doorDigits,
        code_num: numDigits,
        q1: a1, q2: a2, q3: a3
      };
      state.ending = ending;
      saveState();

      if (msg) {
        msg.className = 'form-msg ok';
        msg.textContent = ending === 5 ? '粉笔在黑板上发出很轻的一声。' : '你把答案写在了黑板上。';
      }
      window.setTimeout(function () {
        window.location.href = 'board.html?e=' + ending;
      }, 320);
    });
  }

  function bindEnding() {
    var root = document.querySelector('[data-ending-root]');
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var key = params.get('e') || String(state.ending || '1');
    var data = ENDINGS[key] || ENDINGS['1'];

    var stampEl = root.querySelector('[data-ending-stamp]');
    var titleEl = root.querySelector('[data-ending-title]');
    var kickerEl = root.querySelector('[data-ending-kicker]');
    var bodyEl = root.querySelector('[data-ending-body]');
    var signEl = root.querySelector('[data-ending-sign]');

    if (stampEl) stampEl.textContent = data.stamp;
    if (titleEl) titleEl.textContent = data.title;
    if (kickerEl) kickerEl.textContent = data.kicker;
    if (bodyEl) bodyEl.innerHTML = data.body.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    if (signEl) signEl.textContent = data.sign;

    var missing = CLUES.filter(function (c) { return !hasClue(c.id); });
    var missingEl = document.querySelector('[data-ending-missing]');
    if (missingEl) {
      if (!missing.length && hasFlag('iron_box')) {
        missingEl.innerHTML = '全部 ' + CLUES.length + ' 份材料已经找到，铁盒名单已打开。';
      } else if (!missing.length) {
        missingEl.innerHTML = '材料齐了，但<span class="miss">铁盒里的名单还没有打开</span>。';
      } else {
        missingEl.innerHTML = '还有 <span class="miss">' + missing.length + '</span> 份材料没有找到：' +
          missing.map(function (c) { return '<a href="' + c.href + '">' + c.title + '</a>'; }).join('、') + '。';
      }
    }

    document.querySelectorAll('[data-ending-plate]').forEach(function (el) {
      el.hidden = el.getAttribute('data-ending-plate') !== String(key);
    });

    var labels = {
      q1: { mall: '人民商场天台', cold: '三号冷库', school: '旧教室' },
      q2: { money: '抢钱', threaten: '吓唬厂长、要名单', suicide: '自杀' },
      q3: { mall: '人民商场', factory: '药厂主楼', mind: '他的精神世界' }
    };
    var answersEl = document.querySelector('[data-ending-answers]');
    if (answersEl && state.answers) {
      answersEl.textContent = [state.answers.q1, state.answers.q2, state.answers.q3].map(function (v, i) {
        var group = labels['q' + (i + 1)] || {};
        return group[v] || '未作答';
      }).join(' / ');
    }
  }

  function bindReset() {
    document.querySelectorAll('[data-reset]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        state = defaults();
        try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
        try { localStorage.removeItem('sjz_bgm_on'); localStorage.removeItem('sjz_bgm_t'); } catch (err) {}
        try { window.name = NAME_PREFIX + JSON.stringify(state); } catch (err) {}
        window.location.href = el.getAttribute('data-reset-to') || 'start.html';
      });
    });
  }

  function initBgm() {
    var KEY_ON = 'sjz_bgm_on';
    var KEY_T = 'sjz_bgm_t';
    var startBtn = document.querySelector('[data-bgm-start]');

    function makeAudio() {
      var a = document.createElement('audio');
      a.src = 'assets/audio/bgm.m4a';
      a.loop = true;
      a.preload = 'auto';
      a.volume = 0.35;
      return a;
    }

    if (startBtn) {
      startBtn.addEventListener('click', function (e) {
        try { localStorage.setItem(KEY_ON, '1'); localStorage.setItem(KEY_T, '0'); } catch (err) {}
        var a = makeAudio();
        var p = null;
        try { p = a.play(); } catch (err) {}
        if (p && p.then) {
          e.preventDefault();
          var href = startBtn.getAttribute('href');
          p.then(function () { window.location.href = href; }, function () { window.location.href = href; });
        }
      });
      return;
    }

    var on = false;
    try { on = localStorage.getItem(KEY_ON) === '1'; } catch (err) {}
    if (!on) return;

    var audio = makeAudio();
    var t = 0;
    try { t = parseFloat(localStorage.getItem(KEY_T) || '0') || 0; } catch (err) {}
    audio.addEventListener('loadedmetadata', function () {
      if (t > 0 && (!audio.duration || t < audio.duration - 1)) {
        try { audio.currentTime = t; } catch (err) {}
      }
    });
    var saveT = function () {
      try { localStorage.setItem(KEY_T, String(audio.currentTime || 0)); } catch (err) {}
    };
    setInterval(saveT, 2000);
    window.addEventListener('beforeunload', saveT);

    var played = false;
    function unhook() {
      document.removeEventListener('pointerdown', onGesture);
      document.removeEventListener('keydown', onGesture);
    }
    function tryPlay() {
      if (played) return;
      var p = null;
      try { p = audio.play(); } catch (err) {}
      if (p && p.then) {
        p.then(function () { played = true; unhook(); }, function () {});
      } else {
        played = true; unhook();
      }
    }
    function onGesture() { tryPlay(); }
    document.addEventListener('pointerdown', onGesture);
    document.addEventListener('keydown', onGesture);
    tryPlay();
  }

  function init() {
    var pageClue = document.body.getAttribute('data-clue');
    var pageDetail = document.body.getAttribute('data-detail');
    if (pageDetail) setFlag(pageDetail);
    addVisited(pageClue);

    bindReveals();
    bindLocks();
    bindFinal();
    bindEnding();
    bindReset();
    initBgm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
