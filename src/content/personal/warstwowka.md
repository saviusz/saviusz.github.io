---
title: Uczelnia miała rację
publishedAt: 2025-09-10
publishedBy: Seweryn
tags: [tech, programowanie]
---

Od dłuższego czasu tworzę aplikację śpiewnika. Niby coś potencjalnie prostego.
Zwykły CRUD. Jednak projekt powstaje już tyle czasu[^1], że zacząłem go
w głowie, po cichu nazywać porażką.

## Skąd to zwątpienie

Melon, bo tak go nazywam, zaczynałem już ze 4 razy. Za każdym zastanawiałem się
co jest nie tak. Próbowałem zmieniać język, strukturę. Przejść na całkowicie
funkcyjne podejście. Ale to nic nie dawało - za każdym razem projekt robił się
zbyt zagmatwany, a rzadko przekraczał rozmiarem 4 endpointy.

W jednym podejściu wymyśliłem nawet bibliotekę[^2], która miała zrewolucjonizować backend i, przede wszytkim, pozwolić mi skończyć Melon.
Pomysł bardzo prosty - niech elementy zwrotne będą komponentami, możliwymi
do wzajemnego zagnieżdżenia. Genialny pomysł, z tym że...

## To wszystko nie miało sensu

Największych problemów nastręczało mi układanie zależności. Chciałem testować,
a to jest możliwe niemalże wyłącznie, przekazując zależności z góry,
"odwracając sterowanie".

```ts
/** Zwykłe sterowanie **/
import { subsystem } from "subsystem";
function foo() {
  subsystem.bar();
}

foo();

/** Przykładowe odwrócenie sterowania, poprzez Dependency Injection **/

function foo(subsystem) {
  subsystem.bar();
}

const system = new Subsystem();
foo(system);
```

W powyższym kodzie zwróć uwagę na to, że przy zwykłym sterowaniu nie jesteśmy
w stanie podmienić subsystemu na nic innego. Twstowanie jest więc niemożliwe.

Problem niby rozwiązany. Teraz już tylko dodawajmy kolejne subsystemy...
I kolejne... I kolejne...

## Naprawdę rozległe drzewo

W końcu okazuje się, że definicja funkcji oprócz argumentów, pobiera
parenaście innych argumentów, odpowiadających innym (nie zawsze koniecznym)
subsystemom.

Gdyby sam widok tego Cię nie denerwował, to wyobraź sobie, że wywołanie jednej
funkcji z drugiej wymagało by albo przekazania jej wszystkich tych argumentów
(i dodania brakujących), albo przekazanie całej funkcji z już ustawionymi
argumentami.

Ten drugi pomysł wydaje się całkiem dobry. Tak długo, jak nie stworzysz
funkcji zagnieżdżonej kilka poziomów. Wtedy przez wszystkie te poziomy musi
przechodzić ten sam argument

## A co gdyby przekazywać tylko jeden argument?

I na tym polega sedno sprawy. Można stworzyć taki obiekt, który będzie
zarządzał wszystkimi zależnościami. Możemy go wtedy po prostu przekazywać do wszystkich funkcji i wyciągać sobie z niego to, co potrzebne. Super rozwiązanie

W ten sposób właściwie nie musimy wcale zastanawiać się nad
tym, że system jest API. Możemy przecież zacząć od środka i dopiero potem dodać
cienką warstwę tłumaczącą z Requestów na funkcje.

## Wielka prawda
Pewnie to podejście wydaje Ci się całkiem znajome. Okazuje się, że na studiach
wykorzystywaliśmy niemalże dokładnie wszystko, co tu poruszyliśmy.

Niektóre rzeczy załatwialiśmy klasami, które łączyły parę funkcji, ale w
gruncie rzeczy to było wszystko to samo

### P.S.
Jeśli tekst wydaje Ci się trochę niekompletny, to pewnie dlatego, że
zapomniałem napisać o mojej nieodpartej potrzebie dostępu do requestu na każdym
poziomie systemu. Nie umiem jej jeszcze do końca zwalczyć. Zamierzam spróbować
zupełnie się od tego odciąć, podając wszystkie potrzebne rzeczy przez argumenty,
ale jeszcze tego nie przetestowałem. Jak dowiem się czegoś więcej, to dam update.

[^1] Śpiewnik zacząłem robić jeszcze w technikum. Dzięki niemu zdałem nawet
jeden przedmiot
[^2] Nazwałem ją [Ryline](https://github.com/saviusz/Ryline). Pewnie kiedyś do
niej wrócę, jak ogarnę trochę bardziej, jak się programuje API.
