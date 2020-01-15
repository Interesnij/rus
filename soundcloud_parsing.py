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

j_rus_list_1 = [
"J & V",
"J Alvarez",
"J Balvin",
"J Brasil feat. Gretchen",
"J Cannons feat. Shiyana",
"J Chris feat. K-Brown",
"J Don John feat. Tony T & Alba Kras",
"J Ember",
"J Latif",
"J Lisk",
"J Majik",
"J Nitti",
"J Nomand",
"J Padron feat. Mariah Shea",
"J Rand",
"J Randall",
"J Rome feat. Flo-Rida",
"J Spades feat. Tinie Tempah & Professor Green",
"J Sutta",
"J-Art",
"J-AX",
"J-Bar feat. Sammie & Bei Maejor",
"J-C feat. Lizzie Curious",
"J-E-T-S & Machinedrum & Jimmy Edgar feat. Tkay Maidza",
"J-Five",
"J-Hope feat. Becky G",
"J-Hype",
"J-Power & Mc Пряников",
"J-RAY",
"J-Son",
"J-Soul",
"J-Valencia",
"J. Alan Bravo feat. Twista & T-Pain",
"J. Alvarez",
"J. Balvin",
"J. Cole",
"J. Damur",
"J. Drew feat. Elijah Blake",
"J. Hart",
"J. Holiday",
"J. Lewis",
"J. Mena",
"J. Miszta & Elrox Dalton feat. Jany McHoney",
"J. Nice & Frankie Tedesco feat. Lil Lee",
"J. Pearl feat. Shayne Ward",
"J. Ralph & Sia",
"J. Ralph & Sting",
"J. Randall",
"J. Timberlake and Leona Lewis",
"J. Yolo",]

j_rus_list_2 = [
"J.A.M. feat. Omer Fernandez",
"J.B. Lenoir",
"J.D. Jaber",
"J.K.",
"J.Lewis",
"J.Nandez",
"J.Nice",
"J.Puchler",
"J.R. feat. Trey Songz",
"J.R. Richards",
"J.Randall",
"J.S.B.",
"J.S.D.",
"J.S.T.",
"J.Sheon",
"J.T. The Bigga Figga feat. Akon & San Quinn",
"J.Views",
"J.Viewz",
"J'adore",
"J's Music",
"J&M vs. DJ Alan Kay feat. Susan Albers",
"J3n5on feat. Walker & Daniel",
"J3nk!ns",
"J7J feat. Tony T",
"Ja Rule",
"JA13",
"Jaafar Jackson",
"Jaana",
"Jabberwocky",
"Jac Ross",
"Jaccob",
"Jace Everett",
"Jack & Daniel",
"Jack & Jack",
"Jack And Jack",
"Jack Anthonio",
"Jack Back feat. David Guetta, Nicky Romero & Sia",
"Jack Beats feat. Diplo & Example",
"Jack Bernini",
"Jack Brontes",
"Jack De Molay",
"Jack Dear",
"Jack Eye Jones feat. Paton",
"Jack Funk",
"Jack Garratt",
"Jack Gray",
"Jack Holiday",
"Jack Howes feat. J-Hype",
"Jack Johnson",
"Jack Lack",]

j_rus_list_3 = [
"Jack Massic feat. Alina Renae",
"Jack Mazzoni",
"Jack Moy & Gloden",
"Jack Note & Voyages",
"Jack Novak feat. Blackbear",
"Jack Perry",
"Jack River",
"Jack Rowan feat. Sam Gray",
"Jack Savoretti",
"Jack Shore",
"Jack Souza",
"Jack Star",
"Jack Steadman",
"Jack The Cat",
"Jack The Underdog",
"Jack Trades",
"Jack U (Diplo & Skrillex",
"Jack Vandervelde",
"Jack Wins",
"Jack-O Lantern",
"Jackalopz",
"Jackboys",
"Jackie Alyss",
"Jackie B",
"Jackie Boyz",
"Jackie Bredie",
"Jackie Evancho",
"Jackie Sagana",
"Jackie Tech",
"Jackie Thomas",
"Jackie Wilson",
"Jacklin Martin",
"JackLNDN & Fabich",
"Jackob Rocksonn",
"Jacks Mishelle",
"Jackson 5",
"Jacky Terrasson",
"Jaco",
"Jacob Banks",
"Jacob Latimore",
"Jacob One feat. Mixusha",
"Jacob Pavek",
"Jacob Plant",
"Jacob Sartorius",
"Jacob Tillberg & Johnning",
"Jacob Van Hage",
"Jacob Whiteside",
"Jacob Whitesides",
"Jacoo",
"Jacopo",]

