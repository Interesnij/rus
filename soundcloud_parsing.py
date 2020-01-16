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

t_rus_list_1 = [
"T & Sugah",
"T Y",
"T-ara",
"T-Bear & The Dukes",
"T-Bone Walker",
"T-Connection",
"T-Fest",
"T-Killah",
"T-Loco",
"T-Mass",
"T-Model Ford",
"T-One",
"T-Pain",
"T-Phonic feat. Elbie",
"T-Spoon",
"T. Mills",
"T. Walker Feat Vivienne",
"t.A.T.u.",
"T.Check",
"T.F.L.",
"T.H.K.",
"T.I.",
"T.M.-Joy",
"T.M.A.H",
"T.m.l. & Djope Dope feat. Lox Chatterbox & Blvkstn",
"T.M.O",
"T.M.R. & Oleg Tarsakov feat. Johnny Nelson & Anton Glamb",
"T.Murena, L.Peguri",
"T.O.B.",
"T.O.C.",
"T.O.T.A.L. и АнтитілА",
"T'Paul Sax",
"T1One",
"T2",
"T9",
"Taao Kross & Chris Willis",
"Tab Benoit",
"Tabi Bonney feat. Wiz Khalifa",
"Tabitha feat. Latifah",
"Tabitha Nauser",
"Tablao Flamenco",
"Tableek",
"Taboo",
"Tabu",
"TaBuNaTaBu",
"Tacabro",
"Taches feat. Shoffy",
"Tacoma",
"Taddy Porter",
"Taet",]

t_rus_list_2 = [
"Tafubar",
"Taglo feat. Daphne Maresca",
"TAHDEM Foundation",
"Tahir feat. MB",
"Tahta Menezes",
"TAI",
"Tai Phillips",
"Taiki Nulight",
"Tails",
"Taim",
"Taimanova",
"Tainted Lady",
"Tainy feat. Anuel AA & Ozuna",
"Taio Cruz",
"Taisia Gramm",
"Taito",
"Taj Jackson",
"Taj Mahal",
"Taj Munroe",
"Takagi & Ketra feat. Omi & Giusy Ferreri",
"Takaki Matsuda",
"Take That",
"Takeaway Sound & Ninski feat. Reece Lemonius",
"Takedown",
"Takeri",
"Takers feat. Chantae",
"Takida",
"Tako Gachechiladze",
"Tal",
"Tala",
"Talay Riley",
"Tale & Dutch",
"Talento Havana",
"Taler",
"Tali & De Fault",
"Tali Lenner",
"Talia Mar",
"Taliana",
"Talib Kweli",
"Talisco",
"Talisman & Maor Edri",
"Taliz feat. Kiaz",
"Talking Heads",
"Talla 2xlc",
"Talon",
"Talulla & Erkin Smile",
"Talvihorros",
"Tam Cooper",
"Tamar Braxton",
"Tamar Sabadini",]

t_rus_list_3 = [
"Tambour",
"Tame Impala",
"Tamer feat. Shaggy",
"Tamer Hosny",
"Tami Neilson",
"Tamia",
"Tamiga",
"Tamir Assayag",
"Tamko",
"Tamma",
"TammiT feat. Oniton",
"Tamsyn Harrow",
"Tamta",
"Tamy feat. Bibanu MixXL",
"Tanata",
"Tanel Padar",
"Tanghetto",
"Tangina Stone feat. Nelly Furtado",
"Tangle",
"Tango & Cash",
"Tango Fire",
"Tango Red",
"Tango Tripping Project",
"Tanguetto",
"Tania BerQ",
"Tania Breazou",
"Tania Cerga",
"Tania Ponce feat. Rayven Justice",
"Tania Shine",
"Tania Zygar",
"Tanika",
"Tanir (Da Gudda Jazz)",
"Tanita Tikaram",
"Taniya",
"Tanja La Croix",
"Tank",
"Tanner Patrick",
"Tanslu",
"Tantrum Desire",
"Tanya Lacey",
"Tanya Shelest",
"Tanya Stephens",
"Tanya Tekis",
"TanyaSha",
"Tanzamomo feat. EL 3Mendo",
"Tanzh",
"Tape Five",
"Tapo & Raya",
"Tara Carosielli",
"Tara feat. Spankers",]

t_rus_list_4 = [
"Tara McDonald",
"Tara Nabavi",
"Tara vs Manilla Maniacs",
"Tarabrin Brothers DJs & Julia Lois",
"Tarala",
"Tarantinos",
"Taras feat. Pride",
"Taras feat. Pride & Рemo",
"TARAS feat. Sonya Goldy",
"Tarek Modi",
"Tarena",
"TARI & Yix",
"Tari feat. Nevve",
"Tarja",
"Tarkan",
"Tarkan Mamedov",
"Taron-Trekka",
"Taryn Szpilman",
"Tasadi & Aryas feat. Christina Novelli",
"Tash",
"Tasha King",
"Tasha Milkova",
"Tasha Night",
"Tasha Odi",
"Tasha Turova",
"Taska Black",
"Tasmoni",
"Taso Du Val",
"Tasteful House",
"Tatana",
"Tate & Diamond feat. Nicolai",
"Tate McRae",
"Tatiana K",
"Tatiana Zybina",
"Tatkoz feat. Siya & Kanvic",
"TattooIN",
"Taubert",
"Taur",
"Tavengo",
"Tavi Castro",
"Tavi Clonda",
"Tavorman",
"Taxi & Delia",
"Taxi feat. Irina Rimes",
"Taxi Girl",
"Tay Dizm feat. One Chance & T-Pain",
"Taya feat. Lotto Boyzz",
"Tayla Parx",
"Taylor Mathews",
"Taylor & Gaspar Laci",]

t_rus_list_5 = [
"Taylor & Silv-R",
"Taylor Davis",
"Taylor Dayne",
"Taylor Grey",
"Taylor Henderson",
"Taylor Janzen",
"Taylor Jones",
"Taylor Swift",
"Taylor X",
"Taymar",
"Tayoka",
"Taz Taylor Band",
"Tazenda",
"TBMA feat. Wind In Sails",
"Tc-5 feat. Tamra Keenan",
"TC4",
"Tchami",
"Tchavalito",
"Tchikovsky",
"TCTS",
"TDC Project",
"TDK feat. Robin Stjernberg",
"Te100стерон",
"Teairra Mari",
"Team Argentina",
"Team BS",
"Team D'Luxe",
"Team Pitbull feat. David Rush & Pitbull",
"Team Rush Hour",
"TeamMate",
"Teamwork feat. Nina Nesbitt & AJ Mitchell",
"Teapacks",
"Tears For Fears",
"Teasley",
"Teasta",
"Tebey",
"Tech N9ne feat. Ryan-Bradley",
"Techcrasher",
"Technimatic",
"Techno Project & DJ Geny Tur",
"Technotronic",
"TechSpace",
"Ted Bridge",
"Ted Newtone feat. Ben",
"Ted Nights & Magilo",
"Ted Nilsson",
"Ted Nugent",
"Teddy Beats",
"Teddy Jackson",
"Teddy Killerz",]

