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

i_rus_list_1 = [
"I Am A Camera",
"I Am Giant",
"I Am Karate",
"I Am Kloot",
"I Am Legion",
"I Am Sam",
"I Do",
"I Giorni",
"I Moderni",
"I ON",
"I Prevail",
"I Roy",
"I See Monstas",
"I See Stars",
"I_o x Tommy Trash",
"I-Kon feat. Basstype",
"I-Mo feat. Amante",
"I-RON & Maestro",
"I-Two & Radz",
"I. Vanstein Orc",
"I.Y.F.F.E",
"I'm Clever Artist Name feat. Rob The Singer",
"I1",
"Iama",
"iamamiwhoami",
"IAmChino",
"Iamcompton feat. Rich Homie Quan",
"Iamsimon",
"IamSu",
"Iamsu! feat. Snoop Dogg",
"Iamx",
"Ian & Kerry",
"Ian & Tyana",
"Ian Burlak",
"Ian Carey",
"Ian Davecore",
"IAN feat Maryna",
"IAN feat. Tyana",
"Ian Frey",
"Ian G & Matierro feat. Brenton Mattheus",
"Ian Gillan",
"Ian Jury",
"Ian Kelly",
"Ian Mart",
"Ian Rodriguez",
"Ian Source",
"Ian Storm",
"Ian Thomas feat. Tyga",
"Ian Turner vs. Tony T",
"Ian Van Dahl",]

i_rus_list_2 = [
"Iana feat. Alessandra",
"Iankoo feat. Mamasita",
"Iann Dior feat. Travis Barker",
"Iarina & Guy Elberg",
"Ibeyi",
"Ibiza Groove Squad",
"Ibiza Sunset",
"Ibra",
"Ibrahim Celik feat. Lizzie",
"Ibranovski feat. Ziya",
"Ibtissam Tiskat feat. Alex Mica",
"Ic2 feat. Pitbull & Peetah Morgan",
"iCandy",
"Icarus",
"Ice Cube",
"Ice Dыm & DRedd",
"ICE KIQQ",
"Ice Lo",
"Ice M.C.",
"ICE MC",
"Ice Project",
"Ice T",
"Iced Earth",
"Iceleak",
"Ich Troje",
"Ichinen Project",
"Icky Blossoms",
"ICoen",
"Icon & Pedro Capo feat. Reykon",
"Icon For Hire",
"Icona Pop",
"Iconic Monument",
"IcoS feat. Lara",
"ICQ",
"ID",
"Ida",
"Ida Corr",
"Ida Da Silva",
"Ida Engberg",
"Ida Galich",
"Ida LaFontaine",
"Ida Sofie & Ruud",
"Ida Warg",
"Idea",
"Idee",
"Idenline",
"Ideo & Fax & Max Fail feat. Sierra",
"IDIBlack, Эсчевский, Old Nordan, Кукла Ву",
"Idina Menzel",
"Ido B & Zooki",]

i_rus_list_3 = [
"Idon feat. Amaly",
"Idris & Leos",
"Idris Elba",
"Ieva Zasimauskaite",
"Ifigenia",
"Iggi Kelly",
"Iggy Azalea",
"Iggy Pop",
"Ignora feat. Дима Ай-Q",
"Ignosci feat. Aquila Tavai",
"Igor Bagdasar",
"Igor Blaska",
"Igor Cukrov",
"Igor Dyachkov",
"Igor Garnier",
"IGOR KLUCH",
"Igor Leus feat. Daria Lucky",
"Igor Marx",
"Igor Voevodin & DJ Emil & Syntheticsax",
"Igranka",
"IIBE",
"iiiii eyes & Marija Cheba",
"Iio",
"Ika",
"IKA feat. Роман Bestseller",
"Ike Turner, Ike",
"Ikerya Project",
"iKON",
"Ikon & Exodus feat. Sisely Treasure",
"IKRA",
"Iksiy",
"Ikuko Kawai",
"Il Divo",
"Il Pagante",
"Il Santo",
"Il Volo",
"ilan Bluestone",
"Ilan Eshkeri",
"Ilani",
"ILectronic",
"ILEZER",
"Ilham",
"Ilhama & U-Jean feat. OGB",
"Ilia Darlin",
"Iliana",
"Ilinca",
"ILIRA",
"Ilkan Gunuc",
"Ilkay Sencan",
"iLL BLU",]

