# Projekt podzielony jest na dwa foldery: backend i frontend.
Krótka instrukcja obsługi, jak to postawić xD  
1. tworzycie python interpreter po to aby był venv ( pycharm: lewy dolny róg)
2. wpisujecie w oknie termianla ( wazne by byl venv!!!!) pip install -r requirements.txt
3. oczywiscie musicie byc w folderze backend wiec: cd backend
4. ustawiacie konfiguracje ( pycharm: prawa góra przy zielonej strzałce)
5. w ustawieniach konfuguracji wybieracja django server
6. klikacie na dole przycisk FIX i wybieracie jako directory root 'backend' a jako settings: plik settings.py
7. klikacie ok 
8. w settings local pusicie podac swoje dane do bazy danych posressa
9. jak to zrobicie.. wpisujecie w terminal venv ( to wazne! ma być venw ) python manage.py migrate
10. klikacie zieloną strzałkę i odpalacie projekt
