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

r_rus_list_1 = [
"R & M",
"R-Action",
"R-Powl feat. Alex Stavi",
"R. Kelly",
"R.A.B.B.I.I.",
"R.A.D",
"R.E.L.O.A.D.",
"R.E.M.",
"R.I.O.",
"R.K.M. & Ken-Y x Natti Natasha",
"R.LUM.R",
"R.O.N.N.",
"R.O.S",
"R'Bros",
"R'n'g",
"R&E",
"R&M",
"R3ckzet",
"R3hab",
"R5",
"Ra",
"RA & MC Arnold",
"RABBII",
"Rabbit Killer",
"Rabbit Run",
"Rabih",
"RAC",
"Race Bannon",
"Racetraitor",
"Rachael Lampa",
"Rachael Starr",
"Rachel Costanzo",
"Rachel Kramer pres. Dr. Dancefloor",
"Rachel Platten",
"Rachel Portman",
"Rachel Reed",
"Rachel Taylor",
"Rachelle feat. Spoila Ranks",
"RADA",
"Radhu",
"Radi",
"Radiant",
"Radical Face",
"Radio Ink",
"Radio Killer",
"Radio Project",
"Radio Silence",
"Radio Я",
"Radiohead",
"Radiokidsfm Show",]

r_rus_list_2 = [
"RadioLIFE",
"Radiology feat. Lux",
"Radion6",
"Radiorama",
"Radistai DJ's feat. Jessica Shy",
"Radius",
"Rado & Gladkiy",
"Radu Sirbu",
"Raduga",
"Radvilas Ra feat. Noro & AKA",
"Rae & Christian",
"Rae Morris",
"Rae Sremmurd",
"Raeko feat. Maya Tuttle",
"Raekwon",
"RaeLynn",
"RAEVE & Tru Concept feat. Patricia Edwards",
"Rafa Barrios",
"Rafa Romero feat. David Da Costa",
"Rafael Andujar",
"Rafael Canizares",
"Rafael Cortes",
"Rafael Diefentaler feat. Michael Zhonga",
"Rafael Frost",
"Rafael Osmo",
"Rafael Riqueni",
"Rafal",
"Rafeon feat. Omar",
"Raff",
"Raffa Ciello",
"Raffaele Rizzi",
"Raffaella Carra & Bob Sinclar",
"Rafferty",
"Raflo",
"Rafo",
"Rag'n'Bone Man",
"Ragdoll",
"Rage",
"Rage Of Angels",
"Ragga Twins",
"Raghav",
"RaHa & Shami",
"Rahim El",
"RahRah",
"Rahsaan Roland Kirk",
"Rahu feat. Cybil",
"Rai",
"Rai-Band",
"RAI, Voozle & Joey Rumble",
"Raiga",]

r_rus_list_3 = [
"Raige",
"Raikhana Mukhlis",
"RaiM & Adil",
"Raim & Artur",
"Raim feat. Artur & Adil",
"Rain Mane",
"Rain, Океан (Тихий), Одинокий",
"Rainbow",
"Raindropz! feat. Bass Bumpers",
"Rainer & Grimm",
"Rainforest",
"Rains",
"Rainsford",
"Raise",
"Raise Spirit",
"Raised By Swans",
"Raja",
"Rak-Su",
"Rakel Project",
"Raketa",
"Raleigh Ritchie",
"Ralflo",
"Rallan",
"Ralli Rock & The Moan Of The Sky",
"Ralph Alessi",
"Ralph Cieli & Martin Guadagnini",
"Ralph Felix",
"Ralph Good feat. Jamie Lee Wilson",
"Ralph Seegobin",
"Ralpheus feat. Emphious",
"Ralphgotstacks",
"Ralphi Rosario & Wayne G feat. Stewart Who",
"Ralphie B",
"Ralphy feat. Runa Ria",
"Raluca Ionescu",
"Raluka",
"Ralvero",
"Ram & Susana",
"Ram feat. Stine Grove",
"Ram feat. Susana",
"Ram Jam",
"Ramada",
"Ramage Inc.",
"Ramba Zamba",
"Rambacy feat. Danny Claire",
"Rambo Amadeus",
"Rameez",
"Rameses B",
"Ramil'",
"Ramin Djawadi",]