t_rus_list_6 = [
"Teddy McLane",
"Teddy Tee feat. Dej Loaf",
"Teddybears feat. Beenie Man",
"Teddybeer",
"Teductive",
"Tee Grizzley",
"Teedra Moses",
"TeeFlii",
"TeemaK",
"TeeMur",
"TeeN feat. Зомб & Ahimas, Xamm",
"Teenage Mutants & Laura Welsh",
"Teenear feat. Sage The Gemini",
"Teep On",
"Teezy x Andini feat. Jims Wong",
"Tegan & Sara",
"Tei Shi",
"Teischa",
"Teisha feat. Lexter",
"Teivase",
"Tekilla & DJ Motiv8",
"Tekni",
"Teknova",
"Telekinesis",
"Telescoptic",
"Televisor",
"Tellur",
"Telman",
"TELYKast & Basko feat. Sammy Adams",
"Temahaz & Mel P.",
"Tematik",
"Teminite",
"Temmpo",
"Tempest",
"Temple Bizare",
"Temple One",
"Templecloud",
"Temples",
"Tempo Giusto",
"Temporal",
"Temporary Hero",
"Ten Avatars feat. Myah Marie",
"Ten Killo & T1One",
"Ten Madison",
"Ten Walls feat. Alex Radford",
"Tenca",
"Tender",
"Tenek",
"Tenishia",
"Tenka",]

t_rus_list_7 = [
"Tenna Torres",
"Tennebreck",
"Tension",
"Tensnake",
"Tenth Avenue North",
"Tentura",
"Teo Dora",
"Teo Mandrelli",
"Teo Moss & Arone Clein",
"Teo Sovaila",
"Teo Stander",
"Teodora",
"Teodora Sima",
"Tep No",
"Tepr feat. Jafaar",
"Tepr feat. Penguin Prison",
"Tequila Boom",
"Tequilajazzz",
"Tera & Play-N-Skillz feat. Amanda Wilson & Pitbull",
"Tera, DDei & Estate feat. Pitbull",
"Terace",
"Terasbetoni",
"Terenzi & Bernasconi feat. K47",
"Teresa Brewer",
"Tereza Kerndlova",
"Teri Miko",
"Termanology feat. Ransom",
"TERNOVOY",
"Tero",
"Terratomorf feat. Артур Беркут (Ария)",
"Terravita",
"Terrence Green",
"Terrence Howard",
"Terri B!",
"Terri Lyne Carrington",
"Terror Jr",
"Terror Squad",
"Terrorbyte",
"Terry & DanyMuse",
"Terry Callier",
"Terry Lex",
"Terry Zhong feat. Cinro",
"Tertia May",
"Tesla",
"Tesla Boy",
"Tesla Damage",
"Tess Clare",
"Tessa Rae",
"Tetris",
"Tex James feat. B.o.B & Stuey Rock",]

t_rus_list_8 = [
"Tex!No",
"Texas Lightning",
"Teyana Taylor",
"Tez Cadey",
"Teza & OWEEK",
"Tf 99",
"TGK 22",
"TH Brother",
"Tha Bizness feat. Clinton Sparks",
"Tha Broadus Boyz feat. Snoop Dogg",
"Tha Connection",
"Tha Dogg Pound feat. Snoop Dogg",
"Tha Groove Junkeez",
"Tha Supreme",
"Tha Trickaz",
"Thalia",
"Thames feat. Dev",
"Thand",
"Thandi Phoenix",
"Thascya & Leo Santana",
"That Matters vs. Jenia & Mr.Styles",
"That Poppy",
"That Rock Guy",
"That Was Quick",
"That's Right",
"The 1975",
"The 49ers",
"The 69 Eyes",
"The 9Th Planet Out",
"The A.K.T. Aka Boris G.",
"The Abc",
"The Aces",
"The Act feat. Clinton III",
"The Adresov",
"The Alan Parsons Project",
"The Alexsander",
"The Amers",
"The Angry Kids feat. Odissi",
"The Animals",
"The Answer",
"The Antonov Project",
"The Archies",
"The Arcs",
"The Ark",
"The Armistice feat. Warren Kurtiss",
"The Arsenic Lovers",
"The Artifice Precept",
"The Asteroids Galaxy Tour",
"The Aston Shuffle",
"The Attic Sleepers",]

t_rus_list_9 = [
"The Avener",
"The Avett Brothers",
"The Awesome Welles",
"The Bad Flowers",
"The Bamboos",
"The Banger Bros feat. Mel Akai",
"The Bangers feat. Chris Madin",
"The Baseballs",
"The Beach Boys",
"The Beat Agents feat. Abigail Bailey",
"The Beat Daddys",
"The Beat Experience",
"The Beatangers",
"The Beatrockers",
"The Bee Gees",
"The Bello Boys feat. Kat DeLuna",
"The Bestseller",
"The Biebers",
"The big blue house",
"The Big Moon",
"The Bird And The Bee",
"The Birthday Massacre",
"The Black Angels",
"The Black Atlantic",
"The Black Eyed Peas",
"The Black Keys",
"The Black Man",
"The Black Rain",
"The Blancos",
"The Blaze",
"The Blaze feat. Octavian",
"The Blizzard",
"The Bloodhound Gang",
"The Bloody Beetroots",
"The Blue Van",
"The Blues Mystery",
"The Bohicas",
"The Bolivian Marching Affair",
"The Boom Circuits",
"The Boomshakers",
"The Boss Hoss",
"The BossHoss feat. Mimi & Josy",
"The Boy Band Project",
"The Boy Next Door",
"The Bravery",
"The Brookes Brothers feat. Johnny Osbourne",
"The Bryan Ferry Orchestra",
"The Buddaheads",
"The Buggles",
"The Bunch",]

