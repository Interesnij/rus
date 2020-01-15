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

f_rus_list_1 = [
"F. Jay",
"F. R. David",
"F.A.C.E. feat. Margaret Berger",
"F.B. Machine",
"F.Charm",
"F.G. Noise & Riialto",
"F.L.Y.",
"F.P.DJs feat. Sara Ami",
"F.R. Connection",
"F.R. David",
"F&M Project",
"F1REX",
"Fa.Ku",
"Faber Drive",
"Fabian Bandel",
"Fabian Luttenberger feat. Novaa",
"Fabian Mazur",
"Fabich",
"Fabio Da Lera",
"Fabio De Venere",
"Fabio feat. Palagin",
"Fabio Nita",
"Fabio Rovazzi",
"Fabio Sparda",
"Fabio XB",
"Fabiola feat. Loredana",
"Fabolous",
"Fabricio Pecanha",
"Fabrikate",
"Fabrizio Faniello",
"Fabrizio Parisi & WahTony feat. Eva Parmakova",
"Fabrizio Paterlini",
"Fabulous Lemon Drops",
"Faby Jackson",
"Face II Face",
"Faces",
"Factor B",
"Fade El Que Pone La Presion",
"Fademan & Oleg K Feat. Lime Kid",
"Fader Lima",
"Fadi",
"Fafaq",
"Fahjah & Emma Chatt",
"Fahjah feat. Command Sisters",
"Fairchild",
"Fairlane & Trove",
"Fairtone",
"Fairuz",
"Fairy Tale",
"Fairyland",]

f_rus_list_2 = [
"Fais feat. Afrojack",
"Faith Evans",
"Faith Hill feat. Tim Mcgraw",
"Faith Moriah",
"Faithless",
"Fajah Lourens",
"Fakdem",
"Fake & Andy Rey",
"Fake feat. Slider & Magnit",
"Fake feat. Паша Сли & PavAnd",
"Fake Forward & Amba Shepherd",
"Fake Forward feat. Erika",
"Fake Pictures",
"Fakear",
"FakiL",
"Faktor-2",
"Falco",
"Falcom & LMK",
"Falconer",
"Falcons feat. TZAR",
"Falk Bachert",
"Falko Niestolikr",
"Fall Out Boy",
"Fallander feat. Anna Montgomery",
"Fallen",
"Fallen Roses & Subsets feat. Ayelle",
"Falling In Reverse",
"Fallulah",
"Fally Ipupa feat. Aya Nakamura",
"Falone",
"Famba",
"Fame",
"Family Force 5",
"Family Of The Year",
"Famme feat. Андрей Запал & Дима Север",
"Famous Dex",
"Famous Fresh feat. Chris Brown",
"Famous To Most",
"Fancy",
"Fancy Cars",
"Fancy Featuring High K.",
"Fancy Power",
"Fancybeat",
"Fandorin",
"Fanelli & Marani",
"Fani Avramidou",
"Fanny Andersen",
"Fanny Cadeo",
"Fanny Lu feat. Zion & Lennox",
"Fanny Neguesha",]

f_rus_list_3 = [
"Fannypack feat. James Francis",
"Fantasia",
"Fantastic Flowers",
"Fantastic Negrito",
"Fantastique",
"Fantasy",
"Fantazy",
"Fantomen",
"Fanton",
"Fanway & Alex Berrett",
"Faouzia",
"Far East Movement",
"Far For",
"Far Out",
"Far Too Loud",
"Farenthide & Hubertuse feat. Kitch",
"Fareoh",
"Fares",
"Farewell 2 Fear",
"Fargetta",
"Fargo",
"Farhad Mahdavi",
"Farhad Zohdabady & Sajjad Zakaria",
"Fariborz Mokhtari & Maraal",
"Farid Mammadov",
"Farida",
"Farina",
"Farisha",
"Farius",
"Fariz Fortuna",
"Fariz Mamed",
"Farkas feat. Kris Kiss",
"Farlan",
"Farleon",
"FarLight",
"Farmdale",
"Farrah",
"Farruko",
"Fartech",
"Faruk Aslan",
"Faruk Orakci",
"Faruk Sabanci",
"Farzani & Абдулкарим Каримов",
"Farzin & Milad E",
"Farzzzi",
"Fashawn",
"Fashion Beat",
"Fashion Lioness",
"Fast Distance",
"Fast Eddie feat. BM",]