r_rus_list_3 = [
"Ramin Karimloo",
"Ramirez Resso",
"Ramiro Lopez",
"Ramon & H1GH",
"Ramon Del Castillo",
"Ramon feat. Неуслышанный & Денис Океан",
"Ramon Mirabet",
"Ramona C",
"Ramona feat. Mr. E",
"Ramona Nerra",
"Ramonet Y Sus Rumberos",
"Rampus",
"Ramsey Lewis Trio",
"Ramzes",
"Randall",
"Randers Cowboys",
"Randi",
"Random",
"Randy Class",
"Randy Crawford",
"Randy Morrison Band",
"Range",
"Rangel",
"Ranger",
"Rangleklods",
"Rania",
"Rank 1",
"Ransom",
"Raoul Russu",
"Rap Allstars Feat. Leroy Daniels",
"Rap LiGa и Чингиз Лятифов",
"Rapchinno",
"Rapha",
"Raphael Gualazzi",
"Raphael Kafers Tyranno Saurus Jazz",
"Raphael Lake",
"Rappers Against Racism Feat. Trooper",
"RapS.A.T. feat. Shamik",
"Rapsody feat. Merna",
"Raptile Feat. Da Liones",
"Rapture",
"Rapublic",
"Raqoon",
"Raquel",
"RARE feat. M.Y.B & PLC",
"Rares",
"Rarka",
"Ras",
"RASA",
"RASA feat. Kavabanga Depo Kolibri",]

r_rus_list_4 = [
"Rascal Flatts",
"Rasel",
"Rashamba",
"Rashni",
"RasKar",
"Rasmus",
"Rasmus Faber",
"Rasmus Gozzi",
"Rasmus Seebach",
"Rasmus Skott",
"Rasmus Thude",
"Rasmus Walter",
"Rasmussen",
"Rassell",
"Rassi",
"Rassolodin",
"Rasster",
"RaSta",
"RastaStyle",
"Rastaveli Mc",
"Rastea feat. Sharvi & Валентина Гейн",
"RastFlame",
"Rastley",
"Rat City",
"Rationale",
"Rauf & Faik",
"Raul Barboza",
"Raul Ortiz feat. Daren J Bell",
"Raury",
"Rauschhaus",
"Rauw Alejandro",
"RaVaughn",
"Rave Agenda",
"Rave Boar",
"Rave CHannel",
"Rave Radio",
"Rave Republic",
"Rave Vegas",
"Ravebass feat. Miria",
"Ravell & Tamra Keenan",
"Raven & Kleekamp",
"Raven & Kreyn",
"Raven Felix",
"Raveon & Christian Tanz feat. Jonny Rose",
"Raverdiago",
"Ravil Aibylatov",
"Ravin Bayramov",
"Ravitez",
"Raw Stylus",
"Rawanne",]

r_rus_list_5 = [
"Rawdolff",
"Rawtek feat. Cory Williams",
"Rawyals feat. Wale",
"Ray & Anita",
"Ray Anita",
"Ray B",
"Ray Blk",
"Ray Bonneville",
"Ray Charles",
"Ray Chris feat. Avenus",
"Ray Conniff",
"Ray feat. Anita",
"Ray feat. Kolomenskaya",
"Ray Foster",
"Ray Foxx",
"Ray Guarano",
"Ray J",
"Ray Jams feat. Rocks & Mario V",
"Ray Kids",
"Ray Lavender feat. Akon",
"Ray Parker Jr.",
"Ray Volpe",
"Ray Wilson",
"Ray Worx",
"Rayan Myers",
"Rayana Jay feat. ESTA.",
"Rayasa & Blvkway feat. Tracey",
"Raye",
"Rayelle",
"Rayhon",
"Raylee",
"Rayman Rave & Nika Lenina",
"Rayon-X",
"Rayphonic",
"Rayven & Valexx",
"Rayven Justice",
"Rayzen",
"Raz Nitzan",
"Razah",
"RazBerri",
"Razcal",
"Razihel",
"RAZIZ",
"Razmara feat. Chris Baco",
"Razmer Project",
"RaЯ",
"RBYN",
"RBYN feat. Karra",
"RD feat. Angela Sea",
"RDB feat. T-Pain",]

r_rus_list_6 = [
"Rdnixx",
"Re Dupre, Vintage Culture",
"RE-pac",
"Re-Union",
"Re:boot feat. Лена Катина",
"Reach & Jupe",
"Reagan",
"Reaktion feat. The Eden Project",
"Real Dream",
"Real Hype",
"Real McCoy",
"Real Melody & Dj Sinnex",
"Real O",
"Real Words",
"Reamonn",
"ReauBeau & Julian Calor feat. Liss",
"Rebecca & Fiona",
"Rebecca Black",
"Rebecca Ferguson",
"Rebecca James",
"Rebecca Stella",
"Rebecka Karlsson",
"Rebeka Brown",
"Rebeka Dremelj",
"Rebekka Introiti feat. Dan24",
"Rebel",
"Rebellion The Recaller",
"Reboost feat. Ellen Freij",
"Rec",
"Reckless",
"Reckless Dogz",
"Recognize Ali & Waterr",
"Red",
"Red Blonde",
"Red Bosses feat. Fat Cat",
"Red Cafe",
"Red Calling",
"Red Carpet",
"Red Eleven",
"Red Eye Crew feat. Singuila",
"Red Fox",
"Red Hot Chili Peppers",
"Red Light",
"Red Line",
"Red Lyard",
"Red Naxi feat. R-win",
"Red Quarter",
"Red Squareо",
"Red Sun Rising",
"Red Touch feat. Kay",]

