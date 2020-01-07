
# -*- coding: utf-8 -*-
from locale import *
import sys,os

project_dir = '../tr/tr/'

sys.path.append(project_dir)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
import django
django.setup()

import soundcloud
from music.models import *
from datetime import datetime, date, time


client = soundcloud.Client(client_id='dce5652caa1b66331903493735ddd64d')
page_size = 200
genres_list = SoundGenres.objects.values('name')
genres_list_names = [name['name'] for name in genres_list]

к_rus_list_1 = [
"К. Орбакайте и Г. Куценко",
"К.R.A. (Паша Техник)",
"Ка-тет",
"Каshмар",
"Кабаре Дуэт Академия",
"Каблуками По Брусчатке",
"Кабриолет",
"Кабуто Крюгер",
"Кавказская пленница",
"Кадим (Кто ТАМ)",
"Казан Казиев",
"Казачий Разъезд",
"Казбек Желтырев",
"Казян (ОУ74)",
"Кай Метов",
"Кайрат Нуртас & Нюша",
"Какао & aikko",
"Калеон",
"Калинов Мост",
"Камалия",
"Камасутра",
"Камила Измайлова",
"Камила Мурсалова",
"Камни",
"Каникулы",
"Каникулы Бонифация",
"Кантемир",
"Капа",
"Капитан",
"Капучино",
"Капюшон",
"Кар-Мен",
"Карабас Барабас",
"Карамель",
"Карамельки",
"Карандаш",
"Карат",
"Караты feat. IKA",
"Карбовский",
"Карен Черноморских",
"Каренина и Вадим Южный",
"Карим Саидов & Джамалия",
"Карина Айро feat. Chris Forks",
"Карина Вартанян",
"Карина Зверева",
"Карина Кокс",
"Карина Крит",
"Карина Ланге",
"Карина Лейман",
"Карина Радуева и Руслан Мусаев",
"Карина Соколовская и Иван Поклонский",
"Карина Хвойницкая",
"Кариф",
"Карл Хламкин",
"Карма",
"Карнавал",
"Каролина",
"Карт-Бланш",
"Каскад",
"Каспий",
"Кассета",
"Кассим",
"Каста",
"Кастро",
"Кастро feat. Эндшпиль & Jah-Far",
"Катерина Sky",
"Катерина Вознесенская",
"Катерина Голицына",
"Катерина Корс",
"Катерина Красильникова",
"Катерина Молния",
"Катерина Павлова",
"Катрин Бохан",
"Катрин Моро",
"Катрин Штоль",]

к_rus_list_2 = [
"Катя MAY",
"Катя Адушкина",
"Катя Баглаева",
"Катя БаженоваDa",
"Катя Блейри",
"Катя Бойко",
"Катя Брайт",
"Катя Бужинская",
"Катя Волкова",
"Катя Гордон",
"Катя Гройс",
"Катя Данилова",
"Катя Елисеева",
"Катя Иваний",
"Катя Ирис",
"Катя Кокорина",
"Катя Лель",
"Катя Лимонова",
"Катя Линцевич",
"Катя Манешина",
"Катя Михайлова feat. AVAlone",
"Катя Наумова",
"Катя Нова",
"Катя Огонёк",
"Катя Прикольная",
"Катя Разумовская",
"Катя Рикеда",
"Катя Ростовцева",
"Катя Савельева",
"Катя Старикова",
"Катя Чехова",
"Кахрамон Худоярбеков",
"КАчевники feat. Влади",
"Квартет",
"Квартет Пятое Колесо",
"Квебек",
"Кворум feat. Ай-Ман",
"Кеды",
"КейСи",
"Кейт Ламбо",
"Кекс feat. Delise (Дилайс)",
"Келебро",
"КеПа",
"Керил feat. ELLA",
"Кёрл feat. Peppa",
"Кест и Олег Безъязыков",
"Кеха Ридум feat. Koff (Ремо) & Sage",
"Кеша Калужский",
"КешнЯ",
"Кибуц feat. Music Hayk",
"КиевЭлектро",
"КиевЭлектро feat. Алексей Большой",
"Килай",
"КимаКима",
"Киннен",
"Кино",
"Кино (Виктор Цой)",
"Киноман feat. IncogniTO",
"Киноман feat. Leva",
"Кинофильм Чародеи",
"Киоск",
"Кипа Баса feat. Адвайта & Lotos",
"Кипелов",
"Кир Пованти",
"Кира Дымов",
"Кира Дымов и Ирина Круг",
"Кира Кафт & Семён Калика",
"Кира Стертман",
"Кирей",
"Кирилл True & Naiter",
"Кирилл Андреев",
"Кирилл Астапов",
"Кирилл Барышников",
"Кирилл Гуд",
"Кирилл Даревский",]