j_rus_list_4 = [
"Jacquees",
"Jacqueline Govaert",
"Jacqueline Seymour",
"Jacques Ferchit",
"Jacques Houdek",
"Jacquie Lee",
"Jacynthe",
"Jad Halal & Eric Richy",
"Jadagrace",
"Jade Bennett",
"Jade Bird",
"Jade Blue feat. Shane Blackshaw",
"Jade Ewen",
"Jade Mckenzie",
"Jade Novah",
"Jade Patteri",
"Jaded",
"Jaden",
"Jaden Michaels",
"Jaden Smith",
"Jadu Heart",
"Jadudah",
"Jae (JJ)",
"Jae Stephens",
"Jaeger",
"Jael Group",
"Jaga",
"JAGGS feat. Sabrina Signs",
"Jaguar Skills",
"Jah Cure",
"Jah Vinci",
"Jah Woosh",
"Jah-Far",
"JahClan feet. Лёша Свик",
"Jahid",
"Jahkarta",
"Jahmal (TGK)",
"Jahmene Douglas",
"Jahron.B",
"Jai Alexander",
"Jai McDowall",
"Jai Waetford",
"Jai Wolf",
"Jaicko Lawrence",
"Jaies Baptiste",
"Jaime Deraz",
"Jaira Burns",
"Jajo",
"Jakarta",
"Jake & Papa feat. Skeme",]

j_rus_list_5 = [
"Jake Bugg",
"Jake Cooper",
"Jake Dile & Jon Spoon",
"Jake feat. Bruno Santos",
"Jake Isaac",
"Jake Miller",
"Jake Owen",
"Jake Quickenden",
"Jake Shanahan feat. Marcie",
"Jake Simon feat. Kuwada",
"Jake Spooner feat. Gucci Mane",
"Jakko",
"Jako Diaz",
"Jakob Karlberg",
"Jakob Liedholm",
"Jakob Sveistrup",
"Jakoban",
"Jakomo",
"Jakwob",
"Jala Brat",
"Jalemio",
"Jaleo",
"Jam & Spoon",
"Jam & Spoon Feat. Plavka",
"Jam & Spoon feat. Plavka vs. David May & Amfree",
"Jam and Amon",
"Jam And Spoon Feat Rea Garvey",
"Jam Aunni & Heuse feat. Salvo",
"Jam feat Amon",
"Jam Mattia feat. Gaston",
"Jam Tronik",
"Jam Xpress & Style Matterz",
"Jama & Bryan Milton",
"Jama & Stendahl",
"Jamala (Джамала)",
"Jaman T",
"Jamaru",
"Jambazi",
"Jamel Lorick",
"Jamelia",
"James 'buddy' Rogers",
"James Armstrong",
"James Arthur",
"James Bay",
"James Blake",
"James Blunt",
"James Brown",
"James Buddy Rogers",
"James Carter",
"James Cocozza",]

j_rus_list_6 = [
"James Cotton",
"James Durbin",
"James Dymond",
"James Egbert",
"James Fauntleroy",
"James Fox",
"James Gillespie",
"James Godfrey",
"James Horner",
"James Hype",
"James Kayn feat. Jasmin",
"James Kiedis",
"James Last",
"James Lee & Kevin",
"James Lilly",
"James Maslow",
"James Mercy & Mia Vaile",
"James Morris",
"James Morrison",
"James Newman",
"James Newton Howard feat. Jennifer Lawrence",
"James Pickering & Matthew Clark",
"James Quick",
"James Silk",
"James Sky feat. Nikos Ganos",
"James Smith",
"James Sun",
"James Talk & Ridney feat. Max C",
"James Tw",
"James Vickery & SJ Lewis",
"James Vincent Mcmorrow",
"James Williams",
"James Yammouni & Faydee feat. Adam Saleh",
"James Young",
"Jameson",
"Jameson Tullar",
"Jamesthemormon feat. David Archuleta",
"Jamie Cullum",
"Jamie Drastik",
"Jamie Foxx",
"Jamie Grace",
"Jamie Jones",
"Jamie Lawson",
"Jamie Lewis, Michelle Weeks, Natasha Watts, Marc Evans",
"Jamie Lynn Spears",
"Jamie N Commons",
"Jamie Scott feat. Christina Perri",
"Jamie T",
"Jamie Woon",
"Jamie Xx",]

j_rus_list_7 = [
"Jamie-Lee Kriewitz",
"Jamilla",
"Jamille",
"Jamiroquai",
"Jamo feat. Hue",
"JAMOO & Elbey",
"Jan Blomqvist",
"Jan Brave feat. Sandman",
"Jan Dual",
"Jan Fleck",
"Jan Gillan & The Javelins",
"Jan Hegenberg",
"Jan Holland",
"Jan James",
"Jan Johnston",
"Jan Joy feat. Mira",
"Jan Laurenz",
"Jan Loechel",
"Jan Martin",
"Jan Morks",
"Jan Rem",
"Jan Tonny & Vilgy",
"Jan Vega & Groove Phenomenon",
"Jana Burcheska",
"Jana Kramer",
"Janaga",
"Janaz",
"Jandro",
"Jane Bogaert",
"Jane Lee Hooker",
"Jane Maximova",
"Jane XO",
"Jane Zhang",
"Janelle Kroll",
"Janelle Monae",
"Janet Devlin",
"Janet Jackson",
"Janet Jakson",
"Janet Leon",
"Janete",
"Janeva",
"Jani R",
"Janieck",
"Janis Joplin",
"Janji feat. Vivien",
"Jannika B",
"Jano",
"Jantsen & Dirt Monkey",
"Jantzee feat. Annie Atak",
"JAOVA",]