r_rus_list_7 = [
"RedCode",
"Redd Stylez",
"Redd, Qwote & Pitbull",
"Redeyes feat. DRS",
"Redfoo",
"Redgi",
"Redjack",
"Redji Bloom",
"Redlight",
"Redlounge Orchestra",
"Redman",
"Rednek",
"Rednex",
"Redo & Bato",
"Redondo",
"RedOne",
"Redroche vs. Armstrong",
"Redrum",
"RedTop & Niklas Gustavsson",
"Redtzer",
"Reea",
"Reebs",
"Reece Mastin",
"Reef feat. Ivan Valeev",
"Reelroad",
"Reepublic",
"Reeve Carney feat. Bono and The Edge",
"Reez",
"Ref-Stone feat. Tато & Bilana",
"Refeci",
"Refex",
"Refined Brothers feat. Stephan Endemann",
"Refinement",
"Reflex",
"REFS",
"Refuzion",
"Regain",
"Regal",
"Regard",
"Reggaer",
"Reggie 'N' Bollie",
"Regimen",
"Regina Spektor",
"Regn",
"Reid Stefan",
"Reigan",
"Reija Lee",
"Reik",
"Reincarnation",
"Reino Nordin",]

r_rus_list_8 = [
"REK feat. Viex",
"Rekoon",
"Relanium",
"Relapse And Machinist",
"RELEJI & Katty Heath",
"Relentless Flood",
"Rell The Soundbender feat. Los Rakas & Far East Movement",
"Rella Roxx feat. DeeJay Rares",
"ReLocate",
"Remady",
"Rembrandt",
"Remedy",
"Remeter",
"Remi",
"Remmi",
"Remo feat. Doniu & Amila",
"Remundo",
"Remy Cooper",
"Remy Ma",
"Remzee",
"RENA",
"Rena & Bess",
"Rena Rnt",
"Renaida",
"Renate",
"Rence feat. Noah Cyrus",
"Rene & Dj K.I.M",
"Rene & Matvey Emerson",
"Rene & Music Hayk",
"Rene Ablaze",
"Rene Amesz",
"Rene De La Mone",
"Rene Dif feat. Kaya Jones",
"Rene LaVice",
"Rene Pesenti",
"Rene Rodrigezz",
"Renee Santana feat. Mike Diamondz",
"Renegade Five",
"Rengle",
"Renik",
"Renovation Blues Band",
"Renz",
"Renzo Alba & Ina Valdes",
"Reo Speedwagon",
"ReOrder",
"Reptile Room",
"Reptile Youth",
"Reshrich",
"Residence Deejays",
"Residential Origin",]

r_rus_list_9 = [
"Resistance",
"Ressu Redford",
"Rest feat. МОС13",
"Retro Station",
"Retrohandz & Tropkillaz feat. Richie Loop",
"Retroman feat. Kalia",
"Retronic Voice",
"RetroVision",
"Reunify",
"Reunited",
"Rev Jones",
"Rev Theory Feat. Jim Johnston",
"Revelries feat. Jeoko",
"Revero",
"Reverse feat. Ane",
"Revine feat. Maryann Vasquez",
"Revital Nachmani",
"Revodj feat. Catalano Visconti",
"Revol feat. Sickbeatz",
"Revolution DJ",
"Revolution Renaissance",
"Revolvers",
"Revoльvers",
"Rewind",
"Rework",
"Rex feat. Harry Shotta, Victor Mizer & Chloe Hayter",
"Rex Mundi",
"Rex Orange Country",
"Rex Riot",
"Rey B feat. D Claire",
"Rey DJ feat. Ewa",
"ReyDi",
"Reyho",
"Reyko",
"Reykon",
"Reyna",
"Reyna Vox",
"Reynard Silva",
"Reza",
"ReZak feat. Mars",
"REZarin",
"Rezonate",
"Rezz",
"Reфorma",
"Rhapsody Of Fire",
"Rhilir Mikal feat. Ola",
"RHM Project",
"Rhodes",
"Rhy-Zy",
"Rhye",]

