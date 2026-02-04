import React, { useState, useMemo, useEffect } from 'react';
import { Search, Phone, User, ShieldCheck, MapPin, Lock, LogIn, Tag } from 'lucide-react';

const ENCODED_PASSWORD = "MmEyM2JiMDY="; 

// --- Google Drive ID 映射表 (已刪除 SH 與 JL) ---
const DRIVE_MAP = {
  "TCL": "1b43c-59-jycPsbvjuUwBOuBRW7TdP2cR",
  "KL": "1ovnev5bdZ-sisR9cF8Sieo-LhZAyMQMK",
  "YTL": "1m9Rgr2eLJMUpKEqcCllWKKgYXt4bAavX",
  "CKA": "1TBQ-laMa3lDX0GvTAaP5eW_5x33nAvPy",
  "JC": "1eyx_pC5DYsrzDxeeH5F449YBkDYE0SGC",
  "SCY": "1d-6Iu-dkTZYlN-6O7hiZFx7PpRDT7BJO",
  "PUL": "1VV_Pk9zVpglVt85GLcMn5XDYEt1gvfUT",
  "TKK": "1Q8Em2n1fvW2NtF53m_4ZZCQDbaPs5PJg",
  "OMK": "1mFkzAIBi5Oy1BnSA6oHt0BI3VMLsVaj7",
  "YIL": "1s36FTWatXvV6RudY79PO4izJd6HoKfdR",
  "KMC": "1SqhabFQ1NJzpNgzTrEmOrTXdMzRxugBh",
  "TWY": "113FA0aDF45ePDeW7VhYGGiqgqjh2ohyg",
  "J王敏玲": "12hRlYgi0KdUIHoFhQCGjb9z4wsm84Rlb",
  "SMT": "17jSp2SQYtBIgRTyknv63bKFkZjfzxoys",
  "YNT": "1BcnEb7JTt99bdlnE3FsTk5UhEJBelhfj",
  "CYN": "1FMQWrTBCwAiaCY-4qFR1NfBE7LpglLax",
  "SYS": "1H_Ub5swaH3rmeF6-b5ox2mbhdWroBUCT",
  "YPT": "1LZXQ0mryZzET_LsVWGAo3mmJlODowPq8",
  "CLL": "1RBhfvp-D4ObONQZlSTfGKSCTtIMH47wC",
  "YPL": "1SAK9OJCi9vWQnd06xL07oliim42Bfbw1",
  "KPF": "1WOpw_cFisuTlF0x_4DJ_haDhXWQJBHcx",
  "JT": "1X8lEMKaOzvz1qDCJGrtFeNu80b58nCzo",
  "YML": "1Y9D4IkCQXCApzJOPojFzfVbWv_EUfHbk",
  "JK": "1ZrUBuwFtYb1OdMWOwVWYKBSQBjbptNgm",
  "LL": "1bNrqVxNbQhxq9OwSj-htrFSq0TJV6ksN",
  "LCL": "1cB6tArXU0ETrl_sFN8hTuo4xyPXAG81y",
  "THN": "1cfKp1yK46m8pCHigXFmkFXdX4MfQKKbd",
  "WHS": "1g3vNEVZ9xbUYn6N5aXU5TUUVzJR2_j_E",
  "WTN": "1jQDOjeeSmvhGdBS3V1xMY1Ew_HAAAFnW",
  "PYL": "1pg8x7z5dOvN2nf_7Qe6NXjyrR8XQBDaF",
  "HYC": "1plDqrbpn69fzOXS6rqJzLjdMnllMndAc",
  "CYL": "1uawt-rjgdi-5Q0S5sVJ3BGRmOgqfOod7",
  "MKC": "1x_06F-6bexw4cllTQZUiH8hVxuX1kojV",
  "YCL": "1y_V6HQd757reoZKhKsaVTejmEDDSbFUO",
  "YMM": "1zuz8_We2x_8dA0scAoKCMjij7HOng9n6",
  "J王笑娟": "11hlbYvNa690YvDtPhXWcX7jn0sK-3LNC",
  "ML": "11mwLS4dkCHhsfjXaFH3yBZ8UpWuyELm1",
  "LLC": "14wyCoySd6MVKdS5nuPfFwI66QfIc1w-E",
  "J盧雪娟": "17IsjDjmfXE47mVjz0SL24Jm8vwxwMziW",
  "CYC": "19ZXfYqvdIZKFHr-_iclU4KEaSgfrbl27",
  "JY": "1Asv9XOs4y6AJOd4t5kwKa3zyB5MD2tMs",
  "KKL": "1CvtgbGfU3uvH_HdiHDKpywn-gKCsW7nr",
  "CL": "1Gv_nNpMPl7qNELG9_vcWPFBF4P8HAGwu",
  "KWC": "1H0LEJL2c4cnsCVjtxn8oJbHKX4zol_cX",
  "EC": "1LK3YHxHjD46upA05GNY9ma8U-zj8jCgY",
  "MC": "1M0GynLWUd7zNQEPE9zm7m2akfkCfa-S8",
  "LLT": "1Oe9LCXoZ5vISy9eYGGBxlGbMJ6JCyGc4",
  "DT": "1_1Yxr_ItTbH1NfhISYZtBAztd13XRXLH",
  "KYC": "1aQSz-PNHpwbe__u-vxzCj9vnW7UDDb4R",
  "J葉建偉": "1eUe_uT1zDLPVPKyCukSMeIj-41Ye0zOV",
  "SY": "1ezMrED7d8mjbd-FhwirYMmlmMTLfZxld",
  "HFL": "1hOGXtcTusde27H81oWLR8HdunEktddjx",
  "SS": "1htJDl4i-9N4W7EW6HVuBJetNV_vIfltI",
  "WYT": "1mDI72UMqTw49zRhHuvXihCWkE9__mynN",
  "BL": "1o-VwQiDMjpwg_BnYrUAUohcRBNl4tXLg",
  "SFS": "1o1o9LMEPrwXzfdXMqnu75vzVhHqhyeQq",
  "J余素蓮": "1qOqTKSR_9I-Xb1Uzca9JnH3L6wxvsD5-",
  "J劉曼麗": "1zxZD9OHI6ekZ-QDyyrOSbhqDJcp5xAUj",
  "MYT": "113wxs0XFf1RViTHpZrLU43xWNOYEFwkf",
  "HPP": "13leb9RrefiXcapvyYytPK73T3kd0dtTG",
  "CHM": "14M9S5-QCa-qMQfvbA9cG1WJmG_DFUqaE",
  "J關禮和": "1A2Kh02rxKXla7KwcqjnrsImkY2oAoRUR",
  "EL": "1C1FOjz6t-uFCMgDWyNuPAc7Nl8BJadQR",
  "HYH": "1JJ-f_pwSL7NK-SsudmPN4pTAv0CVS_X3",
  "MLT": "1KwRaj5LRjJA3TpQ3f8uSCOoKh5hNdQH9",
  "SKL": "1L0WM_AJRKiPtyAwJ1nlAuaDyAYwzf7B7",
  "WST": "1LVV3DneWv0iCgMQF3RuJjVr5i4T_MVmC",
  "HLL": "1NAdtU-DUNmP0vymrvV-ZNYvX9PFd4FxB",
  "HKY": "1OGUbX8a1TpOM-mr_DhuH06AxdUcPG2OX",
  "MCW": "1OkCGLpytyM0wMOxZQ7NPkGn9n8bBhKUX",
  "TFL": "1PVtWYSkB63_quyI1zKyF3qyhgId9f7LA",
  "HKC": "1RpXlBfReBUISM4M6er-69SbIktWiGVPV",
  "HL": "1Ytp0QsXxsbx59fX5KsbwaKo8DgAX4Zan",
  "SYY": "1Z3FTd3QAHb2RLY-DQKmxOHaZOWK7OBh8",
  "SSL": "1_efhWHOgOnyrzt4vA1a7YXlUQPRV_ED4",
  "CKL": "1_sbkenYuI7ptM3igzeJhkaSftmYqO1Eq",
  "CTT": "1eEzFjqzjBM4J29AgGAQ9ly6gBVT9E6Xm",
  "SCP": "1hi9_RHA74YlycWoPLkjESmWcNXTqd_1q",
  "CKT": "1laILM7MnrtghSUliG-4IvzzJzdj7hrIu",
  "YLC": "1nWduf-iW59pGmI0s-bJOPD557a8WF-IT",
  "KML": "1ooG09H2wQtJ4Imuy0yPi_qMBqCtF2ix9",
  "KKC": "1r2FkZw9n5qaf7pKckg1roXQSB0w-n57u",
  "KYY": "1rNgsPqn9TPHsp5swtsrBOmcPWriEWFR8",
  "HYL": "1sPSQiYPZ3jy6NtWGKgfnViRSP_-m2a9z",
  "NMY": "1tkjPZpXxyq-YVwJZNdKYiyQfnaVPxeol",
  "CSC": "1yEKKTh-6A-lYhRemUnFo0ihK1Q-xoOxw",
  "KYL": "1zEh652TEjksmtg57biB-naW3bMh5srbc",
  "LSH": "1zSwPc-V3alxN4v8_6QW6KBvwc-_WH8E9",
  "KFW": "1-B1CfdNPR2Man3ybpBHlHAm_g8Rt0qXs",
  "WHY": "13fQhWR5I-TmdvFb53_QOMq3qkMg3YGe8",
  "TSC": "1FTsR19U1GNDOYBj2me0jJ9IqwqjXDNZ3",
  "SCC": "1GnV1ah2HLDsPdwRCtmYGIDdtJm_yQvEJ",
  "IC": "1VF6ctEKtuMUCGoTFmJKt57d1vZ6uBdCp",
  "WYY": "1VZe3UgM2wQPsD3lRRBh2NTVuj_hFw1xH",
  "KYH": "1cremoW6MUNffqBEuMaRhq4OB7p5AVNqq",
  "KKP": "1kwuNGNwfT2_hAM02ScoXpHx15cEPO2hl",
  "GY": "1xn84-kjHdHLe-gucPsU98SLhXzlWPlZ9",
  "CKC": "10JWQjSQhDIcv5iOvyY6hY-BqDZeBAEs8",
  "HYN": "1UzEd_8EsHnVqkiUIIIXdh7LTaOsIuvbb",
  "ww": "1FHF8toJ_aXnpiAdWeUbkQJTeuyWrFRzp",
  "YKL": "11MNiKZJxovxe78NYXS6kriY2PDq8y5Rk",
  "YYL": "1uhNx67LkA9JzXNBJsbyO50iKE7dIWv3k",
  
  "SYK": "1Bonhu9iTsCWzWCv7T6hBeiTNT3Bgx6Z_",
  "LLT": "1FbrRydvYkq9pArMtC_N8ZuUN-QtTirEf",
  "CTT": "1bA-6FO9fj0vA94PW6GVn3smW0Hkucn2g",
  "HLL": "1ce127jAHJh-xfAAu6QbZu5ha7QLObImB",
  "KKC": "1_DRRx3taMxuWiIWic2bF4yWRM8N6P5ja",
  "KYY": "1SXS7eh8zTAvFzXDcfLQk9iB_dGmnKyOE",
  "EC": "1v2eiiiuaDTlzfEiteOPvnn4dHLt-X6me",
  "SCC": "1GD0Bz4b70zRTxAH2FDPlfWx04kntPTaR",
  "CYX": "1NMrIHfKIa2kjf-FIo3BN0GrBASvJMIs-",
  "LS": "1czjLaXb8f7GApQ7SQ6lbSF_j_CyfGlXu",
  "WSL": "1VyQjCZssloT4mhyVSLw5NyV2QdiauBUy",
  "YWH": "1Kk748PMvfTorBsbR6diK1oKfyM12fozh",
  "WKL": "1mQwCFGkl6QDsrUDtnk4A6mB0kZXSBnb9",
  "JL": "1ib3-hfr2USKidiK2cNEJVe8pdy8m_JOK",
  "OSL": "1--bL62wPWzLrjz6p7ZwzE-p1yUgdLbbX"
};

