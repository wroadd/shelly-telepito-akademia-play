# Shelly Telepítő Szimulátor

Ez a repo a Shelly Telepítő Szimulátor publikus, böngészőben futó koncepció oldala.

**Ez most egy koncepció oldal, minden javaslatot, hibajelentést szívesen veszünk.**

Online kipróbálható:

https://wroadd.github.io/shelly-telepito-akademia-play/

## Mi ez?

A Shelly Telepítő Szimulátor egy interaktív oktatási prototípus. A játékos ügyféligények alapján választ Shelly eszközt, helyezi el azt egy alaprajzon, választ automatizálási logikát, majd egyszerűsített bekötési döntéseket hoz.

A cél nem az, hogy valós villanyszerelési tervet adjon, hanem hogy oktatási helyzetben segítse a gondolkodást:

- milyen Shelly eszköz illik az adott igényhez,
- hol van a logikus kötési pont,
- milyen automatizálási logika kell,
- milyen biztonsági és szakmai szempontokra kell figyelni.

## Miért van?

Azért készült, hogy gyorsan kipróbálható legyen egy Shelly telepítői oktató játék koncepciója. A publikus oldal arra való, hogy oktatók, telepítők és érdeklődők megnézzék, kipróbálják, és visszajelzést adjanak.

Különösen érdekel:

- érthető-e a játékmenet,
- jók-e a feladatok,
- hiányzik-e fontos Shelly telepítési helyzet,
- zavaró-e valami a felületen,
- van-e szakmai pontatlanság vagy félreérthető megfogalmazás.

## Visszajelzés

Hibát vagy ötletet itt lehet beküldeni:

https://github.com/wroadd/shelly-telepito-akademia-play/issues/new

Publikus repo:

https://github.com/wroadd/shelly-telepito-akademia-play

## Jelenlegi funkciók

- 6 beépített oktató feladat.
- Shelly eszközválasztás.
- Alaprajzos kötési pont választás.
- Automatizálási logika választás.
- Egyszerűsített vezeték/terminál párosítás.
- `Segítséget kérek` gomb szakmai javaslatokkal.
- Pontozás és teljesített pályák mentése böngészős `localStorage` tárhelyen.
- GitHub Pages-en futó statikus verzió.
- Fejléc linkek hibajelentéshez, ötletekhez és a GitHub repóhoz.

## Fejlesztési roadmap

### Rövid táv

- GitHub issue template-ek hibákhoz, ötletekhez és új feladatjavaslatokhoz.
- Publikus oldal szövegeinek finomítása a visszajelzések alapján.
- Mobil nézet és hozzáférhetőség javítása.
- Több böngészős smoke test a Pages deploy után.
- A GitHub Actions workflow frissítése Node 24 kompatibilis action verziókra.

### Középtáv

- Több oktató feladat valós telepítési helyzetekkel.
- Részletesebb hibavisszajelzés, ne csak siker/sikertelen ellenőrzés legyen.
- Részpontozás eszközválasztásra, helyszínre, automatizálásra és bekötésre.
- Feladat utáni magyarázat és tanulási cél.
- Public README bővítése gyakori kérdésekkel.

### Hosszabb táv

- Több alaprajz és feladattípus.
- Haladó biztonsági és hibakeresési szituációk.
- Oktatói csomagból generált publikus build, hogy a public és private adatok ne sodródjanak el.
- Esetleges többnyelvű verzió.
- Tanulói haladás exportálása vagy oktatói áttekintése.

## Fontos megjegyzés

Ez oktatási célú, egyszerűsített szimulátor. Valós telepítésnél mindig a hivatalos Shelly dokumentáció, a helyi szabványok és szakképzett villanyszerelői ellenőrzés az irányadó.