r_rus_list_10 = [
"Rhys feat. Felix Sandman",
"Rhys Lewis",
"Rhythm Of Mankind & Nature",
"Ri & XLDeluxe",
"Ria Antoniou",
"Ria Bibi",
"Ria Mae",
"Ria Mae & Dan Talevski",
"Ricardo Drue feat. Crissanji",
"Ricardo Fontan",
"Ricardo Padua & Lady Gaga",
"Ricardo Prado",
"Ricardo Reyna",
"Riccardo Piparo feat. Deanna",
"Ricchi E Poveri",
"Ricci & Ad Voca",
"Rich Brass",
"Rich Curtis",
"Rich Edwards",
"Rich Girl",
"Rich Homie Quan",
"Rich The Kid",
"Rich Venom",
"Rich-Mond feat. Victoria Richard",
"Richard Ace & Charles Ross Allstars",
"Richard Beynon",
"Richard Bonnee",
"Richard Cheese",
"Richard Clayderman",
"Richard Dinsdale",
"Richard Durand",
"Richard Earnshaw",
"Richard Elliot",
"Richard Galliano",
"Richard Grey",
"Richard J Aarden",
"Richard Judge",
"Richard Kah & Sylvain Diems feat. L Dalloway's",
"Richard Lowe feat. Karen Kelly",
"Richard Makks",
"Richard Marx",
"Richard Orlinski",
"Richard Ranieri",
"Richard Sanderson",
"Richard Stagg",
"Richard Vission",
"Richard Wagner",
"Richard Willis",
"RichGirl",
"Richie Blackmore",]

r_rus_list_11 = [
"Richie Sambora",
"Richie Sosa",
"Richy B feat. Seya",
"Richy D feat. Alexandra Maksimova",
"Rick Astley",
"Rick Braun",
"Rick Derringer",
"Rick Dyno",
"Rick feat. Marka & Ирина Кайратовна",
"Rick Parfitt",
"Rick Raven",
"Rick Ross",
"Rick Vito",
"Rick Wakeman",
"Rickey F",
"Rickey Teetz feat. Jessie James Wen",
"Ricki-Lee",
"Ricky Blaze",
"Ricky Castelli, LA19, Jack Ross, LDB",
"Ricky Dietz",
"Ricky Dillon",
"Ricky Dobri feat. Axenia",
"Ricky Le Roy",
"Ricky Martin",
"Ricky Mears",
"Ricky Monaco",
"Ricky Nelson",
"Ricky Pedretti",
"Ricky Remedy",
"Ricky Retro",
"Ricky Salerno",
"Rickyxsan",
"Rico & His All Stars",
"Rico Bass feat. Bastian Smilla & Hayley LMJ",
"Rico Bernasconi",
"Rico E.",
"Rico Love",
"Rider & Knight",
"Riders On The Floor feat. Wack-O",
"Ridgeback",
"Rido",
"Ridsa",
"Riff Raff",
"Riggi & Piros",
"Righeira",
"Right Said Fred",
"Rigos",
"Rihanna",
"Rihter",
"Riialto",]

r_rus_list_12 = [
"Riki feat. Reik",
"Rikkaz feat. Hannah Ray",
"Rikki Eugene",
"Riky Noize",
"Riles",
"Rimas",
"Rimini Project feat. Jodz & Jackson",
"Rimk feat. Francisco",
"Rimma (Marble Cake)",
"Rimon",
"Rimonds Pauls",
"Rimsky",
"Rina feat. Matteo",
"Rina Sawayama",
"RinaDeli & Честный",
"Rinat & Susie Johnson",
"Ringo Starr",
"Rini feat. Agung Mango",
"Rino Aqua",
"Rino Cabrera",
"Rino Ticli, Gas Incatasciato feat. El Gringo",
"Rinsler Trvp",
"Rinzen",
"Rio Dela Duna & Arone Clein feat. Sharon May Linn",
"Rio Lorenzo",
"RIOT",
"Riotous",
"Ripbeat, Зараза, Horus, Ка-тет, ATL & Dark Faders",
"Rippa",
"Ripstar & Nyanda feat. Pitbull",
"Risco feat. Dinamiss & Rootman",
"Rise Music",
"Rise To Fall",
"Risha Kova",
"Rishi Rich Project feat. Jay Sean & Juggy D",
"Risk Label",
"Rita & Stupid Goldfish",
"Rita Guerra",
"Rita Mojito feat. Vanko Samar",
"Rita Navarro & Oleg Sevryugin",
"Rita Ora",
"Ritmo",
"Rittz",
"Ritual",
"Rituel",
"Riva Starr feat. Sud Sound System",
"Rival feat. Caravn",
"Rival Fire",
"Rival Mob",
"Rivaz feat. Benny Benassi",]