j_rus_list_8 = [
"Japancakes",
"Jaques Le Noir",
"Jaques Raupe",
"Jar-No",
"Jared Cotter",
"Jarell Perry",
"Jari Sillanpaa",
"Jarico",
"Jarina De Marco",
"Jarren Benton",
"Jarryd James",
"Jarvis & Roughmath feat. Ivy J",
"Jarvis feat. Harvey",
"Jas & Jay",
"Jas and Jay",
"Jas feat. G. Marie",
"Jase Thirlwall",
"Jasiah",
"Jasmin Gabay",
"Jasmine Kara",
"Jasmine Saraj feat. Yoyo",
"Jasmine Thompson",
"Jasmine V",
"Jason Aldean",
"Jason Becker",
"Jason Born",
"Jason Bradberry",
"Jason Cerda",
"Jason Chance",
"Jason Derulo",
"Jason Donovan",
"Jason Dottley",
"Jason Esun",
"Jason French",
"Jason Herd",
"Jason Kerrison",
"Jason Mraz",
"Jason Myles Goss",
"Jason Parker",
"Jason Ray",
"Jason Rivas",
"Jason Ross",
"Jason Singh",
"Jason Thurell & KRYGA",
"Jason Van Wyk & Audien",
"Jason Walker",
"Jasper Dietze feat. Aaron Richards",
"Jasper Forks",
"Jasper Van Blokland feat. Caro Brouns",
"Jassica Jay",]

j_rus_list_9 = [
"Jassie Gill feat. Badshah & B. Praak",
"Jassiel",
"Jasted",
"Jasur Gaipov",
"Jato Unit feat. DeAndre Day",
"Jaun Paula",
"Jauz",
"Javi Av",
"Javi Mula",
"Javi Reina",
"Javi Rodriguez & David Ballesteros feat. Yoe Zr",
"Javi Slink feat. Blackka",
"Javier Colon",
"Javier Declara",
"Javier Fioramonti",
"Javier Palomares",
"Javier Vinas",
"Jawan Harris feat. Tyga",
"Jax Jones",
"Jaxxon feat. Jemma Tweedie",
"Jay Adams",
"Jay Aliyev",
"Jay Baker",
"Jay Bombay feat. Neimy",
"Jay C",
"Jay Cosmic",
"Jay Electronica feat. Jay-Z",
"Jay Factor Band feat. Stefano Carparelli",
"Jay Fm",
"Jay Frog",
"Jay Ghartey feat. Tinny",
"Jay Gwuapo feat. Lil Tjay & Don Q",
"Jay Hardway",
"Jay Issa",
"Jay Ko",
"Jay Leemo",
"Jay Magoon ft. Sound Enemy",
"Jay Murano",
"Jay Outback",
"Jay Parker",
"Jay Pryor",
"Jay Robinson",
"Jay Rock",
"Jay Rom's feat. Bene",
"Jay Ron",
"Jay Saint",
"Jay Santos",
"Jay Saunders feat. Chilli",
"Jay Sean",
"Jay Sewall",]

j_rus_list_10 = [
"Jay Shawn",
"Jay Style feat. Cozi & Tara McDonald",
"Jay Z",
"Jay-Z",
"Jayan",
"JayB",
"Jaybee",
"JayBi",
"Jaycee Madoxx",
"Jayceeoh",
"Jayden feat. Celine Farach & Matluck",
"Jayden Felder",
"Jayden Parx",
"Jayga",
"JayKode",
"Jaylex feat. Leah Haxhi",
"Jaylien feat. Marc E. Bassy",
"Jayme Dee",
"Jaymes Young & Phoebe Ryan",
"Jayne Ava",
"Jayssa",
"Jaytech",
"Jaytor & Housenick",
"Jaz Von D",
"Jazmine Sullivan",
"Jazq & Саша Хендрикс feat. Babken",
"Jazz City",
"Jazz Inside",
"Jazz Lazer feat. Sean Kingston, Lloyd & Iamsu!",
"Jazzamor",
"Jazzy Funk",
"Jazzy James Jr.",
"JazzyFunk",
"JC feat. Konshens & Fay-Ann Lyons",
"JC Stewart",
"JD Era feat. Bobby Valentino",
"JDG & Samual James feat. Karra",
"Jdg Feat. Samual James",
"Jealous Friend & Alex Parker feat. Olivia Addams",
"Jean Brown",
"Jean Claude",
"Jean de Aguiar",
"Jean Elan",
"Jean Juan",
"Jean Kelley",
"Jean Love",
"Jean Luvia",
"Jean Mare",
"Jean Marie feat. Marta Sanchez & Flo Rida",
"Jean Michel Jarre",]

j_rus_list_11 = [
"Jean Paul Rena",
"Jean Roch",
"Jean Tonique feat. Dirty Radio",
"Jean Verano",
"Jean Watts",
"Jean-Michel Jarre",
"Jean-Michel Sonnerat",
"Jeanette",
"Jeanius",
"Jedmar",
"Jedward",
"Jeembo & Tveth",
"Jeezy",
"Jef Miles",
"Jeff Beck feat. Joss Stone",
"Jeff Bradshaw",
"Jeff Cristie",
"Jeff Denson",
"JEFF feat. Gabriela",
"Jeff Fetterman",
"Jeff Golub",
"Jeff Strahan",
"Jefferson Airplane",
"Jefferson Parish",
"Jeffk feat. Terri B",
"Jeffree Star",
"Jeffrey Jey",
"Jeffrey Sutorius",
"Jeggi",
"Jein",
"Jekopika",
"Jelena Karleusa feat. Nesh",
"Jelena Tomasevic feat. Bora Dugic",
"Jelf",
"Jelle Slump feat. Aidan O'Brien",
"Jelle Van Dael",
"Jelly Bear",
"Jellytouch",
"Jelonek",
"Jemcy",
"Jemere Morgan & Kaylan Arnold",
"Jemini",
"Jen Jis",
"Jen Rathbun",
"Jena Irene",
"Jenaux",
"Jencarlos",
"Jendrex",
"Jenee feat. L'One",
"Jenifer feat. Kylie Minogue",]