t_rus_list_10 = [
"The Buster Pearson Band",
"The Byrds",
"The Cab",
"The Cables",
"The Cactus Channel feat. Chet Faker",
"The Calling",
"The Cancel",
"The Carbonfools",
"The Cardigans",
"The Carl Verheyen Band",
"The Cars",
"The Castor Troys",
"The Casualties",
"The Cat Empire",
"The Cataracs",
"The Cats",
"The Chainsmokers",
"The Chameleons",
"The Champions",
"The Chaotic Feat. Demmy Sober",
"The Chaplin Band",
"The Charlies",
"The Charly North Michael E P",
"The Chemical Brothers",
"The Chemodan",
"The Chikas feat. Giga 1",
"The Chipettes",
"The Chordettes",
"The Cimarons",
"The City feat. Hayla",
"The Civil Wars",
"The Clan Family",
"The Cliqque feat. Jordie",
"The Clovers",
"The Coalition Crew",
"The Coasters",
"The Code",
"The Collective",
"The Colours",
"The Commodores",
"The Common Linnets",
"The Connect",
"The Contours",
"The Coronas",
"The Corrs",
"The Cosmic Girls",
"The Count & KC Lights feat. Pepper Rose",
"The Courteeners",
"The Cousins",
"The Cracken",]

t_rus_list_11 = [
"The Cranberries",
"The Crazylovers",
"The Crossing",
"The Crystal Method",
"The Cube Guys",
"The Cure",
"The D.O.K. vs. Farina feat. Michelle Lily & Adam C",
"The Dan Lamaestra Trio",
"The Dap-Kings",
"The Davincies",
"The Daydream",
"The Daylights",
"The Dead Daisies",
"The Dead Rabbitts",
"The Dead Weather",
"The Dealer feat. Shells",
"The Decemberists",
"The Del Vikings",
"The Devil Wears Prada",
"The Dingles",
"The Diplomats",
"The Dirty Code & Skyknock feat. Bettina",
"The Dirty Mojo Blues Band",
"The Disco Boys",
"The Distance & Igi",
"The Diventa Project",
"The Dividends feat. Raekwon",
"The Dolly Rockers",
"The Dolphin Crew Feat Exia",
"The Doobie Brothers",
"the Doorbell",
"The Doors",
"The Doppler Effect feat. Carol Lee",
"The Double Drop feat. Dziemian",
"The Downtown Fiction",
"The Dream",
"The Dynamites",
"The Eagles",
"the Eardrugz",
"The Eden Project",
"The Electro Animals feat. Pola Green",
"The Emotions",
"The Enlightment",
"The Enzymes",
"The Erised",
"The Essence",
"The Eternal Afflict",
"The Everly Brothers",
"The Exciters",
"The Exies",]

t_rus_list_12 = [
"The Extraverse",
"The Fabulous Thunderbirds",
"The Faim",
"The Fallen Drakes",
"The Fallen Grace",
"The Fallen State",
"The Fan",
"The Feeling feat. Sophie Ellis-Bextor",
"The Field Mice",
"The Fire Ants & Gorkem Han",
"The First Station, Stylezz & Denis Agamirov feat. Lux",
"The Fish House & Sex Room",
"The Five Points Bakery",
"The Flavr Blue",
"The Flex",
"The Flights",
"The Flirts",
"The Flying Fox feat. Tiff Lacey",
"The Flying Neutrinos",
"The Fooo Conspiracy",
"The Four Aces",
"The Four Seasons",
"The Fratellis",
"The Fray",
"The Freestylers & StereoType feat. Takura",
"The Funk Fury",
"The Futureheads",
"The Galaxy feat. Sophie Simmons",
"The Game",
"The Gang",
"The Gaslight Anthem",
"The Gentlemen's Blues Club",
"The Giants",
"The Gino Marinello Orchestra",
"The Girl & The Dreamcatcher",
"The Giver",
"The Glam feat. Flo Rida, Trina & Dwaine",
"The Glitch Mob",
"The Glitterboys",
"The Golden Boy feat. Tailor",
"The Golden Pony",
"The Goo Goo Dolls",
"The Good Guys feat. Polina Griffith",
"The Good Natured",
"The Goodnight",
"The Gospel Soul Revivals",
"The Gossip",
"The Grasp",
"The Grates",
"The Greatest View feat. Isabella Manfredi",]

t_rus_list_13 = [
"The Groove Merchants",
"The Guess Who",
"The Hard Concert",
"The Hardkiss",
"The Hatters",
"The Head And The Heart",
"The Heavy",
"The Heist",
"The Hi Freqs",
"The Him",
"The Hippy Boys",
"The Hipsters feat. Portambu",
"The Holmes Brothers",
"The Hooters",
"The Horrible Crowes",
"The Hot 8 Brass Band",
"The Hot Diamonds",
"The Hounds Below feat. Jason Stollsteimer",
"The Hours",
"The House Rejects",
"The Human League",
"The Humans",
"The Hunna",
"The Hunts",
"The Husky",
"The Hypnotunez",
"The Ian Carey Project",
"The Icarus Account",
"The Ink Spots",
"The Inkrediblez",
"The Internet",
"The Invisible feat. Jessie Ware",
"The Isley Brothers",
"The Itals",
"The Jackass & Wency Freak",
"The Jahlights",
"The Jane Dear Girls",
"The Janoskians",
"The Japanese House",
"The Japanese Popstars",
"The Jay Boys",
"The Jazzmasters",
"The Jeff Golub Band",
"The Jet Set",
"The Jigits",
"The Jimi Hendrix Experience",
"The Jimmy Castor Bunch",
"The JND",
"The Jocker´s",
"The Juke Joints",]

t_rus_list_14 = [
"The Junky Sound",
"The Just",
"The Kasbah",
"The Kazu Matsui Project",
"The Kelly Family",
"The Kelly Richey Band",
"The Kenneth Bager Experience",
"The Kentucky Headhunters",
"The Kid",
"The Kid feat. Irina",
"The Killers",
"The Kills",
"The King Is Dead feat. Kye Sones",
"The Kinks",
"The Kitchen Songs",
"The Kite String Tangle feat. Eliott",
"The Kixx",
"The Knocks",
"The Komodo feat. Riqi Harawira",
"The Kooks",
"The Kordz",
"The Lab Wizard meets Interphace",
"The Last Port",
"The Lifted",
"The Limba",
"The Lola O",
"The Lonely Island",
"The Loop Of Life",
"The Lox",
"The Lucian & Regina Blue",
"The Lumineers",
"The M Machine",
"The M.O.B",
"The Maccabees",
"The Mad Candy & Da Brozz",
"The Madden Brothers",
"The Madison",
"The Magician",
"The Main Level",
"The Maine",
"The Majesterians",
"The Makemakes",
"The Maneken",
"The Mankeys",
"The Marvelettes",
"The Marvels",
"The Mass Brothers",
"The Massey Boyz",
"The Matrixx",
"The Mavrik",]