r_rus_list_13 = [
"Rivendell",
"Rivera feat. Amna & Obie-P",
"Rivero",
"Rivvrs",
"Rixton",
"Riya",
"Riya V",
"Riz",
"RIZUPS",
"Rizzle Kicks",
"Rizzo",
"RJ & Ruskul",
"RJ feat. Pitbull",
"RJ Word & Juan Magan",
"RKCB & Demo Taped",
"RL (Of Next)",
"Rl Grime",
"Rls",
"RMA",
"Rmb",
"RNX",
"Ro James feat. Snoop Dogg",
"Ro-Dion",
"ROA (Rise Of Artificial)",
"RoadNoy",
"Roald Velden",
"Rob (of One Chance)",
"Rob & Chris",
"Rob & Jack",
"Rob & Nino",
"ROB & Алекс Индиго",
"Rob Allen",
"Rob Bailey",
"Rob Black feat. Big2 & Stepherd",
"Rob Costlow",
"Rob D",
"Rob Danzen feat. Thery Randall",
"Rob Gasser feat. Richard Caddock",
"Rob Hayes",
"Rob L & Marc Hill feat. Elaine",
"Rob Mayth",
"Rob Pix",
"Rob Soul",
"Rob Thomas",
"Rob Zombie",
"Robben Ford",
"Robbert Fossen Band",
"Robbie D",
"Robbie Groove",
"Robbie Mendez",]

r_rus_list_14 = [
"Robbie Miraux",
"Robbie Moroder",
"Robbie Neji feat. Benita",
"Robbie Rivera",
"Robbie Robertson",
"Robbie Williams",
"Robby East",
"Robby Ruini Dj & Paul Carpenter feat. Dallas",
"Robby Schulz",
"Robeeo feat. TonyJay",
"Robern Michael",
"Robert Abigail",
"Robert Burian",
"Robert Chacon feat. Robertha Sepulveda",
"Robert Cray",
"Robert Cristian",
"Robert D'",
"Robert Falcon",
"Robert Fest",
"Robert Firth feat. Eva Maria",
"Robert Georgescu & Lara",
"Robert Glasper Experiment",
"Robert Glasper Trio",
"Robert Haig Coxon",
"Robert Hood",
"Robert Kelly",
"Robert Lockwood Jr.",
"Robert M",
"Robert Miles",
"Robert Nickson",
"Robert Palmer",
"Robert Plant",
"Robert Williamson",
"Roberto Bedross",
"Roberto Bellarosa",
"Roberto Bussi",
"Roberto Cacciapaglia",
"Roberto Corso",
"Roberto Kel Torres",
"Roberto Rios",
"Roberto Sansixto, Adrian Cervera feat. David Ros",
"Roberto Sanxisto",
"Roberto Sol",
"Robi & Vir-T feat. Alicia Madison",
"Robien M",
"Robin Aristo",
"Robin Axford",
"Robin Bengtsson",
"Robin DeVille feat. Ivan Garcia",
"Robin Falk",]

r_rus_list_15 = [
"Robin Hagglund feat. Fredrik Berlin",
"Robin Knaak feat. Joseph Feinstein",
"Robin Loxley",
"Robin Novaku",
"Robin Schulz",
"Robin Spielberg",
"Robin Stjernberg",
"Robin Tayger",
"Robin Thicke",
"Robkay feat. David Posor",
"Robo Nation Gravity",
"Robokid, Manila Killa & AOBeats feat. Desktop",
"Robosonic",
"Robot Koch",
"Robotaki & Manila Killa feat. Matthew John Kurz",
"Roby Arduini & Pagany feat. Jenny Cruz",
"Roby Montano",
"Roby Rossini & Panico feat. Steven May",
"Roby T.A.",
"Robyker",
"Robyn & La Bagatelle Magique",
"Robyn & Rye Rye",
"Roccaro Deejay",
"Rocco & Bass-T",
"Rocco & Cc.K feat. Alvin Garrett",
"Rocco Careri & Arturo Macchiavelli feat. Eric King",
"Rocco Hunt",
"Rocco vs. Cc.K",
"Rochelle",
"Rock & Short",
"Rock City",
"Rock Mafia",
"Rock Mafia feat. Lauriana Mae",
"Rock The Sexy",
"Rock-Aro",
"Rockaforte",
"Rockefeller",
"Rocket Da Goon feat. Sean Kingston",
"Rocket Pimp feat. Marie L",
"Rockets",
"Rockie Fresh",
"Rockin & Kuzmin",
"Rockit feat. Maury",
"Rockit Gaming feat. Lindsay Joan",
"Rocko feat. Lil Wayne",
"Rockoleone",
"Rockster feat. Paul Cless",
"Rockstroh",
"Rockwell",
"Rocky Athas",]