f_rus_list_4 = [
"Fast Food",
"Fat Cat Cinema",
"Fat Joe",
"Fat Larry's Band",
"Fat Trel feat. Wale & Rick Ross",
"FAT V",
"Fatan & Forlen",
"Fatbelly & Abdr.",
"Fatboy Slim",
"Fate After Midnight",
"Fates Warning",
"Father John Misty",
"Fatherson",
"Fatih Basoglu",
"Fatman Scoop",
"Fats Waller",
"Fats Waller & His Rhythm",
"Fatum",
"FAU",
"Faucon",
"Faul & Wad & Superfunk feat. Ron Carroll",
"Faul & Wad Ad",
"Faul & Wad Ad vs. Pnau",
"Faul & Wad feat. Vertue",
"Faulhaber",
"Faulhaber feat. Jake Reese",
"Faustix",
"Fausto Papetti",
"Faux Tales",
"Fauxliage",
"Favara & Viola feat. Andrea Morph",
"Favlav",
"Favored Nations",
"Favorite Star",
"Favright feat. Cassandra Kay",
"Favulous feat. Cybil",
"Fawni",
"FAWZY",
"Faxonat",
"Fay",
"Faydee",
"Faye",
"Fayz feat. Latino",
"Faze",
"Faze-O",
"Fazli",
"Fazura",
"FD feat. Fox",
"FDVM & Solar State",
"FDVM feat. Gelbuda",]

f_rus_list_5 = [
"FDVM feat. Jack And The Weatherman",
"Fear Of Dawn feat. Boswell",
"Fearless feat. Chany",
"Feathers",
"Feature Cuts feat. Alana Potocnik",
"Fedde Le Grand",
"Feder",
"Federico Albanese",
"Federico Aubele",
"Federico Balducci",
"Federico Costantini feat. B-LAW",
"Federico Naccari & Dubstone",
"Federico Nota, Overtake",
"Federico Portale",
"Federico Scavo",
"Federico Seven",
"Fedez feat. LP",
"Fedez feat. Zara Larsson",
"Fedo and Ask",
"Fedo Mora",
"Fedoga",
"Fedor & Еф13",
"Fedos",
"Feduk",
"Feed Me",
"FeedBack",
"Feeder",
"Feel",
"Feel Freeze",
"Feenixpawl",
"Feeron",
"Feex",
"Fefe",
"Fefe Dobson",
"Fehrplay",
"Fei Fei feat. Molly Jenson",
"Feid feat. Maluma & Sky",
"Feint",
"Feist",
"Feki",
"Fekky feat. Skepta",
"Fela Kuti",
"Felguk",
"Feli",
"Felicia Temple",
"Feliciana",
"Felicity",
"Felipe C",
"Felis feat. Anar Zxz",
"Felisha",]

f_rus_list_6 = [
"Felitsa",
"Felix Jaehn",
"Felix & Fregonese feat. Faith",
"Felix Cartal",
"Felix Da Housecat feat. Will.I.Am",
"Felix Erskine",
"Felix Jaehn",
"Felix Krocher",
"Felix Leiter",
"Felix Sandman",
"Felix Snow",
"Felizia K",
"Fella",
"Felly feat. Santana",
"Felon",
"Feltting",
"Felxprod",
"Female",
"Feminnem",
"Fen-X feat. Sisley",
"Fence Li",
"Fences",
"Feng Shui",
"Fenix & Terri B!",
"Fenix feat. Frankie",
"Fenne Lily",
"Fenomenon",
"Fenton Gee",
"Fentura",
"Ferdinand Weber",
"Fergie",
"Fergus James",
"Fergus Keogh feat. Tiff Lacey",
"Fernand Rolex & Edjus Sema feat. Morgana",
"Fernand Rolex vs. EM Project feat. Morgana",
"Fernando & Freddy feat. Timee",
"Fernando & Richard Spark feat. Freddy",
"Fernando Bavaro",
"Fernando feat. Brigi",
"Fernando Olaya",
"Fero Lux",
"Ferrasi",
"Ferre Santos",
"Ferreck Dawn",
"Ferrin & Morris",
"Ferris & Kyle Pearce",
"Ferry Corsten",
"Ferry feat. Ashley Jana",
"Ferry Sander feat. Eira G",
"Ferry Tayle",]