i_rus_list_4 = [
"Illa Ghee",
"ILLARIA",
"Illenium",
"Illenium x Jon Bellion",
"Illitheas",
"Illou G",
"Illumate",
"Illuminor",
"ILLUS!'Я",
"Illy",
"Ilo Ilo",
"ILoveMakonnen",
"ILY",
"Ilya Belov",
"Ilya Beshevli",
"Ilya Lam",
"Ilya Malyuev",
"Ilya Ozon",
"Ilya Soloviev",
"Ilya Vertigo feat. Andy Rey",
"ILYB",
"IM4N",
"ImaImani Williams feat. Sigala & Blonde",
"ImanoS",
"Imanotik",
"Imany",
"iMba и Капа",
"Imelda May",
"IMKK feat. Jess Smyth",
"Immediate Music",
"Immensus",
"Imogen Heap",
"Imperfect Hope",
"Impression",
"Impromptu",
"Impulse",
"Impulse 2 feat. Mimi Barber",
"ImpulseMusic",
"Impulsivity",
"Imri",
"Imstorie",
"Imugi",
"In Credo",
"In Da Team",
"In Dreams Of Reality",
"In Extremo",
"In Flames",
"In Grid",
"In Orbit",
"In Paradise",]

i_rus_list_5 = [
"In Real Life",
"In Stereo feat. M!ss Me",
"In The Screen",
"In This Moment",
"In This Temple",
"In-Di-Go",
"In-grid",
"In-Tens",
"Imad",
"Imagen Life",
"Imagination",
"Imagine Dragons",
"Imam Baildi",
"Ina Wroldsen",
"Inanna",
"Inara",
"Inas X",
"Inaya Day",
"Inci3ion feat. Zara Taylor",
"Incognet",
"Incognito",
"Incognito Sax Band",
"Increase Joy",
"Incredible Bongo Band",
"Incubus",
"InCulto",
"Indaqo",
"Indecent Noise",
"Independent Art",
"Indevotion",
"Index",
"Indhira Luna feat. Phil Coste",
"Indi-Go",
"India Love feat. Will.i.am",
"India Martinez",
"India Shawn",
"India.Arie & Joe Sample",
"Indiah",
"Indian Boi",
"Indian Princess",
"Indian Summer feat. Lastlings",
"",
"Indiana",
"Indifferent Guy feat. Eva Pavlova",
"Indifferent Guy, Eva Pavlova",
"Indigo",
"INDIIA feat. Whitney Philips",
"Indila",
"Indira",
"Indlla",]

i_rus_list_6 = [
"Indra",
"Induction Effect",
"Indy Lopez",
"Indyana feat. Anggun",
"Inelfie",
"Inertia",
"Ines",
"iNexus",
"iNexus & Panda Eyes",
"Inez",
"Inez Jasper",
"Infected Bros.",
"Infected Mushroom & Bliss",
"Infected Mushroom feat. Sasha Grey",
"Infernal",
"Infinia feat. Geneve",
"Infinite Sole feat. Raycee & Mills",
"Influence Music feat. Matt Gilman",
"Infuze",
"Inga And Anush",
"Ingenia feat. Fabienne Lantinga",
"Inglide",
"Ingo Herrmann",
"Ingret",
"Ingrid Andress",
"Ingrid Cup",
"Ingrid Michaelson",
"Ingrid Witt",
"Ingrit Gјoni feat. Stinе",
"Ingvar",
"Ingyala",
"inHeart",
"Ini Kamoze",
"Inice & Skratch",
"INII feat. Кирилл Андреев",
"Init",
"INKA",
"Inki",
"Inma Andreu",
"Inna & DJ Sem feat. Matt Houston",
"Inna & The Kidz",
"Inna & Vinka",
"Inna feat. Daddy Yankee",
"Inna feat. Eric Turner",
"Inna feat. Erick",
"Inna feat. Flo Rida",
"Inna feat. J Balvin",
"Inna feat. J Son",
"Inna feat. Marian Hill",
"Inna feat. Pitbull",]

