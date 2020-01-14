
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

с_rus_list_1 = [
"С.3.Ж feat. Амир (Легенды PRO) & Nadin",
"С.К.А.Й.",
"Сaмедли",
"СhipaChip",
"Сhipachip feat. ТВЖ",
"Сhris Parker",
"Сhris Parker ft. YarosLOVE",
"Сабина Мустаева",
"Саванна",
"Саванна Голд",
"Савелий Котов",
"Саврик, Михей Прим. feat. Зануда",
"Сад Грез",
"Сажа feat. Пожар (Кворум)",
"Сайб",
"Саймон",
"Салехард",
"Сали Росивер & Килабальт feat. Улицы",
"Сальвадор",
"Сальто Назад",
"Самвел Варданян",
"Самвел Неркарарян",
"Самир Агаев",
"Самира",
"Самоцветы",
"Сандали",
"Сандра Круглова",
"Санмай",
"Сансара",
"Санта Димопулос",
"Санти",
"Санчес (DotsFam)",
"Саня Бетов",
"Сара ОКС",
"Саранча",
"Сардор Милано",
"Сардор Рахимхон",
"Саро Варданян",
"Сати Казанова",
"Сацура",
"Саша Bandi",
"Саша GraDus feat. Дарья Кумпаньенко & One Sky",
"Саша Ksandra feat. Kore & ГудВин",
"Саша Project",
"Саша Snek",
"Саша Stat & Mr.M (Та Сторона)",
"Саша Абрамова feat. DJ Vini",
"Саша Айвазов",
"Саша Алмазова и Non Cadenza",
"Саша Аносов & Ольга Роса",
"Саша Байкальский",
"Саша Балакирева",
"Саша Ветер",
"Саша Власов",
"Саша ВТЖ",
"Саша Гомель",
"Саша Грекова",
"Саша Друг",
"Саша Ефремова",
"Саша Жемчугова",
"Саша Захарик и Юрий Селезнев",
"Саша Зверева",
"Саша Иркутский",
"Саша Кабаева",
"Саша Калашникова",
"Саша Колди & Дима Цунами",
"Саша Круглова",
"Саша Кэмо & Дмитрий Первушин",
"Саша Лавер",
"Саша Ли",
"Саша Макарская feat. Valique",
"Саша Маст feat. Vnuk",
"Саша Митрофанов",
"Саша Немо",
"Саша Носач",]

с_rus_list_2 = [
"Саша Пайро",
"Саша Попова",
"Саша Родков (Fraktal)",
"Саша Санта",
"Саша Светлый feat. Danger & МС Т, Roger",
"Саша Скул",
"Саша Смирнов feat. Юра Карапетян",
"Саша Спилберг",
"Саша Струнов",
"Саша Суров",
"Саша Тилэкс (Успешная Группа)",
"Саша Титов, Мари Краймбрери, Константин Легостаев, Доминика",
"Саша Ткач",
"Саша Фем",
"Саша Чест",
"Саша Шен",
"Саша Эскобар",
"Саша[Факт]Смирнов & Карабэйс",
"Сборная Cоюза",
"СВД feat. Макс Кондрат",
"Света",
"Света & DJ DreamTim",
"Света Ая (Город 312)",
"Света Корцман",
"Светикова Светлана",
"Светлана Аверочкина",
"Светлана Винник",
"Светлана Владимирская",
"Светлана Гера",
"Светлана Голубева",
"Светлана Губаревич",
"Светлана Островская",
"Светлана Разина",
"Светлана Рерих",
"Светлана Русская",
"Светлана Светикова",
"Светлана Сорокина",
"Светлана Тарабарова",
"Светлана Тернова",
"Светлана Фед",
"Светлана Чумакова",
"Светлана Юдаева",
"Светланка Минченко",
"Свинцовый Туман & Vitamin",
"Свиридов",
"Світлана Дубініна",
"Свят",
"Святослав Lookinich feat. Диана Мирзоева",
"Святослав Бах",
"Святослав Рожков",
"Сева Мишуров & sSAME",
"Севак Ханагян",
"Северное Направление",
"Сегодня В Мире",
"Сегодня ночью",
"Секрет",
"Сектор Газа",
"Селена",
"Сёма Семёнов",
"Семён Величко",
"Семен Канада",
"Семен Ланцет",
"Семен Лобазнов",
"Семён Молодцов",
"Семён Слепаков",
"Семён Фролов",
"Семь Дорог feat. Лёша Маэстро",
"СенькоF",
"Сеня Лампа",
"Серафим",
"Сергей Дымов & DJ Arhipoff",
"Сергей Захаров",
"Сергей Светланин",
"Сергей Альбин",
"Сергей Андреев",]