f_rus_list_7 = [
"Ferum",
"Fetal Decay",
"Fetty Wap",
"Feverpitch feat. Rozalla & Stylo G",
"FFlip Da Scrip & Michael Beltran",
"Fher Vizzuett",
"Fia Moon",
"Ficci feat. Laura Hahn",
"Ficci feat. Snowflake",
"Fickle Friends",
"Fidel Wicked",
"Fidelio",
"Fidelle",
"Fie Laursen",
"Fiesta Loca",
"Fifi",
"Fifteen Of May",
"Fifteenth",
"Fifth Harmony",
"Fight CLVB",
"Figure",
"Fijin",
"Fika",
"Fike",
"Fike feat. Bro Sound",
"Fil Renzi Project",
"Filatov & Karas",
"FILATOVA",
"Fileum feat. Kalle Johansson",
"Filin",
"Filip Jenven feat. Max C",
"Filip Lundqvist",
"Filipa Azevedo",
"Filipa Sousa",
"Filipe Guerra",
"Fillin",
"Filly Bee",
"Filous",
"FiloXenia feat. Sophia.",
"Filter",
"Filter Funk",
"Filtercrush feat. Anna Yvette",
"Filtercut",
"Filtered Tools feat. Piranya",
"Filthy French",
"FILV",
"Fimos",
"Final Story",
"Finat",
"Find Ma Duo",]

f_rus_list_8 = [
"Finding Clyde",
"Finding Hope feat. Deverano",
"Findlay",
"Findlay Brown",
"Fine Touch",
"FineArt feat. Rachel K Collier",
"Finger and Kadel",
"Fink",
"Finn Andrews",
"Finneas",
"FiNout feat. Женя Mad",
"FiNT (iZReaL)",
"FIO & Blumenkraft feat. Stephen Pickup",
"Fiona Apple",
"Fiora",
"Firas Tarhini",
"Firat Karakilic",
"FireAnts & Han",
"Firebeatz",
"Firebird",
"Firebounce",
"Fireflight",
"Firefox AK",
"Firejack feat. Gabriela Brown",
"Fireland",
"Firelight",
"Firenze",
"Firewind",
"FIREX",
"Firma",
"First Base",
"First Effect feat. Olivia",
"First Light",
"First Place",
"First Signal",
"First State",
"Firstep",
"Fischer & Miethig",
"Fischerspooner",
"Fish Fugue",
"Fisher",
"Fisherman & Hawkins",
"Fist feat. Илья Зудин (гр. Динамит)",
"Fit For Sound",
"Fiti-X & Martin Machore feat. Liz Martin",
"Fitness Figures",
"Fito Blanko",
"Fitz & The Tantrums",
"Fitz And The Tantrums",
"Fiusti & Bettoni feat. Andrea Love",]

f_rus_list_9 = [
"Five",
"Five Finger Death Punch",
"Five For Fighting",
"Five Knives",
"Fiver",
"Fix You",
"Fix8 feat. Gretchin",
"FIXL & November Lights",
"Fixx It",
"FJ & Aisha",
"Fjer",
"Fjord",
"FKA Twigs",
"Flacoustics feat. ELTO",
"Flagbag",
"Flagi",
"Flagz",
"Flahdaeh feat. Snoop Dogg",
"Flakke",
"FlameMakers",
"Flamorn",
"Flanders",
"Flanger Curtis",
"Flaremode feat. Tayma",
"Flash",
"Flash feat D.I.P. Project",
"Flash Finger",
"Flash Flyers",
"Flashrider feat. Kelli Leigh & Renald",
"Flashtronica",
"Flatbush Zombies",
"Flatdisk",
"Flava & Stevenson",
"Flavel & Neto",
"Flavio Renegado",
"Flavio Siciliano",
"Flavy DeeJay",
"Flawes",
"Flawless feat. Steph Jones",
"Flaws",
"Flayed",
"Flechette & Beauty Brain",
"Fleet Foxes",
"Fleetwood Mac",
"Fleming",
"Flemming",
"Fletcher",
"Fleur",
"Fleurie",
"Flexile & Ivan Jamile",]

