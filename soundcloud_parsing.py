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

o_rus_list_1 = [
"O-Juice",
"O-M feat. Flo Rida",
"O-Mind",
"O-Town",
"O-Zone",
"O.A.R.",
"O.B feat. B.U",
"O.G. Squad",
"O.T. Genasis",
"O.Torvald",
"O'G3NE",
"O'Gенри",
"O'Key",
"O'Neill & Imanbek",
"O'neill Hudson",
"O2 & Neja",
"O55",
"Oak Glen",
"Oana",
"OANA & Reykon",
"Oana feat. Mackie",
"Oana Matache feat. Fedarro",
"Oana Radu",
"Oana Tache",
"Oasis",
"Obe 1 Kanobe",
"Obeson",
"Obie Trice",
"Objet De Plaisir",
"Obladaet feat. Feduk",
"Oblico Morale",
"Observer Drift",
"Obsession",
"Obsidian Radio feat. Jan Johnston",
"Ocean Blue",
"Ocean drive",
"Ocean Jet",
"Ocean View Suite",
"Ocean Wings",
"Ocean Wisdom feat. Dizzee Rascal",
"Oceana",
"Oceanlab",
"Oceanlight feat. Pitbull & Brigitte Balo",
"Oceans",
"Oceans Divide",
"Oceans Of Sadness",
"Oceans To Athena",
"Octavian",
"Odd Collection",
"Odd Mob feat. Starley",]

o_rus_list_2 = [
"Odea feat. Kevin Flum",
"ODEE",
"ODESZA",
"Odette Telleria",
"Odhexan",
"Odissey",
"Odyssey",
"Oen Bearen",
"Of Mice & Men",
"Of Monsters And Men",
"Of Verona",
"OFB",
"Ofelia K",
"Ofenbach",
"Off Beat Boy feat. Stevan P.",
"Off Bloom",
"Offaiah",
"Offbeat Orchestra",
"Offer Nissim",
"Offplan feat. Kate Wild",
"Offset & Metro Boomin",
"Offset feat. Cardi B",
"Offset feat. Gucci Mane",
"Offset feat. Travis Scott & 21 Savage",
"Offshore Wind feat. Rina Light",
"OFM feat. Tinashe",
"OG Buda feat. Feduk & Платина & Obladaet",
"OG Buda feat. Lil Krystalll",
"OG Maco feat. Wiz Khalifa",
"Oge feat. Josephine",
"Oge feat. Nicko",
"Oge feat. Xristina Salti",
"Ogulcan Balgun & Dmr",
"Oh Honey",
"Oh Land",
"Oh My!",
"Oh Tebins",
"Oh Wonder",
"Oh, Be Clever",
"Ohana Lekio",
"Ohlayindigo",
"Ohmega Watts",
"Ohsorry",
"Ojax",
"Ojay Ruger",
"OK BAND",
"OK Corral",
"OK Go",
"Okay Funky, Fufu Afreaq, Camilo & Grande",
"OKEY & LeaH",]

o_rus_list_3 = [
"Oklou",
"Okrim feat. Monty",
"Oks",
"Oksana Kosova",
"Oksi",
"Oksikus",
"Ola Salo",
"Olafur Arnalds",
"Olav Basoski",
"Old Red Skin",
"Old Screw x Ana Criado",
"Old Wave",
"Oldschool Boys",
"Oldskool",
"Ole Van Dansk",
"Oleg Blaze",
"Oleg Brant & Dj Kovtun",
"Oleg Byonic",
"Oleg Espo & Fedor Smirnoff feat. Tom Tyler",
"Oleg Kai",
"Oleg Romashkin & Fairy Tale",
"Olesia Bond & Dim2Play",
"Oleska & Otter Berry",
"Olesya Bi",
"Olexesh feat. A Boogie Wit Da Hoodie",
"Olexesh feat. Calo",
"Oleynik",
"Olga Dolgova",
"Olga Gumen feat. Di Land",
"Olga Lee feat. Qulinez",
"Olga Lucky & Arthur Project",
"Olga Maximova",
"Olga Schulteis",
"Oli Brown",
"Oli Geir feat. Aic",
"Oli Klok",
"Olia Tira",
"Olin Batista",
"Olisha",
"Oliva",
"Oliva & Dorota",
"Olive B",
"Olive Musique",
"Oliver Anders",
"Oliver Cattley",
"Oliver feat. Chromeo",
"Oliver feat. MNDR",
"Oliver feat. Scott Mellis",
"Oliver Gross",
"Oliver Heldens",]

