
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

в_rus_list_1 = [
"В Двух Шагах",
"В Основе",
"В. Высоцкий",
"В. Королев и О. Стельмах",
"В. Нестеренко",
"В.С.М",
"В34 (V34)",
"Ва-Банкъ",
"Вавян и Белые Тени",
"Вагнер",
"Вадвэй",
"Вадим Айхвальд",
"Вадим Алленов",
"Вадим Байков",
"Вадим Богатырёв",
"Вадим Васильев",
"Вадим Вегас",
"Вадим Галыгин",
"Вадим Егоров",
"Вадим Жогин",
"Вадим И Валерий Мищуки",
"Вадим Казаченко",
"Вадим Косенко",
"Вадим Край",
"Вадим Крёстный",
"Вадим Кузема",
"Вадим Орельский",
"Вадим Самойлов",
"Вадим Скиф",
"Вадим Степанцов",
"Вадим Усланов",
"Вадим Южный",
"Вадян Тихорецкий",
"Вазян Ваграм",
"Вайбс",
"Валдай",
"Валенсия",
"Валенсия & Абдулла",
"Валенсия и Александра Гозиас",
"Валенсия и Андрей Гражданкин",
"Валентин & DJ Цветкоff",
"Валентин Вихорев",
"Валентин Стрыкало",
"Валентина Абрамова",
"Валентина Бирюкова",
"Валентина Георгиевская",
"Валентина Легкоступова",
"Валентина Пономарева",
"Валентина Толкунова",
"Валерий PanKin",
"Валерий Агафонов",
"Валерий Азаренко",
"Валерий Витер",
"Валерий Власов",
"Валерий Воронов",
"Валерий Головнюк",
"Валерий Дайнеко",
"Валерий Долгин",
"Валерий Залкин",
"Валерий Золотухин",
"Валерий Киселёв",
"Валерий Козьмин",
"Валерий Курас",
"Валерий Лебедев",
"Валерий Леонтьев",
"Валерий Лукашевский",
"Валерий Меладзе",
"Валерий Мищук",
"Валерий Никитенко",
"Валерий Новиков",
"Валерий Ободзинский",
"Валерий Палаускас",
"Валерий Петров",
"Валерий Петряев",
"Валерий Святковский",]

в_rus_list_2 = [
"Валерий Селиванов",
"Валерий Соликамский",
"Валерий Субботин",
"Валерий Сюткин",
"Валерий Юг",
"Валерия",
"Валерия Коган",
"Валерия Королева",
"Валерия Ланская",
"Валерия Лесовская",
"Валерия Рыцарева",
"Валерон",
"Валик Индиго",
"Валик Попсовый",
"Вальдемар Вайцель",
"Валя Павлова",
"Вандер Фил",
"Вано Сличенко",
"Ваня Жуков",
"Ваня Романов",
"Ваня Чебанов",
"Варвара Визбор",
"Варвара Комиссарова",
"Варвара Стрижак",
"Варцаба",
"Варчун & Яна Крошкина",
"Варя Демидова",
"Василевская",
"Василий Бондарчук",
"Василий Денисов",
"Василий Евдокимов",
"Василий Иной",
"Василий Кобзарев",
"Василий Романов",
"Василь Данилюк",
"Вася Кимо",
"Вася Обломов",
"Вася Пряников",
"Вахтанг Вахтангишвили",
"Вахтанг Кикабидзе",
"Вдадимир Рудик",
"Вдох выдох",
"ВегаS",
"Великая Любовь",
"Велинская",
"Вельвет",
"Вельвет feat. Макс Зорин",
"Вера Брежнева",
"Вера Верба",
"Вера Еланцева",
"Вера Полозкова",
"Вера Разумова",
"Вера Снежная",
"Верасы",
"Верди",
"Веремій",
"Вересковый Мед",
"Верка Сердючка",
"Вероника Агапова",
"Вероника Андреева",
"Вероника Басова",
"Вероника Гордиевская",
"Вероника Гулько & Смирнов и Компания",
"Вероника Долина",
"Вероника Дорош",
"Вероника Коваленко",
"Вероника Коваль",
"Вероника Соколова",
"Вероника Цубикова",
"Весёлые ребята",
"Весна",
"Ветер",
"Ветер Воды",
"Ветлицкая Наталья",
"Ви-за-ви",]