j_rus_list_12 = [
"Jenn Ayache",
"Jenn D",
"Jenna feat. 2 Chainz",
"Jenni Vartiainen",
"Jennie Abrahamson",
"Jennifer Hudson",
"Jennifer Lopez",
"Jennifer Nettles feat. Jennifer Lopez",
"Jennifer O'Connor",
"Jennifer Page",
"Jennifer Paige",
"Jennifer Serrano",
"Jenniffer Kae",
"Jennika",
"Jenny Lewis",
"Jennyfer Paige",
"Jens",
"Jens Buchert",
"Jens O.",
"Jentina",
"Jenya Melnikoff & Alexey Psihichesky",
"Jenya Noble",
"Jenya Semenov",
"Jeremie",
"Jeremih",
"Jeremy Arnold feat. Flow",
"Jeremy Camp",
"Jeremy Cooke",
"Jeremy Folderol feat. Tilly",
"Jeremy Greene",
"Jeremy Hills",
"Jeremy Messersmith",
"Jeremy Olander",
"Jeremy Renner",
"Jeremy Thurber",
"Jeremy Thurber feat. Sadie",
"Jeremy Vancaular feat. Danyka Nadeau",
"Jeremy Vancaulart",
"Jericho Frequency & Jennifer Rene",
"Jericho Ismael feat. Vuk Lazar",
"Jermuk",
"Jerome & Eric Chase feat. Michelle Hord",
"Jerome & Lotus feat. Amanda",
"Jerome feat. Ace Young",
"Jerome feat. Michelle Hord",
"Jerome feat. Nik Kershaw",
"Jerome Isma-Ae",
"Jerome Noak Feat Jenni Wiegand",
"Jerome Price",
"Jerome vs. Eric Chase",]

j_rus_list_13 = [
"Jeronimas Milius",
"Jerry Butler",
"Jerry Dave feat. V3Ra",
"Jerry Folk",
"Jerry Goldsmith",
"Jerry Lee Lewis & Neil Young",
"Jerry Ropero",
"JerryCo feat. Gabriel",
"JES",
"Jese feat. Morty Simmons",
"Jesper Jenset",
"Jesper Kyd",
"Jess & Jess",
"Jess & Matt",
"Jess Glynne",
"Jess Kent",
"Jess Mills",
"Jess Nolan",
"Jess Wright",
"Jess-E ft. KT Forrester",
"JessB",
"Jesse & Joy",
"Jesse Aerox",
"Jesse Cole",
"Jesse Cook",
"Jesse Elvis",
"Jesse Garcia",
"Jesse Jack & Scoch",
"Jesse Johnson",
"Jesse Labelle",
"Jesse Lee Davis",
"Jesse McCartney",
"Jesse Slayter & G-Buck",
"Jesse Voorn feat. Mavis Acquah",
"Jessi Malay",
"Jessi Teich",
"Jessica Andersson",
"Jessica Andrea",
"Jessica Ashley",
"Jessica D",
"Jessica Ferguson",
"Jessica Foxx",
"Jessica Garlick",
"Jessica Hart",
"Jessica Jarrell",
"Jessica Jay",
"Jessica Lowndes",
"Jessica Mauboy",
"Jessica Meuse",
"Jessica Sanchez",]

j_rus_list_14 = [
"Jessica Simpson",
"Jessica Sutta",
"Jessie & The Boys",
"Jessie & The Toy Boys",
"Jessie Andrews",
"Jessie Early",
"Jessie feat. Surche",
"Jessie Frye",
"Jessie J",
"Jessie James",
"Jessie Pink & Fabio Salerni",
"Jessie Pinkman",
"Jessie Reyez",
"Jessie Ware",
"Jessika feat. Jenifer Brening",
"Jessy feat. Kaliq Scott and Dj Rebel",
"Jessy ft. Ian Prada",
"Jessy J",
"Jessy Lanza",
"Jessy Martens and Band",
"Jessy Matador",
"Jestofunk feat. Ce Ce Rogers",
"Jesus Farfan & Carmen Sanchez",
"Jesus Guerrero",
"Jesus Jones",
"Jesus Luz, David Amo & Julio Navas feat. Selda",
"Jesus Sanchez",
"Jesus Schorn",
"Jet Black Stare",
"Jet Music",
"Jetfire",
"Jetique & Kelvin Monroe feat. Joshua Khane",
"Jetlag Music",
"Jewel",
"Jewelit",
"Jewelry",
"Jewelz & Sparks",
"Jey Blessing",
"Jey Flores",
"Jez Dior feat. Elijah Blake",
"Jezzpi feat. Steffka",
"JFoty feat. Rimas",
"JGrrey",
"Jhay Cortez",
"Jhene Aiko",
"Jhgl",
"JHN",
"Jhonas Serra & Tiago Botelho",
"Jhonny Vergel",
"Jhyve",]

