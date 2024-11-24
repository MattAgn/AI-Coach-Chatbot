import { SessionRecording } from "~/domain/sessionRecording";

export const fakeSessionRecordings: SessionRecording[] = [
  {
    id: "t_928374",
    date: "2024-11-23T14:30:00.000Z",
    summary:
      "Première séance avec nouveau patient présentant des symptômes d'anxiété sociale. Évoque des difficultés au travail, particulièrement en réunion. Mentionne une enfance marquée par un père très critique. Bonne capacité d'introspection et d'expression émotionnelle. Patient motivé pour le travail thérapeutique.",
    transcript: `
T: Comment allez-vous aujourd'hui ?
P: Pas très bien à vrai dire... La semaine a été difficile au bureau.
T: Pouvez-vous m'en dire plus ?
P: J'ai dû présenter un projet devant toute l'équipe mardi. J'étais tellement stressé que j'ai à peine dormi la veille.
T: Comment s'est passée cette présentation finalement ?
P: Objectivement... ça s'est bien passé. Mon responsable m'a même félicité. Mais tout du long, j'avais cette voix dans ma tête qui me disait que je n'étais pas à la hauteur.
T: Cette voix critique, elle vous est familière ?
P: *silence* ... Oui, elle me fait penser à mon père. Il n'était jamais satisfait de mes résultats scolaires, même quand j'avais 18/20.
T: Comment cela vous faisait-il vous sentir, enfant ?
P: Que je ne serais jamais assez bien... Et c'est exactement ce que je ressens aujourd'hui en réunion.`,
  },
  {
    id: "t_834729",
    date: "2024-11-21T10:15:00.000Z",
    summary:
      "Séance focalisée sur la rupture récente avec sa compagne après 5 ans de relation. Forte charge émotionnelle avec alternance entre colère et tristesse. Premiers signes de dépression réactionnelle. Discussion sur les mécanismes de codépendance dans la relation. Patient ouvert à un travail sur ses schémas relationnels.",
    transcript: `
T: Comment s'est passée cette première semaine depuis notre dernière séance ?
P: *larmes aux yeux* C'est dur... J'ai croisé Marie au supermarché hier. Elle était avec lui.
T: Comment avez-vous réagi ?
P: Je me suis enfui. J'ai laissé mon caddie en plein milieu du rayon. C'était... c'était trop dur.
T: Qu'est-ce qui était le plus dur dans ce moment ?
P: De voir qu'elle a l'air heureuse. Ça fait à peine deux mois et elle a déjà refait sa vie. Moi je suis encore là à pleurer tous les soirs.
T: Vous semblez en colère...
P: Bien sûr que je suis en colère ! J'ai tout donné dans cette relation. J'ai sacrifié mes amis, mes hobbies, tout... pour elle.
T: Vous parlez de sacrifices. Était-ce son souhait ou votre choix ?
P: *long silence* ... Je... je ne sais pas. Je pensais que c'était ça l'amour. Être totalement dévoué à l'autre.`,
  },
  {
    id: "t_734582",
    date: "2024-11-18T16:45:00.000Z",
    summary:
      "Session centrée sur les troubles du sommeil chroniques. Exploration du lien avec l'hyperactivité professionnelle. Patient reconnaît utiliser le travail comme échappatoire. Mise en place d'un protocole d'hygiène du sommeil. Travail sur l'acceptation des moments de pause.",
    transcript: `
T: Comment va votre sommeil depuis la dernière fois ?
P: Toujours pareil. Je m'endors vers 3h du matin, après avoir tourné pendant des heures dans mon lit.
T: À quoi pensez-vous pendant ces heures ?
P: Au travail, principalement. Aux projets en cours, aux deadlines... Mon cerveau ne s'arrête jamais.
T: Que se passerait-il si vous vous autorisiez à ne pas penser au travail ?
P: *rire nerveux* Je prendrais du retard. Je perdrais le contrôle.
T: Le contrôle semble très important pour vous...
P: Vital même. Si je ne contrôle pas tout, tout peut s'écrouler.
T: D'où vient cette croyance, selon vous ?
P: *soupir* Probablement de mon enfance... Quand ma mère est tombée malade, j'ai dû tout gérer à la maison. J'avais 12 ans.`,
  },
  {
    id: "t_648392",
    date: "2024-11-16T13:00:00.000Z",
    summary:
      "Travail sur le deuil compliqué de sa mère décédée il y a 2 ans. Émergence de souvenirs positifs pour la première fois. Expression de culpabilité concernant certains non-dits. Début d'acceptation des émotions contradictoires. Bon engagement dans le processus thérapeutique.",
    transcript: `
T: Vous m'aviez dit vouloir parler de votre mère aujourd'hui...
P: Oui... J'ai retrouvé une vieille photo hier en rangeant. C'était pendant nos vacances en Bretagne. J'avais 8 ans.
T: Que ressentez-vous en regardant cette photo ?
P: *sort la photo* Pour la première fois depuis sa mort, j'ai réussi à sourire en la regardant. Je nous revois sur la plage... Elle m'apprenait à faire des châteaux de sable.
T: C'est un beau souvenir...
P: Oui... Mais après je me sens coupable.
T: Coupable ?
P: De ne pas lui avoir dit que je l'aimais avant... avant la fin. On s'était disputées la veille.
T: Que voudriez-vous lui dire aujourd'hui ?
P: *pleurs* Que je suis désolée. Que je comprends maintenant... que je comprends ses choix.`,
  },
  {
    id: "t_562839",
    date: "2024-11-14T11:30:00.000Z",
    summary:
      "Exploration des troubles alimentaires. Identification du lien entre crises de boulimie et situations de stress. Patient fait le lien avec des traumatismes d'adolescence. Discussion sur l'image corporelle et l'estime de soi. Introduction aux techniques de pleine conscience pendant les repas.",
    transcript: `
T: Comment se sont passés les repas cette semaine ?
P: J'ai eu deux crises... Mardi et jeudi soir.
T: Pouvez-vous me parler de ce qui s'est passé mardi ?
P: J'avais une réunion importante le lendemain. Je suis rentré tard du bureau, et dès que j'ai ouvert le frigo... Je ne pouvais plus m'arrêter.
T: Qu'avez-vous ressenti juste avant d'ouvrir le frigo ?
P: De l'angoisse... comme si j'avais un poids sur la poitrine.
T: Et après la crise ?
P: La honte. Toujours la même chose. Je me suis regardé dans le miroir en me détestant.
T: Cette image dans le miroir... elle vous rappelle quelque chose ?
P: *voix tremblante* Les moqueries au lycée. J'étais le gros de la classe. Dix ans après, je les entends encore rire.`,
  },
];
