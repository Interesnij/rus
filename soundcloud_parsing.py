
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

м_rus_list_1 = [
"М-ЛИГА",
"М.А.Рия",
"М16 и Настя Задорожная",
"М1tIs feat. Джэй & КешнЯ",
"М2О",
"Маврин",
"Магамед Дзыбов",
"Магамед Халилов",
"Магамет Дзыбов",
"Магнит & Лёша Свик",
"Магнитная Аномалия",
"Магнэт",
"Магомед Аликперов",
"Мадлен Ишоева",
"Мазари-Шариф",
"Майк Мироненко",
"Майк Павлов",
"Майк Филатов",
"Майк Чек",
"МайкДи feat. Bizaro",
"Майки Майк ft. Факел",
"Майкл Як",
"Майя Ву",
"Майя Кристалинская",
"Майя Мигаль",
"МакSим",
"Маквала Касрашвили",
"Маквин",
"Макпал Исабекова",
"Макс Cherny",
"Макс Rate feat. Ksenia",
"Макс Браун feat. Bulat DZ",
"Макс Волга",
"Макс Гирко",
"Макс Громов feat. Beliy & Bassile",
"Макс Громов feat. Закаты",
"Макс Дарвин & Арсений Лавкут",
"Макс Ермаков",
"Макс Ермаков feat. Таня Моль",
"Макс Кондрат",
"Макс Корж",
"Макс Корж feat. Foth",
"Макс Корж feat. Green Man & JT",
"Макс Корж feat. Kolya Funk & Eddie G vs. DJ DNK",
"Макс Лидов",
"Макс Лоренс",
"Макс Лоренс feat. Phillip Mariani",
"Макс Лоренс и Lion",
"Макс Лоренс и Дидюля",
"Макс Мунстар & Obe 1 Kanobe (Dj Worm)",
"Макс Повар",
"Макс Покровский",
"Макс Фадеев",
"Макс Холод",
"Максим Mickey",
"Максим Аверин",
"Максим Апрель",
"Максим Буорматов",
"Максим Бурматов",
"Максим Галкин",
"Максим Дунаевский",
"Максим Завидия",
"Максим Захаров",
"Максим и Лигалайз",
"Максим Кобзов",
"Максим Кривенко",
"Максим Круженков",
"Максим Куст",
"Максим Леонидов",
"Максим Лесников",
"Максим Лидов",
"Максим Олейников",
"Максим Полушкин",
"Максим Самойлов",
"Максим Свобода",]

м_rus_list_2 = [
"Максим Симэй",
"Максим Смолин",
"Максим Тайгер",
"Максим Тарасов",
"Максим Фадеев",
"Макфлай",
"Мал Бачман",
"Малабар feat. Джиос & Милка",
"Малай",
"Маленький Принц",
"Мали",
"Малика",
"Малый Кристалл (Соль Земли)",
"Мальбэк",
"Мальчишник",
"Мамонтова Елена",
"Манго-Манго",
"Манжерок",
"Маниту",
"Мантана",
"Манхеттен",
"Маньяна",
"Марана",
"Марат Гильмиев",
"Марат Крымов",
"Марат Матевосян",
"Марат Нова (Матевосян)",
"Марат Фидель",
"Марат Яруллин",
"Маргарита Барыкина",
"Маргарита Орская",
"Маргарита Позоян",
"Маргарита Суханкина",
"Маргостар",
"Маргоша",
"Мари Краимбрери",
"Мари Краймбрери",
"Мари Сенн",
"Мариам Мерабова",
"Мариетта Вейс",
"Мариетта Вэйс",
"Марик Чизано",
"Марина Абрамова",
"Марина Александрова",
"Марина Алиева",
"Марина Быстрицкая",
"Марина Вальдман",
"Марина Вишнякова",
"Марина Горда",
"Марина Гудиева",
"Марина Девятова",
"Марина Журавлева",
"Марина Захарченко",
"Марина Камьянова",
"Марина Капуро",
"Марина Лебедева",
"Марина Мигуля",
"Марина Минаева",
"Марина Михеева",
"Марина Немова",
"Марина Орлова",
"Марина Отмахова",
"Марина Редкая",
"Марина Смирнова",
"Марина Табри",
"Марина Федункив",
"Марина Хлебникова",
"Марина Цхай и Таня Буланова",
"Маринка & Neoclubber",
"Марис Кайран",
"Мария Айс-Ти",
"Мария Амнуэль & KEY",
"Мария Безрукова",
"Мария Богомолова",]