в_rus_list_3 = [
"Виkа Sky",
"Виа Веселые Ребята",
"ВИА Волга-Волга",
"Виа Гагарин",
"ВИА Гра",
"ВИА Добры молодцы",
"Виа Иверия",
"Виа Красные Маки",
"Виа Оризонт",
"Виа Песняры",
"Виа Поющие Сердца",
"Виа Пятое Колесо",
"Виа Синяя Птица",
"ВИА Сириус",
"Виа Сливки",
"ВИА Чаппа",
"ВИАГра",
"Вибрация Перца",
"Вивальди",
"Визави",
"ВиК",
"Вика Воронина",
"Вика Гранд",
"Вика Дайнеко",
"Вика Крутая",
"Вика Куприна",
"Вика Курзова",
"Вика Лазовская",
"Вика Стриж",
"Вика Цыганова",
"Вика Чужая",
"Вика Школьникова",
"Вика Шоколадкина",
"Виктор Балакирев",
"Виктор Барабанщиков",
"Виктор Бархатов",
"Виктор Батурин",
"Виктор Баум",
"Виктор Берковский",
"Виктор Бровков feat. Карина Белова",
"Виктор Вайлс & Nikky Rocket",
"Виктор Вайс",
"Виктор Виджай",
"Виктор Волик",
"Виктор Герт",
"Виктор Гурченко",
"Виктор Дорин",
"Виктор Заходяев",
"Виктор Зорин",
"Виктор Калина",
"Виктор Кан feat. МирвМоно & NaCl",
"Виктор Кель",
"Виктор Клейменов",
"Виктор Королев",
"Виктор Крам",
"Виктор Лекарь",
"Виктор Матросов",
"Виктор Машин",
"Виктор Мосин",
"Виктор Ортман",
"Виктор Павлик",
"Виктор Перевал",
"Виктор Петлюра",
"Виктор Поплеев",
"Виктор Романченко",
"Виктор Рыбин",
"Виктор Салтыков",
"Виктор Светлов",
"Виктор Северный",
"Виктор Тартанов",
"Виктор Третьяков",]

в_rus_list_4 = [
"Виктор Чайка",
"Виктор Чурюкин",
"Виктория Che",
"Виктория Win",
"Виктория Аверьянова",
"Виктория Алешко",
"Виктория Воронина",
"Виктория Дайнеко",
"Виктория Елбаева",
"Виктория Калистратова",
"Виктория Клинкова",
"Виктория Кохана",
"Виктория Ланевская",
"Виктория Лоскутова",
"Виктория Макарская и Антон Макарский",
"Виктория Николова",
"Виктория Олизе",
"Виктория Петрик",
"Виктория Самус",
"Виктория Черенцова",
"Виктория Шурина",
"Виллоу",
"Винни Пух",
"Винтаж",
"Виолетта Дядюра",
"Вирус",
"Високосный Год",
"Вита",
"Виталий Аксёнов",
"Виталий Багров И Стас Иванов",
"Виталий Верт",
"Виталий Волин",
"Виталий Волк",
"Виталий Галай",
"Виталий Гасаев",
"Виталий Гогунский feat. Юрий Стрелкин",
"Виталий Гордей",
"Виталий Данилюк",
"Виталий Козловский",
"Виталий Котиц",
"Виталий Кочетков",
"Виталий Машков",
"Виталий Орион",
"Виталий Пось",
"Виталий Романов",
"Виталий Седов",
"Виталий Сухов",
"Виталий Теринг",
"Виталий Чирва",
"Виталик Мишура",
"Виталя Fox",
"Витас",
"Витёк",
"Вито Ягмуров",
"Витольд Петровский",
"Витя CLassic (ВУТОНН)",
"Витя Classic & Andrey Kraft",
"Витя Vi-Jay",
"Витя Виджай",
"Витяй Счастье",
"Віч-на-Віч",
"Влад Cold",
"Влад Альтбрегин",
"Влад Булах",
"Влад Бумага",
"Влад Вебер",
"Влад Дарвин",
"Влад Зорин & Вова Забытый",
"Влад Кевраликин",
"Влад Маслаков",
"Влад Матюгов & Adamant & Влад Февраль",
"Влад Ориджинал",
"Влад Павлецов",
"Влад Рамм",
"Влад Соколовский",]

в_rus_list_5 = [
"Влад Сташевский",
"Влад Ступак",
"Влад Сытник",
"Влад Топалова",
"Влад Ульянич",
"Влад Хош",
"Влад Цветаев",
"Влад Чижиков",
"ВладFlame и Илья Krosssy",
"Влада Богданова",
"Влада Вершинина",
"Влада Пилипец",
"Влада Чупрова",
"Влада Яковлева",
"Влади Блайберг",
"Влади и Разбитые Сердца",
"Владимир Кузьмин",
"Владимир Алмазов",
"Владимир Асмолов",
"Владимир Бажиновский",
"Владимир Бейнарович",
"Владимир Беличенко",
"Владимир Бочаров",
"Владимир Брилёв",
"Владимир Ванин",
"Владимир Винс",
"Владимир Ворон",
"Владимир Воронов",
"Владимир Высоцкий",
"Владимир Гришко",
"Владимир Гунбин",
"Владимир Двинской",
"Владимир Девятов",
"Владимир Детков",
"Владимир Дорош",
"Владимир Дубровский",
"Владимир Ждамиров",
"Владимир Жириль",
"Владимир Заброда",
"Владимир Захаров",
"Владимир Идиатуллин",
"Владимир Ильягуев",
"Владимир Калусенко",
"Владимир Капгер",
"Владимир Каплун",
"Владимир Качан",
"Владимир Ковылин и Геннадий Грищенко",
"Владимир Козин",
"Владимир Кормилицын",
"Владимир Кузнецов",
"Владимир Кузьмин",
"Владимир Куклин",
"Владимир Курский",
"Владимир Ланцберг",
"Владимир Лёвкин",
"Владимир Левкин и Гульназ",
"Владимир Лимаренко",
"Владимир Лисицын",
"Владимир Лучников",
"Владимир Маркин",
"Владимир Масленников",
"Владимир Михайлов",
"Владимир Нечаев",
"Владимир Никифоров",
"Владимир Отделёнов",
"Владимир Пахновский",
"Владимир Печёных",
"Владимир Потапов",
"Владимир Пресняков",
"Владимир Райков",
"Владимир Раневский",
"Владимир Рудик",
"Владимир Саханда",]