j_rus_list_15 = [
"Ji Nilsson",
"Jia Miles",
"Jia Peng-Fang",
"Jibbeat",
"Jidax & Enzo Darren feat. Chester Rushing",
"Jigsaw Youth",
"Jihad Akl",
"Jikes feat. Nori",
"Jill Barber",
"Jill Chestain",
"Jill Helena",
"Jill Johnson & Helena Paparizou",
"Jillian Jacqueline",
"Jillian Nicole feat. Worm",
"Jillionaire",
"Jim Adkins",
"Jim Brickman",
"Jim Chappell",
"Jim Croce",
"Jim Hunt",
"Jim K Ressource",
"Jim Marlaud",
"Jim Noize",
"Jim Suhler",
"Jim Yosef & Anna Yvette",
"Jimi Charles Moody",
"Jimi Hendrix",
"Jimilian",
"Jimmie Allen",
"Jimmie Lee Robinson",
"Jimmy Ahlen",
"Jimmy Bad Boy",
"Jimmy Buffett",
"Jimmy Carris feat. Polina",
"Jimmy Clash",
"Jimmy Dub",
"Jimmy Eat World",
"Jimmy Edgar",
"Jimmy Gee",
"Jimmy Kyle & Starlite feat. Gerald G!",
"Jimmy Lafave",
"Jimmy Norman",
"Jimmy Prime",
"Jimmy Skoog feat. Alex Isaak",
"Jimmy Smith",
"Jimmy Somerville & June Miles Kingston",
"Jimmy Thackery",
"Jimmy Trias",
"Jimmy Van M feat. Steve T",
"Jin Akanishi",]

j_rus_list_16 = [
"Jinco & Holly",
"Jingxin & Джиос",
"Jinny",
"Jinsu feat. Ne-Yo",
"Jinx",
"Jiqui",
"JL feat. Afterman",
"JLV",
"Jmen",
"JMSN",
"JNR Williams",
"JO (Ioana Anuta) feat. JuJu",
"Jo Brovko & ALUR",
"Jo Cappa, Roberto Sansixto, Mag",
"Jo Cohen & Marky Style & Guy Gabriel",
"Jo Destre",
"JO feat. Cabron",
"Jo feat. Gabriel",
"Jo feat. Randi",
"Jo Livi",
"Jo Paris feat. Darren Barley",
"Jo Privat",
"Jo. Cohen feat. Meital De Razon",
"Joachim Garraud",
"Joachim J.",
"Joachim Pastor feat. Mischa",
"Joakim Lundell",
"Joakim Molitor",
"Joan Baez",
"Joan Ember & Oke",
"Joan Franka",
"Joan Osborne",
"Joan Reyes",
"Joanna Rays",
"Joanna Syze feat. Tyhh",
"Jocelyn Alice",
"Jocelyn Brown & Oliver Cheatham",
"Jochen Miller",
"Jock Jams",
"Jocke",
"Jockeyboys feat. Nance",
"JOD & Meiden feat. Frances Alina",
"Jodeci feat. B.o.B.",
"Jodie Aysha Feat. Bvrzz",
"Jodie Connor",
"Jodie Harsh feat. Therese",
"Jody Bernal & Billy The Kit feat. Nicole Jung",
"Jody Watley",
"Jody Wisternoff feat. Sian Evans",
"Joe & The Anchor",]

j_rus_list_17 = [
"Joe And Jake",
"Joe Berte",
"Joe Budden",
"Joe Cefalu",
"Joe Cocker",
"Joe Dassin",
"Joe Falcon",
"Joe feat. Kelly Rowland",
"Joe Fox feat. Nas",
"Joe Garston feat. Andrew Farr",
"Joe Ghost",
"Joe Hisaishi",
"Joe Jahn (Jackson)",
"Joe Jonas",
"Joe K feat. Jonny Rose",
"Joe Kinni",
"Joe Le Blanc",
"Joe Louis Walker",
"Joe Manina & Alex Tone",
"Joe Mendes feat. Luna",
"Joe Pass",
"Joe Rossi",
"Joe Satriani",
"Joe Shamwell",
"Joe Sikora feat. Waka Flocka Flame",
"Joe Stone",
"Joe Taino",
"Joe Venuti's Blue Four",
"Joe White",
"Joe Yamada",
"Joe Yellow",
"Joe Zawinul",
"Joeboe ft. Sergey Smile",
"Joeey DMC",
"Joel & Oliver Tee",
"Joel Adams",
"Joel Baker",
"Joel Compass",
"Joel Corry",
"Joel Fletcher",
"Joel Francisco Perri",
"Joel Hirsch",
"Joel Piper",
"Joel Santos & Afro Junkiez feat. Mc Taty Agressivo",
"Joell Sanchez, Regor",
"Joelle & HKLMR & Metro",
"Joelle James ft. Lo Breezy",
"Joey C & DJ Torio feat. Nikki Kay",
"Joey Dale",
"Joey feat. Fet",]