f_rus_list_10 = [
"Flexx",
"FlexXTronic",
"FLGTT",
"FlicFlac feat. Dominic Donner",
"Flight Facilities",
"Flight Mode",
"Flinch",
"Flint Eastwood",
"Flip Capella",
"Flip Da Scrip",
"Flipside",
"Flipsyde",
"Flite",
"Fliwo",
"Flo Bauer Blues Project",
"Flo Cole feat. Zedd",
"Flo Rida",
"Floes feat. Ghostly Kisses",
"Flor",
"Flor-de-Lis",
"Flora Cash",
"Flora Martinez",
"Florena",
"Florence & The Machine",
"Florence & The Machine",
"Florence And The Machine",
"Florent Campana",
"Flores",
"Flori Mumajesi",
"Florian Fai",
"Florian Paetzold",
"Florian Picasso",
"Florian Rus & Mira",
"Florian Sagners Groove Deepartment",
"Florida Georgia Line",
"Florin Maxineanu",
"Florina",
"Florito",
"Florrie",
"Florzinho",
"Flosstradamus",
"Flow Reena",
"Flowidus feat. Samahra Eames",
"Flowtexx & Jamalmentals feat. Alexa Jervis & La Dream",
"Fluencee feat. Bri Tolani",
"Fluir",
"Flume",
"Flush",
"Flux Pavilion",
"Fly & Sasha Fashion",]

f_rus_list_11 = [
"Fly Away",
"Fly By Midnight",
"Fly DJ's feat. Jessica D",
"Fly DJs",
"Fly Dollah",
"Fly Panda",
"Fly Project",
"Fly Street Gang",
"Flyboy",
"Flying Decibels",
"Flying Lotus feat. Denzel Curry",
"FLYNN",
"Flyover",
"Flypside",
"Flёur",
"FM",
"Fm Project",
"FM!",
"FM154",
"FMZ",
"Fnc feat. Hollie & El Conve",
"Fo Onassis ft. Kat Deluna & Fatman Scoop & Dj David S",
"Foals",
"Foggy",
"Fokichev",
"Folkbeat",
"Follow Your Instinct feat. Alexandra Stan",
"Folly Rae",
"Fomichev feat. Jacks Michelle",
"Fomins & Kleins",
"Fon.Leman & Vndy Vndy",
"Fonari",
"Foncho feat. Kito Morales & Mr. Rommel",
"Fonik",
"Fonik & Savrn",
"Fonik feat. Northern Pioneers",
"Fono feat. Anna Straker",
"Fontaine Ivory",
"Fontano",
"Fonty & Omar",
"Foo Fighters",
"Fool House",
"Fool's Garden",
"For BDK",
"For Every Day",
"For Found Future",
"For People",
"For The Taking",
"Forbidden Fruits",
"Forbidden Mind",]

f_rus_list_12 = [
"Ford Turrell",
"Foreign Beggars",
"Foreign Concept feat. Naomi Olive",
"Foreign Twiinz feat. Riff Raff",
"Foreigner feat. Nate Ruess",
"Forekast & TyGr",
"Forest Blakk",
"Forest Magic",
"Forever Ends Here",
"Formal One",
"Format",
"Formula",
"Formula 2 feat. Marlena",
"Fornicras & Khontkar",
"Forrest Gump",
"Forrest Run",
"Fort Arkansas",
"Fort Arkanzas",
"Fort Atlantic",
"Fort Lean",
"Fort Minor",
"FORTE",
"Forteba feat. Virag",
"Fortuna & Casus feat. Elina Milan",
"Fortune Players feat. Betti & Dannona",
"Forus",
"FOS",
"Fosha",
"Foster The People",
"Four A.M.",
"Four Of Diamonds",
"Fource feat. Maad Moiselle",
"Fourlicious",
"Fourteen 14",
"Fourward",
"Fourward feat. Grimm",
"Fous De La Mer",
"FOX",
"Fox Amore",
"Fox Invasion & Equo feat. KoSSen",
"Fox Stevenson",
"Foxa & Hayes",
"",
"Foxe Basin",
"Foxes",
"Foxing",
"Foxtrott",
"Foxy As Fox",
"Foy Vance",
"Foyk feat. Sirin",]

