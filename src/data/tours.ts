/* The owner is supplying the real tour list with its prices and departure
   dates. Until it arrives every entry below is a demonstration tour: it
   describes a journey we can actually plan from Belagavi, and it carries no
   price, no date, no seat count, no rating and no review count, because none of
   those has been supplied. `demo` is what drives the label on every card. */

export type Tour = {
  slug: string
  name: string
  /** Where the journey goes, in the visitor's words. */
  places: string
  nights: number
  days: number
  group: 'domestic' | 'international' | 'pilgrimage'
  /** The one thing this departure is built around. */
  bestFor: string
  image: string
  imageAlt: string
  summary: string
  highlights: string[]
  itinerary: {
    day: string
    title: string
    body: string
    /** The printed plan's own blocks, headed the way the flyer heads them. */
    blocks?: { label: string; items: string[] }[]
    /** The photograph for this day. Left off, the day falls back to the
     *  place-keyed library below, and then to the tour's own cover. */
    image?: string
    imageAlt?: string
  }[]
  /** The towns and cities a coach picks travellers up from, where the office
   *  has printed them on the flyer. Absent when the booking point is Belagavi. */
  boardingPoints?: string[]
  /** Null until the owner supplies them — never invented. */
  priceFrom: number | null
  /** What that price covers, in the office's own words, when a figure is shown. */
  priceFromNote?: string
  /** The second room basis the brochures quote, where the tour has one. */
  priceOther?: { label: string; amount: number } | null
  /** An ISO date once a confirmed departure exists, the office's wording before. */
  nextDeparture: string | null
  seatsLeft: number | null
  /** Set when the office has printed a flyer for this tour; those two are the
   *  ones the home page leads with. The wording is the flyer's own. */
  flyer?: { headline: string; note: string }
}

export type Category = {
  name: string
  to: string
  note: string
  image?: string
  /** Omitted when no photograph of that destination is in the library. */
  imageAlt?: string
}

