const productImages = {
  shelly1: "https://cdn.shopify.com/s/files/1/0887/9941/2565/files/Shelly-1-Mini-Gen3-main-image_1d6bda1b-653f-4f3d-afd3-66fb91ffd874.png?v=1762463482",
  shelly1pm: "https://cdn.shopify.com/s/files/1/0887/9941/2565/files/Shelly-1PM-Mini-Gen3-main-image_ef738519-e8db-43ae-8c7e-9879eb7801c5.png?v=1762463572",
  shelly2pm: "https://cdn.shopify.com/s/files/1/0887/9941/2565/files/Shelly-2PM-Gen4-main-image_6769da1a-b814-406f-8f4f-487ac08461ee.png?v=1757405434",
  bluMotion: "https://cdn.shopify.com/s/files/1/0887/9941/2565/files/Shelly-BLU-Motion-main-image_107a2f20-4d77-4caa-893f-9a35a83db7d6.png?v=1762463553",
  pro4pm: "https://cdn.shopify.com/s/files/1/0887/9941/2565/files/Shelly-Pro-4PM-main-image_85d24dce-f850-4131-b54e-ab92e9a84e8f.png?v=1762463578"
};

const floorplanImage = "./alaprajz.png?v=20260613-24vdc";

const devices = [
  {
    id: "shelly1",
    name: "Shelly 1 Gen3",
    img: productImages.shelly1,
    summary: "1 csatornas szárazkontaktos relé, 110-240 V AC, 24-48 V DC vagy 12 V DC tápellátással.",
    source: "https://us.shelly.com/products/shelly-1-gen3"
  },
  {
    id: "shelly1pm",
    name: "Shelly 1PM Mini Gen3",
    img: productImages.shelly1pm,
    summary: "1 csatornas relé fogyasztásméréssel, világításhoz vagy kisebb készülékhez.",
    source: "https://us.shelly.com/products/shelly-1pm-mini-gen3"
  },
  {
    id: "shelly2pm",
    name: "Shelly 2PM Gen4",
    img: productImages.shelly2pm,
    summary: "2 csatornas kapcsoló fogyasztásméréssel, redőny/cover üzemmóddal és többprotokollos kapcsolattal.",
    source: "https://us.shelly.com/products/shelly-2pm-gen4"
  },
  {
    id: "bluMotion",
    name: "Shelly BLU Motion",
    img: productImages.bluMotion,
    summary: "Bluetooth mozgás- és fényérzékelő; Shelly gateway vagy Plus/Pro/Gen3 átjáró kell hozzá.",
    source: "https://us.shelly.com/products/shelly-blu-motion"
  },
  {
    id: "pro4pm",
    name: "Shelly Pro 4PM",
    img: productImages.pro4pm,
    summary: "DIN-sínes, négycsatornás fogyasztásmérős vezérlő elosztószekrényes munkákhoz.",
    source: "https://us.shelly.com/products/shelly-pro-4pm"
  }
];