к_rus_list_3 = [
"Кирилл Даревский & Алина Ларионова",
"Кирилл Дэйзд",
"Кирилл Зайцев feat. Алексей Завьялов, Анна Дуванова, Настюша Харисова",
"Кирилл Клян",
"Кирилл Колгушкин feat. Денис Копытов",
"Кирилл Леонтьев",
"Кирилл Медников & IOWA",
"Кирилл Мойтон",
"Кирилл Нечаев",
"Кирилл Потылицын",
"Кирилл Скрипник",
"Кирилл Туриченко",
"Кирилл Фавор",
"Китос (All Native)",
"Клава Кока",
"Клавдия Шульженко",
"Клайд feat. Леша Свик & KuzJazz",
"Клара Румянова",
"Классный Мюзикл",
"Классный Мюзикл 2",
"Клей Угрюмого",
"Климм",
"Клуб & Ника",
"Клуб Микки Мауса",
"Книга Джунглей",
"КняZz",
"Князева Елена",
"Князь тьмы",
"Ко4а",
"Ковалёв Андрей and Саша project",
"Ковская",
"Кожа",
"Кожин Данила feat. Денис Лирик & Хадижа",
"Козырь (Новый Союз)",
"Кольмипачё",
"Коля Dev",
"Коля Shih (СДХХД) feat. Tyomcha K. (DGJ)",
"Коля Веремко",
"Коля Коробов",
"Коля Маню",
"Коля Найк",
"Коля Серга",
"Коля Сканк (T1One)",
"Коля Трик",
"Коля Хайк feat. Влади",
"Кома",
"Комбинация",
"Комиссар",
"Комитет Охраны Тепла",
"Комната",
"Конец Фильма",
"Константин Бубнов",
"Константин Григ",
"Константин Дерр",
"Константин Кимов",
"Константин Костомаров & Татьяна Буланова",
"Константин Крымский",
"Константин Куклин",
"Константин Легостаев",
"Константин Меладзе",
"Константин Никольский",
"Константин Тарасов",
"Константин Шевченко",
"Консуэлла",
"Копенgageн",
"Копюшон",]