j_rus_list_18 = [
"Joey Lawrence",
"Joey Moe",
"Joey Montana",
"Joey Purp feat. Chance The Rapper",
"Joey Tafolla",
"JoeySuki & Kill The Buzz",
"Joh Christian & IndYana",
"Johan Gielen",
"Johan K",
"Johan Klingwall",
"Johan Malmgren",
"Johan S",
"Johan Vilborg",
"Johann Gropius",
"Johann Sebastian Bach",
"Johann Strauss",
"Johanna Gurun Jonsdottir",
"Johannes Bornlöf",
"Johannes Huppertz",
"Johannes Linstead",
"John & The Volta",
"John Albert Thomas",
"John Alexander Ericson",
"John Askew",
"John B",
"John Barry & Monty Norman Orchestra",
"John Bolton",
"John Buchanan",
"John Campbell",
"John Campbelljohn",
"John Cartner feat. Malyce",
"John Christian",
"John Cocos feat. Диля Даль",
"John Dahlback",
"John Daller",
"John De Sohn",
"John Dish",
"John Doe",
"John Dopping",
"John Dubs & Dj Kenny",
"John Duke",
"John Earl Walker Band",
"John Emil",
"John Flame",
"John Gibbons",
"John Hammond",
"John Hie",
"John Karayiannis",
"John Karen feat. Nils Collas",
"John Kilzer",]

j_rus_list_19 = [
"John Lakke feat. Taisi Cunha",
"John Lawton",
"John Lee Hooker",
"John Legend",
"John Lennon",
"John LePage & Paul Goodyear feat. Peyton",
"John Lucas",
"John Lundvik",
"John Martin",
"John Mayall",
"John Mayer",
"John McNamara",
"John Modena & Y.A.N.O.U",
"John Mooney",
"John Newman",
"John O'Callaghan",
"John Ochs feat. Ange",
"John Puzzle",
"John Reid",
"John Revox feat. Brian Lucas",
"John Reyton",
"John Rivas",
"John Rowcroft",
"John Saylor feat. Yanki",
"John The Whister",
"John The Whistler",
"John Vietnam",
"John Williams",
"Johnny Cash",
"Johnny Cash & The Tennessee Two",
"Johnny Cash, Johnny Cash & The Tennessee Two",
"Johnny Chicago feat. Alisha Collins",
"Johnny Chicago feat. Oke",
"Johnny Copeland",
"Johnny Day feat. Matias Endoor & Evelyn",
"Johnny Good & Jay Sean",
"Johnny Hates Jazz",
"Johnny Lennartsson",
"Johnny Logan",
"Johnny Mathis",
"Johnny Maxwell",
"Johnny Maxwell feat. Rich Rocka",
"Johnny Meijer",
"Johnny Moss feat. Andy",
"Johnny Orlando",
"Johnny Project & Inventive Sound",
"Johnny Ruffo",
"Johnny Shines",
"Johnny Third feat. Joe Knott",
"Johnny Winter",]

j_rus_list_20 = [
"Johnny Yono",
"Johnny Yukon",
"Johnnyboyxo",
"Johnnyswim",
"Johnson feat. USO",
"Johnson Rodgie X Taylah Cox",
"Johnta Austin",
"Johny Ben feat. Ksenia",
"Johny Cash",
"Johny Copeland",
"Johny Luv",
"Johnyboy",
"Joint Venture",
"JOiO",
"Joira",
"Joji",
"JoJo",
"Joka (Жока)",
"JoKeRMC",
"Jolie feat. Ryme",
"Jolin Tsai",
"Jolique feat. Daddy's Girl",
"JoLivi",
"Jolly Roger & DeR-Al",
"Jolya Pi",
"Jolyon Petch",
"Jon Allen",
"Jon Anderson",
"Jon Bellion",
"Jon Bourne",
"Jon Brian",
"Jon Lemmon",
"Jon Lilygreen & The Islanders",
"Jon Norgaard",
"Jon O'Bir",
"Jon Secada feat. Soraya",
"Jon Sine feat. Frankie",
"Jon Spoon",
"Jon Thomas feat. Saydi",
"Jon Vinyl",
"Jon Z & Enrique Iglesias",
"Jon Zeeman",
"Jona Selle",
"Jonas Aden",
"Jonas Benyoub",
"Jonas Blue",
"Jonas Breum",
"Jonas Brothers",
"Jonas Fehr feat. AMPM",
"Jonas Monar",]

j_rus_list_21 = [
"Jonas Oakland",
"Jonas Rathsman feat. Josef Salvat",
"Jonas Stenberg",
"Jonas Steur feat. Jennifer Rene",
"Jonas Wak & NVLS",
"JonasForFanden",
"Jonasu feat. Emy Perez",
"Jonatan Cerrada",
"Jonatan Järpehag",
"Jonathan Castilla",
"Jonathan Hendrickx",
"Jonathan Kygoo",
"Jonathan Pitch feat. Yassine",
"Jonde feat. Vaido Neigaus",
"Jones & Brock feat. Anica",
"Jonestown",
"Joni Mitchell",
"Joni Вайц",
"Jonida Maliqi",
"Joniel El Lethal",
"Jonn Hart",
"Jonni Black feat. Sandy Huff",
"Jonny D",
"Jonny Lang",
"Jono Fernandez & Pauls Paris feat. Amba Shepherd",
"Jonsi",
"Jonth feat. Veronica Bravo",
"JONVS",
"JONVS & Crosby x Syntheticsax",
"JONVS feat. Faileo",
"Jony",
"Joolia",
"Joop",
"Joop feat. Tiffany Johnston",
"JORD",
"Jordan Bratton",
"Jordan Comolli",
"Jordan Davis & Julia Michaels",
"Jordan Dennis",
"Jordan Fisher",
"Jordan Hawkins feat. Oghosthaze",
"Jordan Hollywood",
"Jordan Jae",
"Jordan Jay",
"Jordan Knight",
"Jordan Magro feat. Rasmus Hagen",
"Jordan Miller feat. James Hart",
"Jordan Morris",
"Jordan Oliver",
"Jordan Pruitt",]