const builtinLevels = [
  {
    id: "gate",
    title: "1. Kertkapu és kaputelefon",
    difficulty: "alap",
    client: "A tulajdonos telefonról és a meglévő kaputelefonról is nyitná a 24 V-os kertkaput. Nem akarja, hogy a Shelly ráadja a hálózati fázist a kapumotor bemenetére.",
    needs: ["potenciálmentes kontaktus", "helyi nyomógomb megtartása", "rövid impulzusos nyitás"],
    correctDevice: "shelly1",
    correctAutomation: "pulse",
    correctPoint: "G",
    terminals: ["+", "GND", "I", "O", "SW"],
    correctWiring: { "+": "+24 V DC táp", GND: "0 V DC / GND", I: "kapumotor COM", O: "kapumotor START", SW: "kaputelefon 24 V nyomógomb" },
    safetyChecks: ["24 V DC táp polaritás ellenőrzése", "potenciálmentes kontaktus ellenőrzése", "kaputelefon nyomógomb kompatibilitása a 24 V-os körrel"],
    hint: "A Shelly 24 V DC-ről kap tápot, a relékimenet továbbra is szárazkontaktusos impulzust ad a kapumotor START bemenetére."
  },
  {
    id: "kitchen",
    title: "2. Konyhai fogyasztásfigyelés",
    difficulty: "alap",
    client: "A konyhai pultvilágítás kapcsolható maradjon a fali kapcsolóról, de az ügyfél fogyasztási adatokat is kér a Shelly appban.",
    needs: ["1 kapcsolt világítási kör", "fogyasztásmérés", "meglévő fali kapcsoló"],
    correctDevice: "shelly1pm",
    correctAutomation: "schedule",
    correctPoint: "B",
    terminals: ["L", "N", "O", "SW"],
    correctWiring: { L: "230 V fázis", N: "nulla", O: "lámpaterhelés", SW: "fali kapcsoló" },
    safetyChecks: ["terhelés névleges áram alatt", "nulla vezető megléte a dobozban"],
    hint: "Fogyasztásméréshez PM-es relét válassz, és a lámpa a mért kimeneten legyen."
  },
  {
    id: "shutter",
    title: "3. Nappali redőny",
    difficulty: "alap",
    client: "A nappali redőny legyen százalékosan állítható, reggel automatikusan nyisson, naplemente után zárjon. A motor kétirányú AC redőnymotor.",
    needs: ["fel/le motorirány", "kalibrált pozíció", "időzített automata"],
    correctDevice: "shelly2pm",
    correctAutomation: "cover",
    correctPoint: "C",
    terminals: ["L", "N", "O1", "O2", "S1", "S2"],
    correctWiring: { L: "230 V fázis", N: "nulla", O1: "motor fel", O2: "motor le", S1: "fel kapcsoló", S2: "le kapcsoló" },
    safetyChecks: ["motorirányok reteszelése", "kalibrálás akadálymentes futással"],
    hint: "Két relékimenet kell a két motorirányhoz, nem két külön egycsatornás modul."
  },
  {
    id: "hall",
    title: "4. Előszoba mozgásfény",
    difficulty: "alap",
    client: "Éjjel csak akkor kapcsoljon a folyosó fénye, ha mozgás van és alacsony a fényerő. A falban már van egy Shelly 1PM Mini Gen3.",
    needs: ["mozgásérzékelés", "lux feltétel", "gateway kompatibilitás"],
    correctDevice: "bluMotion",
    correctAutomation: "motionLux",
    correctPoint: "D",
    terminals: ["Sensor", "Gateway", "Action", "Timeout"],
    correctWiring: { Sensor: "BLU Motion", Gateway: "Gen3 eszköz átjáró", Action: "1PM lámpakapcsolás", Timeout: "120 másodperc" },
    safetyChecks: ["átjáró hatótáv ellenőrzése", "kézi kapcsolás megtartása"],
    hint: "A BLU szenzor nem közvetlenül Wi-Fi-s; kell egy kompatibilis Shelly átjáró."
  },
  {
    id: "pro-office",
    title: "5. Kis iroda DIN-sínes körök",
    difficulty: "haladó",
    client: "Egy kis iroda négy világítási körét szeretnék központilag mérni és vezérelni az elosztószekrényből. A körök külön kismegszakítókon vannak, de az ügyfél egyetlen DIN-sínes eszközt kér.",
    needs: ["4 kapcsolt áramkör", "DIN-sínes szerelés", "csatornánkénti fogyasztásmérés"],
    correctDevice: "pro4pm",
    correctAutomation: "fourCircuit",
    correctPoint: "E",
    terminals: ["L", "N", "O1", "O2", "O3", "O4"],
    correctWiring: { L: "elosztó fázis", N: "elosztó nulla", O1: "iroda világítás 1", O2: "iroda világítás 2", O3: "tárgyaló világítás", O4: "közlekedő világítás" },
    safetyChecks: ["csatornánkénti terhelés ellenőrzése", "közös nulla és védelmi eszközök áttekintése", "elosztószekrény feliratozás"],
    hint: "Itt a Pro 4PM adja a DIN-sínes, többcsatornás és mérhető megoldást."
  },
  {
    id: "three-phase",
    title: "6. Műhely háromfázisú elosztás",
    difficulty: "haladó",
    client: "A műhelyben három fázisról mennek a nagyobb fogyasztók, de az ügyfél csak külön világítási és aljzat csoportok fogyasztását akarja figyelni, nem motorindítást vezérelni. A cél a túlterhelési kockázatok felismerése.",
    needs: ["elosztószekrényes monitoring", "fázisonkénti gondolkodás", "túlterhelési kockázat jelzése"],
    correctDevice: "pro4pm",
    correctAutomation: "safetyAudit",
    correctPoint: "F",
    terminals: ["L1", "L2", "L3", "N", "O1", "O2"],
    correctWiring: { L1: "műhely L1", L2: "műhely L2", L3: "műhely L3", N: "elosztó nulla", O1: "világítási csoport", O2: "aljzat monitoring" },
    safetyChecks: ["fázisterhelések összevetése", "hiányzó nulla kizárása", "védelmi készülékek méretezésének ellenőrzése"],
    hint: "A haladó pályán nem csak kapcsolni kell: a fázisterhelést és a védelmi határokat is értékelni kell."
  }
];

