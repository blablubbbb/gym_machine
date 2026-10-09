/* Setcard — offline gym machine notes. MIT License. */
(function () {
  "use strict";
  var APP_VERSION = "1.0.0";
  var KEY = "setcard.v1";
  var LANG_KEY = "setcard.lang";
  var $ = function (id) { return document.getElementById(id); };

  /* ---------------- Texts ---------------- */
  var TEXT = {
    en: {
      scan: "Scan machine", scanHint: "QR code or barcode on the machine", find: "Find a machine",
      addNoCode: "Add without code", emptyTitle: "No machines yet",
      emptyBody: "Tap “Scan machine” and point the camera at the code on the front of a machine. The first time, you enter its name, your seat and lever settings, the weight, sets and reps. Next time, scanning the same code opens them right away.",
      dataAndSettings: "Data and settings", language: "Language", backup: "Backup",
      backupNote: "Your machines are stored only on this phone. Export a backup file now and then, or to move to a new phone.",
      export: "Export backup", import: "Import backup", install: "Install", installBtn: "Add to home screen",
      source: "Source code on GitHub", back: "← Back", linkQ: "Already saved this machine without this code?",
      link: "Link code", name: "Name", namePh: "e.g. Leg press", load: "Load", sets: "sets", reps: "reps",
      settings: "Machine settings", addSetting: "+ Add setting", notes: "Notes",
      notesPh: "Grip, tempo, what to change next time", save: "Save", logToday: "Log today",
      logNote: "“Log today” saves and adds today's weight, sets and reps to the history.",
      history: "History", codes: "Codes for this machine", delete: "Delete machine",
      deleteQ: "Delete this machine and its history?", deleteYes: "Delete", keep: "Keep",
      aim: "Point the camera at the code", light: "Light", photo: "Take photo instead", cancel: "Cancel",
      updateReady: "A new version is ready.", reload: "Reload",
      newMachine: "New machine", newCode: "New code", noCode: "No code", unnamed: "Unnamed machine",
      machine: "machine", machines: "machines", updated: "Updated", noMatch: "No machine matches “{q}”.",
      saved: "Saved", logged: "Logged for today", deleted: "Deleted", linked: "Code linked",
      saveFailed: "Couldn't save. Your phone's storage may be full.",
      noCodeFound: "No code found in that photo. Hold the phone closer so the code fills about a third of the picture, and keep it sharp.",
      reading: "Reading code…", camDenied: "The camera isn't available. Allow camera access for this site in Chrome's settings, or use “Take photo instead”.",
      noScanner: "This browser can't scan live. Use “Take photo instead”.",
      exported: "Backup exported", imported: "Imported {n} machines", importBad: "That file isn't a Setcard backup.",
      persisted: "Storage: protected from automatic clean-up.",
      notPersisted: "Storage: the browser may clear it if the phone runs low on space. Install the app and export backups to be safe.",
      seat: "Seat", backRest: "Back rest", remove: "Remove", removeSetting: "Remove setting",
      settingName: "Setting", settingValue: "Value", version: "Version"
    },
    de: {
      scan: "Gerät scannen", scanHint: "QR-Code oder Barcode am Gerät", find: "Gerät suchen",
      addNoCode: "Ohne Code anlegen", emptyTitle: "Noch keine Geräte",
      emptyBody: "Tippe auf „Gerät scannen“ und richte die Kamera auf den Code vorne am Gerät. Beim ersten Mal gibst du Namen, Sitz- und Hebeleinstellungen, Gewicht, Sätze und Wiederholungen ein. Beim nächsten Scan erscheinen sie sofort.",
      dataAndSettings: "Daten und Einstellungen", language: "Sprache", backup: "Sicherung",
      backupNote: "Deine Geräte sind nur auf diesem Handy gespeichert. Exportiere ab und zu eine Sicherungsdatei, auch für den Umzug auf ein neues Handy.",
      export: "Sicherung exportieren", import: "Sicherung importieren", install: "Installieren", installBtn: "Zum Startbildschirm hinzufügen",
      source: "Quellcode auf GitHub", back: "← Zurück", linkQ: "Dieses Gerät schon ohne diesen Code gespeichert?",
      link: "Code zuordnen", name: "Name", namePh: "z. B. Beinpresse", load: "Belastung", sets: "Sätze", reps: "Wdh.",
      settings: "Geräteeinstellungen", addSetting: "+ Einstellung hinzufügen", notes: "Notizen",
      notesPh: "Griff, Tempo, was du nächstes Mal änderst", save: "Speichern", logToday: "Heute eintragen",
      logNote: "„Heute eintragen“ speichert und fügt Gewicht, Sätze und Wiederholungen von heute zum Verlauf hinzu.",
      history: "Verlauf", codes: "Codes für dieses Gerät", delete: "Gerät löschen",
      deleteQ: "Dieses Gerät mit Verlauf löschen?", deleteYes: "Löschen", keep: "Behalten",
      aim: "Richte die Kamera auf den Code", light: "Licht", photo: "Stattdessen Foto aufnehmen", cancel: "Abbrechen",
      updateReady: "Eine neue Version ist da.", reload: "Neu laden",
      newMachine: "Neues Gerät", newCode: "Neuer Code", noCode: "Ohne Code", unnamed: "Gerät ohne Namen",
      machine: "Gerät", machines: "Geräte", updated: "Geändert", noMatch: "Kein Gerät passt zu „{q}“.",
      saved: "Gespeichert", logged: "Für heute eingetragen", deleted: "Gelöscht", linked: "Code zugeordnet",
      saveFailed: "Speichern fehlgeschlagen. Vielleicht ist der Speicher des Handys voll.",
      noCodeFound: "Kein Code auf dem Foto gefunden. Geh näher heran, sodass der Code etwa ein Drittel des Bildes füllt, und halte das Handy ruhig.",
      reading: "Code wird gelesen…", camDenied: "Die Kamera ist nicht verfügbar. Erlaube den Kamerazugriff für diese Seite in den Chrome-Einstellungen oder nutze „Stattdessen Foto aufnehmen“.",
      noScanner: "Dieser Browser kann nicht live scannen. Nutze „Stattdessen Foto aufnehmen“.",
      exported: "Sicherung exportiert", imported: "{n} Geräte importiert", importBad: "Diese Datei ist keine Setcard-Sicherung.",
      persisted: "Speicher: vor automatischem Löschen geschützt.",
      notPersisted: "Speicher: Der Browser kann ihn bei wenig Platz löschen. Installiere die App und exportiere Sicherungen.",
      seat: "Sitz", backRest: "Rückenlehne", remove: "Entfernen", removeSetting: "Einstellung entfernen",
      settingName: "Einstellung", settingValue: "Wert", version: "Version"
    }
  };
  var lang = "en";
  try { lang = localStorage.getItem(LANG_KEY) || ""; } catch (e) { lang = ""; }
  if (!TEXT[lang]) lang = /^de/i.test(navigator.language || "") ? "de" : "en";
  function t(k, vars) {
    var s = (TEXT[lang] && TEXT[lang][k]) || TEXT.en[k] || k;
    if (vars) Object.keys(vars).forEach(function (v) { s = s.replace("{" + v + "}", vars[v]); });
    return s;
  }
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-ph")); el.setAttribute("aria-label", el.placeholder);
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    $("appVersion").textContent = t("version") + " " + APP_VERSION;
    updateStorageNote();
    render();
  }

  /* ---------------- Data ---------------- */
  var db = { version: 1, machines: {} };
  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "null");
      if (raw && raw.machines && typeof raw.machines === "object") db = raw;
    } catch (e) {}
  }
  function persist() { localStorage.setItem(KEY, JSON.stringify(db)); }
  function newId() { return "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function findByCode(code) {
    var ids = Object.keys(db.machines);
    for (var i = 0; i < ids.length; i++) {
      var m = db.machines[ids[i]];
      if ((m.codes || []).indexOf(code) !== -1) return ids[i];
    }
    return null;
  }

  /* ---------------- Helpers ---------------- */
  function fmtDate(ms) {
    if (!ms) return "";
    var d = new Date(ms), opts = { day: "numeric", month: "short" };
    if (d.getFullYear() !== new Date().getFullYear()) opts.year = "numeric";
    return d.toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", opts);
  }
  function fmtWeight(w) { return w ? (lang === "de" ? String(w).replace(".", ",") : String(w)) + " kg" : ""; }
  function loadText(w, s, r) {
    var sr = (s || r) ? (s || "?") + " × " + (r || "?") : "";
    return [fmtWeight(w), sr].filter(Boolean).join(" · ");
  }
  function guessName(text) {
    try {
      var u = new URL(text), segs = u.pathname.split("/").filter(Boolean);
      for (var i = segs.length - 1; i >= 0; i--) {
        var s = decodeURIComponent(segs[i]).replace(/\.(html?|php|aspx?)$/i, "");
        if (/[a-z]{3,}/i.test(s) && !/^[\d-]+$/.test(s)) {
          return s.replace(/[-_+]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        }
      }
    } catch (e) {}
    return "";
  }
  var toastTimer;
  function toast(msg) {
    var el = $("toast"); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.hidden = true; }, 2200);
  }
  function status(msg, isErr) {
    var el = $("status");
    if (!msg) { el.hidden = true; return; }
    el.textContent = msg; el.className = "status" + (isErr ? " err" : ""); el.hidden = false;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------------- List ---------------- */
  function render() {
    var q = $("search").value.trim().toLowerCase();
    var all = Object.keys(db.machines).map(function (id) { return [id, db.machines[id]]; })
      .sort(function (a, b) { return (b[1].updatedAt || 0) - (a[1].updatedAt || 0); });
    var rows = all.filter(function (p) { return !q || (p[1].name || "").toLowerCase().indexOf(q) !== -1; });
    $("count").textContent = all.length ? all.length + " " + (all.length === 1 ? t("machine") : t("machines")) : "";
    $("empty").hidden = all.length > 0;
    var ul = $("list"); ul.textContent = "";
    rows.forEach(function (p) {
      var id = p[0], m = p[1];
      var li = el("li"), b = el("button", "card"); b.type = "button";
      b.append(el("span", "name", m.name || t("unnamed")), el("span", "load num", loadText(m.weight, m.sets, m.reps)));
      var st = (m.settings || []).filter(function (s) { return s.value; }).map(function (s) { return s.label + " " + s.value; }).join(" · ");
      var meta = [st, m.updatedAt ? t("updated") + " " + fmtDate(m.updatedAt) : ""].filter(Boolean).join("  —  ");
      if (meta) b.append(el("span", "meta num", meta));
      b.addEventListener("click", function () { openSheet(id); });
      li.append(b); ul.append(li);
    });
    if (all.length && !rows.length) ul.append(el("li", "note", t("noMatch", { q: $("search").value })));
  }

  /* ---------------- Editor ---------------- */
  var current = null; // {id, isNew, pendingCode}
  function settingRow(s) {
    var r = el("div", "setrow");
    var a = el("input"); a.value = s.label || ""; a.placeholder = t("settingName"); a.setAttribute("aria-label", t("settingName"));
    var v = el("input", "num"); v.value = s.value || ""; v.placeholder = t("settingValue"); v.setAttribute("aria-label", t("settingValue"));
    var x = el("button", null, "✕"); x.type = "button"; x.setAttribute("aria-label", t("removeSetting"));
    x.addEventListener("click", function () { r.remove(); });
    r.append(a, v, x); return r;
  }
  function openSheet(id, opts) {
    opts = opts || {};
    var m = db.machines[id];
    var isNew = !m;
    if (isNew) m = { name: opts.name || "", weight: "", sets: "", reps: "", notes: "", codes: [],
      settings: [{ label: t("seat"), value: "" }, { label: t("backRest"), value: "" }], history: [] };
    current = { id: id, isNew: isNew, pendingCode: opts.code || null };

    $("sheetTitle").textContent = isNew ? t("newMachine") : (m.name || t("unnamed"));
    $("sheetKind").textContent = isNew ? (opts.code ? t("newCode") : t("noCode")) : (m.updatedAt ? t("updated") + " " + fmtDate(m.updatedAt) : "");
    $("fName").value = m.name || ""; $("fWeight").value = m.weight ? fmtWeight(m.weight).replace(" kg", "") : "";
    $("fSets").value = m.sets || ""; $("fReps").value = m.reps || ""; $("fNotes").value = m.notes || "";
    var box = $("settings"); box.textContent = "";
    (m.settings || []).forEach(function (s) { box.append(settingRow(s)); });

    // Link an unknown code to a machine saved earlier
    var others = Object.keys(db.machines);
    $("linkBox").hidden = !(isNew && opts.code && others.length);
    if (!$("linkBox").hidden) {
      var sel = $("linkSelect"); sel.textContent = "";
      others.sort(function (a, b) { return (db.machines[a].name || "").localeCompare(db.machines[b].name || ""); })
        .forEach(function (oid) { var o = el("option", null, db.machines[oid].name || t("unnamed")); o.value = oid; sel.append(o); });
    }

    var h = (m.history || []).slice().reverse();
    $("historyBox").hidden = !h.length;
    var hl = $("history"); hl.textContent = "";
    h.slice(0, 30).forEach(function (e) {
      var li = el("li"); li.append(el("span", null, fmtDate(e.d)), el("span", "num", loadText(e.w, e.s, e.r))); hl.append(li);
    });

    renderCodes(m.codes || []);
    $("delBox").hidden = isNew; $("confirm").hidden = true; $("del").hidden = false;
    $("sheet").hidden = false; $("sheet").scrollTop = 0; document.body.style.overflow = "hidden";
    if (opts.replace && history.state) history.replaceState({ sheet: true }, ""); else history.pushState({ sheet: true }, "");
    if (isNew) setTimeout(function () { $("fName").focus(); }, 60);
  }
  var codesDraft = [];
  function renderCodes(codes) {
    codesDraft = codes.slice();
    var ul = $("codes"); ul.textContent = "";
    $("codesBox").hidden = !codesDraft.length;
    codesDraft.forEach(function (c, i) {
      var li = el("li"), s = el("span", null, c);
      var b = el("button", "ghost small danger", t("remove")); b.type = "button";
      b.addEventListener("click", function () { codesDraft.splice(i, 1); renderCodes(codesDraft); });
      li.append(s, b); ul.append(li);
    });
  }
  function closeSheet(fromPop) {
    if ($("sheet").hidden) return;
    $("sheet").hidden = true; document.body.style.overflow = ""; current = null; render();
    if (!fromPop && history.state && history.state.sheet) history.back();
  }
  function collect() {
    var old = db.machines[current.id] || {};
    var settings = Array.prototype.map.call($("settings").children, function (r) {
      var ins = r.querySelectorAll("input"); return { label: ins[0].value.trim(), value: ins[1].value.trim() };
    }).filter(function (s) { return s.label || s.value; });
    var codes = codesDraft.slice();
    if (current.pendingCode && codes.indexOf(current.pendingCode) === -1) codes.push(current.pendingCode);
    return {
      name: $("fName").value.trim() || t("unnamed"),
      weight: $("fWeight").value.trim().replace(",", "."),
      sets: $("fSets").value.trim(), reps: $("fReps").value.trim(),
      notes: $("fNotes").value.trim(), settings: settings, codes: codes,
      history: (old.history || []).slice(), createdAt: old.createdAt || Date.now(), updatedAt: Date.now()
    };
  }
  function save(log) {
    var d = collect();
    if (log) { d.history.push({ d: Date.now(), w: d.weight, s: d.sets, r: d.reps }); if (d.history.length > 500) d.history = d.history.slice(-500); }
    var prev = db.machines[current.id];
    db.machines[current.id] = d;
    try { persist(); } catch (e) {
      if (prev) db.machines[current.id] = prev; else delete db.machines[current.id];
      toast(t("saveFailed")); return;
    }
    toast(log ? t("logged") : t("saved")); closeSheet();
  }

  /* ---------------- Scanner ---------------- */
  var stream = null, scanning = false, detector = null, scanCanvas = null, track = null;
  function getDetector() {
    if (detector !== null) return Promise.resolve(detector);
    if (!("BarcodeDetector" in window)) { detector = false; return Promise.resolve(false); }
    var wanted = ["qr_code", "ean_13", "ean_8", "code_128", "code_39", "code_93", "upc_a", "upc_e", "itf", "codabar", "data_matrix", "pdf417", "aztec"];
    return BarcodeDetector.getSupportedFormats().then(function (f) {
      var use = wanted.filter(function (w) { return f.indexOf(w) !== -1; });
      detector = use.length ? new BarcodeDetector({ formats: use }) : false;
      return detector;
    }).catch(function () { detector = false; return false; });
  }
  function jsqrFrom(source, w, h, maxSide) {
    if (typeof jsQR !== "function") return null;
    var s = Math.min(1, maxSide / Math.max(w, h));
    scanCanvas = scanCanvas || document.createElement("canvas");
    scanCanvas.width = Math.round(w * s); scanCanvas.height = Math.round(h * s);
    var ctx = scanCanvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(source, 0, 0, scanCanvas.width, scanCanvas.height);
    var data = ctx.getImageData(0, 0, scanCanvas.width, scanCanvas.height);
    var r = jsQR(data.data, scanCanvas.width, scanCanvas.height, { inversionAttempts: "attemptBoth" });
    return r && r.data ? r.data : null;
  }
  function openScanner() {
    status("");
    $("scanner").hidden = false; $("scanMsg").textContent = t("aim"); $("torchBtn").hidden = true;
    history.pushState({ scanner: true }, "");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { $("scanMsg").textContent = t("noScanner"); return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false })
      .then(function (s) {
        if ($("scanner").hidden) { s.getTracks().forEach(function (tr) { tr.stop(); }); return; }
        stream = s; track = s.getVideoTracks()[0];
        var v = $("video"); v.srcObject = s; v.play();
        try { var caps = track.getCapabilities ? track.getCapabilities() : {}; if (caps.torch) $("torchBtn").hidden = false; } catch (e) {}
        scanning = true; getDetector().then(loop);
      })
      .catch(function () { $("scanMsg").textContent = t("camDenied"); });
  }
  var torchOn = false;
  function toggleTorch() {
    if (!track) return;
    torchOn = !torchOn;
    track.applyConstraints({ advanced: [{ torch: torchOn }] }).catch(function () { torchOn = false; });
  }
  function loop() {
    if (!scanning) return;
    var v = $("video");
    if (v.readyState < 2) { setTimeout(loop, 150); return; }
    var p = detector
      ? detector.detect(v).then(function (r) { return r && r[0] ? r[0].rawValue : null; }).catch(function () { return null; })
      : Promise.resolve(jsqrFrom(v, v.videoWidth, v.videoHeight, 720));
    p.then(function (code) {
      if (!scanning) return;
      if (code) { found(code); return; }
      setTimeout(loop, detector ? 120 : 200);
    });
  }
  function stopCamera() {
    scanning = false; torchOn = false;
    if (stream) stream.getTracks().forEach(function (tr) { tr.stop(); });
    stream = null; track = null; $("video").srcObject = null;
  }
  // keep = the scanner's history entry is reused by the editor that opens next
  function closeScanner(fromPop, keep) {
    if ($("scanner").hidden) return;
    stopCamera(); $("scanner").hidden = true;
    if (!fromPop && !keep && history.state && history.state.scanner) history.back();
  }
  function found(code) {
    if (navigator.vibrate) try { navigator.vibrate(60); } catch (e) {}
    closeScanner(false, true);
    handleCode(code, true);
  }
  function handleCode(code, replace) {
    code = String(code).trim();
    var id = findByCode(code);
    if (id) openSheet(id, { replace: replace }); else openSheet(newId(), { code: code, name: guessName(code), replace: replace });
  }
  function decodePhoto(file) {
    return new Promise(function (resolve) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        getDetector().then(function (det) {
          var tryJsqr = function () {
            var sizes = [1000, 1600, 700], out = null;
            for (var i = 0; i < sizes.length && !out; i++) out = jsqrFrom(img, img.naturalWidth, img.naturalHeight, sizes[i]);
            return out;
          };
          var p = det ? det.detect(img).then(function (r) { return r && r[0] ? r[0].rawValue : null; }).catch(function () { return null; }) : Promise.resolve(null);
          p.then(function (code) { URL.revokeObjectURL(url); resolve(code || tryJsqr()); });
        });
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }

  /* ---------------- Backup ---------------- */
  function exportBackup() {
    var data = JSON.stringify({ app: "setcard", version: 1, exportedAt: new Date().toISOString(), machines: db.machines }, null, 2);
    var blob = new Blob([data], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "setcard-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.append(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    toast(t("exported"));
  }
  function importBackup(file) {
    var r = new FileReader();
    r.onload = function () {
      var data;
      try { data = JSON.parse(r.result); } catch (e) { data = null; }
      if (!data || data.app !== "setcard" || !data.machines || typeof data.machines !== "object") { toast(t("importBad")); return; }
      var n = 0;
      Object.keys(data.machines).forEach(function (id) {
        var inc = data.machines[id], have = db.machines[id];
        if (!inc || typeof inc !== "object") return;
        if (!have || (inc.updatedAt || 0) > (have.updatedAt || 0)) { db.machines[id] = inc; n++; }
      });
      try { persist(); } catch (e) { toast(t("saveFailed")); return; }
      render(); toast(t("imported", { n: n }));
    };
    r.readAsText(file);
  }

  /* ---------------- Storage + install ---------------- */
  var persisted = false;
  function updateStorageNote() { $("storageNote").textContent = persisted ? t("persisted") : t("notPersisted"); }
  if (navigator.storage && navigator.storage.persisted) {
    navigator.storage.persisted().then(function (p) {
      persisted = p;
      if (!p && navigator.storage.persist) return navigator.storage.persist().then(function (q) { persisted = q; });
    }).then(updateStorageNote).catch(function () {});
  }
  var installEvt = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); installEvt = e; $("installBox").hidden = false; });
  window.addEventListener("appinstalled", function () { $("installBox").hidden = true; installEvt = null; });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").then(function (reg) {
        function offer(w) {
          $("updateBar").hidden = false;
          $("updateBtn").onclick = function () { w.postMessage("skipWaiting"); };
        }
        if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
        reg.addEventListener("updatefound", function () {
          var w = reg.installing;
          w.addEventListener("statechange", function () { if (w.state === "installed" && navigator.serviceWorker.controller) offer(w); });
        });
      }).catch(function () {});
      var reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", function () { if (!reloaded) { reloaded = true; location.reload(); } });
    });
  }

  /* ---------------- Wiring ---------------- */
  $("scanBtn").addEventListener("click", openScanner);
  $("scanCancel").addEventListener("click", function () { closeScanner(); });
  $("torchBtn").addEventListener("click", toggleTorch);
  $("photo").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0]; e.target.value = ""; if (!f) return;
    closeScanner(false, true); status(t("reading"));
    decodePhoto(f).then(function (code) {
      if (!code) { status(t("noCodeFound"), true); if (history.state && history.state.scanner) history.back(); return; }
      status(""); handleCode(code, true);
    });
  });
  $("search").addEventListener("input", render);
  $("addManual").addEventListener("click", function () { openSheet(newId()); });
  $("close").addEventListener("click", function () { closeSheet(); });
  $("addSetting").addEventListener("click", function () { var r = settingRow({}); $("settings").append(r); r.querySelector("input").focus(); });
  $("save").addEventListener("click", function () { save(false); });
  $("logToday").addEventListener("click", function () { save(true); });
  $("linkBtn").addEventListener("click", function () {
    var target = $("linkSelect").value, code = current && current.pendingCode, m = db.machines[target];
    if (!m || !code) return;
    m.codes = (m.codes || []).concat([code]); m.updatedAt = Date.now();
    try { persist(); } catch (e) { toast(t("saveFailed")); return; }
    toast(t("linked"));
    $("sheet").hidden = true; openSheet(target, { replace: true });
  });
  $("del").addEventListener("click", function () { $("confirm").hidden = false; $("del").hidden = true; });
  $("delNo").addEventListener("click", function () { $("confirm").hidden = true; $("del").hidden = false; });
  $("delYes").addEventListener("click", function () {
    var id = current.id, prev = db.machines[id];
    delete db.machines[id];
    try { persist(); } catch (e) { db.machines[id] = prev; toast(t("saveFailed")); return; }
    toast(t("deleted")); closeSheet();
  });
  $("exportBtn").addEventListener("click", exportBackup);
  $("importFile").addEventListener("change", function (e) { var f = e.target.files && e.target.files[0]; e.target.value = ""; if (f) importBackup(f); });
  $("installBtn").addEventListener("click", function () { if (installEvt) { installEvt.prompt(); installEvt = null; $("installBox").hidden = true; } });
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { lang = b.dataset.lang; try { localStorage.setItem(LANG_KEY, lang); } catch (e) {} applyLang(); });
  });
  // Android back button closes the scanner or editor instead of leaving the app
  window.addEventListener("popstate", function () { closeScanner(true); closeSheet(true); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeScanner(); closeSheet(); } });
  document.addEventListener("visibilitychange", function () { if (document.hidden && !$("scanner").hidden) closeScanner(); });

  load();
  applyLang();
})();