м_rus_list_3 = [
"Мария Борисова",
"Мария Будницкая",
"Мария Вебер и Никита Малинин",
"Мария Голик",
"Мария Грай",
"Мария Кравец",
"Мария Кузнецова",
"Мария Лукач",
"Мария Максакова",
"Мария Малыш",
"Мария Миа",
"Мария Неделкова",
"Мария Полетай",
"Мария Ржевская",
"Мария Сафронова",
"Мария Стёкина",
"Мария Сэм Кацева",
"Мария Яремчук",
"Марія Бурмака",
"Марія Яремчук",
"Марк Бернес",
"Марк Потапов",
"Марк Розин",
"Марк Савин",
"Марк Тишман",
"Марк Фрейдкин",
"Марк Юсим",
"Маркин Владимир",
"Марко Поло",
"Маркшейдер Кунст",
"Марлен Каримов",
"Мармелад",
"Марс' Эль feat. Fara & Денис Лирик",
"Марсель Давлетов",
"Марсу Нужны Любовники",
"Март Бабаян",
"Марта Адамчук",
"Марта Береснева",
"Марта Ильина",
"Марта Кот",
"Марта Омани",
"Мартин Дин",
"Маруся Клюева",
"Марха Макаева",
"Марц",
"Маршал Александр",
"Маршал Ашроев",
"Маршал и Быков",
"Марьяна Ро",
"Марьяна Ро & FatCat",
"Маскай & T1One",
"Массква",
"Матвей Вермиенко",
"Матиас и Витас",
"Маубек (Алишер Маубеков)",
"Маугли",
"Мауна",
"Мачете",
"Маша GoYa",
"Маша Ru",
"Маша Вебер",
"Маша Гойя",
"Маша Гретт",
"Маша Ермолаева feat. DJ Vini",
"Маша И Медведи",
"Маша И Медведь",
"Маша Кац",
"Маша Кипиш и Мафик",
"Маша Кольцова",
"Маша Малиновская",
"Маша Маугли",
"Маша Николаева",]

м_rus_list_4 = [
"Маша Новикова",
"Маша Распутина",
"Маша Собко",
"Маша Тимошенко",
"Маша Фокина",
"Машина Времени",
"Маяковский",
"Мегаполис",
"Мёд Кураре",
"Меджикул",
"Медойти",
"МеззаV",
"Мелиssа",
"Мелик Арзуманян feat. Алексей Кабанов",
"Меломаны",
"Мельница",
"Мендельсон",
"Менджи",
"Мери Проджект",
"Мері",
"Меркурьева",
"Мерседес",
"Меседа Багаудинова",
"Местный feat. ReZak",
"МетаMorfoz",
"Метастазы Разума",
"Метастазы Разума & V tapo4kax",
"Метис",
"Методие Бужор",
"Методие Бужор и Жасмин",
"Механика",
"Мечта",
"Мечталла",
"Мечтатели",
"Мечтать",
"Миа Бойка",
"МиДжи",
"Мика Ньютон",
"Мика Ньютон & Troy Harley",
"Микаэл Таривердиев",
"МилkиWay & DJ BARS",
"Мила Вандер",
"Мила Иконская",
"Мила Кикина",
"Мила Нитич",
"Мила Рогоза",
"Мила Руденская и Владимир Курский",
"Мила Хотимская",
"Милан Савич",
"Милана Вильчинская",
"Милана Томаева",
"Милена & Murzin Denis",
"Милли (Эмилия Иванова)",
"Мимы В Моде",
"Мира Маяковская",
"Мираж",
"Миран Шильке",
"Мирон feat. Arturro",
"Мирон feat. Настя Омаргалиева",
"Мирослава Карташова",
"Мистер Бинт & Амир (Легенды Про)",
"Митя Железняк",
"Митя Северный (Константа)",
"Митя Фомин",
"Миха Гам",
"Михаба feat. Балаган Лимитед",
"Михаил Албулов",
"Михаил Алиферович и Любовь Меликян",
"Михаил Архип",
"Михаил Балясинский и Влад Топалов",
"Михаил Барский",
"Михаил Башаков",
"Михаил Белорусов",
"Михаил Березутский",]