в_rus_list_6 = [
"Владимир Северский",
"Владимир Селиванов",
"Владимир Ступин",
"Владимир Тимофеев",
"Владимир Тиссен",
"Владимир Ткаченко",
"Владимир Хакимов",
"Владимир Царёв",
"Владимир Цветаев",
"Владимир Чернов",
"Владимир Черняков",
"Владимир Широков",
"Владислав Коннов",
"Владислав Королев",
"Владислав Курасов",
"Владислав Левицкий",
"Владислав Медяник",
"Владислав Рамм",
"Влалия и Сергей Кременевский",
"ВместоСна",
"Вова Prime",
"Вова Ванэс",
"Вова Гаути",
"Вова Забытый",
"Вова Миняйло feat. Ксения Михайлицина",
"Вова Ямайчик",
"Военная песня",
"Володимир Дорош",
"Володимир Трач & Nanna",
"Волчья Ягода",
"Волшебники Двора",
"Волшебники Из Вэйверли Плэйс",
"Волшебный Микрофон",
"Вольский & Дэнил",
"Вольфганг Амадей Моцарт",
"Воровайки",
"Воронежский Русский Народный Хор",
"Восемь По Гринвичу",
"Воскресение",
"Восставшие из ада",
"Восточный Округ",
"Восход",
"Время и Cтекло",
"Всё включено",
"Встречный Бой",
"Вторые Брюки",
"Вуди Вуд feat. Baul & МайкДи",
"ВУТОНН feat. Tyomcha Karabin (Da Gudda Jazz)",
"ВХИП (Владимир Хомутов, Игорь Павлов)",
"Вячеслав Анисимов",
"Вячеслав Башкин",
"Вячеслав Бутусов",
"Вячеслав Быков",
"Вячеслав Добрынин",
"Вячеслав Евтых",
"Вячеслав Зотов",
"Вячеслав Кожевников",
"Вячеслав Лавров",
"Вячеслав Леонтьев",
"Вячеслав Лобанов",
"Вячеслав Лопаков",
"Вячеслав Макаров",
"Вячеслав Малежик",
"Вячеслав Мейтус feat. Алена Романовская",
"Вячеслав Московкин",
"Вячеслав Мясников",
"Вячеслав Рубахин",
"Вячеслав Рыбиков",
"Вячеслав Самарин",
]



litera = SoundSymbol.objects.get(name="В")

count = 0

for tag in в_rus_list_1:
    tracks = client.get('/tracks', q=tag, limit=page_size, linked_partitioning=1)
    if tracks:
        for track in tracks.collection:
            created_at = track.created_at
            created_at = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
            if track.description:
                description = track.description[:500]
            try:
                SoundcloudParsing.objects.get(id=track.id)
            except:
                if track.genre and track.release_year and track.duration > 90000 and track.genre in genres_list_names:
                    try:
                        self_tag = SoundTags.objects.get(name=tag, symbol=litera)
                    except:
                        self_tag = SoundTags.objects.create(name=tag, symbol=litera)
                    genre =SoundGenres.objects.get(name=track.genre.replace("'", '') )
                    new_track = SoundcloudParsing.objects.create(id=track.id, tag=self_tag, artwork_url=track.artwork_url, created_at=created_at, duration=track.duration, genre=genre, description=description, title=track.title, uri=track.uri, release_year=track.release_year)
                count = count + 1
        while tracks.next_href != None and count < 2000:
            tracks = client.get(tracks.next_href, limit=page_size, linked_partitioning=1)
            for track in tracks.collection:
                created_at = track.created_at
                created_at = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
                if track.description:
                    description = track.description[:500]
                try:
                    SoundcloudParsing.objects.get(id=track.id)
                except:
                    if track.genre and track.release_year and track.duration > 90000 and track.genre in genres_list_names:
                        try:
                            self_tag = SoundTags.objects.get(name=tag, symbol=litera)
                        except:
                            self_tag = SoundTags.objects.create(name=tag, symbol=litera)
                        genre =SoundGenres.objects.get(name=track.genre.replace("'", '') )
                        new_track = SoundcloudParsing.objects.create(id=track.id, tag=self_tag, artwork_url=track.artwork_url, created_at=created_at, duration=track.duration, genre=genre, description=description, title=track.title, uri=track.uri, release_year=track.release_year)
                    count = count + 1