r_rus_list_16 = [
"Rocky Dog",
"Rocky Leon",
"Rocky M.",
"Rocky Sharpe & The Replays",
"Rocky Wellstack",
"Rocstrong",
"Rod & Ebba",
"Rod Heros",
"Rod Stewart",
"Rod Stewart feat. DNCE",
"Rod V",
"Rod'OS & Виkа Sky",
"Roddy Ricch",
"Rode",
"Rodg",
"Rodg & Roovel",
"Rodg & Sarah de Warren",
"Rodg feat. Patrick Baker",
"Rodge feat. Sibbyl",
"Rodin & Джиос",
"Rodion Gordin",
"Rodion Suleymanov (Formula 2)",
"Rodionis",
"Rodlund & Hewie",
"Rodolfo Chikilicuatre",
"Rodos",
"Rodrigo Ace & Matt Houston",
"Rodrigo Deem",
"Rodrigo Guzman",
"Rodriguez",
"RoelBeat & Pruchkovsky feat. Vika Grand",
"RoelBeat feat. SevenEver",
"Roger Cicero",
"Roger Daltrey",
"Roger Martin",
"Roger Meno",
"Roger Miller",
"Roger Pontare",
"Roger Sanchez",
"Roger Shah",
"Roger-M",
"Rogerseventytwo",
"Rogich",
"Rogue",
"Roguenethvn & Joshua Francois feat. Blair Lee",
"Rohff",
"Roisin Murphy",
"Roisto",
"Roke DJ & Dionissimo",
"Rokelle feat. Dave Aude",]

r_rus_list_17 = [
"Rokka Animal",
"ROKKU",
"Roklem",
"Roko Blazevic",
"Rola & Megaloh",
"Rola feat. Wanja Janeva, Sidney Frenz & Dimi Rompos",
"Roland Boggio",
"Roland Cedermark",
"Roland Dyens",
"Roleks",
"Roler Sis",
"Rolex & Дима Карташов",
"Rolfiek",
"Roll Deep",
"Rolla Sparks feat. F.Charm",
"Roller Sis feat. Lennox Brown",
"Rollergirl",
"Rollo & King",
"Rolo Green & Kolonie",
"Rolvario",
"Roma Mario feat. Ирина Копаева",
"Roma Nine",
"Roma Singer feat. Artys",
"Romain Baker feat. Samantha S",
"Roman Aloy",
"Roman Blanco & D3epank",
"Roman El Intrumental",
"Roman Frolov feat. SugarMamMas",
"Roman Grigorenko & Mechta Elis",
"Roman Kouder feat. Ana Zimmer",
"Roman Lob",
"Roman Lёza",
"Roman Messer",
"Roman Muller & Foulds",
"Roman Pearce",
"Roman Polonsky",
"Roman Ra",
"Roman Tkachoff",
"Roman Voloznev",
"Romano",
"Romanoff vs. Nikolaev",
"Romanova",
"Romanovskaya",
"Romans",
"Romans feat. Rejjie Snow",
"Romantic Wedding Piano Music Ensemble",
"Romantica",
"Romche & Андрей Нестер",
"Romeo & Julia feat. Sini",
"Romeo Blanco feat. Allan Eshuijs",]

r_rus_list_18 = [
"Romeo Cooper feat. Megane",
"Romeo Cooper ft. Megane",
"Romeo feat. Kapriz",
"Romeo Paradise",
"Romeo Santos",
"Romes",
"Romeya feat. Robin Walltz",
"Romkeee",
"Romm, Alex Believe, Sergei Malinovskiy",
"Rompasso",
"Romy & Hakimakli feat. Destiny Grace",
"Romy feat. Mathew Van Vooght",
"Romy Low",
"Romy Wave feat. Rosenfeld",
"Ron & Юля Паго",
"Ron Adams",
"Ron Allen & One Sky",
"Ron Boots",
"Ron Carroll",
"Ron Costa",
"Ron Korb",
"Ron May",
"Ron Rockwell",
"Ron Van Den Beuken feat. Delta Goodrem",
"Ron-Bon-Beat Project",
"Rona Nishliu",
"Ronaissance & Holly",
"Ronald Jenkees",
"Ronan Keating",
"Ronbuck feat. Nena Yvonne",
"Rondo Veneziano",
"Rondo's Blues Deluxe",
"Rone & John Stanier",
"Roni Size",
"Roniit feat. Trivecta",
"Ronika",
"Ronna Riva",
"Ronny",
"Ronny & Nastika",
"Ronny J feat. Ty Dolla Sign & Rich The Kid",
"Ronny K vs Vasaio feat. Jakub Hubner",
"Ronny Rox feat. Tony T",
"Ronski Speed",
"Rony Seikaly",
"Ronymo",
"Roo Panes",
"Rooftime",
"Rookies & New Hope Club",
"Rookivkurtke (All Native)",
"Room 5",]