t_rus_list_15 = [
"The Maya Secret",
"The Menace feat. Chris Brown",
"The Meters",
"The Midi Mafia",
"The Midnight Beast",
"The Mike Wheeler Band",
"The Milk Carton Kids",
"The Million",
"The Miltones",
"The Minimal",
"The Miracles & Smokey Robinson",
"The Misfits",
"The Mission",
"The Mnml Attack",
"The Mode feat. JFyah",
"The Monkees",
"The Moody Blues",
"The Moonster",
"The Motans",
"The Mountain People",
"The Mowgli S",
"The Mowgli's",
"The Mrak feat. Elvira Solovey",
"The MVI",
"The Mystery Music",
"The Myth & The Man",
"The Naked And Famous",
"The National",
"The Neibhorts",
"The Neighbourhood",
"The Network",
"The New Coast",
"The New Division",
"The New Morty Show",
"The Nietzsche",
"The Noise feat. Adele Yeoman",
"The North & Alta May",
"The Nycer",
"The Ocean Piano",
"The Officials feat. Someone",
"The Offspring",
"The Olympics",
"The One Night Band",
"The Original",
"The Outlawz feat. Snoop Dogg",
"The Overtones",
"The Paradise",
"The Parakit",
"The Party",
"The Partybangers",]

t_rus_list_16 = [
"The Partysquad",
"The Partystoppers",
"The People Movers",
"The Persuaders",
"The Phantoms",
"The Pharaohs",
"The Phonkers",
"The Piano Guys",
"The Pierces",
"The Pineapple Thief",
"The Pioneers",
"The Planets",
"The Plastix",
"The Platters",
"The Plug",
"The Pointer Sisters",
"The Police",
"The Positive",
"The Potbelleez",
"The Presets",
"The Pressure Droppers",
"The Pretty Reckless",
"The Prince Karma",
"The Prodigy",
"The Proof",
"The Prototypes",
"The Pussicat Dolls",
"The Pussycat Dolls",
"The Qeen",
"The Qemists",
"The Queen",
"The Quireboys",
"The Ragga Twins",
"The Ramones",
"The Rasmus",
"The Reaction",
"The Reactivitz",
"The Ready Set",
"The Real 7",
"The Real Booty Babes",
"The Real Group",
"The Realm",
"The Reason 4",
"The Red Hot Chili Peppers",
"The Reggister's",
"The Regrettes",
"The Reign",
"The Reign Of Kindo",
"The Reincarnation",
"The ReLOUD feat. Crystal Waters",]

t_rus_list_17 = [
"The Reverend",
"The Rex Carroll Band",
"The RH Factor",
"The Rifles",
"The Rigs",
"The Rise",
"The River",
"The Rolling Stones",
"The Romy",
"The Rosy Crucifixion",
"The Rounder Girls",
"The Royal Concept",
"The Royal Dragoon Guards",
"The Royals",
"The Rubens",
"The Rudies",
"The Sacred Four",
"The Saturdays",
"The Score",
"The Scorpions",
"The Screetch",
"The Script",
"The Scumfrogfeat. Sting",
"The Secret State feat. Akon & B.o.B",
"The Seeking",
"The Seige",
"The Sensations",
"The Setters",
"The Shacks",
"The Shapeshifters",
"The Sheeran",
"The Shiffers",
"The Shin & Mariko",
"The Shin Sekai",
"The Shins",
"The Shirelles",
"The Shoes",
"The Silence Broken",
"The Silver Pesos",
"The Silvertones",
"The Six",
"The Skatalites",
"The Slickers",
"The Sloppy 5th's",
"The Smashing Pumpkins",
"The Smiley Dogs feat. Jollie Johansson",
"The Smiths",
"The Smokin Joe Kubek Band",
"The Smooth Commander",
"The Snakehandlers Blues Band",]

t_rus_list_18 = [
"The Soaked Lamb",
"The SoapGirls",
"The Sonics",
"The SoniXx feat. Laura Newman",
"The Sonny Moorman Group",
"The Soul Rebels",
"The Soulful Sun",
"The Sound Messengers",
"The Sound Of Arrows",
"The Soundlovers",
"The Sounds",
"The Sowell Radics",
"The Space Brothers",
"The Spanishertz feat. Luca Zeta",
"The Specials",
"The Spencer Lee Band",
"The Spotnicks",
"The Squrl",
"The Stash",
"The Static Shift",
"The Steeldrivers",
"The Stone Bird & Kiwi",
"The Stone Foxes",
"The Street",
"The Studiopunks feat. Katherine Ellis",
"The Stunners Feat. New Boyz",
"The Stupid Experts",
"The STW Project feat. Ashley Slater",
"The Sublovers",
"The Subways",
"The Sultan",
"The Summer Set",
"The Sun",
"The Sun Boys",
"The Sunclub & Red Lemon",
"The Sunstroke Project",
"The Supersonixxx",
"The Supremes",
"The Sushi Club",
"The Swagger Kings",
"The Sweethearts",
"The Swingle Singers",
"The Swiss",
"The Swoons",
"The Tallest Man On Earth",
"The Teachers",
"The Tech Thieves",
"The Temper Trap",
"The Temptations",
"The Three Degrees",]

t_rus_list_19 = [
"The Thrillseekers",
"The Ting Tings",
"The Tonica feat. Deelara",
"The Toxic Avenger feat. Annie",
"The Trammps",
"The Troggs",
"The Trupers feat. Dam Jones",
"The Tulip Ensemble",
"The Tune Mill",
"The Turtles",
"The Twins",
"The Two Friends",
"The Undedog Project",
"The Underdog Project",
"The Unholy",
"The Union",
"The Unknown Neighbour",
"The Uptown Rhythm Kings",
"The Urban Love",
"The Used",
"The Vagabonds",
"The Vamps",
"The Veer Union",
"The Velvet Sun",
"The Velvet Underground",
"The Veronicas",
"The Verve",
"The Vibeguardz feat. Pit Bailay",
"The Viceroys",
"The View",
"The Villars feat. Katia Q",
"The Violin Girls",
"The Vlack",
"The Wanderers",
"The Wanted",
"The War On Drugs",
"The Wash",
"The Watching",
"The Watts 103rd. Street Rhythm Band",
"The Wavewalkers",
"The Weeknd",
"The Weepies",
"The Well",
"The Whiskers feat. Micah Martin",
"The Whispers",
"The White Nights",
"The Whiteliner & Pretty Pink feat. Nina Hall",
"The Wickeed",
"The Wild",
"The Winery Dogs",]