const automations = [
  { id: "pulse", name: "Impulzusos relé", desc: "0,5-1 mp zárás kapuhoz vagy ajtóhoz." },
  { id: "schedule", name: "Időzítés + mérés", desc: "Kapcsolás megtartva, fogyasztási grafikonokkal." },
  { id: "cover", name: "Redőny/cover mód", desc: "Fel/le irány, kalibrálás, százalékos pozíció." },
  { id: "motionLux", name: "Mozgás + lux", desc: "Csak sötétben indít jelenetet, majd lekapcsol." },
  { id: "fourCircuit", name: "4 áramkör DIN-ről", desc: "Elosztószekrényes többzónás vezérlés." },
  { id: "safetyAudit", name: "Terhelés audit", desc: "Fázisok, nulla és védelmi határok ellenőrzése." },
  { id: "wrongScene", name: "Mindig bekapcsol", desc: "Feltétel nélküli jelenet, kezdő hiba." }
];

const baseWireOptions = [
  "230 V fázis",
  "nulla",
  "+24 V DC táp",
  "0 V DC / GND",
  "kapumotor COM",
  "kapumotor START",
  "kaputelefon 24 V nyomógomb",
  "lámpaterhelés",
  "fali kapcsoló",
  "motor fel",
  "motor le",
  "fel kapcsoló",
  "le kapcsoló",
  "BLU Motion",
  "Gen3 eszköz átjáró",
  "1PM lámpakapcsolás",
  "120 másodperc",
  "elosztó fázis",
  "elosztó nulla",
  "iroda világítás 1",
  "iroda világítás 2",
  "tárgyaló világítás",
  "közlekedő világítás",
  "műhely L1",
  "műhely L2",
  "műhely L3",
  "világítási csoport",
  "aljzat monitoring"
];

const installPoints = [
  { id: "G", label: "G", name: "Kertkapu kötési hely", className: "point-g" },
  { id: "A", label: "A", name: "Nappali redőnykapcsoló", className: "point-a" },
  { id: "B", label: "B", name: "Konyhai kapcsoló", className: "point-b" },
  { id: "C", label: "C", name: "Előtér érzékelő", className: "point-c" },
  { id: "D", label: "D", name: "Hálószoba kötési pont", className: "point-d" },
  { id: "E", label: "E", name: "Elosztószekrény DIN", className: "point-e" },
  { id: "F", label: "F", name: "Műhely elosztás", className: "point-f" }
];