r_rus_list_19 = [
"Room Service",
"Room8 feat. The Sound Of Arrows",
"Roomful Of Blues",
"Rooney feat. Teee IAM & Plato",
"Roosevelt",
"Rootkit",
"Rooverb feat. Alan Crown & Alicia Madison",
"Roox feat. Lydia Grace",
"Ropero Jerry",
"RoRo",
"Rory Block",
"Rory Gallagher feat. Kelly Dowell",
"Ros & Rox feat. Der Duck MC",
"Rosa Lopez",
"Rosa y la Pena",
"Rosabel feat. Tamara Wallace",
"Rosalee feat. Snoop Dogg",
"Rosalia",
"Roscoe Dash",
"Roscow",
"Rose Dive",
"Rose Goldd feat. Lil Spacely",
"Rose Jackson feat. Akon & DJ Gutta",
"Rose Royce",
"Rose Villain",
"Roseaux feat. Melissa Laveaux",
"Rosedale",
"Rosegold",
"Roselle",
"Rosemary Clooney",
"Rosenthal",
"Roses feat. Becky Cole",
"Rosette",
"Roshana",
"ROSHE",
"Roshelle",
"Rosie Lowe",
"Ross Cairns",
"Ross Lynch",
"Ross Rayer",
"Rossini",
"Rossinskaya",
"Rostislove feat. Анастасия Кочеткова",
"Rosy",
"Rothchild feat. Ameria",
"Rothwell",
"Rotimi",
"Rotoff и Настя Задорожная",
"Roudeep",
"Rouge feat. In-Grid",]

r_rus_list_20 = [
"Rough Draft",
"Roughmath",
"RoulnDoors feat. Mr. V",
"Roulsen",
"Route 94 feat. Jess Glynne",
"Rowah & Darko",
"Rowald Steyn",
"Rowetta, Placidic Dreamn",
"Roxana Cozma feat. Pacha Man",
"Roxana Dobritoiu",
"Roxana Nemes",
"Roxanna",
"Roxanne",
"Roxeanne Hazes",
"Roxee B",
"Roxen",
"Roxen feat. Suzzan",
"Roxette",
"Roxie",
"Roxiny",
"Roxso",
"Roxville & StaniSlav House",
"Roy Buchanan",
"Roy Hargrove",
"Roy Harper & Jimmy Page",
"Roy Jones Jr",
"Roy Key",
"Roy Knox & Tim Beeren feat. Svniivan",
"Roy Malakian feat. Chris Jones",
"Roy Orbison",
"Roy Rogers",
"Roy Shirley",
"Roy White & Ryssa",
"Roy Woods",
"Royal Azizli",
"Royal Bliss",
"Royal Blood",
"Royal Deluxe",
"Royal DJs",
"Royal Elements & Patricia Vittek",
"Royal Gigolos",
"Royal Guitar Ensemble",
"Royal Hunt",
"Royal MJS",
"Royal Music Paris",
"Royal Scots Dragoon Guards",
"Royal Tailor",
"Royal Twins",
"Royal Zeven",
"Royalbears",]

r_rus_list_21 = [
"Royalston",
"Royce Da 5'9'' feat. Pusha T & Rick Ross",
"Royce Rizzy",
"Royksopp",
"Royle",
"ROYLS",
"Rozalla feat. David Anthony",
"ROZES",
"Rozhden",
"Rozlyne Clarke Feat Unity Power",
"Rozzi Crane",
"RoБи",
"Rriley",
"RRQ feat. Anggara Bintang & Metha Volmax",
"RRS & Darom Dabro (XX FAM)",
"Ru Paul",
"Ru.Hunt",
"Rub!k",
"Ruben Amaya feat. Rhyna Pop",
"Ruben De Ronde",
"Ruben feat. Emma Steinbakken",
"Ruben Haze",
"Ruby & Tony",
"Ruby Empress",
"Ruby feat. Pacha Man",
"Ruby feat. Shift",
"Ruby feat. Uzzi",
"Ruby Francis",
"Ruca feat. Poupie",
"Ruddaz",
"Rude Boy",
"Rudedog feat. Nikki Belle",
"Rudeejay feat. Lili",
"RudeLies",
"Rudenko & Aloe Blacc",
"Rudi-S",
"Rudik",
"Rudimental",
"Rudin feat. AyCrusher",
"Rudolph Mowatt",
"Rudra",
"Rudy & Co.",
"Rudy Currence",
"Rudy Mancuso",
"Rudy Mas & Manu Pleasure feat. Rayko",
"Rudy MC",
"Rudy Rox",]