o_rus_list_4 = [
"Oliver Huntemann",
"Oliver Ingrosso & Adam Avant",
"Oliver Koletzki",
"Oliver Kurt",
"Oliver Moldan feat. Jasmine Ash",
"Oliver Nelson",
"Oliver Scheffner",
"Oliver Schmitz & Micah Sherman feat. Deniz Reno",
"Oliver Shanti",
"Oliver Smith",
"Oliver Tree",
"Oliver Twizt",
"Oliver Wimmer",
"Olivera",
"Oliveray",
"Oliverse feat. Joegarratt",
"Olivia Addams",
"Olivia Eliasson",
"Olivia feat. Mavado",
"Olivia feat. Sean Kingston",
"Olivia feat. Tank",
"Olivia Garcia",
"Olivia Holt",
"Olivia Lewis",
"Olivia Nelson",
"Olivia Noelle feat. Kid Ink",
"Olivia O'Brien",
"Olivia Penalva",
"Olivia Rodrigo",
"Olivia Sebastianelli",
"Olivier Dion",
"Olivio",
"Olivver The Kid",
"Olla",
"Olli's Club",
"Ollie Crowe & Rich James feat. NK",
"Olly Anna",
"Olly James",
"Olly Murs",
"Olsen Brothers",
"Olstan Van Guard",
"Olta Boka",
"Olven (ex. NTL)",
"Olvidate! & Marcos Da Costa",
"OLWIK & Raie feat. Felix Abebe",
"OLWIK & Willemijn May",
"OLyA X",
"Omar & The Howlers",
"Omar Akram",
"Omar And The Howlers",]

o_rus_list_5 = [
"Omar Diaz & Bigtopo",
"Omar feat. Letty",
"Omar J",
"Omar Kent Dykes & Jimmie Vaughan",
"Omar Naber",
"Omar Wilson feat. DMX",
"Omarion",
"Omarion & Jeremih",
"Omega",
"Omeloni",
"Omen feat. Jason Derulo",
"Omer Adam & Netta",
"Omer Balik feat. Glee",
"Omer Bukulmezoglu",
"Omi",
"Omid & Thomas Anders",
"Ominar",
"Ommieh",
"Omnia",
"Omnia Tria",
"Omnikid",
"Omnimar",
"Omr & Adry",
"Omut",
"Omvr",
"On I Ona",
"On June",
"On T.V.",
"On-Line",
"On-The-Go",
"On-X",
"Onderkoffer & SWACQ",
"Ondina",
"One Beat",
"One Bit & Louisa",
"One Bit",
"One Chance",
"One Direction",
"One Dj Project",
"One Last Look",
"One Less Reason",
"One Love",
"One Of Six",
"One Ok Rock",
"One Pale Ghost",
"One Point Oh!",
"One Republic",
"One Sky",
"One T1me feat. Илага",
"One Two Eight",]

o_rus_list_6 = [
"One Way",
"One-T",
"One23",
"OneBeat",
"OneBYone feat. SevenEver",
"Onederful",
"Onegin MC",
"OneInThe4Rest feat. Chris Brown",
"Onejay",
"Onel & Исаи",
"Onelight",
"OneRepublic",
"OneSTAR",
"Onika",
"Onino",
"Onlife",
"Online",
"Only Girl",
"Onny",
"Ontune & Indecent Noise",
"ONUKA",
"Onur Aktemur",
"Onur Betin feat. Asena",
"Onur Dincel",
"Onur Kaan",
"Onur Ormen",
"Onurcan Guneyin",
"Onyx",
"Ooberfuse",
"Ookay",
"Oomph!",
"OOVEE & Flatdisk feat. Rhett Fisher",
"OOX",
"Opasnie DJs",
"Open Kids",
"Open Mike Eagle",
"Openside",
"Opia",
"Opium",
"Opium Project",
"Optical & BTK",
"Optical 2",
"Optimum feat. Brianna",
"Opus",
"OQJAV",
"Ora The Molecule",
"Oraine",
"Orange County & DJ Vitality",
"Orange Goblin",
"Orano & Karen Elliot",]