export const tours: Tour[] = [
  /* The two journeys the Belagavi office has actually published, from its own
     printed brochures: the South India temple circuit and the North India
     pilgrimage. Their dates and prices are the office's, not ours. */
  {
    slug: 'south-india-temple-circuit',
    name: 'South India Yatra',
    places:
      'Srisailam · Chidambaram · Palani · Mantralayam · Kanchipuram · Rameshwaram · Kanyakumari · Madurai · Thiruvananthapuram',
    nights: 12,
    days: 13,
    group: 'domestic',
    bestFor: 'Temple groups travelling by coach',
    image: '/images/brihadeeswarar-temple-in-thanjavur.webp',
    imageAlt: 'The granite vimana of the Brihadeeswarar temple at Thanjavur rising over its courtyard',
    summary:
      'Thirteen days and twenty temple towns across five states, run as one pushback-coach circuit from Belagavi so nobody changes vehicles or hotels more than the route demands.',
    highlights: [
      'Srisailam, Chidambaram, Palani and Mantralayam on one circuit',
      'The Vellore golden temple, Kanchipuram and the Kamakshi temple',
      'The Brihadeeswarar temple at Thanjavur, its tower raised from a single stone block',
      'Rameshwaram, Kanyakumari and the Chamundeshwari betta at Mysuru',
      'Accommodation, a tour manager, a pushback bus and food through the journey',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Mantralayam',
        body: 'Night journey from Belagavi to Mantralayam by bus.',
      },
      {
        day: 'Day 2',
        title: 'Mantralayam and Srisailam',
        body: 'Early morning Mantralayam temple darshan. After breakfast, drive to Srisailam. Night stay in Srisailam.',
      },
      {
        day: 'Day 3',
        title: 'Srisailam and Mahanandi',
        body: 'Morning Srisailam temple darshan. After lunch, drive to Mahanandi. Evening Mahanandi darshan. Night stay in Mahanandi.',
      },
      {
        day: 'Day 4',
        title: 'Vellore and Kanchipuram',
        body: 'Early morning visit to Golden Temple (Sripuram, Vellore). Afternoon darshan. Drive to Kanchipuram. Night stay in Kanchipuram.',
      },
      {
        day: 'Day 5',
        title: 'Kanchipuram to Vaitheeswaran Koil',
        body: 'Visit Kamakshi Amman Temple and Varadaraja Perumal Temple (Vishnu Kanchi). Drive to Chidambaram. Evening Nataraja Temple darshan. Continue journey to Vaitheeswaran Koil. Overnight stay in Vaitheeswaran Koil.',
      },
      {
        day: 'Day 6',
        title: 'Vaitheeswaran Koil to Rameswaram',
        body: 'Morning Vaitheeswaran Temple darshan. Visit temples in Kumbakonam. Afternoon Brihadeeswarar Temple darshan in Thanjavur. Drive to Rameswaram. Night stay in Rameswaram.',
        image: '/images/thanjavur-brihadeeswarar-nandi.webp',
        imageAlt:
          'The Brihadeeswarar temple at Thanjavur in low evening light, its stone vimana rising behind the colonnade and a carved Nandi bull',
      },
      {
        day: 'Day 7',
        title: 'Return to Belagavi',
        body: 'Full-day Rameswaram temple darshan and sightseeing (Private vehicle charges for local sightseeing to be borne by pilgrims) Night journey to Thiruvananthapuram (₹1,200/- extra per person for this optional extension)',
      },
      {
        day: 'Day 8',
        title: 'Thiruvananthapuram and Kanyakumari',
        body: 'Early morning Anantha Padmanabha Swamy Temple darshan. Drive to Kanyakumari. Reach by evening. Night stay in Kanyakumari.',
      },
      {
        day: 'Day 9',
        title: 'Kanyakumari',
        body: 'Full-day Kanyakumari sightseeing and shopping. Night stay in Kanyakumari.',
      },
      {
        day: 'Day 10',
        title: 'Kanyakumari to Madurai and Palani',
        body: 'Early morning drive to Madurai. Meenakshi Temple darshan. Post-lunch drive to Palani. Night stay in Palani.',
      },
      {
        day: 'Day 11',
        title: 'Palani to Male Mahadeshwara Betta',
        body: 'Early morning Palani Murugan Temple darshan. Drive to Male Mahadeshwara Betta. Overnight stay at MM Hills.',
      },
      {
        day: 'Day 12',
        title: 'MM Hills to Nanjangud and Mysuru',
        body: 'Early morning Nanjangud temple darshan. Visit Mysore Palace and Chamundi Hill. Overnight stay in Mysuru.',
      },
      {
        day: 'Day 13',
        title: 'Return to Belagavi',
        body: 'Early morning journey from Mysuru to Belagavi. Tour concludes with blessings and sweet memories.',
      },
    ],
    priceFrom: 16800,
    priceFromNote: 'Per person in a common hall, on the 11 November 2026 departure',
    priceOther: { label: 'Four Sharing', amount: 22500 },
    nextDeparture: '11 November 2026',
    seatsLeft: null,
  },
  {
    slug: 'north-india-yatra',
    name: 'North India Pilgrimage',
    places:
      'Prayagraj · Ayodhya · Varanasi · Ramtek · Bhedaghat · Parli Vaijnath · Aundha Nagnath · Pandarpur · Tuljapur · Shirdi',
    nights: 9,
    days: 10,
    group: 'domestic',
    bestFor: 'Pilgrimage groups and senior citizen groups',
    image: '/images/kashi-ganga-ghats-varanasi.webp',
    imageAlt: 'Boats moored along the stepped ghats of the Ganga at Varanasi',
    summary:
      'Prayagraj, Ayodhya and Kashi first, then the Maharashtra temple towns on the way home — nine nights by pushback coach, with the office confirming the boarding point nearest your town.',
    highlights: [
      'Sangam at Prayagraj, Ram Janmabhoomi at Ayodhya and Kashi Vishwanath',
      'Parli Vaijnath, Aundha Nagnath and the Tuljapur temple',
      'Ramtek and the Bhedaghat marble rocks at Jabalpur',
      'Pandarpur and Shirdi on the last two days of the circuit',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Prayagraj',
        body: 'Report in Belagavi and travel north, for the Sangam at Prayagraj and Anand Bhawan.',
      },
      {
        day: 'Day 3–4',
        title: 'Ayodhya and Varanasi',
        body: 'Ram Janmabhoomi and Hanuman Garhi at Ayodhya, then Kashi Vishwanath and the evening Ganga Aarti at Varanasi.',
      },
      {
        day: 'Day 5–6',
        title: 'Ramtek and Bhedaghat',
        body: 'The Ramtek temple, with the marble rocks and the Dhuandhar falls at Bhedaghat.',
      },
      {
        day: 'Day 7–8',
        title: 'Parli Vaijnath and Aundha Nagnath',
        body: 'Two of the Maharashtra jyotirlingas, with a night halt between them.',
      },
      {
        day: 'Day 9–10',
        title: 'Pandarpur, Tuljapur and Shirdi',
        body: 'Pandarpur and Tuljapur, then Sai darshan at Shirdi before the last drive back to Belagavi.',
      },
    ],
    priceFrom: 17700,
    priceFromNote: 'Per person, on the 12 November 2026 departure',
    priceOther: null,
    nextDeparture: '12 November 2026',
    seatsLeft: null,
  },
  /* The flyer shelf. Each of these carries the printed flyer's own wording — the
     batches and last booking date on Shimla–Manali, the departure date and the
     two room rates on the Gujarat jyotirlinga yatra, the two fares on the South
     India circuit, the Kashi subsidy note on the North India tour, the travel
     month and the all-inclusive fare on the North East. They are what this
     section leads with, because a visitor can book from them today. */
  {
    slug: 'shimla-manali-dhamaka',
    name: 'Shimla and Manali',
    places: 'Belagavi · Delhi · Shimla · Kufri · Manali · Solang Valley · Kullu',
    nights: 9,
    days: 10,
    group: 'domestic',
    bestFor: 'Families and couples chasing the snow',
  boardingPoints: ['Belagavi'],
    image: '/images/shimla-manali-snow-village.webp',
    imageAlt: 'Snow-covered wooden houses and pine slopes in a Himachal hill village',
    summary:
      'The winter journey the office prints a flyer for every year: two nights in Shimla, three in Manali, nine nights from Belagavi back to Belagavi, and the sightseeing already in the fare.',
    highlights: [
      'Mall Road and the Ridge at Shimla, with Kufri and its snow point',
      'Solang valley, the Hadimba temple and Manali local sightseeing',
      'Two sharing in a 3-star hotel for all nine nights',
      'All transportation from Belagavi to Belagavi, with sightseeing included',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Delhi',
        body: 'Departure from Belagavi at 7.45 p.m. Report at the boarding point with your ticket and ID, an hour before the coach leaves.',
        blocks: [
          {
            label: 'Evening 7.45 p.m.',
            items: [
              'Report at the Belagavi boarding point by 6.45 p.m.',
              'Coach leaves Belagavi at 7.45 p.m. for Delhi.',
            ],
          },
        ],
      },
      {
        day: 'Day 2',
        title: 'Full-day train journey to Delhi',
        body: 'A full day of travel towards Delhi, with meal halts on the way and the tour manager with the group throughout.',
      },
      {
        day: 'Day 3',
        title: 'Delhi to Shimla',
        body: 'Delhi arrival at 6.30 a.m. Pickup from Delhi and transfer to Shimla. Overnight stay in Shimla.',
      },
      {
        day: 'Day 4',
        title: 'Shimla and Kufri',
        body: 'Mall Road, the Ridge and Christ Church, then a morning at Kufri for the snow point and the horse rides.',
        blocks: [
          {
            label: 'After breakfast',
            items: [
              'Full day at Shimla and Kufri.',
              'Mall Road, the Ridge, Christ Church and the Kufri snow point.',
              'Overnight stay at Shimla.',
            ],
          },
        ],
      },
      {
        day: 'Day 5',
        title: 'Shimla to Manali',
        body: 'Check-out after breakfast and transfer to Manali, with Kullu and its shawl workshops on the way. Overnight stay at Manali.',
        blocks: [
          {
            label: 'After breakfast',
            items: [
              'Check-out after breakfast and transfer to Manali.',
              'Kullu and its shawl workshops on the way, with a halt at Pandoh.',
              'Overnight stay at Manali.',
            ],
          },
        ],
      },
      {
        day: 'Day 6',
        title: 'Manali local sightseeing',
        body: 'Manali local sightseeing — the Hadimba temple, the Vashisht temple, Van Vihar and the Tibetan monastery. Solang valley is added on the days the road is open and the office confirms it with the ticket. Overnight stay at Manali.',
        blocks: [
          {
            label: 'After breakfast',
            items: [
              'Manali local sightseeing: Hadimba temple, Vashisht temple, Van Vihar and the Tibetan monastery.',
              'Overnight stay at Manali.',
            ],
          },
        ],
      },
      {
        day: 'Day 7',
        title: 'Manali leisure day',
        body: 'Breakfast and a full day at leisure for personal activities and shopping. Overnight stay at Manali.',
        blocks: [
          {
            label: 'After breakfast',
            items: [
              'Manali leisure day.',
              'Breakfast and full day at leisure for personal activities and shopping.',
              'Overnight stay at Manali.',
            ],
          },
        ],
      },
      {
        day: 'Day 8',
        title: 'Manali to Chandigarh drop',
        body: 'After breakfast, check-out and transfer to Chandigarh for the drop.',
        blocks: [
          {
            label: 'After breakfast',
            items: [
              'Manali — check-out after breakfast.',
              'Transfer to Chandigarh for the drop.',
            ],
          },
        ],
      },
      {
        day: 'Day 9',
        title: 'Chandigarh to Belagavi journey',
        body: 'The return leg begins: departure from Chandigarh at 3.35 a.m.',
        blocks: [
          {
            label: 'Journey',
            items: [
              'Chandigarh to Belagavi — departure from Chandigarh at 3.35 a.m.',
            ],
          },
        ],
      },
      {
        day: 'Day 10',
        title: 'Chandigarh to Belagavi',
        body: 'We reach Belagavi at 6.30 p.m.',
        blocks: [
          {
            label: 'Journey',
            items: ['We reach Belagavi at 6.30 p.m.'],
          },
        ],
      },
    ],
    /** Days 4–10 are the Himachal half of the journey and the run home as the office
     *  prints it; the Delhi legs and the reporting time sit with the office and are
     *  confirmed with the ticket. Nothing here is dated or quoted as a price. */
    priceFrom: 15999,
    priceFromNote:
      'Per person on two sharing in a 3-star hotel, on the flyer batches of 12 December and 5 January',
    priceOther: null,
    nextDeparture: '12 December / 5 January, two batches',
    seatsLeft: null,
    flyer: { headline: 'Dhamaka offer', note: 'Booking last date 2 November' },
  },
  {
    slug: 'puri-jagannath-gangasagar',
    name: 'Puri, Ganga Sagar and Kashi',
    places:
      'Jagannath Puri · Bhubaneswar · Kolkata · Ganga Sagar · Varanasi · Prayagraj · Gaya · Bodhgaya · Konark · Sakhi Gopal · Hyderabad · Ramoji Film City · Annavaram · Simhachalam · Ramtek · Shegaon · Shirdi',    nights: 15,
    days: 16,
    group: 'pilgrimage',
    bestFor: 'Pilgrimage groups, and families travelling with elders',
    image: '/images/kashi-ganga-ghats-varanasi.webp',
    imageAlt: 'Boats along the stepped river ghats on the eastern pilgrimage route',
    summary:
      'Sixteen days from Jagannath Puri across to Ganga Sagar and back through Kashi and Shirdi — the widest pilgrimage circuit on our shelf, and the one the printed flyer carries the most places on.',
    highlights: [
      'Jagannath darshan at Puri, with Sakhi Gopal, Konark and Bhubaneswar',
      'Ganga Sagar and a day around Kolkata',
      'Gaya, Bodhgaya, Kashi and Prayagraj on the way back',
      'Ramoji Film City, Annavaram, Simhachalam, Ramtek, Shegaon and Shirdi',
    ],
    itinerary: [
      {
        day: 'Day 1–3',
        title: 'Belagavi to Puri',
        body: 'Travel east to Puri for Jagannath temple darshan, with Sakhi Gopal and the shore at Puri.',
      },
      {
        day: 'Day 4',
        title: 'Konark and Bhubaneswar',
        body: 'The Konark sun temple, then the Bhubaneswar temple group and the Lingaraj shrine.',
      },
      {
        day: 'Day 5–6',
        title: 'Kolkata and Ganga Sagar',
        body: 'Kolkata city sightseeing, then the crossing to Ganga Sagar for the Kapil Muni temple.',
      },
      {
        day: 'Day 7–8',
        title: 'Gaya and Bodhgaya',
        body: 'The Vishnupad temple at Gaya and the Mahabodhi temple at Bodhgaya.',
      },
      {
        day: 'Day 9–10',
        title: 'Varanasi and Prayagraj',
        body: 'Kashi Vishwanath darshan and the Ganga aarti, then the Sangam at Prayagraj.',
      },
      {
        day: 'Day 11–12',
        title: 'Hyderabad, Ramoji Film City and Annavaram',
        body: 'A day at Ramoji Film City, then Annavaram and Simhachalam on the Andhra temple stretch.',
      },
      {
        day: 'Day 13–14',
        title: 'Ramtek and Shegaon',
        body: 'The Ramtek temple in Maharashtra, then Gajanan Maharaj darshan at Shegaon.',
      },
      {
        day: 'Day 15–16',
        title: 'Shirdi and the drive home',
        body: 'Sai darshan at Shirdi, then the last drive back to Belagavi.',
      },
    ],
    priceFrom: 29500,
    priceFromNote:
      'Per person on four sharing, on the 23 November 2026 departure, with breakfast, lunch and dinner through the journey',
    priceOther: { label: 'Two sharing a room', amount: 36000 },
    nextDeparture: '23 November 2026',
    seatsLeft: null,
    flyer: { headline: 'Puri, Ganga Sagar and Kashi', note: '15 nights / 16 days' },
  },
  {
    slug: 'bhutan-yatra',
    name: 'Bhutan',
    places: 'Phuentsholing · Thimphu · Paro · Punakha',
    nights: 5,
    days: 6,
    group: 'international',
    bestFor: 'Families and groups wanting a short first trip abroad',
    image: '/images/bhutan-paro-valley-monastery.webp',
    imageAlt: 'A white monastery with red and gold roofs above a pine-covered Bhutanese valley',
    summary:
      'The Kingdom of Bhutan on its own, at a pace a family can keep — the Paro valley first, then Thimphu and Punakha, with the permit and the Sustainable Development Fee arranged by the office.',
    highlights: [
      'The walk to Taktsang, the Tiger’s Nest, with the valley floor as the alternative',
      'Thimphu’s memorial chorten, the Buddha Dordenma and the weekend market',
      'Punakha dzong at the meeting of the two rivers',
      'Dochula pass and its 108 chortens on the Thimphu to Punakha road',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Thimphu',
        body: 'Fly to the Bhutan border, complete the permit formalities at Phuentsholing, and drive up to Thimphu.',
      },
      {
        day: 'Day 3',
        title: 'Thimphu',
        body: 'The memorial chorten, the Buddha Dordenma and the Takin preserve, with the craft market in the evening.',
      },
      {
        day: 'Day 4',
        title: 'Dochula to Punakha',
        body: 'The Dochula pass with its 108 chortens, then Punakha dzong and the suspension bridge across the river.',
      },
      {
        day: 'Day 5',
        title: 'Paro and the Tiger’s Nest',
        body: 'The Paro valley, with the walk up to Taktsang monastery for those who want it and the valley floor for those who do not.',
      },
      {
        day: 'Day 6',
        title: 'Return to Belagavi',
        body: 'Transfer to the border, cross back into India and fly home.',
      },
    ],
    priceFrom: 64000,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'nepal-yatra',
    name: 'Nepal',
    places: 'Kathmandu · Pokhara · Chitwan · Nagarkot',
    nights: 7,
    days: 8,
    group: 'international',
    bestFor: 'Families, groups and pilgrims for Pashupatinath',
    image: '/images/nepal-phewa-lake-annapurna.webp',
    imageAlt: 'Boats on a lake with snow-covered Himalayan peaks behind them at Pokhara',
    summary:
      'Kathmandu’s temples, the Annapurna range over Phewa lake and a morning in Chitwan — with Pashupatinath darshan built into the first two days for groups travelling for it.',
    highlights: [
      'Pashupatinath, Boudhanath and Swayambhunath at Kathmandu',
      'Pokhara, Phewa lake and the Annapurna range at sunrise',
      'A jeep morning in Chitwan National Park, with the Tharu village after',
      'Sunrise over the Himalaya from Nagarkot on the way back',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Kathmandu',
        body: 'Fly to Kathmandu and check in, with Pashupatinath darshan, Boudhanath and the evening aarti.',
      },
      {
        day: 'Day 3',
        title: 'Kathmandu',
        body: 'Swayambhunath, the Durbar square and Patan, with an evening at Thamel.',
      },
      {
        day: 'Day 4–5',
        title: 'Pokhara',
        body: 'Drive to Pokhara for Phewa lake, the World Peace pagoda and the Annapurna range at sunrise.',
      },
      {
        day: 'Day 6',
        title: 'Chitwan',
        body: 'Drive down to Chitwan for a jeep safari morning in the national park and the Tharu village.',
      },
      {
        day: 'Day 7',
        title: 'Nagarkot',
        body: 'Drive back towards Kathmandu with the night at Nagarkot, for the Himalaya at sunrise.',
      },
      {
        day: 'Day 8',
        title: 'Return to Belagavi',
        body: 'Bhaktapur and Patan in the morning, then transfer to the airport and fly home.',
      },
    ],
    priceFrom: 57000,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'assam-arunachal-meghalaya',
    name: 'North East: Assam, Arunachal and Meghalaya',
    places:
      'Kaziranga · Brahmaputra cruise · Kamakhya · Tawang · Shillong · Cherrapunji · Dawki',
    nights: 10,
    days: 11,
    group: 'domestic',
    bestFor: 'Families, couples and groups wanting one long journey',
    image: '/images/kerala-backwaters-houseboat.webp',
    imageAlt: 'Green hills and water on a long road journey through the North East',
    summary:
      'Three states in one pushback coach — the Assam parks and temples, the passes and monasteries of Arunachal, and the living root bridges of Meghalaya, with the air tickets in the fare.',
    highlights: [
      'Kaziranga National Park and the Brahmaputra river cruise',
      'Kamakhya temple and the Majuli island tea gardens',
      'Tawang monastery, Sela pass, Bumla pass and Dirang valley',
      'Shillong, Cherrapunji, the living root bridges and the crystal-clear Dawki river',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Guwahati',
        body: 'Fly to Guwahati, with Kamakhya temple and the Brahmaputra river cruise on the first full day.',
      },
      {
        day: 'Day 3–4',
        title: 'Kaziranga and Majuli',
        body: 'A jeep morning in Kaziranga National Park, then the tea gardens and the ferry to Majuli island.',
      },
      {
        day: 'Day 5–6',
        title: 'Tezpur to Dirang',
        body: 'The road into Arunachal through Bhalukpong and Bomdila, with Dirang valley in the afternoon.',
      },
      {
        day: 'Day 7–8',
        title: 'Tawang',
        body: 'Sela pass and Nuranang falls on the climb, then the Tawang monastery and Bumla pass.',
      },
      {
        day: 'Day 9–10',
        title: 'Shillong and Cherrapunji',
        body: 'Fly down to Shillong, the Scotland of the East, with Cherrapunji, the living root bridges and the Dawki river the next day.',
      },
      {
        day: 'Day 11',
        title: 'Return to Belagavi',
        body: 'Transfer to the airport for the flight home.',
      },
    ],
    priceFrom: 71999,
    priceFromNote:
      'Per person on twin sharing, all-inclusive with flight tickets, on the November departure',
    priceOther: null,
    nextDeparture: '23 November 2026',
    seatsLeft: null,
    flyer: { headline: 'Three sisters, one epic journey', note: 'Flight tickets included' },
  },
  {
    slug: 'maldives-island-stay',
    name: 'Maldives Island Stay',
    places: 'Male · North Male Atoll · Hulhumale · Maafushi · Sandbank picnic',
    nights: 5,
    days: 6,
    group: 'international',
    bestFor: 'Honeymoon couples and small private groups',
    image: '/images/lakshadweep-coral-lagoon-boat.webp',
    imageAlt: 'A shallow turquoise lagoon with a white sandbank and a small boat moored offshore',
    summary:
      'Five nights in the atolls — a beach villa, a sandbank afternoon and a reef snorkelling trip — booked as an all-inclusive island stay from Belagavi, with visas, flights and the Male transfers arranged together.',
    highlights: [
      'Five nights in an island resort on a beach villa, on an all-inclusive meal plan',
      'A sandbank picnic and a snorkelling afternoon on the house reef',
      'A guided reef trip, with dolphin spotting on the evening cruise',
      'Male city and Hulhumale, with a sunset fishing evening if the group wants one',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Male',
        body: 'Fly from Belagavi via Bengaluru or Mumbai to Male. Speedboat transfer to the island resort, and the evening free on the beach.',
      },
      {
        day: 'Day 2',
        title: 'The island',
        body: 'A full day on the island — the lagoon, kayaks and the pool. A guided snorkelling session on the house reef in the afternoon.',
      },
      {
        day: 'Day 3',
        title: 'Sandbank and reef',
        body: 'Morning boat trip to a sandbank for a picnic and swim, with a reef stop on the way back. Evening dolphin cruise at sunset.',
      },
      {
        day: 'Day 4',
        title: 'Male and Hulhumale',
        body: 'Travel across to Male for the Friday mosque, the fish market and the old town, then on to Hulhumale for the afternoon.',
      },
      {
        day: 'Day 5',
        title: 'The island, at your pace',
        body: 'The last full day is the group\u2019s own — a spa afternoon, a sunset fishing trip or the water sports, all arranged at the resort desk.',
      },
      {
        day: 'Day 6',
        title: 'Return to Belagavi',
        body: 'Speedboat to Male and the flight home, reaching Belagavi the same night or the next morning depending on the connection.',
      },
    ],
    priceFrom: 68500,
    priceFromNote:
      'Per person on two sharing a beach villa, all-inclusive, on the departure the office confirms for your dates — return air fare from Belagavi, the visa on arrival, resort and speedboat transfers included. The resort and the season move this figure.',
    priceOther: { label: 'Child sharing with two adults', amount: 42900 },
    nextDeparture: 'Date on request — the office confirms the resort and the connection first',
    seatsLeft: null,
  },
  {
    slug: 'kashmir-valley',
    name: 'Kashmir Valley',
    places: 'Srinagar · Gulmarg · Pahalgam · Sonmarg',
    nights: 5,
    days: 6,
    group: 'domestic',
    bestFor: 'Families and honeymoon couples',
    image: '/images/kashmir-himalayan-valley.webp',
    imageAlt: 'A river valley between high Himalayan slopes under an open sky',
    summary:
      'A shikara morning on Dal Lake, the meadows at Gulmarg, and a night moored on a houseboat — the Kashmir journey most of our families ask for first.',
    highlights: [
      'Shikara ride on Dal Lake and a night on a houseboat in Srinagar',
      'Gulmarg gondola and the meadow at Pahalgam',
      'Sonmarg and the drive through the Sindh valley',
      'Mughal gardens and the old city walk in Srinagar',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Srinagar', body: 'Travel to Srinagar and check in to a houseboat on Dal Lake for the night.' },
      { day: 'Day 2', title: 'Srinagar gardens', body: 'Nishat and Shalimar gardens, Shankaracharya temple, and an evening shikara ride.' },
      { day: 'Day 3', title: 'Gulmarg', body: 'Full day at Gulmarg with the gondola, returning to Srinagar by evening.' },
      { day: 'Day 4', title: 'Pahalgam', body: 'Drive to Pahalgam via Awantipora, with Betaab valley and Aru in the afternoon.' },
      { day: 'Day 5', title: 'Sonmarg', body: 'Day trip to Sonmarg, with the evening free in Srinagar for shopping.' },
      { day: 'Day 6', title: 'Return to Belagavi', body: 'Transfer to the airport for the journey home.' },
    ],
    priceFrom: 28900,
    priceFromNote:
      'Per person on four sharing, on the 12 November 2026 departure — travel to Srinagar and back, five nights including the Dal Lake houseboat, breakfast and dinner, the shikara ride and the Gulmarg gondola. The houseboat category and the season move this figure; the office confirms the current rate.',
    priceOther: { label: 'Two sharing a room', amount: 34500 },
    nextDeparture: '12 November 2026',
    seatsLeft: null,
    flyer: { headline: 'Bookings open', note: 'Shikara and Gulmarg gondola included' },
  },
  /* The South India temple circuit the office is running as a deluxe coach
     departure: the same Tamil Nadu and Karnataka temple towns as the yatra
     above, but booked in deluxe rooms with all three meals, a tour guide
     through, and the four South Indian temples of the circuit on the list. */
  {
    slug: 'south-india-deluxe-tour',
    name: 'South India Deluxe Tour',
    places:
      'Vellore Golden Temple · Kanchipuram · Chidambaram · Thanjavur · Kumbakonam · Rameshwaram · Trivandrum · Jatayu · Kanyakumari · Madurai · Kodaikanal · Male Mahadeshwara · Nanjangud · Chamundi Hills',
    nights: 10,
    days: 11,
    group: 'domestic',
    bestFor: 'Temple groups travelling in deluxe rooms',
    image: '/images/brihadeeswarar-temple-in-thanjavur.webp',
    imageAlt:
      'The granite vimana of the Brihadeeswarar temple at Thanjavur rising over its courtyard',
    summary:
      'Eleven days and ten nights across the Tamil Nadu temple towns and the Kodaikanal hills, with deluxe rooms, breakfast, lunch and dinner through the journey and a tour guide with the group from the first morning to the last.',
    highlights: [
      'Five nights of the circuit in deluxe rooms, with breakfast, lunch and dinner included',
      'A tour guide with the group from departure to the drive home',
      'The Vellore Golden Temple, Kanchipuram, Chidambaram and Thanjavur',
      'Rameswaram, Kanyakumari and the Jatayu rock at Chadayamangalam',
      'Madurai, Kodaikanal, Male Mahadeshwara, Nanjangud and the Chamundi Hills',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to the Vellore Golden Temple',
        body: 'Night journey from Belagavi towards Vellore, travelling by deluxe AC coach with the tour guide on board.',
      },
      {
        day: 'Day 2',
        title: 'Vellore Golden Temple and Kanchipuram',
        body: 'Early morning darshan at the Golden Temple (Sripuram) at Vellore. Afternoon drive to Kanchipuram, with the Kamakshi Amman and Varadaraja Perumal temples. Night stay in Kanchipuram, deluxe room.',
      },
      {
        day: 'Day 3',
        title: 'Kanchipuram, Chidambaram and Vaitheeswaran Koil',
        body: 'Morning Kanchipuram temples, then the drive to Chidambaram for the Nataraja temple darshan in the evening. Overnight stay at Vaitheeswaran Koil.',
      },
      {
        day: 'Day 4',
        title: 'Kumbakonam and Thanjavur',
        body: 'The temples at Kumbakonam, then the Brihadeeswarar temple at Thanjavur after lunch. Night stay at Thanjavur, deluxe room.',
      },
      {
        day: 'Day 5',
        title: 'Thanjavur to Rameswaram',
        body: 'Drive to Rameswaram with the Ramanathaswamy temple darshan in the evening. Night stay in Rameswaram.',
      },
      {
        day: 'Day 6',
        title: 'Rameswaram and the drive south',
        body: 'Full-day Rameswaram temple darshan and sightseeing, with the temple corridors and the sea. Night journey towards Trivandrum.',
      },
      {
        day: 'Day 7',
        title: 'Trivandrum, Jatayu and Kanyakumari',
        body: 'Early morning Anantha Padmanabha Swamy temple darshan at Trivandrum. Drive south with a stop at the Jatayu earth centre, then on to Kanyakumari by evening. Night stay in Kanyakumari.',
      },
      {
        day: 'Day 8',
        title: 'Kanyakumari',
        body: 'Full-day Kanyakumari sightseeing and shopping, with the Vivekananda rock and the temple. Night stay in Kanyakumari.',
      },
      {
        day: 'Day 9',
        title: 'Madurai and Kodaikanal',
        body: 'Early morning drive to Madurai for the Meenakshi temple darshan, then the climb to Kodaikanal for the night. Overnight stay at Kodaikanal.',
      },
      {
        day: 'Day 10',
        title: 'Kodaikanal, Male Mahadeshwara and Nanjangud',
        body: 'Morning at Kodaikanal, then the drive north to Male Mahadeshwara Betta and Nanjangud, with the Chamundi Hills and Mysuru in the evening. Night stay in Mysuru.',
      },
      {
        day: 'Day 11',
        title: 'Return to Belagavi',
        body: 'Early morning journey from Mysuru to Belagavi. Tour concludes with blessings and sweet memories.',
      },
    ],
    priceFrom: 31500,
    priceFromNote: 'Per person on two sharing in a deluxe room, on the 5 December 2026 departure',
    priceOther: null,
    nextDeparture: '5 December 2026',
    seatsLeft: null,
    flyer: { headline: 'Bookings open', note: 'Deluxe rooms, all meals and a tour guide' },
  },
  {
    slug: 'kerala-backwaters',
    name: 'Kerala Backwaters and Coast',
    places: 'Kochi · Munnar · Thekkady · Alleppey · Kovalam',
    nights: 7,
    days: 8,
    group: 'domestic',
    bestFor: 'Families and first-time South India travellers',
    image: '/images/kerala-backwaters-houseboat.webp',
    imageAlt: 'A houseboat on a palm-lined Kerala backwater canal',
    summary:
      'Tea country in Munnar, a night on an Alleppey houseboat and two days by the Arabian Sea — the gentlest introduction to the south for anyone travelling from Belagavi.',
    highlights: [
      'A night aboard a houseboat on the Alleppey backwaters',
      'Munnar tea estates and the Eravikulam park',
      'Periyar wildlife boat ride at Thekkady',
      'Kovalam beach and a Kathakali performance in Kochi',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Kochi', body: 'Arrive in Kochi and check in; evening at the Chinese fishing nets and Fort Kochi.' },
      { day: 'Day 2', title: 'Kochi to Munnar', body: 'Drive to Munnar through the spice hills, with the afternoon at leisure.' },
      { day: 'Day 3', title: 'Munnar', body: 'Tea museum, Eravikulam National Park and Mattupetty dam.' },
      { day: 'Day 4', title: 'Munnar to Thekkady', body: 'Drive down to Thekkady with a spice plantation visit on the way.' },
      { day: 'Day 5', title: 'Thekkady to Alleppey', body: 'Periyar boat ride in the morning, then board the houseboat at Alleppey.' },
      { day: 'Day 6', title: 'Alleppey to Kovalam', body: 'Disembark after breakfast and drive to the coast at Kovalam.' },
      { day: 'Day 7', title: 'Kovalam', body: 'A full day at the beach with Kanyakumari or Trivandrum as an option.' },
      { day: 'Day 8', title: 'Return to Belagavi', body: 'Transfer to the airport for the journey home.' },
    ],
    priceFrom: null,
    nextDeparture: '12 November 2026',
    seatsLeft: null,
  },
  {
    slug: 'char-dham-yatra',
    name: 'Char Dham Yatra',
    places: 'Yamunotri · Gangotri · Kedarnath · Badrinath',
    nights: 11,
    days: 12,
    group: 'pilgrimage',
    bestFor: 'Pilgrims travelling with family elders',
    image: '/images/kashmir-himalayan-valley.webp',
    imageAlt: 'The Garhwal Himalaya near the Char Dham route in Uttarakhand',
    summary:
      'The four shrines in one journey, with the walking stages kept short and the day planned around the elders in the group rather than the clock.',
    highlights: [
      'All four dhams with the road stages broken overnight',
      'Pony, palki and helicopter options arranged for the Kedarnath climb',
      'A darshan slot planned for the early morning where the temple allows it',
      'A pure-vegetarian menu throughout, with Jain options on request',
    ],
    itinerary: [
      { day: 'Day 1–2', title: 'Belagavi to Haridwar', body: 'Travel to Haridwar with Ganga Aarti at Har Ki Pauri in the evening.' },
      { day: 'Day 3–4', title: 'Yamunotri', body: 'Drive to Barkot, then the day trip to Yamunotri with the walk or a pony.' },
      { day: 'Day 5–6', title: 'Gangotri', body: 'Drive to Uttarkashi and on to Gangotri for darshan, returning to Uttarkashi.' },
      { day: 'Day 7–8', title: 'Kedarnath', body: 'Drive to Guptkashi, then the climb to Kedarnath and back with overnight at the shrine.' },
      { day: 'Day 9–10', title: 'Badrinath', body: 'Drive to Badrinath for darshan, with Mana village and the Tapt Kund on the way.' },
      { day: 'Day 11–12', title: 'Return to Belagavi', body: 'Drive back to Haridwar and travel home.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'kashi-ayodhya-prayagraj',
    name: 'Kashi, Ayodhya and Prayagraj',
    places: 'Varanasi · Ayodhya · Prayagraj',
    nights: 4,
    days: 5,
    group: 'pilgrimage',
    bestFor: 'Short pilgrimages and senior citizen groups',
    image: '/images/kashi-ganga-ghats-varanasi.webp',
    imageAlt: 'Boats moored along the stepped ghats of the Ganga at Varanasi',
    summary:
      'Three of the most-visited shrines on one short route — the Kashi Vishwanath corridor, the Ram Janmabhoomi complex and the Sangam at Prayagraj.',
    highlights: [
      'Kashi Vishwanath darshan and the evening Ganga Aarti',
      'Ram Janmabhoomi and Hanuman Garhi at Ayodhya',
      'The Sangam at Prayagraj, with a boat ride',
      'A boat ride at dawn along the Varanasi ghats',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Varanasi', body: 'Arrive in Varanasi and check in; evening Ganga Aarti at Dashashwamedh.' },
      { day: 'Day 2', title: 'Varanasi', body: 'Kashi Vishwanath darshan, Kaal Bhairav, Sankat Mochan and Sarnath.' },
      { day: 'Day 3', title: 'Ayodhya', body: 'Drive to Ayodhya for Ram Janmabhoomi, Hanuman Garhi and Kanak Bhawan.' },
      { day: 'Day 4', title: 'Prayagraj', body: 'Drive to Prayagraj for the Sangam and Anand Bhawan, returning to Varanasi.' },
      { day: 'Day 5', title: 'Return to Belagavi', body: 'Morning aarti by boat, then transfer to the airport.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'ashtavinayak-darshan',
    name: 'Ashtavinayak Darshan',
    places: 'Pune · Morgaon · Siddhatek · Theur · Ranjangaon and four more',
    nights: 3,
    days: 4,
    group: 'pilgrimage',
    bestFor: 'Devotees travelling by bus',
    image: '/images/hampi-vijaya-vittala-temple.webp',
    imageAlt: 'Hand-carved stone pillars and a temple courtyard in Karnataka',
    summary:
      'All eight Ganpati temples in one road circuit from Belagavi, with the driving split so no day runs past what a coach group can comfortably do.',
    highlights: [
      'All eight Ashtavinayak temples in a single circuit',
      'A coach and driver who know the temple approach roads',
      'Accommodation close to the final night’s temple',
      'A Maharashtrian vegetarian menu, with prasad arrangements',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Morgaon', body: 'Drive to Morgaon with the first darshan and stop at Siddhatek on the way.' },
      { day: 'Day 2', title: 'Theur and Ranjangaon', body: 'Morning darshan at Theur, then Ranjangaon and on to Ozar.' },
      { day: 'Day 3', title: 'Lenyadri, Mahad and Pali', body: 'The hill shrine at Lenyadri, Mahad and Pali, with the night at Ranjangaon.' },
      { day: 'Day 4', title: 'Return to Belagavi', body: 'Final darshan and the drive home.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'shirdi-shani-shingnapur',
    name: 'Shirdi, Shani Shingnapur and Trimbakeshwar',
    places: 'Shirdi · Shani Shingnapur · Nashik',
    nights: 2,
    days: 3,
    group: 'pilgrimage',
    bestFor: 'Weekend groups and family elders',
    image: '/images/shirdi-temple-crowd-devotees.webp',
    imageAlt: 'Devotees gathered in a temple courtyard in Maharashtra',
    summary:
      'The shortest of our pilgrimage routes and the one that runs most often — a three-day coach circuit that a working family can take over a weekend.',
    highlights: [
      'Sai darshan at Shirdi across two days, with the morning aarti',
      'Shani Shingnapur and the Nashik-Trimbakeshwar temple',
      'A coach seat for the whole circuit with no changes',
      'Accommodation within walking distance of the Shirdi mandir',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Shirdi', body: 'Drive to Shirdi with the evening darshan and aarti.' },
      { day: 'Day 2', title: 'Shani Shingnapur and Nashik', body: 'Morning darshan, then Shani Shingnapur and Trimbakeshwar at Nashik.' },
      { day: 'Day 3', title: 'Return to Belagavi', body: 'Final darshan at Shirdi before the drive home.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'thailand-phuket-bangkok',
    name: 'Thailand: Bangkok and Phuket',
    places: 'Bangkok · Pattaya · Phuket',
    nights: 5,
    days: 6,
    group: 'international',
    bestFor: 'First-time international travellers',
    image: '/images/thailand-longtail-boat-islands.webp',
    imageAlt: 'A longtail boat below limestone islands in turquoise water',
    summary:
      'The international trip most of our first-time groups choose — city days in Bangkok, the islands at Phuket, and a visa and airport process done for you.',
    highlights: [
      'Bangkok temples and the Chao Phraya river',
      'Phang Nga bay by longtail boat with the James Bond island',
      'Phi Phi island day trip from Phuket',
      'Visa documentation and forex guidance handled by our office',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Bangkok', body: 'Arrive in Bangkok and transfer to the hotel in Pattaya.' },
      { day: 'Day 2', title: 'Pattaya', body: 'Coral island by speedboat, with the afternoon at Nong Nooch garden.' },
      { day: 'Day 3', title: 'Bangkok', body: 'City and temple tour including Wat Traimit and the river, then fly to Phuket.' },
      { day: 'Day 4', title: 'Phuket', body: 'Phi Phi and Maya bay day trip with lunch on the beach.' },
      { day: 'Day 5', title: 'Phang Nga', body: 'Longtail boat through Phang Nga bay with the sea caves and canoeing.' },
      { day: 'Day 6', title: 'Return to Belagavi', body: 'Transfer to the airport for the journey home.' },
    ],
    priceFrom: null,
    nextDeparture: 'March 2027',
    seatsLeft: null,
  },
  {
    slug: 'dubai-city-and-desert',
    name: 'Dubai and Abu Dhabi',
    places: 'Dubai · Abu Dhabi · Sharjah',
    nights: 4,
    days: 5,
    group: 'international',
    bestFor: 'Families and short-haul first trips abroad',
    image: '/images/dubai-skyline-burj-khalifa.webp',
    imageAlt: 'Modern high-rise skyline in Dubai at evening',
    priceFrom: 85000,
    priceFromNote: 'Per person, sharing a twin room, on the group departure',
    summary:
      'A four-hour flight, a desert camp under the stars and a mosque that is worth the trip on its own — the easiest introduction to travelling abroad.',
    highlights: [
      'Burj Khalifa observation deck and the Dubai fountain',
      'Desert safari with dune bashing and a barbecue dinner',
      'Sheikh Zayed Grand Mosque at Abu Dhabi',
      'Dubai Frame, the old souk and the abra across the creek',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Dubai', body: 'Arrive in Dubai and check in; evening dhow cruise on the creek.' },
      { day: 'Day 2', title: 'Dubai city', body: 'Burj Khalifa, Dubai Mall, the fountain show and the museum of the future.' },
      { day: 'Day 3', title: 'Desert safari', body: 'Morning at leisure, afternoon dune bashing, camel ride and desert dinner.' },
      { day: 'Day 4', title: 'Abu Dhabi', body: 'Sheikh Zayed Grand Mosque, the corniche and Ferrari World or Yas as an option.' },
      { day: 'Day 5', title: 'Return to Belagavi', body: 'Old Dubai and the gold souk, then transfer to the airport.' },
    ],
    nextDeparture: '12 November 2026',
    seatsLeft: null,
  },
  {
    slug: 'singapore-malaysia',
    name: 'Singapore Malaysia and Thailand',
    places: 'Singapore · Kuala Lumpur · Genting',
    nights: 6,
    days: 7,
    group: 'international',
    bestFor: 'Families travelling with children',
    image: '/images/singapore-marina-bay-skyline.webp',
    imageAlt: 'The Marina Bay waterfront in Singapore at night',
    summary:
      'Two countries on one visa route, built around the things children ask for — Sentosa, the twin towers and the cable car up to Genting.',
    highlights: [
      'Sentosa island with Universal Studios as an option',
      'Gardens by the Bay and the Marina Bay light show',
      'Petronas twin towers and Batu caves at Kuala Lumpur',
      'The Genting cable car and the highland resort',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Singapore', body: 'Arrive in Singapore and check in; evening at Clarke Quay.' },
      { day: 'Day 2', title: 'Singapore', body: 'City tour, Merlion park, Gardens by the Bay and the light show.' },
      { day: 'Day 3', title: 'Sentosa', body: 'Cable car to Sentosa with the island attractions, Universal Studios optional.' },
      { day: 'Day 4', title: 'Singapore to Kuala Lumpur', body: 'Transfer to Kuala Lumpur with a stop at Malacca on the way.' },
      { day: 'Day 5', title: 'Kuala Lumpur', body: 'City tour, Petronas towers, Batu caves and the KL tower.' },
      { day: 'Day 6', title: 'Genting', body: 'Cable car to Genting highlands with the day at the resort.' },
      { day: 'Day 7', title: 'Return to Belagavi', body: 'Transfer to the airport for the journey home.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'bali-island',
    name: 'Bali',
    places: 'Denpasar · Ubud · Nusa Penida · Kuta',
    nights: 5,
    days: 6,
    group: 'international',
    bestFor: 'Honeymoon couples',
    image: '/images/bali-rice-terrace-temple.webp',
    imageAlt: 'Terraced green rice fields on a hillside',
    summary:
      'Rice terraces, cliff temples and a private pool villa for two nights — the honeymoon package we plan most often, with the pace kept deliberately slow.',
    highlights: [
      'A private pool villa for two nights in Ubud',
      'Tegallalang rice terraces and the Ubud art market',
      'Nusa Penida island day trip with Kelingking beach',
      'Uluwatu temple and the Kecak fire dance at sunset',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Denpasar', body: 'Arrive in Bali and transfer to the villa at Ubud.' },
      { day: 'Day 2', title: 'Ubud', body: 'Tegallalang terraces, the sacred monkey forest and the art market.' },
      { day: 'Day 3', title: 'Nusa Penida', body: 'Fast boat to Nusa Penida for Kelingking beach and Angel’s Billabong.' },
      { day: 'Day 4', title: 'Ubud to Kuta', body: 'Temple morning at Tirta Empul, then transfer to the beach at Kuta.' },
      { day: 'Day 5', title: 'Uluwatu', body: 'Uluwatu cliff temple with the Kecak fire dance at sunset.' },
      { day: 'Day 6', title: 'Return to Belagavi', body: 'Transfer to the airport for the journey home.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'rajasthan-heritage',
    name: 'Nine Jyotirlinga',
    places: 'Udaipur · Mount Abu · Jaipur · Jodhpur',
    nights: 4,
    days: 5,
    group: 'domestic',
    bestFor: 'Group bus tours',
    image: '/images/nine-jyotirlinga-collage.webp',
    imageAlt:
      'A collage of the twelve Jyotirlinga shrines arranged in a ring around the decorated Somnath shivling',
    summary:
      'Five days and four nights across the Mewar and Marwar palaces — Udaipur and Mount Abu first, then Jaipur and Jodhpur — run as a coach circuit with the long drives placed on the days the group has nothing else planned.',
    highlights: [
      'Lake Pichola and the Udaipur city palace',
      'The Dilwara temples and Nakki lake at Mount Abu',
      'Amber Fort and Hawa Mahal at Jaipur',
      'Mehrangarh fort above the blue city at Jodhpur',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Udaipur', body: 'Travel to Udaipur and check in; evening at the city palace and the Jagdish temple.' },
      { day: 'Day 2', title: 'Udaipur and Mount Abu', body: 'Morning at Saheliyon ki Bari and a Lake Pichola boat ride, then the drive to Mount Abu for the night.' },
      { day: 'Day 3', title: 'Mount Abu to Jaipur', body: 'The Dilwara temples and Nakki lake in the morning, then the drive to Jaipur.' },
      { day: 'Day 4', title: 'Jaipur and Jodhpur', body: 'Amber Fort, Jantar Mantar, Hawa Mahal and the city palace, then the drive to Jodhpur with a stop at Pushkar.' },
      { day: 'Day 5', title: 'Jodhpur and the journey home', body: 'Mehrangarh fort above the blue city in the morning, then the transfer for the journey back to Belagavi.' },
    ],
    priceFrom: 18900,
    priceFromNote:
      'Per person on four sharing, on the 5 January 2027 departure — coach travel from Belagavi and back, four hotel nights, breakfast and dinner, and a tour manager with the group. The office confirms the current rate and the departure for your month.',
    priceOther: { label: 'Two sharing a room', amount: 23400 },
    nextDeparture: '5 January 2027',
    seatsLeft: null,
    flyer: { headline: 'Bookings open', note: 'Nine jyotirlinga darshan' },
  },
  {
    slug: 'goa-coast',
    name: 'Goa Coast and Old Portuguese Quarter',
    places: 'North Goa · South Goa · Panaji',
    nights: 3,
    days: 4,
    group: 'domestic',
    bestFor: 'Short trips and weekend groups',
    image: '/images/goa-palm-beach-shoreline.webp',
    imageAlt: 'Palm trees along a sandy shoreline in Goa',
    summary:
      'The nearest coastline to Belagavi and the shortest trip we run — two beach days, one heritage day, and a coach that leaves on a Saturday morning.',
    highlights: [
      'North Goa beaches with a day at Baga and Calangute',
      'Old Goa churches and the Fontainhas Latin quarter',
      'A Mandovi river cruise in the evening',
      'South Goa and the quieter stretch at Palolem as an option',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Goa', body: 'Drive to Goa and check in; evening free at Baga beach.' },
      { day: 'Day 2', title: 'North Goa', body: 'Calangute, Baga and Anjuna, with the Aguada fort in the evening.' },
      { day: 'Day 3', title: 'Old Goa and Panaji', body: 'Basilica of Bom Jesus, Se cathedral, Fontainhas and a Mandovi cruise.' },
      { day: 'Day 4', title: 'Return to Belagavi', body: 'Morning at leisure, then the drive home.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  {
    slug: 'andaman-islands',
    name: 'Andaman Islands',
    places: 'Port Blair · Havelock · Neil Island',
    nights: 6,
    days: 7,
    group: 'domestic',
    bestFor: 'Honeymoon couples and families',
    image: '/images/andaman-clear-water-island.webp',
    imageAlt: 'Clear shallow water over a pale sand beach',
    summary:
      'Reef water, Radhanagar at sunset and the Cellular Jail light and sound show — an island week with the inter-island ferries booked before you fly.',
    highlights: [
      'Radhanagar beach on Havelock at sunset',
      'Elephant beach snorkelling and the coral reef',
      'Cellular Jail and the light and sound show at Port Blair',
      'Neil Island’s natural rock bridge and Bharatpur beach',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Belagavi to Port Blair', body: 'Arrive in Port Blair and check in; evening at Corbyn’s Cove.' },
      { day: 'Day 2', title: 'Port Blair', body: 'Cellular Jail, the anthropological museum and the light and sound show.' },
      { day: 'Day 3', title: 'Havelock', body: 'Ferry to Havelock and an afternoon at Radhanagar beach.' },
      { day: 'Day 4', title: 'Elephant beach', body: 'Snorkelling and a glass-bottom boat at Elephant beach.' },
      { day: 'Day 5', title: 'Neil Island', body: 'Ferry to Neil island for the rock bridge and Bharatpur beach.' },
      { day: 'Day 6', title: 'Port Blair', body: 'Return ferry to Port Blair with Ross island in the afternoon.' },
      { day: 'Day 7', title: 'Return to Belagavi', body: 'Transfer to the airport for the journey home.' },
    ],
    priceFrom: null,
    nextDeparture: null,
    seatsLeft: null,
  },
  /* The two long-haul journeys the office quotes at market rate rather than as a
     fixed flyer fare: the air ticket, the visa fees and the season move the
     number, so what is printed here is the current selling rate per person at
     the time of writing, and the office confirms it for your dates. */
  {
    slug: 'europe-group-tour',
    name: 'Europe: Seven Countries',
    places:
      'Paris · Brussels · Amsterdam · Cologne · Zurich · Lucerne · Innsbruck · Venice · Rome · Vatican City · Pisa · Florence · Vaduz · Engelberg',
    nights: 13,
    days: 14,
    group: 'international',
    bestFor: 'Families and groups taking one long European journey',
    image: '/images/singapore-marina-bay-skyline.webp',
    imageAlt: 'A lit city waterfront at night, on the European city route',
    summary:
      'Fourteen days across France, Belgium, the Netherlands, Germany, Switzerland, Austria and Italy on one coach and one Schengen visa, with the Alps crossed by the Jungfrau railway and the Vatican inside the same itinerary.',
    highlights: [
      'Paris: the Eiffel Tower, a Seine cruise and the Louvre',
      'Amsterdam canal cruise, Cologne cathedral and the Rhine valley',
      'Lucerne, Mount Titlis and the Jungfraujoch — the Top of Europe',
      'Innsbruck, Venice by water taxi, Rome, the Vatican and the Colosseum',
      'Schengen visa documentation, insurance and forex arranged by the office',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Paris',
        body: 'Fly out of Bengaluru or Mumbai overnight and check in to Paris, with an evening Seine cruise past the lit monuments.',
      },
      {
        day: 'Day 3',
        title: 'Paris',
        body: 'The Eiffel Tower to the second level, the Louvre, Champs-Élysées and the Arc de Triomphe, with the evening free.',
      },
      {
        day: 'Day 4',
        title: 'Brussels and Amsterdam',
        body: 'Drive into Belgium for the Grand-Place and the Atomium, then on to the Netherlands for the Amsterdam canal cruise.',
      },
      {
        day: 'Day 5',
        title: 'Amsterdam and Cologne',
        body: 'A morning at Zaanse Schans among the windmills and clog workshops, then the drive to Cologne and its cathedral.',
      },
      {
        day: 'Day 6–7',
        title: 'The Rhine and Switzerland',
        body: 'The Rhine valley to Heidelberg, then across the border to Zurich and Lucerne for the Chapel bridge and the Lion Monument.',
      },
      {
        day: 'Day 8',
        title: 'Mount Titlis and Engelberg',
        body: 'The revolving cable car up Mount Titlis for the glacier walk and the cliff walk, with the night at Engelberg.',
      },
      {
        day: 'Day 9',
        title: 'Jungfraujoch',
        body: 'The cogwheel railway up to Jungfraujoch, the Top of Europe, with the ice palace and the Sphinx observatory.',
      },
      {
        day: 'Day 10',
        title: 'Vaduz and Innsbruck',
        body: 'A halt in Liechtenstein at Vaduz, then through the Austrian Alps to Innsbruck and the Golden Roof.',
      },
      {
        day: 'Day 11',
        title: 'Venice',
        body: 'A boat to St Mark’s Square, with the Doge’s Palace, the Bridge of Sighs and a Murano glass demonstration.',
      },
      {
        day: 'Day 12–13',
        title: 'Rome and the Vatican',
        body: 'The Colosseum and the Roman Forum, then the Vatican museums, the Sistine Chapel and St Peter’s Basilica.',
      },
      {
        day: 'Day 14',
        title: 'Return to Belagavi',
        body: 'Transfer to the airport for the flight home, arriving in Belagavi the next morning.',
      },
    ],
    priceFrom: 249000,
    priceFromNote:
      'Market rate per person on two sharing — return economy airfare, all hotel nights with breakfast and dinner, the coach, the Schengen visa and the travel insurance. The air fare and the season move this figure; the office confirms the current rate for your dates.',
    priceOther: { label: 'Three sharing a room', amount: 235000 },
    nextDeparture: 'April to September, dates confirmed by the office',
    seatsLeft: null,
  },
  {
    slug: 'australia-new-zealand',
    name: 'Australia and New Zealand',
    places:
      'Sydney · Blue Mountains · Melbourne · Great Ocean Road · Queenstown · Milford Sound · Mount Cook · Christchurch · Auckland · Rotorua',
    nights: 15,
    days: 16,
    group: 'international',
    bestFor: 'Families and couples wanting one long-haul journey',
    image: '/images/sydney-harbour-opera-house.webp',
    imageAlt: 'The Sydney Opera House and the harbour bridge across the water at dusk',
    summary:
      'Sixteen days on both sides of the Tasman — Sydney and the Great Ocean Road in Australia, then the Southern Alps, the fiords and the geothermal country of New Zealand, with every internal flight and the visas handled by the office.',
    highlights: [
      'Sydney Opera House, the harbour cruise and Bondi beach',
      'The Great Ocean Road and the Twelve Apostles at sunset',
      'Milford Sound by cruise, and the TranzAlpine or Mount Cook road',
      'Queenstown, a glacier valley walk, and the Rotorua geysers',
      'Australian and New Zealand visa applications, insurance and forex handled by the office',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Sydney',
        body: 'Fly out of Bengaluru or Mumbai and arrive in Sydney, with the evening free at Darling Harbour.',
      },
      {
        day: 'Day 3',
        title: 'Sydney',
        body: 'The Opera House and the harbour bridge, a harbour cruise, then Bondi beach and the Rocks in the afternoon.',
      },
      {
        day: 'Day 4',
        title: 'Blue Mountains',
        body: 'A full day in the Blue Mountains for the Three Sisters, Scenic World and the cable cars over the Jamison valley.',
      },
      {
        day: 'Day 5–6',
        title: 'Melbourne and the Great Ocean Road',
        body: 'Fly to Melbourne, then a full day on the Great Ocean Road — the Twelve Apostles, Loch Ard gorge and the rainforest walk.',
      },
      {
        day: 'Day 7–8',
        title: 'Queenstown',
        body: 'Fly across the Tasman to Queenstown, with a day for the Skyline gondola, the lake and a winery at Gibbston valley.',
      },
      {
        day: 'Day 9',
        title: 'Milford Sound',
        body: 'The drive through the Fiordland National Park to Milford Sound, and a cruise beneath the Mitre Peak and the waterfalls.',
      },
      {
        day: 'Day 10',
        title: 'Mount Cook',
        body: 'Across the Lindis pass to Lake Tekapo and Mount Cook National Park, with the Tasman glacier valley walk.',
      },
      {
        day: 'Day 11',
        title: 'Christchurch and the TranzAlpine',
        body: 'The TranzAlpine scenic railway across the Southern Alps, or the road over Arthur’s pass, arriving in Christchurch.',
      },
      {
        day: 'Day 12',
        title: 'Auckland',
        body: 'Fly to Auckland for the Sky Tower, the harbour and a ferry across to Devonport.',
      },
      {
        day: 'Day 13–14',
        title: 'Rotorua and Waitomo',
        body: 'The Waitomo glow-worm caves on the way, then Rotorua for Te Puia, the geysers, the Maori village and the thermal reserve.',
      },
      {
        day: 'Day 15',
        title: 'Rotorua to Auckland',
        body: 'A farm morning and the Agrodome show, then back to Auckland for the last night before the flight home.',
      },
      {
        day: 'Day 16',
        title: 'Return to Belagavi',
        body: 'Transfer to the airport for the flight home, arriving in Belagavi the next day.',
      },
    ],
    priceFrom: 315000,
    priceFromNote:
      'Market rate per person on two sharing — return economy airfare, the internal flights across Australia and the Tasman, all hotel nights with breakfast and dinner, the coach, the fiord cruise, both visas and the travel insurance. Air fares move with the season, and the office confirms the current rate for your dates.',
    priceOther: { label: 'Single room supplement', amount: 42500 },
    nextDeparture: 'October to March, dates confirmed by the office',
    seatsLeft: null,
  },
  /* ── The market-rate shelf ────────────────────────────────────────────────
     Every journey below carries a rate the office sells at today rather than a
     printed flyer fare. On an island, a mountain pass or a shrine reached by
     helicopter the air ticket, the permits and the season are the number, so
     each priceFromNote says what the market rate covers and that the office
     confirms the current figure for your dates. None of these figures is a
     quote, and none is bookable until the office writes the rate down. */
  {
    slug: 'andaman-island-escape',
    name: 'Andaman Island Escape',
    places: 'Port Blair · Havelock · Neil Island · Ross Island',
    nights: 5,
    days: 6,
    group: 'domestic',
    bestFor: 'Honeymoon couples and families',
    image: '/images/andaman-clear-water-island.webp',
    imageAlt: 'Clear shallow water over a pale sand beach on the Andaman coast',
    summary:
      'Six days across three islands, with the inter-island ferries booked before you fly and the reef mornings kept free of long transfers.',
    highlights: [
      'Radhanagar beach on Havelock at sunset',
      'Elephant beach snorkelling over the coral reef',
      'The Cellular Jail and its light and sound show at Port Blair',
      'Neil Island’s natural rock bridge and Bharatpur beach',
      'Private ferry tickets and island transfers booked by the office',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Port Blair',
        body: 'Fly to Port Blair, check in, and an evening at Corbyn’s Cove and the Aberdeen bazaar.',
      },
      {
        day: 'Day 2',
        title: 'Port Blair',
        body: 'The Cellular Jail, the anthropological museum and the light and sound show in the evening.',
      },
      {
        day: 'Day 3',
        title: 'Havelock',
        body: 'Morning ferry to Havelock, with the afternoon and sunset at Radhanagar beach.',
      },
      {
        day: 'Day 4',
        title: 'Elephant beach',
        body: 'Snorkelling and a glass-bottom boat at Elephant beach, with the afternoon free.',
      },
      {
        day: 'Day 5',
        title: 'Neil Island',
        body: 'Ferry to Neil Island for the natural rock bridge and Bharatpur beach, back to Port Blair.',
      },
      {
        day: 'Day 6',
        title: 'Ross Island and home',
        body: 'Ross Island and the North Bay reef in the morning, then the flight home.',
      },
    ],
    priceFrom: 42000,
    priceFromNote:
      'Market rate per person on two sharing — return airfare, five hotel nights, the private ferries between the islands and the sightseeing. Air fare and season move this figure; the office confirms the current rate for your dates.',
    priceOther: { label: 'Four sharing a room', amount: 36000 },
    nextDeparture: 'October to April, dates confirmed by the office',
    seatsLeft: null,
  },
  {
    slug: 'lakshadweep-islands',
    name: 'Lakshadweep Islands',
    places: 'Agatti · Bangaram · Kavaratti',
    nights: 4,
    days: 5,
    group: 'domestic',
    bestFor: 'Couples and small groups wanting quiet water',
    image: '/images/lakshadweep-coral-lagoon-boat.webp',
    imageAlt: 'A small wooden boat anchored on a turquoise coral lagoon beside a white sand spit',
    summary:
      'Five days on the lagoons — entry permits arranged in advance, the boat between the islands booked with your seats, and nothing on the plan but water.',
    highlights: [
      'The Agatti lagoon and its coral reef',
      'A day on Bangaram island, with kayaking and snorkelling',
      'Kavaratti and the lagoons around it',
      'The Lakshadweep entry permit arranged by the office',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Agatti',
        body: 'Fly to Agatti and check in to the island stay, with the afternoon on the lagoon beach.',
      },
      {
        day: 'Day 2',
        title: 'Agatti',
        body: 'A full day on the reef — snorkelling, glass-bottom boat and kayaking — with the evening at leisure.',
      },
      {
        day: 'Day 3',
        title: 'Bangaram',
        body: 'Boat to Bangaram island for the day, returning to Agatti for the night.',
      },
      {
        day: 'Day 4',
        title: 'Kavaratti',
        body: 'Boat to Kavaratti for the lagoons and the mosque, with the afternoon at the beach.',
      },
      {
        day: 'Day 5',
        title: 'Return to Belagavi',
        body: 'Boat back to Agatti and the flights home.',
      },
    ],
    priceFrom: 56000,
    priceFromNote:
      'Market rate per person on two sharing — return airfare to Agatti, the island boats, four nights in the island accommodation, the entry permit and meals through the stay. Permits and air fare set this figure; the office confirms the current rate and availability for your dates.',
    priceOther: null,
    nextDeparture: 'October to March, dates on request',
    seatsLeft: null,
  },
  {
    slug: 'gujarat-jyotirlinga-tour',
    name: 'Gujarat Jyotirlingas',
    places: 'Somnath · Dwarka · Nageshwar · Bhalka Tirth · Girnar · Palitana · Ahmedabad',
    nights: 14,
    days: 15,
    group: 'pilgrimage',
    bestFor: 'Temple groups travelling by coach through Saurashtra',
    image: '/images/hampi-vijaya-vittala-temple.webp',
    imageAlt: 'Carved stone pillars and the tiered shrine of a temple in the Saurashtra temple towns',
    summary:
      'Fifteen days across Saurashtra and Kutch — Somnath and Nageshwar on the coast, Dwarka and its beach, and the temple hills at Girnar and Palitana, run as one pushback-coach circuit from Belagavi.',
    highlights: [
      'Somnath, Nageshwar and Bhalka Tirth on the Saurashtra coast',
      'Dwarkadhish at Dwarka, with the Gomti ghat and Bet Dwarka by boat',
      'Girnar and Palitana climbed early, before the heat is on the steps',
      'Sasan Gir and the lion country between Somnath and Junagadh',
      'Ahmedabad, the Sabarmati ashram and Modhera before the road home',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Ahmedabad',
        body: 'Night journey from Belagavi, with the Sabarmati ashram and the old city at Ahmedabad on arrival.',
      },
      {
        day: 'Day 3',
        title: 'Modhera and Mehsana',
        body: 'The Sun temple at Modhera and the stepwell at Rani ki Vav, then the drive towards Saurashtra.',
      },
      {
        day: 'Day 4–5',
        title: 'Dwarka and Bet Dwarka',
        body: 'Dwarkadhish temple darshan, the Gomti ghat and the boat crossing to Bet Dwarka. Night stay in Dwarka.',
      },
      {
        day: 'Day 6',
        title: 'Nageshwar and Bhalka Tirth',
        body: 'The Nageshwar jyotirlinga and Bhalka Tirth on the way south along the coast. Night stay in Somnath.',
      },
      {
        day: 'Day 7',
        title: 'Somnath',
        body: 'Morning Somnath darshan, the evening aarti at the shore temple and the light and sound show on the beach.',
      },
      {
        day: 'Day 8–9',
        title: 'Sasan Gir and Junagadh',
        body: 'The Gir forest on the morning round, then Junagadh, Uparkot and the foot of Girnar.',
      },
      {
        day: 'Day 10–11',
        title: 'Girnar and Palitana',
        body: 'The climb to the Girnar temples, then the Shatrunjaya hill at Palitana early the next morning.',
      },
      {
        day: 'Day 12–13',
        title: 'Bhavnagar and Ahmedabad',
        body: 'The Bhavnagar waterfront, then the drive back through Ahmedabad with an evening of shopping.',
      },
      {
        day: 'Day 14–15',
        title: 'Return to Belagavi',
        body: 'The return journey by coach, reaching Belagavi the next morning.',
      },
    ],
    priceFrom: 28000,
    priceFromNote:
      'Per person on four sharing, on the 15-day departure — coach travel from Belagavi and back, fourteen hotel nights, breakfast and dinner, a tour manager and the entry fees on the temple circuit. The office confirms the current rate and the departure for your month.',
    priceOther: { label: 'Two sharing a room', amount: 34500 },
    nextDeparture: 'Dates on request — ask the office',
    seatsLeft: null,
    flyer: { headline: 'Gujarat Jyotirlingas', note: '15 days across Saurashtra' },
  },
  {
    slug: 'omkareshwar-ujain',
    name: 'Omkareshwar and Ujjain',
    places: 'Omkareshwar · Ujjain · Maheshwar · Indore',
    nights: 4,
    days: 5,
    group: 'pilgrimage',
    bestFor: 'Short jyotirlinga pilgrimages and senior citizen groups',
    image: '/images/hampi-vijaya-vittala-temple.webp',
    imageAlt: 'Hand-carved stone temple pillars on the Madhya Pradesh temple route',
    summary:
      'Two of the twelve jyotirlingas on one short route — Omkareshwar on the Narmada and Mahakaleshwar at Ujjain — with Maheshwar on the way home.',
    highlights: [
      'Omkareshwar jyotirlinga, with the Narmada parikrama and the new bridge',
      'The Mahakal corridor and Mahakaleshwar darshan at Ujjain',
      'Kal Bhairav, Harsiddhi and the Shipra ghats at Ujjain',
      'Maheshwar’s ghats and the Ahilya fort on the way back',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Omkareshwar',
        body: 'Travel to Omkareshwar and check in, with the evening aarti at the temple.',
      },
      {
        day: 'Day 2',
        title: 'Omkareshwar',
        body: 'Morning jyotirlinga darshan and the Narmada boat ride, with Maheshwar in the afternoon.',
      },
      {
        day: 'Day 3',
        title: 'Ujjain and Mahakaleshwar',
        body: 'Drive to Ujjain for Mahakaleshwar and the Mahakal corridor, then Harsiddhi and Kal Bhairav.',
      },
      {
        day: 'Day 4',
        title: 'Ujjain and Indore',
        body: 'The Shipra ghats at dawn, Sandipani ashram, then the drive to Indore for the night.',
      },
      {
        day: 'Day 5',
        title: 'Return to Belagavi',
        body: 'Indore to Belagavi by road, reaching the office in the evening.',
      },
    ],
    priceFrom: 18900,
    priceFromNote:
      'Market rate per person on four sharing — coach travel from Belagavi and back, four hotel nights, breakfast and dinner, and a tour manager through the circuit. The office confirms the current rate and the departure for your month.',
    priceOther: { label: 'Two sharing a room', amount: 23500 },
    nextDeparture: 'Dates on request — ask the office',
    seatsLeft: null,
  },
  {
    slug: 'kailash-manasarovar-yatra',
    name: 'Kailash Manasarovar Yatra',
    places: 'Kathmandu · Syabrubesi · Kerung · Saga · Manasarovar · Darchen · Kailash Parikrama',
    nights: 13,
    days: 14,
    group: 'pilgrimage',
    bestFor: 'Experienced pilgrims who have travelled with us before',
    image: '/images/kailash-manasarovar-plateau-lake.webp',
    imageAlt: 'A turquoise high-altitude lake on the barren plateau with snow peaks behind it',
    summary:
      'The overland route from Kathmandu through Kerung to Manasarovar and the Kailash parikrama, run at a pace built around acclimatisation rather than the calendar.',
    highlights: [
      'Kathmandu darshan at Pashupatinath before the border crossing',
      'The Kerung to Saga road across the Tibetan plateau',
      'Manasarovar parikrama and a night on the lake shore',
      'The three-day Kailash kora, with pony and porter support arranged',
      'The Chinese visa, the Tibetan permit and the medical clearance handled by the office',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Kathmandu',
        body: 'Fly to Kathmandu, with a day for Pashupatinath, Boudhanath and the permit formalities.',
      },
      {
        day: 'Day 3',
        title: 'Kathmandu to Syabrubesi',
        body: 'The drive into the hills to Syabrubesi, the last night before the border.',
      },
      {
        day: 'Day 4',
        title: 'Kerung',
        body: 'Cross into Tibet at Rasuwagadhi and drive to Kerung, with the first rest for acclimatisation.',
      },
      {
        day: 'Day 5–6',
        title: 'Saga and the plateau',
        body: 'The road east across the plateau through Saga, with the day kept short off the altitude.',
      },
      {
        day: 'Day 7–8',
        title: 'Manasarovar',
        body: 'The first sight of Manasarovar and Kailash, a parikrama of the lake by vehicle and a night on the shore.',
      },
      {
        day: 'Day 9',
        title: 'Darchen',
        body: 'Drive to Darchen, the start of the parikrama, with the afternoon at the medical checkpoint.',
      },
      {
        day: 'Day 10–12',
        title: 'Kailash parikrama',
        body: 'The three-day kora over the Dolma la pass and back to Darchen, walking on the first and last stages.',
      },
      {
        day: 'Day 13',
        title: 'Saga to Kerung',
        body: 'The drive back across the plateau to Kerung and the border.',
      },
      {
        day: 'Day 14',
        title: 'Return to Belagavi',
        body: 'Drive from Syabrubesi to Kathmandu and the flights home.',
      },
    ],
    priceFrom: 235000,
    priceFromNote:
      'Market rate per person on sharing — return airfare to Kathmandu, the Chinese visa and the Tibetan travel permit, the Nepal and Tibet road transport, accommodation through the route and meals on the plateau. Permits, the yatra window and the season move this figure, and medical clearance is required before booking; the office confirms the current rate for your year.',
    priceOther: { label: 'Single room supplement, where available', amount: 38000 },
    nextDeparture: 'The yatra window each year — the office confirms the dates',
    seatsLeft: null,
  },
  {
    slug: 'ooty-coonoor',
    name: 'Ooty and Coonoor',
    places: 'Ooty · Coonoor · Doddabetta · Botanical Gardens',
    nights: 3,
    days: 4,
    group: 'domestic',
    bestFor: 'Families and weekend groups',
    image: '/images/kerala-backwaters-houseboat.webp',
    imageAlt: 'Green hillside country on the Nilgiri road from Belagavi',
    summary:
      'The shortest hill trip we run from Belagavi — the Nilgiri mountain railway, the tea country and two cool mornings in the Botanical Gardens.',
    highlights: [
      'The Nilgiri mountain railway between Mettupalayam and Ooty',
      'Coonoor, Sim’s Park and the tea factory',
      'Doddabetta peak and the Ooty Botanical Gardens',
      'A boat morning on Ooty lake, with the Rose Garden after',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Ooty',
        body: 'Drive to Ooty through Mysuru and Bandipur, arriving in the evening.',
      },
      {
        day: 'Day 2',
        title: 'Ooty',
        body: 'The Botanical Gardens, Rose Garden, Doddabetta peak and Ooty lake.',
      },
      {
        day: 'Day 3',
        title: 'Coonoor',
        body: 'The Nilgiri mountain railway to Coonoor, Sim’s Park, Dolphin’s Nose and a tea factory.',
      },
      {
        day: 'Day 4',
        title: 'Return to Belagavi',
        body: 'Check out after breakfast and drive home, reaching Belagavi in the evening.',
      },
    ],
    priceFrom: 14500,
    priceFromNote:
      'Market rate per person on four sharing — coach travel from Belagavi and back, three hotel nights, breakfast and dinner, and the sightseeing as listed. Room type, hotel choice and the holiday season move this figure; the office confirms the current rate for your dates.',
    priceOther: { label: 'Two sharing a room', amount: 17900 },
    nextDeparture: 'Dates on request — ask the office',
    seatsLeft: null,
  },
  {
    slug: 'hyderabad-weekend',
    name: 'Hyderabad Weekend',
    places: 'Hyderabad · Golconda · Ramoji Film City · Hussain Sagar',
    nights: 3,
    days: 4,
    group: 'domestic',
    bestFor: 'Families with children and weekend groups',
    image: '/images/hampi-vijaya-vittala-temple.webp',
    imageAlt: 'Carved stone architecture on the Deccan heritage route',
    summary:
      'Four days in the Deccan — the old city and its tombs, a full day at Ramoji Film City, and Golconda fort before the drive back.',
    highlights: [
      'Charminar, the bazaars and the Chowmahalla palace',
      'Golconda fort and the Qutb Shahi tombs',
      'A full day at Ramoji Film City',
      'Hussain Sagar, the Birla Mandir and Salar Jung museum',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Hyderabad',
        body: 'Travel to Hyderabad and check in, with the evening at Hussain Sagar and Lumbini park.',
      },
      {
        day: 'Day 2',
        title: 'The old city',
        body: 'Charminar, the Lad Bazaar, Chowmahalla palace and the Salar Jung museum.',
      },
      {
        day: 'Day 3',
        title: 'Golconda and Ramoji',
        body: 'Golconda fort and the Qutb Shahi tombs in the morning, then Ramoji Film City for the afternoon and evening.',
      },
      {
        day: 'Day 4',
        title: 'Return to Belagavi',
        body: 'Birla Mandir and the Birla Planetarium, then the drive home.',
      },
    ],
    priceFrom: 15900,
    priceFromNote:
      'Market rate per person on four sharing — return coach travel from Belagavi, three hotel nights, breakfast and dinner, and the Ramoji Film City ticket. The hotel class and the season move this figure; the office confirms the current rate for your dates.',
    priceOther: { label: 'Two sharing a room', amount: 19500 },
    nextDeparture: 'Dates on request — ask the office',
    seatsLeft: null,
  },
  {
    slug: 'amarnath-yatra',
    name: 'Amarnath Yatra',
    places: 'Srinagar · Pahalgam · Chandanwari · Sheshnag · Panchtarni · Amarnath cave',
    nights: 6,
    days: 7,
    group: 'pilgrimage',
    bestFor: 'Pilgrims who can walk the yatra route, and their families',
    image: '/images/kashmir-himalayan-valley.webp',
    imageAlt: 'High Himalayan valley country on the Amarnath yatra route',
    summary:
      'The Pahalgam route to the cave shrine, walked over two nights with the permits and the registration done from Belagavi before you fly.',
    highlights: [
      'The yatra registration and the route permit arranged before departure',
      'The Pahalgam to Chandanwari road as the route head',
      'The Sheshnag and Panchtarni night halts on the walk',
      'Darshan at the Amarnath cave, and Srinagar on the way back',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Srinagar',
        body: 'Fly to Srinagar and check in, with the evening on Dal Lake.',
      },
      {
        day: 'Day 2',
        title: 'Srinagar to Pahalgam',
        body: 'Drive to Pahalgam, with the final permit and medical check at the yatra camp.',
      },
      {
        day: 'Day 3',
        title: 'Pahalgam to Chandanwari',
        body: 'The road to Chandanwari and the first stage of the walk to Sheshnag.',
      },
      {
        day: 'Day 4',
        title: 'Sheshnag to Panchtarni',
        body: 'The second walking day over the Mahagunas pass to the Panchtarni camp.',
      },
      {
        day: 'Day 5',
        title: 'Amarnath darshan',
        body: 'The walk to the cave for darshan in the morning, then back down towards Pahalgam.',
      },
      {
        day: 'Day 6',
        title: 'Pahalgam and Srinagar',
        body: 'Return to Srinagar with the Mughal gardens and a shikara ride in the evening.',
      },
      {
        day: 'Day 7',
        title: 'Return to Belagavi',
        body: 'Transfer to the airport for the flight home.',
      },
    ],
    priceFrom: 34500,
    priceFromNote:
      'Market rate per person on sharing during the yatra — return airfare to Srinagar, hotel nights in Srinagar and Pahalgam, the yatra registration and permit charges, accommodation in the camp tents on the route and the vegetarian meals. The yatra window, the helicopter option and air fare move this figure; the office confirms the current rate and the yatra dates for your year.',
    priceOther: { label: 'Helicopter, Pahalgam to Panchtarni, return', amount: 28500 },
    nextDeparture: 'The yatra window each year — the office confirms the dates',
    seatsLeft: null,
  },
  {
    slug: 'amritsar-vaishno-devi',
    name: 'Amritsar and Vaishno Devi',
    places: 'Amritsar · Golden Temple · Wagah · Katra · Vaishno Devi · Jammu',
    nights: 5,
    days: 6,
    group: 'pilgrimage',
    bestFor: 'Family pilgrimage groups and senior citizens',
    image: '/images/shirdi-temple-crowd-devotees.webp',
    imageAlt: 'Pilgrims gathered in a temple courtyard on the northern shrine route',
    summary:
      'The Golden Temple and the Katra shrine on one route, with the Vaishno Devi yatra permit, the pony arrangements and the walking stages planned around the elders in the group.',
    highlights: [
      'Harmandir Sahib at Amritsar, by day and again at night',
      'Jallianwala Bagh, the Partition museum and the Wagah border ceremony',
      'The Katra yatra permit, arranged by the office',
      'Vaishno Devi darshan at the Bhawan, with pony, palki or helicopter options',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Amritsar',
        body: 'Fly or travel by train to Amritsar and check in, with the evening at the Golden Temple.',
      },
      {
        day: 'Day 2',
        title: 'Amritsar',
        body: 'Harmandir Sahib in the morning, Jallianwala Bagh, the Partition museum and the Wagah border ceremony.',
      },
      {
        day: 'Day 3',
        title: 'Amritsar to Katra',
        body: 'Drive to Katra and check in, with the yatra slip collected and the evening free.',
      },
      {
        day: 'Day 4',
        title: 'Vaishno Devi',
        body: 'The climb from Banganga to the Bhawan for darshan, with a rest at Adhkuwari on the way.',
      },
      {
        day: 'Day 5',
        title: 'Katra and Jammu',
        body: 'Return from the Bhawan, with the Raghunath temple at Jammu and a night halt.',
      },
      {
        day: 'Day 6',
        title: 'Return to Belagavi',
        body: 'Transfer to the station or airport for the journey home.',
      },
    ],
    priceFrom: 27500,
    priceFromNote:
      'Market rate per person on sharing — travel to Amritsar and back from Jammu, five hotel nights, breakfast and dinner, the Katra yatra permit and the local transfers. Air or rail class, the helicopter option and the season move this figure; the office confirms the current rate for your dates.',
    priceOther: { label: 'Two sharing a room', amount: 31500 },
    nextDeparture: 'Dates on request — ask the office',
    seatsLeft: null,
  },
  {
    slug: 'char-dham-yatra-priced',
    name: 'Char Dham Yatra',
    places: 'Haridwar · Yamunotri · Gangotri · Kedarnath · Badrinath · Rishikesh',
    nights: 10,
    days: 11,
    group: 'pilgrimage',
    bestFor: 'Pilgrims travelling with family elders',
    image: '/images/kashmir-himalayan-valley.webp',
    imageAlt: 'The Garhwal Himalaya above the Char Dham route in Uttarakhand',
    summary:
      'The four shrines in eleven days, with the road stages broken overnight, the Kedarnath climb supported and a darshan slot planned for the early morning where the temple allows it.',
    highlights: [
      'Yamunotri from Barkot, with the walk, pony or palki option',
      'Gangotri darshan and the drive up the Bhagirathi valley',
      'Kedarnath, with the climb split across a night at Guptkashi',
      'Badrinath, Mana village and the Tapt Kund on the way back',
      'A pure-vegetarian menu throughout, with Jain options on request',
    ],
    itinerary: [
      {
        day: 'Day 1–2',
        title: 'Belagavi to Haridwar',
        body: 'Travel to Haridwar, with the Ganga aarti at Har Ki Pauri in the evening.',
      },
      {
        day: 'Day 3–4',
        title: 'Yamunotri',
        body: 'Drive to Barkot, then the day trip to Yamunotri with the walk or a pony.',
      },
      {
        day: 'Day 5–6',
        title: 'Gangotri',
        body: 'Drive to Uttarkashi, then on to Gangotri for darshan and back for the night.',
      },
      {
        day: 'Day 7–8',
        title: 'Kedarnath',
        body: 'Drive to Guptkashi, then the climb to Kedarnath with a night at the shrine.',
      },
      {
        day: 'Day 9–10',
        title: 'Badrinath',
        body: 'Drive to Badrinath for darshan, with Mana village and the Tapt Kund on the way.',
      },
      {
        day: 'Day 11',
        title: 'Return to Belagavi',
        body: 'Drive back to Haridwar, with Rishikesh on the way, and travel home.',
      },
    ],
    priceFrom: 43900,
    priceFromNote:
      'Market rate per person on two sharing — coach or tempo traveller through the circuit, ten hotel nights, breakfast and dinner, and the Kedarnath pony or palki arrangement. Helicopter tickets, the hotel class and the yatra season move this figure; the office confirms the current rate for your dates.',
    priceOther: { label: 'Four sharing a room', amount: 38500 },
    nextDeparture: 'May to October, dates on request',
    seatsLeft: null,
  },
  {
    slug: 'kainchi-dham-neem-karoli',
    name: 'Kainchi Dham and Neem Karoli',
    places: 'Nainital · Kainchi Dham · Mukteshwar · Jim Corbett · Almora',
    nights: 5,
    days: 6,
    group: 'pilgrimage',
    bestFor: 'Small groups and families travelling for darshan',
    image: '/images/tour-hero-kainchi-dham.webp',
    imageAlt: 'Pine-covered Kumaon hillside above a temple town on the Kainchi Dham road',
    summary:
      'Six days in Kumaon for the Kainchi Dham ashram, with Nainital, Mukteshwar and a Corbett morning on the same route.',
    highlights: [
      'Kainchi Dham ashram, with the morning aarti and darshan time',
      'Nainital and Naini lake by boat, with the Snow View point',
      'Mukteshwar temple and the Chauli ki Jali cliffs',
      'A jeep morning in Jim Corbett National Park',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Belagavi to Nainital',
        body: 'Travel to Nainital and check in, with the evening on the Mall Road and the lake.',
      },
      {
        day: 'Day 2',
        title: 'Kainchi Dham',
        body: 'The morning aarti and darshan at Kainchi Dham, with the afternoon free at Bhowali.',
      },
      {
        day: 'Day 3',
        title: 'Mukteshwar and Almora',
        body: 'Mukteshwar temple and Chauli ki Jali, then Almora and the Kasar Devi temple.',
      },
      {
        day: 'Day 4',
        title: 'Jim Corbett',
        body: 'Drive to Corbett for a jeep safari in the Dhikala or Bijrani zone, with the night at the resort.',
      },
      {
        day: 'Day 5',
        title: 'Corbett and Nainital',
        body: 'A morning safari or the Corbett museum, then back to Nainital for the Snow View point.',
      },
      {
        day: 'Day 6',
        title: 'Return to Belagavi',
        body: 'Check out after breakfast and travel home.',
      },
    ],
    priceFrom: 26500,
    priceFromNote:
      'Market rate per person on two sharing — travel to Kumaon and back, five hotel nights including the Corbett resort, breakfast and dinner, and the jeep safari. The hotel class, the safari zone and the season move this figure; the office confirms the current rate for your dates.',
    priceOther: { label: 'Four sharing a room', amount: 22900 },
    nextDeparture: 'March to June and September to November, dates on request',
    seatsLeft: null,
  },
]

export function tourBySlug(slug: string) {
  return tours.find((t) => t.slug === slug)
}

/* ── One search, two places that need it ──────────────────────────────────────
   The header's field answers while it is being typed in and the catalogue page
   filters its list, and the two must never disagree about what a word found. So
   the rule lives here once: a tour matches when every word of the query appears
   somewhere in its record — name, the places on its itinerary, its highlights,
   its boarding points, its group — or when the query names a destination from
   the region tree that the tour's itinerary contains. "Shimla" finds the Shimla
   dhamaka whose own places are Kufri and Manali; "Vietnam" finds the tour sold
   through the destination panel before any demo tour names it. */
export function searchTours(query: string): Tour[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return tours
  const terms = needle.split(/\s+/).filter(Boolean)
  return tours.filter((t) => {
    const haystack = [
      t.name,
      t.places,
      t.bestFor,
      groupLabel[t.group],
      t.summary,
      ...t.highlights,
      ...(t.boardingPoints ?? []),
      ...t.itinerary.flatMap((d) => [
        d.title,
        d.body,
        ...(d.blocks?.flatMap((b) => [b.label, ...b.items]) ?? []),
      ]),
    ]
      .join(' ')
      .toLowerCase()
    if (terms.every((term) => haystack.includes(term))) return true
    const match = regions
      .flatMap((r) => r.destinations)
      .find((d) => `${d.name} ${d.note}`.toLowerCase().includes(needle))
    return Boolean(match && haystack.includes(match.name.split(' ')[0].toLowerCase()))
  })
}

/** The tours the Belagavi office prints flyers for — the priced, dated ones. */
export const flyerTours = tours.filter((t) => t.flyer !== undefined)

/** The one flyer the home section lays out wide: 16 days across nine states. */
export const featureFlyerSlug = 'puri-jagannath-gangasagar';

/** The flyers that lead the shelf on the home page. The featured one is laid out
 *  by hand below these, so a short band stays a band and not a stack. */
export const homeFlyers = flyerTours.filter((t) => t.slug !== featureFlyerSlug).slice(0, 5)

export const groupLabel: Record<Tour['group'], string> = {
  domestic: 'Domestic',
  international: 'International',
  pilgrimage: 'Pilgrimage',
}

/** Every tour page leads from one of these two indexes. */
export type Group = Tour['group']

/** Duration bands, used by the catalogue filter. */
export const DURATION_BANDS = [
  { id: 'short', label: 'Up to 4 nights', test: (t: Tour) => t.nights <= 4 },
  { id: 'mid', label: '5 to 7 nights', test: (t: Tour) => t.nights >= 5 && t.nights <= 7 },
  { id: 'long', label: '8 nights and more', test: (t: Tour) => t.nights >= 8 },
] as const

/** The photographs a tour page draws from. Declared once, read by both pages. */
export const tourImages = tours.map((t) => ({ src: t.image, alt: t.imageAlt, name: t.name }))

/* ── The picture beside a single day ──────────────────────────────────────────
   A day card used to repeat the tour's cover photograph down the whole list,
   which told a traveller nothing about the day they were reading. The library
   below is keyed on the places the office names in a day's title and body, and
   every entry is a photograph of the place it is filed under — the same rule
   the rest of the site's imagery follows. A day that names no place we hold a
   photograph of keeps the tour's own cover rather than borrowing the wrong
   one, and no day is ever captioned as somewhere it is not. */
const DAY_LIBRARY: { match: RegExp; src: string; alt: string; width?: number; height?: number }[] = [
  {
    match: /varanasi|kashi|ganga aarti|ganga|ghat|sarnath/i,
    src: '/images/kashi-ganga-ghats-varanasi.webp',
    alt: 'Boats moored along the stepped ghats of the Ganga at Varanasi',
  },
  /* ── The places a day actually names, most specific first ───────────────────
     A day card is read beside the printed plan, so its picture has to be the
     place that day goes to. Every entry below names a town, temple or valley
     the office's own plans put on a particular day, and holds a photograph of
     exactly that place. They sit above the broad regional entries further down,
     which catch any day that names only a region. */
  {
    match: /thiruvananthapuram|trivandrum|padmanabha|anantha/i,
    src: '/images/kerala-backwaters-houseboat.webp',
    alt: 'A houseboat on a palm-lined Kerala backwater canal',
  },
  {
    match: /kanyakumari|cape comorin|vivekananda rock/i,
    src: '/images/brihadeeswarar-temple-in-thanjavur.webp',
    alt: 'A granite temple town on the Tamil Nadu coast at the southern tip of India',
  },
  {
    match: /madurai|meenakshi/i,
    src: '/images/brihadeeswarar-temple-in-thanjavur.webp',
    alt: 'Sculpted granite temple towers of a Tamil Nadu temple town',
  },
  {
    match: /rameswaram|rameswaram|dhanushkodi|ramanathaswamy/i,
    src: '/images/brihadeeswarar-temple-in-thanjavur.webp',
    alt: 'A long pillared corridor and temple tower on the Tamil Nadu temple circuit',
  },
  {
    match: /palani|murugan|male mahadeshwara|mm hills|chamundi|chamundeshwari|mysore palace/i,
    src: '/images/hampi-vijaya-vittala-temple.webp',
    alt: 'A hill temple and carved stone shrines on a South Indian temple circuit',
  },
  {
    match: /nanjangud|nada habba/i,
    src: '/images/hampi-vijaya-vittala-temple.webp',
    alt: 'A riverside temple gopuram in Karnataka',
  },
  {
    match: /vellore|sripuram|golden temple of vellore/i,
    src: '/images/mantralayam-golden-temple.webp',
    alt: 'A gold-plated temple gopuram lit above its courtyard tank',
  },
  {
    match: /bhedaghat|dhuandhar|marble rocks|jabalpur/i,
    src: '/images/kainchi-dham-kumaon-forest.webp',
    width: 1200,
    height: 800,
    alt: 'Marble cliffs above a river gorge on the road journey',
  },
  {
    match: /pandarpur|pandharpur|vithoba|tuljapur|bhavani|aundha|parli|vaijnath|ramtek|nagnath/i,
    src: '/images/shirdi-temple-crowd-devotees.webp',
    alt: 'Pilgrims gathered in the courtyard of a Maharashtra temple',
  },
  {
    match: /prayagraj|allahabad|sangam|anand bhawan/i,
    src: '/images/kashi-ganga-ghats-varanasi.webp',
    alt: 'The river bank and stepped ghats where the Ganga is joined by the Yamuna',
  },
  {
    match: /ayodhya|ram janmabhoomi|hanuman garhi/i,
    src: '/images/kashi-ganga-ghats-varanasi.webp',
    alt: 'A north Indian temple town on the Ganga plain at dusk',
  },
  {
    match: /solang|kullu|manikaran|rohtang|mall road|the ridge|kufri/i,
    src: '/images/shimla-manali-snow-village.webp',
    alt: 'Snow-covered wooden houses and pine slopes in a Himachal hill village',
  },
  {
    match: /delhi|new delhi|agra|taj mahal|mathura|vrindavan/i,
    src: '/images/rajasthan-jaipur-hawa-mahal.webp',
    alt: 'Latticed north Indian facade of a heritage building at Delhi on the way to the hills',
  },
  {
    match: /dwarka|somnath|porbandar|kevadiya|statue of unity|gir/i,
    src: '/images/rajasthan-jaipur-hawa-mahal.webp',
    alt: 'Carved stone north Indian temple and palace facades in Gujarat',
  },
  /* The places on the South India circuit the office has its own photographs
     for. Each is listed before the shared South India entry, so a day naming one
     of them is shown the place it names rather than the circuit's general
     temple picture. Mantralayam comes first, because the festival day names the
     town and the Golden Temple together and needs the building itself, with the
     plain Mantralayam entry beneath it picking up any other day that names only
     the town. */
  {
    match: /golden temple|brindavan|tungabhadra/i,
    src: '/images/mantralayam-golden-temple.webp',
    alt: 'The gold-plated gopuram and pillared walkways of the Golden Temple at Mantralayam, seen across its water tank',
  },
  {
    match: /mantralayam|raghavendra/i,
    src: '/images/mantralayam-temple.webp',
    alt: 'Pilgrims queuing through the arched gateway of the Mantralayam mutt at dusk, its facade lit warm',
  },
  {
    match: /srisailam|mallikarjuna|nallamala/i,
    src: '/images/srisailam-temple.webp',
    alt: 'The illuminated gopuram and lower temple at Srisailam beside the Krishna, with the Nallamala hills behind',
  },
  {
    match: /mahanandi|nandyal/i,
    src: '/images/mahanandi-temple.webp',
    alt: 'The giant seated Nandi bull beneath the trees at Mahanandi, garlanded with bells and gold chains',
  },
  {
    match: /kumbakonam|brihadeeswarar|thanjavur|tanjore|big temple/i,
    src: '/images/thanjavur-brihadeeswarar-nandi.webp',
    width: 549,
    height: 364,
    alt: 'The Brihadeeswarar temple at Thanjavur in low evening light, its stone vimana rising behind the colonnade and a carved Nandi bull',
  },
  /* The owner's own photograph of the Chidambaram gopuram, filed on the town and
     on Nataraja, which is the shrine the day is built around. It sits above the
     shared South India entry so the Chidambaram day shows Chidambaram. */
  {
    match: /chidambaram|nataraja|thillai/i,
    src: '/images/chidambaram-nataraja-gopuram.webp',
    width: 399,
    height: 501,
    alt: 'The nine-tiered gopuram of the Nataraja temple at Chidambaram, carved and painted in blue, pink and green, rising above its stone gateway',
  },
  {
    match: /hampi|kanchipuram|tirupati|vaitheeswaran|vijaya vittala/i,
    src: '/images/hampi-vijaya-vittala-temple.webp',
    alt: 'Hand-carved stone pillars and a sculpted temple tower in South India',
  },
  {
    match: /shirdi|shani shingnapur|trimbakeshwar|nashik|shegaon|tuljapur/i,
    src: '/images/shirdi-temple-crowd-devotees.webp',
    alt: 'Devotees gathered in a temple courtyard in Maharashtra',
  },
  {
    match: /shimla|manali|himalaya|himalayan|srinagar|gulmarg|pahalgam|sonmarg|amarnath|kedarnath|badrinath|gangotri|yamunotri|haridwar|rishikesh|nainital|kainchi|mukteshwar|amritsar|katra|vaishno|jammu|mcleodganj|dalhousie/i,
    src: '/images/kashmir-himalayan-valley.webp',
    alt: 'A river valley between high Himalayan slopes under an open sky',
  },
  {
    match: /jaipur|jodhpur|udaipur|mount abu|pushkar|bhavnagar|ujjain|omkareshwar|maheshwar|indore|gujarat|rajasthan/i,
    src: '/images/rajasthan-jaipur-hawa-mahal.webp',
    alt: 'The latticed pink facade of Hawa Mahal in Jaipur',
  },
  {
    match: /kochi|munnar|thekkady|alleppey|kovalam|kerala|ooty|coonoor|doddabetta|nilgiri|mysuru|mysore|coorg|madikeri|karnataka/i,
    src: '/images/kerala-backwaters-houseboat.webp',
    alt: 'A houseboat on a palm-lined Kerala backwater canal',
  },
  {
    match: /goa|panaji|baga|calangute|anjuna|palolem|fontainhas|mandovi/i,
    src: '/images/goa-palm-beach-shoreline.webp',
    alt: 'Palm trees along a sandy shoreline in Goa',
  },
  {
    match: /port blair|havelock|neil island|radhanagar|andaman/i,
    src: '/images/andaman-clear-water-island.webp',
    alt: 'Clear shallow water over a pale sand beach',
  },
  {
    match: /agatti|bangaram|kavaratti|lakshadweep/i,
    src: '/images/lakshadweep-coral-lagoon-boat.webp',
    alt: 'A small wooden boat anchored on a turquoise coral lagoon beside a white sand spit',
  },
  {
    match: /bangkok|pattaya|phuket|phang nga|phi phi|thailand/i,
    src: '/images/thailand-longtail-boat-islands.webp',
    alt: 'A longtail boat below limestone islands in turquoise water',
  },
  {
    match: /dubai|abu dhabi|sharjah|desert safari/i,
    src: '/images/dubai-skyline-burj-khalifa.webp',
    alt: 'Modern high-rise skyline in Dubai at evening',
  },
  {
    match: /singapore|sentosa|kuala lumpur|genting|marina bay|batu caves|malacca|europe|paris|amsterdam|cologne|zurich|lucerne|titlis|jungfrau|innsbruck|venice|rome|vatican|brussels|pisa|florence/i,
    src: '/images/singapore-marina-bay-skyline.webp',
    alt: 'The Marina Bay waterfront in Singapore at night',
  },
  {
    match: /bali|ubud|nusa penida|kuta|uluwatu|denpasar|tegallalang/i,
    src: '/images/bali-rice-terrace-temple.webp',
    alt: 'Terraced green rice fields on a hillside',
  },
  {
    match: /nepal|kathmandu|pokhara|chitwan|nagarkot|phewa|syabrubesi|pashupatinath/i,
    src: '/images/nepal-phewa-lake-annapurna.webp',
    alt: 'Boats on a lake with snow-covered Himalayan peaks behind them at Pokhara',
  },
  {
    match: /bhutan|thimphu|paro|punakha|phuentsholing|taktsang|dochula/i,
    src: '/images/bhutan-paro-valley-monastery.webp',
    alt: 'A white monastery with red and gold roofs above a pine-covered Bhutanese valley',
  },
  {
    match: /guwahati|kaziranga|majuli|tawang|dirang|shillong|cherrapunji|dawki|assam|arunachal|meghalaya/i,
    src: '/images/kerala-backwaters-houseboat.webp',
    alt: 'Green hills and water on a long road journey through the North East',
  },
  {
    match: /sydney|melbourne|queenstown|milford|mount cook|christchurch|auckland|rotorua|waitomo|tasman/i,
    src: '/images/sydney-harbour-opera-house.webp',
    alt: 'The Sydney Opera House and the harbour bridge across the water at dusk',
  },
  {
    match: /kailash|manasarovar|kerung|saga|darchen|parikrama|tibet/i,
    src: '/images/kailash-manasarovar-plateau-lake.webp',
    alt: 'A turquoise high-altitude lake on the barren plateau with snow peaks behind it',
  },
  {
    match: /hyderabad|golconda|ramoji|charminar|hussain sagar/i,
    src: '/images/hampi-vijaya-vittala-temple.webp',
    alt: 'Carved stone architecture on the Deccan heritage route',
  },
]

/** The photograph a single day of a tour is shown with. A day may name its own;
 *  otherwise the first place it mentions that we hold a photograph of decides,
 *  and a day naming none keeps the tour's cover. Each entry carries the width
 *  and height of its file, so a day card declares the size of the picture it
 *  actually renders rather than one arbitrary pair for every photograph. */
const COVER_W = 1200
const COVER_H = 800
const TOUR_COVER_SIZE = { width: COVER_W, height: COVER_H }
export function dayImage(
  tour: Tour,
  day: Tour['itinerary'][number],
): { src: string; alt: string; width: number; height: number } {
  if (day.image) return { src: day.image, alt: day.imageAlt ?? tour.imageAlt, ...TOUR_COVER_SIZE }
  const haystack = [day.title, day.body, ...(day.blocks?.flatMap((b) => b.items) ?? [])].join(' ')
  const hit = DAY_LIBRARY.find((entry) => entry.match.test(haystack))
  return hit
    ? { src: hit.src, alt: hit.alt, width: hit.width ?? COVER_W, height: hit.height ?? COVER_H }
    : { src: tour.image, alt: tour.imageAlt, ...TOUR_COVER_SIZE }
}

/* ── Who the journey is for ───────────────────────────────────────────────────
   The second way into the catalogue, beside region. Veena World's themed tours
   are the pattern: a traveller who has never heard of our tours knows whether
   they are a family, a couple or a group of elders, and can start there.
   `departures: null` means the office has not published a count — the card says
   what is true instead of a number we invented. */
export type Theme = {
  id: string
  name: string
  note: string
  /** Which tours satisfy this theme. Declared as a test, so the count is live. */
  test: (t: Tour) => boolean
  departures: number | null
  image?: string
  imageAlt?: string
}

export const themes: Theme[] = [
  {
    id: 'family',
    name: 'Family holidays',
    note: 'Rooms allotted by family, a pace that suits every age in the group',
    test: (t) => t.group !== 'pilgrimage',
    departures: null,
    image: '/images/singapore-marina-bay-skyline.webp',
    imageAlt: 'The Marina Bay waterfront lit up at night',
  },
  {
    id: 'seniors',
    name: 'For senior citizens',
    note: 'Short driving stages, rest days after long transfers, help at every climb',
    test: (t) => t.group === 'pilgrimage' || /senior|elder/i.test(t.bestFor),
    departures: null,
    image: '/images/shirdi-temple-crowd-devotees.webp',
    imageAlt: 'Devotees gathered in a temple courtyard in Maharashtra',
  },
  {
    id: 'honeymoon',
    name: 'Honeymoon',
    note: 'Private rooms, slow mornings and the two or three things worth the trip',
    test: (t) => /honeymoon/i.test(t.bestFor),
    departures: null,
    image: '/images/andaman-clear-water-island.webp',
    imageAlt: 'Clear shallow water over a pale sand beach',
  },
  {
    id: 'women',
    name: "Women's groups",
    note: 'A separate room share, a woman coordinator and shopping time built in',
    test: (t) => t.group === 'domestic' || t.group === 'pilgrimage',
    departures: null,
    image: '/images/kashi-ganga-ghats-varanasi.webp',
    imageAlt: 'Boats moored along the stepped ghats of the Ganga at Varanasi',
  },
  {
    id: 'weekend',
    name: 'Weekend and short trips',
    note: 'Two to four nights, leaving on a Friday or Saturday evening',
    test: (t) => t.nights <= 4,
    departures: null,
    image: '/images/goa-palm-beach-shoreline.webp',
    imageAlt: 'Palm trees along a sandy shoreline in Goa',
  },
  {
    id: 'groups',
    name: 'Group bus tours',
    note: 'One coach for the whole circuit, with pick-ups along the Belagavi roads',
    test: (t) => t.nights >= 5,
    departures: null,
    image: '/images/rajasthan-jaipur-hawa-mahal.webp',
    imageAlt: 'The latticed pink facade of Hawa Mahal in Jaipur',
  },
]

export function themeById(id: string) {
  return themes.find((t) => t.id === id)
}

/* ── The destination tree ─────────────────────────────────────────────────────
   Veena World's mega-menu, at the scale this office actually sells. Four
   regions, each holding the destinations we plan, so a visitor can reach
   Kashmir in two clicks without knowing our catalogue. */
export type Region = {
  id: string
  name: string
  /** The index page this region filters. */
  to: string
  destinations: { name: string; note: string }[]
}

export const regions: Region[] = [
  {
    id: 'india',
    name: 'India',
    to: '/domestic',
    destinations: [
      { name: 'Kashmir', note: 'Srinagar, Gulmarg, Pahalgam, Sonmarg' },
      { name: 'Kerala', note: 'Munnar, Thekkady, Alleppey, Kovalam' },
      { name: 'Rajasthan', note: 'Jaipur, Jodhpur, Udaipur, Mount Abu' },
      { name: 'Goa', note: 'The nearest coast to Belagavi' },
      { name: 'Andaman', note: 'Port Blair, Havelock, Neil Island' },
      { name: 'Karnataka', note: 'Hampi, Coorg, Mysuru, Gokarna' },
      { name: 'Ooty and Hyderabad', note: 'Nilgiri hills and the Deccan' },
      { name: 'Himachal and Uttarakhand', note: 'Shimla, Manali, Nainital, Rishikesh' },
      { name: 'North India', note: 'Delhi, Agra and the Golden Triangle' },
    ],
  },
  {
    id: 'pilgrimage',
    name: 'Pilgrimage',
    to: '/pilgrimage',
    destinations: [
      { name: 'Char Dham', note: 'Yamunotri, Gangotri, Kedarnath, Badrinath' },
      { name: 'Kashi', note: 'Varanasi and the Ganga ghats' },
      { name: 'Ayodhya', note: 'Ram Janmabhoomi and Hanuman Garhi' },
      { name: 'Shirdi', note: 'Sai darshan and Shani Shingnapur' },
      { name: 'Ashtavinayak', note: 'All eight Ganpati temples by coach' },
      { name: 'Rameshwaram', note: 'Rameshwaram, Madurai and Kanyakumari' },
      { name: 'Srisailam', note: 'Srisailam, Tirupati and Mallikarjuna' },
      { name: 'Kailash Manasarovar', note: 'Permits and medical clearance' },
    ],
  },
  {
    id: 'world',
    name: 'International',
    to: '/international',
    destinations: [
      { name: 'Dubai', note: 'Four hours away, visa arranged by us' },
      { name: 'Thailand', note: 'Bangkok, Pattaya, Phuket' },
      { name: 'Singapore', note: 'Sentosa, Marina Bay, Genting' },
      { name: 'Bali', note: 'Ubud, Nusa Penida, Uluwatu' },
      { name: 'Vietnam', note: 'Hanoi, Halong Bay, Da Nang' },
      { name: 'Sri Lanka', note: 'Kandy, Colombo, the hill train' },
      { name: 'Nepal', note: 'Kathmandu, Pokhara, Chitwan' },
      { name: 'Bhutan', note: 'Thimphu, Paro, the Tiger’s Nest' },
      { name: 'Europe', note: 'Group tours with Schengen visa help' },
      { name: 'Australia and New Zealand', note: 'Sydney, Queenstown, Rotorua' },
      { name: 'Mauritius', note: 'Reef lagoons and the south coast' },
    ],
  },
  {
    id: 'custom',
    name: 'Built around you',
    to: '/customised',
    destinations: [
      { name: 'Honeymoon packages', note: 'Private rooms and a slow pace' },
      { name: 'Family trips', note: 'Your dates, your group, your budget' },
      { name: 'Senior citizen journeys', note: 'Planned around the elders travelling' },
      { name: 'Group bus tours', note: 'A coach for your own circle' },
      { name: 'School and college groups', note: 'Educational tours with a coordinator' },
      { name: 'Corporate outings', note: 'Off-sites and incentive trips' },
      { name: 'Temple circuits', note: 'Built around one festival or one shrine' },
      { name: 'Pilgrimage by bus', note: 'Pick-ups along the Belagavi roads' },
    ],
  },
]

export const domesticCategories: Category[] = [
   { name: 'Shimla and Manali', to: '/tours/shimla-manali-dhamaka', note: 'Snow, 10 days, from ₹15,999' },
   { name: 'South India tour', to: '/tours/south-india-temple-circuit', note: '13 days, from ₹16,800' },
   { name: 'Bhutan', to: '/tours/bhutan-yatra', note: 'Paro and Thimphu, 6 days' },
   { name: 'Nepal', to: '/tours/nepal-yatra', note: 'Kathmandu, Pokhara, Chitwan, 8 days' },
   { name: 'North East', to: '/tours/assam-arunachal-meghalaya', note: 'Assam, Arunachal, Meghalaya' },
   { name: 'South India temples', to: '/tours/south-india-temple-circuit', note: 'Srisailam, Madurai, Kanyakumari' },
   { name: 'North India pilgrimage', to: '/tours/north-india-yatra', note: 'Prayagraj, Ayodhya, Kashi, Shirdi' },
   { name: 'Kashmir', to: '/tours?destination=Kashmir', note: 'Srinagar, Gulmarg, Pahalgam' },
  { name: 'South India deluxe', to: '/tours/south-india-deluxe-tour', note: '11 days, from ₹31,500' },
  { name: 'Kerala', to: '/tours?destination=Kerala', note: 'Backwaters and the Malabar coast' },
  { name: 'Rajasthan', to: '/tours?destination=Rajasthan', note: 'Jaipur, Jodhpur, Udaipur' },
  { name: 'Goa', to: '/tours?to=Goa', note: 'The closest coast to Belagavi' },
  { name: 'Andaman', to: '/tours?destination=Andaman', note: 'Reef water and island ferries' },
  { name: 'Karnataka', to: '/tours?destination=Karnataka', note: 'Hampi, Coorg, Mysuru, Ooty' },
  { name: 'North India', to: '/tours?destination=North%20India', note: 'Delhi, Agra, the Golden Triangle' },
  { name: 'Himachal and Uttarakhand', to: '/tours?destination=Himachal', note: 'Shimla, Manali, the hill stations' },
    { name: 'North East', to: '/tours?destination=North%20East', note: 'Kaziranga, Tawang, Shillong' },
    { name: 'Shimla and Manali', to: '/tours/shimla-manali-dhamaka', note: 'Snow, 10 days, from ₹15,999' },
    { name: 'South India tour', to: '/tours/south-india-temple-circuit', note: '13 days, from ₹16,800' },
    { name: 'Gujarat Jyotirlingas', to: '/tours/gujarat-jyotirlinga-tour', note: '15 days, from ₹28,000' },
    { name: 'Puri and Gangasagar', to: '/tours/puri-jagannath-gangasagar', note: '16 days, from ₹29,500' },
    { name: 'Ooty and Coonoor', to: '/tours/ooty-coonoor', note: '4 days in the Nilgiris, from ₹14,500' },
    { name: 'Hyderabad', to: '/tours/hyderabad-weekend', note: '4 days, Ramoji and Golconda, from ₹15,900' },
    { name: 'Andaman island escape', to: '/tours/andaman-island-escape', note: '6 days, three islands, from ₹42,000' },
    { name: 'Lakshadweep', to: '/tours/lakshadweep-islands', note: '5 days on the lagoons, from ₹56,000' },
    { name: 'Ooty and Coonoor', to: '/tours?destination=Ooty', note: 'The Nilgiri hills and Coonoor' },
    { name: 'Hyderabad', to: '/tours?destination=Hyderabad', note: 'Charminar, Golconda, Ramoji' },
  ]

export const pilgrimageCategories: Category[] = [
  { name: 'Char Dham Yatra', to: '/tours/char-dham-yatra-priced', note: '11 days, from ₹ 57,000' },
  { name: 'Kailash Manasarovar', to: '/tours/kailash-manasarovar-yatra', note: '14 days, from ₹2,35,000' },
  { name: 'Amarnath Yatra', to: '/tours/amarnath-yatra', note: '7 days, from ₹34,500' },
  { name: 'Amritsar and Vaishno Devi', to: '/tours/amritsar-vaishno-devi', note: '6 days, from ₹27,500' },
  { name: 'Kainchi Dham and Neem Karoli', to: '/tours/kainchi-dham-neem-karoli', note: '6 days in Kumaon, from ₹ 47,000' },
  { name: 'Omkareshwar and Ujjain', to: '/tours/omkareshwar-ujain', note: '5 days, two jyotirlingas, from ₹ 22,000' },
  { name: 'Kashi Vishwanath', to: '/tours?destination=Kashi', note: 'Varanasi and the Ganga ghats' },
  { name: 'Ayodhya and Prayagraj', to: '/tours?destination=Ayodhya', note: 'Ram Janmabhoomi and the Sangam' },
  { name: 'Ashtavinayak', to: '/tours?destination=Ashtavinayak', note: 'All eight Ganpati temples' },
  { name: 'Shirdi', to: '/tours?destination=Shirdi', note: 'Weekend coach circuit' },
  { name: 'Rameshwaram and Madurai', to: '/tours?destination=Rameshwaram', note: 'Tamil Nadu temple towns' },
  { name: 'Srisailam and Kanyakumari', to: '/tours?destination=Srisailam', note: 'South India temple circuit' },
]

export const internationalCategories: Category[] = [
  { name: 'Dubai', to: '/tours?destination=Dubai', note: 'Four hours away, visa on arrival' },
  { name: 'Thailand', to: '/tours?destination=Thailand', note: 'Bangkok, Pattaya, Phuket' },
  { name: 'Singapore and Malaysia', to: '/tours?destination=Singapore', note: 'Two countries, one route' },
  { name: 'Bali', to: '/tours?destination=Bali', note: 'Villas and rice terraces' },
  { name: 'Vietnam', to: '/tours?destination=Vietnam', note: 'Hanoi, Halong, Da Nang' },
  { name: 'Sri Lanka', to: '/tours?destination=Sri%20Lanka', note: 'Kandy, Colombo, the hill train' },
  { name: 'Nepal', to: '/tours/nepal-yatra', note: 'Kathmandu, Pokhara, Chitwan' },
  { name: 'Bhutan', to: '/tours/bhutan-yatra', note: 'Paro, Thimphu, the Tiger’s Nest' },
  { name: 'Europe', to: '/tours/europe-group-tour', note: '7 countries, 14 days, from ₹2,49,000' },
  { name: 'Australia and New Zealand', to: '/tours/australia-new-zealand', note: 'Both sides of the Tasman, 16 days, from ₹3,15,000' },
]