i_rus_list_7 = [
"Inna feat. Play & Win",
"Inna feat. Play and Win",
"Inna feat. Reik",
"Inna feat. The Motans",
"Inna feat. Yandel",
"Inna feat. Потап",
"Inna Felix",
"Innarhanum feat. Dumitresku",
"Innate Forte",
"Inner Circle",
"Inner City feat. Steffanie Christi'an",
"Inner Dream",
"Inner Smile",
"Innersouls",
"Innes Sibun",
"Innocence feat. Brian Cross",
"Inpetto",
"Inquisitive feat. Aleya & The Lioncityboy",
"Insan3lik3 feat. Charlotte Haining",
"Insane & Stone",
"Insaneradicalguys",
"Insanity",
"Inside DJs",
"Insideout",
"Inspirational Gospel Singers",
"Inspired Souls",
"Instant Cult",
"INSTRUM feat. Somni",
"Instrumental Core",
"Insulin Junky feat. Ann Bailey",
"Int3l",
"Intars Busulis",
"INtegra",
"Integro",
"INtellegent",
"Intended Immigration",
"Intense feat. Different Direction",
"Interactive",
"Interface",
"International Baby",
"Internet Money feat. Lil Tecca & A Boogie Wit Da Hoodie",
"Interphace feat. Ellie",
"Interstate Blues",
"Intigam feat. Manky Monk ОУ74",
"Intreega",
"Inukshuk & Trove",
"Inur",
"Inusa Dawuda",
"Inuuro",
"Invader Girl",]

i_rus_list_8 = [
"Inventive Sound",
"Inventors Of The Sun",
"Invert",
"Investo feat. Tara McDonald",
"Invictous",
"Invisible Dye Project",
"InVisions",
"Inward Universe & Dapa Deep",
"INXS",
"iO",
"Ioana feat. Anastasia",
"Ioana Ignat",
"IOI feat. Joel Jorgensen",
"Iome & Kochnev feat. Irina Lipavskaya",
"Ion Blue feat. Danny Claire",
"Ion Zegri",
"Ionel Istrati",
"Ionut Sturzea & Ramona Lazuran",
"Iordan",
"IOVA",
"IOWA",
"IQ",
"Iq-Check",
"IQ-Talo & Miss LaLuna",
"IQDO feat. Medvedev",
"Ira & Paulina Dubaj",
"Ira & Sarah Russell",
"Ira Atari",
"Ira Losco",
"Ira M",
"Ira May",
"Ira Smith",
"Ira Smith & Klik Este",
"Ira Statsyura",
"Irada",
"Iraida",
"Iraklis I.D",
"Irama",
"Irdorath",
"Iren Gotye",
"Irene",
"Iriada",
"Irina Domogatskaya & Артем Хитч",
"Irina feat. Dave Aude",
"Irina Makosh",
"Irina Mikhailova",
"",
"Irina Pop",
"Irina Rimes",
"Irina Rimes & Vanotek",]