o_rus_list_7 = [
"Oraventus feat. Irem",
"Orbel feat. Silva Hakobyan",
"Orbitell",
"Orelsan feat. Stromae",
"Oren Hofman feat. Alina Renae",
"Organic Light",
"Orhan Aydin",
"Ori Uplift",
"Original Sin",
"ORION & Cammie Robinson",
"Oriska feat. Keenan Cahill & Doremi Fly",
"Orjan Nilsen",
"Orkestrated, Fries & Shine feat. Big Nab",
"Orkid",
"Orkidea",
"Orl1x",
"Orla Feeney feat. Deirdre McLaughlin",
"Orla Gartland",
"Orlando",
"Orlove",
"Orphanage of Sadness",
"Orphyd",
"Ortega & Tamez",
"Ortega, Itay Kalderon, Maya Simantov",
"Orvi feat. Alla Kushnir",
"Oryane feat. Sean Paul",
"Orymus",
"Oryon",
"Osaka",
"Osaka & Brianna",
"Osaka & Optimum feat. Brianna",
"Oscar & Deon",
"Oscar & The Wolf",
"Oscar Barros",
"Oscar Benton",
"Oscar Enestad",
"Oscar L & Coqui Sеlеction",
"Oscar Salguero",
"Oscar Scheller & Lily Allen",
"Oscar Stembridge",
"Oscar Wylde",
"Oscar Yestera",
"Oscar Zia",
"Osen & Baha, Togglehead feat. Jonny Rose",
"OSF",
"Oshy feat. Ron Browz",
"Oskar (Fraktal)",
"Oskar Broken",
"Oskar Schuster",
"Oski & Hydraulix feat. Macntaj",]

o_rus_list_8 = [
"Osman Altun",
"Osmani Garcia",
"OSQAR",
"Osrin feat. Hilda",
"Ossie feat. Raphaella",
"Ost & Meyer",
"Ost The Exorcist",
"Ost Up",
"Ost Up (Остап)",
"Ost1n",
"Ostblockschlampen feat. Abaz & Talina Rae",
"Ostrova",
"Ostrovskaya",
"Other",
"Other feat. Brandon Banks",
"Otherview",
"Otiliа",
"Otis Redding",
"Otis Rush",
"Otnicka",
"Oto Nemsadze",
"OTR feat. Panama",
"OTR feat. Shallou",
"Otrix",
"Otros Aires",
"Ott Lepland",
"Ottawan",
"Ottmar Liebert",
"Otto Hype & Diamond",
"Otto Knows",
"Otto Le Blanc",
"Otto Orlandi",
"Our Last Night",
"Our Last Night feat. Baha Men",
"Our Psych",
"Our Stolen Theory",
"Our Vintage Film",
"Our Waking Hour",
"Out Of Blackout",
"Out Of Sound & Rakan",
"Out Of Space",
"Outasight",
"Outfade",
"Outffit",
"Outkast",
"Outlandish & David Jay",
"OUTLYA",
"Outr3ach & J-Marin feat. Kaitlin Grace",
"Outsiders and Amanda Wilson",
"Outwork",]

o_rus_list_9 = [
"Ov Psychic Youth",
"OV7",
"Ova Sky",
"Over Easy & Luma",
"Over The Rhine",
"Overdijk & Numf feat. Drew Darcy",
"Overkill",
"Overlook",
"Overloque",
"Oversea",
"Oversight",
"Oversoul & Gramma Funk",
"Ovi feat. Mike Raw",
"Ovidiu Anton",
"Ovion & Sam Void",
"Ovylarock",
"Oweek",
"Owen Breeze & Manuel 2Santos feat. Mercy Grey",
"Owen Ear",
"Owen Gray",
"Owen Replay feat. Micky J White",
"Owen Star feat. Orange County",
"Owen Westlake",
"Owiny Sigoma Band",
"Owl City",
"Owls",
"Ownglow",
"OWS feat. Pusha T",
"Oxana Yu",
"OxFord (Ox4D)",
"Oxia",
"Oxo",
"Oxxid feat. Brosste Moor",
"Oxxxymiron",
"Oxy feat. JD Wood",
"Oxyg3n feat. R3x",
"Oxygen",
"Oxygene",
"Oyinda",
"Oyku & Berk Gurman",
"Oysten Sevag",
"Oza & T4L",
"Ozan Akсiсek feat. Ezgi Arikan",
"Ozan Dede & Justeen",
"Ozan Dogulu feat. Hera",
"Ozan Harc",
"Ozlig",
"Ozomatli",
"Ozuna",
"Ozuut",
"Ozzie London & SolarTrak",
"Ozzo DJ",
"Ozzy Osbourne",

]

litera = SoundSymbol.objects.get(name="O")

count = 0

for tag in o_rus_list_7:
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
