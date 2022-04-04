# Jak odpalić frontend.

## Instalacja expo

Najpierw potrzebujemy Node.js i npm, także najprościej zainstalować z przeglądarki.

## Po zainstalowaniu Node.js i npm:

1. Odpalamy terminal i wpisujemy: npm install --global expo-cli
2. W sumie to tyle 😳

## Uruchomienie aplikacji na fizycznym telefonie przy pomocy expo
**(działa na androidzie, jak ktoś ma iphone'a to będzie trochę inaczej, ale nie wiem jak XD)**

Na telefonie należy zainstalować aplikację **Expo go**, możliwe, że w sklepie będzie się nazywała po prostu **Expo**

1. Przechodzimy do folderu /frontend/frontend 🤡.
2. Wpisujemy npm start.
3. W terminalu pojawi się link **Developer tools running on http://localhost:(tutaj numer portu)**.
4. Klikamy link albo kopiujemy i wklejamy do przeglądarki.
5. W lewej sekcji strony widoczna jest opcja connection, zmieniamy opcję z LAN na **tunnel**.
6. Po zmianie na tunnel odpalamy aplikację mobilną expo i wybieramy opcję **Scan QR Code**.
7. Skanujemy kod widoczny na stronie, jeżeli wszystko zrobiliśmy poprawnie to na telefonie powinna się pojawić aplikacja      🚶a🐕.

Można sobie dodatkowo przetestować zmieniając coś w App.js, aplikacja powinna się zaktualizować w czasie rzeczywistym na telefone.

Serwer expo zatrzymujemy przy pomocy ctrl+c.

**Wszystko tutaj jest napisane przy użyciu windowsa i androida, jak ktoś używa ios'a lub mac'a to niech da znać jak będą jakieś problemy (z tego co patrzyłem to różnice nie są jakieś ogromne), w 💩 siła jak to mówią.**