i_rus_list_9 = [
"Irina Rimes feat. The Motans",
"IRina Rosalina",
"Irina Ross",
"Irina S. & Hima",
"Irina Shok",
"Iris",
"Iris Dee Jay",
"Iris Gold",
"Irisha",
"Iriz",
"Irkenc Hyka feat. Petro",
"Irma",
"IRO",
"IROH",
"Iron & Wine",
"Iron Altar",
"Iron Jay EL",
"Iron Lyon",
"Iron maiden",
"Iron Oaks",
"Ironik",
"IRRA",
"Irregular Synth",
"Irresistible",
"IRSON",
"Isa B.",
"Isaac Delusion",
"Isaac Dunbar",
"Isaac feat. Маша Фокина",
"Isaac James feat. Akon",
"Isabel Wood",
"Isabela Pamparau",
"Isabela Souza & Elenco De BIA",
"Isac Elliot",
"Isaev",
"Isaiah",
"Isak Danielson",
"Isamin",
"Isato Nakagawa",
"ISAXO",
"Isbells",
"Ise",
"Iselin",
"Isha",
"iSHi",
"Ishtar",
"Isis Gee",
"Isis Salam feat. Kruse & Nuernberg",
"Iskender Paydas feat. Tarkan",
"ISLAND",]

i_rus_list_10 = [
"Island Sun",
"Isle Of You",
"IsoQuant",
"IsQuare",
"Israel",
"Istiana feat. Erian Asllani",
"Istokiya",
"Isupov",
"Isа",
"It's Different feat. Miss Mary",
"Itaka",
"Italian Boys",
"Italian Party",
"Italo Vieira",
"Italobrothers",
"ItaloLoverz",
"ItaloMelody",
"Italove",
"Itay Kalderon",
"Itzhak Perlman",
"Iulia Dumitrache",
"Iulian Florea",
"Iulian Vasile",
"IV Rox feat. Majestic",
"Iva L'Queen Gonzo",
"Ivah (Светлана Светикова)",
"Ivan ART",
"Istokiya feat. Батишта",
"Isupov",
"It's Different feat. Miss Mary",
"Italian Boys",
"Italian Party",
"Italo Vieira",
"Italobrothers",
"ItaloLoverz",
"ItaloMelody",
"Italove",
"Itay Kalderon",
"Itzhak Perlman",
"Iulia Dumitrache",
"Iulian Florea",
"Iulian Vasile",
"IV Rox feat. Majestic",
"IVA",
"Iva L'Queen Gonzo",
"IVAH",
"Ivah (Светлана Светикова)",
"Ivan & Santa Crus",
"Ivan And Delfin",
"Ivan ART",]

i_rus_list_11 = [
"Ivan Reys",
"Ivan Roudyk feat. Nasta",
"Ivan Speljak Jitz",
"Ivan Spell",
"Ivan Troyano feat. Alex Xela & Eddy Nick",
"Ivan Valeev",
"Ivana",
"Ivanitskaya",
"IVANKOVA",
"Ivarsson feat. Bang & Neumann",
"Ivashov",
"Iversoon & Alex Daf",
"Iveta Mukuchyan",
"Ivete Sangalo feat. Shakira",
"Ivi Adamou",
"Ivi Grau",
"IVKA",
"Ivy Adara",
"Ivy Jax",
"Ivy League",
"Ivy Levan",
"Ivy Rei",
"Iwaro",
"IYA feat. Нервы",
"Iyaz",
"IYES & Ryan Riback",
"IYFFE feat. Seth Somni",
"Iyul",
"IZA",
"Izaak feat. Brray & Chris Wandell",
"Izabo",
"Izan Llunas feat. RK",
"iZReal",
"Izzy",
"iZZZada",
"Iсаrus",
]

litera = SoundSymbol.objects.get(name="I")

count = 0

for tag in i_rus_list_10:
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
                    new_track = SoundcloudParsing.objects.create(id=track.id, tag=self_tag, artwork_url=track.artwork_url, created_at=created_at, description=description, duration=track.duration, genre=genre, title=track.title, uri=track.uri, release_year=track.release_year)
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
                        new_track = SoundcloudParsing.objects.create(id=track.id, tag=self_tag, artwork_url=track.artwork_url, created_at=created_at, description=description, duration=track.duration, genre=genre, title=track.title, uri=track.uri, release_year=track.release_year)
                    count = count + 1
