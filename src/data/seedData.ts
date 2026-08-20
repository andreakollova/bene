export type BodyPart = 'chrbat' | 'koleno' | 'rameno' | 'clenok' | 'ine';
export type SessionType = 'strengthening' | 'routines' | 'stretch' | 'trainer_exercise';
export type Difficulty = 'light' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  bodyPart: BodyPart;
  sets: number;
  reps: number | string;
  restSeconds: number;
  painFlag?: boolean;
}

export interface VideoSession {
  id: string;
  title: string;
  description: string;
  type: SessionType;
  difficulty: Difficulty;
  durationMinutes: number;
  orientation: 'landscape' | 'portrait';
  videoUrl: string;
  coverUrl?: string;
  trainer?: string;
}

export interface DayPlan {
  id: string;
  dayNumber: number;
  title: string;
  exercises: Exercise[];
  videoSessionId?: string;
}

export interface WeekPlan {
  weekNumber: number;
  title: string;
  days: DayPlan[];
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  bodyPart: BodyPart;
  weeks: WeekPlan[];
  totalWeeks: number;
}

// ---------------------------------------------------------------------------
// Exercise Library — exercises correspond to actual trainer reels
// ---------------------------------------------------------------------------

export const EXERCISE_LIBRARY: Exercise[] = [
  // IAM reels
  {
    id: 'ex_iam_1',
    name: 'Výpad vzad s rotáciou trupu',
    description: 'Mobilizačný cvik na hrudnú chrbticu. Postav sa do výpadu, jednou rukou sa opri o stenu a rotuj hrudník smerom od steny.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_iam_2',
    name: 'Kľak s foam rollerom pri stene',
    description: 'V kľaku s foam rollerom za kolenom pri stene. Ruky vystreté dopredu, strečing bedrových flexorov a stabilizácia trupu.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: '30s',
    restSeconds: 30,
  },
  {
    id: 'ex_iam_3',
    name: 'Jednonožný mŕtvy ťah s palicou',
    description: 'Stoj na jednej nohe, predklon s palicou. Druhá noha ide dozadu. Posilnenie zadnej reťaze a nácvik rovnováhy.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_iam_4',
    name: 'Drep s rotáciou a gumou',
    description: 'V drepe s odporovou gumou okolo kolien, jednou rukou sa opri o zem a druhou rotuj hrudník nahor. Mobilita + sila.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_iam_5',
    name: 'Jednonožný stoj s úklonom',
    description: 'Stoj na jednej nohe, úklon trupu dopredu s odpaženou druhou nohou dozadu. Balančný a koordinačný cvik.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_iam_6',
    name: 'Bear crawl',
    description: 'Pohyb po štyroch s kolenami tesne nad zemou. Dynamická stabilizácia celého trupu a koordinácia končatín.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: '30s',
    restSeconds: 30,
  },
  {
    id: 'ex_iam_7',
    name: 'Rotácia hrudníka v ľahu na bruchu',
    description: 'V ľahu na bruchu otáčaj hrudník na stranu s jednou rukou za hlavou. Mobilizácia hrudnej chrbtice.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_iam_8',
    name: 'Dead bug s expanderom',
    description: 'V ľahu na chrbte s expanderom v rukách. Striedavo vystieraj nohy, udržuj driek pri podložke. Aktivácia hlbokého jadra.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_iam_9',
    name: 'Shadow boxing v stoji',
    description: 'Ľahký shadow boxing s rotáciou trupu. Dynamický rozcvičkový cvik na koordináciu a mobilitu.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: '30s',
    restSeconds: 30,
  },
  // Sport reels – Set 1
  {
    id: 'ex_sport_s1r1',
    name: 'Rotácia trupu v kľaku s činkou',
    description: 'V kľaku na kolenách drž činku pred sebou a rotuj trup do strán. Posilnenie šikmých brušných svalov.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s1r2',
    name: 'Hyperextenzia na lavičke',
    description: 'V ľahu na bruchu na lavičke, ruky pri hlave. Zdvíhaj hornú časť tela. Posilnenie vzpriamovačov chrbtice.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s1r3',
    name: 'Výpad vpred s oporou o stenu',
    description: 'V kľaku pri stene tlač rukami hexagonálnu činku do steny. Stabilizácia trupu s aktiváciou ramien.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s1r4',
    name: 'Polkľak s tlakom do steny',
    description: 'V polkľaku jednou rukou tlač do steny, druhú za hlavu. Aktivácia jadra a stabilizátorov v nestabilnej pozícii.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  // Sport reels – Set 2
  {
    id: 'ex_sport_s2r1',
    name: 'Pullover na lavičke s činkou',
    description: 'V ľahu na lavičke s pokrčenými nohami, ťahaj činku spoza hlavy dopredu. Posilnenie hrudníka a stabilizácia jadra.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s2r2',
    name: 'Bulharský drep',
    description: 'Jednonožný drep so zadnou nohou na lavičke. Posilnenie nôh a gluteálov s dôrazom na stabilitu.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: '30s',
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s2r3',
    name: 'Výpad s ťahom expandera',
    description: 'V polkľaku ťahaj expander oboma rukami dopredu. Posilnenie trupu a ramien v nestabilnej pozícii.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s2r4',
    name: 'Rotácia s expanderom v ľahu',
    description: 'V ľahu na bruchu s expanderom v ruke, rotuj a ťahaj. Posilnenie chrbta a rotátorov ramena.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s2r5',
    name: 'Pullover na lavičke – variácia',
    description: 'Pullover s jednoručkou na lavičke, nohy zdvihnuté. Izolácia hrudníka a koordinácia jadra.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s2r6',
    name: 'Rotácia s expanderom v ľahu na boku',
    description: 'V ľahu na boku ťahaj expander s rotáciou ramena. Posilnenie vonkajších rotátorov a stabilizátorov lopatky.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  // Sport reels – Set 3
  {
    id: 'ex_sport_s3r1',
    name: 'Prone row na šikmej lavičke',
    description: 'V ľahu na bruchu na šikmej lavičke ťahaj činky k telu. Posilnenie horného chrbta a stabilizátorov lopatiek.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s3r2',
    name: 'Prone Y-raise s činkou',
    description: 'V ľahu na bruchu zdvíhaj ruky s činkami do tvaru Y. Aktivácia dolných trapézov a stabilizátorov lopatiek.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s3r3',
    name: 'Dead bug',
    description: 'V ľahu na chrbte striedavo vystieraj ruku a protiľahlú nohu. Driek zostáva celý čas pri podložke.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s3r4',
    name: 'Strečing bedrových flexorov v kľaku',
    description: 'V polkľaku s rukou na bedrách tlač panvu dopredu. Hlboký strečing prednej časti bedra.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: '30s',
    restSeconds: 30,
  },
  // Sport reels – Set 4
  {
    id: 'ex_sport_s4r1',
    name: 'Drep s fitloptou pri stene',
    description: 'Drep s veľkou loptou pritlačenou o stenu. Stabilizácia trupu a posilnenie nôh v kontrolovanom pohybe.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s4r2',
    name: 'Pallof press v kľaku s expanderom',
    description: 'V kľaku drž expander pred hrudníkom a tlač ho dopredu. Anti-rotačné posilnenie jadra.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s4r3',
    name: 'Vonkajšia rotácia ramena na boku',
    description: 'V ľahu na boku s expanderom rotuj predlaktie smerom nahor. Posilnenie rotátorovej manžety.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s4r4',
    name: 'Vtáčí pes s expanderom',
    description: 'Na štyroch s expanderom okolo chodidla, striedavo vystieraj ruku a nohu. Posilnenie jadra s odporom.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s4r5',
    name: 'Hyperextenzia na podložke',
    description: 'V ľahu na bruchu na podložke zdvíhaj hornú časť tela. Základné posilnenie vzpriamovačov chrbtice.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  // Sport reels – Set 5
  {
    id: 'ex_sport_s5r1',
    name: 'Drep s fitloptou a expanderom',
    description: 'Drep s loptou pri stene a expanderom v rukách. Kombinácia posilnenia nôh a stabilizácie trupu.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
  {
    id: 'ex_sport_s5r2',
    name: 'Pallof press v kľaku – variácia',
    description: 'V kľaku na podložke ťahaj expander k telu a tlač ho dopredu. Anti-rotačná stabilizácia jadra.',
    bodyPart: 'chrbat',
    sets: 3,
    reps: 10,
    restSeconds: 30,
  },
];

// ---------------------------------------------------------------------------
// Video Sessions
// ---------------------------------------------------------------------------

export const SEED_VIDEO_SESSIONS: VideoSession[] = [
  {
    id: 'vs_w1_strength1',
    title: 'Strengthening | Light | 1',
    description:
      'Prvý posilňovací tréning zameraný na aktiváciu hlbokého stabilizačného systému a správne zapojenie brušných svalov.',
    type: 'strengthening',
    difficulty: 'light',
    durationMinutes: 20,
    orientation: 'landscape',
    videoUrl: '/videos/program/week1/strengthening_light_1.mov',
    coverUrl: '/videos/program/week1/strengthening_light_1.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w1_routine1',
    title: 'Ranná rutina 1 – Prebudenie chrbtice',
    description:
      'Jemná ranná rutina na uvoľnenie stuhnutosti a prípravu chrbtice na denné zaťaženie.',
    type: 'routines',
    difficulty: 'light',
    durationMinutes: 12,
    orientation: 'landscape',
    videoUrl: '/videos/program/week1/routines_1.mov',
    coverUrl: '/videos/program/week1/routines_1.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w1_strength2',
    title: 'Strengthening | Light | 2',
    description:
      'Druhý tréning prvého týždňa sa zameriava na mostík, lastúrnik a abdukciu bedrového kĺbu.',
    type: 'strengthening',
    difficulty: 'light',
    durationMinutes: 22,
    orientation: 'landscape',
    videoUrl: '/videos/program/week1/strengthening_light_2.mov',
    coverUrl: '/videos/program/week1/strengthening_light_2.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w1_routine2',
    title: 'Routines | 2',
    description:
      'Jemné strečingové cvičenia pred spánkom na uvoľnenie svalov driekovej oblasti a bedier.',
    type: 'routines',
    difficulty: 'light',
    durationMinutes: 10,
    orientation: 'landscape',
    videoUrl: '/videos/program/week1/routines_2.mov',
    coverUrl: '/videos/program/week1/routines_2.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w2_strength3',
    title: 'Strengthening | Light | 3',
    description:
      'Tretí posilňovací tréning pridáva vtáčí pes, predlakťový plank a koordinačné cvičenia jadra.',
    type: 'strengthening',
    difficulty: 'light',
    durationMinutes: 25,
    orientation: 'landscape',
    videoUrl: '/videos/program/week2/strengthening_light_3.mov',
    coverUrl: '/videos/program/week2/strengthening_light_3.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w2_routine3',
    title: 'Routines | 3',
    description:
      'Mobilizačné cvičenia pre driekovú oblasť a bedrové kĺby. Ideálne ráno pred prácou.',
    type: 'routines',
    difficulty: 'light',
    durationMinutes: 14,
    orientation: 'landscape',
    videoUrl: '/videos/program/week2/routines_3.mov',
    coverUrl: '/videos/program/week2/routines_3.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w2_strength4',
    title: 'Strengthening | Light | 4',
    description:
      'Štvrtý tréning zavádzajúci supermanna, hip hinge a mŕtvy ťah s jednou nohou.',
    type: 'strengthening',
    difficulty: 'light',
    durationMinutes: 26,
    orientation: 'landscape',
    videoUrl: '/videos/program/week2/strengthening_light_4.mov',
    coverUrl: '/videos/program/week2/strengthening_light_4.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w2_routine4',
    title: 'Večerná rutina 2 – Hlboké uvoľnenie',
    description:
      'Dlhšie výdrže v strečingových polohách pre hlbšie uvoľnenie driekovej fascie.',
    type: 'routines',
    difficulty: 'light',
    durationMinutes: 12,
    orientation: 'landscape',
    videoUrl: '/videos/program/week2/routines_4.mov',
    coverUrl: '/videos/program/week2/routines_4.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w3_strength5',
    title: 'Strengthening | Intermediate | 1',
    description:
      'Prvý tréning strednej intenzity. Pridávame bočný plank, copenhagen plank a rotácie hrudníka.',
    type: 'strengthening',
    difficulty: 'intermediate',
    durationMinutes: 28,
    orientation: 'landscape',
    videoUrl: '/videos/program/week3/strengthening_inter_1.mov',
    coverUrl: '/videos/program/week3/strengthening_inter_1.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w3_routine5',
    title: 'Routines | 5',
    description:
      'Aktívna ranná rutina s väčším dôrazom na silu jadra a kontrolu pohybu bedier.',
    type: 'routines',
    difficulty: 'intermediate',
    durationMinutes: 16,
    orientation: 'landscape',
    videoUrl: '/videos/program/week3/routines_5.mov',
    coverUrl: '/videos/program/week3/routines_5.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w3_strength6',
    title: 'Strengthening | Intermediate | 2',
    description:
      'Funkčné vzory pohybu: mŕtvy ťah, výpad s rotáciou a sed pri stene pre komplexnú stabilitu.',
    type: 'strengthening',
    difficulty: 'intermediate',
    durationMinutes: 30,
    orientation: 'landscape',
    videoUrl: '/videos/program/week3/strengthening_inter_2.mov',
    coverUrl: '/videos/program/week3/strengthening_inter_2.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'vs_w3_routine6',
    title: 'Routines | 6',
    description:
      'Regeneračná rutina so zameraním na pigeon stretch, detskú polohu a dychové cvičenia.',
    type: 'routines',
    difficulty: 'intermediate',
    durationMinutes: 14,
    orientation: 'landscape',
    videoUrl: '/videos/program/week3/routines_6.mov',
    coverUrl: '/videos/program/week3/routines_6.jpg',
    trainer: 'Pamela',
  },
];

// ---------------------------------------------------------------------------
// Stretches
// ---------------------------------------------------------------------------

export const SEED_STRETCHES: VideoSession[] = [
  {
    id: 'stretch_office',
    title: 'Kancelársky strečing',
    description:
      'Krátky strečing vhodný priamo pri pracovnom stole. Uvoľní stuhnutú šiju, ramená a driek po dlhom sedení.',
    type: 'stretch',
    difficulty: 'light',
    durationMinutes: 10,
    orientation: 'portrait',
    videoUrl: '/videos/stretches/pamela_office_stretch.mp4',
    coverUrl: '/videos/stretches/pamela_office_stretch.jpg',
    trainer: 'Pamela',
  },
  {
    id: 'stretch_upper_body',
    title: 'Strečing hornej časti tela',
    description:
      'Komplexný strečing ramien, hrudníka a hornej časti chrbtice. Vhodný po posilňovaní alebo ako samostatná jednotka.',
    type: 'stretch',
    difficulty: 'light',
    durationMinutes: 15,
    orientation: 'portrait',
    videoUrl: '/videos/stretches/pamela_upper_body_stretch.mp4',
    coverUrl: '/videos/stretches/pamela_upper_body_stretch.jpg',
    trainer: 'Pamela',
  },
];

// ---------------------------------------------------------------------------
// Trainer Reels
// ---------------------------------------------------------------------------

export const SEED_TRAINER_REELS: VideoSession[] = [
  // --- I AM reels ---
  { id: 'reel_iam_1', title: 'Výpad vzad s rotáciou trupu', description: 'Mobilizačný cvik na hrudnú chrbticu. Postav sa do výpadu, jednou rukou sa opri o stenu a rotuj hrudník smerom od steny.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_1.mp4', coverUrl: '/videos/reels_iam/reel_1.jpg' },
  { id: 'reel_iam_2', title: 'Kľak s foam rollerom pri stene', description: 'V kľaku s foam rollerom za kolenom pri stene. Ruky vystreté dopredu, strečing bedrových flexorov a stabilizácia trupu.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_2.mp4', coverUrl: '/videos/reels_iam/reel_2.jpg' },
  { id: 'reel_iam_3', title: 'Jednonožný mŕtvy ťah s palicou', description: 'Stoj na jednej nohe, predklon s palicou. Druhá noha ide dozadu. Posilnenie zadnej reťaze a nácvik rovnováhy.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_3.mp4', coverUrl: '/videos/reels_iam/reel_3.jpg' },
  { id: 'reel_iam_4', title: 'Drep s rotáciou a gumou', description: 'V drepe s odporovou gumou okolo kolien, jednou rukou sa opri o zem a druhou rotuj hrudník nahor. Mobilita + sila.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_4.mp4', coverUrl: '/videos/reels_iam/reel_4.jpg' },
  { id: 'reel_iam_5', title: 'Jednonožný stoj s úklonom', description: 'Stoj na jednej nohe, úklon trupu dopredu s odpaženou druhou nohou dozadu. Balančný a koordinačný cvik.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_5.mp4', coverUrl: '/videos/reels_iam/reel_5.jpg' },
  { id: 'reel_iam_6', title: 'Bear crawl', description: 'Pohyb po štyroch s kolenami tesne nad zemou. Dynamická stabilizácia celého trupu a koordinácia končatín.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_6.mp4', coverUrl: '/videos/reels_iam/reel_6.jpg' },
  { id: 'reel_iam_7', title: 'Rotácia hrudníka v ľahu na bruchu', description: 'V ľahu na bruchu otáčaj hrudník na stranu s jednou rukou za hlavou. Mobilizácia hrudnej chrbtice.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_7.mp4', coverUrl: '/videos/reels_iam/reel_7.jpg' },
  { id: 'reel_iam_8', title: 'Dead bug s expanderom', description: 'V ľahu na chrbte s expanderom v rukách. Striedavo vystieraj nohy, udržuj driek pri podložke. Aktivácia hlbokého jadra.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_8.mp4', coverUrl: '/videos/reels_iam/reel_8.jpg' },
  { id: 'reel_iam_9', title: 'Shadow boxing v stoji', description: 'Ľahký shadow boxing s rotáciou trupu. Dynamický rozcvičkový cvik na koordináciu a mobilitu.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_iam/reel_9.mp4', coverUrl: '/videos/reels_iam/reel_9.jpg' },
  // --- Sport reels - Set 1 ---
  { id: 'reel_sport_s1r1', title: 'Rotácia trupu v kľaku s činkou', description: 'V kľaku na kolenách drž činku pred sebou a rotuj trup do strán. Posilnenie šikmých brušných svalov.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set1/reel_1.mp4', coverUrl: '/videos/reels_sport/set1/reel_1.jpg' },
  { id: 'reel_sport_s1r2', title: 'Hyperextenzia na lavičke', description: 'V ľahu na bruchu na lavičke, ruky pri hlave. Zdvíhaj hornú časť tela. Posilnenie vzpriamovačov chrbtice.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set1/reel_2.mp4', coverUrl: '/videos/reels_sport/set1/reel_2.jpg' },
  { id: 'reel_sport_s1r3', title: 'Výpad vpred s oporou o stenu', description: 'V kľaku pri stene tlač rukami hexagonálnu činku do steny. Stabilizácia trupu s aktiváciou ramien.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set1/reel_3.mp4', coverUrl: '/videos/reels_sport/set1/reel_3.jpg' },
  { id: 'reel_sport_s1r4', title: 'Polkľak s tlakom do steny', description: 'V polkľaku jednou rukou tlač do steny, druhú za hlavu. Aktivácia jadra a stabilizátorov v nestabilnej pozícii.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set1/reel_4.mp4', coverUrl: '/videos/reels_sport/set1/reel_4.jpg' },
  // --- Sport reels - Set 2 ---
  { id: 'reel_sport_s2r1', title: 'Pullover na lavičke s činkou', description: 'V ľahu na lavičke s pokrčenými nohami, ťahaj činku spoza hlavy dopredu. Posilnenie hrudníka a stabilizácia jadra.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set2/reel_1.mp4', coverUrl: '/videos/reels_sport/set2/reel_1.jpg' },
  { id: 'reel_sport_s2r2', title: 'Bulharský drep', description: 'Jednonožný drep so zadnou nohou na lavičke. Posilnenie nôh a gluteálov s dôrazom na stabilitu.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set2/reel_2.mp4', coverUrl: '/videos/reels_sport/set2/reel_2.jpg' },
  { id: 'reel_sport_s2r3', title: 'Výpad s ťahom expandera', description: 'V polkľaku ťahaj expander oboma rukami dopredu. Posilnenie trupu a ramien v nestabilnej pozícii.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set2/reel_3.mp4', coverUrl: '/videos/reels_sport/set2/reel_3.jpg' },
  { id: 'reel_sport_s2r4', title: 'Rotácia s expanderom v ľahu', description: 'V ľahu na bruchu s expanderom v ruke, rotuj a ťahaj. Posilnenie chrbta a rotátorov ramena.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set2/reel_4.mp4', coverUrl: '/videos/reels_sport/set2/reel_4.jpg' },
  { id: 'reel_sport_s2r5', title: 'Pullover na lavičke – variácia', description: 'Pullover s jednoručkou na lavičke, nohy zdvihnuté. Izolácia hrudníka a koordinácia jadra.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set2/reel_5.mp4', coverUrl: '/videos/reels_sport/set2/reel_5.jpg' },
  { id: 'reel_sport_s2r6', title: 'Rotácia s expanderom v ľahu na boku', description: 'V ľahu na boku ťahaj expander s rotáciou ramena. Posilnenie vonkajších rotátorov a stabilizátorov lopatky.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set2/reel_6.mp4', coverUrl: '/videos/reels_sport/set2/reel_6.jpg' },
  // --- Sport reels - Set 3 ---
  { id: 'reel_sport_s3r1', title: 'Prone row na šikmej lavičke', description: 'V ľahu na bruchu na šikmej lavičke ťahaj činky k telu. Posilnenie horného chrbta a stabilizátorov lopatiek.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set3/reel_1.mp4', coverUrl: '/videos/reels_sport/set3/reel_1.jpg' },
  { id: 'reel_sport_s3r2', title: 'Prone Y-raise s činkou', description: 'V ľahu na bruchu zdvíhaj ruky s činkami do tvaru Y. Aktivácia dolných trapézov a stabilizátorov lopatiek.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set3/reel_2.mp4', coverUrl: '/videos/reels_sport/set3/reel_2.jpg' },
  { id: 'reel_sport_s3r3', title: 'Dead bug', description: 'V ľahu na chrbte striedavo vystieraj ruku a protiľahlú nohu. Driek zostáva celý čas pri podložke.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set3/reel_3.mp4', coverUrl: '/videos/reels_sport/set3/reel_3.jpg' },
  { id: 'reel_sport_s3r4', title: 'Strečing bedrových flexorov v kľaku', description: 'V polkľaku s rukou na bedrách tlač panvu dopredu. Hlboký strečing prednej časti bedra.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set3/reel_4.mp4', coverUrl: '/videos/reels_sport/set3/reel_4.jpg' },
  // --- Sport reels - Set 4 ---
  { id: 'reel_sport_s4r1', title: 'Drep s fitloptou pri stene', description: 'Drep s veľkou loptou pritlačenou o stenu. Stabilizácia trupu a posilnenie nôh v kontrolovanom pohybe.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set4/reel_1.mp4', coverUrl: '/videos/reels_sport/set4/reel_1.jpg' },
  { id: 'reel_sport_s4r2', title: 'Pallof press v kľaku s expanderom', description: 'V kľaku drž expander pred hrudníkom a tlač ho dopredu. Anti-rotačné posilnenie jadra.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set4/reel_2.mp4', coverUrl: '/videos/reels_sport/set4/reel_2.jpg' },
  { id: 'reel_sport_s4r3', title: 'Vonkajšia rotácia ramena na boku', description: 'V ľahu na boku s expanderom rotuj predlaktie smerom nahor. Posilnenie rotátorovej manžety.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set4/reel_3.mp4', coverUrl: '/videos/reels_sport/set4/reel_3.jpg' },
  { id: 'reel_sport_s4r4', title: 'Vtáčí pes s expanderom', description: 'Na štyroch s expanderom okolo chodidla, striedavo vystieraj ruku a nohu. Posilnenie jadra s odporom.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set4/reel_4.mp4', coverUrl: '/videos/reels_sport/set4/reel_4.jpg' },
  { id: 'reel_sport_s4r5', title: 'Hyperextenzia na podložke', description: 'V ľahu na bruchu na podložke zdvíhaj hornú časť tela. Základné posilnenie vzpriamovačov chrbtice.', type: 'trainer_exercise', difficulty: 'light', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set4/reel_5.mp4', coverUrl: '/videos/reels_sport/set4/reel_5.jpg' },
  // --- Sport reels - Set 5 ---
  { id: 'reel_sport_s5r1', title: 'Drep s fitloptou a expanderom', description: 'Drep s loptou pri stene a expanderom v rukách. Kombinácia posilnenia nôh a stabilizácie trupu.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set5/reel_1.mp4', coverUrl: '/videos/reels_sport/set5/reel_1.jpg' },
  { id: 'reel_sport_s5r2', title: 'Pallof press v kľaku – variácia', description: 'V kľaku na podložke ťahaj expander k telu a tlač ho dopredu. Anti-rotačná stabilizácia jadra.', type: 'trainer_exercise', difficulty: 'intermediate', durationMinutes: 1, orientation: 'portrait', videoUrl: '/videos/reels_sport/set5/reel_2.mp4', coverUrl: '/videos/reels_sport/set5/reel_2.jpg' },
];

// ---------------------------------------------------------------------------
// Seed Plan: Dolný chrbát – 4 týždne
// ---------------------------------------------------------------------------

export const SEED_PLAN: Plan = {
  id: 'plan_dolny_chrbat_8w',
  name: 'Dolný chrbát – 8 týždňov',
  description:
    '8-týždňový program, 2x týždenne (pondelok + streda). Postupný prechod od aktivácie jadra po pokročilé posilnenie.',
  bodyPart: 'chrbat',
  totalWeeks: 8,
  weeks: [
    // ------------------------------------------------------------------ WEEK 1
    {
      weekNumber: 1,
      title: 'Light | Week 1',
      days: [
        {
          id: 'w1d1',
          dayNumber: 1,
          title: 'Monday – Mobilization & rotation',
          videoSessionId: 'vs_w1_strength1',
          exercises: [
            {
              id: 'w1d1_ex1',
              name: 'Výpad vzad s rotáciou trupu',
              description: 'Mobilizačný cvik na hrudnú chrbticu. Postav sa do výpadu, jednou rukou sa opri o stenu a rotuj hrudník smerom od steny.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w1d1_ex2',
              name: 'Rotácia hrudníka v ľahu na bruchu',
              description: 'V ľahu na bruchu otáčaj hrudník na stranu s jednou rukou za hlavou. Mobilizácia hrudnej chrbtice.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w1d1_ex3',
              name: 'Shadow boxing v stoji',
              description: 'Ľahký shadow boxing s rotáciou trupu. Dynamický rozcvičkový cvik na koordináciu a mobilitu.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: '30s',
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w1d2',
          dayNumber: 2,
          title: 'Wednesday – Flexors & balance',
          videoSessionId: 'vs_w1_routine1',
          exercises: [
            {
              id: 'w1d2_ex1',
              name: 'Kľak s foam rollerom pri stene',
              description: 'V kľaku s foam rollerom za kolenom pri stene. Ruky vystreté dopredu, strečing bedrových flexorov a stabilizácia trupu.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: '30s',
              restSeconds: 30,
            },
            {
              id: 'w1d2_ex2',
              name: 'Jednonožný mŕtvy ťah s palicou',
              description: 'Stoj na jednej nohe, predklon s palicou. Druhá noha ide dozadu. Posilnenie zadnej reťaze a nácvik rovnováhy.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w1d2_ex3',
              name: 'Jednonožný stoj s úklonom',
              description: 'Stoj na jednej nohe, úklon trupu dopredu s odpaženou druhou nohou dozadu. Balančný a koordinačný cvik.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ WEEK 2
    {
      weekNumber: 2,
      title: 'Light | Week 1I',
      days: [
        {
          id: 'w1d3',
          dayNumber: 1,
          title: 'Monday – Core activation',
          videoSessionId: 'vs_w1_strength2',
          exercises: [
            {
              id: 'w1d3_ex1',
              name: 'Dead bug s expanderom',
              description: 'V ľahu na chrbte s expanderom v rukách. Striedavo vystieraj nohy, udržuj driek pri podložke. Aktivácia hlbokého jadra.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w1d3_ex2',
              name: 'Bear crawl',
              description: 'Pohyb po štyroch s kolenami tesne nad zemou. Dynamická stabilizácia celého trupu a koordinácia končatín.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: '30s',
              restSeconds: 30,
            },
            {
              id: 'w1d3_ex3',
              name: 'Drep s rotáciou a gumou',
              description: 'V drepe s odporovou gumou okolo kolien, jednou rukou sa opri o zem a druhou rotuj hrudník nahor. Mobilita + sila.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w1d4',
          dayNumber: 2,
          title: 'Wednesday – Release & stretch',
          videoSessionId: 'vs_w1_routine2',
          exercises: [
            {
              id: 'w1d4_ex1',
              name: 'Výpad vzad s rotáciou trupu',
              description: 'Mobilizačný cvik na hrudnú chrbticu. Postav sa do výpadu, jednou rukou sa opri o stenu a rotuj hrudník smerom od steny.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w1d4_ex2',
              name: 'Kľak s foam rollerom pri stene',
              description: 'V kľaku s foam rollerom za kolenom pri stene. Ruky vystreté dopredu, strečing bedrových flexorov a stabilizácia trupu.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: '30s',
              restSeconds: 30,
            },
            {
              id: 'w1d4_ex3',
              name: 'Rotácia hrudníka v ľahu na bruchu',
              description: 'V ľahu na bruchu otáčaj hrudník na stranu s jednou rukou za hlavou. Mobilizácia hrudnej chrbtice.',
              bodyPart: 'chrbat',
              sets: 2,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ WEEK 3
    {
      weekNumber: 3,
      title: 'Light | Week 3',
      days: [
        {
          id: 'w2d1',
          dayNumber: 1,
          title: 'Monday – Extensors & rotators',
          videoSessionId: 'vs_w2_strength3',
          exercises: [
            {
              id: 'w2d1_ex1',
              name: 'Hyperextenzia na lavičke',
              description: 'V ľahu na bruchu na lavičke, ruky pri hlave. Zdvíhaj hornú časť tela. Posilnenie vzpriamovačov chrbtice.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d1_ex2',
              name: 'Rotácia trupu v kľaku s činkou',
              description: 'V kľaku na kolenách drž činku pred sebou a rotuj trup do strán. Posilnenie šikmých brušných svalov.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d1_ex3',
              name: 'Dead bug s expanderom',
              description: 'V ľahu na chrbte s expanderom v rukách. Striedavo vystieraj nohy, udržuj driek pri podložke. Aktivácia hlbokého jadra.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w2d2',
          dayNumber: 2,
          title: 'Wednesday – Stability & press',
          videoSessionId: 'vs_w2_routine3',
          exercises: [
            {
              id: 'w2d2_ex1',
              name: 'Polkľak s tlakom do steny',
              description: 'V polkľaku jednou rukou tlač do steny, druhú za hlavu. Aktivácia jadra a stabilizátorov v nestabilnej pozícii.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d2_ex2',
              name: 'Výpad vpred s oporou o stenu',
              description: 'V kľaku pri stene tlač rukami hexagonálnu činku do steny. Stabilizácia trupu s aktiváciou ramien.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d2_ex3',
              name: 'Jednonožný mŕtvy ťah s palicou',
              description: 'Stoj na jednej nohe, predklon s palicou. Druhá noha ide dozadu. Posilnenie zadnej reťaze a nácvik rovnováhy.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ WEEK 4
    {
      weekNumber: 4,
      title: 'Light | Week 3I',
      days: [
        {
          id: 'w2d3',
          dayNumber: 1,
          title: 'Monday – Pulls & pullover',
          videoSessionId: 'vs_w2_strength4',
          exercises: [
            {
              id: 'w2d3_ex1',
              name: 'Pullover na lavičke s činkou',
              description: 'V ľahu na lavičke s pokrčenými nohami, ťahaj činku spoza hlavy dopredu. Posilnenie hrudníka a stabilizácia jadra.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d3_ex2',
              name: 'Výpad s ťahom expandera',
              description: 'V polkľaku ťahaj expander oboma rukami dopredu. Posilnenie trupu a ramien v nestabilnej pozícii.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d3_ex3',
              name: 'Bear crawl',
              description: 'Pohyb po štyroch s kolenami tesne nad zemou. Dynamická stabilizácia celého trupu a koordinácia končatín.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: '30s',
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w2d4',
          dayNumber: 2,
          title: 'Wednesday – Active recovery',
          videoSessionId: 'vs_w2_routine4',
          exercises: [
            {
              id: 'w2d4_ex1',
              name: 'Rotácia s expanderom v ľahu',
              description: 'V ľahu na bruchu s expanderom v ruke, rotuj a ťahaj. Posilnenie chrbta a rotátorov ramena.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d4_ex2',
              name: 'Rotácia s expanderom v ľahu na boku',
              description: 'V ľahu na boku ťahaj expander s rotáciou ramena. Posilnenie vonkajších rotátorov a stabilizátorov lopatky.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w2d4_ex3',
              name: 'Bulharský drep',
              description: 'Jednonožný drep so zadnou nohou na lavičke. Posilnenie nôh a gluteálov s dôrazom na stabilitu.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: '30s',
              restSeconds: 30,
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ WEEK 5
    {
      weekNumber: 5,
      title: 'Intermediate | Week 5',
      days: [
        {
          id: 'w3d1',
          dayNumber: 1,
          title: 'Monday – Upper back & scapula',
          videoSessionId: 'vs_w3_strength5',
          exercises: [
            {
              id: 'w3d1_ex1',
              name: 'Prone row na šikmej lavičke',
              description: 'V ľahu na bruchu na šikmej lavičke ťahaj činky k telu. Posilnenie horného chrbta a stabilizátorov lopatiek.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d1_ex2',
              name: 'Prone Y-raise s činkou',
              description: 'V ľahu na bruchu zdvíhaj ruky s činkami do tvaru Y. Aktivácia dolných trapézov a stabilizátorov lopatiek.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d1_ex3',
              name: 'Dead bug',
              description: 'V ľahu na chrbte striedavo vystieraj ruku a protiľahlú nohu. Driek zostáva celý čas pri podložke.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d1_ex4',
              name: 'Strečing bedrových flexorov v kľaku',
              description: 'V polkľaku s rukou na bedrách tlač panvu dopredu. Hlboký strečing prednej časti bedra.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: '30s',
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w3d2',
          dayNumber: 2,
          title: 'Wednesday – Anti-rotation & stability',
          videoSessionId: 'vs_w3_routine5',
          exercises: [
            {
              id: 'w3d2_ex1',
              name: 'Drep s fitloptou pri stene',
              description: 'Drep s veľkou loptou pritlačenou o stenu. Stabilizácia trupu a posilnenie nôh v kontrolovanom pohybe.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d2_ex2',
              name: 'Pallof press v kľaku s expanderom',
              description: 'V kľaku drž expander pred hrudníkom a tlač ho dopredu. Anti-rotačné posilnenie jadra.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d2_ex3',
              name: 'Vtáčí pes s expanderom',
              description: 'Na štyroch s expanderom okolo chodidla, striedavo vystieraj ruku a nohu. Posilnenie jadra s odporom.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d2_ex4',
              name: 'Hyperextenzia na podložke',
              description: 'V ľahu na bruchu na podložke zdvíhaj hornú časť tela. Základné posilnenie vzpriamovačov chrbtice.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ WEEK 6
    {
      weekNumber: 6,
      title: 'Intermediate | Week 5I',
      days: [
        {
          id: 'w3d3',
          dayNumber: 1,
          title: 'Monday – Rotators & core',
          videoSessionId: 'vs_w3_strength6',
          exercises: [
            {
              id: 'w3d3_ex1',
              name: 'Vonkajšia rotácia ramena na boku',
              description: 'V ľahu na boku s expanderom rotuj predlaktie smerom nahor. Posilnenie rotátorovej manžety.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d3_ex2',
              name: 'Pullover na lavičke – variácia',
              description: 'Pullover s jednoručkou na lavičke, nohy zdvihnuté. Izolácia hrudníka a koordinácia jadra.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d3_ex3',
              name: 'Drep s fitloptou a expanderom',
              description: 'Drep s loptou pri stene a expanderom v rukách. Kombinácia posilnenia nôh a stabilizácie trupu.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d3_ex4',
              name: 'Pallof press v kľaku – variácia',
              description: 'V kľaku na podložke ťahaj expander k telu a tlač ho dopredu. Anti-rotačná stabilizácia jadra.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w3d4',
          dayNumber: 2,
          title: 'Wednesday – Recovery & mobility',
          videoSessionId: 'vs_w3_routine6',
          exercises: [
            {
              id: 'w3d4_ex1',
              name: 'Strečing bedrových flexorov v kľaku',
              description: 'V polkľaku s rukou na bedrách tlač panvu dopredu. Hlboký strečing prednej časti bedra.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: '30s',
              restSeconds: 30,
            },
            {
              id: 'w3d4_ex2',
              name: 'Prone Y-raise s činkou',
              description: 'V ľahu na bruchu zdvíhaj ruky s činkami do tvaru Y. Aktivácia dolných trapézov a stabilizátorov lopatiek.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d4_ex3',
              name: 'Rotácia hrudníka v ľahu na bruchu',
              description: 'V ľahu na bruchu otáčaj hrudník na stranu s jednou rukou za hlavou. Mobilizácia hrudnej chrbtice.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w3d4_ex4',
              name: 'Dead bug',
              description: 'V ľahu na chrbte striedavo vystieraj ruku a protiľahlú nohu. Driek zostáva celý čas pri podložke.',
              bodyPart: 'chrbat',
              sets: 3,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ WEEK 7
    {
      weekNumber: 7,
      title: 'Advanced | Week 7',
      days: [
        {
          id: 'w4d1',
          dayNumber: 1,
          title: 'Monday – Max core strength',
          videoSessionId: 'vs_w1_strength1',
          exercises: [
            {
              id: 'w4d1_ex1',
              name: 'Dead bug s expanderom',
              description: 'V ľahu na chrbte s expanderom v rukách. Striedavo vystieraj nohy, udržuj driek pri podložke. Aktivácia hlbokého jadra.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d1_ex2',
              name: 'Vtáčí pes s expanderom',
              description: 'Na štyroch s expanderom okolo chodidla, striedavo vystieraj ruku a nohu. Posilnenie jadra s odporom.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d1_ex3',
              name: 'Prone row na šikmej lavičke',
              description: 'V ľahu na bruchu na šikmej lavičke ťahaj činky k telu. Posilnenie horného chrbta a stabilizátorov lopatiek.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d1_ex4',
              name: 'Pallof press v kľaku s expanderom',
              description: 'V kľaku drž expander pred hrudníkom a tlač ho dopredu. Anti-rotačné posilnenie jadra.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w4d2',
          dayNumber: 2,
          title: 'Wednesday – Functional patterns',
          videoSessionId: 'vs_w1_routine1',
          exercises: [
            {
              id: 'w4d2_ex1',
              name: 'Jednonožný mŕtvy ťah s palicou',
              description: 'Stoj na jednej nohe, predklon s palicou. Druhá noha ide dozadu. Posilnenie zadnej reťaze a nácvik rovnováhy.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d2_ex2',
              name: 'Drep s rotáciou a gumou',
              description: 'V drepe s odporovou gumou okolo kolien, jednou rukou sa opri o zem a druhou rotuj hrudník nahor. Mobilita + sila.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d2_ex3',
              name: 'Drep s fitloptou a expanderom',
              description: 'Drep s loptou pri stene a expanderom v rukách. Kombinácia posilnenia nôh a stabilizácie trupu.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d2_ex4',
              name: 'Hyperextenzia na lavičke',
              description: 'V ľahu na bruchu na lavičke, ruky pri hlave. Zdvíhaj hornú časť tela. Posilnenie vzpriamovačov chrbtice.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ WEEK 8
    {
      weekNumber: 8,
      title: 'Advanced | Week 7I',
      days: [
        {
          id: 'w4d3',
          dayNumber: 1,
          title: 'Monday – Complete training',
          videoSessionId: 'vs_w1_strength2',
          exercises: [
            {
              id: 'w4d3_ex1',
              name: 'Rotácia trupu v kľaku s činkou',
              description: 'V kľaku na kolenách drž činku pred sebou a rotuj trup do strán. Posilnenie šikmých brušných svalov.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d3_ex2',
              name: 'Pullover na lavičke s činkou',
              description: 'V ľahu na lavičke s pokrčenými nohami, ťahaj činku spoza hlavy dopredu. Posilnenie hrudníka a stabilizácia jadra.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d3_ex3',
              name: 'Bear crawl',
              description: 'Pohyb po štyroch s kolenami tesne nad zemou. Dynamická stabilizácia celého trupu a koordinácia končatín.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: '30s',
              restSeconds: 30,
            },
            {
              id: 'w4d3_ex4',
              name: 'Prone Y-raise s činkou',
              description: 'V ľahu na bruchu zdvíhaj ruky s činkami do tvaru Y. Aktivácia dolných trapézov a stabilizátorov lopatiek.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
        {
          id: 'w4d4',
          dayNumber: 2,
          title: 'Wednesday – Final recovery',
          videoSessionId: 'vs_w1_routine2',
          exercises: [
            {
              id: 'w4d4_ex1',
              name: 'Strečing bedrových flexorov v kľaku',
              description: 'V polkľaku s rukou na bedrách tlač panvu dopredu. Hlboký strečing prednej časti bedra.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: '30s',
              restSeconds: 30,
            },
            {
              id: 'w4d4_ex2',
              name: 'Vonkajšia rotácia ramena na boku',
              description: 'V ľahu na boku s expanderom rotuj predlaktie smerom nahor. Posilnenie rotátorovej manžety.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d4_ex3',
              name: 'Rotácia hrudníka v ľahu na bruchu',
              description: 'V ľahu na bruchu otáčaj hrudník na stranu s jednou rukou za hlavou. Mobilizácia hrudnej chrbtice.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
            {
              id: 'w4d4_ex4',
              name: 'Pallof press v kľaku – variácia',
              description: 'V kľaku na podložke ťahaj expander k telu a tlač ho dopredu. Anti-rotačná stabilizácia jadra.',
              bodyPart: 'chrbat',
              sets: 4,
              reps: 10,
              restSeconds: 30,
            },
          ],
        },
      ],
    },
  ],
};
