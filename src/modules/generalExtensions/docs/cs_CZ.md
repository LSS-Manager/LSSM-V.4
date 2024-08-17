Místo toho, aby se pro každý sebemenší nápad vytvářel samostatný modul, což je sice možné, ale obecně nedává smysl, nabízíme zde sbírku funkcí, které se nedostaly do vlastního modulu.

Každou z následujících funkcí lze individuálně aktivovat nebo deaktivovat v nastavení. Zde je přehled každého nastavení:

## Klikatelné odkazy

URL, které je zobrazen jako prostý text (např. v chatu, fóru, zprávách, atd.), bude předělán na klikací. Automaticky se otevře v nové kartě.

### Aktivovat náhled obrázků
*Funguje pouze v kombinaci s `Klikatelné odkazy`*

Někdy chcete jednoduše vložit obrázek do fóra, chatu nebo jinam.
Zde si můžete aktivovat alespoň náhled obrázku.
Kliknutím se pak obrázek otevře v novém panelu.

:::warning Náhledy obrázků
Funguje pouze přímý odkaz na obrázek!
:::

## Náhled odkazů

Někdy chcete jen stručnou informaci o např. o budově nebo uživateli, aniž byste přímo otevřeli odkaz. 
K tomu lze aktivovat naše náhledy odkazů v nastavení:

![Nastavení pro náhledy odkazů](./linkPreview_setting.png)

Zde je pár ukázek:

### Budovy

![Náhled budovy](./linkPreview_building.png)

### Vozidla

![Náhled vozidla](./linkPreview_vehicle.png)

### Hráči

:::warning Hráči
Tato funkce je stále ve vývoji. Proto zde zatím není žádný obrázek.
:::

### Mise

:::warning Mise
Tato funkce je stále ve vývoji. Proto zde zatím není žádný obrázek.
:::

## Uložit historii "Hledání lokace"

:::warning Typ mapy "Mapkit"
Toto nastavení bohužel zatím není kompatibilní s typem mapy Mapkit!
:::

Tato funkce ukládá místa (souřadnice), která jste vyhledávali v textovém poli "Hledání lokace". Tyto místa jsou uložena po kliknutí na malé tlačítko vpravo nahoře na mapě:

![Historie hledání lokace](./mapUndo.png)

Pokud myš chvíli necháte na příslušné adrese, zobrazí se na mapě, ale až po kliknutí se mapa přesune nastálo na tuto pozici.

<!-- markdownlint-disable link-fragments -->

Záznamy zmizí po obnovení stránky a nejsou perzistentní! Pro trvalé pozice použijte prosím [Záložky pro mapu](#záložky-pro-mapu)

<!-- markdownlint-enable link-fragments -->

## Záložky pro mapu

:::warning Typ mapy "Mapkit"
Toto nastavení bohužel zatím není kompatibilní s typem mapy Mapkit!
:::

<!-- markdownlint-disable link-fragments -->

Touto funkcí si můžete ručně nastavit záložky na mapě.
Tato funkce funguje velmi podobně jako [Uložit historii "Hledání lokace"](#uložit-historii-hledání-lokace) s tím rozdílem, že záložky nastavujete sami a zůstanou i po obnovení stránky.

<!-- markdownlint-enable link-fragments -->

## Název záložky prohlížeče

S touto funkcí se přepíše název karty prohlížeče, na název okna hry ve které se právě nacházíte. Zde je malý příklad:

![Název karty prohlížeče u vozidla](./browsertitle.png)

## Výběr Emoji

Potřebujete jednoduchý, ale dobře fungující okno pro výběr emoji? Nabízíme vám ho!

Stačí zadat dvojtečku `:` v libovolném textovém poli a začít psát. Po 500 ms, kdy nebudete stiskávat žádné klávesy, se zobrazí návrhy emoji. Kliknutím na návrh se odpovídající emoji vloží. 
Všimněte si, že aktuálně se pro vyhledávání používají pouze oficiální názvy emoji, např. `slightly_smiling_face` pro `🙂`. 
Nejdůležitější názvy si jistě rychle zapamatujete 😉

![Výběr Emoji](./emojipicker.png)

:::tip Výběr pomocí klávesnice
Pomocí kláves `←` a `→` můžete procházet návrhy a stisknutím `Enter` je vložit. Takže vás nenutíme používat tu podivnou věc zvanou "myš" 😜
:::

Jako další funkce se automaticky nahrazují tzv. běžné zkratky. Například `;)` se změní na `😉`, jakmile za ním zadáte mezeru.

## Zapamatování typu budovy

Toto nastavení udrží v nabídce "Nová budova" vybraný typ budovy, který jste naposledy použili. Pokud stavíte mnoho budov jednoho typu, ušetříte si tím jeden klik.

## Zapamatování operačního střediska

<!-- markdownlint-disable link-fragments -->

Funguje podobně jako [Zapamatování typu budovy](#zapamatování-typu-budovy), ale pro výběr operačního střediska.

<!-- markdownlint-enable link-fragments -->

## Vylepšený stav 5

Také vás štve, při převozu, když kliknete na „přejít k misi“ není požadavek ve vysílačce dokončen?

Toto malé rozšíření opravuje právě to.

## Vyhledávání míst na mapě

Je vaše navigační lišta trochu přeplněná?

Toto nastavení přesune textové pole "Hledání lokace" z navigační lišty na mapu. Pozici si můžete zvolit v nastavení. Kliknutím na lupu otevřete a zavřete okno pro zadávání.

![Vyhledávání míst na mapě](./mapsearch.png)

## PNV export jako QR kód

Chcete rychle sdílet své "Pravidla Nouzových Výjezdů" (PNV)? S tímto nastavením bude přímo pod vytvořeným exportním odkazem vygenerován QR kód. 
Tento kód lze buď přímo naskenovat z obrazovky, nebo stáhnout jako obrázek a mít ho tak vždy po ruce.