t_rus_list_20 = [
"The Winners feat. Alex Win",
"The WLT",
"The Wombats",
"The Woods",
"The Word Alive",
"The Worthless",
"The Writers Block",
"The Writing Camp",
"The Wulf",
"The Wulf feat. Sabrina Signs",
"The XX",
"The Yardbrooms",
"The Yellbows",
"The YellowHeads",
"The Young Dubliners",
"The Young Professionals",
"The Zodiacs",
"The Zombies",
"The Вйо",
"The Коля (Коля Серга)",
"The Неподарки",
"The Шпроты",
"The4",
"Thea Garrett",
"Thea Stapnes",
"TheBend",
"TheD!wo",
"Thee Cool Cats",
"Theevs",
"TheFatRat",
"TheFrostBeat feat. Slimz",
"Thegiornalisti",
"TheHxliday",
"Theia",
"TheLavish",
"Thelma Plum",
"Them Lost Boys feat. Lexi Forche",
"TheMarkuz",
"Theo Rose",
"Theo Vaness",
"Theodore Shapiro",
"Theoh & Kyler England",
"Theophilus London feat. Kanye West",
"Theory Of A Deadman",
"Theory vs. Stefy De Cicco & Adax",
"Theoz",
"Thepianoguys",
"There For Tomorrow",
"Theresa Rex",
"Therese Neaime",]

t_rus_list_21 = [
"Therr Maitz",
"These Four Walls",
"Thesese Neaime",
"TheVerce feat. Snoop Dogg",
"THEY.",
"Thief",
"Thiesen & Senza, James Durden feat. Amanda Wilson",
"Thievery Corporation",
"Thimlife feat. Vanessa Lani",
"Thing",
"Third D3gree",
"Third Party",
"Third Son",
"This Culture & Vanilla Ace",
"ThoBa",
"Thoj feat. Lisa Pariente",
"Thom Yorke",
"Thomas Anders",
"Thomas Azier",
"Thomas Barquee",
"Thomas Bjerring & David Skog",
"Thomas Bronzwaer",
"Thomas Buttenschon",
"Thomas Datt feat. Ben Heyworth",
"Thomas Dybdahl",
"Thomas feat. John Puzzle",
"Thomas Feelman & SOVTH",
"Thomas Fiss",
"Thomas Geel",
"Thomas Gold",
"Thomas Grand",
"Thomas Hayes",
"Thomas Heat",
"Thomas Holm",
"Thomas Jack",
"Thomas Lemmer",
"Thomas Living feat. Janie Symph",
"Thomas Lundell",
"Thomas Mengel",
"Thomas Mraz",
"Thomas Nevergreen и Леонид Агутин",
"Thomas Newman",
"Thomas Newson",
"Thomas Nikki",
"Thomas Petersen",
"Thomas Rhett feat. Maren Morris",
"Thomas Sagstad feat. Wildo",
"Thomas Scheffler",
"Thomas Sopper",
"Thomas You feat. Mc Trini",]

t_rus_list_22 = [
"Thompson Square",
"Thomston",
"Thomston & Wafia",
"ThomX",
"Those Dancing Days",
"Thousand Foot Krutch",
"Thrdl!fe",
"Three Days Grace",
"Three Drives On A Vinyl",
"Threesix",
"Threshold",
"Throttle",
"Throw The Fight",
"Thumbs Down",
"Thunder",
"Thundermother",
"Thya",
"Thylacine",
"Ti-Mo",
"Ti.Mey",
"Ti.Pi.Cal. feat. Josh",
"Tia London",
"Tiaan",
"Tiago Nacarato & Salvador Sobral",
"Tiamat",
"TIAN",
"Tiana feat. Vybz Kartel",
"Tiana Khasi",
"Tiana Roz",
"Tiara Thomas",
"Tiborg",
"Tich",
"Ticli",
"Tiddey",
"Tie Break",
"TIEKS feat. Chaka Khan & Popcaan",
"Tierra",
"Tierro",
"Tiesto",
"Tiff Lacey",
"Tiffany Alvord",
"Tiffany Desrosiers",
"Tiffany Evans",
"Tiffany Evans feat. Fetty Wap",
"Tiffany Houghton",
"Tiffany Queen feat. Jason Derulo",
"Tiffany Young",
"Tiga",
"Tiger Family",
"Tigerlily",]

t_rus_list_23 = [
"TigerSwan",
"Tigertown",
"Tiggi Hawke",
"Tight & Dirty",
"Tiiwtiiw",
"Tijana Dapcevic",
"Tijo",
"Tika",
"Tiko's Groove feat. Gosha",
"Tilka",
"Till West & Dk Delicious",
"Tilo Klas",
"Tim Aminov",
"Tim Arisu",
"Tim Bell feat. Dani Lima",
"Tim Berg",
"Tim Big Family Feat Туман",
"Tim Carvalho",
"Tim Chadwick",
"Tim Dawn",
"Tim De Ville feat. Alessa",
"Tim Dian",
"Tim Enso",
"Tim Gartz",
"Tim Gipsy feat. Джиос & ODIS",
"Tim Gorgeous",
"Tim Greenberg",
"Tim Healey & Freqhouse",
"Tim Ismag",
"Tim James & Nevermind",
"Tim Janis",
"Tim Lighterz",
"Tim Mason",
"Tim McGraw",
"Tim Mcmorris",
"Tim Parker",
"Tim Rocks",
"Tim Royko",
"Tim Schaufert",
"Tim Schou",
"Tim Schulz & Jamie Roseanne",
"Tim Van Werd",
"Tim Vox feat. Olya Milaxa & Ellis Sexton",
"Tim Weisberg",
"Tim. Big Family",
"Tim3bomb",
"Timalone",
"Timaro",
"Timbaland",
"TimBigFamily",]

