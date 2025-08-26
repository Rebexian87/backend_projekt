# REST API 
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera en restaurang med dess olika menydelar, användare, kontakt- och omdömesformulär.
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad. Denna READme-fil är anpassad från exemplet: https://github.com/MallarMiun/Exempel_README_till_API/. 


## Installation, databas
APIet använder en MySQL-databas.
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. 
Ett exempel på vad installations-skriptet kan skapa för databastabell enligt nedanstående, denna kod är bortkommenterad men man kan göra den aktiv om man vill.
|Tabell-namn|Fält  |
|--|--|
|Tabell1  | **id** (int, **fält1** (varchar(35), **fält2** (integer,  **fält3** (varchar(35) |

## Användning
Nedan är ett exempel på hur man når API:et på olika vis.

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/starters    |Hämtar alla tillgängliga arbetslivserfarenheter.                                      |
|POST   |/starters    |Lagrar en ny arbetslivserfarenhet.                                                    |
|PUT    |/starters/:ID |Uppdaterar en existerande arbetslivserfarenhet med angivet ID.                        |
|DELETE |/starters/:ID |Raderar en arbetslivserfarenhet med angivet ID.                                       |
|GET |/starters/:ID |Hämtar en tillgängliga arbetslivserfarenheter.                                       |

Ett objekt returneras/skickas som JSON med följande struktur:
```
{
    "id": 0,
    "sName": "Räkmacka",
    "sPrice": 159,
    "sDescription": "En rågmacka med räkor och majonäs"
}
```