f_rus_list_13 = [
"Fraag Malas",
"Fractal feat. Syrin",
"Fracture Design",
"Fractures feat. ROZES",
"Fraea",
"Fragma",
"Frainbreeze",
"Frainbreeze & Kate Miles",
"Fraktal",
"Fran DC feat. MC Dues",
"Fran Garcia & Maartin Rubik",
"Fran Marin",
"Franbeats & Julius Beat",
"Franc Livvi",
"Franca Morgano",
"Frances",
"Frances Rose",
"Francesc Torrens",
"Francesc Torrens, Nicolas Zuloaga",
"Francesca Battistelli",
"Francesca Kray",
"Francesca Maria",
"Francesca Michielin",
"Francesca Milazzo",
"Francesca Moreno & Pierre D'Oro feat. Lily",
"Francesca Ramirez",
"Francesco Conte & David Broderick",
"Francesco Diaz",
"Francesco Gabbani",
"Francesco Giglio",
"Francesco Gomez",
"Francesco Napoli",
"Francesco P feat. Nira",
"Francesco Ramirez",
"Francesco Rossi feat. Lawi and B.B.Cico Z",
"Francesco Sarcina",
"Francesco Sartori & Sir James Galway",
"Francesco Sparacello",
"Francesco Yates",
"Franchi",
"Francine Jordi",
"Francinne",
"Francis Davila",
"Francis Goya",
"Francis Mercier",
"Francisca",
"Francisco",
"Franck Fossey & Frederic Vitani",
"Franck Larose feat. EL Cuelno",
"Franco Rossi & Francisco Lamponi",]

f_rus_list_14 = [
"Franco Scaravaglione",
"Frank Borell",
"Frank Cherryman",
"Frank Degrees, Markus H, Kool Koor",
"Frank Dueffel",
"Frank Duval",
"Frank Gambale",
"Frank Gamble",
"Frank Morello",
"Frank Ocean",
"Frank Pole",
"Frank Raven",
"Frank Rivers",
"Frank S",
"Frank Savannah & Nahyanne",
"Frank Sinatra",
"Frank Sinatra & Duke Ellington",
"Frank Walker",
"Frank Zaruba",
"Franka",
"Frankee",
"Frankie",
"Frankie J",
"Frankie Laine",
"Frankie Miller",
"Frankie Storm",
"Franklin & Digital Farm Animals feat. Sorana",
"Franklyn Weeks",
"Frankman",
"Frankmusik",
"Franko Ovalles",
"Franky",
"Franky Fonell",
"Franky Tunes",
"Franky Wah",
"Franny",
"Franques",
"Frans",
"Fransis Derelle feat. Benji Lewis",
"Franz Ferdinand",
"Franz Peter Schubert",
"Franz Xaver feat. Robert Morr",
"Fratelli feat. Kayla",
"Freakquencies",
"Freaky Boys",
"Freaky DJs",
"Freaky Fortune",
"Fred Baker",
"Fred De Palma",
"Fred Falke feat. Shotgun Tom Kelly",]

f_rus_list_15 = [
"Fred Lilla feat. Niamh",
"Fred Numf & Etienne Overdijk",
"Fred Pellichero feat. Mandy Ventrice",
"Fred V & Grafix",
"Fred Ventura",
"Fred Well",
"Fred Wesley & The Horny Horns",
"Freddie Hubbard",
"Freddie King",
"Freddie McKay & DanZak",
"Freddie Mercury",
"Freddie Nyström Band",
"Freddy Kalas",
"Freddy Verano",
"Freddy Wildblood",
"Frederic Deschamps",
"Frederic Talgorn",
"Frederik Abas",
"Frederik Leopold",
"Frederik Ndoci",
"Fredi Leis",
"Fredo Bang feat. Kevin Gates",
"Fredo Santana feat. Kendrick Lamar",
"Fredrik Nyberg",
"Free Deejays",
"Free Waves",
"Freedom",
"Freedom Dub",
"Freedom Jazz",
"Freedome feat. Sabrina Christian",
"Freeez",
"Freekerz feat. Tony T",
"Freemasons",
"FreeSol",
"FreeStay",
"Freestylers feat. Valerie M.",
"Freeway ft. Eminem",
"Freiheit & SON!X feat. Ashley Apollodor",
"Freischwimmer",
"Freja Kirk feat. Noah Carter",
"French Affair",
"French Connection",
"French Connexion feat. Steklo",
"French Montana",
"French Playerz feat. Fredinhio",
"French Skies",
"Frenchie feat. B.o.B & Chanel West Coast",
"Frenchmasterz feat. Mouss Mc",
"Frenna feat. Mula B",
"Frenship",]