t_rus_list_24 = [
"Timbo",
"Time Frequenz",
"Time Takers feat. DEV & Tinchy Stryder",
"Timebelle feat. Sunstroke Project",
"Timebomb",
"Timeflies",
"Timeline",
"Timian & Rusalina feat. Syntheticsax",
"Timma",
"Timmo",
"Timmy & Tommy feat. Leila",
"Timmy J",
"Timmy Trumpet",
"TimmyPaskhin, AnVea",
"Timo & Dicca feat. Rachel Clark",
"Timo Graf, Dacia Bridges",
"Timo Maas",
"Timo Tolkki",
"Timofey & Alba",
"Timofey feat. Sue Cho",
"Timofey vs. Terri B!",
"Timofey White",
"Timokhin feat. Adamant",
"Timomatic",
"Timoteij",
"Timran",
"Timster",
"TimTaj",
"Timur Shafiev",
"TIMZ",
"Tina Arena",
"Tina Davis",
"Tina feat. Katrina Noorbergen",
"Tina Key",
"Tina Mela",
"Tina Turner",
"Tinashe",
"Tinavie",
"Tinchy Strider",
"Tinfed",
"TINI",
"Tinie Tempah",
"Tink",
"Tinkara Kovac",
"Tinlicker",
"Tino Gonzales",
"Tinsley Ellis",
"Tintal",
"Tintern Abbey",
"Tinyak & RiJes",]

t_rus_list_25 = [
"Tip",
"Tiphani Abney",
"Tiramisu",
"Tiscore feat. Julia Ross",
"Tisha Campbell Martin",
"Tisha feat. Dzham",
"Tisoki",
"Titan Brothers",
"Titiyo",
"Tito & Tarantula",
"Tito El Bambino",
"Tito Losada",
"Tito Torres",
"Titov!",
"Titus Turner",
"Tityo",
"Tius",
"Tivoli & Dj Shtopor feat. Katya Rechkina",
"Tiwa Savage",
"Tiziano Deiana feat. Der Duck",
"Tiziano Ferro",
"Tjernberg feat. Vuk Lazar",
"Tjindjara feat. F1rstman",
"TJR",
"Tjuva",
"Tkay Maidza",
"Tlaly Tovar feat. Nathia Kate",
"TLC",
"TLC feat. Snoop Dogg",
"Tlove Ft. Ron Carroll",
"TM Allstars feat. Inusa Dawuda",
"To Viana",
"To-ma",
"Toast & Atragun",
"Tobak",
"Tobeloved",
"Tobias Bernstrup",
"Tobias Lueke",
"Tobix & Aisha",
"Tobtok",
"Tobu",
"Toby Green",
"Toby Keith",
"Toby King",
"Toby Love feat. Yuridia",
"Toby Traxx",
"Toby Turner",
"Toby Yams",
"TobyMac",
"Toca Lounge",]

t_rus_list_26 = [
"Tocadisco",
"Tod Pale & DJ Smilres",
"Todd Carey",
"Todd Edwards & Sinden",
"Todd Terry",
"Todiefor & Shoeba & Romeo Elvis",
"Todomondo",
"Todrick Hall",
"TOF (Стольный Град)",
"Toffe",
"Tohi & Massari",
"Toi Stori",
"Tokio Hotel",
"Tokischa & Jamby El Favo",
"Tokmurall",
"Toksi feat. Jona Selle",
"Tokyo Boulevard",
"Tokyo Ghetto Pussy",
"Tokyo Machine",
"Tokyo Project feat. Kleak & Veebu",
"Tokyo Prose",
"Toler Townsend Band",
"Tolga Mahmut",
"Tolga Uzulmez & Furkan Senol",
"TOLIKA",
"Tolla",
"Toly Braun",
"Tom & Hills",
"Tom & Jame",
"Tom Adams",
"Tom Andrews",
"Tom Barabas",
"Tom Bekker",
"Tom Boldt",
"Tom Boxer",
"Tom Bro",
"Tom Budin",
"Tom Bull",
"Tom Cloud",
"Tom Colontonio",
"Tom Cruise",
"Tom Day",
"Tom Dice",
"Tom Enzy feat. Adam Clay, Torrian Ball & Joey Bandz",
"Tom Exo",
"Tom Fall",
"Tom Flex",
"Tom Forester",
"Tom Gregory",
"Tom Grennan",
"Tom Hangs feat. Shermanology",
"Tom Hillock & David Krutten",
"Tom Hooker",
"Tom Jackson",]

t_rus_list_27 = [
"Tom Jules",
"Tom Kurv feat. Desy",
"Tom Light",
"Tom MacDonald",
"Tom Martin",
"Tom Morello",
"Tom Mountain",
"Tom Nash",
"Tom Noize feat. ST",
"Tom Novy",
"Tom Odell",
"Tom Parker",
"Tom Petty & The Heartbreakers",
"Tom Piper & Rob Pix",
"Tom Reason",
"Tom Redwood",
"Tom Rosenthal",
"Tom Sawyer",
"Tom Scott & The LA. Express",
"Tom Siher feat. Fernanda Lebock",
"Tom Snare",
"Tom Snare feat. Nieggman",
"Tom Soda",
"Tom Staar",
"Tom Stephan & Danny Verde feat. Rowetta",
"Tom Strobe",
"Tom Swoon",
"Tom Swoon, Paris & Simo",
"Tom Townsend",
"Tom Tripp",
"Tom Tyger",
"Tom Tyger & Florian Picasso",
"Tom Ven & Dzasko feat. Matthew Steeper",
"Tom Waits",
"Tom Walker",
"Tom Walker feat. Zara Larsson",
"Tom Ware",
"Tom Wax & Strobe",
"Tom Wilson",
"Tom Zanetti feat. JayKae",
"Tom Zanetti feat. Karen Harding",
"Tom Zanetti feat. Preditah",
"Tom-E & Danny Fernandes feat. Ish",
"Tomaboys",
"Tomai",
"Tomakenoise feat. Alexia",
"Tomas",
"Tomas Barfod feat. Eddie Chacon",
"Tomas Heredia",
"Tomas Heredia feat. Tata",]