с_rus_list_3 = [
"Сергей Анишин",
"Сергей Артемьев",
"Сергей Асанов",
"Сергей Ашихмин",
"Сергей Бабкин",
"Сергей Баштовой",
"Сергей Безруков & Крёстный Папа",
"Сергей Беликов",
"Сергей Библый",
"Сергей Блакунов",
"Сергей Бобунец",
"Сергей Болоболов",
"Сергей Бронза & Ника Никольская",
"Сергей Брысенков",
"Сергей Бузин",
"Сергей Бурштейн (БУРСА)",
"Сергей Васюта и Сладкий Сон",
"Сергей Вертинский",
"Сергей Витковский",
"Сергей Войтенко",
"Сергей Волчков",
"Сергей Вольный",
"Сергей Воронцов",
"Сергей Восьмой",
"Сергей Врачёв",
"Сергей Галибин & Анна Свиридова feat. Наташа Турбина",
"Сергей Гвоздика",
"Сергей Гладыр",
"Сергей Горелик",
"Сергей Грей'С",
"Сергей ГрейС",
"Сергей Гуляев",
"Сергей Гусаров",
"Сергей Дорошенко",
"Сергей Дроздов",
"Сергей Дубровин",
"Сергей Думцев",
"Сергей Дымов",
"Сергей Дядюн",
"Сергей Егоров",
"Сергей Жидков (Сергеич)",
"Сергей Жуков",
"Сергей Замченко",
"Сергей Зверев",
"Сергей Зелинский",
"Сергей Землянко",
"Сергей Земцов",
"Сергей И Татьяна Никитины",
"Сергей Иванов",
"Сергей Ильин",
"Сергей Ищенко",
"Сергей Ищенко & Юля Шатунова",
"Сергей Кашарский",
"Сергей Киреев",
"Сергей Кириченко",
"Сергей Клёнских",
"Сергей Климентьев",
"Сергей Клушин",
"Сергей Князев",
"Сергей Кокшаров",
"Сергей Колегойда",
"Сергей Коньков",
"Сергей Костецкий",
"Сергей Кот",
"Сергей Кривицкий",
"Сергей Кристовский",
"Сергей Ксенофонтов",
"Сергей Кубинский",
"Сергей Кузин и Эрика",
"Сергей Кузнецов",
"Сергей Куприк",
"Сергей Куренков",
"Сергей Курченко",
"Сергей Лапковский",
"Сергей Лещёв",
"Сергей Логунов",
"Сергей Любавин",
"Сергей Маковецкий",
"Сергей Малиновский",
"Сергей Матвеев",
"Сергей Матвеенко",]

с_rus_list_4 = [
"Сергей Минаев",
"Сергей Миньков",
"Сергей Миронов",
"Сергей Наговицын",
"Сергей Низовцев",
"Сергей Никитин",
"Сергей Никитченко",
"Сергей Ноябрьский",
"Сергей ПалычЪ",
"Сергей Панинъ",
"Сергей Пенкин",
"Сергей Переверзев & Ансамбль Валенсия",
"Сергей Пестов",
"Сергей Пинсон",
"Сергей Пискун",
"Сергей Порт",
"Сергей Прибой",
"Сергей Прицеп feat. Наталья Ильц",
"Сергей Прокофьев",
"Сергей Рассадин",
"Сергей Рахманинов",
"Сергей Родня",
"Сергей Романов",
"Сергей Росси",
"Сергей Рудов",
"Сергей Рыбачёв",
"Сергей Рындин",
"Сергей Савин",
"Сергей Светланин",
"Сергей Север",
"Сергей Серафимов",
"Сергей Сердюков",
"Сергей Серебряный",
"Сергей Сиба",
"Сергей Сибирский",
"Сергей Сидель",
"Сергей Славянский",
"Сергей Смирнов",
"Сергей Соболь",
"Сергей Солнцев",
"Сергей Сорокин",
"Сергей Сорос",
"Сергей Стороженко",
"Сергей Сумачаков",
"Сергей Сухачёв",
"Сергей Сухомлин",
"Сергей Тартан",
"Сергей Тимофеев",
"Сергей Тихонов",
"Сергей Ткачёв (Ткач)",
"Сергей Трофимов",
"Сергей Трунов",
"Сергей Труханов",
"Сергей Уральский",
"Сергей Урумян",
"Сергей Филиппов",
"Сергей Филиппов feat. Alex Menco",
"Сергей Фискер & Брачелло",
"Сергей Хижняк",
"Сергей Чекалин",
"Сергей Чепрак",
"Сергей Черновской",
"Сергей Чернышев",
"Сергей Чумаков",
"Сергей Шнуров",
"Сергей Щавинский",
"Сергей Щавинский и Ирина Ортман",
"Сердце и На-На",
"Серебро (Serebro)",
"Серебряный Колокольчик",
"Серёга (Полиграф ШарикOFF)",
"Серёга & Дети Капитана Гранта",
"Серёга и Елена Сергеевна (Кука)",
"Серега и Маша Малиновская",
"Серега и ПМ",]