м_rus_list_5 = [
"Михаил Блат",
"Михаил Бондарев",
"Михаил Борисов",
"Михаил Бородин",
"Михаил Боярский",
"Михаил Бублик",
"Михаил Бурляш",
"Михаил Василенко",
"Михаил Гребенщеков",
"Михаил Грицкан",
"Михаил Грубовъ",
"Михаил Гулько",
"Михаил Дали",
"Михаил Дмитриев",
"Михаил Дробинин",
"Михаил Жуков",
"Михаил Задорин",
"Михаил Идов feat. Ёлка",
"Михаил Кармаш",
"Михаил Кленов",
"Михаил Княжевич",
"Михаил Кочережко",
"Михаил Лёвкин",
"Михаил Мартынов",
"Михаил Михайлов",
"Михаил Мотышев",
"Михаил Муромов",
"Михаил Ногинский",
"Михаил Ножкин",
"Михаил Петрунькин",
"Михаил Поляков",
"Михаил Пшенников",
"Михаил Руденко",
"Михаил Санин",
"Михаил Светин",
"Михаил Терёхин",
"Михаил Турецкий",
"Михаил Шабашов",
"Михаил Шелег",
"Михаил Шуфутинский",
"Михаил Щербаков",
"Михаил Яцевич feat. Елена Ваенга",
"Михалыч (БарДак)",
"Михалыч (Стольный Град)",
"Михей И Джуманджи",
"Миша SMT feat. Ксения Бронкс",
"Миша Бади",
"Миша Джери",
"Миша Ермошин",
"Миша Комаров",
"Миша Крупин",
"Миша Ли",
"Миша Майер",
"Миша Марвин",
"Миша Мирный",
"Миша Пунтов",
"Миша Романов",
"Миша Смирнов",
"Миша Феникс",
"Мишель and Vena",
"Мишель Барави",
"Мишель И Свои",
"Мишель Легран",
"Мишель Помоз",
"Мишка И Улыбка",
"Младший Сын Неба",
"Мнимый Мим",
"Многие Другие",
"Многоточие",
"Мобильные Блондинки",
"Мой Versal'",
"Мокинос feat. Леша Свик & Masta Vilion",
"Молочные Братья feat. Max Vertigo & PilGrim N.C.K.",
"Молчание ягнят",
"Монако Project",
"Монатик",
"Монгол Шуудан",
"Монд Лиза",
"Монеточка",]

м_rus_list_6 = [
"Монокини",
"Морэ & Рэльсы",
"МОС13",
"Москва слезам не верит",
"Мосты",
"Мот",
"Моторролла",
"Мохито",
"Моя Мишель",
"МП-3",
"МС Вспышкин и Никифоровна",
"МС Хованский",
"Мужские Разговоры",
"Музакорд",
"Музыка TS & Фир",
"Музыкальный Коллектив Петра Налича",
"Музыкальный Проект Юлии Пак",
"Мулат",
"Мультfильмы",
"Мульти Кейс",
"Мультфильмы и Людмила Сенчина",
"Мумий Тролль",
"Мумина",
"Мурад Байкаев feat. Саид Сельмурзаев",
"Мураками",
"Мурат Насыров",
"Мурат Тхагалегов",
"Мурат Тхагалегов feat. Анна Ленокс",
"Мурзилки Int.",
"Мурки",
"Муслим Магомаев",
"Мусса Айбазов",
"Мута feat. Саркис Мовсесян",
"Муха feat. Кулер",
"Мухтар Хордаев",
"Мы из джаза",
"Мысли Вслух",
"Мышиный Дом",
"Мэд Райта",
"Мэй Дэй",
"Мэй Дэй & JONVS",
"Мэнчестер",
"Мэри Поппинс",
"Мэрикона",
]

litera = SoundSymbol.objects.get(name="М")

count = 0

for tag in м_rus_list_3:
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