r_rus_list_22 = [
"Rue Du Soleil",
"Rued & The1 feat. Nastya Flame",
"Ruelle",
"Ruelle feat. Fleurie",
"Ruff Cash",
"Ruff Katz",
"Ruff Loaderz",
"Rufus",
"Rufus & Carlas",
"Rufus Du Sol",
"Rufus Wainwright",
"Ruhde feat. Sunnie Williams",
"RUI",
"Rui Da Silva",
"Rui feat. Sam Ashworth",
"RULADA",
"Rullo & Toscani feat. Cody",
"Ruly Rodriguez",
"Rumbero's",
"Rumors",
"Run Dmc And Jason Nevins",
"Run The Jewels",
"Run With Patience",
"Run-D.M.C. Feat. Fat Joe",
"Runa",
"Runa Ria",
"Runaground",
"Rune RK",
"Runemagick",
"Running Man",
"Running Touch",
"Runstar",
"RuPau feat. Rebecca Romijn & Markaholic",
"RuPaul",
"Rupee & Black Shadow",
"Rupert Pope feat. Giles Palmer",
"Rupf feat. Lokka Vox",
"Rus Lan",
"Rusamo Beats",
"Rush & Hydro & Julian Calor",
"Rush Davis",
"Rush Hour",
"Rushan",
"Ruskey",
"RusKey feat. Женя Отрадная",
"RusKey feat. Марина Черкунова (Total)",
"RusKey feat. Смысловые Галлюцинации и Total",
"RusKey ft. 7Б & Dino Mc47 & Air-T",
"Rusko",
"Rusla-N feat. OneSTAR",]

r_rus_list_23 = [
"Ruslan feat. Lecrae & Chris Cobbins",
"Ruslan Knaub",
"Ruslan Nigmatullin",
"Ruslan Nigmatullin & Интонация (In2Nation)",
"Ruslan Nigmatullin feat. Tiana",
"Ruslan Radriges",
"Ruslan Radriges & Cari",
"Ruslan Radriges & Lucid Blue",
"Ruslan Radriges & Tiff Lacey feat. Neurofunq",
"Ruslan Vox",
"Ruslana",
"RuslanShow",
"Ruslanshow feat. Anna Martins",
"RuslanShow feat. Marina",
"Ruslanshow feat. Marina Pracht",
"RuslanShow feat. ProJect Марина Прахт",
"Russ",
"Russ Coson feat. IamSu",
"Russ feat. BIA",
"Russ feat. Jessie Reyez",
"Russ Landau",
"RuSSan",
"Russell Ray (7Hills)",
"Russell Ray feat. Sergey Kutsuev",
"Russell Simins",
"RuSSeR Project",
"Russian Red",
"Russo",
"Rust Blossom",
"Rustam & Life Elements",
"Rustam Aliev",
"Rusty McCarthy",
"Ruth Anne Cunningham",
"Ruth B.",
"Ruth Lorenzo",
"RuthAnne",
"Ruthie Foster",
"Ruud & Romy Dya",
"Ruumer",
"RUVi",
"Ruxandra Bar",
"Ruxell feat. Robbie Rule",
"Ruxt",
"Ruzman feat. Maria Stuklova",
"RXC",
"Rxnde Akozta",
"Ry Cooder",
"RY X",
"Ryan & Radu",
"Ryan and Radu",]

r_rus_list_24 = [
"Ryan Blyth",
"Ryan Cabrera",
"Ryan Dolan",
"Ryan Exley feat. Laura Hickli",
"Ryan Finley feat. Timon",
"Ryan Hirt",
"Ryan Housewell feat. Alina Renae",
"Ryan K",
"Ryan Leslie feat. Jasmine V",
"Ryan Moe",
"Ryan O'Shaughnessy",
"Ryan Reid",
"Ryan Riback",
"Ryan Shepherd feat. Heather Janssen",
"Ryan Star",
"Ryan Street",
"Ryan TedderRyan Thistlebeck feat. Kaytee",
"RyanOtter feat. Mark Yusim",
"Rycha",
"RYD",
"Ryden feat. Richie Loop",
"Ryder",
"Rye Rye",
"Rykka",
"Ryn Weaver",
"Rynar Glow",
"Rynx",
"Ryos",
"Ryos, Wasback, & Teseo feat. Karra",
"Rytmeklubben",
"Rytmica",
"Ryuichi Sakamoto",
"Ryuken feat. Klaudia",
"RYZE",
"RZMRY",
]

litera = SoundSymbol.objects.get(name="R")

count = 0

for tag in r_rus_list_11:
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