t_rus_list_28 = [
"Tomas Thordarson",
"Tomatito",
"Tomatoes",
"Tombs, Happy Colors & Jack Style",
"Tomcraft",
"Tomhio",
"TOMI feat. Snoop Dogg",
"Tomla",
"Tommee Profitt",
"Tommi Bravo feat. L Marshall",
"Tommie Sunshine",
"Tommy B. Deejay feat. MC Papajo",
"Tommy Boy",
"Tommy Brown",
"Tommy C. feat. J. Reyez",
"Tommy Emmanuel",
"Tommy feat. Helena-Shadia",
"Tommy Genesis",
"Tommy Johnson",
"Tommy Loude",
"Tommy McCook",
"Tommy Santo",
"Tommy Stewart",
"Tommy Sun",
"Tommy Torres",
"Tommy Trash",
"Tommy Vee",
"Tommy Vegas",
"Tommyboy & Zsak",
"Tomoro & Alexandra Stan",
"Tomorrow & Together",
"Tomtrax",
"TomX",
"Tomy DeClerque",
"Tomy Slow feat. Bogee Sz.",
"Ton De Fest",
"Ton!C & Erick Gold",
"Tone Damli",
"Tones And I",
"Toni Braxton",
"Toni Codina",
"Toni Esposito",
"Toni G",
"Toni Halka",
"Toni Romiti",
"Toni Tone feat. Lexi",
"Toni Tonini feat. Jean Niqo, D-Vibe & Vali",
"Tonich Zachitano feat. S-Bizz",
"Tonight Alive",
"Tonino Baliardo",]

t_rus_list_29 = [
"Tonite Only feat. Yeah Boy",
"Tonny Gomez ft. Juanlu Navarro, Mecer & Javi Ramirez",
"Tony & Alisa",
"Tony Allen",
"Tony Anthem",
"Tony Bennet & Lady Gaga",
"Tony Bennett",
"Tony Britten",
"Tony Burns",
"Tony Carey",
"Tony Carey's Planet P Project",
"Tony Catania Project feat. Yung Phantom",
"Tony Change & Bietto feat. Andrea Morph",
"Tony Crash feat. Neki",
"Tony Fallone",
"Tony Fernandez & Adrian Ramos feat. Nico Mastre",
"Tony Gastello",
"Tony Gomez",
"Tony Igy",
"Tony Jaguar",
"Tony Joe White",
"Tony Junior",
"Tony Kart",
"Tony Lee King",
"Tony Lozano",
"Tony Martinez & Andrew feat. Inmagine",
"Tony Mayers feat. Andrew Mastilias",
"Tony Moran",
"Tony Murena",
"Tony Parker",
"Tony Ray",
"Tony Ray Project",
"Tony Romera",
"Tony Ross & Olamide & Magnito",
"Tony S & M.A.B. feat. Anna Montgomery",
"Tony S & Rocky",
"Tony Seal",
"Tony Semeraro",
"Tony Smileeque",
"Tony Sunshine feat. Fred Da Godson",
"Tony T",
"Tony Tonite",
"Tony Tweaker Feat. Jessy",
"Tony Tyler feat. ReMi",
"Tony Voltaggio",
"Tony Williams feat. Kanye West, King Chip & Freddie Gibbs",
"Tony Wilson",
"Tony Wong",
"Tony Zampa",
"Tony-Gun",]

t_rus_list_30 = [
"TonyDex",
"Tonykola & Капа",
"TONИ",
"Too Close To Touch",
"Too Many Artists",
"Too Many T's",
"Too Many Zooz",
"Tooji",
"Tool's feat. Kendrick Lamar & Famoso",
"Toolbox",
"TooManyLeftHands",
"Toompak Deejays feat. Nova B",
"Toots And The Maytals",
"Topalova",
"TopGunn",
"Topher Jones",
"Topi",
"Topic & Ally Brooke",
"Topic & Juan Magan feat. Lena",
"Toploader",
"Topmodelz",
"TOPS",
"Topsy Crettz",
"Tor Miller",
"Tord Gustavsen Trio",
"Tori Amos",
"Tori Aster & Rimas",
"Tori Joy",
"Tori Kelly",
"Tori Kvit",
"Torine",
"Torio feat. Polina",
"Toronzo Cannon",
"Torqux",
"Torrente & Solarys",
"Tory feat. DJ Jonnessey",
"Tory Lanez",
"Tory Yutt",
"Tosca",
"Tosch",
"Tose Proeski",
"Tosh Alexander feat. Miss Kitty",
"Toshiro Masuda",
"Total",
"Total Ape feat. Iggy Azalea",
"Total Recall feat. Mark McKenzie",
"Total Science feat. Grimm",
"Total Sound feat. Nathalia",
"Total Toly",
"Totem",]

t_rus_list_31 = [
"Totemo",
"Totes",
"Toto Cutugno",
"Totte",
"Touch & Go",
"Touch Sensitive feat. Electric Fields",
"Touch The Sound",
"Touching The Obelisk",
"Tough Love",
"Tourist feat. Josef Salvat Niia",
"Tove Lo",
"Tove Styrke",
"Tower of Power",
"Towers",
"Toxb",
"Toxotis",
"Toy",
"Toy-box",
"Toyboy & Robin",
"Toydrum",
"Toygunz",
"Toyya",
"TP4Y",
"TPaul",
"Tr-Meet & BigRock, Yuliana",
"Tracey Lee",
"Tracey Thorn",
"Traci Braxton",
"Track Eaters",
"Track Of Time",
"Trackshittaz",
"Tracy Chapman",
"Tradelove",
"Trae Tha Truth feat. Young Jeezy, T.I. & Diddy",
"Traffic House feat. Alberto Malleiro",
"Tragedy",
"Traggor feat. Mela Fleur",
"Train",
"Trampa",
"Trance Arts feat. Lisa Rose",
"Trance Classics & Mariske Hekkenberg",
"Trance X.",
"Trancematix",
"TrancEye",
"Trane & Divinevox",
"Tranquillo",
"Trans Balear",
"Trans Lady Evelina",
"Transviolet",
"Trapzillas & Los XL",]

t_rus_list_32 = [
"Trash Talk",
"Trasponder",
"Traudes",
"Traum:a feat. Jak Polo",
"Trav feat. Sean Kingston",
"Travie McCoy",
"Travis",
"Travis Atreo",
"Travis Barker",
"Travis Garland",
"Travis Mendes",
"Travis Mills",
"Travis Porter",
"Travis Scott",
"Travis Tritt",
"Travist Garland",
"Travy P",
"Trawler",
"Traxogen",
"Trazom",
"TRE feat. Kid Ink",
"Tre Sera & Sevim",
"Treasure Davis",
"Treasure Fingers",
"Trebland feat. Dvines",
"Treble",
"Tree Of Life Band",
"Treeorange",
"Treetop Flyers",
"Treitl Hammond feat. Tom Boxer",
"Trell Daray",
"Tremonti",
"Trendy Boy",
"Trentemoller",
"TRES",
"Trevor Hall",
"Trevor Jackson",
"Trevor Jones",
"Trevor Moran",
"Trevor Omoto",
"Trevor Sewell",
"Trevor Shield & The Beltones",
"Trevor Simpson & The Cataracs",
"Trey D",
"Trey Songz",
"TREYA",
"TRFN",
"TRG feat. DJ R'an",
"TRGL",
"Triana Iglesias & Loke",]