f_rus_list_16 = [
"Fresh & Lipps",
"Fresh DJs pres. Fresh Tunes",
"Fresh Fox & Marco Lessentin",
"Fresh Grooves",
"Fresh Journal",
"Fresh Produce",
"Fresh-I & Raske Penge",
"Freshmaker",
"Freshtone feat. L.O.D.",
"Freundeskreis",
"Frey",
"Freya",
"Freya Ridings",
"Freynik",
"Freza",
"Friction",
"Frida Amundsen",
"Frida Gold",
"Frida Sundemo",
"Fridrik Karlsson",
"Friend Within",
"Friendly Fires",
"Friends",
"Frills",
"Frisco Disco feat. Amanda Lear & Ski",
"Frisco Disco feat. Ski",
"Frissco",
"Fritz Kalkbrenner",
"Frizz-B",
"Frizzy The Streetz",
"Froder",
"Froidz",
"French Playerz feat. Fredinhio",
"French Skies",
"Frenchie feat. B.o.B & Chanel West Coast",
"Frenchmasterz feat. Mouss Mc",
"Frenna feat. Mula B",
"Frenship",
"Fresh & Lipps",
"Fresh DJs pres. Fresh Tunes",
"Fresh Fox & Marco Lessentin",
"Fresh Grooves",
"Fresh Journal",
"Fresh Produce",
"Fresh-I & Raske Penge",
"Freshmaker",
"Freshtone feat. L.O.D.",
"Freundeskreis",
"Frey",
"Freya Ridings",]

f_rus_list_17 = [
"Freynik",
"Freza",
"Friction",
"Frida Amundsen",
"Frida Gold",
"Frida Sundemo",
"Fridrik Karlsson",
"Friend Within",
"Friendly Fires",
"Friends",
"Frills",
"Frisco Disco",
"Frissco",
"Fritz Kalkbrenner",
"Frizz-B",
"Frizzy The Streetz",
"Froder",
"Froidz",
"Frolova & Sionchuk",
"From First To Last feat. Skrillex",
"Front Of House",
"Froogle",
"Froxic",
"Frozen Skies feat. Yana Vetrova",
"FROZT",
"Frozzi & Regattieri",
"Fruela",
"FRUKTЫ",
"Frystal & Zardi feat. Dr. DD",
"Fsc & Sag feat. Yoger",
"FTampa",
"Fudo feat. Ильвина Туктарова",
"Fuego & Nicky Jam",
"Fuel",
"Fuero",
"Fugative",
"Fugees",
"Fukkk Offf",
"Full Circle",
"Full Crate & Mar",
"Full Fusion",
"Full Intention feat. Penny F",
"Full Moon Funk",
"Full Of Keys",
"Full Speed",
"Full Tilt",
"Fullife",
"FullMode",
"Fully Charged",
"Fulton Lee",]

f_rus_list_18 = [
"Fumi Yeah feat. Anca Pop",
"Fun Factory",
"Fun Fun",
"Fun.",
"Funda",
"Funda Kilic & Sinan Akcil",
"Funk Factory & Michael Urbaniak",
"Funk Samba Club feat. Gabriel Diniz",
"Funk-k",
"Funk3d",
"Funk4ward",
"Funkadelic",
"Funkagenda",
"Funkemotion feat. Soraya Vivian",
"Funkerman",
"Funkin Matt",
"Funkk Me",
"Funkwell feat. Dashius Clay & Fader Lima",
"Funkwhite",
"Funky Chicos",
"Funky Control",
"Funky Destination",
"Funky Flo ft. Trixie Love & Sabina",
"Funky Fresh & Alex Estevez feat. Nick Sinckler",
"Funky Therapy",
"Funky Wig",
"Funkybeat",
"FunkyBeatz",
"Funkylover",
"Funkymatthew feat. Ann Nesby",
"FunkЭйнштейн",
"Funpills",
"Furcade feat. Osman & Alex Dalimjanov",
"Furkan Sahin & Berkay Vardal",
"Furkan Ucar",
"FUSE",
"Fuse ODG",
"Fusier",
"Future",
"Future ft. Kelly Rowland",
"Future Jr.",
"Future Mouse",
"Future Of Forestry",
"Future Proof",
"FutureFreqs feat. Alexa Lusader",
"Futuristic Polar Bears",]

f_rus_list_19 = [
"Futuro Pelo feat. La Flaca",
"Fuunstar",
"Fuze (Krec)",
"Fuzzy Admiral",
"Fuzzy Hair",
"Fvlcrvm",
"FWHO & Ferdinand Weber",
"FWLR",
"Fya",
"Fyex",
"Fynn",
"Fytch",
"FYVO",
]

litera = SoundSymbol.objects.get(name="F")

count = 0

for tag in f_rus_list_1:
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