с_rus_list_5 = [
"Серега и Ри",
"Сережа KEL'T",
"Серёжа Драгни",
"Серёжа Северный",
"Сережки",
"Серж Берков",
"Серж Мэй",
"Сероб Аджемян",
"СеРы",
"Серьга",
"Сёстры Григ",
"Сёстры Роуз",
"Сестры Толмачевы",
"Сибириада (Ленинск-Кузнецкий)",
"Сидоджи Дубоshit & Грязный Рамирес",
"СилаВоли",
"Силуянова",
"Симптом (НЖН) & 4atty aka Tilla",
"Синяя Птица",
"Сиран Агасаров",
"Сказка",
"Скаттл",
"Сквоз",
"Скептик",
"Скриптонит",
"СКРО",
"Скруджи feat. Pabl.A",
"Скруджи feat. Павел Мурашов",
"Скруч feat. Anasteisha",
"Скрябін (Скрябин)",
"Слава Маркес",
"Слава (Slava)",
"Слава Басюл",
"Слава Благов",
"Слава Бодолика и Доминик Джокер",
"Слава Булгакова",
"Слава Воронцов",
"Слава и Любовь Успенская",
"Слава и Стас Пьеха",
"Слава Исетский мл.",
"Слава Колодяжный",
"Слава Лад",
"Слава Маркес",
"Слава Соколов",
"Слава Фактор feat. Vache",
"Слава Шарк",
"Слава Юн feat. Фьюз (Krec)",
"СлаВВо",
"Славяна",
"Сладка Ягода",
"Сладкий Сон",
"Сладолёдъ",
"Сливки",
"Словетский (Константа)",
"Слот",
"Служебный роман",
"Смирнов Дмитрий",
"Смирнов и Компания",
"Смоки Мо",
"Смысловые Галлюцинации",
"Снегирь",
"Снежана Королёк",
"Снежана Смолянская",
"Собаки Качалова",
"Собачье Сердце",
"Собор Парижской Богоматери",
"Согдиана",
"Солла Смитт",
"Солнце and Michelangelo",
"Солнце Свободы (Руставели, White Hot Ice, Ян Sun)",
"Соловушка",
"Соломин",
"Соль Земли",]

с_rus_list_6 = [
"Соня Кей",
"Сопрано 10",
"Сосо Павлиашвили",
"Сотканные Небом",
"Софи Кальчева",
"Софи Либерман",
"София Джалилова",
"София Куценко",
"София Морару",
"София Принц",
"София Ротару",
"София Тайх",
"София Тарасова",
"София Яремова",
"Софья Лукьянова",
"Софья Фисенко",
"Спартак Арутюнян и Эльдар Артист",
"Спасатели",
"Сплав 360 feat. Артём Татищевский",
"Сплин",
"Спокоен и Пустой",
"Спрут Андриевский",
"Спящая Красавица",
"Станислав Сорока",
"Станислав Перелыгин",
"Станислав Приленский",
"Станислав Сорока",
"Станционный Смотритель",
"Станция №3",
"Станция Люга",
"СтанцияПоВстречной",
"Стары Ольса",
"Старый Гном",
"Старый Кадиллак",
"Старый примус",
"Старый Приятель",
"Стас Борисов",
"Стас Видяев",
"Стас Высочин & Артур Тринёв",
"Стас Жандаров",
"Стас Колиогло",
"Стас Костюшкин",
"Стас Михайлов",
"Стас Море)",
"Стас Назимов И Татьяна Андреева",
"Стас Намин",
"Стас Притчин",
"Стас Пухх",
"Стас Пьеха",
"Стас Шуринс",
"Стас Ярушин",
"СтаЯ",
"Стейсон",
"Стекловата",
"Стелла Джанни",
"Стен и Татьяна Котова",
"Стёпа Hope",
"Степан Вовкун",
"Степан Корольков",
"Степанковская",
"Стерео21",
"Стерео21 & MainstreaM One",
"Стерео21 feat. Stasya",
"СтереоПара",
"Стефания Маликова",
"Стимул",
"СтИчение Обстоятельств",
"Столица",
"Стольный Град",
"Стольный Град (Михалыч & Фир)",
"Стольный Град (Фир, TS)",
"Стольный Град feat. Джора",
"Стоматолог и Фисун",
"Страйк",]

с_rus_list_7 = [
"Стрелки",
"Стрельникова Марина",
"Стрельцов",
"Стриж (C.3.Ж)",
"Стриж & Амир (Легенды Про)",
"Стыця",
"Стэйм feat. Storied Boy",
"Су.гроб & Morralles",
"Султан (Sultan)",
"Султан Айгази",
"Супердетки",
"СуперПолина",
"Сурганова и Оркестр",
"Сухие",
"Сценакардия",
"Сэм feat. iLa & Амир (Легенды Про)",
"Сэм Варди",
"Сэм Петросян",
"Сюзанна Абдулла",
"Сябры",
]

litera = SoundSymbol.objects.get(name="С")

count = 0

for tag in с_rus_list_7:
    tracks = client.get('/tracks', q=tag, limit=page_size, linked_partitioning=1)
    if tracks:
        for track in tracks.collection:
            created_at = track.created_at
            created_at = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
            if track.description:
                description = track.description[:500]
            else:
                description=None
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
                else:
                    description=None
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