j_rus_list_22 = [
"Jordan Rakei",
"Jordan Rees",
"Jordan Schor & Marvin Divine",
"Jordan Travelers",
"Jordash Rise feat. Summer Deejays",
"Jordi MB",
"Jordi R & Javi FM feat. C Milo",
"Jordi Rosco",
"Jordi Roure",
"Jordi Veliz",
"Jordie Ireland feat. Riley Biederer",
"Jordin Sparks",
"Jordy Jill",
"Jordy Lishious feat. Mitch Crown",
"Joren Heelsing feat. Ren",
"Jorge Blanco",
"Jorge Gonzalez",
"Jorge Nava & Tucandeo feat. Frida Harnesk",
"Jorge Salan",
"Jori King feat. Bizoh",
"Jorja Smith",
"Jorn Van Dehnhoven",
"Jorn Van Deynhoven",
"Jose Alfredo",
"Jose Am",
"Jose Am",
"Jose Amor",
"Jose Carreras",
"Jose De Mara & Anero",
"Jose De Rico and Henry Mendez",
"Jose Delgado",
"Jose Garcia",
"Jose Lucas feat. Rivo",
"Jose M Duro & Miguel Vizcaino",
"Jose MC",
"Jose Nunez feat. Shawnee Taylor",
"Jose Ogalla",
"Jose Ponce",
"Jose Seron",
"Josef Bamba",
"Josef Meloni vs. Tommyland",
"Josef Salvat",
"Josefine Myrberg",
"Joseph Angel",
"Joseph Areas",
"Joseph Armani & Baxter",
"Joseph Capriati",
"Joseph Colombo",
"Joseph Disco",
"Joseph Fischer",]

j_rus_list_23 = [
"Joseph Sinatra feat. Kledia vs. Fresko",
"Josephine Sinclar",
"Josepo & Abel The Kid feat. Jo C",
"Josh & Dan",
"Josh Butler feat. HanLei",
"Josh Charm",
"Josh Dubovie",
"Josh Feedblack",
"Josh Gabriel Pres. Winter Kills",
"Josh Garrels",
"Josh Golden",
"Josh Groban",
"Josh Harris feat. Colleen Kelly",
"Josh Money",
"Josh Napert",
"Josh Pan & Dylan Brady",
"Josh Pan & X&G",
"Josh Ritter",
"Josh Smith",
"Josh Turner",
"Josh Xantus",
"Josha Daniel",
"Joshua Bass",
"Joshua Bell",
"Joshua Khane & Alvita",
"Joshua Radin",
"joshua ray anderson",
"Joshua Samson",
"Josie Dunne",
"Josie Moon",
"Joss Baselli",
"Joss Beaumont",
"Joss Favela & Becky G",
"Joss Stone",
"Jostein Hasselgard",
"Josй Andrлa Y Urуboros",
"Journey",
"JouTi feat. Andi Vax",
"Jovan Dais",
"Jovani feat. Youth Appeal",
"Jovi & Bruno",
"Jowell & Randy",
"JOWST",
"Joy Dee",
"Joy Division",
"Joy Williams",
"JOY.",
"Joyce Edwards",
"Joycute",
"Joyner Lucas",]

j_rus_list_24 = [
"Joyryde",
"Joystick Feat Rebecca",
"Joywave",
"Joyzu",
"JP Blues",
"JP Candela & Robbie Rivera",
"JP Cooper",
"JP Elorriaga",
"Jp Saxe feat. Julia Michaels",
"JP Soars",
"JP Stingray",
"Jp.Moa",
"JPB",
"JPL",
"JPS feat. Mirva",
"JR Castro",
"Jr Jr",
"Jr Loppez feat. Vougga",
"JRD",
"JRDN",
"JRL",
"JRVO & Roman Blanco",
"JRY feat. Rooty",
"Jstanley feat. S-Jee",
"Jstar Feat. Tomawok",
"JSUNT feat. Johanna",
"Jteen The Kid feat. Jermy J & Big B",
"JTR",
"Juan Alcaraz & Sane",
"Juan Da-Vinchi",
"Juan Davor",
"Juan Gabriel feat. Fifth Harmony",
"Juan Habichuela",
"Juan Magan",
"Juan MartinezLee",
"Juan Martinez",
"Juan Verrett",
"Juan Xavier",
"Juanes",
"Juanjo Martin",
"Jubel",
"Jubilee",
"Judah & The Lion",
"Judah feat. Kailin",
"Judah Kelly",
"Judas Priest",
"Jude & Frank",
"Judee Sill",
"Judge Jules",
"Jugende",]

