# Verbands-Mitgliederliste

Dieses Modul erweitert die Verbands-Mitgliederliste um lokale Sortierungen sowie Filter für Rollen und Aktivität.

## Verwendung

1. Öffne die Verbands-Mitgliederliste.
2. Wähle **Alle Mitgliederseiten laden**, um die vollständige, paginierte Liste zusammenzuführen.
3. Filtere Mitglieder nach Rolle oder Online-Status oder sortiere die zusammengeführte Liste nach Name, Rolle oder Aktivität.

Das vorhandene farbige Aktivitätssymbol bleibt bei jedem Mitglied sichtbar. Das Modul wertet das grüne Symbol als online und die übrigen bekannten Symbolfarben als offline.

::: warning Anfragen
Beim Laden der vollständigen Liste wird für jede noch nicht geladene Mitgliederseite eine authentifizierte Anfrage an dieselbe Domain gesendet. Die Seiten werden nacheinander geladen, damit keine große Anzahl gleichzeitiger Anfragen an den Spielserver gesendet wird.
:::
