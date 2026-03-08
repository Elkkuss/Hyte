
# Hyte Projekti

HYTE-kurssin web-verkkosivu


## Käyttöliittymä
Etusivu
![alt text](<hyte-projekti - Google Chrome 5.3.2026 15.11.33.png>)
BMI-Laskuri
![alt text](<hyte-projekti - Google Chrome 5.3.2026 15.13.39.png>)
Päiväkirja
![alt text](<Positioning Items - Google Chrome 6.3.2026 11.32.31.png>)

## Tietokanta

Sovellus käyttää MariaDB-tietokantaa
HealthDiary tietokanta sisältää kolme taulua (Users, DiaryEntries, SleepEntries). SleepEntries taulua ei kummiskaan käytetä lopullisessä työssä.

Taulujen sisältö

Users (user_id, username, password, email, created_at, user_level)

DiaryEntries (entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, created_at)

SleepEntries (sleep_id, user_id, sleep_date, bedtime, wake_time, sleep_hours, sleep_quality, notes, created_at)
## Toiminnallisuudet

Login-form navigaatiossa.
Navigaatiossa login formi sisäänkirjauduttua login formin tilalle tulee teksti Tervetuloa: username, tämän lisäksi päiväkirja linkki tulee saataville sisäänkirjautumisen yhteydessä.

BMI-Laskuri laskee BMI-arvon painon sekä pituuden mukaan, laskuri antaa myös lyhyen analyysin Bmi-arvosta.

Päiväkirja joka on saatavilla ainoastaan sisäänkirjauduttua päiväkirjaan pystyt lisäämään merkintöjä formin avulla tai hakemaan vanhat päiväkirjamerkinnät.