j_rus_list_25 = [
"Juhn & Miky Woodz & Bryant Myers feat. Lary Over",
"Juice WRLD & YoungBoy Never Broke Again",
"Juicy Jt",
"Juicy J",
"Juicy Lotta",
"Juicy Lucy",
"Juicy M",
"JuicyTrax",
"JuJu",
"Juka",
"Juke Ross",
"Jukebox",
"Jule Vera",
"Jules Rockin feat. Lara",
"Julia Adams",
"Julia Bergwall",
"Julia Channel",
"Julia Fordham",
"Julia Frej",
"Julia Jianu",
"Julia Kova",
"Julia Lasker",
"Julia Luna",
"Julia Michaels",
"Julia Shee",
"Julia Sheer",
"Julia Turano",
"Julian Calor",
"Julian Cross & Bear feat. Libbie",
"Julian Era",
"Julian Gray feat. Pipa Moran",
"Julian Jayman",
"Julian Jeweil",
"Julian Jordan",
"Julian Kruse",
"Julian M feat. Veronika",
"Julian Marley",
"Julian Perretta",
"Julian Sas",
"Julian Smith",
"Julian The Angel",
"Julian Vincent feat. Shannon Hurley",
"Julian Write feat. Rayven Justice & IamSu",
"Juliana Neva",
"Juliana Pasha",
"Juliana Yamasaki",
"Juliann Alexander",
"Julias Moon",
"Julie Bergan",
"Julie Bjerre",]

j_rus_list_26 = [
"Julie C",
"Julie Elody feat. Honorebel",
"Julie London",
"Julie Maria",
"Julie Mayaya",
"Julie Thompson",
"Julie Zahra & Ludwig Galea",
"Julien Clerc feat. ZAZ",
"Julien Thompson",
"Juliet Ariel",
"Juliet Roberts",
"Juliette Claire",
"Juliette Greco",
"Julio Iglesias",
"Julio Leal David Herencia",
"Julius Abel feat. Johanna Alba",
"Julius Cowdrey",
"Jullie",
"Juloboy",
"July Child",
"July Cruise",
"Jumo",
"Jump Smokers",
"Jumpa & Joey Cass",
"Jumpstar feat. Ron Carroll",
"Junatik",
"June Coco",
"June Miller",
"June Summers",
"Jung feat. Clara Mae",
"Junge Junge",
"Junglebae",
"Junia",
"Junior Caldera",
"Junior Crew",
"Junior High feat. Kamelia",
"Junior J",
"Junior Mance",
"Junior Rodgers & Nick Memphis feat. Fatman Scoop",
"Junior Sanchez",
"Junior Senior",
"Junior Soul",
"Junior Vieira, Chapeleiro",
"Junior Wells",
"Juniperum",
"Junkie XL",
"JunkIt",
"Juno feat. Nicole Cherry",
"Junona Boys",
"Jupiter Project feat. Ryan Enzed",]

j_rus_list_27 = [
"Jurgaz & BAUWZ",
"Juri Pootsmann",
"Jurijus",
"Jus Deelax",
"Jus Jack",
"Jus Now feat. Bunji Garlin & Stylo G",
"Jus-Hu",
"Jussendo",
"Just A Gent",
"Just Chillax feat. Fred",
"Just Damir feat. Eldark",
"Just Dub & Tania Shine",
"Just Ivy feat. Akon",
"Just Ivy feat. Meek Mill & DJ Khaled",
"Just John x Dom Dias feat. DillanPonders",
"Just Juice",
"Just Kiddin",
"Just Luis",
"Just Mike",
"Just Parker",
"Just Us",
"JustCent feat. OneL",
"Juste & Baras",
"Juste & Джиос",
"Justice Crew",
"Justice feat. Sean-Gemini",
"Justice Vendetta",
"Justin Berger",
"Justin Bieber",
"Justin Blaine",
"Justin Caruso",
"Justin Garner",
"Justin Jesso",
"Justin Johnson",
"Justin Love & GASHI",
"Justin Michael feat. Matt Beilis",
"Justin Mylo",
"Justin Oh",
"Justin Petti",
"Justin Prime",
"Justin Quiles",
"Justin Quinn Band",
"Justin Timberlake",
"Justin Vito & CJ Stone feat. Emine Bahar",
"Justin Wilkes & Preset",
"Justina Valentine",
"Justine Skye",
"Justluke",
"Justs",
"Justs Sirmais",]

j_rus_list_28 = [
"Justus",
"Justy Puck",
"Jutes",
"Jutty Ranx",
"Juun feat. Sam Smith",
"Juve and Jay D",
"Juvenile",
"Juventa",
"Juxie feat. Emma Piitulainen",
"Juyen Sebulba feat. Hawkboy",
"Juzt Muzik & Jeefix",
"JV Project feat. Eric Solomon",
"JV Project feat. Matt James & Tita Lau",
"Jvck James",
"JXN feat. A Boogie Wit Da Hoodie",
"Jynx",
"JYRA",
"JYYE",
"Jzar & Polimike",
"Jаmes Blunt",
"Jоakim Mоlitоr feat. Cоrnelia Jakоbs",
]

litera = SoundSymbol.objects.get(name="J")

count = 0

for tag in j_rus_list_15:
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