t_rus_list_33 = [
"Triana Park",
"Triangle sun",
"Triarchy",
"Trias",
"Tribal Saints feat. Hyp3d & Reanna Armellino",
"Tribe Society feat. Kiesza",
"Tribune",
"Trick Trick",
"Trife & Saigon Mark Ronson Feat. Nate Dogg",
"Trijntje Oosterhuis",
"Triko Trako",
"Trilane & Felicity",
"Trill Mont feat. Leezy",
"Trillian Miles",
"Trim The Fat",
"Trina",
"Trince feat. Bdr Squad",
"Trinidad James feat. Pitbull",
"Trinix",
"Trio Pantango",
"TripL",
"Triple A",
"Triple One",
"Triple X Elle",
"Triple8",
"Triplex",
"Triplo Max",
"Trippie Redd",
"Trippynova",
"Tripssono",
"Trish Kerr",
"Tristam & Braken",
"Tristam & Rogue",
"Tristan D & Tangle pres. Nu-State",
"Tristan Garner",
"Tristan Ivemy",
"Tristan Mackay",
"Tristan Prettyman",
"Tritan feat. Ratfoot",
"Tritia",
"Triticum",
"Tritonal",
"Trivecta",
"Trivial Voice",
"Trivium",
"Trixstar",
"Trixxie & Cheat Codes",
"Trobi",
"Trofimm",
"TrOLL3R",]

t_rus_list_34 = [
"Tropicon",
"Tropkillaz",
"Trouble Nation",
"Trouble T and Mufasa",
"Trouze feat. Brandyn Burnette",
"Trove",
"TROY",
"Troy Ave",
"Troyash",
"TroyBoi",
"Troye Sivan",
"Tru Concept",
"Trubetskoy",
"Trudgers",
"True Blue Hero feat. Lola Rhodes",
"True Damage feat. Becky G & Keke Palmer",
"True Star",
"TrueДно feat. ChipaChip",
"TRUEтень",
"Trupa Velvet",
"Truth",
"Truu Colours feat. Katie Brisbourne",
"TRUЕтень feat. BaGGer",
"TRVBL feat. RustelLo",
"Trvpers feat. J. Hooks",
"TRXD",
"Tryple",
"Tryst",
"TS Graye",
"TS7",
"Tsaho",
"Tsalikis & Mohombi",
"TSAR",
"Tsar B",
"Tsar Project",
"Tseke",
"Tsili",
"TSM",
"Tsorf",
"TSOY",
"TST & Moguai feat. Amba Shepherd",
"TST & Twoloud",
"TT PRO MSK feat. Каспийский Груз",
"Tubarao Baixada feat. Snoop Dogg",
"Tube & Berger",
"Tube & Miller",
"Tube Tonic",
"Tucandeo & Esmee Bor Stotijn",
"Tuff London feat. Rachel Barror",
"Tuff Touch",]

t_rus_list_35 = [
"Tujamo",
"Tula",
"Tulia",
"Tulisa",
"Tulpa feat. Viola Ellis",
"Tumada",
"TumaniYO",
"Tumba feat. Cuca & Shena",
"Tumult feat. Kamilia Amelie",
"Tuna feat. Paniik",
"Tunde Olaniran",
"Tune feat. Akon, Raquel & P.Money",
"Tungevaag",
"Tunng",
"Tuomas Kauhanen",
"Tural Everest & Магомед Аликперов",
"Turan",
"Turbo Gun",
"Turbotronic",
"Turchenkova",
"Turkez & Hakes feat. Ana Laura Jalles",
"Turning Blue",
"Turntable Dubbers feat. Doctor",
"Tut Tut Child",
"Tutyasheva",
"Tuure Boelius feat. Teflon Brothers",
"TuZZ & Роми Харука",
"TV Noise",
"TV On The Radio",
"TV Rock",
"TVXQ",
"Tw2'iN",
"Twax feat. Solomina",
"Tweet feat. Missy Elliott",
"Twenty 4 Seven",
"Twenty Feet Down",
"Twenty One Pilots",
"TWERL & Jumrak feat. Nkolo",
"Twide & Adamant",
"TWiiNS",
"Twilight Worldz",
"Twin Atlantic",
"Twin Blood",
"Twin Forks",
"Twin Shadow",
"Twin Theory & Fabich feat. Liska",
"Twin Twin",
"Twin VI",
"Twin Wild",
"TwinCloth",]

t_rus_list_36 = [
"Twine",
"Twinnie Lee Moore",
"Twins",
"Twista",
"Twisterz feat. Kris Kiss",
"TWO",
"Two Feet",
"Two Friends",
"Two Heads",
"Two Killers ft. FRAM! feat. Ange",
"Two Lanes feat. Kwesi",
"Two Messes",
"Two Of Us feat. Jayce",
"Two People",
"Two Steps From Hell",
"Two Tricky",
"Two Voices",
"Two Worlds Apart feat. Lisa Diasparra",
"Two-9 feat. Wiz Khalifa & Ty Dolla Sign",
"Twocolors",
"Twofold",
"Twoloud",
"TwoThirds feat. Bijou",
"TwoWorldsApart & Jordi Rivera feat. Raquel Castro",
"TWRK",
"Ty Dolla Sign",
"Ty Farris",
"Tycho",
"Tycoos",
"Tydem",
"TyDi",
"Tydiaz",
"Tyga",
"Tygr",
"Tyketto",
"Tyler & The Creator",
"Tyler Carter",
"Tyler Dow Bryant",
"Tyler feat. The Creator",
"Tyler Hilton",
"Tyler Jones",
"Tyler Mann & Nicopop.",
"Tyler Shaw",
"Tyler Ward",
"TyllerJames feat. AntWave",
"Tyomcha (DGJ)",
"Tyra B",
"Tyrante feat. Adamant",
"Tyrese",
"Tyron Hapi",
"Tyrone Wells",
"TYSM",
"Tyson Lambert",
"Tyzo Bloom feat. Gigi",
]

litera = SoundSymbol.objects.get(name="T")

count = 0

for tag in t_rus_list_8:
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