const storageKey = "shellyAcademyProfile.v2";

function cloneLevels(levels) {
  return JSON.parse(JSON.stringify(levels));
}

function validateSolution(level, attempt) {
  const mistakes = [];
  const wiring = attempt.wiring || {};
  const deviceOk = attempt.selectedDevice === level.correctDevice;
  const automationOk = attempt.selectedAutomation === level.correctAutomation;
  const pointOk = attempt.placedPoint === level.correctPoint;
  const wiringOk = level.terminals.every((terminal) => wiring[terminal] === level.correctWiring[terminal]);

  if (!deviceOk) mistakes.push("az eszköztípus nem illik az igényhez");
  if (!automationOk) mistakes.push("az automatizálási logika nem teljesíti a briefet");
  if (!pointOk) mistakes.push("a telepítési pont nincs jó helyen az alaprajzon");
  if (!wiringOk) mistakes.push("a vezeték-útvonalak között van hiba");

  return {
    ok: mistakes.length === 0,
    mistakes,
    checks: { deviceOk, automationOk, pointOk, wiringOk }
  };
}

function serializeProfile(profile) {
  return JSON.stringify({
    playerName: profile.playerName || "Telepítő",
    score: Number(profile.score) || 0,
    solved: Array.from(profile.solved || []),
    levelIndex: Number(profile.levelIndex) || 0
  });
}

function deserializeProfile(value) {
  try {
    const data = typeof value === "string" ? JSON.parse(value) : value || {};
    return {
      playerName: typeof data.playerName === "string" && data.playerName.trim() ? data.playerName : "Telepítő",
      score: Number.isFinite(Number(data.score)) ? Number(data.score) : 0,
      solved: new Set(Array.isArray(data.solved) ? data.solved : []),
      levelIndex: Number.isFinite(Number(data.levelIndex)) ? Number(data.levelIndex) : 0
    };
  } catch {
    return { playerName: "Telepítő", score: 0, solved: new Set(), levelIndex: 0 };
  }
}

function normalizeLevel(raw, index) {
  const required = ["id", "title", "client", "needs", "correctDevice", "correctAutomation", "correctPoint", "terminals", "correctWiring", "hint"];
  const missing = required.filter((field) => raw[field] === undefined || raw[field] === null || raw[field] === "");

  if (missing.length > 0) {
    return { error: `A(z) ${index + 1}. pályából hiányzik: ${missing.join(", ")}.` };
  }

  if (!Array.isArray(raw.needs) || !Array.isArray(raw.terminals)) {
    return { error: `A(z) ${index + 1}. pályán a needs és terminals mező tömb kell legyen.` };
  }

  const wiringKeys = Object.keys(raw.correctWiring || {});
  const missingTerminals = raw.terminals.filter((terminal) => !wiringKeys.includes(terminal));
  if (missingTerminals.length > 0) {
    return { error: `A(z) ${index + 1}. pályán nincs bekötés ezekhez: ${missingTerminals.join(", ")}.` };
  }

  return {
    level: {
      id: String(raw.id),
      title: String(raw.title),
      difficulty: raw.difficulty ? String(raw.difficulty) : "egyedi",
      client: String(raw.client),
      needs: raw.needs.map(String),
      correctDevice: String(raw.correctDevice),
      correctAutomation: String(raw.correctAutomation),
      correctPoint: String(raw.correctPoint),
      terminals: raw.terminals.map(String),
      correctWiring: Object.fromEntries(Object.entries(raw.correctWiring).map(([key, value]) => [String(key), String(value)])),
      safetyChecks: Array.isArray(raw.safetyChecks) ? raw.safetyChecks.map(String) : [],
      hint: String(raw.hint)
    }
  };
}