к_rus_list_4 = [
"Копюшон Ноу Мо",
"Корней",
"Корнелия Манго",
"Корни",
"Королева Наташа",
"Король И Шут",
"Король Лев",
"Корпорация Монстров",
"Космогрупп",
"Космокот",
"Костик ИзХабарэ",
"Костя GroweR feat. JackDEN! & San",
"Костя Бес",
"Костя Битеев",
"Костя Киото",
"Костя Кирьянов",
"Костя Крайс",
"Костя Крайс & T1One",
"Костя Рэй",
"Кот Балу",
"Коты-Артистократы",
"Кошки Jam & Тэм Булатов",
"Кошмар на улице Вязов",
"Кравц",
"Край неба",
"Крайм Волшебник",
"Красавцы Love Radio",
"Красавчик",
"Краски",
"Крассавчик",
"Крематорий",
"Крестов & Sonya",
"Крип-А-Крип",
"Крис & Кира Стертман",
"Крис Виватский",
"Крис Кельми",
"Крис Купер feat. Tori Kvit",
"Кристалл",
"Кристи Крылова",
"Кристиан Костов",
"Кристина Corp.",
"Кристина Брэеску",
"Кристина Бутусова",
"Кристина Володина",
"Кристина Есаян",
"Кристина Збигневская",
"Кристина Корвин",
"Кристина Кос",
"Кристина Кошелева",
"Кристина Межинская",
"Кристина Орбакайте",
"Кристина Орса",
"Кристина Рыбникова",
"Кристина Смирнова",
"Кристина Стельмах",
"Крокодил Гена",
"Круг",
"Круиз",
"Ксана Сергиенко",
"Ксана Сергиенко & Александр Панайотов",
"Ксения Miller",
"Ксения Аксёнова",
"Ксения Бейкун",
"Ксения Бородина",
"Ксения Варда",
"Ксения Георгиади",
"Ксения Гончарова",
"Ксения Грачёва",
"Ксения Грошева",
"Ксения Ларина",
"Ксения Лебедева",
"Ксения Луговая",
"Ксения Маренго",
"Ксения Мартелли",
"Ксения Милано",]

к_rus_list_5 = [
"Ксения Минаева",
"Ксения Назарова",
"Ксения Небесная",
"Ксения Новикова",
"Ксения Орлова",
"Ксения Паврос",
"Ксения Таранушич",
"Ксю Власова feat. Денис Лирик",
"Ксюша Антонова",
"Ксюша Бакшеева",
"Кто ТАМ?",
"КуКа",
"Куклы Напрокат",
"Кукрыниксы",
"Кулыев Гельдымурат",
"Кум feat. Юлия Князева",
"Кунов Никита",
"Курара",
"Кусим",
"Кут (Кто PROтив)",
"Кутюрье",
"Кфид",
"Кэвс (НVСВЯЗИ)",
"Кэт Морси",
"Кэти Габараева",
"Кэти Эбель",
"Кэтрин Кэт",
]

litera = SoundSymbol.objects.get(name="К")

count = 0

for tag in к_rus_list_5:
    tracks = client.get('/tracks', q=tag, limit=page_size, linked_partitioning=1)
    if tracks:
        for track in tracks.collection:
            created_at = track.created_at
            created_at = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
            try:
                SoundParsing.objects.get(id=track.id)
            except:
                if track.genre and track.release_year and track.duration > 90000 and track.genre in genres_list_names:
                    try:
                        self_tag = SoundTags.objects.get(name=tag, symbol=litera)
                    except:
                        self_tag = SoundTags.objects.create(name=tag, symbol=litera)
                    genre =SoundGenres.objects.get(name=track.genre.replace("'", '') )
                    new_track = SoundParsing.objects.create(id=track.id, tag=self_tag, artwork_url=track.artwork_url, created_at=created_at, duration=track.duration, genre=genre, stream_url=track.stream_url, title=track.title, uri=track.uri, release_year=track.release_year)
                count = count + 1
        while tracks.next_href != None and count < 2000:
            tracks = client.get(tracks.next_href, limit=page_size, linked_partitioning=1)
            for track in tracks.collection:
                created_at = track.created_at
                created_at = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
                try:
                    SoundParsing.objects.get(id=track.id)
                except:
                    if track.genre and track.release_year and track.duration > 90000 and track.genre in genres_list_names:
                        try:
                            self_tag = SoundTags.objects.get(name=tag, symbol=litera)
                        except:
                            self_tag = SoundTags.objects.create(name=tag, symbol=litera)
                        genre =SoundGenres.objects.get(name=track.genre.replace("'", '') )
                        new_track = SoundParsing.objects.create(id=track.id, tag=self_tag, artwork_url=track.artwork_url, created_at=created_at, duration=track.duration, genre=genre, stream_url=track.stream_url, title=track.title, uri=track.uri, release_year=track.release_year)
                    count = count + 1