// 定義房間常亮
const ROOM_A_NAME = "Room A (地下, 中文房)";
const ROOM_B_NAME = "Room B (107室, 英文房)";
const ROOM_C_NAME = "Room C (108室, 數理房)";

const initialStaffData = [
  // D.C.
  { id: 1, name: "陳家榮", engName: "Mr. Tan Jackson", room: "D.C.", ext: "319", initial: "JT", dept: "D.C." },
  { id: 2, name: "周翠珊", engName: "Ms. Chow Chui Shan", room: "D.C.", ext: "319", initial: "CSC", dept: "D.C." },
  { id: 3, name: "吳詠棠", engName: "Mr. Ng Wing Tong", room: "D.C.", ext: "335", initial: "WTN", dept: "D.C." },
  { id: 4, name: "謝志强", engName: "Mr. Tse Chi Keung", room: "D.C.", ext: "335", initial: "CKT", dept: "D.C." },
  { id: 5, name: "莊國偉", engName: "Mr. Chong Kwok Wai", room: "D.C.", ext: "345", initial: "KWC", dept: "D.C." },

  // Room A (地下, 中文房)
  { id: 6, name: "陳嘉玲", engName: "Ms. Chan Ka Ling", room: "地下中文房 (325)", ext: "325", initial: "JC", dept: ROOM_A_NAME },
  { id: 7, name: "蔡嘉明", engName: "Ms. Choi Ka Ming Cammy", room: "地下中文房", ext: "325", initial: "KMC", dept: ROOM_A_NAME },
  { id: 8, name: "何幸兒", engName: "Ms. Ho Hang Yi", room: "地下中文房", ext: "325", initial: "HYH", dept: ROOM_A_NAME },
  { id: 9, name: "簡安敏", engName: "Ms. Kan On Man", room: "地下中文房", ext: "325", initial: "OMK", dept: ROOM_A_NAME },
  { id: 10, name: "黎愛珊", engName: "Ms. Lai Oi Shan", room: "地下中文房", ext: "325", initial: "OSL", dept: ROOM_A_NAME },
  { id: 11, name: "林綺琦", engName: "Ms. Lam Yee Kei", room: "地下中文房", ext: "325", initial: "YKL", dept: ROOM_A_NAME },
  { id: 12, name: "羅子晴", engName: "Ms. Law Tsz Ching", room: "地下中文房", ext: "325", initial: "TCL", dept: ROOM_A_NAME },
  { id: 13, name: "梁依雯", engName: "Ms. Leung Yee Man", room: "地下中文房", ext: "325", initial: "YML", dept: ROOM_A_NAME },
  { id: 14, name: "李錫焜", engName: "Mr. Li Sik Kwan", room: "地下中文房", ext: "325", initial: "SKL", dept: ROOM_A_NAME },
  { id: 15, name: "盧姵好", engName: "Ms. Lo Pei Ue", room: "地下中文房", ext: "325", initial: "PUL", dept: ROOM_A_NAME },
  { id: 16, name: "麥裕銘", engName: "Mr. Mak Yu Ming", room: "地下中文房", ext: "325", initial: "YMM", dept: ROOM_A_NAME },
  { id: 17, name: "沈立", engName: "Mr. Shum Lap", room: "地下中文房", ext: "325", initial: "LS", dept: ROOM_A_NAME },
  { id: 18, name: "談穎妍", engName: "Ms. Tam Wing Yin", room: "地下中文房", ext: "325", initial: "WYT", dept: ROOM_A_NAME },
  { id: 19, name: "鄧婉冰", engName: "Ms. Tang Yuen Ping", room: "地下中文房", ext: "325", initial: "YPT", dept: ROOM_A_NAME },
  { id: 20, name: "黃文靜", engName: "Ms. Wong Man Ching", room: "地下中文房", ext: "325", initial: "MCW", dept: ROOM_A_NAME },
  { id: 21, name: "楊天穎", engName: "Ms. Yeung Tin Wing", room: "地下中文房", ext: "325", initial: "TWY", dept: ROOM_A_NAME },
  { id: 22, name: "葉秀貞", engName: "Ms. Yip Sau Ching", room: "地下中文房", ext: "325", initial: "SCY", dept: ROOM_A_NAME },

  // Room B (107室, 英文房)
  { id: 23, name: "歐志祺", engName: "Mr. Au Chi Kei Jackie", room: "107室英文房 (326)", ext: "326", initial: "CKA", dept: ROOM_B_NAME },
  { id: 24, name: "林有平", engName: "Mr. Ben Lim", room: "107室英文房", ext: "326", initial: "BL", dept: ROOM_B_NAME },
  { id: 25, name: "張伊嵐", engName: "Ms. Cheung Yee Laam", room: "107室英文房", ext: "326", initial: "YLC", dept: ROOM_B_NAME },
  { id: 26, name: "周子傑", engName: "Mr. Chow Chi Kit", room: "107室英文房", ext: "326", initial: "CKC", dept: ROOM_B_NAME },
  { id: 27, name: "許麗淳", engName: "Ms. Hui Lai Shun", room: "107室英文房", ext: "326", initial: "LSH", dept: ROOM_B_NAME },
  { id: 28, name: "林佳儀", engName: "Ms. Lam Kai Yee", room: "107室英文房", ext: "326", initial: "KYL", dept: ROOM_B_NAME },
  { id: 29, name: "梁雪心", engName: "Ms. Leung Suet Sum", room: "107室英文房", ext: "326", initial: "SSL", dept: ROOM_B_NAME },
  { id: 30, name: "梁詠珊", engName: "Ms. Leung Wing Shan", room: "107室英文房", ext: "326", initial: "WSL", dept: ROOM_B_NAME },
  { id: 31, name: "李宛澄", engName: "Ms. Li Yuen Ching", room: "107室英文房", ext: "326", initial: "YCL", dept: ROOM_B_NAME },
  { id: 32, name: "麥中浩", engName: "Mr. Mak Chung Ho", room: "107室英文房", ext: "326", initial: "CHM", dept: ROOM_B_NAME },
  { id: 33, name: "顏鴻恩", engName: "Ms. Ngan Hung Yan", room: "107室英文房", ext: "326", initial: "HYN", dept: ROOM_B_NAME },
  { id: 34, name: "潘國權", engName: "Mr. Poon Kwok Kuen", room: "107室英文房", ext: "326", initial: "KKP", dept: ROOM_B_NAME },
  { id: 35, name: "貝秀", engName: "Ms. Pui Sau Ching", room: "107室英文房", ext: "326", initial: "SCP", dept: ROOM_B_NAME },
  { id: 36, name: "石心兒", engName: "Ms. Shek Sum Yi", room: "107室英文房", ext: "326", initial: "SYS", dept: ROOM_B_NAME },
  { id: 37, name: "蕭偉恒", engName: "Mr. Siu Wai Hang", room: "107室英文房", ext: "326", initial: "WHS", dept: ROOM_B_NAME },
  { id: 38, name: "蘇詩雅", engName: "Ms. So Sheila", room: "107室英文房", ext: "326", initial: "SS", dept: ROOM_B_NAME },
  { id: 39, name: "曾艷藝", engName: "Ms. Tsang Yin Ngai", room: "107室英文房", ext: "326", initial: "YNT", dept: ROOM_B_NAME },
  { id: 40, name: "胡偉廉", engName: "Mr. Wu William", room: "107室英文房", ext: "326", initial: "ww", dept: ROOM_B_NAME },
  { id: 41, name: "甄偉恆", engName: "Mr. Yan Wai Hang", room: "107室英文房", ext: "326", initial: "WHY", dept: ROOM_B_NAME },
  { id: 42, name: "葉文駿", engName: "Mr. Yip Man Chun", room: "107室英文房", ext: "326", initial: "JY", dept: ROOM_B_NAME },
  { id: 43, name: "楊雅雯", engName: "Ms. Yeung Nga Man", room: "107室英文房", ext: "326", initial: "NMY", dept: ROOM_B_NAME },

  // Room C (108室, 數理房)
  { id: 44, name: "陳灝怡", engName: "Ms. Chan Ho Yi", room: "108室數理房 (327)", ext: "327", initial: "HYC", dept: ROOM_C_NAME },
  { id: 45, name: "陳嘉兒", engName: "Ms. Chan Ka Yi", room: "108室數理房", ext: "327", initial: "KYC", dept: ROOM_C_NAME },
  { id: 46, name: "陳旻", engName: "Ms. Chan Man", room: "108室數理房", ext: "327", initial: "MC", dept: ROOM_C_NAME },
  { id: 47, name: "秦文強", engName: "Mr. Chun Man Keung", room: "108室數理房", ext: "327", initial: "MKC", dept: ROOM_C_NAME },
  { id: 48, name: "許英華", engName: "Mr. Hui Ying Wa", room: "108室數理房", ext: "327", initial: "YWH", dept: ROOM_C_NAME },
  { id: 49, name: "賴浩恩", engName: "Ms. Lai Ho Yan", room: "108室數理房", ext: "327", initial: "KL", dept: ROOM_C_NAME },
  { id: 50, name: "林嘉嘉", engName: "Ms. Lam Ka Ka", room: "108室數理房", ext: "327", initial: "KKL", dept: ROOM_C_NAME },
  { id: 51, name: "林穎嘉", engName: "Ms. Lam Wing Ka", room: "108室數理房", ext: "327", initial: "WKL", dept: ROOM_C_NAME },
  { id: 52, name: "劉鎮僑", engName: "Mr. Lau Chun Kiu", room: "108室數理房", ext: "327", initial: "CKL", dept: ROOM_C_NAME },
  { id: 53, name: "劉達志", engName: "Mr. Lau Tat Chi", room: "108室數理房", ext: "327", initial: "JL", dept: ROOM_C_NAME },
  { id: 54, name: "劉沅桐", engName: "Ms. Lau Yuen Tung", room: "108室數理房", ext: "327", initial: "YTL", dept: ROOM_C_NAME },
  { id: 55, name: "李麗禎", engName: "Ms. Lei Lai Ching", room: "108室數理房", ext: "327", initial: "LCL", dept: ROOM_C_NAME },
  { id: 56, name: "梁健民", engName: "Mr. Leung Kin Man", room: "108室數理房", ext: "327", initial: "KML", dept: ROOM_C_NAME },
  { id: 57, name: "黎杏儀", engName: "Ms. Li Hang Yee", room: "108室數理房", ext: "327", initial: "EL", dept: ROOM_C_NAME },
  { id: 58, name: "李婉盈", engName: "Ms. Li Yuen Ying", room: "108室數理房", ext: "327", initial: "YYL", dept: ROOM_C_NAME },
  { id: 59, name: "呂青揚", engName: "Mr. Lui Ching Yeung", room: "108室數理房", ext: "327", initial: "CYL", dept: ROOM_C_NAME },
  { id: 60, name: "羅蕾", engName: "Ms. Luo Lei", room: "108室數理房", ext: "327", initial: "LL", dept: ROOM_C_NAME },
  { id: 61, name: "蕭淑芬", engName: "Ms. Siu Shuk Fan", room: "108室數理房", ext: "327", initial: "SFS", dept: ROOM_C_NAME },
  { id: 62, name: "鄧淑明", engName: "Ms. Tang Suk Ming", room: "108室數理房", ext: "327", initial: "SMT", dept: ROOM_C_NAME },
  { id: 63, name: "謝昌達", engName: "Mr. Tse Cheong Tat", room: "108室數理房", ext: "327", initial: "CTT", dept: ROOM_C_NAME },
  { id: 64, name: "楊浩鈞", engName: "Mr. Yeung Ho Kwan", room: "108室數理房", ext: "349", initial: "HKY", dept: ROOM_C_NAME },

  // 圖書館
  { id: 65, name: "馮嘉寶", engName: "Ms. Fung Ka Po", room: "Library", ext: "331", initial: "KPF", dept: "圖書館" },
  { id: 66, name: "林意冰", engName: "Ms. Lam Yee Ping", room: "Library", ext: "331", initial: "YPL", dept: "圖書館" },

  // 實驗室
  { id: 67, name: "曹洪權", engName: "Mr. Cho Hung Kuen", room: "4/F Prep Room", ext: "333", initial: "HKC", dept: "實驗室" },
  { id: 68, name: "徐春莹", engName: "Ms. Xu Chunying", room: "5/F Prep Room", ext: "334", initial: "CYX", dept: "實驗室" },

  // G03
  { id: 69, name: "郭仕源", engName: "Mr. Kwok Shi Yuen", room: "Room G03", ext: "348", initial: "SYK", dept: "G03" },
  { id: 70, name: "林海輝", engName: "Mr. Lam Hoi Fai", room: "Room G03", ext: "346", initial: "HFL", dept: "G03" },
  { id: 71, name: "林仟豐", engName: "Mr. Johnny Lam", room: "Room G03", ext: "347", initial: "TFL", dept: "G03" },
  { id: 72, name: "袁雋鴻", engName: "Mr. Geoffrey Yuen", room: "Room G03", ext: "350", initial: "GY", dept: "G03" },

  // 行政
  { id: 73, name: "洪澍", engName: "Mr. Hung Shu", room: "校長室", ext: "311", initial: "SH", dept: "行政" },
  { id: 74, name: "丁敏儀", engName: "Ms. Ting Man Yee", room: "副校長室", ext: "312", initial: "MYT", dept: "行政" },
  { id: 75, name: "顏昭洋", engName: "Mr. Ngan Chiu Yeung", room: "副校長室", ext: "312", initial: "CYN", dept: "行政" },
  { id: 76, name: "羅寶恩", engName: "Ms. Law Po Yan", room: "副校長室", ext: "312", initial: "PYL", dept: "行政" },

  // 校務處
  { id: 77, name: "袁子穎", engName: "Ms. Stephanie Yuen", room: "校務處", ext: "338", initial: "SY", dept: "校務處" },
  { id: 78, name: "譚詠升", engName: "Mr. Tham Wing Sing", room: "校務處", ext: "313", initial: "WST", dept: "校務處" },
  { id: 79, name: "李凱欣", engName: "Ms. Michelle Lee", room: "校務處", ext: "315", initial: "ML", dept: "校務處" },
  { id: 80, name: "簡佩佩", engName: "Ms. Jessica Kan", room: "校務處", ext: "316", initial: "JK", dept: "校務處" },
  { id: 81, name: "張紫珊", engName: "Ms. Cheung Tsz Shan", room: "校務處", ext: "317", initial: "TSC", dept: "校務處" },
  { id: 82, name: "劉國熙", engName: "Mr. Hayes Lau", room: "校務處", ext: "318", initial: "HL", dept: "校務處" },

  // 輔導/社工
  { id: 83, name: "周小箋", engName: "Ms. Chow Siu Chin", room: "Guidance Room", ext: "320", initial: "SCC", dept: "輔導" },
  { id: 84, name: "莊玉蘭", engName: "Ms. Chong Yuk Lan", room: "Guidance Room", ext: "320", initial: "EC", dept: "輔導" },
  { id: 85, name: "余嘉儀", engName: "Ms. Yu Ka Yee", room: "Guidance Room", ext: "320", initial: "KYY", dept: "輔導" },
  { id: 86, name: "廖康年", engName: "Mr. Liu Hong Lin", room: "社工室", ext: "321", initial: "HLL", dept: "社工" },
  { id: 87, name: "陳家傑", engName: "Mr. Chan Ka Kit", room: "社工室", ext: "332", initial: "KKC", dept: "社工" },
  { id: 88, name: "謝朗齡", engName: "Ms. Tse Long Ling", room: "社工室", ext: "336", initial: "LLT", dept: "社工" },
  { id: 89, name: "鄧卓彤", engName: "Ms. Tang Cheuk Tung", room: "社工室", ext: "340", initial: "CTT", dept: "社工" },

  // 特別室
  { id: 90, name: "School Chaplain", engName: "1/F Chaplain", room: "Special Room", ext: "323", initial: "", dept: "特別室" },
  { id: 91, name: "Interview Room", engName: "3/F Interview", room: "Special Room", ext: "324", initial: "", dept: "特別室" },
  { id: 92, name: "Reception Room", engName: "G04 Reception", room: "Special Room", ext: "337", initial: "", dept: "特別室" },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('全部');
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const savedAuth = localStorage.getItem('staff_auth_v7');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (window.btoa(passwordInput) === ENCODED_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('staff_auth_v7', 'true');
      setError('');
    } else {
      setError('密碼錯誤');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('staff_auth_v7');
  };

  // 這裡就是提取分類按鈕的地方
  const categories = useMemo(() => {
    const cats = initialStaffData.map(s => s.dept);
    return ['全部', ...new Set(cats)];
  }, []);

  const filteredData = useMemo(() => {
    return initialStaffData.filter(staff => {
      const searchStr = `${staff.name} ${staff.engName} ${staff.room} ${staff.ext} ${staff.initial} ${staff.dept}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === '全部' || staff.dept === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  const getPhotoUrl = (initial) => {
    if (!initial) return null;
    const fileId = DRIVE_MAP[initial];
    if (!fileId) return null;
    return `https://lh3.googleusercontent.com/u/0/d/${fileId}=w400-h400-p-k-no`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-black">職員通訊錄</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xl"
              placeholder="請輸入密碼"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl">進入系統</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-black text-slate-900">職員通訊錄</h1>
          <button onClick={handleLogout} className="text-slate-400 font-bold text-xs uppercase">登出</button>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow-sm mb-10 sticky top-4 z-30 border border-slate-100">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜尋姓名、簡稱、分機..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* 分類按鈕區域 */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((staff) => {
            const photoUrl = getPhotoUrl(staff.initial);
            const hasErr = imageErrors[staff.id] || !photoUrl;
            return (
              <div key={staff.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col">
                <div className="h-48 bg-slate-100 relative">
                  {!hasErr ? (
                    <img 
                      src={photoUrl} 
                      className="w-full h-full object-cover" 
                      onError={() => setImageErrors(v => ({ ...v, [staff.id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <User size={48} />
                    </div>
                  )}
                  {staff.initial && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-blue-600 shadow-sm border border-blue-50">
                      {staff.initial}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 leading-none">{staff.name}</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-tight">{staff.engName}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <MapPin size={14} className="text-blue-500" /> {staff.room}
                    </div>
                    <div className="flex items-center gap-2 text-lg font-black text-slate-900">
                      <Phone size={14} className="text-green-500" /> {staff.ext}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-300 uppercase">{staff.dept}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;