function parseCourseJson(text) {
  try {
    const parsed = JSON.parse(text);
    if (!parsed || !Array.isArray(parsed.levels) || parsed.levels.length === 0) {
      return { ok: false, errors: ["A JSON gyökérben legalább egy pályát tartalmazó levels tömb kell."] };
    }

    const results = parsed.levels.map(normalizeLevel);
    const errors = results.filter((item) => item.error).map((item) => item.error);
    if (errors.length > 0) return { ok: false, errors };

    return { ok: true, levels: results.map((item) => item.level) };
  } catch (error) {
    return { ok: false, errors: [`Érvénytelen JSON: ${error.message}`] };
  }
}

const exportedApi = {
  productImages,
  devices,
  builtinLevels,
  automations,
  baseWireOptions,
  installPoints,
  validateSolution,
  serializeProfile,
  deserializeProfile,
  parseCourseJson
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = exportedApi;
}

if (typeof window !== "undefined") {
  window.ShellyAcademy = exportedApi;
}

if (typeof document !== "undefined") {
  boot();
}

function boot() {
  const savedProfile = typeof localStorage !== "undefined" ? deserializeProfile(localStorage.getItem(storageKey)) : deserializeProfile();
  const state = {
    levels: cloneLevels(builtinLevels),
    levelIndex: Math.min(savedProfile.levelIndex, builtinLevels.length - 1),
    selectedDevice: null,
    selectedAutomation: null,
    placedPoint: null,
    wiring: {},
    selectedWireSource: null,
    playerName: savedProfile.playerName,
    score: savedProfile.score,
    solved: savedProfile.solved,
    feedback: "Válassz szintet, olvasd el az ügyféligényt, majd helyezd el az eszközt és húzd be a vezetékeket.",
    courseMessage: "A beépített akadémiai pályák aktívak.",
    courseJson: ""
  };

  function currentLevel() {
    return state.levels[state.levelIndex];
  }

  function saveProfile() {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(storageKey, serializeProfile(state));
  }

  function resetAttempt(message = "A munkalapot visszaállítottad. Próbáld új megközelítéssel.") {
    state.selectedDevice = null;
    state.selectedAutomation = null;
    state.placedPoint = null;
    state.wiring = {};
    state.selectedWireSource = null;
    state.feedback = message;
  }

  function setLevel(index) {
    state.levelIndex = index;
    resetAttempt("Új munkalap betöltve. Először az ügyfél igényét fordítsd le eszköz-, helyszín- és automatizálási döntésre.");
    saveProfile();
    render();
  }

  function selectDevice(id) {
    state.selectedDevice = id;
    state.feedback = "Eszköz kijelölve. Dobd az alaprajz megfelelő pontjára, vagy kattints egy telepítési pontra.";
    render();
  }

  function placeDevice(pointId, deviceId = state.selectedDevice) {
    if (!deviceId) {
      state.feedback = "Előbb válassz ki egy Shelly eszközt a katalógusból.";
      render("bad");
      return;
    }
    state.selectedDevice = deviceId;
    state.placedPoint = pointId;
    state.feedback = `Eszköz elhelyezve: ${pointId} pont. Most válassz automatizálást és kösd be a terminálokat.`;
    render();
  }

  function selectAutomation(id) {
    state.selectedAutomation = id;
    render();
  }

  function selectWireSource(source) {
    state.selectedWireSource = source;
    state.feedback = `Vezetékforrás kijelölve: ${source}. Kattints egy terminálra vagy dobd rá.`;
    render();
  }

  function connectWire(terminal, source = state.selectedWireSource) {
    if (!source) {
      state.feedback = "Előbb válassz vagy húzz egy vezetékforrást.";
      render("bad");
      return;
    }
    state.wiring[terminal] = source;
    state.selectedWireSource = null;
    render();
  }

  function clearWire(terminal) {
    delete state.wiring[terminal];
    render();
  }

  function checkSolution() {
    const result = validateSolution(currentLevel(), {
      selectedDevice: state.selectedDevice,
      selectedAutomation: state.selectedAutomation,
      placedPoint: state.placedPoint,
      wiring: state.wiring
    });

    if (result.ok) {
      const firstSolve = !state.solved.has(currentLevel().id);
      state.solved.add(currentLevel().id);
      state.score += firstSolve ? 250 : 40;
      state.feedback = `Sikeres átadás. ${currentLevel().hint} A rendszer tesztelve, a szint teljesítve.`;
      saveProfile();
    } else {
      state.score = Math.max(0, state.score - 35);
      state.feedback = `Ellenőrzés sikertelen: ${result.mistakes.join(", ")}. TIPP: ${currentLevel().hint}`;
      saveProfile();
    }
    render(result.ok ? "good" : "bad");
  }

  function resetProgress() {
    state.score = 0;
    state.solved = new Set();
    state.levelIndex = 0;
    resetAttempt("A játékosprofil és pontszám törölve.");
    saveProfile();
    render();
  }

  function importCourse() {
    const textarea = document.querySelector("#course-json");
    state.courseJson = textarea.value;
    const result = parseCourseJson(textarea.value);
    if (!result.ok) {
      state.courseMessage = result.errors.join(" ");
      render("bad");
      return;
    }
    state.levels = result.levels;
    state.levelIndex = 0;
    state.solved = new Set();
    resetAttempt("Egyedi pályacsomag betöltve. A pontozás új pályasorhoz indult.");
    state.courseMessage = `${result.levels.length} importált pálya aktív.`;
    saveProfile();
    render("good");
  }

  function resetCourse() {
    state.levels = cloneLevels(builtinLevels);
    state.levelIndex = 0;
    resetAttempt("Visszaállítottad a beépített Shelly Akadémia pályákat.");
    state.courseMessage = "A beépített akadémiai pályák aktívak.";
    state.courseJson = "";
    saveProfile();
    render();
  }

  function exportCourse() {
    state.courseJson = JSON.stringify({ levels: state.levels }, null, 2);
    state.courseMessage = "Az aktuális pályacsomag kimásolható a szerkesztőből.";
    render();
  }

  function setPlayerName(value) {
    state.playerName = value.trim() || "Telepítő";
    saveProfile();
  }

  function wireSourcesFor(level) {
    const correct = Object.values(level.correctWiring);
    const distractors = baseWireOptions.filter((option) => !correct.includes(option)).slice(0, Math.max(4, 10 - correct.length));
    return [...new Set([...correct, ...distractors])];
  }

  function render(status = "") {
    const current = currentLevel();
    const app = document.querySelector("#app");
    const selectedDevice = devices.find((device) => device.id === state.selectedDevice);
    const placedDevice = devices.find((device) => device.id === state.selectedDevice && state.placedPoint);

    app.innerHTML = `
      <header class="topbar">
        <div class="brand">
          <h1>Shelly Telepítő Akadémia</h1>
          <p>Interaktív okosotthon telepítő szimulátor Shelly termékadatokra építve</p>
        </div>
        <div class="hud" aria-label="Játék állapot">
          <label class="profile-name">
            <span>Játékos</span>
            <input id="player-name" value="${escapeHtml(state.playerName)}" maxlength="28">
          </label>
          <div class="hud-pill"><span>Pontszám</span><strong>${state.score}</strong></div>
          <div class="hud-pill"><span>Szint</span><strong>${state.levelIndex + 1}/${state.levels.length}</strong></div>
          <div class="hud-pill"><span>Átadás</span><strong>${state.solved.size}</strong></div>
        </div>
      </header>

      <section class="workspace">
        <aside class="panel">
          <h2>Ügyféligény</h2>
          <div class="level-list">
            ${state.levels.map((item, index) => `
              <button class="level-button ${index === state.levelIndex ? "active" : ""}" data-level="${index}">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.difficulty || "alap")}</span>
              </button>
            `).join("")}
          </div>
          <div class="brief">
            <p>${escapeHtml(current.client)}</p>
            <ul>${current.needs.map((need) => `<li>${escapeHtml(need)}</li>`).join("")}</ul>
          </div>
          <div class="safety-list">
            <h3>Biztonsági fókusz</h3>
            <ul>${(current.safetyChecks || []).map((check) => `<li>${escapeHtml(check)}</li>`).join("")}</ul>
          </div>
        </aside>

        <div class="main-column">
          <section class="floorplan">
            <h2>Helyszínrajz és eszközelhelyezés</h2>
            <div class="map" role="img" aria-label="Lakás alaprajz helyiségekkel és kötési pontokkal">
              <img class="floorplan-image" src="${floorplanImage}" alt="Lakás alaprajz: tároló, WC, előtér, nappali, konyha és hálószoba">
              <div class="room label-storage">Tároló</div>
              <div class="room label-wc">WC</div>
              <div class="room label-hall">Előtér</div>
              <div class="room label-living">Nappali</div>
              <div class="room label-kitchen">Konyha</div>
              <div class="room label-bedroom">Hálószoba</div>
              <div class="room label-gate">Kertkapu</div>
              ${installPoints.map((point) => `
                <button class="install-point ${point.className} ${state.placedPoint === point.id ? "occupied" : ""}" data-point="${point.id}" aria-label="${escapeHtml(point.name)}">
                  <span>${point.label}</span>
                  ${state.placedPoint === point.id && placedDevice ? `<small>${escapeHtml(placedDevice.name.replace("Shelly ", ""))}</small>` : ""}
                </button>
              `).join("")}
            </div>
            <div class="placement-status">
              ${state.placedPoint ? `Elhelyezés: ${escapeHtml(selectedDevice?.name || "eszköz")} -> ${state.placedPoint} pont` : "Válassz eszközt, majd dobd vagy kattintsd az alaprajz megfelelő pontjára."}
            </div>
          </section>

          <section class="panel automation-panel">
            <h2>Automatizálás</h2>
            <div class="automation-grid">
              ${automations.map((automation) => `
                <button class="choice ${state.selectedAutomation === automation.id ? "selected" : ""}" data-automation="${automation.id}">
                  <strong>${escapeHtml(automation.name)}</strong>
                  <span>${escapeHtml(automation.desc)}</span>
                </button>
              `).join("")}
            </div>
          </section>
        </div>

        <aside class="panel">
          <h2>Eszközválasztás</h2>
          <div class="catalog">
            ${devices.map((device) => `
              <button class="device-card ${state.selectedDevice === device.id ? "selected" : ""}" data-device="${device.id}" draggable="true">
                <img src="${device.img}" alt="${escapeHtml(device.name)}">
                <span>
                  <h3>${escapeHtml(device.name)}</h3>
                  <p>${escapeHtml(device.summary)}</p>
                </span>
              </button>
            `).join("")}
          </div>
          <div class="source-list">
            ${selectedDevice ? `Forrás: <a href="${selectedDevice.source}" target="_blank" rel="noreferrer">${escapeHtml(selectedDevice.name)}</a>` : "Válassz eszközt a hivatalos forrás megnyitásához."}
          </div>
        </aside>
      </section>

      <section class="workspace lower-workspace">
        <section class="panel instructor-panel">
          <h2>Oktatói import</h2>
          <textarea id="course-json" spellcheck="false" placeholder='{"levels":[...]}'>${escapeHtml(state.courseJson)}</textarea>
          <div class="actions compact-actions">
            <button class="secondary" id="export-course">Export</button>
            <button class="primary" id="import-course">Import</button>
            <button class="secondary" id="reset-course">Alap pályák</button>
          </div>
          <p class="source-list">${escapeHtml(state.courseMessage)}</p>
        </section>

        <section class="wiring">
          <h2>Vezeték-húzás</h2>
          <div class="wire-board">
            <div class="wire-bank" aria-label="Vezetékforrások">
              ${wireSourcesFor(current).map((source) => `
                <button class="wire-chip ${state.selectedWireSource === source ? "selected" : ""}" data-wire-source="${escapeHtml(source)}" draggable="true">${escapeHtml(source)}</button>
              `).join("")}
            </div>
            <div class="terminal-grid">
              ${current.terminals.map((terminal) => `
                <div class="terminal-drop ${state.wiring[terminal] ? "wired" : ""}" data-terminal="${escapeHtml(terminal)}">
                  <label>${escapeHtml(terminal)}</label>
                  <button class="terminal-target" data-terminal-target="${escapeHtml(terminal)}">
                    ${state.wiring[terminal] ? escapeHtml(state.wiring[terminal]) : "ide húzd"}
                  </button>
                  ${state.wiring[terminal] ? `<button class="clear-wire" data-clear-wire="${escapeHtml(terminal)}" aria-label="${escapeHtml(terminal)} törlése">×</button>` : ""}
                </div>
              `).join("")}
            </div>
          </div>
          <div class="actions">
            <button class="primary" id="check">Tesztelés</button>
            <button class="secondary" id="reset">Újratervezés</button>
            <button class="secondary" id="reset-progress">Profil törlése</button>
          </div>
          <div class="feedback ${status}">${escapeHtml(state.feedback)}</div>
        </section>

        <aside class="panel">
          <h2>Terv</h2>
          <p class="source-list">
            1. Értelmezd az ügyféligényt.<br>
            2. Válassz Shelly eszközt.<br>
            3. Helyezd el az alaprajzon.<br>
            4. Adj meg automatizálási logikát.<br>
            5. Húzd be a vezetékeket.<br>
            6. Tesztelj, javíts, ments profilt.
          </p>
        </aside>
      </section>
    `;

    bindEvents();
  }

  function bindEvents() {
    document.querySelector("#player-name").addEventListener("change", (event) => setPlayerName(event.target.value));

    document.querySelectorAll("[data-level]").forEach((button) => {
      button.addEventListener("click", () => setLevel(Number(button.dataset.level)));
    });
    document.querySelectorAll("[data-device]").forEach((button) => {
      button.addEventListener("click", () => selectDevice(button.dataset.device));
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", button.dataset.device);
        selectDevice(button.dataset.device);
      });
    });
    document.querySelectorAll("[data-point]").forEach((button) => {
      button.addEventListener("click", () => placeDevice(button.dataset.point));
      button.addEventListener("dragover", (event) => event.preventDefault());
      button.addEventListener("drop", (event) => {
        event.preventDefault();
        placeDevice(button.dataset.point, event.dataTransfer.getData("text/plain"));
      });
    });
    document.querySelectorAll("[data-automation]").forEach((button) => {
      button.addEventListener("click", () => selectAutomation(button.dataset.automation));
    });
    document.querySelectorAll("[data-wire-source]").forEach((button) => {
      button.addEventListener("click", () => selectWireSource(button.dataset.wireSource));
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", button.dataset.wireSource);
      });
    });
    document.querySelectorAll("[data-terminal-target]").forEach((button) => {
      button.addEventListener("click", () => connectWire(button.dataset.terminalTarget));
      button.addEventListener("dragover", (event) => event.preventDefault());
      button.addEventListener("drop", (event) => {
        event.preventDefault();
        connectWire(button.dataset.terminalTarget, event.dataTransfer.getData("text/plain"));
      });
    });
    document.querySelectorAll("[data-clear-wire]").forEach((button) => {
      button.addEventListener("click", () => clearWire(button.dataset.clearWire));
    });
    document.querySelector("#check").addEventListener("click", checkSolution);
    document.querySelector("#reset").addEventListener("click", () => {
      resetAttempt();
      render();
    });
    document.querySelector("#reset-progress").addEventListener("click", resetProgress);
    document.querySelector("#import-course").addEventListener("click", importCourse);
    document.querySelector("#reset-course").addEventListener("click", resetCourse);
    document.querySelector("#export-course").addEventListener("click", exportCourse);
  }

  render();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
