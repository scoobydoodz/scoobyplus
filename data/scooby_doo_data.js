// data/scooby_doo_data.js

// 🚨 ATENÇÃO: SUBSTITUA PELA SUA CHAVE API REAL DO TMDB
const TMDB_API_KEY = "9581026ae4a76aa62cd93877da2f937e".trim(); 
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"; 
const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"; 

// Estrutura de Categorias estilo Netflix/Max
const CONTENT_CATEGORIES = {
    "series": {
        title: "Séries Animadas",
        items: {
            // ID 926: Scooby-Doo, Cadê Você?
            "926": {
                short_id: "scooby_original",
                release_year: 1969,
                dailymotion_videos:{
                    "1_1": "k7tmP4QzuF5YFTCLPFE",
                    "1_2": "k7nZuj4eQt2yFxCLPHe",
                    "1_3": "k3rTkJd0G6Nl8GCLPJ2",
                    "1_4": "k5Rx9ivC5BdAPRCLPKi",
                    "1_5": "k6sJwij1cjNH1hCLPLC",
                    "1_6": "k2t8kzpHNKi6C3CLPNq",
                    "1_7": "k5vWDS8PouvED4CLPOA",
                    "1_8": "k2jqh4AhlUViGMCLPPY",
                    "1_9": "k2O8cxHkbnzV0FCLPRA",
                    "1_10": "k1nmRk3TvrOxDFCLPU2",
                    "1_11": "k3gwqozDl1GM62CLPVS",
                    "1_12": "k358Fr82RaVVpNCMd1e",
                    "1_13": "k2khAdw5ca1wgdCMd1Y",
                    "1_14": "k2JOORoxnAXPE4CMfx6",
                    "1_15": "k3MnNdxuRMW4AqCMfz4",
                    "1_16": "k5sPuUtOb8xn4YCMfAQ",
                    "1_17": "k5icOd5g3E5E4ACMfDE",
                    "2_1": "k10IQmDFexnYTzCMfNC",
                    "2_2": "k2hIfqeeXboDqFCMfTq",
                    "2_3": "k3vKHgvwndlJhbCMfYi",
                    "2_4": "kkZfdiHxdOEfomCMfZI",
                    "2_5": "k600q95zFY0EVvCMg20",
                    "2_6": "ksUahDRHj1giz4CMg4G",
                    "2_7": "k1BL3AWlfwnz8HCMg6K",
                    "2_8": "k75STn62620N9ACMg7W"
                }
            },
            // ID para Os Novos Filmes do Scooby-Doo (1972)
            "1068": {
                short_id: "novos_filmes_scooby",
                release_year: 1972,
                dailymotion_videos: {
                    "1_1": "kPFFdxLOxktYohCFSMI",
                    "1_2": "k6SpNRtLmfriJ3CFSV0",
                    "1_3": "k2MlTD60WODOZ5CTons",
                    "1_4": "k5prtvrJ9S7lweCTor4",
                    "1_5": "k4MjVDFvX49lMlCTou6",
                    "1_6": "k4CpbEWZs5y0IOCTowI",
                    "1_7": "k5MjtinFieOAyNCToB0",
                    "1_8": "k6sBowSGPCwEFaCToDA",
                    "1_9": "k2ZniipmFkbES9CToG8",
                    "1_10": "k4gOcGhsM1jbfRCToIK",
                    "1_11": "k4ZBy88DsBrQrdCToLo",
                    "1_12": "k5gd2BoAMn7R47CToNO",
                    "1_13": "k4CKjsDeidah3PCToR0",
                    "1_14": "k3SLPtHEUBAn4FCToTm",
                    "1_15": "k3BGBYhBE5WLwjCToXC",
                    "1_16": "k3EL1iFvTHRH9iCTp0m",
                    "2_1": "k7rtoWqvQhtlDSCTIH0",
                    "2_2": "k71PuNuMJojgrgCTIKQ",
                    "2_3": "k4fX0G6On3imdtCTIOG",
                    "2_4": "k427OKgpUT0NzFCTIQU",
                    "2_5": "k4IqXSFTdwXpdkCTIUe",
                    "2_6": "k307VW2PESftGhCTIWM",
                    "2_7": "k5o3OgPhAqKGnACTJ08",
                    "2_8": "k3zLbAFOsMdua2CTJ2i"
                }
            },
            // O Show do Scooby-Doo (1976)
            "293400": {
                short_id: "scooby_show",
                release_year: 1976,
                dailymotion_videos: {
                    "1_1": "k25gA8LQHyo7LlCGA36",
                    "1_2": "k2N64agvHQUJkKCN2Tq",
                    "1_3": "k3DK0C4XKxxAqNCN2UW",
                    "1_4": "k31e7itZQXCG6mCN2Wy",
                    "1_5": "k7i3F3GqUbuoNQCN2YO",
                    "1_6": "kvjWvGf17vEPwUCN36e",
                    "1_7": "k88Qo5L7uMuo4tCN39g",
                    "1_8": "k5seI753cbeQwECN3bo",
                    "1_9": "k62j5zE4jjWmgxCN3dM",
                    "1_10": "k6GJsoLo1dBAxGCN3ge",
                    "1_11": "k2iQuJ3wxQmumBCN3Ua",
                    "1_12": "k447F49EwCZdZuCN3Yk",
                    "1_13": "k3i2av3mr7p4o1CN45K",
                    "1_14": "k49o2ncfTPEDGgCN4b6",
                    "1_15": "k3EUkeaYwlLT7yCN4hq",
                    "1_16": "k6EqJnaflbNPHyCN4nM",
                    "2_1": "k1lZX82FMQXU2vCNwFo",
                    "2_2": "k27AuAtTJ5jHQfCNwGG",
                    "2_3": "k2RBgwZJQ7Pw77CNwKm",
                    "2_4": "k4espiLXmUW9OmCNwNS",
                    "2_5": "kKk64Y265OHjbvCNwQA",
                    "2_6": "kYRMSDTghSFKcUCNwTA",
                    "2_7": "k54w7p5PsNKbmlDDcey",
                    "2_8": "k2L5PGTDB41mDMDDchK",
                    "3_1": "k6hIvSHwRlJgOOCNx1Q",
                    "3_2": "k2pzClGkM2upQWCNx4Y",
                    "3_3": "k6Rr1tvUclmCQrCNx9c",
                    "3_4": "k2tdv79epkPAvXCNxc8",
                    "3_5": "k3pbNvoIztDZdlCNxfy",
                    "3_6": "kvmblN111tq7DWCNxiC",
                    "3_7": "k6x4SU5Tl2um2gCNU9I",
                    "3_8": "k72z0W9tzq2HLyCNUdi",
                    "3_9": "k7H2ERRcSFVvVrCNUhk",
                    "3_10": "k3TwBcpIYPvvflCNUly",
                    "3_11": "k3miRG6eCd3tDjCNUpW",
                    "3_12": "k6No1ZTsHwXq2xCNUts",
                    "3_13": "k591OfHxonxZuVCNUz0",
                    "3_14": "k11KzLjrOQbEi0CNUBQ",
                    "3_15": "k2UDc0yLaBMsKOCNUF6",
                    "3_16": "k67sEXCPFxB4RvCNUHK"
                }
            },
            // Os Ho-Ho-Límpicos (1977)
            "1072": {
                short_id: "ho_ho_limpicos",
                release_year: 1977,
                dailymotion_videos: {
                    "1_1": "k1I2JkCyccoOdXD6eQG",
                    "1_2": "k3MCl3CKPOy32pD6eS2",
                    "1_3": "kjtbvxm6imuSDJD6eUi",
                    "1_4": "k6RxYARlz2xA3TD6eVG",
                    "1_5": "k6PWaiefUwNZNuD6eXo",
                    "1_6": "k64q0511IhHdVeD6eZm",
                    "1_7": "k6iHCDuXxWK8x3D6f0K",
                    "1_8": "k7tCh36hkZzZdgD6f26",
                    "1_9": "k123Gh5xVRBEikD6f4k",
                    "1_10": "k3TOgXcfrP8301D6f60",
                    "1_11": "k3DY2eoGrobOMhD6f7m",
                    "1_12": "k65z7RhHwuvwjyD6fae",
                    "1_13": "k3GJTkr475PEJaD6fc2",
                    "1_14": "k1Hld8oe2xpndnD6fd4",
                    "1_15": "kCMeXgWZ72d7ChD6G4y",
                    "1_16": "k3t8qEWmQtrcztD6G78",
                    "2_1": "k2e9ruu2YPvhUkD6G9Q",
                    "2_2": "k6UdXW1jgJyI2LD6GdY",
                    "2_3": "k3XXsG4P8LREDZD6Ghc",
                    "2_4": "k6TsO6uXfttiOmD6GjA",
                    "2_5": "kjr9lEHV0yKPESD6GpQ",
                    "2_6": "k37F7pc71hpuuED6GsS",
                    "2_7": "kHoo8gsezlzgcuD6GwG",
                    "2_8": "k7Bqq5vjHmSYy8D6Gzg"
                }
            },
            // Scooby-Doo e Scooby-Loo (1979)
            "6005": {
                short_id: "scooby_loo",
                release_year: 1979,
                dailymotion_videos: {
                    "1_1": "k6IEnQAjSry4AFCGo6A",
                    "1_2": "k7n6DngDuM29EMCOBA6",
                    "1_3": "k2GwNrgGuhuuEpCOBCc",
                    "1_4": "k786vrHxJp6ozkCOBDK",
                    "1_5": "k27FK8pYrJBh3CCOBF4",
                    "1_6": "k1RHQJW4NRywUeCOBGY",
                    "1_7": "k54BGj9KK0k0O1COBI0",
                    "1_8": "k16g4lIauzNIbHCOBJo",
                    "1_9": "k6kbr8HdJOyXSECOBMG",
                    "1_10": "k22vsEHh401qkcCOBS2",
                    "1_11": "k6OqZYVx7DVmzOCOBUA",
                    "1_12": "k2OU7TPJdyteBLCOBWe",
                    "1_13": "k4KZEKoyZN5JVNCOBXG",
                    "1_14": "k7oyiqeUnfbMjDCOBZC",
                    "1_15": "k58DVzDtJMOwLoCOC0C",
                    "1_16": "k2vSYx19D1nwT8CP5ku"
                }
            },
            // Scooby-Doo e Salsicha-Doo (1980)
            "1071": {
                short_id: "scooby_salsicha",
                release_year: 1980,
                dailymotion_videos: {
                    "1_1": "k3A4B5C6D7E8F9G0H1I",
                    "1_2": "k2J3K4L5M6N7O8P9Q0R",
                    "1_3": "k1S2T3U4V5W6X7Y8Z9A",
                    "1_4": "k0B1C2D3E4F5G6H7I8J",
                    "1_5": "k9K0L1M2N3O4P5Q6R7S",
                    "1_6": "k8T9U0V1W2X3Y4Z5A6B",
                    "1_7": "k7C8D9E0F1G2H3I4J5K",
                    "1_8": "k6L7M8N9O0P1Q2R3S4T"
                }
            },
            // O Novo Show do Scooby-Doo e Scooby-Loo (1983)
            "novo_show_scooby_loo": {
                short_id: "novo_show_scooby_loo",
                release_year: 1983,
                dailymotion_videos: {
                    "1_1": "k2qsE1nunt1nsGCWLbI",
                    "1_2": "k4zaZcq89OzdezCWLco",
                    "1_3": "k4OglgPJHcPi0mCWLdS",
                    "1_4": "k3GaSYXS95jQ4uCWLfa",
                    "1_5": "k1cKiBIDHplFjkCWLge",
                    "1_6": "k3cTI0Y2f2YnG6CWLkg",
                    "1_7": "k1NrE0gxnNaJY4CWLne",
                    "1_8": "k4JpDSLFwnRZovCWLpS",
                    "1_9": "k53rahMXTCrdluCWLtE",
                    "1_10": "kPnP4HTRhIUMzTCWLxA",
                    "1_11": "kVBwp9Rvuk1ELXCWLAq",
                    "1_12": "kdB1WvOF2t53UfCWLCc",
                    "1_13": "k3TDokIgeX54V1CWLEG",
                    "1_14": "k63LSD3JqwdJgcCWLGU",
                    "1_15": "k7lZpuycxIlRqSCXhpe",
                    "1_16": "kCURNFd7kYDEOwCXhwW",
                    "1_17": "k23SYKPkhxtiZzCXhAo",
                    "1_18": "k1t4c7kifBAeEGCXhHy",
                    "1_19": "k6LVeAMZCOL67nCXhHy",
                    "1_20": "k7Est86K81RDyZCXhM6",
                    "1_21": "k2jxf9MFwN2y3XCXhTE",
                    "1_22": "k6oixH7XH6XTd6CXhXy",
                    "1_23": "kEolaiWySSKd6RCXi3a",
                    "1_24": "k1BT329xxr3xVPCXi5Q",
                    "1_25": "k6qmukooRPVgatCXica",
                    "1_26": "k1H7PRTNwbN4FmCXifs"
                }
            },
            // Os Novos Mistérios do Scooby-Doo (1984)
            "64016": {
                short_id: "novos_misterios_scooby",
                release_year: 1984,
                dailymotion_videos: {
                    "1_1": "k4uCgDYheCKcOzDPhbs",
                    "1_2": "k4cagenx7V9FaLDP0Mo",
                    "1_3": "k5XzFfGZt6mD1eDP0Na",
                    "1_4": "k1TUvW7IaliEeTDP0RS",
                    "1_5": "kmgP55obbEGUYgDP0RU",
                    "1_6": "k2zMi3kUKdZKOBDP0RW",
                    "1_7": "knqdGgwagDhxzsDP0RY",
                    "1_8": "k2pkaTXElmY2mUDP0RQ",
                    "1_9": "k1JUqZ3QKhvuTLDP0S0",
                    "1_10": "k7FqLoQoxIE0sBDP0S2",
                    "1_11": "k1Motgj9JPI5wjDP0S4",
                    "1_12": "k7n68DxnzKVOJODP0S8",
                    "1_13": "kdqW6GkY7W5o3uDP0S6"
                }
            },
            // Os 13 Fantasmas do Scooby-Doo (1985)
            "1069": {
                short_id: "scooby_13_fantasmas",
                release_year: 1985,
                episodes: {
                    "1_1": { title: "Para Todos os Fantasmas que Amei Antes"},
                    "1_2": { title: "Aquela Noite Quando os Fantasmas Saíram"},
                    "1_3": { title: "O Fantasma de Hambridge"},
                    "1_4": { title: "Quando Você Deseja um Fantasma"},
                    "1_5": { title: "Assombrado pelo Passado"},
                    "1_6": { title: "Navio Fantasma"},
                    "1_7": { title: "Eu Deixei Meu Coração em um Castelo Assombrado"},
                    "1_8": { title: "O Fantasma de Moonscar Island"},
                    "1_9": { title: "Assombração no Espaço"},
                    "1_10": { title: "O Fantasma de Ferro"},
                    "1_11": { title: "O Fantasma de Wickles"},
                    "1_12": { title: "Assombração no Circo"},
                    "1_13": { title: "Assombração Final" }
                },
                dailymotion_videos: {
                    "1_1": "k1HWd6fkMssjemCGzvu",
                    "1_2": "k2aEkKfXgB2Q0HCP5m2",
                    "1_3": "k6BXmwaozjvr49CP5nA",
                    "1_4": "k64LEwdBG70m8gCP5qq",
                    "1_5": "k2XJrZXKPN18fjCP5u2",
                    "1_6": "k6FmyLG7GxWeCNCP5wm",
                    "1_7": "k5eSgnlyW4RPLeCP5yC",
                    "1_8": "kSokBJlVCgk2kiCP5A8",
                    "1_9": "k6uxBB4jXc1O51CP5C0",
                    "1_10": "k28SJoA8ssfddSCP5Em",
                    "1_11": "k5Ur0JS7UBJSZjCP5GM",
                    "1_12": "k56s9dnkxnXI1HCP5Iu",
                    "1_13": "k7tcUtWj9doc9vCP5LC"
                }
            },
            // Um Filhote Chamado Scooby-Doo (1988)
            "418": {
                short_id: "scooby_filhote",
                release_year: 1988,
                dailymotion_videos: {
                    "1_1": "kaN72qKU65txVJCKPC8",
                    "1_2": "k6V5G6CL7Pl4HuCKPEa",
                    "1_3": "k6ZIH7zx0i3SiyCKPFk",
                    "1_4": "kTUdiEQSzfRTXgCL9oK",
                    "1_5": "k7ayvnv9DvovU4CL9pu",
                    "1_6": "kkxrSx3AMKaPVuCL9qu",
                    "1_7": "k5UmYJyarzAJvfCL9qU",
                    "1_8": "k5HOqoWwKXLKz7CL9rS",
                    "1_9": "k37O86PXOcgcSJCL9se",
                    "1_10": "k3XrRyT4gY26ckCL9t4",
                    "1_11": "k6FqIWl9kEFPVhCL9tq",
                    "1_12": "k2Xy0oPh4wSM8uCL9uc",
                    "1_13": "k1lqlXm2brfdgECL9uG",
                    "2_1": "k2SWXGJf4gZeJTCL9vC",
                    "2_2": "k5BRCfLPPWOFwYCL9wo",
                    "2_3": "k5QupbzmKdTSYHCL9xe",
                    "2_4": "kM8vIUb3xHEsDmCL9xG",
                    "2_5": "k4zUOGfBjlpxDRCLrSi",
                    "2_6": "k2JaS9A5ee2dbbCLtAw",
                    "2_7": "k62zMnf5mPcTgnCLtBU",
                    "2_8": "k6Vw5okpOLvtUxCLtCu",
                    "3_1": "k3MqbeRH9vztYvCLtDM",
                    "3_2": "k3LPSCgtUHWObXCLtE4",
                    "3_3": "k3hLJza2fiEIcMCLtEE",
                    "4_1": "k14Gw0yYojWh4QCLtFy",
                    "4_2": "k4FfZt9hTwUxBgCLtGw",
                    "4_3": "kYPf64jLlDUQu8CLtHc"
                }
            },
            // O Que Há de Novo, Scooby-Doo? (2002)
            "652": {
                short_id: "que_ha_de_novo_scooby",
                release_year: 2002,
                dailymotion_videos: {
                    "1_1": "k7c4sP9kDyLAXRCFTaQ",
                    "1_2": "k7I8zx1iKick6ACR6de",
                    "1_3": "k4Jaecef5IxpV5CR6eW",
                    "1_4": "k17aRmKUE6Mm7zCRnXa",
                    "1_5": "k56FitSc2QzDxLCRnYo",
                    "1_6": "k3G8cO7ulSt2KnCRnZq",
                    "1_7": "k8O4rnCW1mLnl6CRo0G",
                    "1_8": "k6INwJzuhLFXCnCRo2m",
                    "1_9": "k6WRDUZJCC8XOKCRo40",
                    "1_10": "k274iyWeqpQnr0CRo4U",
                    "1_11": "k4tH2f2sCvcaQICRo6g",
                    "1_12": "k64sM4IVzhBdTeCRo7q",
                    "1_13": "k2xjlKM21DZCP8CRo8E",
                    "1_14": "k6uU8CYZFnqa7lCRoa6",
                    "2_1": "k2fd2HcCyO4Kg6CRNN8",
                    "2_2": "k7gOlu0GeKbNUNCRNPi",
                    "2_3": "k7B5JwNVHtxNX6CRNQg",
                    "2_4": "kMorVU0CyAILdACRNTM",
                    "2_5": "gdrive:1CR4v0YGG1Z4Ovwj9MSLe4TajYmubOoyZ",
                    "2_6": "k6KzpF88RKZ0zlCRNX4",
                    "2_7": "k3bR2Xtixz0UbjCRNYo",
                    "2_8": "k2ZoR3JsGTIrkqCRO0i",
                    "2_9": "k4ak6dCVZ45TNrCRO1k",
                    "2_10": "gdrive:1HdacVDRhyxHY-su3b7WVnt1Z0hHvMePl",
                    "2_11": "k2GrmHWQBXhni3CRO9K",
                    "2_12": "k6jPvRLPK3SHLNCROce",
                    "2_13": "k3MHtxrucDpNnwCXNAG",
                    "2_14": "k4liRUB7ghNAgFCROfa",
                    "3_1": "k3EpUPeBPEeYrBCSg4g",
                    "3_2": "k7rLQic0H64tjzCSg66",
                    "3_3": "k6BtmMY9XrmEQkCSgi4",
                    "3_4": "gdrive:1DDgDNYrRFVRZYCxy_x76AZgPpKMG_3xT",
                    "3_5": "k3Ft7TVB5s2mFZCSgm4",
                    "3_6": "k7qeYwK3mq1IRhCSgSS",
                    "3_7": "k1meMgUKg7WCMECSgUg",
                    "3_8": "k5lPZHuxqm8v8rCSgX0",
                    "3_9": "k5Grq1cTAN0VuwCSgZs",
                    "3_10": "k5LaJIgIDxMzpCCSh1a",
                    "3_11": "k5aOWx8nhmEAN8CSh2q",
                    "3_12": "k18dQQv6zvnhluCSh4i",
                    "3_13": "k4mDVi7JnsmT1JCSh5K",
                    "3_14": "k6tX4icihzIYyzCSGDW"
                }
            },
            // Salsicha e Scooby: Atrás das Pistas (2006)
            "593": {
                short_id: "salsicha_scooby_pistas",
                release_year: 2006,
                dailymotion_videos: {
                    "1_1": "k15WZw03uCmCbTCGoee",
                    "1_2": "k8udENWqikxO35CW2KG",
                    "1_3": "k5Ssn4kfITvSIaCW2L0",
                    "1_4": "k3JRdQfMrJGalgCW2M4",
                    "1_5": "k2EhQQRs1TmuMPCW2N0",
                    "1_6": "k3vgSrCal2QbUOCW2Nw",
                    "1_7": "k4YfYJcV9U7tp8CW2Oo",
                    "1_8": "kP82eSs7UT5jJrCW2PA",
                    "1_9": "k70JKuXu0uugzaCW2Qi",
                    "1_10": "k72FQzSqVDbjH9CW2QW",
                    "1_11": "k5oBKku6amLL58CW5UC",
                    "1_12": "k40b4n3ncmpIvNCW5W0",
                    "1_13": "k420GESx9yiQLcCW5XU",
                    "2_1": "kwVgQcfxkBQfnmCWpIC",
                    "2_2": "k4AwKDyInigAnoCWpL4",
                    "2_3": "k10YaARivzgKpyCWpMA",
                    "2_4": "k1KtTmD9cVD0k9CWpP6",
                    "2_5": "k6zMb93ehMJHf1CWpQW",
                    "2_6": "k2rRKZiMFBhW7NCWpSM",
                    "2_7": "k6ESBzWdIgbYxWCWpUe",
                    "2_8": "k6dR6Y2SQChTIGCWpVu",
                    "2_9": "k1YvOcUNXvYWt6CWpX8",
                    "2_10": "k2vySvLYmXS3wYCWq0S",
                    "2_11": "kilsedoVkn5TJ8CWq1U",
                    "2_12": "k1GaklgpMU8u0nCWq3I",
                    "2_13": "k5jltNXoHroluiCWq5k"
                }
            },
            // Scooby-Doo! Mystery Incorporated (2010)
            "18123": {
                short_id: "scooby_mystery_inc",
                release_year: 2010,
                dailymotion_videos: {
                    "1_1": "k3I4J5K6L7M8N9O0P1Q",
                    "1_2": "k2R3S4T5U6V7W8X9Y0Z",
                    "1_3": "k1A2B3C4D5E6F7G8H9I",
                    "1_4": "k0J1K2L3M4N5O6P7Q8R",
                    "1_5": "k9S0T1U2V3W4X5Y6Z7A",
                    "1_6": "k8B9C0D1E2F3G4H5I6J",
                    "1_7": "k7K8L9M0N1O2P3Q4R5S",
                    "1_8": "k6T7U8V9W0X1Y2Z3A4B",
                    "1_9": "k5C6D7E8F9G0H1I2J3K",
                    "1_10": "k4L5M6N7O8P9Q0R1S2T",
                    "1_11": "k3U4V5W6X7Y8Z9A0B1C",
                    "1_12": "k2D3E4F5G6H7I8J9K0L",
                    "1_13": "k1M2N3O4P5Q6R7S8T9U",
                    "1_14": "k0V1W2X3Y4Z5A6B7C8D",
                    "1_15": "k9E0F1G2H3I4J5K6L7M",
                    "1_16": "k8N9O0P1Q2R3S4T5U6V",
                    "1_17": "k7W8X9Y0Z1A2B3C4D5E",
                    "1_18": "k6F7G8H9I0J1K2L3M4N",
                    "1_19": "k5O6P7Q8R9S0T1U2V3W",
                    "1_20": "k4X5Y6Z7A8B9C0D1E2F",
                    "1_21": "k3G4H5I6J7K8L9M0N1O",
                    "1_22": "k2P3Q4R5S6T7U8V9W0X",
                    "1_23": "k1Y2Z3A4B5C6D7E8F9G",
                    "1_24": "k0H1I2J3K4L5M6N7O8P",
                    "1_25": "k9Q0R1S2T3U4V5W6X7Y",
                    "1_26": "k8Z9A0B1C2D3E4F5G6H",
                    "2_1": "k7I8J9K0L1M2N3O4P5Q",
                    "2_2": "k6R7S8T9U0V1W2X3Y4Z",
                    "2_3": "k5A6B7C8D9E0F1G2H3I",
                    "2_4": "k4J5K6L7M8N9O0P1Q2R",
                    "2_5": "k3S4T5U6V7W8X9Y0Z1A",
                    "2_6": "k2B3C4D5E6F7G8H9I0J",
                    "2_7": "k1K2L3M4N5O6P7Q8R9S",
                    "2_8": "k0T1U2V3W4X5Y6Z7A8B",
                    "2_9": "k9C0D1E2F3G4H5I6J7K",
                    "2_10": "k8L9M0N1O2P3Q4R5S6T",
                    "2_11": "k7U8V9W0X1Y2Z3A4B5C",
                    "2_12": "k6D7E8F9G0H1I2J3K4L",
                    "2_13": "k5M6N7O8P9Q0R1S2T3U",
                    "2_14": "k4V5W6X7Y8Z9A0B1C2D",
                    "2_15": "k3E4F5G6H7I8J9K0L1M",
                    "2_16": "k2N3O4P5Q6R7S8T9U0V",
                    "2_17": "k1W2X3Y4Z5A6B7C8D9E",
                    "2_18": "k0F1G2H3I4J5K6L7M8N",
                    "2_19": "k9O0P1Q2R3S4T5U6V7W",
                    "2_20": "k8X9Y0Z1A2B3C4D5E6F",
                    "2_21": "k7G8H9I0J1K2L3M4N5O",
                    "2_22": "k6P7Q8R9S0T1U2V3W4X",
                    "2_23": "k5Y6Z7A8B9C0D1E2F3G",
                    "2_24": "k4H5I6J7K8L9M0N1O2P",
                    "2_25": "k3Q4R5S6T7U8V9W0X1Y",
                    "2_26": "k2Z3A4B5C6D7E8F9G0H"
                }
            },
            // Que Legal, Scooby-Doo! (2015)
            "64228": {
                short_id: "que_legal_scooby",
                release_year: 2015,
                dailymotion_videos: {
                    "1_1": "k4ZJpVR8uwpNqqCFTQK",
                    "1_2": "k1HCPIfonTKYkGCJ4iI",
                    "1_3": "k6nD2N9SUYMbJACJ4k0",
                    "1_4": "k4I7LOxZMYNwFCCJ4qC",
                    "1_5": "k67pFFkHPDCsIACJ4sc",
                    "1_6": "k5TP0SJOMblyopCJ4ws",
                    "1_7": "k3xZjrRJjoj3b0CJ4xE",
                    "1_8": "k4D5mHms0DRWioCJazO",
                    "1_9": "k1gzLc9rNRRv6yCJaBw",
                    "1_10": "k6tfgVMZF4g3bBCJaCG",
                    "1_11": "k6CLIxDabXMakvCJeYC",
                    "1_12": "k4XxnuT3guBYelCJeYW",
                    "1_13": "k7tP7hRt3IO8CDCJeZK",
                    "1_14": "k3XTJcf6dtwJ03CJYGg",
                    "1_15": "k1p5aDdoEoGMZKCJYJ2",
                    "1_16": "kXjuBT55rc2SqRCJYNy",
                    "1_17": "k47J6DkB7vJornCJYQe",
                    "1_18": "k6wDc3ks2yGbaWCJYS8",
                    "1_19": "k7Mx6HZvvKqXa8CJYU2",
                    "1_20": "k52oYfZEAGTR0ACJYV",
                    "1_21": "k7xwEzbzDClTvMCJYWm",
                    "1_22": "k73bBbQSzLPTycCJYXQ",
                    "1_23": "k5mUpYknuiXxqKCJYZi",
                    "1_24": "k5Boz4I21piKVmCJZ0a",
                    "1_25": "kE9fLAYqb9MKzBCJZ1c",
                    "1_26": "k19XWB5ElpXqUGCJZ2G",
                    "2_1": "k3H2IcPDZmDYTzCJZ3C",
                    "2_2": "k27DWLPMszdEpvCKnsW",
                    "2_3": "k1r3UY3sW0kxP1CKnug",
                    "2_4": "k4aRWrHSzL3ns1CKnvE",
                    "2_5": "k32vwI4h95I2LMCKnxC",
                    "2_6": "kBcmwaCUKgpMsgCKnzM",
                    "2_7": "k7ucvz0nuNdGDvCKnBa",
                    "2_8": "kvssXrJ00r2HrTCKnEk",
                    "2_9": "k5Z92KOXCacd45CKnJw",
                    "2_10": "k6jDrWtDGnIclXCKnN2",
                    "2_11": "k5YXmCkXYO0keuCKnPu",
                    "2_12": "k1D3SFjRHhrGyGCKnRS",
                    "2_13": "k7uxAbl3F0e7YzCKnTM",
                    "2_14": "k1N4T6DbS6TEDNCKnVu",
                    "2_15": "k46cIDRII4OqYdCKnYs",
                    "2_16": "k2l3dqZSKO4qoLCKP7e",
                    "2_17": "k7t71VqIFBEuyiCKP8M",
                    "2_18": "k7IY1CQnFZ6lGWCKPak",
                    "2_19": "k1Sut6xK2rIQRwCKPbY",
                    "2_20": "k3Hx43k5nUNe4mCKPdk",
                    "2_21": "kVwMTjkYoPWEArCKPes",
                    "2_22": "k10k3Tcd9B5WwWCKPfG",
                    "2_23": "k3GOxJWqNBhhD6CKPhq",
                    "2_24": "kQTa2X6uPuRRgfCKPiG",
                    "2_25": "k5lzHOz8I3xn9FCKPjI",
                    "2_26": "k1XtHCo4scXIlRCKPkm"
                }
            },
            // Scooby-Doo e Convidados (2019)
            "88367": {
                short_id: "scooby_convidados",
                release_year: 2019,
                dailymotion_videos: {
                    "1_1": "k6jJHDzAuUPG4sCFUsS",
                    "1_2": "k3S9LpFw1yCJ5RCU3sY",
                    "1_3": "k605B1LeLQzfRNCU3vc",
                    "1_4": "k2XZ5dAvuoFuN1CU3wK",
                    "1_5": "k1CPtgbC7U20djCU3yu",
                    "1_6": "k31Bd7ZnbA5Ht5CU3AA",
                    "1_7": "k3HiIoH2Mr1nAhCU3Cw",
                    "1_8": "k5Vl6QlQGyhVfrCU6h6",
                    "1_9": "k1y83xxkMdDUb0CU6iI",
                    "1_10": "k1mMcWCZDkYa8dCU6ka",
                    "1_11": "k4kuAZyixT18dVCU6lA",
                    "1_12": "k4oJGO5yjAssOoCU6n8",
                    "1_13": "k1YD84cKvMfRDmCU6p2",
                    "1_14": "k2FKFu1QgSQIjwCU6rW",
                    "1_15": "k6lXgwe5Hr7kCDCUsEa",
                    "1_16": "k5On9KlbYdGos7CUsGc",
                    "1_17": "k6USIwzj0AxHESCUsJk",
                    "1_18": "k4jRx9uNdsM1KiCUsKk",
                    "1_19": "k4Qusy77RYsHqZCUsLo",
                    "1_20": "k6wuj0dYmEBpCHCUsNs",
                    "1_21": "k2cshTzeA2KrShCUsPM",
                    "1_22": "k24jmCn8KfAS4sCUvpw",
                    "1_23": "k4vKvdO0c2KU9LCUvrE",
                    "1_24": "k4iLFHGE0nB7kWCUvtm",
                    "1_25": "k4h4P1XE7Tiu4SCUVua",
                    "1_26": "k1GJhmHkUCkgUECUVwA",
                    "2_1": "k7e3kVvjgsv554CVhpi",
                    "2_2": "k67nlyDzTobSTGCVhqU",
                    "2_3": "k2I20AHjO0wVLACVhsG",
                    "2_4": "k5jPImA1k6jPyACVhuy",
                    "2_5": "kFsVGL9nzATHJDCVhvI",
                    "2_6": "k3kqJ9y4YjsT3ZCVhx0",
                    "2_7": "k5y6gZecYLN8xdCVhyc",
                    "2_8": "k5dWyICUFav7kACVhzC",
                    "2_9": "k21HMIv3NiDhffCVhAU",
                    "2_10": "k3ImOCDktpRBQ5CVhC2",
                    "2_11": "k22Btf4uZ8yIunCVhDM",
                    "2_12": "kWxFfHR0AaTtJ2CVhFy",
                    "2_13": "k5EWChjFoQ8XVMCVpki",
                    "2_14": "k5OwpSx3rNrKDKCVFMs",
                    "2_15": "kEBjiStHvDvJkXCVFO4",
                    "2_16": "k5TdeUttdDRD8QCVFRo",
                    "2_17": "k5Yp8eyWfDzp4uCVFU6",
                    "2_18": "k12SNbNQH9FezYCVFVQ",
                    "2_19": "k2xtfgRMSDbsM7CVFZ0",
                    "2_20": "klAXfrk6mycB1KCVG0q",
                    "2_21": "k2qjJTDDqVAog4CVG1U",
                    "2_22": "k5gx5i6BuqefWXCVG2U",
                    "2_23": "k171D6d46NGxstCVG44",
                    "2_24": "k2WRdTKVs2uEpsCVG56",
                    "2_25": "k7c7skcacLjjTxCVG6I",
                    "2_26": "k29fbZfglW1lztCVG84"
                }
            },
            // Velma (2023)
            "126725": {
                short_id: "velma_2023",
                dailymotion_videos: {
                    "1_1": "k6frl5orOI5phsCGnHW",
                    "1_2": "k1w6y7F7cKuAV3CXHCi",
                    "1_3": "k2iNlfYEqIJJK3CXHEa",
                    "1_4": "GOOGLE_DRIVE_LINK",
                    "1_5": "kdR9WY1GUPCGIsCXN0c",
                    "1_6": "k4c1RDcLWZC9taCXN2C",
                    "1_7": "k2nd5fXzUPipG3CXN8s",
                    "1_8": "k71tqummv1QhvGCXNaG",
                    "1_9": "k65DGQ9T2HZM8aCXNc8",
                    "1_10": "k5kGCpahifS7AwCXNe8",
                    "2_1": "k3vFQEcJaviI11CYdDU",
                    "2_2": "kzHLYcxH1QSqTwCYdE2",
                    "2_3": "k3CSParPuvuwO0CYdEe",
                    "2_4": "k1z2jOGA6Yn8SiCYdEQ",
                    "2_5": "k19Tv956uHb0sWCYdEY",
                    "2_6": "k2HRTACvfK1Gj4CYdF6",
                    "2_7": "kbrCfWElUnI7UKCYdFk",
                    "2_8": "kxE38lzWDJ6C3JCYdFA",
                    "2_9": "k37XPBtV3R8LACCYdFK",
                    "2_10": "k7d5U902oYZpytCYdFY",
                    "2_11": "k1e5vFWKaZUcekCYdGc"
                }
            }
        }
    },
    "filmes_animados_dvd": {
        title: "Filmes Animados (DVD)",
        items: {
            // ID 13151: Ilha dos Zumbis
            "13151": { 
                short_id: "filme_zumbis",
                dailymotion_videos: { "1_1": "k7duiw0UW6q9xwCIHQg" } 
            },
            // ID 17681: Fantasma da Bruxa
            "17681": { 
                short_id: "filme_bruxa",
                dailymotion_videos: { "1_1": "k2Qfa3v1CcMCu9CFmBc" } 
            },
            // ID 20410: Invasores Alienígenas
            "20410": { 
                short_id: "filme_alien",
                dailymotion_videos: { "1_1": "k4bCm4VKwADzMFCFmK0" } 
            },
            // ID 15601: Perseguição Cibernética
            "15601": { 
                short_id: "filme_cibernetica",
                dailymotion_videos: { "1_1": "k2HxA2gZGos7PHCFmUW" } 
            },
            // ID 30074: Lenda do Vampiro
            "30074": { 
                short_id: "filme_vampiro",
                dailymotion_videos: { "1_1": "k4hyKRc7dj2ZwpCFn0O" } 
            },
            // ID 21956: Monstro do México
            "21956": { 
                short_id: "filme_mexico",
                dailymotion_videos: { "1_1": "k31rFX0FafNm7FCGohs" } 
            },
            // ID 12902: Monstro do Lago Ness
            "12902": { 
                short_id: "filme_ness",
                dailymotion_videos: { "1_1": "k5WcyfIgGAhMF3CUvgO" } 
            },
            // ID 24615: Aloha
            "24615": { 
                short_id: "filme_aloha",
                dailymotion_videos: { "1_1": "k4BBynaKLp8y9XCFHVC" } 
            },
            // ID 20558: Cadê a Minha Múmia?
            "20558": { 
                short_id: "filme_mumia",
                dailymotion_videos: { "1_1": "kvrRVo5uSREib8CGoOW" } 
            },
            // ID 13355: Piratas à Vista
            "13355": { 
                short_id: "filme_piratas",
                dailymotion_videos: { "1_1": "k6WHSidkmxh8cYCGp2u" } 
            },
            // ID 13354: Abominável Homem das Neves
            "13354": { 
                short_id: "filme_neves",
                dailymotion_videos: { "1_1": "k37ese6GkjR0t1CILjO" } 
            },
            // ID 12903: Rei dos Duendes
            "12903": { 
                short_id: "filme_duendes",
                dailymotion_videos: { "1_1": "k3WLfv0zprh6ViCGAoE" } 
            },
            // ID 16390: Espada do Samurai
            "16390": { 
                short_id: "filme_samurai",
                dailymotion_videos: { "1_1": "k3wQCEqZUkszzlCGAtG" } 
            },
            // ID 32916: Abracadabra-Doo
            "32916": { 
                short_id: "filme_abracadabra",
                dailymotion_videos: { "1_1": "k1CZbewSx700GACXNwu" } 
            },
            // ID 45752: Verão Assombrado
            "45752": { 
                short_id: "filme_verao",
                dailymotion_videos: { "1_1": "k4dzhVwbYPoTUzD749E" } 
            },
            // ID 67900: Lenda do Fantasmossauro
            "67900": { 
                short_id: "filme_fantasmossauro",
                dailymotion_videos: { "1_1": "k298wqd2K5JNLdCH1sq" } 
            },
            // ID 81900: Música de Vampiro
            "81900": { 
                short_id: "filme_musica",
                dailymotion_videos: { "1_1": "k2ADu623zColXjCH1F8" } 
            },
            // ID 119321: Estrela do Circo
            "119321": { 
                short_id: "filme_circo",
                dailymotion_videos: { "1_1": "k3tkvc1NRBYHIeCHc8s" } 
            },
            // ID 151535: Máscara do Falcão Azul
            "151535": { 
                short_id: "filme_falcao",
                dailymotion_videos: { "1_1": "k77V6abvPivgYcCHc9y" } 
            },
            // ID 210769: Mapa Misterioso
            "210769": { 
                short_id: "filme_mapa",
                dailymotion_videos: { "1_1": "ktSjQrBzVr3lSDCIlBo" } 
            },
            // ID 203696: Medo de Palco
            "203696": { 
                short_id: "filme_medo",
                dailymotion_videos: { "1_1": "k6TEatv5fxdSFkCHcdm" } 
            },
            // ID 258893: Mistério na LutaMania
            "258893": { 
                short_id: "filme_lutamania",
                dailymotion_videos: { "1_1": "k4kJw11ajQ44RsCHcgy" } 
            },
            // ID 284995: Maldição do Frankenstein
            "284995": { 
                short_id: "filme_frankenstein",
                dailymotion_videos: { "1_1": "k7KGYpO9VVxMMJCHsV6" } 
            },
            // ID 302960: Loucura do Monstro da Lua
            "302960": { 
                short_id: "filme_lua",
                dailymotion_videos: { "1_1": "kYpwsafh79pgZDCHsWk" } 
            },
            // ID 347688: Mistério do Rock n' Roll
            "347688": { 
                short_id: "filme_rock",
                dailymotion_videos: { "1_1": "k31MuBI2DIrnTDCHsXO" } 
            },
            // ID 392536: Hollywood Assombrada
            "392536": { 
                short_id: "filme_hollywood",
                dailymotion_videos: { "1_1": "k5RVQ5C7VOzQvsCHt10" } 
            },
            // ID 409122: Maldição do Demônio Veloz
            "409122": { 
                short_id: "filme_demonio",
                dailymotion_videos: { "1_1": "k7iddWkmzDODimCHEYI" } 
            },
            // ID 427564: Combate do Salsicha
            "427564": { 
                short_id: "filme_combate",
                dailymotion_videos: { "1_1": "k4ye0RNAirG2MvCHEZW" } 
            },
            // ID 461054: Golpe da Praia
            "461054": { 
                short_id: "filme_praia",
                dailymotion_videos: { "1_1": "k5KS8YutSOrycNCHF1m" } 
            },
            // ID 484862: Os Bravos e Destemidos
            "484862": { 
                short_id: "filme_bravos",
                dailymotion_videos: { "1_1": "kjbCNCRE96qg6iCHF2A" } 
            },
            // ID 533592: Fantasma Gourmet
            "533592": { 
                short_id: "filme_gourmet",
                dailymotion_videos: { "1_1": "k6MVp9QDV7UggOCILkO" } 
            },
            // ID 560066: Maldição do 13º Fantasma
            "560066": { 
                short_id: "filme_13fantasma",
                dailymotion_videos: { "1_1": "k5JatLuERI3ZIeCHWjm" } 
            },
            // ID 615774: De Volta à Ilha dos Zumbis
            "615774": { 
                short_id: "filme_devolta",
                dailymotion_videos: { "1_1": "k20vrLDHJXvKXSCHWmu" } 
            },
            // ID 385103: Scooby! O Filme
            "385103": { 
                short_id: "filme_scooby",
                dailymotion_videos: { "1_1": "k6C8jRwe6slaWfCFHvm" } 
            },
            // ID 721656: Halloween
            "721656": { 
                short_id: "filme_halloween",
                dailymotion_videos: { "1_1": "k3Y8NxK7vMbT0bCHWpg" } 
            },
            // ID 682254: Espada
            "682254": { 
                short_id: "filme_espada",
                dailymotion_videos: { "1_1": "k61cdU1psLpqTqCI57A" } 
            },
            // ID 843906: Coragem
            "843906": { 
                short_id: "filme_coragem",
                dailymotion_videos: { "1_1": "k6MNLAtPxwzBTPCI59c" } 
            },
            // ID 1015724: Gostosuras ou Travessuras
            "1015724": { 
                short_id: "filme_gostosuras",
                dailymotion_videos: { "1_1": "k4HDz5EZy2VLG4CFHR4" } 
            },
            // ID 1146348: Krypto
            "1146348": { 
                short_id: "filme_krypto",
                dailymotion_videos: { "1_1": "k2WtIp1mIZq893CFHNK" } 
            }
        }
    },
    "filmes_animados_tv": {
        title: "Filmes Animados (TV)",
        items: {
            // ID 24787: Irmãos Boo (1987)
            "24787": { 
                short_id: "filme_irmaos_boo",
                release_year: 1987,
                dailymotion_videos: { "1_1": "k2X9SFd3kp0o4kCIlMg" }
            },
            // ID 13350: Escola Assombrada (1988)
            "13350": { 
                short_id: "filme_escola_assombrada",
                release_year: 1988,
                dailymotion_videos: { "1_1": "k31UOkqng0kdLmCIlIG" }
            },
            // ID 37211: Lobisomem (1988)
            "37211": { 
                short_id: "filme_lobisomem",
                release_year: 1988,
                dailymotion_videos: { "1_1": "k2FNmrcuJtYbZ6CMA46" }
            },
            // ID 13351: Uma Noite das Arábias (1994)
            "13351": { 
                short_id: "filme_arabias",
                release_year: 1994,
                dailymotion_videos: { "1_1": "k2RkWJlai5FNtEDfKN4" }
            }
        }
    },
    "especiais_dvd": {
        title: "Episódios Especiais (DVD)",
        items: {
            "espdvd001": {
                short_id: "jogos_assombrados",
                title: "Jogos Assombrados",
                overview: "Especial de DVD com aventuras assombradas do Scooby-Doo.",
                year: "2012",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=JOGOS+ASSOMBRADOS",
                dailymotion_videos: { "1_1": "k1eIuiznAAMs7LCGALY" }
            },
            "espdvd002": {
                short_id: "natal_assombrado",
                title: "Natal Assombrado",
                overview: "Especial de Natal com mistérios natalinos do Scooby-Doo.",
                year: "2012",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=NATAL+ASSOMBRADO",
                dailymotion_videos: { "1_1": "k7kLscnXnhFHePCGAX0" }
            },
            "espdvd003": {
                short_id: "espantalho_sinistro",
                title: "Espantalho Sinistro",
                overview: "Aventura com um espantalho misterioso.",
                year: "2013",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=ESPANTALHO+SINISTRO",
                dailymotion_videos: { "1_1": "k271hHXFryQi92CI5gW" }
            },
            "espdvd004": {
                short_id: "ameaca_mecachorro",
                title: "Ameaça do Mecachorro",
                overview: "Scooby-Doo enfrenta um robô cachorro mecânico.",
                year: "2013",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=MECACHORRO",
                dailymotion_videos: { "1_1": "k1n5STehkRKNvCCI5iY" }
            },
            "espdvd005": {
                short_id: "gol_fantasma",
                title: "Gol de Fantasma",
                overview: "Mistério no mundo do futebol com fantasmas.",
                year: "2014",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=GOL+FANTASMA",
                dailymotion_videos: { "1_1": "k5etV7y2yAgS8aCI5lg" }
            },
            "espdvd006": {
                short_id: "monstro_praia",
                title: "Monstro da Praia",
                overview: "Aventura na praia com um monstro marinho.",
                year: "2015",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=MONSTRO+PRAIA",
                dailymotion_videos: { "1_1": "kEEXAuDB4JbGNrCIpy0" }
            }
        }
    },
    "especiais_tv": {
        title: "Episódios Especiais (TV)",
        items: {
            "esptv001": {
                short_id: "hollywood_1979",
                title: "Hollywood",
                overview: "Scooby-Doo vai para Hollywood em uma aventura especial.",
                year: "1979",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=HOLLYWOOD",
                dailymotion_videos: { "1_1": "k3VYf8Hk4r3J4jCIqjK" }
            },
            "esptv002": {
                short_id: "projeto_scooby",
                title: "O Projeto Scooby-Doo!",
                overview: "Um projeto especial com aventuras inéditas do Scooby-Doo.",
                year: "1999",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=PROJETO+SCOOBY",
                dailymotion_videos: { "1_1": "gdrive:1R98SEGp8BF_ZaP--qR3RLWja-4EyoS1q" }
            },
            "esptv003": {
                short_id: "noite_doos_vivos",
                title: "A Noite dos Doos Vivos",
                overview: "Uma noite assombrada com múltiplos Scooby-Doos.",
                year: "2001",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=DOOS+VIVOS",
                dailymotion_videos: { "1_1": "gdrive:1XM4VdMTwlyi-1eQNF6bwc5W3hJgEsdbB" }
            },
            "esptv004": {
                short_id: "terror_cavaleiro_negro",
                title: "Terror com o Cavaleiro Negro",
                overview: "LEGO Scooby-Doo enfrenta o terror do Cavaleiro Negro.",
                year: "2015",
                poster_path: "https://via.placeholder.com/342x513/1e1e1e/FFFFFF?text=CAVALEIRO+NEGRO",
                dailymotion_videos: { "1_1": "k4tJkUfljGO3IOCI5rm" }
            }
        }
    },
    "crossovers": {
        title: "Episódios Crossovers",
        items: {
            "cross001": {
                short_id: "bravo_dooby_doo",
                title: "Bravo Dooby-Doo!",
                overview: "Crossover entre Scooby-Doo e Johnny Bravo. Johnny Bravo encontra a turma do Scooby-Doo em uma aventura cheia de mistérios e confusões.",
                year: "1997",
                series: "Johnny Bravo",
                poster_path: "https://scontent.ffor23-1.fna.fbcdn.net/v/t39.30808-6/481156736_693629059653394_4154148252967613680_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Kf8sQvB98v8Q7kNvwFh42Kq&_nc_oc=AdlsrpwPZuehxDDpcVDJApbMD6ojd8Br_L9ZiO4l1DpzwrpwoOCdEs-3c9kiu6g7eRA&_nc_zt=23&_nc_ht=scontent.ffor23-1.fna&_nc_gid=mRHVLtzWyiOIK6G_1WqpFA&oh=00_Afd8ytt3TP2uHilot04KoYh3BXE4oBaqMK0YLos2vpDJZg&oe=690B8F8A",
                dailymotion_videos: { "1_1": "gdrive:1W7__vN0jdT3fmCggADQPXrh9e6EhYDyX" }
            },
            "cross002": {
                short_id: "prisao_salsicha",
                title: "A Prisão do Salsicha",
                overview: "Crossover entre Scooby-Doo e Harvey, o Advogado. Salsicha precisa da ajuda de Harvey para resolver um problema legal.",
                year: "2000",
                series: "Harvey, o Advogado",
                poster_path: "https://cinepop.com.br/wp-content/uploads/2020/07/Harvey.jpg",   
                dailymotion_videos: { "1_1": "gdrive:1MiXxpptBMo0E9iGxUgOdZY2RdH9totoB" }
            },
            "cross003": {
                short_id: "casos_estranhos_batman",
                title: "Casos Estranhos do Batman",
                overview: "Crossover entre Scooby-Doo e Batman: Os Bravos e Destemidos. A turma do Scooby-Doo se une ao Batman para resolver um mistério.",
                year: "2011",
                series: "Batman: Os Bravos e Destemidos",
                poster_path: "https://i.imgur.com/6uwpg2F.png",
                dailymotion_videos: { "1_1": "k6zsIkBXVEITjUD74i2" }
            },
            "cross004": {
                short_id: "scoobynatural",
                title: "Scoobynatural",
                overview: "Crossover entre Scooby-Doo e Sobrenatural. Os irmãos Winchester encontram a turma do Scooby-Doo em uma aventura sobrenatural.",
                year: "2018",
                series: "Sobrenatural",
                poster_path: "https://cinepop.com.br/wp-content/uploads/2020/07/Harvey.jpg",
                dailymotion_videos: { "1_1": "k6gJjPqEh3mJzKCIlyI" }
            },
            "cross005": {
                short_id: "briga_cartoons",
                title: "Briga de Cartoons",
                overview: "Crossover entre Scooby-Doo e Os Jovens Titãs em Ação. Uma batalha épica entre personagens de diferentes universos animados.",
                year: "2019",
                series: "Os Jovens Titãs em Ação",
                poster_path: "https://cinepop.com.br/wp-content/uploads/2020/07/Harvey.jpg",
                dailymotion_videos: { "1_1": "k6MUd3zOXUT8llCSGNu" }
            }
        }
    },
    "live_action": {
        title: "Filmes Live-Action",
        items: {
             "9637": { 
        short_id: "filme_live_action_scooby",
        release_year: 2002,
        dailymotion_videos: { "1_1": "k3mbbv3wFSDUhpCIptW" } 
    },

    // ID 11024: Monstros à Solta (2004)
    "11024": { 
        short_id: "filme_live_action_scooby2",
        release_year: 2004,
        dailymotion_videos: { "1_1": "k2Xm7QHBx5dbUkCIr68" } 
    },  

    // ID 22620: O Mistério Começa (2009)
    "22620": { 
        short_id: "filme_live_action_misterio_comeca",
        release_year: 2009,
        dailymotion_videos: { "1_1": "ktRpjdsAblOskhCIHCI" } 
    },  

    // ID 47533: Maldição do Monstro do Lago (2010)
    "47533": { 
        short_id: "filme_live_action_monstro_lago",
        release_year: 2010,
        dailymotion_videos: { "1_1": "k2lBGwObEDTrUCCIHFC" } 
    },  

    // ID 489939: Daphne e Velma (2018)
    "489939": { 
        short_id: "filme_live_action_daphne_velma",
        release_year: 2018,
        dailymotion_videos: { "1_1": "k5QnShoqqKtl66CIHN8" } 
    } 
        }
    }
};   

// Compatibilidade com código existente
const SERIES_MAPPING = CONTENT_CATEGORIES.series.items;
