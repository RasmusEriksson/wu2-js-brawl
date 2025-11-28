Systemet fungerar genom att efter man tryckt på start så läggs det till en enemy.

En enemy har slumpmässiga stats varav en är "speed" som bestämmer hur lång tid mellan attacker den har. När både spelaren och enemy attakerar bestäms av requestanimationframe funktionen som varje gång den kallas beräknar hur mycket tid det varit sedan föregående frame. Den tiden subtraheras från två tidsräknare, varav en är Enemy och en är Spelare som då när den är slut gör så att de attakerar och tiden går tillbaka till respektive "speed" värde.

Förutom det är det inget riktigt fuffens.


1. Jag blev relativt nöjd med hur kodningen blev. Även om den inte är den snyggaste eller mest effektiva så fungerar den på det sätt som jag vill att den ska fungera.

2. För det mesta layout och css då det är fortfarande min svagpunkt, förutom det så är det att bara att förenkla kod och logiska koncept.

3. Css.